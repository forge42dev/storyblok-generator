import { spawn } from "node:child_process"
import { promises as fs } from "node:fs"
import { mkdir } from "node:fs/promises"
import path from "node:path"
import chalk from "chalk"
import { type Plugin, normalizePath } from "vite"

interface PluginProps {
	withTypes?: boolean
	inputFile: string
	outputDir: string
	typeFile: string
	fileNameConvention: "kebab-case" | "camel-case"
	fileName?: string
	cwd?: string
	componentAs?: "file" | "folder"
	debug: boolean
}

const log = process.env.NODE_ENV === "development" ? console.log : () => {}
const error = process.env.NODE_ENV === "development" ? console.error : () => {}

const tryReadFile = async (path: string) => {
	try {
		return await fs.readFile(path, "utf8")
	} catch (e) {
		return null
	}
}

const generateComponents = async ({
	inputFile,
	outputDir,
	cwd,
	typeFile,
	fileNameConvention,
	componentAs,
	debug,
}: PluginProps) => {
	const cwdToUse = cwd ?? process.cwd()
	const outputDirRelative = path.relative(cwdToUse, outputDir)

	const content = await tryReadFile(path.resolve(cwdToUse, inputFile))
	if (!content) {
		error(`Component file ${inputFile} not found`)
		return
	}
	const components = JSON.parse(content).components

	await mkdir(outputDirRelative, { recursive: true })

	if (components.length === 0) {
		log(chalk.red(`No components found in ${inputFile}`))
		return
	}
	const generatedComponents: {
		name: string
		originalName: string
		fileName: string
	}[] = await Promise.all(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		components.map(async (component: any) => {
			const componentName = component?.name
			const modifiedName = fileNameToCamelCase(componentName)
			const name =
				modifiedName === modifiedName.toUpperCase()
					? modifiedName.toLowerCase().replace(/^./, modifiedName[0])
					: modifiedName
			const componentFileName =
				fileNameConvention === "kebab-case"
					? name
							.match(/[A-Z][a-z]+/g)
							?.map((word) => word.toLowerCase())
							.join("-") ?? name
					: name
			const componentFile = path.join(
				outputDir,
				componentAs === "folder" ? `${componentFileName}/${componentFileName}.tsx` : `${componentFileName}.tsx`
			)

			const returnData = {
				name,
				originalName: component.name,
				fileName: componentFileName,
			}

			if ((await componentExists(componentFile)) && debug) {
				log(`⚠️  Component ${chalk.yellow(componentName)} already exists. Skipping...`)
				return returnData
			}
			const hasBody = component?.schema?.body
			const hasColumns = component?.schema?.columns
			const typeResolution = normalizePath(path.relative(componentFile, typeFile).replace("..\\", "")).replace(
				".d.ts",
				""
			)
			const fileContent = await tryReadFile(componentFile)
			const fileNewContent = [
				`import { type SbBlokData, storyblokEditable${hasBody || hasColumns ? ", StoryblokComponent" : ""} } from "@storyblok/react";`,
				`import type { ${name}Storyblok } from "${typeResolution}";`,
				"",
				`export const ${name} = ({ blok }: { blok: ${name}Storyblok }) => {`,
				"  return (",
				"    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>",
				getComponentContents(component),
				"    </div>",
				"  )",
				"};",
				"",
				`export default ${name}`,
			].join("\n")

			if (fileContent !== fileNewContent) {
				if (componentAs === "folder") {
					await fs.mkdir(path.dirname(componentFile), { recursive: true })
				}
				await fs.writeFile(componentFile, fileNewContent)
				log(chalk.green(`Component ${componentName} created`))
			}
			return returnData
		})
	)

	const filteredGeneratedComponents = generatedComponents.filter(Boolean)

	const fileContent = await tryReadFile(path.join(outputDir, "index.ts"))
	const newFileContent = [
		'import { lazy } from "react"',
		"",
		"export const components = {",
		filteredGeneratedComponents
			.map(
				({ fileName, originalName }) =>
					`  ${hasSpecialChars(originalName) ? `"${originalName}"` : originalName}: lazy(() => import("./${componentAs === "folder" ? `${fileName}/${fileName}` : fileName}")),`
			)
			.join("\n"),
		"};",
	].join("\n")
	if (fileContent !== newFileContent) {
		await fs.writeFile(path.join(outputDir, "index.ts"), newFileContent)
		log(chalk.green("Components config created!"))
	}
}

function fileNameToCamelCase(fileName: string): string {
	const words = fileName.split("-")
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	const splitBySpace = capitalizedWords.join("").split(" ")
	return splitBySpace.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")
}

const hasSpecialChars = (str: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/.test(str)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const getComponentContents = (component: any) => {
	const hasBody = component?.schema?.body
	const hasColumns = component?.schema?.columns
	if (hasBody) {
		return [
			"      {blok.body?.map((nestedBlok) => (",
			"        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />",
			"      ))}",
		].join("\n")
	}

	if (hasColumns) {
		return [
			"      {blok.columns?.map((nestedBlok) => (",
			"        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />",
			"      ))}",
		].join("\n")
	}
	return "      {/** Have fun! */}"
}

async function componentExists(filepath: string) {
	try {
		await fs.readFile(filepath, "utf8")
		return true
	} catch (e) {
		return false
	}
}

interface StoryblokPluginProps {
	/**
	 * Your Storyblok space ID.
	 * eg "123456"
	 */
	spaceId: string
	/**
	 * The directory where the components will be generated.
	 * eg "./storyblok/components"
	 */
	componentsDir: string
	/**
	 * The location of the type file.
	 * @default "./storyblok/types.d.ts"
	 */
	typeFileLoc?: string
	/**
	 * The file name convention for the components. Can be either `kebab-case` or `camel-case`.
	 * @default "kebab-case"
	 */
	fileNameConvention?: "kebab-case" | "camel-case"
	/**
	 * The location of the components JSON file.
	 * @default "./storyblok/components.<spaceId>.json"
	 */
	componentsJsonLoc?: string
	/**
	 * The command to use to pull the components from Storyblok via the CLI.
	 * @default "storyblok pull-components --space <spaceId> --path <pathToComponentsDir>"
	 */
	pullCommand?: string
	/**
	 * The command to use to generate the types for the components via the CLI.
	 * @default "storyblok generate-typescript-typedefs --sourceFilePaths <pathToComponentsDir> --destinationFilePath <pathToTypeFileLoc>"
	 */
	typesCommand?: string
	/**
	 * Whether to enable debug mode. If enabled, the plugin will print additional information to the console.
	 * @default false
	 */
	debug?: boolean
	/**
	 * The component structure. Can be either `file` or `folder`.
	 * @default "file"
	 */
	componentAs?: "file" | "folder"
}

const pullAndGenerate = async ({
	componentsDir,
	debug = false,
	typeFileLoc = "./storyblok/types.d.ts",
	pullCommand,
	componentsJsonLoc,
	typesCommand,
	fileNameConvention = "kebab-case",
	componentAs = "file",
}: StoryblokPluginProps) => {
	log(chalk.bold.green("Pulling components and generating types..."))
	const folderExists = await fs.stat(componentsDir).catch(() => false)
	if (!folderExists) {
		await fs.mkdir(componentsDir, { recursive: true })
	}
	const typeFolderExists = await fs.stat(path.dirname(typeFileLoc)).catch(() => false)
	if (!typeFolderExists) {
		await fs.mkdir(path.dirname(typeFileLoc), { recursive: true })
	}
	spawn(`${pullCommand} && ${typesCommand}`, {
		stdio: debug ? "inherit" : "ignore",
		shell: true,
		env: process.env,
	}).on("exit", async (code) => {
		if (code === 0 && componentsJsonLoc) {
			log(chalk.bold.green("Storyblok Components successfully pulled and types generated!"))
			return await generateComponents({
				inputFile: componentsJsonLoc,
				outputDir: componentsDir,
				typeFile: typeFileLoc,
				fileNameConvention,
				componentAs,
				debug,
			})
		}
		//log(chalk.bold.red("Storyblok Components pull failed!"))
		//log(chalk.bold.red("Check your Storyblok space ID and if you're logged in to Storyblok"))
	})
}

export const storyblokPlugin = ({
	spaceId,
	componentsDir,
	typeFileLoc = "./storyblok/types.d.ts",
	componentsJsonLoc = `./storyblok/components.${spaceId}.json`,
	pullCommand = `storyblok pull-components --space ${spaceId} --path ${path.dirname(componentsJsonLoc)}/`,
	typesCommand = `storyblok generate-typescript-typedefs --sourceFilePaths ${componentsJsonLoc} --destinationFilePath ${typeFileLoc}`,
	debug = false,
	fileNameConvention = "kebab-case",
	componentAs = "file",
}: StoryblokPluginProps) => {
	const generator = async () =>
		generateComponents({
			inputFile: componentsJsonLoc,
			outputDir: componentsDir,
			typeFile: typeFileLoc,
			fileNameConvention,
			componentAs,
			debug,
		})
	return {
		enforce: "pre",
		name: "Storyblok Generator",
		apply: "serve",
		async handleHotUpdate(ctx) {
			const changedFile = ctx.file.replace(normalizePath(process.cwd()), "")

			if (typeFileLoc.endsWith(changedFile)) {
				await generator()
			}
		},
		async configureServer(s) {
			if (s.config.appType === "spa") {
				await generator()
				const pluginLog = chalk.bold.green("Storyblok plugin ".toUpperCase())
				log(`\n${pluginLog}- Started`)
				log(`${pluginLog}- Type 'gsb' and press ENTER to generate Storyblok types\n`)

				s.bindCLIShortcuts({
					customShortcuts: [
						{
							description: "Generate Storyblok types",
							key: "gsb",
							action: () =>
								pullAndGenerate({
									spaceId,
									componentsDir,
									componentsJsonLoc,
									typeFileLoc,
									pullCommand,
									typesCommand,
									debug,
									componentAs,
									fileNameConvention,
								}),
						},
					],
				})
			}
		},
	} satisfies Plugin
}
