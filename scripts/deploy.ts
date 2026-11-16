import { execFileSync } from 'node:child_process';
import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const dist = resolve('android-api-diff-web/dist');
const git = (args: string[], env = process.env) =>
  execFileSync('git', args, {
    encoding: 'utf8',
    env,
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim();

const initialize = async () => {
  const tag = `0.0.0-page.${Date.now()}`;
  const base = `https://cdn.jsdelivr.net/gh/${process.env.GITHUB_REPOSITORY}@${tag}/`;
  await appendFile(
    process.env.GITHUB_ENV!,
    `PAGES_TAG=${tag}\nCDN_BASE=${base}\n`,
  );
};

const publish = () => {
  const tag = process.env.PAGES_TAG!;
  const env = {
    ...process.env,
    GIT_INDEX_FILE: resolve(process.env.RUNNER_TEMP!, 'pages-index'),
    GIT_AUTHOR_NAME: 'github-actions[bot]',
    GIT_AUTHOR_EMAIL: '41898282+github-actions[bot]@users.noreply.github.com',
    GIT_COMMITTER_NAME: 'github-actions[bot]',
    GIT_COMMITTER_EMAIL:
      '41898282+github-actions[bot]@users.noreply.github.com',
  };
  git(['read-tree', '--empty'], env);
  git([`--work-tree=${dist}`, 'add', '--all'], env);
  const tree = git(['write-tree'], env);
  const commit = git(['commit-tree', tree, '-m', `Build ${tag}`], env);
  git(['push', 'origin', `${commit}:refs/tags/${tag}`]);
};

const cleanup = () => {
  const current = `refs/tags/${process.env.PAGES_TAG}`;
  const refs = git([
    'ls-remote',
    '--refs',
    'origin',
    'refs/tags/0.0.0-page.*',
    'refs/heads/page-*',
  ]);
  const builds = Array.from(
    refs.matchAll(/\t(refs\/(?:tags\/0\.0\.0-page\.|heads\/page-)(\d+))$/gm),
    ([, ref, timestamp]) => ({ ref, timestamp: Number(timestamp) }),
  )
    .filter(({ ref }) => ref !== current)
    .sort((a, b) => b.timestamp - a.timestamp);
  for (const { ref } of builds.slice(2)) {
    git(['push', 'origin', '--delete', ref]);
  }
};

switch (process.argv[2]) {
  case 'init':
    await initialize();
    break;
  case 'publish':
    publish();
    break;
  case 'cleanup':
    cleanup();
    break;
  default:
    throw new Error('Usage: node scripts/deploy.ts <init|publish|cleanup>');
}
