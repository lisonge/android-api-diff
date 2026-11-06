import { compareSourceLocations } from './preferred-sources.ts';
import type {
  AndroidApiQueryRuntime,
  SearchFromData,
  AndroidApiResolution,
} from '../model/types.ts';
import {
  getIndexTags,
  getIndexedFiles,
  loadSourceIndex,
  type SourceIndex,
  type SourceLocation,
} from './index.ts';
import { searchFilePathsByRefName } from './reference.ts';
import { getMirrorContentUrl, getSourceTargetUrl } from '../source/url.ts';

export interface SourceCandidate extends SourceLocation {
  availableTags: string[];
  targetPaths: string[];
  targetKind: SearchFromData['targetKind'];
}
const catalogs = new WeakMap<
  SourceIndex,
  { repo: string; paths: string[]; tags: Map<string, string[]> }[]
>();
const catalog = (index: SourceIndex) => {
  let value = catalogs.get(index);
  if (value) return value;
  value = index.repositories.map((repo) => {
    const tags = new Map<string, string[]>();
    for (const tag of getIndexTags(index)) {
      for (const path of getIndexedFiles(index, repo, tag) ?? []) {
        const list = tags.get(path) ?? [];
        list.push(tag);
        tags.set(path, list);
      }
    }
    return { repo: repo.repo, paths: [...tags.keys()], tags };
  });
  catalogs.set(index, value);
  return value;
};
const searches = new WeakMap<SourceIndex, Map<string, SourceCandidate[]>>();
export const splitSourceSearch = (index: SourceIndex, value: string) => {
  const text = value.trim();
  const repo = index.repositories
    .map((item) => item.repo)
    .filter((name) => text === name || text.startsWith(`${name}/`))
    .sort((a, b) => b.length - a.length)[0];
  return {
    repo,
    text: repo ? text.slice(repo.length).replace(/^\//, '') : text,
  };
};

export const getSourceSearchText = (
  index: SourceIndex,
  source: SourceLocation,
): string =>
  catalog(index).filter((repo) => repo.tags.has(source.path)).length > 1
    ? `${source.repo}/${source.path}`
    : source.path;

export const searchSources = (
  index: SourceIndex,
  text: string,
): SourceCandidate[] => {
  text = text.trim();
  if (!text) return [];
  let cache = searches.get(index);
  if (!cache) searches.set(index, (cache = new Map()));
  const key = text;
  const cached = cache.get(key);
  if (cached) return cached;
  const scoped = splitSourceSearch(index, text);
  text = scoped.text;
  if (!text) return [];
  const candidates: SourceCandidate[] = [];
  for (const repo of catalog(index)) {
    if (scoped.repo && scoped.repo !== repo.repo) continue;
    const exact = searchFilePathsByRefName(text, repo.paths);
    for (const match of exact)
      candidates.push({
        repo: repo.repo,
        path: match.filePath,
        availableTags: repo.tags.get(match.filePath)!,
        targetKind: match.targetKind,
        targetPaths: match.targetPaths,
      });
  }
  candidates.sort(compareSourceLocations);
  cache.set(key, candidates);
  return candidates;
};
export const searchAndroidSources = async (
  runtime: AndroidApiQueryRuntime,
  text: string,
  signal?: AbortSignal,
) => searchSources(await loadSourceIndex(runtime, signal), text);
export const toResolution = (
  candidate: SourceCandidate,
): AndroidApiResolution => ({
  source: {
    repo: candidate.repo,
    path: candidate.path,
    url: getMirrorContentUrl(candidate, candidate.availableTags.at(-1)!),
  },
  resolvedTarget: { kind: candidate.targetKind, paths: candidate.targetPaths },
});
export const toSearchFromData = (
  candidate: SourceCandidate,
): SearchFromData => ({
  filePath: candidate.path,
  targetUrl: getSourceTargetUrl(candidate),
  targetKind: candidate.targetKind,
  targetPaths: candidate.targetPaths,
});
