import { spawn } from 'node:child_process';
import {
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

const SKILL_NAME = 'android-api-diff';
const SKILL_REPOSITORY = 'lisonge/android-api-diff';
const PROJECT_MARKERS = ['.git', 'settings.gradle', 'settings.gradle.kts'];
const require = createRequire(import.meta.url);
const SKILLS_CLI_PATH = join(
  dirname(require.resolve('skills/package.json')),
  'bin',
  'cli.mjs',
);

export type SkillScope = 'project' | 'global';

export interface InstallRunOptions {
  cwd?: string;
}

export interface InstallRuntime {
  pathExists?(path: string): boolean;
  readTextFile?(path: string): string | undefined;
  removePath?(path: string): void | Promise<void>;
  run(
    command: 'skills',
    args: readonly string[],
    signal: AbortSignal,
    options?: InstallRunOptions,
  ): Promise<void>;
}

export interface SkillTarget {
  name: string;
  path: string;
  scope: SkillScope;
}

export interface SkillInstallResult extends SkillTarget {
  agent: 'codex';
  source: string;
}

export class InstallCommandError extends Error {
  readonly code = 'INSTALL_FAILED';
}

export const getSkillSource = (version: string): string => {
  return `https://github.com/${SKILL_REPOSITORY}/tree/v${version}/skills/${SKILL_NAME}`;
};

export const skillRemovalOutputReportsFailure = (output: string): boolean => {
  return (
    output.includes('Could not remove skill from') ||
    output.includes('Failed to remove')
  );
};

export const findProjectRoot = (cwd: string): string | undefined => {
  let current = resolve(cwd);
  while (true) {
    if (PROJECT_MARKERS.some((marker) => existsSync(join(current, marker)))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) return undefined;
    current = parent;
  }
};

const readOptionalTextFile = (path: string): string | undefined => {
  try {
    return readFileSync(path, 'utf8');
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return undefined;
    }
    throw error;
  }
};

const pathEntryExists = (path: string): boolean => {
  try {
    lstatSync(path);
    return true;
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return false;
    }
    throw error;
  }
};

interface ResolvedSkillTarget {
  commandCwd: string;
  lockPath: string;
  skill: SkillTarget;
  verificationPaths: readonly string[];
}

const resolveEnvironmentPath = (value: string, cwd: string): string => {
  return isAbsolute(value) ? value : resolve(cwd, value);
};

const getGlobalLockPath = (home: string): string => {
  const stateHome = process.env.XDG_STATE_HOME?.trim();
  return stateHome
    ? join(
        resolveEnvironmentPath(stateHome, home),
        'skills',
        '.skill-lock.json',
      )
    : join(home, '.agents', '.skill-lock.json');
};

const isPathInside = (root: string, path: string): boolean => {
  const relativePath = relative(root, path);
  return (
    relativePath === '' ||
    (relativePath !== '..' &&
      !relativePath.startsWith(`..${sep}`) &&
      !isAbsolute(relativePath))
  );
};

const assertSafeProjectEntry = (projectRoot: string, path: string): void => {
  if (!isPathInside(projectRoot, path)) {
    throw new InstallCommandError(
      `Project Skill management refuses a path outside ${projectRoot}: ${path}`,
    );
  }

  let stats;
  try {
    stats = lstatSync(path);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return;
    }
    throw new InstallCommandError(
      `Project Skill management could not verify ${path}`,
      { cause: error },
    );
  }
  if (stats.isSymbolicLink()) {
    throw new InstallCommandError(
      `Project Skill management refuses the symbolic link or junction at ${path}`,
    );
  }

  let realPath: string;
  try {
    realPath = realpathSync(path);
  } catch (error) {
    throw new InstallCommandError(
      `Project Skill management could not resolve ${path}`,
      { cause: error },
    );
  }
  if (!isPathInside(projectRoot, realPath)) {
    throw new InstallCommandError(
      `Project Skill management refuses ${path} because it resolves outside ${projectRoot}`,
    );
  }
};

const assertSafeProjectTarget = (target: ResolvedSkillTarget): void => {
  if (target.skill.scope !== 'project') return;
  const projectRoot = target.commandCwd;
  for (const path of [
    join(projectRoot, '.agents'),
    join(projectRoot, '.agents', 'skills'),
    target.skill.path,
    target.lockPath,
  ]) {
    assertSafeProjectEntry(projectRoot, path);
  }
};

const resolveSkillTarget = (
  scope: SkillScope,
  cwd: string,
): ResolvedSkillTarget => {
  const projectRoot = scope === 'project' ? findProjectRoot(cwd) : undefined;
  if (scope === 'project' && !projectRoot) {
    throw new InstallCommandError(
      'Project-scoped Skill management requires a Git or Gradle project. Run this command from the target project, or use --skill-scope global.',
    );
  }
  const home = homedir();
  const resolvedProjectRoot =
    scope === 'project' ? realpathSync(projectRoot!) : undefined;
  const baseDir = scope === 'global' ? home : resolvedProjectRoot!;
  const canonicalPath = join(baseDir, '.agents', 'skills', SKILL_NAME);
  const configuredCodexHome = process.env.CODEX_HOME?.trim();
  const codexHome = configuredCodexHome
    ? resolveEnvironmentPath(configuredCodexHome, home)
    : join(home, '.codex');
  const verificationPaths =
    scope === 'global'
      ? [
          ...new Set([
            canonicalPath,
            join(codexHome, 'skills', SKILL_NAME),
            join(home, '.codex', 'skills', SKILL_NAME),
          ]),
        ]
      : [canonicalPath];
  return {
    commandCwd: scope === 'global' ? home : resolvedProjectRoot!,
    lockPath:
      scope === 'global'
        ? getGlobalLockPath(home)
        : join(resolvedProjectRoot!, 'skills-lock.json'),
    skill: {
      name: SKILL_NAME,
      path: canonicalPath,
      scope,
    },
    verificationPaths,
  };
};

const getRetryMessage = (
  action: 'install' | 'remove',
  target: ResolvedSkillTarget,
): string => {
  const retryLocation =
    target.skill.scope === 'project' ? ` from ${target.commandCwd}` : '';
  const scopeOption =
    target.skill.scope === 'global' ? ' --skill-scope global' : '';
  return `Retry${retryLocation} with: android-api-diff skill ${action}${scopeOption}`;
};

const getSkillInstallArgs = (version: string, scope: SkillScope): string[] => {
  return [
    'add',
    getSkillSource(version),
    '--agent',
    'codex',
    ...(scope === 'global' ? ['--global'] : []),
    '--yes',
  ];
};

const getSkillRemoveArgs = (scope: SkillScope): string[] => {
  return [
    'remove',
    SKILL_NAME,
    '--agent',
    'codex',
    ...(scope === 'global' ? ['--global'] : []),
    '--yes',
  ];
};

export const createNodeInstallRuntime = (
  stderr: Pick<NodeJS.WriteStream, 'write'>,
): InstallRuntime => ({
  pathExists: pathEntryExists,
  readTextFile: readOptionalTextFile,
  removePath(path) {
    rmSync(path, { force: true, recursive: true });
  },
  run(command, args, signal, options) {
    return new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [SKILLS_CLI_PATH, ...args], {
        cwd: options?.cwd,
        env: {
          ...process.env,
          DISABLE_TELEMETRY: '1',
          DO_NOT_TRACK: '1',
        },
        signal,
        stdio: ['inherit', 'pipe', 'pipe'],
        windowsHide: true,
      });

      let removalOutputTail = '';
      let removalFailureReported = false;
      let childError: Error | undefined;
      const inspectRemovalOutput = (chunk: Buffer): void => {
        if (args[0] !== 'remove') return;
        removalOutputTail = `${removalOutputTail}${chunk.toString('utf8')}`;
        if (skillRemovalOutputReportsFailure(removalOutputTail)) {
          removalFailureReported = true;
        }
        removalOutputTail = removalOutputTail.slice(-256);
      };
      child.stdout.on('data', (chunk: Buffer) => {
        inspectRemovalOutput(chunk);
        stderr.write(chunk);
      });
      child.stderr.on('data', (chunk: Buffer) => {
        inspectRemovalOutput(chunk);
        stderr.write(chunk);
      });
      child.once('error', (error) => {
        childError = error;
      });
      child.once('close', (code, childSignal) => {
        if (childError) {
          reject(childError);
          return;
        }
        if (code === 0 && !removalFailureReported) {
          resolve();
          return;
        }
        reject(
          new InstallCommandError(
            childSignal
              ? `${command} was terminated by ${childSignal}`
              : removalFailureReported
                ? 'skills reported an incomplete removal'
                : `${command} exited with code ${code ?? 'unknown'}`,
          ),
        );
      });
    });
  },
});

export const installSkill = async (
  runtime: InstallRuntime,
  version: string,
  skillScope: SkillScope,
  cwd: string,
  signal: AbortSignal,
): Promise<SkillInstallResult> => {
  const target = resolveSkillTarget(skillScope, cwd);
  assertSafeProjectTarget(target);
  const skillArgs = getSkillInstallArgs(version, skillScope);
  try {
    await runtime.run('skills', skillArgs, signal, {
      cwd: target.commandCwd,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new InstallCommandError(
      `The Skill installation failed. ${getRetryMessage('install', target)}`,
      { cause: error },
    );
  }
  return {
    ...target.skill,
    agent: 'codex',
    source: getSkillSource(version),
  };
};

export const removeSkill = async (
  runtime: InstallRuntime,
  skillScope: SkillScope,
  cwd: string,
  signal: AbortSignal,
): Promise<SkillTarget> => {
  const target = resolveSkillTarget(skillScope, cwd);
  assertSafeProjectTarget(target);
  const skillArgs = getSkillRemoveArgs(skillScope);
  try {
    await runtime.run('skills', skillArgs, signal, {
      cwd: target.commandCwd,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new InstallCommandError(
      `The Skill removal failed. ${getRetryMessage('remove', target)}`,
      { cause: error },
    );
  }

  const pathExists = runtime.pathExists ?? pathEntryExists;
  if (runtime.removePath) {
    assertSafeProjectTarget(target);
    for (const path of target.verificationPaths) {
      let exists: boolean;
      try {
        exists = pathExists(path);
      } catch (error) {
        throw new InstallCommandError(
          `The Skill removal command completed, but ${path} could not be verified. ${getRetryMessage('remove', target)}`,
          { cause: error },
        );
      }
      if (!exists) continue;
      try {
        await runtime.removePath(path);
      } catch (error) {
        throw new InstallCommandError(
          `The Skill removal command completed, but ${path} could not be removed. ${getRetryMessage('remove', target)}`,
          { cause: error },
        );
      }
    }
  }

  const remainingPaths: string[] = [];
  for (const path of target.verificationPaths) {
    try {
      if (pathExists(path)) remainingPaths.push(path);
    } catch (error) {
      throw new InstallCommandError(
        `The Skill removal command completed, but ${path} could not be verified. ${getRetryMessage('remove', target)}`,
        { cause: error },
      );
    }
  }
  const readTextFile = runtime.readTextFile ?? readOptionalTextFile;
  let lockContents: string | undefined;
  try {
    lockContents = readTextFile(target.lockPath);
  } catch (error) {
    throw new InstallCommandError(
      `The Skill removal command completed, but ${target.lockPath} could not be verified. ${getRetryMessage('remove', target)}`,
      { cause: error },
    );
  }
  if (lockContents !== undefined) {
    let lock: unknown;
    try {
      lock = JSON.parse(lockContents);
    } catch (error) {
      throw new InstallCommandError(
        `The Skill removal command completed, but ${target.lockPath} is not valid JSON. ${getRetryMessage('remove', target)}`,
        { cause: error },
      );
    }
    if (
      typeof lock !== 'object' ||
      lock === null ||
      !('skills' in lock) ||
      typeof lock.skills !== 'object' ||
      lock.skills === null ||
      Array.isArray(lock.skills)
    ) {
      throw new InstallCommandError(
        `The Skill removal command completed, but ${target.lockPath} has an unsupported format. ${getRetryMessage('remove', target)}`,
      );
    }
    if (Object.hasOwn(lock.skills, SKILL_NAME)) {
      throw new InstallCommandError(
        `The Skill removal command completed, but ${target.lockPath} still tracks ${SKILL_NAME}. ${getRetryMessage('remove', target)}`,
      );
    }
  }
  if (remainingPaths.length > 0) {
    throw new InstallCommandError(
      `The Skill removal command completed, but these Codex Skill paths still exist: ${remainingPaths.join(', ')}. ${getRetryMessage('remove', target)}`,
    );
  }
  return target.skill;
};
