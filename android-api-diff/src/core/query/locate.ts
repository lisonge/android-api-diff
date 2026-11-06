import type {
  ApiFile,
  ClassStruct,
  SearchInput,
  AndroidApiQueryRuntime,
  AndroidApiTagResult,
} from '../model/types.ts';
import {
  compareTags,
  getIndexTags,
  getIndexedFiles,
  sourceKey,
  validateSource,
  type SourceIndex,
  type SourceLocation,
} from '../catalog/index.ts';
import {
  searchSources,
  splitSourceSearch,
  type SourceCandidate,
} from '../catalog/search.ts';
import { loadParsedSource } from '../source/parsed.ts';
import { SourceExecutionError } from '../source/errors.ts';
import { preferSources } from '../catalog/preferred-sources.ts';
import { searchFilePathsByRefName } from '../catalog/reference.ts';

export interface TargetSelection {
  repositoryScope?: string;
  explicit: boolean;
  source: SourceLocation;
  anchorTag: string;
  qualifiedName?: string;
  paths: string[];
  member?: string;
  constructor: boolean;
  kind: 'file' | 'class' | 'member';
  candidates: SourceCandidate[];
  candidateErrors?: {
    source: SourceLocation;
    tag: string;
    reason: 'network-error' | 'parse-error';
  }[];
}
const types = (file: ApiFile) => {
  const result: {
    paths: string[];
    structs: ClassStruct[];
    qualifiedName: string;
  }[] = [];
  const walk = (items: ClassStruct[], parents: ClassStruct[]) => {
    for (const item of items) {
      const structs = [...parents, item],
        paths = structs.map((s) => s.name);
      result.push({
        structs,
        paths,
        qualifiedName: [file.package, ...paths].filter(Boolean).join('.'),
      });
      walk(item.children ?? [], structs);
    }
  };
  walk(file.structs, []);
  return result;
};
const matchReference = (file: ApiFile, text: string) => {
  const call = text.endsWith('()');
  const ref = text.replace(/\(\)$/, '').replaceAll('$', '.').replace('#', '.');
  const matches = types(file).flatMap((type) => {
    const aliases = [type.qualifiedName, type.paths.join('.')];
    for (const alias of aliases) {
      if (ref === alias || ref === `${alias}Hidden`)
        return [
          {
            ...type,
            member: call ? type.paths.at(-1) : undefined,
            constructor: call,
          },
        ];
      if (
        ref.startsWith(alias + '.') &&
        !ref.slice(alias.length + 1).includes('.')
      ) {
        const member = ref.slice(alias.length + 1);
        return [{ ...type, member, constructor: member === type.paths.at(-1) }];
      }
    }
    return [];
  });
  const depth = Math.max(0, ...matches.map((m) => m.paths.length));
  return matches.filter((m) => m.paths.length === depth);
};
export const selectTarget = async (
  runtime: AndroidApiQueryRuntime,
  index: SourceIndex,
  input: SearchInput,
  signal?: AbortSignal,
): Promise<TargetSelection | undefined> => {
  const repositoryScope =
    input.mode === 'name'
      ? splitSourceSearch(index, input.text).repo
      : undefined;
  const candidates =
    input.mode === 'name' ? searchSources(index, input.text) : [];
  const choices: { source: SourceLocation; tag: string; reference?: string }[] =
    [];
  if (input.mode === 'source') {
    validateSource(input.source);
    const repo = index.repositories.find((r) => r.repo === input.source.repo);
    const tags = (repo ? getIndexTags(index) : [])
      .filter((tag) =>
        getIndexedFiles(index, repo!, tag)?.some(
          (path) => path === input.source.path,
        ),
      )
      .sort(compareTags);
    const tag = input.anchorTag ?? tags.at(-1);
    if (!tag) return undefined;
    choices.push({ source: input.source, tag, reference: input.target });
  } else {
    for (const candidate of candidates)
      choices.push({
        source: { repo: candidate.repo, path: candidate.path },
        tag: candidate.availableTags.at(-1)!,
        reference:
          candidate.targetKind === 'file'
            ? undefined
            : candidate.targetPaths.join('.'),
      });
  }
  if (!choices.length) return undefined;
  choices.sort(
    (a, b) =>
      compareTags(b.tag, a.tag) ||
      Number(a.source.path.includes('/aidl-export/')) -
        Number(b.source.path.includes('/aidl-export/')),
  );
  const selections: TargetSelection[] = [];
  const failures: NonNullable<TargetSelection['candidateErrors']> = [];
  const errors: SourceExecutionError[] = [];
  for (const choice of choices) {
    signal?.throwIfAborted();
    if (!choice.reference) {
      selections.push({
        repositoryScope,
        explicit: input.mode === 'source',
        source: choice.source,
        anchorTag: choice.tag,
        kind: 'file',
        paths: [],
        constructor: false,
        candidates,
      });
      continue;
    }
    let file: ApiFile | null;
    try {
      file = await loadParsedSource(runtime, choice.source, choice.tag, signal);
    } catch (cause) {
      signal?.throwIfAborted();
      if (!(cause instanceof SourceExecutionError)) throw cause;
      failures.push({
        source: choice.source,
        tag: choice.tag,
        reason: cause.reason,
      });
      errors.push(cause);
      continue;
    }
    if (!file) continue;
    for (const match of matchReference(file, choice.reference))
      selections.push({
        repositoryScope,
        explicit: input.mode === 'source',
        source: choice.source,
        anchorTag: choice.tag,
        qualifiedName: match.qualifiedName,
        paths: match.paths,
        member: match.member,
        constructor: match.constructor,
        kind: match.member ? 'member' : 'class',
        candidates,
      });
  }
  const selected = preferSources(selections, (item) => item.source)[0];
  if (!selected && errors.length)
    throw new AggregateError(
      errors,
      'Could not check candidate sources. Try again.',
    );
  if (selected && failures.length) selected.candidateErrors = failures;
  return selected;
};

export interface LocatedTarget extends AndroidApiTagResult {
  file?: ApiFile;
  structs?: ClassStruct[];
}
export const locateTarget = async (
  runtime: AndroidApiQueryRuntime,
  index: SourceIndex,
  selection: TargetSelection,
  tag: string,
  apiVersion: number,
  signal?: AbortSignal,
): Promise<LocatedTarget> => {
  const locations: SourceLocation[] = [];
  const allCandidates = selection.qualifiedName
    ? searchSources(index, selection.qualifiedName)
    : [];
  const relatedRepositories = new Set([
    selection.source.repo,
    ...allCandidates.map((candidate) => candidate.repo),
  ]);
  if (selection.qualifiedName) {
    for (const repo of index.repositories)
      if (searchFilePathsByRefName(selection.qualifiedName, repo.paths).length)
        relatedRepositories.add(repo.repo);
  }
  let coverage = false;
  for (const repo of index.repositories) {
    if (!relatedRepositories.has(repo.repo)) continue;
    if (selection.repositoryScope && repo.repo !== selection.repositoryScope)
      continue;
    const files = getIndexedFiles(index, repo, tag);
    if (!files) {
      coverage = true;
      continue;
    }
    const paths = new Set(files);
    if (repo.repo === selection.source.repo) {
      if (paths.has(selection.source.path)) locations.push(selection.source);
    }
    if (selection.kind !== 'file')
      for (const candidate of allCandidates) {
        if (
          candidate.repo === repo.repo &&
          candidate.availableTags.includes(tag) &&
          paths.has(candidate.path) &&
          !locations.some((s) => sourceKey(s) === sourceKey(candidate))
        )
          locations.push({ repo: repo.repo, path: candidate.path });
      }
  }
  // Exact file reads do not need index coverage and never follow moves.
  if (
    (selection.kind === 'file' || tag === selection.anchorTag) &&
    !locations.some((s) => sourceKey(s) === sourceKey(selection.source))
  )
    locations.push(selection.source);
  const found: LocatedTarget[] = [];
  let failure: 'network-error' | 'parse-error' | undefined;
  for (const source of locations) {
    try {
      const file = await loadParsedSource(runtime, source, tag, signal);
      if (!file) {
        if (selection.kind !== 'file') continue;
        return {
          tag,
          status: 'not-found',
          reason: 'source-file-not-found',
          source,
        };
      }
      const match =
        selection.kind === 'file'
          ? undefined
          : types(file).find(
              (t) => t.qualifiedName === selection.qualifiedName,
            );
      if (selection.kind === 'file' || match)
        found.push({
          tag,
          status: 'found',
          source,
          file,
          structs: match?.structs,
        });
    } catch (error) {
      signal?.throwIfAborted();
      if (!(error instanceof SourceExecutionError)) throw error;
      failure = error.reason;
    }
  }
  const definitions = found.filter(
    (f) => !f.source!.path.includes('/aidl-export/'),
  );
  let valid = definitions.length ? definitions : found;
  if (selection.explicit) {
    const chosen = valid.find(
      (item) => sourceKey(item.source!) === sourceKey(selection.source),
    );
    if (chosen) return chosen;
  }
  valid = preferSources(valid, (item) => item.source!);
  if (failure) return { tag, status: 'error', reason: failure };
  if (valid.length) return valid[0]!;
  if (coverage) return { tag, status: 'error', reason: 'index-unavailable' };
  return { tag, status: 'not-found', reason: 'type-not-found' };
};
