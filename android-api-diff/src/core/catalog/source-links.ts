import {
  getIndexedFiles,
  indexVersions,
  sourceKey,
  type SourceIndex,
  type SourceLocation,
} from './index.ts';
import { searchSources } from './search.ts';

import type { SearchInput } from '../model/types.ts';
import { preferSources } from './preferred-sources.ts';

// Index-only links: file presence is not proof that a requested member exists.
export const getIndexedSourceLinks = (
  index: SourceIndex,
  input: SearchInput,
): Map<string, SourceLocation> => {
  const exactFile = input.mode === 'source' && !input.target;
  const candidates = exactFile
    ? []
    : searchSources(index, input.mode === 'name' ? input.text : input.target!);
  const byTag = new Map<string, SourceLocation[]>();
  for (const candidate of candidates) {
    for (const tag of candidate.availableTags) {
      const sources = byTag.get(tag) ?? [];
      sources.push({ repo: candidate.repo, path: candidate.path });
      byTag.set(tag, sources);
    }
  }
  const contains = (source: SourceLocation, tag: string) => {
    const repo = index.repositories.find((item) => item.repo === source.repo);
    return repo && getIndexedFiles(index, repo, tag)?.includes(source.path);
  };
  const links = new Map<string, SourceLocation>();
  for (const version of indexVersions(index)) {
    for (const tag of version.tags) {
      if (exactFile) {
        if (contains(input.source, tag)) links.set(tag, input.source);
        continue;
      }
      const sources = new Map<string, SourceLocation>();
      for (const candidate of byTag.get(tag) ?? []) {
        sources.set(sourceKey(candidate), candidate);
      }
      if (input.mode === 'source') {
        const preferred = input.source;
        if (contains(preferred, tag)) {
          links.set(tag, preferred);
          continue;
        }
      }
      const all = [...sources.values()];
      const definitions = all.filter(
        (source) => !source.path.includes('/aidl-export/'),
      );
      const available = preferSources(
        definitions.length ? definitions : all,
        (source) => source,
      );
      if (available.length === 1) links.set(tag, available[0]!);
    }
  }
  return links;
};
