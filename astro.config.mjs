// @ts-check
import graphql from "@rollup/plugin-graphql";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    port: 5000,
  },
  vite: {
    plugins: [tailwindcss(), graphql()],
    build: {
      sourcemap: false,
    },
  },
});
