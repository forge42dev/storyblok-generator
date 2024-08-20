import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	sourcemap: true,
	clean: true,
	dts: true,
	minify: true,
	format: ["esm", "cjs"],
	outDir: "dist",
	external: ["vite"],
})
