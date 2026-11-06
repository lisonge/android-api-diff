#!/usr/bin/env node
import process from 'node:process';
import { inspect, parseArgs } from 'node:util';
import {
  loadAndroidSourceFile,
  searchAndroidSources,
  validateSource,
  type SearchInput,
  type SourceLocation,
  normalizeAndroidSourceTag,
  type AndroidApiQueryProgress,
  type AndroidApiQueryRuntime,
} from '../core/index.ts';
import { generateAndroidApiCode } from '../core/code.ts';
import { queryAndroidApi } from '../core/query.ts';
import packageJson from '../../package.json' with { type: 'json' };
import {
  createNodeInstallRuntime,
  installSkill,
  InstallCommandError,
  removeSkill,
  type InstallRuntime,
  type SkillScope,
} from './installer.ts';
import { createNodeRuntime, getDefaultCacheDir } from '../node/nodeRuntime.ts';

// Cache reads and parsing may enter the task queue at this ceiling, while the
// runtime's adaptive request limiter ramps network concurrency from 5 to 16.
const QUERY_CONCURRENCY = 16;

export type CliFormat = 'json' | 'pretty';

export type CliRequest =
  | { command: 'search'; text: string; format: CliFormat }
  | {
      command: 'source';
      source: SourceLocation;
      tag: string;
      format: CliFormat;
    }
  | {
      command: 'query' | 'generate';
      input: SearchInput;
      minSdk?: number;
      format: CliFormat;
    }
  | {
      command: 'preload';
      apiNames: string[];
      minSdk?: number;
      format: CliFormat;
    }
  | {
      command: 'skill';
      action: 'install' | 'remove';
      skillScope: SkillScope;
      format: CliFormat;
    }
  | { command: 'help'; topic?: string }
  | { command: 'version' };

interface CliIo {
  stdout: Pick<NodeJS.WriteStream, 'write'> & {
    isTTY?: boolean;
  };
  stderr: Pick<NodeJS.WriteStream, 'write'> & {
    isTTY?: boolean;
  };
}

interface ExecuteContext {
  cwd: string;
  installRuntime: InstallRuntime;
  runtime: AndroidApiQueryRuntime;
  signal: AbortSignal;
  progress: ReturnType<typeof createProgressReporter>;
}

export interface RunCliOptions {
  io?: CliIo;
  signal?: AbortSignal;
  runtime?: AndroidApiQueryRuntime;
  cwd?: string;
  installRuntime?: InstallRuntime;
  execute?: (
    request: Exclude<CliRequest, { command: 'help' | 'version' }>,
    context: ExecuteContext,
  ) => Promise<unknown>;
}

class CliUsageError extends Error {
  readonly code = 'INVALID_ARGUMENT';
}

const GENERAL_HELP = `android-api-diff

Usage:
  android-api-diff search <text> [--format json|pretty]
  android-api-diff query --name <reference> [--min-sdk <api>]
  android-api-diff query --repo <repo> --path <path> [--target <reference>] [--anchor-tag <tag>] [--min-sdk <api>]
  android-api-diff generate --name <reference> [--min-sdk <api>]
  android-api-diff generate --repo <repo> --path <path> --target <reference> [--anchor-tag <tag>]
  android-api-diff source --repo <repo> --path <path> --tag <tag>
  android-api-diff preload <reference...> [--min-sdk <api>]
  android-api-diff skill install|remove [--skill-scope project|global]

All commands support --format json|pretty. Query inputs are mutually exclusive.
Class/member queries follow repository and path moves. A source selection without
--target queries the exact file across tags. Source reads never follow moves.
Set ANDROID_API_DIFF_INDEX_URL to a published source-index manifest URL.
`;
const HELP_BY_TOPIC: Record<string, string> = Object.fromEntries(
  ['search', 'source', 'query', 'generate', 'preload', 'skill'].map((name) => [
    name,
    GENERAL_HELP,
  ]),
);

const usageError = (message: string): never => {
  throw new CliUsageError(message);
};

const parseMinSdk = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined;
  if (!/^\d+$/.test(value)) {
    usageError('--min-sdk must be a positive integer');
  }
  const minSdk = Number(value);
  if (!Number.isSafeInteger(minSdk) || minSdk < 1) {
    usageError('--min-sdk must be a positive integer');
  }
  return minSdk;
};

const parseFormat = (value: string | undefined): CliFormat => {
  if (value === undefined || value === 'json') return 'json';
  if (value === 'pretty') return 'pretty';
  return usageError('--format must be either "json" or "pretty"');
};

const parseSkillScope = (value: string | undefined): SkillScope => {
  if (value === undefined || value === 'project') return 'project';
  if (value === 'global') return 'global';
  return usageError('--skill-scope must be either "project" or "global"');
};

const parseSkillAction = (value: string | undefined): 'install' | 'remove' => {
  if (value === 'install' || value === 'remove') return value;
  return usageError('skill action must be either "install" or "remove"');
};

export const parseCliArgs = (args: string[]): CliRequest => {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      allowPositionals: true,
      strict: true,
      options: {
        help: { type: 'boolean', short: 'h' },
        version: { type: 'boolean', short: 'v' },
        format: { type: 'string' },
        'min-sdk': { type: 'string' },
        'skill-scope': { type: 'string' },
        name: { type: 'string' },
        repo: { type: 'string' },
        path: { type: 'string' },
        target: { type: 'string' },
        tag: { type: 'string' },
        'anchor-tag': { type: 'string' },
      },
    });
  } catch (e) {
    return usageError(e instanceof Error ? e.message : String(e));
  }
  const { values: v, positionals: p } = parsed;
  if (v.version) return { command: 'version' };
  if (v.help || !p.length) return { command: 'help', topic: p[0] };
  const command = p[0],
    format = parseFormat(v.format),
    minSdk = parseMinSdk(v['min-sdk']);
  const allowed: Record<string, string[]> = {
    search: [],
    source: ['repo', 'path', 'tag'],
    query: ['name', 'repo', 'path', 'target', 'anchor-tag', 'min-sdk'],
    generate: ['name', 'repo', 'path', 'target', 'anchor-tag', 'min-sdk'],
    preload: ['min-sdk'],
    skill: ['skill-scope'],
  };
  if (!allowed[command!]) return usageError(`unknown command: ${command}`);
  for (const key of Object.keys(v))
    if (!['format', 'help', 'version', ...allowed[command!]!].includes(key))
      usageError(`${command} does not accept --${key}`);
  if (command === 'skill') {
    if (p.length === 1) return { command: 'help', topic: 'skill' };
    if (p.length !== 2)
      return usageError(
        'skill does not accept additional positional arguments',
      );
    return {
      command,
      action: parseSkillAction(p[1]),
      skillScope: parseSkillScope(v['skill-scope']),
      format,
    };
  }
  if (command === 'search') {
    if (p.length !== 2 || !p[1]?.trim())
      return usageError('search requires one search string');
    return { command, text: p[1].trim(), format };
  }
  if (command === 'preload') {
    const apiNames = p.slice(1).map((x) => x.trim());
    if (!apiNames.length || apiNames.some((x) => !x))
      return usageError('preload requires at least one API name');
    return { command, apiNames, minSdk, format };
  }
  if (p.length !== 1)
    return usageError('Use named options; unexpected positional arguments');
  const source = () => {
    if (!v.repo || !v.path)
      return usageError('--repo and --path are required together');
    try {
      return validateSource({ repo: v.repo, path: v.path });
    } catch (e) {
      return usageError((e as Error).message);
    }
  };
  const tag = (value: string | undefined) => {
    const result = value && normalizeAndroidSourceTag(value);
    return result || usageError('Invalid or missing Android release tag');
  };
  if (command === 'source')
    return { command, source: source(), tag: tag(v.tag), format };
  if (command === 'query' || command === 'generate') {
    if (
      v.name !== undefined &&
      [v.repo, v.path, v.target, v['anchor-tag']].some((x) => x !== undefined)
    )
      return usageError('--name and source options are mutually exclusive');
    if (v.name !== undefined && !v.name.trim())
      return usageError('--name must not be empty');
    const input: SearchInput =
      v.name !== undefined
        ? { mode: 'name', text: v.name.trim() }
        : {
            mode: 'source',
            source: source(),
            ...(v.target ? { target: v.target.trim() } : {}),
            ...(v['anchor-tag'] ? { anchorTag: tag(v['anchor-tag']) } : {}),
          };
    if (command === 'generate' && input.mode === 'source' && !input.target)
      return usageError('generate requires --target with a source selection');
    return { command, input, minSdk, format };
  }
  return usageError(`unknown command: ${command}`);
};

const toProgressMessage = (
  apiName: string,
  progress: AndroidApiQueryProgress,
): string => {
  if (progress.currentTag) {
    return `${apiName}: ${progress.completedTags}/${progress.totalTags} (${progress.currentTag})`;
  }
  return `${apiName}: checking ${progress.totalTags} Android tags`;
};

const createProgressReporter = (
  stderr: CliIo['stderr'],
): {
  update(message: string): void;
  finish(message?: string): void;
} => {
  let previousLength = 0;
  const enabled = stderr.isTTY === true;
  return {
    update(message) {
      if (!enabled) return;
      const padded = message.padEnd(previousLength);
      previousLength = message.length;
      stderr.write(`\r${padded}`);
    },
    finish(message) {
      if (!enabled) return;
      if (message) {
        const padded = message.padEnd(previousLength);
        stderr.write(`\r${padded}\n`);
      } else if (previousLength > 0) {
        stderr.write('\n');
      }
      previousLength = 0;
    },
  };
};

const executeRequest = async (
  request: Exclude<CliRequest, { command: 'help' | 'version' }>,
  { cwd, installRuntime, runtime, signal, progress }: ExecuteContext,
): Promise<unknown> => {
  if (request.command === 'skill') {
    const skill =
      request.action === 'install'
        ? await installSkill(
            installRuntime,
            packageJson.version,
            request.skillScope,
            cwd,
            signal,
          )
        : await removeSkill(installRuntime, request.skillScope, cwd, signal);
    return { skill };
  }

  if (request.command === 'search') {
    return {
      text: request.text,
      candidates: await searchAndroidSources(runtime, request.text, signal),
    };
  }
  if (request.command === 'source')
    return loadAndroidSourceFile(runtime, request.tag, request.source, signal);
  if (request.command === 'query' || request.command === 'generate') {
    const name =
      request.input.mode === 'name'
        ? request.input.text
        : (request.input.target ?? request.input.source.path);
    const options = {
      input: request.input,
      minSdk: request.minSdk,
      concurrency: QUERY_CONCURRENCY,
      signal,
      onProgress: (update: AndroidApiQueryProgress) =>
        progress.update(toProgressMessage(name, update)),
    };
    const result =
      request.command === 'query'
        ? await queryAndroidApi(runtime, options)
        : await generateAndroidApiCode(runtime, options);
    progress.finish(`${name}: ${request.command} complete`);
    return result;
  }

  if (request.command !== 'preload') {
    throw new Error(`Unsupported command: ${request.command}`);
  }
  const results = [];
  for (const [index, apiName] of request.apiNames.entries()) {
    progress.update(
      `${apiName}: preparing ${index + 1}/${request.apiNames.length}`,
    );
    const result = await queryAndroidApi(runtime, {
      input: { mode: 'name', text: apiName },
      concurrency: QUERY_CONCURRENCY,
      ...(request.minSdk === undefined ? {} : { minSdk: request.minSdk }),
      signal,
      onProgress: (update) => {
        progress.update(
          `[${index + 1}/${request.apiNames.length}] ${toProgressMessage(apiName, update)}`,
        );
      },
    });
    results.push({
      apiName,
      checkedTags: result.summary.checkedTags,
      foundTags: result.summary.foundTags,
      rangeCount: result.summary.rangeCount,
    });
  }
  progress.finish(`Cache ready for ${request.apiNames.length} Android APIs`);
  return {
    cacheDir: getDefaultCacheDir(),
    results,
  };
};

const writeSuccess = (
  request: Exclude<CliRequest, { command: 'help' | 'version' }>,
  result: unknown,
  io: CliIo,
) => {
  const response = {
    ok: true,
    command: request.command,
    ...(request.command === 'skill' ? { action: request.action } : {}),
    result,
  };
  const output =
    request.format === 'json'
      ? JSON.stringify(response)
      : inspect(response, {
          colors: io.stdout.isTTY === true,
          depth: null,
          maxArrayLength: null,
          breakLength: 100,
          compact: false,
        });
  io.stdout.write(`${output}\n`);
};

const getErrorCode = (error: unknown): string => {
  if (error instanceof CliUsageError) return error.code;
  if (error instanceof InstallCommandError) return error.code;
  const visited = new Set<unknown>();
  let current: unknown = error;
  while (current && typeof current === 'object' && !visited.has(current)) {
    visited.add(current);
    const candidate = current as {
      code?: unknown;
      name?: unknown;
      cause?: unknown;
    };
    if (
      typeof candidate.code === 'string' &&
      [
        'ENOTFOUND',
        'EAI_AGAIN',
        'ECONNRESET',
        'ECONNREFUSED',
        'ETIMEDOUT',
      ].includes(candidate.code)
    ) {
      return 'NETWORK_ERROR';
    }
    if (candidate.name === 'AbortError' || candidate.code === 'ABORT_ERR') {
      return 'ABORTED';
    }
    current = candidate.cause;
  }
  return 'INTERNAL_ERROR';
};

const writeError = (error: unknown, io: CliIo): string => {
  const code = getErrorCode(error);
  const message =
    code === 'ABORTED'
      ? 'Command cancelled'
      : error instanceof Error
        ? error.message
        : String(error);
  io.stderr.write(
    `${JSON.stringify({
      ok: false,
      error: {
        code,
        message,
        ...(error && typeof error === 'object' && 'candidates' in error
          ? { candidates: error.candidates }
          : {}),
      },
    })}\n`,
  );
  return code;
};

const getHelp = (topic: string | undefined): string => {
  return (topic && HELP_BY_TOPIC[topic]) || GENERAL_HELP;
};

export const runCli = async (
  args: string[],
  options: RunCliOptions = {},
): Promise<number> => {
  const io: CliIo = options.io ?? {
    stdout: process.stdout,
    stderr: process.stderr,
  };
  let progress: ReturnType<typeof createProgressReporter> | undefined;
  try {
    const request = parseCliArgs(args);
    if (request.command === 'help') {
      io.stdout.write(getHelp(request.topic));
      return 0;
    }
    if (request.command === 'version') {
      io.stdout.write(`${packageJson.version}\n`);
      return 0;
    }

    const signal = options.signal ?? new AbortController().signal;
    signal.throwIfAborted();
    progress = createProgressReporter(io.stderr);
    const result = await (options.execute ?? executeRequest)(request, {
      cwd: options.cwd ?? process.cwd(),
      installRuntime:
        options.installRuntime ?? createNodeInstallRuntime(io.stderr),
      runtime: options.runtime ?? createNodeRuntime(),
      signal,
      progress,
    });
    signal.throwIfAborted();
    writeSuccess(request, result, io);
    return 0;
  } catch (error) {
    progress?.finish();
    const code = writeError(error, io);
    return code === 'ABORTED' ? 130 : code === 'INVALID_ARGUMENT' ? 2 : 1;
  }
};

export const main = async (args = process.argv.slice(2)): Promise<number> => {
  const controller = new AbortController();
  let abortExitCode = 130;
  const onSigint = () => controller.abort();
  const onSigterm = () => {
    abortExitCode = 143;
    controller.abort();
  };
  process.once('SIGINT', onSigint);
  process.once('SIGTERM', onSigterm);
  try {
    const exitCode = await runCli(args, { signal: controller.signal });
    return exitCode === 130 ? abortExitCode : exitCode;
  } finally {
    process.off('SIGINT', onSigint);
    process.off('SIGTERM', onSigterm);
  }
};

if (import.meta.main) {
  process.exitCode = await main();
}
