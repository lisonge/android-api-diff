export const DATABASE_NAME = 'androidApiDiffCache';
export const CACHE_VERSIONS = {
  format: 1,
  codec: 'gzip',
  text: 1,
  struct: 18,
} as const;
const CACHE_VERSION_KEY =
  `${CACHE_VERSIONS.format}:${CACHE_VERSIONS.codec}:${CACHE_VERSIONS.text}:${CACHE_VERSIONS.struct}` as const;

// Add the new CACHE_VERSION_KEY with the next integer whenever expected meta
// changes. The keyed lookup fails type-checking if a logical version changes
// without also adding an IndexedDB version fence for older tabs.
const DATABASE_VERSION_BY_CACHE_VERSION = {
  '1:gzip:1:11': 1,
  '1:gzip:1:12': 2,
  '1:gzip:1:13': 3,
  '1:gzip:1:14': 4,
  '1:gzip:1:15': 5,
  '1:gzip:1:16': 6,
  '1:gzip:1:17': 7,
  '1:gzip:1:18': 8,
} as const;
export const DATABASE_VERSION =
  DATABASE_VERSION_BY_CACHE_VERSION[CACHE_VERSION_KEY];
export const META_STORE = 'meta';
export const TEXT_REFS_STORE = 'textRefs';
export const TEXT_BLOBS_STORE = 'textBlobs';
export const STRUCT_REFS_STORE = 'structRefs';
export const STRUCT_BLOBS_STORE = 'structBlobs';
export const REFS_BY_CONTENT_INDEX = 'byContent';
export const RESET_CHANNEL_NAME = 'androidApiDiffCacheResetV1';
export const LEGACY_DATABASE_NAMES = [
  'androidApiDiffCacheV1',
  'persistentCacheV2',
  'structCacheV10',
] as const;

export const TEXT_DOMAIN = 'text';
export const STRUCT_DOMAIN = 'struct';
export type CacheDomain = typeof TEXT_DOMAIN | typeof STRUCT_DOMAIN;

export const CACHE_META_KEY = 'cacheConfig';
export const CACHE_FORMAT_VERSION = CACHE_VERSIONS.format;
export const CACHE_CODEC = CACHE_VERSIONS.codec;
export const TEXT_CACHE_VERSION = CACHE_VERSIONS.text;
export const STRUCT_CACHE_VERSION = CACHE_VERSIONS.struct;

export type RefStoreName = typeof TEXT_REFS_STORE | typeof STRUCT_REFS_STORE;
export type BlobStoreName = typeof TEXT_BLOBS_STORE | typeof STRUCT_BLOBS_STORE;

export interface CacheDomainStores {
  refs: RefStoreName;
  blobs: BlobStoreName;
}

export const getCacheDomainStores = (domain: CacheDomain): CacheDomainStores =>
  domain === TEXT_DOMAIN
    ? { refs: TEXT_REFS_STORE, blobs: TEXT_BLOBS_STORE }
    : { refs: STRUCT_REFS_STORE, blobs: STRUCT_BLOBS_STORE };

export const NETWORK_RETRY_COUNT = 3;
export const NETWORK_RETRY_BASE_DELAY_MS = 300;
export const MAX_CACHE_ENTRY_BYTES = 64 * 1024 * 1024;
export const MAX_CACHE_PAYLOAD_BYTES = MAX_CACHE_ENTRY_BYTES + 1024 * 1024;
