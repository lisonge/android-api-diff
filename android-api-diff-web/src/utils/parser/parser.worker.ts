import type { ParseRequest, ParseResponse } from './protocol.ts';
import {
  initializeJavaParser,
  parseSource,
  getJavaConstantExpressionKeys,
} from 'android-api-diff';

// Keep DOM and Worker lib declarations separate without adding WebWorker to
// the application's DOM tsconfig.
const scope = globalThis as unknown as {
  onmessage: (event: MessageEvent<ParseRequest>) => void;
  postMessage(message: ParseResponse): void;
};

scope.onmessage = async ({ data }) => {
  const { id } = data;
  let response: ParseResponse;
  try {
    if (data.kind === 'constant-keys' || data.language === 'java') {
      await initializeJavaParser({
        runtime: new URL(
          '../../../node_modules/web-tree-sitter/web-tree-sitter.wasm',
          import.meta.url,
        ).href,
        language: new URL(
          '../../../node_modules/tree-sitter-java/tree-sitter-java.wasm',
          import.meta.url,
        ),
      });
    }
    response =
      data.kind === 'constant-keys'
        ? { id, keys: await getJavaConstantExpressionKeys(data.sources) }
        : { id, file: await parseSource(data.language, data.text) };
  } catch (error) {
    response = {
      id,
      error: {
        name: error instanceof Error ? error.name : 'Error',
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
  scope.postMessage(response);
};
