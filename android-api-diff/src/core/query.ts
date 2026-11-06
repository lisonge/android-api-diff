import {
  compareVersionResults,
  normalizeVersionImports,
  compactVersionResults,
  normalizeAndroidApiMemberRanges,
  type InternalAndroidApiVersionResult,
} from './query/ranges.ts';
export {
  getAndroidApiOverloadId,
  normalizeAndroidApiMemberRanges,
  type AndroidApiMemberVersionRangeInput,
} from './query/ranges.ts';
import {
  loadSourceIndex,
  indexVersions,
  sourceKey,
  compareTags,
} from './catalog/index.ts';
import { selectTarget, locateTarget } from './query/locate.ts';
import { toResolution } from './catalog/search.ts';
import pLimit from 'p-limit';
import { DEFAULT_MIN_SDK } from './catalog/android-versions.ts';

import {
  toAndroidApiResolvedType,
  toAndroidApiMemberResult,
} from './model/struct.ts';
import type {
  AndroidApiMemberResult,
  AndroidApiQueryResult,
  AndroidApiQueryRuntime,
  AndroidVersionItem,
  QueryAndroidApiOptions,
} from './model/types.ts';

import { getMirrorContentUrl } from './source/url.ts';

export {
  STRUCT_CACHE_VERSION,
  getParsedSourceCacheKey,
  loadParsedSource,
} from './source/parsed.ts';
export const QUERY_CACHE_VERSION = 'query:v43';
const DEFAULT_CONCURRENCY = 3;

const normalizeConcurrency = (value: number | undefined): number => {
  if (value === undefined || !Number.isFinite(value) || value < 1) {
    return DEFAULT_CONCURRENCY;
  }
  return Math.floor(value);
};

const getSelectedTags = (
  androidVersionList: AndroidVersionItem[],
  options: QueryAndroidApiOptions,
): AndroidVersionItem[] => {
  const minSdk = options.minSdk ?? DEFAULT_MIN_SDK;
  return androidVersionList
    .filter((v) => v.apiVersion >= minSdk)
    .filter((v) => v.tags.length > 0)
    .map((v) => ({ ...v, tags: [...v.tags].sort(compareTags) }))
    .sort((a, b) => a.apiVersion - b.apiVersion);
};

export const queryAndroidApi = async (
  runtime: AndroidApiQueryRuntime,
  options: QueryAndroidApiOptions,
): Promise<AndroidApiQueryResult> => {
  options.signal?.throwIfAborted();
  const index = await loadSourceIndex(runtime, options.signal);
  const apiName =
    options.input.mode === 'name'
      ? options.input.text.trim()
      : (options.input.target ?? sourceKey(options.input.source));
  const key = JSON.stringify([
    QUERY_CACHE_VERSION,
    index.revision,
    options.input,
    options.minSdk,
  ]);
  const cached = await runtime.queryCache?.get(key);
  if (cached) return cached;
  const selection = await selectTarget(
    runtime,
    index,
    options.input,
    options.signal,
  );
  if (!selection) {
    return {
      apiName,
      normalizedApiName: apiName,
      candidates: [],
      tags: [],
      package: '',
      imports: [],
      ranges: [],
      overloads: [],
      summary: {
        checkedTags: 0,
        foundTags: 0,
        rangeCount: 0,
        overloadCount: 0,
      },
    };
  }
  const versionsToCheck = getSelectedTags(
    runtime.loadAndroidVersionList
      ? await runtime.loadAndroidVersionList(options.signal)
      : indexVersions(index),
    options,
  );
  const tags = versionsToCheck.flatMap((version) =>
    version.tags.map((tag, position) => ({ tag, version, position })),
  );
  // Visit every version's first tag before starting its second tag.
  const scheduledTags = [...tags].sort((a, b) => a.position - b.position);
  options.signal?.throwIfAborted();
  options.onEvent?.({
    type: 'selected',
    context: {
      selection: {
        ...selection.source,
        url: getMirrorContentUrl(selection.source, selection.anchorTag),
      },
      resolvedTarget: {
        kind: selection.kind,
        paths: [
          ...selection.paths,
          ...(selection.member ? [selection.member] : []),
        ],
      },
    },
    tags: tags.map(({ tag }) => tag),
  });
  let completedTags = 0;
  await options.onProgress?.({ completedTags, totalTags: tags.length });
  const limit = pLimit(normalizeConcurrency(options.concurrency));
  const tagResults: import('./model/types.ts').AndroidApiTagResult[] = [];
  const versions = (
    await Promise.all(
      scheduledTags.map(({ tag, version }) =>
        limit(async (): Promise<InternalAndroidApiVersionResult> => {
          options.signal?.throwIfAborted();
          options.onEvent?.({ type: 'tag-start', tag });
          const located = await locateTarget(
            runtime,
            index,
            selection,
            tag,
            version.apiVersion,
            options.signal,
          );
          let members: AndroidApiMemberResult[] | undefined;
          if (located.status === 'found' && selection.kind === 'member') {
            members = located
              .structs!.at(-1)!
              .members.filter(
                (m) =>
                  m.name === selection.member &&
                  (!selection.constructor || m.kind === 'constructor'),
              )
              .map(toAndroidApiMemberResult);
            if (!members.length) {
              located.status = 'not-found';
              located.reason = 'api-not-found';
            }
          }
          const { file, structs, ...tagResult } = located;
          options.signal?.throwIfAborted();
          options.onEvent?.({ type: 'tag-complete', result: tagResult, file });
          tagResults.push(tagResult);
          completedTags++;
          await options.onProgress?.({
            completedTags,
            totalTags: tags.length,
            currentTag: tag,
          });
          return {
            version: version.version,
            alias: version.alias,
            apiVersion: version.apiVersion,
            tag,
            missingReason: located.reason,
            members,
            package: file?.package ?? '',
            imports: file?.imports ?? [],
            typePath: structs?.map(toAndroidApiResolvedType),
          };
        }),
      ),
    )
  ).sort(compareVersionResults);
  options.signal?.throwIfAborted();
  const imports = normalizeVersionImports(versions);
  const { ranges, overloads } = normalizeAndroidApiMemberRanges(
    compactVersionResults(versions),
  );
  const found = versions.filter((v) => !v.missingReason);
  const result: AndroidApiQueryResult = {
    apiName,
    normalizedApiName: apiName,
    candidates: selection.candidates.map(toResolution),
    ...(selection.candidateErrors
      ? { candidateErrors: selection.candidateErrors }
      : {}),
    selection: {
      ...selection.source,
      url: getMirrorContentUrl(selection.source, selection.anchorTag),
    },
    resolvedTarget: {
      kind: selection.kind,
      paths: [
        ...selection.paths,
        ...(selection.member ? [selection.member] : []),
      ],
      typePath: versions.findLast((v) => v.typePath)?.typePath,
    },
    tags: tagResults.sort(
      (a, b) =>
        tags.findIndex((v) => v.tag === a.tag) -
        tags.findIndex((v) => v.tag === b.tag),
    ),
    package: versions.findLast((v) => v.package)?.package ?? '',
    imports,
    summary: {
      checkedTags: versions.length,
      foundTags: found.length,
      rangeCount: ranges.length,
      overloadCount: overloads.length,
      firstFoundTag: found[0]?.tag,
      lastFoundTag: found.at(-1)?.tag,
    },
    ranges,
    overloads,
  };
  if (
    !result.candidateErrors?.length &&
    !result.tags.some((tag) => tag.status === 'error')
  )
    await runtime.queryCache?.set(key, result);
  return result;
};
