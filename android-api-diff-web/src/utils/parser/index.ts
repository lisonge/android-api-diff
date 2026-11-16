import { createWorkerParser } from './client.ts';

const parser = createWorkerParser(
  () =>
    new Worker(new URL('./parser.worker.ts', import.meta.url), {
      type: 'module',
    }),
);

export const parseSourceInWorker = parser.parseSource;
export const constantExpressionKeysInWorker = parser.constantExpressionKeys;
if (import.meta.hot) import.meta.hot.dispose(() => parser.dispose());
