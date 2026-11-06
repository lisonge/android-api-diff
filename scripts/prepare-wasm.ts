import { copyFile, mkdir } from 'node:fs/promises';

const target = new URL('../android-api-diff/src/generated/', import.meta.url);
await mkdir(target, { recursive: true });
await copyFile(
  new URL(import.meta.resolve('tree-sitter-java/tree-sitter-java.wasm')),
  new URL('tree-sitter-java.wasm', target),
);
console.log('Prepared tree-sitter-java.wasm');
