import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    cli: 'src/cli/index.ts',
    index: 'src/core/index.ts',
  },
  inputOptions: { experimental: { resolveNewUrlToAsset: true } },
  dts: true,
  fixedExtension: false,
});
