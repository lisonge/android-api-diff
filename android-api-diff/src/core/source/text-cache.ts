import type { AndroidApiQueryRuntime } from '../model/types.ts';

const SOURCE_NOT_FOUND_CACHE_PREFIX = 'source-not-found:v1:';
const SOURCE_NOT_FOUND_CACHE_VALUE = '1';

export interface TaggedSourceTextResult {
  sourceFileNotFound: boolean;
  text: string;
}

export const getSourceNotFoundCacheKey = (taggedFilePath: string): string =>
  `${SOURCE_NOT_FOUND_CACHE_PREFIX}${taggedFilePath}`;

const isSourceFileNotFoundText = (text: string): boolean =>
  text.startsWith('404:');

export const loadCachedTaggedSourceText = async (
  runtime: AndroidApiQueryRuntime,
  taggedFilePath: string,
  url: string,
  signal?: AbortSignal,
): Promise<TaggedSourceTextResult> => {
  const cached = await runtime.textCache?.get(taggedFilePath);
  signal?.throwIfAborted();
  if (cached !== undefined) {
    return { text: cached, sourceFileNotFound: false };
  }

  const sourceNotFoundCacheKey = getSourceNotFoundCacheKey(taggedFilePath);
  const sourceNotFound = await runtime.textCache?.get(sourceNotFoundCacheKey);
  signal?.throwIfAborted();
  if (sourceNotFound !== undefined) {
    return { text: '', sourceFileNotFound: true };
  }

  const text = await runtime.fetchText(url, signal);
  const sourceFileNotFound = isSourceFileNotFoundText(text);
  await runtime.textCache?.set(
    sourceFileNotFound ? sourceNotFoundCacheKey : taggedFilePath,
    sourceFileNotFound ? SOURCE_NOT_FOUND_CACHE_VALUE : text,
  );
  return { text, sourceFileNotFound };
};
