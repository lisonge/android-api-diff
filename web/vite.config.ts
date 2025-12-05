import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import process from 'node:process';
import unocss from 'unocss/vite';
import data from 'unplugin-data/vite';
import { defineConfig } from 'vite';
import type { ESBuildOptions } from 'vite';

const host = '127.0.0.1';
const port = 8920;

export default defineConfig(() => {
  return {
    plugins: [
      data(),
      vue(),
      unocss({ inspector: false }),
      legacy({
        renderLegacyChunks: false,
        modernPolyfills: true,
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
    preview: {
      host,
      port,
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
    },
    esbuild: {
      legalComments: 'none',
    } as ESBuildOptions,
  };
});
