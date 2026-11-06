import { sourceRepositories } from './repositories.ts';
import { androidVersionInfos } from './android-versions.ts';
import type {
  AndroidApiQueryRuntime,
  AndroidVersionItem,
} from '../model/types.ts';

export interface SourceLocation {
  repo: string;
  path: string;
}
export interface VersionTags {
  version: string;
  revisions: number[];
}
export interface RepositorySourceIndex {
  repo: string;
  paths: string[];
  snapshots: number[][];
  /** Aligned with expanded global versions: -1 unavailable, -2 not indexed. */
  tagSnapshots: number[];
}
export interface SourceIndex {
  schemaVersion: 3;
  revision: string;
  versions: VersionTags[];
  repositories: RepositorySourceIndex[];
}
export interface SourceIndexManifest {
  schemaVersion: 3;
  revision: string;
  versions: VersionTags[];
  repositories: { repo: string; indexUrl: string }[];
}
export const TAG_UNAVAILABLE = -1;
export const TAG_NOT_INDEXED = -2;
export const compareTags = (a: string, b: string): number => {
  const aa = a.match(/\d+/g)!.map(Number),
    bb = b.match(/\d+/g)!.map(Number);
  for (let i = 0; i < aa.length; i++)
    if (aa[i] !== bb[i]) return aa[i]! - bb[i]!;
  return 0;
};
export const groupTags = (tags: readonly string[]): VersionTags[] => {
  const versions = new Map<string, number[]>();
  for (const tag of [...new Set(tags)].sort(compareTags)) {
    const match = /^android-(\d+\.\d+\.\d+)_r(\d+)$/.exec(tag);
    if (!match) throw new Error(`Invalid Android tag: ${tag}`);
    const revisions = versions.get(match[1]!) ?? [];
    revisions.push(Number(match[2]));
    versions.set(match[1]!, revisions);
  }
  return [...versions].map(([version, revisions]) => ({ version, revisions }));
};
const tagCatalogs = new WeakMap<
  VersionTags[],
  { tags: string[]; positions: Map<string, number> }
>();
const tagCatalog = (index: Pick<SourceIndex, 'versions'>) => {
  let value = tagCatalogs.get(index.versions);
  if (!value) {
    const tags = index.versions.flatMap((v) =>
      v.revisions.map((r) => `android-${v.version}_r${r}`),
    );
    value = { tags, positions: new Map(tags.map((tag, i) => [tag, i])) };
    tagCatalogs.set(index.versions, value);
  }
  return value;
};
export const getIndexTags = (index: Pick<SourceIndex, 'versions'>): string[] =>
  tagCatalog(index).tags;
export const getTagSnapshot = (
  index: Pick<SourceIndex, 'versions'>,
  repo: RepositorySourceIndex,
  tag: string,
): number => {
  const position = tagCatalog(index).positions.get(tag);
  return position === undefined
    ? TAG_UNAVAILABLE
    : repo.tagSnapshots[position]!;
};
/** Missing map entries mean unavailable tags; null means available but unscanned. */
export const createRepositoryIndex = (
  repo: string,
  tags: readonly string[],
  files: ReadonlyMap<string, readonly string[] | null>,
): RepositorySourceIndex => {
  const paths = [
    ...new Set([...files.values()].flatMap((value) => value ?? [])),
  ].sort((a, b) => a.localeCompare(b));
  const ids = new Map(paths.map((path, i) => [path, i]));
  const snapshots: number[][] = [];
  const signatures = new Map<string, number>();
  const tagSnapshots = tags.map((tag) => {
    const list = files.get(tag);
    if (list === undefined) return TAG_UNAVAILABLE;
    if (list === null) return TAG_NOT_INDEXED;
    const snapshot = [...new Set(list.map((path) => ids.get(path)!))].sort(
      (a, b) => a - b,
    );
    const signature = JSON.stringify(snapshot);
    let id = signatures.get(signature);
    if (id === undefined) {
      id = snapshots.length;
      snapshots.push(snapshot);
      signatures.set(signature, id);
    }
    return id;
  });
  return { repo, paths, snapshots, tagSnapshots };
};
export const bundledIndexUrl = new URL(
  './generated/index-data.json',
  import.meta.url,
);
const bundled = new WeakMap<AndroidApiQueryRuntime, Promise<SourceIndex>>();
export const loadSourceIndex = async (
  runtime: AndroidApiQueryRuntime,
  signal?: AbortSignal,
): Promise<SourceIndex> => {
  signal?.throwIfAborted();
  if (runtime.loadSourceIndex) return runtime.loadSourceIndex(signal);
  if (runtime.indexUrl) {
    const manifest = JSON.parse(
      await runtime.fetchText(runtime.indexUrl, signal),
    ) as SourceIndexManifest;
    if (manifest.schemaVersion !== 3)
      throw new Error('Unsupported source index schema');
    const repositories = await Promise.all(
      manifest.repositories.map(async (item) => {
        const url = new URL(item.indexUrl, runtime.indexUrl).href;
        const key = `index:3:${manifest.revision}:${item.repo}`;
        const cached = await runtime.textCache?.get(key);
        const text = cached ?? (await runtime.fetchText(url, signal));
        const shard = JSON.parse(text) as RepositorySourceIndex;
        if (shard.repo !== item.repo)
          throw new Error('Source index repository mismatch');
        if (cached === undefined) await runtime.textCache?.set(key, text);
        return shard;
      }),
    );
    return { ...manifest, repositories };
  }
  let loading = bundled.get(runtime);
  if (!loading) {
    loading = runtime
      .fetchText(bundledIndexUrl.href, signal)
      .then((text) => {
        const index = JSON.parse(text) as SourceIndex;
        if (index.schemaVersion !== 3)
          throw new Error('Unsupported source index schema');
        return index;
      })
      .catch((error) => {
        bundled.delete(runtime);
        throw error;
      });
    bundled.set(runtime, loading);
  }
  return loading;
};
const decodedSnapshots = new WeakMap<
  RepositorySourceIndex,
  Map<number, string[]>
>();
export const getIndexedFiles = (
  index: Pick<SourceIndex, 'versions'>,
  repo: RepositorySourceIndex,
  tag: string,
): string[] | undefined => {
  const id = getTagSnapshot(index, repo, tag);
  if (id < 0) return undefined;
  let cache = decodedSnapshots.get(repo);
  if (!cache) decodedSnapshots.set(repo, (cache = new Map()));
  let paths = cache.get(id);
  if (!paths) {
    paths = repo.snapshots[id]!.map((pathId) => repo.paths[pathId]!);
    cache.set(id, paths);
  }
  return paths;
};
export const indexVersions = (
  index: Pick<SourceIndex, 'versions'>,
): AndroidVersionItem[] =>
  androidVersionInfos
    .map((info) => ({
      ...info,
      tags: getIndexTags(index)
        .filter((tag) => {
          const [, major, minor] = /^android-(\d+)\.(\d+)\./.exec(tag) ?? [];
          return (minor === '0' ? major : `${major}.${minor}`) === info.version;
        })
        .sort(compareTags),
      futureTags: [],
    }))
    .filter((v) => v.tags.length);
export const sourceKey = (source: SourceLocation): string =>
  `${source.repo}/${source.path}`;
export const validateSource = (source: SourceLocation): SourceLocation => {
  if (!sourceRepositories.some((item) => item.repo === source.repo))
    throw new Error(`Repository is not enabled: ${source.repo}`);
  if (
    !source.path ||
    source.path.split('/').some((p) => !p || p === '.' || p === '..') ||
    /[\\%?#\u0000-\u001f]/.test(source.path)
  )
    throw new Error('Invalid repository-relative source path');
  return source;
};
