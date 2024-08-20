# Storyblok Generator

![GitHub Repo stars](https://img.shields.io/github/stars/forge42dev/storyblok-generator?style=social)
![npm](https://img.shields.io/npm/v/storyblok-generator?style=plastic)
![GitHub](https://img.shields.io/github/license/forge42dev/storyblok-generator?style=plastic)
![npm](https://img.shields.io/npm/dy/storyblok-generator?style=plastic)
![npm](https://img.shields.io/npm/dw/storyblok-generator?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/forge42dev/storyblok-generator?style=plastic)

Storyblok React component generator for Vite Storyblok apps (React/Remix.run).

- Pulls in your components from Storyblok and generates the types for you.
- Generates the components in either a file or folder structure.
- Makes all components editable via the bridge by default.
- Adds per component bundle splitting for better performance.
- Adds full typesafety to your components.
- Supports both kebab-case and camel-case file names.
- Adds shortcuts to regenerate the components and types.

## Setup

To get up and running quickly, you first install the vite plugin as a dev dependency in your project.

```bash
npm install -D storyblok-generator
```

Then, in your `vite.config.ts` file, add the following:

```typescript
import { storyblokPlugin } from "storyblok-generator"

export default defineConfig({
	plugins: [
		storyblokPlugin({
			spaceId: "<your space id>",
			componentsDir: "./storyblok/components",
		}),
	],
})
```

## Usage

Once the plugin is installed and configured, it will generate the components and types for you. You can then import the components in your code and use them as you normally would.

```typescript
import { components } from "./storyblok/components";
import { storyblokInit, apiPlugin } from "@storyblok/react"

storyblokInit({
	accessToken: "<your access token>",
	use: [apiPlugin],
	// You pass in the components here, the components will be lazy loaded when actually used.
	components,
})
```

### Storyblok CLI Caveats

The Plugin uses the Storyblok CLI to pull the components from your Storyblok space. This means that you need to have the CLI installed on your machine and available in your path.

You will also need to be logged in to the Storyblok CLI properly. You should login via SSO instead of
using the username and password combo as that keeps you logged in but after some time the login expires
and you need to login again by first logging out and logging in again.


## Configuration

The plugin accepts the following configuration options:

| Option            | Type     |   Description   | Default | Required |
| ----------------- | -------- | --------------- | ------- | -------- |
| spaceId           | string   | Your Storyblok space ID. | - | Yes |
| componentsDir     | string   | The directory where the components will be generated. | - | Yes |
| typeFileLoc       | string   | The location of the type file.  | `./storyblok/types.d.ts` | No |
| pullCommand       | string   | The command to use to pull the components from Storyblok via the CLI  | `storyblok pull-components --space <spaceId> --path <pathToComponentsDir>` | No |
| typesCommand      | string   | The command to use to generate the types for the components via the CLI | `storyblok generate-typescript-typedefs --sourceFilePaths <pathToComponentsDir> --destinationFilePath <pathToTypeFileLoc>` | No |
| componentsJsonLoc | string   | The location of the components JSON file.  | `./storyblok/components.<spaceId>.json` | No |
| fileNameConvention | string   | The file name convention for the components. Can be either `kebab-case` or `camel-case`. | `kebab-case` | No |
| componentAs       | string   | The component structure. Can be either `file` or `folder`. | `file` | No |
| debug             | boolean  | Whether to enable debug mode. If enabled, the plugin will print additional information to the console. | `false` | No |


## Development

To develop this plugin, you can clone the repository and run the following commands:

```bash
npm install
npm run dev
```

This will build the plugin, install the dependencies, and start the development server.