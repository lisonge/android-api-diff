import type { ApiFile, AndroidApiStructCacheEntry } from 'android-api-diff';

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

const decodeApiFile = (value: unknown): ApiFile => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('package' in value) ||
    !('imports' in value) ||
    !('structs' in value) ||
    typeof value.package !== 'string' ||
    !Array.isArray(value.imports) ||
    !Array.isArray(value.structs)
  ) {
    throw new Error('Cached API file entry is invalid');
  }
  return value as ApiFile;
};

export const encodeApiFileCacheEntry = (
  entry: AndroidApiStructCacheEntry,
): Uint8Array => encoder.encode(JSON.stringify(entry));

export const decodeApiFileCacheEntry = (
  bytes: Uint8Array,
): AndroidApiStructCacheEntry => {
  const value: unknown = JSON.parse(decoder.decode(bytes));
  if (
    typeof value !== 'object' ||
    value === null ||
    !('file' in value) ||
    !('sourceFileNotFound' in value) ||
    typeof value.sourceFileNotFound !== 'boolean'
  ) {
    throw new Error('Cached API file entry is invalid');
  }
  return {
    file: decodeApiFile(value.file),
    sourceFileNotFound: value.sourceFileNotFound,
  };
};
