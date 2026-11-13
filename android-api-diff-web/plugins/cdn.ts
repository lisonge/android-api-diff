import process from 'node:process';
import type { Plugin } from 'vite';

export const cdn = (): Plugin => ({
  name: 'cdn',
  config() {
    const cdnBase = process.env.CDN_BASE;
    return {
      experimental: cdnBase
        ? {
            renderBuiltUrl: (filename) => cdnBase + filename,
          }
        : undefined,
    };
  },
});
