import type { ApiFile, SourceLanguage } from 'android-api-diff';

export type WorkerTask =
  | { kind: 'parse'; language: SourceLanguage; text: string }
  | { kind: 'constant-keys'; sources: string[] };
export type ParseRequest = WorkerTask & { id: number };

export type ParseResponse =
  | { id: number; file: ApiFile }
  | { id: number; keys: (string | undefined)[] }
  | { id: number; error: { name: string; message: string } };
