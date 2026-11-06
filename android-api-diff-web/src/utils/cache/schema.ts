import type { DBSchema, IDBPDatabase } from 'idb';
import {
  CACHE_CODEC,
  CACHE_FORMAT_VERSION,
  CACHE_META_KEY,
  META_STORE,
  REFS_BY_CONTENT_INDEX,
  STRUCT_BLOBS_STORE,
  STRUCT_CACHE_VERSION,
  STRUCT_REFS_STORE,
  TEXT_BLOBS_STORE,
  TEXT_CACHE_VERSION,
  TEXT_REFS_STORE,
} from './config';
import type { BlobRecord } from './records';

export interface CacheMeta {
  readonly formatVersion: number;
  readonly codec: typeof CACHE_CODEC;
  readonly textVersion: number;
  readonly structVersion: number;
}

export const EXPECTED_CACHE_META: CacheMeta = Object.freeze({
  formatVersion: CACHE_FORMAT_VERSION,
  codec: CACHE_CODEC,
  textVersion: TEXT_CACHE_VERSION,
  structVersion: STRUCT_CACHE_VERSION,
});

export interface CacheDatabaseSchema extends DBSchema {
  [META_STORE]: {
    key: typeof CACHE_META_KEY;
    value: CacheMeta;
  };
  [TEXT_REFS_STORE]: {
    key: string;
    value: string;
    indexes: {
      [REFS_BY_CONTENT_INDEX]: string;
    };
  };
  [TEXT_BLOBS_STORE]: {
    key: string;
    value: BlobRecord;
  };
  [STRUCT_REFS_STORE]: {
    key: string;
    value: string;
    indexes: {
      [REFS_BY_CONTENT_INDEX]: string;
    };
  };
  [STRUCT_BLOBS_STORE]: {
    key: string;
    value: BlobRecord;
  };
}

export type CacheDatabase = IDBPDatabase<CacheDatabaseSchema>;
