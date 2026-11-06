import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const host = '127.0.0.1';
const port = 8920;

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      legacy({
        renderLegacyChunks: false,
        modernPolyfills: true,
        modernTargets:
          'edge>=111, firefox>=128, chrome>=111, safari>=16.4, chromeAndroid>=111, iOS>=16.4',
      }),
      {
        name: '404Page',
        apply: 'build',
        enforce: 'post',
        generateBundle(_, bundle) {
          const v = bundle['index.html'];
          const source = v.type === 'asset' ? v.source : '';
          if (!source) return;
          this.emitFile({
            fileName: '404.html',
            type: 'asset',
            source,
          });
        },
      },
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
  };
});
