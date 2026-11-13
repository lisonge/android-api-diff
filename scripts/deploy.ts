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
  const branch = `page-${Date.now()}`;
  const base = `https://cdn.jsdelivr.net/gh/${process.env.GITHUB_REPOSITORY}@${branch}/`;
  await appendFile(
    process.env.GITHUB_ENV!,
    `PAGES_BRANCH=${branch}\nCDN_BASE=${base}\n`,
  );
};

const publish = () => {
  const branch = process.env.PAGES_BRANCH!;
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
  const commit = git(['commit-tree', tree, '-m', `Build ${branch}`], env);
  git(['push', 'origin', `${commit}:refs/heads/${branch}`]);
};

const cleanup = () => {
  const refs = git(['ls-remote', '--heads', 'origin', 'refs/heads/page-*']);
  const branches = Array.from(
    refs.matchAll(/\trefs\/heads\/(page-\d+)$/gm),
    (match) => match[1],
  )
    .filter((branch) => branch !== process.env.PAGES_BRANCH)
    .sort((a, b) => Number(b.slice(5)) - Number(a.slice(5)));
  for (const branch of branches.slice(2)) {
    git(['push', 'origin', '--delete', branch]);
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
