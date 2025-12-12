import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src/public'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        // Página inicial
        index: resolve(__dirname, 'src/index.html'),

        // Páginas principais
        about: resolve(__dirname, 'src/pages/about.html'),
        brifing: resolve(__dirname, 'src/pages/brifing.html'),
        desenvolve: resolve(__dirname, 'src/pages/develop.html'),
        design: resolve(__dirname, 'src/pages/design.html'),
        portfolio: resolve(__dirname, 'src/pages/portfolio.html'),
        pricing: resolve(__dirname, 'src/pages/pricing.html'),
        success: resolve(__dirname, 'src/pages/success.html'),

        // Seções institucionais
        work: resolve(__dirname, 'src/sections/work.html'),
        politics: resolve(__dirname, 'src/sections/politics.html'),
        terms: resolve(__dirname, 'src/sections/terms.html'),
        privacy: resolve(__dirname, 'src/sections/privacy.html'),
        support: resolve(__dirname, 'src/sections/support.html'),
        blog: resolve(__dirname, 'src/sections/blog.html'),

        // seção demos templates
        techshop: resolve(__dirname, 'src/demos/techshop.html'),
      },
    },
  },

  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src/styles'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // faz o Sass procurar também nessas pastas quando você usar @use sem "./"
        includePaths: [
          resolve(__dirname, 'src/styles'),
          resolve(__dirname, 'src/components'),
        ],
        // seu additionalData para injetar variáveis globalmente
        additionalData: `@use "variables" as *;`,
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },

  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
  },
});
