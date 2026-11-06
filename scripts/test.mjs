import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const directories = [
  'android-api-diff/scripts',
  'android-api-diff/scripts/parser',
  'android-api-diff/src/cli',
  'android-api-diff/src/node',
  'android-api-diff-web/scripts',
];
// Package tests require a build; java.test.ts downloads external smoke-test data.
const separate = new Set(['package.test.ts', 'java.test.ts']);
const tests = [];
for (const directory of directories) {
  for (const name of (
    await readdir(new URL(`../${directory}/`, import.meta.url))
  ).sort()) {
    if (name.endsWith('.test.ts') && !separate.has(name))
      tests.push(`${directory}/${name}`);
  }
}
const result = spawnSync(process.execPath, ['--test', ...tests], {
  cwd: root,
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
