import {
  getParsedSourceCacheKey,
  indexVersions,
  searchSources,
  type AndroidApiStructCacheEntry,
  type SourceIndex,
} from 'android-api-diff';

// Inspect only memory; this must never read IndexedDB or start a download.
export const canSearchFromMemory = (
  index: SourceIndex,
  text: string,
  minSdk: number,
  peek: (key: string) => AndroidApiStructCacheEntry | undefined,
): boolean => {
  if (!text.trim()) return false;
  const tags = new Set(
    indexVersions(index)
      .filter((version) => version.apiVersion >= minSdk)
      .flatMap((version) => version.tags),
  );
  return searchSources(index, text).every((candidate) => {
    const needed =
      candidate.targetKind === 'file'
        ? [...tags]
        : candidate.availableTags.filter((tag) => tags.has(tag));
    const anchor = candidate.availableTags.at(-1);
    if (anchor) needed.push(anchor);
    return needed.every(
      (tag) => peek(getParsedSourceCacheKey(candidate, tag)) !== undefined,
    );
  });
};
