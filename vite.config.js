import Inspect from "vite-plugin-inspect";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [Inspect()],
  root: "./",
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
        formation: "./formation/index.html",
        moonPhases: "./moonPhases/index.html"
        // eclipses: resolve(__dirname, 'eclipses/index.html'),
      },
    },
  },
});
