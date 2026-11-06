import type { ApiFile, SourceLanguage } from 'android-api-diff';
import type { ParseRequest, ParseResponse, WorkerTask } from './protocol.ts';

export interface ParserWorker {
  onmessage: ((event: MessageEvent<ParseResponse>) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  onmessageerror: ((event: MessageEvent) => void) | null;
  postMessage(request: ParseRequest): void;
  terminate(): void;
}

export const createWorkerParser = (createWorker: () => ParserWorker) => {
  let worker: ParserWorker | undefined;
  let nextId = 0;
  const pending = new Map<
    number,
    {
      resolve(response: ParseResponse): void;
      reject(error: Error): void;
    }
  >();

  const dispose = (error = new Error('Parser worker disposed')) => {
    worker?.terminate();
    worker = undefined;
    for (const request of pending.values()) request.reject(error);
    pending.clear();
  };

  const request = (task: WorkerTask): Promise<ParseResponse> =>
    new Promise((resolve, reject) => {
      if (!worker) {
        worker = createWorker();
        worker.onmessage = ({ data }) => {
          const request = pending.get(data.id);
          if (!request) return;
          pending.delete(data.id);
          if ('error' in data) {
            const error = new Error(data.error.message);
            error.name = data.error.name;
            request.reject(error);
          } else {
            request.resolve(data);
          }
        };
        worker.onerror = (event) =>
          dispose(new Error(event.message || 'Parser worker failed'));
        worker.onmessageerror = () =>
          dispose(new Error('Could not read parser worker response'));
      }
      const id = nextId++;
      pending.set(id, { resolve, reject });
      try {
        worker.postMessage({ id, ...task });
      } catch (error) {
        pending.delete(id);
        reject(error);
      }
    });

  const parseSource = async (
    language: SourceLanguage,
    text: string,
  ): Promise<ApiFile> => {
    const response = await request({ kind: 'parse', language, text });
    if (!('file' in response))
      throw new Error('Unexpected parser worker response');
    return response.file;
  };
  const constantExpressionKeys = async (
    sources: string[],
  ): Promise<(string | undefined)[]> => {
    const response = await request({ kind: 'constant-keys', sources });
    if (!('keys' in response))
      throw new Error('Unexpected expression worker response');
    return response.keys;
  };
  return { parseSource, constantExpressionKeys, dispose };
};
