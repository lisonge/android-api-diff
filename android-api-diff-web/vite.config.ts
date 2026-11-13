import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { cdn } from './plugins/cdn';
import { page404 } from './plugins/404Page';

const host = '127.0.0.1';
const port = 8920;

export default defineConfig({
  plugins: [
    cdn(),
    vue(),
    tailwindcss(),
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: true,
      modernTargets:
        'edge>=111, firefox>=128, chrome>=111, safari>=16.4, chromeAndroid>=111, iOS>=16.4',
    }),
    page404(),
  ],
  resolve: {
    alias: {
      '@': process.cwd() + '/src',
    },
  },
  server: {
    host,
    port,
  },
  worker: {
    format: 'es',
  },
  preview: {
    host,
    port,
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
  },
});
