import type { SourceIndex } from './index.ts';
import {
  compareTags,
  groupTags,
  getIndexTags,
  createRepositoryIndex,
} from './index.ts';
import {
  excludedSourceDirectories,
  sourceRepositories,
} from './repositories.ts';

export interface GitTree {
  sha: string;
  truncated: boolean;
  tree: { path: string; type: string; sha: string }[];
}
export interface IndexBuilderRuntime {
  tags(repo: string): Promise<Record<string, string>>;
  tree(repo: string, ref: string, recursive: boolean): Promise<GitTree>;
  progress?(repo: string, tag: string): void;
}
export const readCompleteTree = async (
  runtime: IndexBuilderRuntime,
  repo: string,
  ref: string,
): Promise<GitTree> => {
  const recursive = await runtime.tree(repo, ref, true);
  if (!recursive.truncated) return recursive;
  const root = await runtime.tree(repo, recursive.sha, false);
  if (root.truncated)
    throw new Error(`Non-recursive tree is truncated: ${repo}/${ref}`);
  const tree: GitTree['tree'] = [];
  for (const entry of root.tree) {
    tree.push(entry);
    if (entry.type === 'tree') {
      const child = await readCompleteTree(runtime, repo, entry.sha);
      tree.push(
        ...child.tree.map((item) => ({
          ...item,
          path: `${entry.path}/${item.path}`,
        })),
      );
    }
  }
  return { sha: root.sha, truncated: false, tree };
};
export const buildSourceIndex = async (
  runtime: IndexBuilderRuntime,
  options: {
    tags?: string[];
    revision: string;
    repositories?: readonly {
      repo: string;
      includePrefixes: readonly string[];
    }[];
  },
): Promise<SourceIndex> => {
  const collected: { repo: string; files: Map<string, string[] | null> }[] = [];
  const allTags = new Set<string>();
  for (const rule of options.repositories ?? sourceRepositories) {
    const refs = await runtime.tags(rule.repo);
    const availableTags = Object.keys(refs)
      .filter((tag) => /^android-(8|9|1[0-7])\.\d+\.\d+_r\d+$/.test(tag))
      .sort(compareTags);
    availableTags.forEach((tag) => allTags.add(tag));
    const files = new Map<string, string[] | null>(
      availableTags.map((tag) => [tag, null]),
    );
    const commits = new Map<string, string[]>();
    for (const tag of availableTags) {
      if (options.tags && !options.tags.includes(tag)) continue;
      runtime.progress?.(rule.repo, tag);
      const commit = refs[tag]!;
      let paths = commits.get(commit);
      if (!paths) {
        const tree = await readCompleteTree(runtime, rule.repo, commit);
        paths = tree.tree
          .filter(
            (item) =>
              item.type === 'blob' &&
              /\.(java|aidl)$/.test(item.path) &&
              rule.includePrefixes.some((prefix) =>
                item.path.startsWith(prefix),
              ) &&
              !excludedSourceDirectories.test(item.path),
          )
          .map((item) => item.path)
          .sort((a, b) => a.localeCompare(b));
        commits.set(commit, paths);
      }
      files.set(tag, paths);
    }
    collected.push({ repo: rule.repo, files });
  }
  const versions = groupTags([...allTags]);
  const tags = getIndexTags({ versions });
  return {
    schemaVersion: 3,
    revision: options.revision,
    versions,
    repositories: collected.map(({ repo, files }) =>
      createRepositoryIndex(repo, tags, files),
    ),
  };
};
