import { QUERY_CACHE_VERSION, STRUCT_CACHE_VERSION } from '../../core/query.ts';

export const CACHE_DATABASE_FILENAME = 'cache-v2.sqlite';
export const CACHE_FORMAT_VERSION = 2;
export const CACHE_BLOB_CODEC = 'br1';
export const ETAG_CACHE_VERSION = '1';
export const BROTLI_QUALITY = 5;
export const MAX_CACHE_ENTRY_BYTES = 64 * 1024 * 1024;
export const MAX_CACHE_PAYLOAD_BYTES = MAX_CACHE_ENTRY_BYTES + 1024 * 1024;
export const SQLITE_BUSY_TIMEOUT_MS = 5_000;

export const LEGACY_CACHE_DIR_NAMES = ['text', 'struct', 'query'] as const;

export const NODE_CACHE_DOMAINS = {
  query: 'query',
  struct: 'struct',
  text: 'text',
} as const;

export type NodeCacheDomain =
  (typeof NODE_CACHE_DOMAINS)[keyof typeof NODE_CACHE_DOMAINS];

export const NODE_CACHE_VERSIONS = {
  query: `${QUERY_CACHE_VERSION}:1`,
  struct: `${STRUCT_CACHE_VERSION}:1`,
  text: '1',
} as const satisfies Record<NodeCacheDomain, string>;

const CACHE_VERSION_KEY =
  `${CACHE_FORMAT_VERSION}|${CACHE_BLOB_CODEC}|${NODE_CACHE_VERSIONS.text}|${NODE_CACHE_VERSIONS.struct}|${NODE_CACHE_VERSIONS.query}|${ETAG_CACHE_VERSION}` as const;

// Add a new key with a strictly larger value whenever any component in
// CACHE_VERSION_KEY changes. Keeping prior keys makes the monotonic history
// explicit and turns an unregistered version combination into a type error.
const CACHE_CONNECTION_EPOCHS = {
  '1|br1|1|struct:v9:1|query:v19:1': 1,
  '2|br1|1|struct:v9:1|query:v19:1|1': 2,
  '2|br1|1|struct:v9:1|query:v20:1|1': 3,
  '2|br1|1|struct:v10:1|query:v21:1|1': 4,
  '2|br1|1|struct:v11:1|query:v22:1|1': 5,
  '2|br1|1|struct:v11:1|query:v23:1|1': 6,
  '2|br1|1|struct:v11:1|query:v24:1|1': 7,
  '2|br1|1|struct:v11:1|query:v25:1|1': 8,
  '2|br1|1|struct:v11:1|query:v26:1|1': 9,
  '2|br1|1|struct:v11:1|query:v27:1|1': 10,
  '2|br1|1|struct:v12:1|query:v28:1|1': 11,
  '2|br1|1|struct:v13:1|query:v29:1|1': 12,
  '2|br1|1|struct:v14:1|query:v30:1|1': 13,
  '2|br1|1|struct:v15:1|query:v31:1|1': 14,
  '2|br1|1|struct:v16:1|query:v32:1|1': 15,
  '2|br1|1|struct:v16:1|query:v33:1|1': 16,
  '2|br1|1|struct:v16:1|query:v34:1|1': 17,
  '2|br1|1|struct:v17:1|query:v35:1|1': 18,
  '2|br1|1|struct:v17:1|query:v36:1|1': 19,
  '2|br1|1|struct:v17:1|query:v37:1|1': 20,
  '2|br1|1|struct:v17:1|query:v38:1|1': 21,
  '2|br1|1|struct:v17:1|query:v39:1|1': 22,
  '2|br1|1|struct:v17:1|query:v40:1|1': 23,
  '2|br1|1|struct:v17:1|query:v41:1|1': 24,
  '2|br1|1|struct:v17:1|query:v42:1|1': 25,
  '2|br1|1|struct:v17:1|query:v43:1|1': 26,
} as const;

export const CACHE_CONNECTION_EPOCH =
  CACHE_CONNECTION_EPOCHS[CACHE_VERSION_KEY];
