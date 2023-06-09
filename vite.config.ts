// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api/search': {
        target: 'http://localhost:5000/api/search',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, ''),
      },
      '/img': {
        target: 'http://localhost:5000/img',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ''),
      },
      '/api/university': {
        target: 'http://localhost:5000/api/university',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/university/, ''),
      },
      '/api/schedule': {
        target: 'http://localhost:5000/api/schedule',
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/schedule/, ''),
      },
    },
    // proxy: {
    //   "/api/search": "http://localhost:5000/api/search",
    // },
  },
});
