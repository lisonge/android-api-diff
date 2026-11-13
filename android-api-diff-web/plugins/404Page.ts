import type { Plugin } from 'vite';

export const page404 = (): Plugin => ({
  name: '404Page',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const page = bundle['index.html'];
    if (page.type !== 'asset') return;
    this.emitFile({
      fileName: '404.html',
      type: 'asset',
      source: page.source,
    });
  },
});
