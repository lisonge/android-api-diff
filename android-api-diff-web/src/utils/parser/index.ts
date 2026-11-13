import { createWorkerParser } from './client.ts';
import workerUrl from './parser.worker.ts?worker&url';

const parser = createWorkerParser(() => {
  const url = new URL(workerUrl, location.href);
  if (url.origin === location.origin) {
    return new Worker(url, { type: 'module' });
  }
  // The entry must be same-origin; module imports can use the CDN's CORS headers.
  const entry = URL.createObjectURL(
    new Blob([`import ${JSON.stringify(url.href)};`], {
      type: 'text/javascript',
    }),
  );
  try {
    return new Worker(entry, { type: 'module' });
  } finally {
    URL.revokeObjectURL(entry);
  }
});

export const parseSourceInWorker = parser.parseSource;
export const constantExpressionKeysInWorker = parser.constantExpressionKeys;
if (import.meta.hot) import.meta.hot.dispose(() => parser.dispose());
