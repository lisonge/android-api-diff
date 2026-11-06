import type { ApiFile } from '../model/types.ts';
import type {
  AndroidApiQueryRuntime,
  AndroidApiStructCacheEntry,
} from '../model/types.ts';
import { loadAndroidSourceFile } from './load.ts';
import { SourceExecutionError } from './errors.ts';
import { sourceKey, type SourceLocation } from '../catalog/index.ts';
export const STRUCT_CACHE_VERSION = 'struct:v17';
export const getParsedSourceCacheKey = (source: SourceLocation, tag: string) =>
  `${STRUCT_CACHE_VERSION}:${tag}:${sourceKey(source)}`;
const MAX_STRUCT_CONTENT_ENTRIES = 256;
interface StructContentMemo {
  values: Map<string, AndroidApiStructCacheEntry>;
  flights: Map<string, Promise<AndroidApiStructCacheEntry>>;
}

const structContentMemos = new WeakMap<
  AndroidApiQueryRuntime,
  StructContentMemo
>();
const structSourceEncoder = new TextEncoder();

const getStructContentMemo = (
  runtime: AndroidApiQueryRuntime,
): StructContentMemo => {
  let memo = structContentMemos.get(runtime);
  if (!memo) {
    memo = {
      values: new Map(),
      flights: new Map(),
    };
    structContentMemos.set(runtime, memo);
  }
  return memo;
};

const rememberStructContent = (
  memo: StructContentMemo,
  contentKey: string,
  value: AndroidApiStructCacheEntry,
): AndroidApiStructCacheEntry => {
  const current = memo.values.get(contentKey);
  if (current) {
    memo.values.delete(contentKey);
    memo.values.set(contentKey, current);
    return current;
  }
  memo.values.set(contentKey, value);
  if (memo.values.size > MAX_STRUCT_CONTENT_ENTRIES) {
    const oldestKey = memo.values.keys().next().value;
    if (oldestKey !== undefined) memo.values.delete(oldestKey);
  }
  return value;
};

const hashStructSource = async (text: string): Promise<string> => {
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    structSourceEncoder.encode(text),
  );
  return new Uint8Array(digest).toBase64({
    alphabet: 'base64url',
    omitPadding: true,
  });
};

const getStructContentKey = async (
  taggedFilePath: string,
  text: string,
  sourceFileNotFound: boolean,
): Promise<string> => {
  const parserKind = taggedFilePath.endsWith('.aidl')
    ? 'aidl'
    : taggedFilePath.endsWith('.java')
      ? 'java'
      : 'unsupported';
  const sourceHash = sourceFileNotFound
    ? 'not-found'
    : await hashStructSource(text);
  return `${parserKind}:${sourceHash}`;
};

const getStructsByContent = async (
  runtime: AndroidApiQueryRuntime,
  contentKey: string,
  text: string,
  sourceFileNotFound: boolean,
): Promise<AndroidApiStructCacheEntry> => {
  const memo = getStructContentMemo(runtime);
  const memoized = memo.values.get(contentKey);
  if (memoized) return rememberStructContent(memo, contentKey, memoized);
  const current = memo.flights.get(contentKey);
  if (current) return current;

  const promise = (async () => {
    const persistentKey = `${STRUCT_CACHE_VERSION}:content:${contentKey}`;
    const persistent = await runtime.structCache?.get(persistentKey);
    if (persistent) return persistent;

    let file: ApiFile = {
      package: '',
      imports: [],
      structs: [],
    };
    if (!sourceFileNotFound && /^(aidl|java):/.test(contentKey)) {
      const language = contentKey.startsWith('aidl:') ? 'aidl' : 'java';
      try {
        file = runtime.parseSource
          ? await runtime.parseSource(language, text)
          : await (
              await import('../parser/index.ts')
            ).parseSource(language, text);
      } catch (cause) {
        throw new SourceExecutionError('parse-error', cause);
      }
    }
    const parsed: AndroidApiStructCacheEntry = {
      file,
      sourceFileNotFound,
    };
    const value = runtime.structCache?.intern?.(parsed) ?? parsed;
    await runtime.structCache?.set(persistentKey, value);
    return value;
  })();
  memo.flights.set(contentKey, promise);
  try {
    const value = await promise;
    return rememberStructContent(memo, contentKey, value);
  } finally {
    if (memo.flights.get(contentKey) === promise) {
      memo.flights.delete(contentKey);
    }
  }
};

export const loadParsedSource = async (
  runtime: AndroidApiQueryRuntime,
  source: SourceLocation,
  tag: string,
  signal?: AbortSignal,
): Promise<ApiFile | null> => {
  const key = getParsedSourceCacheKey(source, tag);
  const cached = await runtime.structCache?.get(key);
  if (cached) return cached.sourceFileNotFound ? null : cached.file;
  let content: string;
  try {
    const result = await loadAndroidSourceFile(runtime, tag, source, signal);
    if (result.status === 'not-found') {
      await runtime.structCache?.set(key, {
        file: { package: '', imports: [], structs: [] },
        sourceFileNotFound: true,
      });
      return null;
    }
    content = result.content;
  } catch (cause) {
    signal?.throwIfAborted();
    throw new SourceExecutionError('network-error', cause);
  }
  const contentKey = await getStructContentKey(source.path, content, false);
  const entry = await getStructsByContent(runtime, contentKey, content, false);
  await runtime.structCache?.set(key, entry);
  return entry.file;
};
