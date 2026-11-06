import { MAX_CACHE_ENTRY_BYTES, MAX_CACHE_PAYLOAD_BYTES } from './config';

export type BlobRecord = [
  generation: string,
  rawSize: number,
  data: Uint8Array,
];

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isRefRecord = (value: unknown): value is string =>
  typeof value === 'string';

export const isBlobRecord = (value: unknown): value is BlobRecord =>
  Array.isArray(value) &&
  value.length === 3 &&
  typeof value[0] === 'string' &&
  Number.isSafeInteger(value[1]) &&
  (value[1] as number) >= 0 &&
  (value[1] as number) <= MAX_CACHE_ENTRY_BYTES &&
  value[2] instanceof Uint8Array &&
  value[2].byteLength <= MAX_CACHE_PAYLOAD_BYTES;
