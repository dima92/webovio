import { defineConfig, normalizePath } from "vite";
import { resolve } from "path";

const projectRootDir = import.meta.dirname;

export default defineConfig({
  base: "/webovio/",

  server: {
    host: true,
    port: 3000,
    open: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ["if-function"],
        additionalData: `
          @use "${normalizePath(resolve(projectRootDir, "src/styles/_variables.scss"))}" as *;
          @use "${normalizePath(resolve(projectRootDir, "src/styles/helpers/_index.scss"))}" as *;
        `,
      },
    },
  },

  build: {
    minify: "esbuild",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(projectRootDir, "index.html"),
      },
      output: {
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
});
