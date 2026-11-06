import {
  getMirrorContentUrl,
  groupTags,
  getIndexTags,
  createRepositoryIndex,
  type AndroidApiQueryRuntime,
  type SourceIndex,
} from '../src/core/index.ts';
export const base = 'platform/frameworks/base';
export const connectivity = 'platform/packages/modules/Connectivity';
export const oldPath = 'core/java/android/net/IConnectivityManager.aidl';
export const newPath = 'framework/src/android/net/IConnectivityManager.aidl';
export const t11 = 'android-11.0.0_r1',
  t12 = 'android-12.0.0_r1';
export const aidl =
  'package android.net; interface IConnectivityManager { int ping(); }';
export const fixture = (
  entries: { repo: string; tag: string; path: string; content: string }[],
  tags = [...new Set(entries.map((e) => e.tag))],
) => {
  const contents = new Map(
    entries.map((e) => [getMirrorContentUrl(e, e.tag), e.content]),
  );
  const versions = groupTags(tags);
  const orderedTags = getIndexTags({ versions });
  const index: SourceIndex = {
    schemaVersion: 3,
    revision: 'test-1',
    versions,
    repositories: [...new Set(entries.map((e) => e.repo))].map((repo) =>
      createRepositoryIndex(
        repo,
        orderedTags,
        new Map(
          orderedTags.map((tag) => [
            tag,
            entries
              .filter((e) => e.repo === repo && e.tag === tag)
              .map((e) => e.path),
          ]),
        ),
      ),
    ),
  };
  const requests: string[] = [];
  const structures = new Map(),
    queries = new Map(),
    text = new Map();
  const cache = (map: Map<string, any>) => ({
    get: async (key: string) => map.get(key),
    set: async (key: string, value: any) => {
      map.set(key, value);
    },
  });
  const runtime: AndroidApiQueryRuntime = {
    loadSourceIndex: async () => index,
    fetchText: async (url) => {
      requests.push(url);
      return contents.get(url) ?? '404: Not Found';
    },
    structCache: cache(structures),
    queryCache: cache(queries),
    textCache: cache(text),
  };
  return { runtime, index, requests, contents, structures, queries };
};
export const movedFixture = () =>
  fixture([
    { repo: base, tag: t11, path: oldPath, content: aidl },
    { repo: connectivity, tag: t12, path: newPath, content: aidl },
  ]);
