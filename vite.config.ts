import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "src"),

  publicDir: resolve(__dirname, "src/public"),

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
      },
    },
  },

  resolve: {
    alias: {
      "@scss": resolve(__dirname, "src/scss"),
      "@js": resolve(__dirname, "src/js"),
      "@assets": resolve(__dirname, "src/public/assets"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, "src/scss")],

        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin",
        ],
      },
    },
  },

  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    hmr: {
      overlay: true,
    },
  },
});