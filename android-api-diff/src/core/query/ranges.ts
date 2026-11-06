import { compareTags } from '../catalog/index.ts';
import type {
  AndroidApiMemberResult,
  AndroidApiMissingReason,
  AndroidApiOverloadResult,
  AndroidApiOverloadVersionRangeResult,
  AndroidApiResolvedType,
  AndroidApiVersionRange,
  AndroidApiVersionRangeResult,
} from '../model/types.ts';

export interface InternalAndroidApiVersionResult {
  version: string;
  alias: string;
  apiVersion: number;
  tag: string;
  missingReason?: AndroidApiMissingReason;
  members?: AndroidApiMemberResult[];
  package: string;
  imports: string[];
  typePath?: AndroidApiResolvedType[];
}

export const compareVersionResults = (
  a: InternalAndroidApiVersionResult,
  b: InternalAndroidApiVersionResult,
) => {
  return a.apiVersion - b.apiVersion || compareTags(a.tag, b.tag);
};

const toSemanticMember = (member: AndroidApiMemberResult) => {
  return {
    kind: member.kind,
    name: member.name,
    type: member.type,
    imports: member.imports,
    ...('initializer' in member ? { initializer: member.initializer } : {}),
    ...('isStatic' in member && member.isStatic ? { isStatic: true } : {}),
    ...('returnType' in member ? { returnType: member.returnType } : {}),
    ...('isAbstract' in member && member.isAbstract
      ? { isAbstract: true }
      : {}),
    ...('returnNullability' in member
      ? { returnNullability: member.returnNullability }
      : {}),
    ...('parameters' in member
      ? {
          parameters: member.parameters.map((parameter) => ({
            name: parameter.name,
            type: parameter.type,
            nullability: parameter.nullability,
          })),
        }
      : {}),
    ...('fieldNullability' in member
      ? { fieldNullability: member.fieldNullability }
      : {}),
  };
};

interface AndroidApiOverloadIdentityMember {
  kind: AndroidApiMemberResult['kind'];
  name: string;
  parameters?: readonly { type: string }[];
}

export const getAndroidApiOverloadId = (
  member: AndroidApiOverloadIdentityMember,
): string => {
  if (member.parameters) {
    return `${member.kind}:${member.name}(${member.parameters
      .map((parameter) => parameter.type)
      .join(',')})`;
  }
  return `${member.kind}:${member.name}`;
};

const toSemanticKey = (version: InternalAndroidApiVersionResult): string => {
  return JSON.stringify({
    missingReason: version.missingReason,
    members: version.members?.map(toSemanticMember),
  });
};

export const normalizeVersionImports = (
  versions: InternalAndroidApiVersionResult[],
): string[] => {
  const usedImports = new Set<string>();
  for (const version of versions) {
    for (const member of version.members ?? []) {
      for (const index of member.imports) {
        const value = version.imports[index];
        if (value === undefined) {
          throw new Error(`Invalid member import index: ${index}`);
        }
        usedImports.add(value);
      }
    }
  }
  const imports = Array.from(usedImports).sort();
  const importIndexes = new Map(
    imports.map((value, index) => [value, index] as const),
  );
  for (const version of versions) {
    for (const member of version.members ?? []) {
      member.imports = Array.from(
        new Set(
          member.imports.map((index) => {
            const value = version.imports[index]!;
            return importIndexes.get(value)!;
          }),
        ),
      ).sort((a, b) => a - b);
    }
    version.imports = imports;
  }
  return imports;
};

export interface AndroidApiMemberVersionRangeInput extends AndroidApiVersionRange {
  missingReason?: AndroidApiMissingReason;
  members?: AndroidApiMemberResult[];
}

const toRange = (
  version: InternalAndroidApiVersionResult,
): AndroidApiMemberVersionRangeInput => {
  return {
    fromVersion: version.version,
    fromAlias: version.alias,
    fromApiVersion: version.apiVersion,
    fromTag: version.tag,
    toVersion: version.version,
    toAlias: version.alias,
    toApiVersion: version.apiVersion,
    toTag: version.tag,
    ...(version.missingReason ? { missingReason: version.missingReason } : {}),
    members: version.members,
  };
};

const extendRange = (
  range: AndroidApiMemberVersionRangeInput,
  version: InternalAndroidApiVersionResult,
) => {
  range.toVersion = version.version;
  range.toAlias = version.alias;
  range.toApiVersion = version.apiVersion;
  range.toTag = version.tag;
  range.members = version.members;
};

const getVersionIdentity = (version: {
  version: string;
  apiVersion: number;
}): string => {
  return `${version.apiVersion}:${version.version}`;
};

const addCheckedTagPositions = (
  ranges: AndroidApiVersionRange[],
  versions: Array<{
    version: string;
    apiVersion: number;
    tag: string;
  }>,
) => {
  const firstTags = new Map<string, string>();
  const lastTags = new Map<string, string>();
  for (const version of versions) {
    const key = getVersionIdentity(version);
    if (!firstTags.has(key)) firstTags.set(key, version.tag);
    lastTags.set(key, version.tag);
  }
  for (const range of ranges) {
    if (
      firstTags.get(
        getVersionIdentity({
          version: range.fromVersion,
          apiVersion: range.fromApiVersion,
        }),
      ) === range.fromTag
    ) {
      range.fromTagPosition = 'first-checked';
    }
    if (
      lastTags.get(
        getVersionIdentity({
          version: range.toVersion,
          apiVersion: range.toApiVersion,
        }),
      ) === range.toTag
    ) {
      range.toTagPosition = 'last-checked';
    }
  }
  return ranges;
};

export const compactVersionResults = (
  versions: InternalAndroidApiVersionResult[],
): AndroidApiMemberVersionRangeInput[] => {
  const ranges: AndroidApiMemberVersionRangeInput[] = [];
  let previousKey = '';
  for (const version of versions) {
    const key = toSemanticKey(version);
    const lastRange = ranges.at(-1);
    if (lastRange && key === previousKey) {
      extendRange(lastRange, version);
    } else {
      ranges.push(toRange(version));
      previousKey = key;
    }
  }
  return addCheckedTagPositions(ranges, versions);
};

const toOverloadRange = (
  range: AndroidApiMemberVersionRangeInput,
  overloadId: string,
): AndroidApiOverloadVersionRangeResult => {
  const member = range.members?.find(
    (candidate) => getAndroidApiOverloadId(candidate) === overloadId,
  );
  const missingReason =
    range.missingReason ?? (member ? undefined : 'overload-not-found');
  return {
    fromVersion: range.fromVersion,
    fromAlias: range.fromAlias,
    fromApiVersion: range.fromApiVersion,
    fromTag: range.fromTag,
    ...(range.fromTagPosition
      ? { fromTagPosition: range.fromTagPosition }
      : {}),
    toVersion: range.toVersion,
    toAlias: range.toAlias,
    toApiVersion: range.toApiVersion,
    toTag: range.toTag,
    ...(range.toTagPosition ? { toTagPosition: range.toTagPosition } : {}),
    ...(missingReason ? { missingReason } : {}),
    ...(member ? { member } : {}),
  };
};

const toOverloadSemanticKey = (
  range: AndroidApiOverloadVersionRangeResult,
): string => {
  return JSON.stringify({
    missingReason: range.missingReason,
    member: range.member ? toSemanticMember(range.member) : undefined,
  });
};

const compactOverloadRanges = (
  ranges: readonly AndroidApiMemberVersionRangeInput[],
  overloadId: string,
): AndroidApiOverloadVersionRangeResult[] => {
  const result: AndroidApiOverloadVersionRangeResult[] = [];
  let previousKey = '';
  for (const range of ranges) {
    const next = toOverloadRange(range, overloadId);
    const key = toOverloadSemanticKey(next);
    const previous = result.at(-1);
    if (previous && key === previousKey) {
      previous.toVersion = next.toVersion;
      previous.toAlias = next.toAlias;
      previous.toApiVersion = next.toApiVersion;
      previous.toTag = next.toTag;
      if (next.toTagPosition) {
        previous.toTagPosition = next.toTagPosition;
      } else {
        delete previous.toTagPosition;
      }
      if (next.member) previous.member = next.member;
    } else {
      result.push(next);
      previousKey = key;
    }
  }
  return result;
};

export const normalizeAndroidApiMemberRanges = (
  memberRanges: readonly AndroidApiMemberVersionRangeInput[],
): {
  ranges: AndroidApiVersionRangeResult[];
  overloads: AndroidApiOverloadResult[];
} => {
  const sortedMemberRanges = [...memberRanges].sort(
    (a, b) =>
      a.fromApiVersion - b.fromApiVersion || compareTags(a.fromTag, b.fromTag),
  );
  const latestMembers = new Map<string, AndroidApiMemberResult>();
  for (const range of sortedMemberRanges) {
    for (const member of range.members ?? []) {
      latestMembers.set(getAndroidApiOverloadId(member), member);
    }
  }
  const overloads = Array.from(latestMembers, ([overloadId, member]) => ({
    overloadId,
    signature: member.type,
    member,
    ranges: compactOverloadRanges(sortedMemberRanges, overloadId),
  })).sort(
    (a, b) =>
      ('parameters' in a.member ? a.member.parameters.length : 0) -
        ('parameters' in b.member ? b.member.parameters.length : 0) ||
      a.overloadId.localeCompare(b.overloadId),
  );
  const ranges = sortedMemberRanges.map(({ members, ...range }) => ({
    ...range,
    ...(members
      ? {
          overloadIds: members.map(getAndroidApiOverloadId),
        }
      : {}),
  }));
  return { ranges, overloads };
};
