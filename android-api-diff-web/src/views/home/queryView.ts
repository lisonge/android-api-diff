import {
  findStructByPath,
  loadParsedSource,
  type ApiFile,
  type AndroidApiQueryResult,
  type AndroidApiQueryRuntime,
  type AndroidApiTagResult,
  type AndroidApiQueryContext,
} from 'android-api-diff';

// Read the source located for this tag, including confirmed missing members.
export const loadTagView = async (
  runtime: AndroidApiQueryRuntime,
  result: AndroidApiQueryResult,
  item: AndroidApiTagResult,
  signal?: AbortSignal,
) => {
  const file =
    item.source && (item.status === 'found' || item.reason === 'api-not-found')
      ? await loadParsedSource(runtime, item.source, item.tag, signal)
      : { package: '', imports: [], structs: [] };
  return {
    ...createTagView(result, file ?? undefined),
    sourceMissing: file === null,
  };
};

export const createTagView = (
  result: AndroidApiQueryContext,
  file: ApiFile = { package: '', imports: [], structs: [] },
) => {
  const paths = result.resolvedTarget?.paths ?? [];
  const member = result.resolvedTarget?.kind === 'member';
  const target = findStructByPath(
    file.structs,
    member ? paths.slice(0, -1) : paths,
  );
  const members = member
    ? target?.members.filter((m) => m.name === paths.at(-1))
    : undefined;
  return { file, target, members };
};
