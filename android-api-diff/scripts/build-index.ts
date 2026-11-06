import { createSourceMetadata } from '../src/core/catalog/metadata.ts';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import { createHash } from 'node:crypto';
import { buildSourceIndex, type GitTree } from '../src/core/catalog/build.ts';

const { values } = parseArgs({
  options: {
    output: { type: 'string', default: '.cache/source-index' },
    tag: { type: 'string', multiple: true },
    bundle: { type: 'boolean' },
  },
});
const output = resolve(values.output!);
const cache = join(output, 'github-cache');
await mkdir(cache, { recursive: true });
const token = process.env.GITHUB_TOKEN;
const index = await buildSourceIndex(
  {
    async tags(repo) {
      const text = execFileSync(
        'git',
        [
          'ls-remote',
          '--tags',
          `https://github.com/msft-mirror-aosp/${repo.replaceAll('/', '.')}.git`,
        ],
        { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
      );
      const refs: Record<string, string> = {};
      for (const line of text.trim().split('\n')) {
        const match =
          /^(\w+)\s+refs\/tags\/(android-\d+\.\d+\.\d+_r\d+)(\^\{\})?$/.exec(
            line.trim(),
          );
        if (match && (!refs[match[2]!] || match[3]))
          refs[match[2]!] = match[1]!;
      }
      return refs;
    },
    async tree(repo, ref, recursive) {
      const key = `${repo.replaceAll('/', '.')}-${ref}-${recursive}.json`;
      const path = join(cache, key);
      try {
        return JSON.parse(await readFile(path, 'utf8')) as GitTree;
      } catch {
        /* Fetch uncached Git objects. */
      }
      const url = `https://api.github.com/repos/msft-mirror-aosp/${repo.replaceAll('/', '.')}/git/trees/${ref}${recursive ? '?recursive=1' : ''}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok)
        throw new Error(
          `GitHub ${response.status}: ${repo}/${ref}; retry with GITHUB_TOKEN if rate limited`,
        );
      const tree = (await response.json()) as GitTree;
      await writeFile(path, JSON.stringify(tree));
      return tree;
    },
    progress(repo, tag) {
      process.stderr.write(`${repo} ${tag}\n`);
    },
  },
  { tags: values.tag, revision: 'pending' },
);
index.revision = createHash('sha256')
  .update(JSON.stringify(index))
  .digest('hex');
const shardDir = join(output, index.revision);
await mkdir(shardDir, { recursive: true });
const repositories = [];
for (const repo of index.repositories) {
  const filename = repo.repo.replaceAll('/', '.') + '.json';
  await writeFile(join(shardDir, filename), JSON.stringify(repo));
  repositories.push({
    repo: repo.repo,
    indexUrl: `${index.revision}/${filename}`,
  });
}
await writeFile(
  join(output, 'manifest.json'),
  JSON.stringify({ ...index, repositories }),
);
const metadata = createSourceMetadata(index);
await writeFile(join(output, 'metadata.json'), JSON.stringify(metadata) + '\n');
if (values.bundle) {
  const generatedDir = new URL(
    '../src/core/catalog/generated/',
    import.meta.url,
  );
  await mkdir(generatedDir, { recursive: true });
  await writeFile(
    new URL('metadata-data.json', generatedDir),
    JSON.stringify(metadata) + '\n',
  );
  await writeFile(
    new URL('index-data.json', generatedDir),
    JSON.stringify(index) + '\n',
  );
}
console.log(`Index written to ${output}; revision ${index.revision}`);
