import {
  brotliCompress,
  brotliDecompress,
  constants as zlibConstants,
} from 'node:zlib';
import { BROTLI_QUALITY, MAX_CACHE_ENTRY_BYTES } from './constants.ts';

export const compressBrotli = (value: Uint8Array): Promise<Uint8Array> => {
  return new Promise((resolvePromise, rejectPromise) => {
    brotliCompress(
      value,
      {
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: BROTLI_QUALITY,
        },
      },
      (error, result) => {
        if (error) {
          rejectPromise(error);
        } else {
          resolvePromise(result);
        }
      },
    );
  });
};

export const decompressBrotli = (value: Uint8Array): Promise<Uint8Array> => {
  return new Promise((resolvePromise, rejectPromise) => {
    brotliDecompress(
      value,
      { maxOutputLength: MAX_CACHE_ENTRY_BYTES },
      (error, result) => {
        if (error) {
          rejectPromise(error);
        } else {
          resolvePromise(result);
        }
      },
    );
  });
};
