import { getIndexTags } from '../core/catalog/index.ts';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import packageJson from '../../package.json' with { type: 'json' };
import { parseCliArgs, runCli } from './index.ts';
import {
  findProjectRoot,
  getSkillSource,
  skillRemovalOutputReportsFailure,
} from './installer.ts';

const createOutput = () => {
  let stdout = '';
  let stderr = '';
  const io = {
    stdout: {
      isTTY: false,
      write(chunk: string | Uint8Array) {
        stdout += chunk.toString();
        return true;
      },
    },
    stderr: {
      isTTY: false,
      write(chunk: string | Uint8Array) {
        stderr += chunk.toString();
        return true;
      },
    },
  };
  return {
    io,
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
  };
};

test('finds the nearest Git or Gradle project root', async (context) => {
  const gitRoot = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
  const gradleRoot = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
  context.after(() =>
    Promise.all([
      rm(gitRoot, { recursive: true, force: true }),
      rm(gradleRoot, { recursive: true, force: true }),
    ]),
  );
  const gitNested = join(gitRoot, 'app', 'src');
  const gradleNested = join(gradleRoot, 'app');
  await mkdir(join(gitRoot, '.git'));
  await mkdir(gitNested, { recursive: true });
  await mkdir(gradleNested);
  await writeFile(join(gradleRoot, 'settings.gradle.kts'), '');

  assert.equal(findProjectRoot(gitNested), gitRoot);
  assert.equal(findProjectRoot(gradleNested), gradleRoot);
});

test('recognizes incomplete upstream Skill removal output', () => {
  assert.equal(
    skillRemovalOutputReportsFailure(
      'Could not remove skill from Codex: access denied',
    ),
    true,
  );
  assert.equal(
    skillRemovalOutputReportsFailure('Failed to remove 1 skill(s)'),
    true,
  );
  assert.equal(
    skillRemovalOutputReportsFailure('Successfully removed 1 skill(s)'),
    false,
  );
});

test('skill install changes only the project Skill', async () => {
  const output = createOutput();
  const calls: {
    args: readonly string[];
    command: string;
    cwd?: string;
  }[] = [];
  const exitCode = await runCli(['skill', 'install'], {
    io: output.io,
    installRuntime: {
      async run(command, args, _signal, options) {
        calls.push({
          command,
          args,
          ...(options?.cwd ? { cwd: options.cwd } : {}),
        });
      },
    },
  });

  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  const skillSource = getSkillSource(packageJson.version);
  assert.equal(exitCode, 0);
  assert.deepEqual(calls, [
    {
      command: 'skills',
      args: ['add', skillSource, '--agent', 'codex', '--yes'],
      cwd: projectRoot,
    },
  ]);
  assert.deepEqual(JSON.parse(output.stdout), {
    ok: true,
    command: 'skill',
    action: 'install',
    result: {
      skill: {
        agent: 'codex',
        name: 'android-api-diff',
        path: join(projectRoot, '.agents', 'skills', 'android-api-diff'),
        scope: 'project',
        source: skillSource,
      },
    },
  });
});

test('skill remove targets only the project Codex Skill', async () => {
  const output = createOutput();
  const calls: {
    args: readonly string[];
    command: string;
    cwd?: string;
  }[] = [];
  const exitCode = await runCli(['skill', 'remove'], {
    io: output.io,
    installRuntime: {
      pathExists() {
        return false;
      },
      readTextFile() {
        return undefined;
      },
      async run(command, args, _signal, options) {
        calls.push({
          command,
          args,
          ...(options?.cwd ? { cwd: options.cwd } : {}),
        });
      },
    },
  });

  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  assert.equal(exitCode, 0);
  assert.deepEqual(calls, [
    {
      command: 'skills',
      args: ['remove', 'android-api-diff', '--agent', 'codex', '--yes'],
      cwd: projectRoot,
    },
  ]);
  assert.deepEqual(JSON.parse(output.stdout), {
    ok: true,
    command: 'skill',
    action: 'remove',
    result: {
      skill: {
        name: 'android-api-diff',
        path: join(projectRoot, '.agents', 'skills', 'android-api-diff'),
        scope: 'project',
      },
    },
  });
});

test('skill remove cleans a canonical path retained for another agent', async () => {
  const output = createOutput();
  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  const skillPath = join(projectRoot, '.agents', 'skills', 'android-api-diff');
  const remainingPaths = new Set([skillPath]);
  const removedPaths: string[] = [];

  const exitCode = await runCli(['skill', 'remove'], {
    io: output.io,
    installRuntime: {
      pathExists(path) {
        return remainingPaths.has(path);
      },
      readTextFile() {
        return undefined;
      },
      removePath(path) {
        removedPaths.push(path);
        remainingPaths.delete(path);
      },
      async run() {},
    },
  });

  assert.equal(exitCode, 0);
  assert.deepEqual(removedPaths, [skillPath]);
  assert.equal(remainingPaths.size, 0);
  assert.deepEqual(JSON.parse(output.stdout).result.skill, {
    name: 'android-api-diff',
    path: skillPath,
    scope: 'project',
  });
});

test('skill remove supports global cleanup without a project directory', async () => {
  const output = createOutput();
  const calls: {
    args: readonly string[];
    command: string;
    cwd?: string;
  }[] = [];
  const exitCode = await runCli(
    ['skill', 'remove', '--skill-scope', 'global'],
    {
      cwd: join(tmpdir(), 'not-a-project'),
      io: output.io,
      installRuntime: {
        pathExists() {
          return false;
        },
        readTextFile() {
          return undefined;
        },
        async run(command, args, _signal, options) {
          calls.push({
            command,
            args,
            ...(options?.cwd ? { cwd: options.cwd } : {}),
          });
        },
      },
    },
  );

  assert.equal(exitCode, 0);
  assert.deepEqual(calls, [
    {
      command: 'skills',
      args: [
        'remove',
        'android-api-diff',
        '--agent',
        'codex',
        '--global',
        '--yes',
      ],
      cwd: homedir(),
    },
  ]);
  assert.deepEqual(JSON.parse(output.stdout).result.skill, {
    name: 'android-api-diff',
    path: join(homedir(), '.agents', 'skills', 'android-api-diff'),
    scope: 'global',
  });
});

test('project Skill subcommands fail before mutation when no project is found', async (context) => {
  const cwd = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
  context.after(() => rm(cwd, { recursive: true, force: true }));

  for (const action of ['install', 'remove'] as const) {
    const output = createOutput();
    let callCount = 0;
    const exitCode = await runCli(['skill', action], {
      cwd,
      io: output.io,
      installRuntime: {
        async run() {
          callCount += 1;
        },
      },
    });

    assert.equal(exitCode, 1);
    assert.equal(callCount, 0);
    assert.equal(output.stdout, '');
    assert.match(
      JSON.parse(output.stderr).error.message,
      /requires a Git or Gradle project/,
    );
  }
});

test('skill install reports an exact retry command', async () => {
  const output = createOutput();
  let callCount = 0;
  const exitCode = await runCli(['skill', 'install'], {
    io: output.io,
    installRuntime: {
      async run() {
        callCount += 1;
        throw new Error('skills installer unavailable');
      },
    },
  });

  assert.equal(exitCode, 1);
  assert.equal(callCount, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  assert.equal(response.ok, false);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.match(response.error.message, /The Skill installation failed/);
  assert.ok(response.error.message.includes(projectRoot));
  assert.match(response.error.message, /android-api-diff skill install/);
  assert.doesNotMatch(response.error.message, /--global/);
});

test('skill remove reports an exact retry command', async () => {
  const output = createOutput();
  const exitCode = await runCli(['skill', 'remove'], {
    io: output.io,
    installRuntime: {
      async run() {
        throw new Error('skills remover unavailable');
      },
    },
  });

  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  assert.equal(exitCode, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.match(response.error.message, /The Skill removal failed/);
  assert.ok(response.error.message.includes(projectRoot));
  assert.match(response.error.message, /android-api-diff skill remove/);
  assert.doesNotMatch(response.error.message, /--agent/);
});

test('skill remove rejects a false-success when the Skill path remains', async () => {
  const output = createOutput();
  const exitCode = await runCli(['skill', 'remove'], {
    io: output.io,
    installRuntime: {
      pathExists() {
        return true;
      },
      readTextFile() {
        return undefined;
      },
      async run() {},
    },
  });

  assert.equal(exitCode, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.match(response.error.message, /command completed/);
  assert.match(response.error.message, /still exist/);
});

test('global Skill removal verifies the Codex-native path', async () => {
  const output = createOutput();
  const codexPath = join(homedir(), '.codex', 'skills', 'android-api-diff');
  const exitCode = await runCli(
    ['skill', 'remove', '--skill-scope', 'global'],
    {
      io: output.io,
      installRuntime: {
        pathExists(path) {
          return path === codexPath;
        },
        readTextFile() {
          return undefined;
        },
        async run() {},
      },
    },
  );

  assert.equal(exitCode, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.ok(response.error.message.includes(codexPath));
});

test('Skill removal rejects a dangling Codex path', async (context) => {
  const output = createOutput();
  const projectRoot = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
  context.after(() => rm(projectRoot, { recursive: true, force: true }));
  await mkdir(join(projectRoot, '.git'));
  const skillPath = join(projectRoot, '.agents', 'skills', 'android-api-diff');
  await mkdir(join(projectRoot, '.agents', 'skills'), { recursive: true });
  await symlink(
    join(projectRoot, 'missing-skill-target'),
    skillPath,
    process.platform === 'win32' ? 'junction' : 'dir',
  );

  const exitCode = await runCli(['skill', 'remove'], {
    cwd: projectRoot,
    io: output.io,
    installRuntime: {
      readTextFile() {
        return undefined;
      },
      async run() {},
    },
  });

  assert.equal(exitCode, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.ok(response.error.message.includes(skillPath));
  assert.match(response.error.message, /symbolic link or junction/);
});

test('project Skill management rejects symlinked writable paths', async (context) => {
  for (const entry of ['.agents', 'skills-lock.json']) {
    const output = createOutput();
    const projectRoot = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
    const externalRoot = await mkdtemp(join(tmpdir(), 'android-api-diff-'));
    context.after(() =>
      Promise.all([
        rm(projectRoot, { recursive: true, force: true }),
        rm(externalRoot, { recursive: true, force: true }),
      ]),
    );
    await mkdir(join(projectRoot, '.git'));
    const linkedPath = join(projectRoot, entry);
    await symlink(
      externalRoot,
      linkedPath,
      process.platform === 'win32' ? 'junction' : 'dir',
    );
    let callCount = 0;

    const exitCode = await runCli(['skill', 'install'], {
      cwd: projectRoot,
      io: output.io,
      installRuntime: {
        async run() {
          callCount += 1;
        },
      },
    });

    assert.equal(exitCode, 1);
    assert.equal(callCount, 0);
    assert.equal(output.stdout, '');
    const response = JSON.parse(output.stderr);
    assert.equal(response.error.code, 'INSTALL_FAILED');
    assert.ok(response.error.message.includes(linkedPath));
    assert.match(response.error.message, /symbolic link or junction/);
  }
});

test('Skill removal rejects a stale lock entry', async () => {
  const output = createOutput();
  const projectRoot = findProjectRoot(process.cwd());
  assert.ok(projectRoot);
  const lockPath = join(projectRoot, 'skills-lock.json');
  const exitCode = await runCli(['skill', 'remove'], {
    io: output.io,
    installRuntime: {
      pathExists() {
        return false;
      },
      readTextFile(path) {
        assert.equal(path, lockPath);
        return JSON.stringify({
          version: 1,
          skills: {
            'android-api-diff': {},
          },
        });
      },
      async run() {},
    },
  });

  assert.equal(exitCode, 1);
  assert.equal(output.stdout, '');
  const response = JSON.parse(output.stderr);
  assert.equal(response.error.code, 'INSTALL_FAILED');
  assert.ok(response.error.message.includes(lockPath));
  assert.match(response.error.message, /still tracks android-api-diff/);
});

test('new CLI inputs are explicit and old query syntax is rejected', () => {
  assert.deepEqual(parseCliArgs(['search', 'connectivity']), {
    command: 'search',
    text: 'connectivity',
    format: 'json',
  });
  assert.deepEqual(parseCliArgs(['query', '--name', 'IConnectivityManager']), {
    command: 'query',
    input: { mode: 'name', text: 'IConnectivityManager' },
    minSdk: undefined,
    format: 'json',
  });
  assert.throws(() => parseCliArgs(['resolve', 'Example']), /unknown command/);
  assert.throws(() => parseCliArgs(['query', 'Example']), /named options/);
  assert.throws(
    () =>
      parseCliArgs([
        'query',
        '--name',
        'Example',
        '--repo',
        'platform/frameworks/base',
      ]),
    /mutually exclusive/,
  );
  assert.throws(
    () => parseCliArgs(['query', '--path', 'core/java/a.java']),
    /required together/,
  );
  assert.throws(
    () =>
      parseCliArgs([
        'source',
        '--repo',
        'platform/frameworks/base',
        '--path',
        'a.java',
      ]),
    /tag/,
  );
  assert.throws(
    () => parseCliArgs(['search', 'Example', '--min-sdk', '30']),
    /does not accept/,
  );
  assert.throws(
    () =>
      parseCliArgs(['query', '--name', 'Example', '--source-path', 'a.java']),
    /Unknown option/,
  );
});

test('search writes repository-qualified candidates as JSON', async () => {
  const { movedFixture } = await import('../../scripts/fixtures.ts');
  const output = createOutput();
  const code = await runCli(['search', 'IConnectivityManager'], {
    io: output.io,
    runtime: movedFixture().runtime,
  });
  assert.equal(code, 0);
  assert.equal(output.stderr, '');
  const response = JSON.parse(output.stdout);
  assert.equal(response.command, 'search');
  assert.equal(response.result.candidates.length, 2);
  assert.ok(response.result.candidates.every((c: any) => c.repo && c.path));
});

test('query supports names and precise source anchors with migration tracking', async () => {
  const { movedFixture, base, oldPath, t11, connectivity } =
    await import('../../scripts/fixtures.ts');
  for (const args of [
    ['query', '--name', 'IConnectivityManager.ping'],
    [
      'query',
      '--repo',
      base,
      '--path',
      oldPath,
      '--target',
      'IConnectivityManager.ping',
      '--anchor-tag',
      t11,
    ],
  ]) {
    const output = createOutput();
    assert.equal(
      await runCli(args, { io: output.io, runtime: movedFixture().runtime }),
      0,
    );
    const result = JSON.parse(output.stdout).result;
    assert.deepEqual(
      result.tags.map((t: any) => t.source.repo),
      [base, connectivity],
    );
    assert.equal('source' in result, false);
  }
});

test('source is exact and missing files produce structured errors', async () => {
  const { movedFixture, base, oldPath, t12, connectivity, newPath } =
    await import('../../scripts/fixtures.ts');
  const output = createOutput();
  assert.equal(
    await runCli(
      ['source', '--repo', connectivity, '--path', newPath, '--tag', t12],
      { io: output.io, runtime: movedFixture().runtime },
    ),
    0,
  );
  assert.equal(JSON.parse(output.stdout).result.repo, connectivity);
  const missing = createOutput();
  assert.equal(
    await runCli(['source', '--repo', base, '--path', oldPath, '--tag', t12], {
      io: missing.io,
      runtime: movedFixture().runtime,
    }),
    0,
  );
  assert.equal(JSON.parse(missing.stdout).result.status, 'not-found');
  assert.equal(missing.stderr, '');
});

test('invalid arguments produce only structured stderr', async () => {
  const output = createOutput();
  assert.equal(
    await runCli(['query', '--path', 'a.java'], { io: output.io }),
    2,
  );
  assert.equal(output.stdout, '');
  assert.equal(JSON.parse(output.stderr).error.code, 'INVALID_ARGUMENT');
});

test('CLI generation works with complete coverage and rejects incomplete coverage', async () => {
  const { movedFixture, t11 } = await import('../../scripts/fixtures.ts');
  const good = createOutput();
  assert.equal(
    await runCli(['generate', '--name', 'IConnectivityManager.ping'], {
      io: good.io,
      runtime: movedFixture().runtime,
    }),
    0,
  );
  assert.match(JSON.parse(good.stdout).result.code, /ping/);
  const { runtime, index } = movedFixture();
  index.repositories[0]!.tagSnapshots[getIndexTags(index).indexOf(t11)] = -2;
  const bad = createOutput();
  assert.equal(
    await runCli(['generate', '--name', 'IConnectivityManager.ping'], {
      io: bad.io,
      runtime,
    }),
    1,
  );
  assert.match(
    JSON.parse(bad.stderr).error.message,
    /source queries have errors/,
  );
});

test('entrypoint help and version remain usable', async () => {
  const output = createOutput();
  assert.equal(await runCli(['--help'], { io: output.io }), 0);
  assert.match(output.stdout, /query --name/);
  const version = createOutput();
  assert.equal(await runCli(['--version'], { io: version.io }), 0);
  assert.match(version.stdout, new RegExp(packageJson.version));
});
