import type { SourceLocation } from './index.ts';
import config from './config/source-priority.json' with { type: 'json' };

const rank = (items: readonly string[], matches: (item: string) => boolean) => {
  const index = items.findIndex(matches);
  return index < 0 ? items.length : index;
};
const compareText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
export const compareSourceLocations = (
  a: SourceLocation,
  b: SourceLocation,
): number => {
  for (const field of config.order) {
    let difference = 0;
    if (field === 'extension') {
      difference =
        rank(config.extensions, (ext) => a.path.endsWith(ext)) -
        rank(config.extensions, (ext) => b.path.endsWith(ext));
    } else if (field === 'repository') {
      difference =
        rank(config.repositories, (repo) => a.repo === repo) -
        rank(config.repositories, (repo) => b.repo === repo);
    } else if (field === 'path') {
      difference =
        Number(
          config.deprioritizedPathSegments.some((part) =>
            a.path.includes(part),
          ),
        ) -
          Number(
            config.deprioritizedPathSegments.some((part) =>
              b.path.includes(part),
            ),
          ) ||
        rank(config.pathPrefixes, (prefix) => a.path.startsWith(prefix)) -
          rank(config.pathPrefixes, (prefix) => b.path.startsWith(prefix));
    }
    if (difference) return difference;
  }
  return compareText(a.repo, b.repo) || compareText(a.path, b.path);
};

export const preferSources = <T>(
  items: T[],
  sourceOf: (item: T) => SourceLocation,
): T[] =>
  [...items]
    .sort((a, b) => compareSourceLocations(sourceOf(a), sourceOf(b)))
    .slice(0, 1);
