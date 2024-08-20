import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { storyblokPlugin } from "storyblok-generator";


export default defineConfig({
  plugins: [remix(),
    storyblokPlugin({
    spaceId: "288347",
    componentsDir: "./storyblok/components",

  }), tsconfigPaths()],

});
