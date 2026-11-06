import { MAX_CACHE_ENTRY_BYTES, MAX_CACHE_PAYLOAD_BYTES } from './config';

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

const toArrayBufferBytes = (bytes: Uint8Array): Uint8Array<ArrayBuffer> =>
  bytes.buffer instanceof ArrayBuffer
    ? new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    : new Uint8Array(bytes);

export const encodeText = (value: string): Uint8Array => encoder.encode(value);

export const decodeText = (bytes: Uint8Array): string => decoder.decode(bytes);

export const sha256Hash = async (bytes: Uint8Array): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    toArrayBufferBytes(bytes),
  );
  return new Uint8Array(hashBuffer).toBase64({
    alphabet: 'base64url',
    omitPadding: true,
  });
};

export const sha256String = (value: string): Promise<string> =>
  sha256Hash(encodeText(value));

export const gzip = async (bytes: Uint8Array): Promise<Uint8Array> => {
  const stream = new Blob([toArrayBufferBytes(bytes)])
    .stream()
    .pipeThrough(new CompressionStream('gzip'));
  const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
  if (compressed.byteLength > MAX_CACHE_PAYLOAD_BYTES) {
    throw new RangeError('Compressed cache entry exceeds the size limit');
  }
  return compressed;
};

export const gunzip = async (bytes: Uint8Array): Promise<Uint8Array> => {
  const stream = new Blob([toArrayBufferBytes(bytes)])
    .stream()
    .pipeThrough(new DecompressionStream('gzip'));
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_CACHE_ENTRY_BYTES) {
        await reader.cancel();
        throw new RangeError('Decompressed cache entry exceeds the size limit');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const result = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
};
