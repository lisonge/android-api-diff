import type { ConstantExpressionKeys } from '../model/types.ts';
import { androidVersionInfos } from '../catalog/android-versions.ts';
import type {
  ClassMemberParam,
  Nullability,
  AndroidApiCodeDeclaration,
  AndroidApiCodeResult,
  AndroidApiMemberResult,
  AndroidApiOverloadResult,
  AndroidApiOverloadVersionRangeResult,
  AndroidApiQueryResult,
  AndroidApiResolvedType,
  AndroidApiVersionRange,
  AndroidApiVersionRangeResult,
  AndroidVersionInfo,
} from '../model/types.ts';

interface CodeDeclarationState {
  members: AndroidApiMemberResult[];
  signature: string;
  requiresApi: AndroidVersionInfo;
  deprecatedSinceApi?: AndroidVersionInfo;
  fromTag: string;
  toTag: string;
}

interface CodeSignatureSummary {
  signature: string;
  ranges: CodeSignatureSummaryRange[];
  firstIndexes: Map<number, number>;
  lastIndexes: Map<number, number>;
  hasCheckedTagPositions: boolean;
}

interface CodeSignatureSummaryRange {
  fromRange: AndroidApiOverloadVersionRangeResult;
  fromIndex: number;
  toRange: AndroidApiOverloadVersionRangeResult;
  toIndex: number;
}

interface CodeImportPlan {
  imports: string[];
  conflictingNames: Set<string>;
}

interface TypeImportInfo {
  qualifiedName: string;
  sourceSimpleName?: string;
  bindingName?: string;
  renderedName?: string;
  normalizedImportName: string;
}

interface RenderedCode {
  memberCode: string;
  code: string;
}

const primitiveTypeNames = new Set([
  'boolean',
  'byte',
  'char',
  'double',
  'float',
  'int',
  'long',
  'short',
  'void',
]);

const aidlImportBySimpleTypeName = new Map([
  ['List', 'java.util.List'],
  ['Map', 'java.util.Map'],
]);

const javaIdentifierReg = /^[A-Za-z_$][\w$]*$/;
const sourceFileReg = /\.(aidl|java)$/i;
const androidTagPrefix = 'android-';
const importPrefixReg = /^static\s+/;
const qualifiedTypeReg = /[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*/g;
const nullabilityAnnotationNames = new Set([
  'nonnull',
  'notnull',
  'nullable',
  'recentlynonnull',
  'recentlynullable',
]);

const indent = (level: number) => '    '.repeat(level);

const formatConcreteBody = (level: number, statements: string[] = []) => {
  return [
    ' {',
    ...statements.map((statement) => `${indent(level + 1)}${statement}`),
    `${indent(level)}}`,
  ].join('\n');
};

const toStartVersionInfo = (
  range: AndroidApiVersionRange,
): AndroidVersionInfo => {
  return {
    version: range.fromVersion,
    alias: range.fromAlias,
    apiVersion: range.fromApiVersion,
  };
};

const getVersionCode = (
  version: AndroidVersionInfo,
  conflictingNames: Set<string>,
): string => {
  const buildName = conflictingNames.has('Build')
    ? 'android.os.Build'
    : 'Build';
  return version.alias
    ? `${buildName}.VERSION_CODES.${version.alias}`
    : String(version.apiVersion);
};

const getNullabilityAnnotationName = (
  type: string,
  nullability: Nullability | undefined,
): 'Nullable' | 'NonNull' | undefined => {
  if (!nullability || primitiveTypeNames.has(type)) return;
  return nullability === 'nullable' ? 'Nullable' : 'NonNull';
};

const formatAnnotatedType = (
  type: string,
  nullability: Nullability | undefined,
  member: AndroidApiMemberResult,
  sourceImports: string[],
  conflictingNames: Set<string>,
): string => {
  const annotation = getNullabilityAnnotationName(type, nullability);
  const annotationName = annotation
    ? getRenderedTypeName(
        annotation,
        `android.annotation.${annotation}`,
        member,
        sourceImports,
        conflictingNames,
      )
    : undefined;
  return `${annotationName ? `@${annotationName} ` : ''}${qualifyTypeText(
    type,
    member,
    sourceImports,
    conflictingNames,
  )}`;
};

const formatParameter = (
  parameter: ClassMemberParam,
  index: number,
  member: AndroidApiMemberResult,
  sourceImports: string[],
  conflictingNames: Set<string>,
): string => {
  return `${formatAnnotatedType(
    parameter.type,
    parameter.nullability,
    member,
    sourceImports,
    conflictingNames,
  )} ${parameter.name || `arg${index}`}`;
};

const formatNullableSummaryType = (
  type: string,
  nullability: Nullability | undefined,
) => {
  return nullability === 'nullable' && !type.endsWith('?') ? `${type}?` : type;
};

const formatSummaryParameter = (parameter: ClassMemberParam) => {
  return formatNullableSummaryType(parameter.type, parameter.nullability);
};

const formatSummaryMemberType = (member: AndroidApiMemberResult) => {
  if (member.kind === 'method') {
    const parameters = member.parameters.map(formatSummaryParameter).join(', ');
    return `(${parameters}) -> ${formatNullableSummaryType(
      member.returnType,
      member.returnNullability,
    )}`;
  }
  if (member.kind === 'constructor') {
    return `(${member.parameters.map(formatSummaryParameter).join(', ')}) -> ${
      member.name
    }`;
  }
  return formatNullableSummaryType(member.type, member.fieldNullability);
};

const getMemberTypeTexts = (member: AndroidApiMemberResult): string[] => {
  return 'parameters' in member
    ? [
        ...member.parameters.map((parameter) => parameter.type),
        'returnType' in member ? member.returnType : member.name,
      ]
    : [member.type];
};

const getMemberIdentityImports = (
  member: AndroidApiMemberResult,
  sourceImports: string[],
) => {
  // Nullability changes declaration metadata, not the underlying Java member.
  // Keep a matching import only when the annotation name is also a real type.
  const typeNames = new Set(
    getMemberTypeTexts(member).flatMap(
      (type) => type.match(/[A-Za-z_$][\w$]*/g) ?? [],
    ),
  );
  return member.imports.filter((index) => {
    const importName = sourceImports[index];
    if (importName === undefined) return true;
    const simpleName = importName
      .replace(importPrefixReg, '')
      .split('.')
      .at(-1);
    return (
      !simpleName ||
      !nullabilityAnnotationNames.has(simpleName.toLowerCase()) ||
      typeNames.has(simpleName)
    );
  });
};

const mergeNullabilities = (
  nullabilities: Array<Nullability | undefined>,
): Nullability | undefined => {
  if (nullabilities.some((value) => value === 'nullable')) return 'nullable';
  if (
    nullabilities.length > 0 &&
    nullabilities.every((value) => value === 'non-null')
  ) {
    return 'non-null';
  }
};

const mergeParameterNullabilities = (
  member: Extract<AndroidApiMemberResult, { parameters: unknown }>,
  members: AndroidApiMemberResult[],
) => {
  return member.parameters.map((parameter, index) => {
    const { nullability: _nullability, ...rest } = parameter;
    const nullability = mergeNullabilities(
      members.map((candidate) =>
        'parameters' in candidate
          ? candidate.parameters[index]?.nullability
          : undefined,
      ),
    );
    return {
      ...rest,
      ...(nullability ? { nullability } : {}),
    };
  });
};

const mergeMemberNullabilities = (
  members: AndroidApiMemberResult[],
  sourceImports: string[],
): AndroidApiMemberResult => {
  const member = members.at(-1)!;
  const imports = getMemberIdentityImports(member, sourceImports);
  if (!('parameters' in member)) {
    const { fieldNullability: _fieldNullability, ...rest } = member;
    const fieldNullability = mergeNullabilities(
      members.map((candidate) =>
        'parameters' in candidate ? undefined : candidate.fieldNullability,
      ),
    );
    return {
      ...rest,
      imports,
      ...(fieldNullability ? { fieldNullability } : {}),
    };
  }

  const parameters = mergeParameterNullabilities(member, members);
  if (!('returnType' in member)) {
    return {
      ...member,
      imports,
      parameters,
    };
  }

  const { returnNullability: _returnNullability, ...rest } = member;
  const returnNullability = mergeNullabilities(
    members.map((candidate) =>
      candidate.kind === 'method' ? candidate.returnNullability : undefined,
    ),
  );
  return {
    ...rest,
    imports,
    ...(returnNullability ? { returnNullability } : {}),
    parameters,
  };
};

const formatMemberIdentityKey = (
  member: AndroidApiMemberResult,
  sourceImports: string[],
): string => {
  const identityImports = getMemberIdentityImports(member, sourceImports);
  if ('parameters' in member) {
    const parameters = member.parameters
      .map((parameter) => parameter.type)
      .join(',');
    return `${member.kind}:${member.name}(${parameters}):${
      'returnType' in member ? member.returnType : member.name
    }:${identityImports.join(',')}`;
  }
  return `${member.kind}:${member.name}:${member.type}:${
    member.isStatic ? 'static' : ''
  }:${identityImports.join(',')}`;
};

const getMemberSortWeight = (member: AndroidApiMemberResult) => {
  if (member.kind === 'constant') return 0;
  if (member.kind === 'field') return 1;
  if (member.kind === 'constructor') return 2;
  return 3;
};

const compareDeclarations = (
  a: AndroidApiCodeDeclaration,
  b: AndroidApiCodeDeclaration,
  sourceImports: string[],
) => {
  return (
    a.requiresApi.apiVersion - b.requiresApi.apiVersion ||
    getMemberSortWeight(a.member) - getMemberSortWeight(b.member) ||
    a.member.name.localeCompare(b.member.name) ||
    formatMemberIdentityKey(a.member, sourceImports).localeCompare(
      formatMemberIdentityKey(b.member, sourceImports),
    )
  );
};

const getAndroidVersionInfo = (
  apiVersion: number,
  range: AndroidApiVersionRange,
): AndroidVersionInfo => {
  if (apiVersion === range.fromApiVersion) {
    return {
      version: range.fromVersion,
      alias: range.fromAlias,
      apiVersion,
    };
  }
  if (apiVersion === range.toApiVersion) {
    return {
      version: range.toVersion,
      alias: range.toAlias,
      apiVersion,
    };
  }
  return (
    androidVersionInfos.find(
      (version) => version.apiVersion === apiVersion,
    ) ?? {
      version: String(apiVersion),
      alias: '',
      apiVersion,
    }
  );
};

const getApiVersionsInRange = (range: AndroidApiVersionRange) => {
  const versions = androidVersionInfos.filter(
    (version) =>
      version.apiVersion >= range.fromApiVersion &&
      version.apiVersion <= range.toApiVersion,
  );
  if (versions.length > 0) return versions;
  return [getAndroidVersionInfo(range.fromApiVersion, range)];
};

const completeDeclaration = (
  declarations: AndroidApiCodeDeclaration[],
  state: CodeDeclarationState,
  sourceImports: string[],
) => {
  declarations.push({
    member: mergeMemberNullabilities(state.members, sourceImports),
    signature: state.signature,
    requiresApi: state.requiresApi,
    ...(state.deprecatedSinceApi
      ? { deprecatedSinceApi: state.deprecatedSinceApi }
      : {}),
    fromTag: state.fromTag,
    toTag: state.toTag,
  });
};

const collectDeclarations = (
  overloads: AndroidApiOverloadResult[],
  sourceImports: string[],
): AndroidApiCodeDeclaration[] => {
  const declarations: AndroidApiCodeDeclaration[] = [];

  for (const overload of overloads) {
    let active:
      | {
          key: string;
          state: CodeDeclarationState;
        }
      | undefined;
    for (const range of overload.ranges) {
      const member = range.member;
      const key = member
        ? formatMemberIdentityKey(member, sourceImports)
        : undefined;
      if (active && active.key !== key) {
        const missingVersion = toStartVersionInfo(range);
        if (missingVersion.apiVersion > active.state.requiresApi.apiVersion) {
          active.state.deprecatedSinceApi = missingVersion;
        }
        completeDeclaration(declarations, active.state, sourceImports);
        active = undefined;
      }

      if (!member || !key) continue;
      if (active) {
        active.state.toTag = range.toTag;
        active.state.members.push(member);
        continue;
      }
      active = {
        key,
        state: {
          members: [member],
          signature: member.type,
          requiresApi: toStartVersionInfo(range),
          fromTag: range.fromTag,
          toTag: range.toTag,
        },
      };
    }
    if (active) completeDeclaration(declarations, active.state, sourceImports);
  }

  return declarations.sort((a, b) => compareDeclarations(a, b, sourceImports));
};

const getDeclarationEndApiVersion = (
  declaration: AndroidApiCodeDeclaration,
) => {
  return declaration.deprecatedSinceApi?.apiVersion ?? Number.POSITIVE_INFINITY;
};

const hasCrossedLifecycle = (
  a: AndroidApiCodeDeclaration,
  b: AndroidApiCodeDeclaration,
) => {
  const aStart = a.requiresApi.apiVersion;
  const aEnd = getDeclarationEndApiVersion(a);
  const bStart = b.requiresApi.apiVersion;
  const bEnd = getDeclarationEndApiVersion(b);
  return (
    (aStart < bStart && bStart < aEnd && aEnd < bEnd) ||
    (bStart < aStart && aStart < bEnd && bEnd < aEnd)
  );
};

const hasComplexLifecycle = (
  declarations: AndroidApiCodeDeclaration[],
  sourceImports: string[],
) => {
  const seen = new Set<string>();
  for (const declaration of declarations) {
    const key = formatMemberIdentityKey(declaration.member, sourceImports);
    if (seen.has(key)) return true;
    seen.add(key);
  }
  for (let i = 0; i < declarations.length; i++) {
    for (let j = i + 1; j < declarations.length; j++) {
      if (hasCrossedLifecycle(declarations[i]!, declarations[j]!)) {
        return true;
      }
    }
  }
  return false;
};

const mergeDeclarationsByIdentity = (
  declarations: AndroidApiCodeDeclaration[],
  sourceImports: string[],
) => {
  const map = new Map<string, AndroidApiCodeDeclaration>();
  for (const declaration of declarations) {
    const key = formatMemberIdentityKey(declaration.member, sourceImports);
    const existing = map.get(key);
    if (existing) {
      existing.member = mergeMemberNullabilities(
        [existing.member, declaration.member],
        sourceImports,
      );
      existing.toTag = declaration.toTag;
      continue;
    }
    map.set(key, { ...declaration });
  }
  return Array.from(map.values()).sort((a, b) =>
    compareDeclarations(a, b, sourceImports),
  );
};

const getJavaMethodSignatureKey = (
  member: AndroidApiMemberResult,
  sourceImports: string[],
  name = member.name,
) => {
  if (member.kind !== 'method') return '';
  return `${name}(${member.parameters
    .map((parameter) =>
      parameter.type.replace(qualifiedTypeReg, (qualifiedName) => {
        const simpleName = qualifiedName.split('.')[0]!;
        const importedType = getMemberImportedType(
          member,
          sourceImports,
          simpleName,
        );
        return importedType
          ? `${importedType}${qualifiedName.substring(simpleName.length)}`
          : qualifiedName;
      }),
    )
    .join(',')})`;
};

const getRemapMethodSuffix = (version: AndroidVersionInfo) => {
  const versionSuffix = version.version.replace(/[^A-Za-z0-9_$]+/g, '_');
  return `V${versionSuffix || version.apiVersion}`;
};

const getRemappedMethodName = (
  declaration: AndroidApiCodeDeclaration,
  usedMethodKeys: Set<string>,
  sourceImports: string[],
) => {
  const member = declaration.member;
  if (member.kind !== 'method') return member.name;

  const suffix = getRemapMethodSuffix(declaration.requiresApi);
  let index = 1;
  let name = `${member.name}${suffix}`;
  while (
    usedMethodKeys.has(getJavaMethodSignatureKey(member, sourceImports, name))
  ) {
    index++;
    name = `${member.name}${suffix}_${index}`;
  }
  return name;
};

const applyRemapMethodNames = (
  declarations: AndroidApiCodeDeclaration[],
  sourceImports: string[],
): AndroidApiCodeDeclaration[] => {
  const groups = new Map<string, AndroidApiCodeDeclaration[]>();
  for (const declaration of declarations) {
    if (declaration.member.kind !== 'method') continue;
    const key = getJavaMethodSignatureKey(declaration.member, sourceImports);
    const group = groups.get(key) ?? [];
    group.push(declaration);
    groups.set(key, group);
  }

  const remappedDeclarations = new Set<AndroidApiCodeDeclaration>();
  for (const group of groups.values()) {
    if (group.length <= 1) continue;
    const sortedGroup = [...group].sort((a, b) =>
      compareDeclarations(a, b, sourceImports),
    );
    for (const declaration of sortedGroup.slice(0, -1)) {
      remappedDeclarations.add(declaration);
    }
  }

  const usedMethodKeys = new Set<string>();
  for (const declaration of declarations) {
    if (
      declaration.member.kind === 'method' &&
      !remappedDeclarations.has(declaration)
    ) {
      usedMethodKeys.add(
        getJavaMethodSignatureKey(declaration.member, sourceImports),
      );
    }
  }

  return declarations.map((declaration) => {
    if (declaration.member.kind !== 'method') return declaration;
    const originalName = declaration.member.name;
    if (!remappedDeclarations.has(declaration)) {
      return declaration;
    }

    const name = getRemappedMethodName(
      declaration,
      usedMethodKeys,
      sourceImports,
    );
    const member = {
      ...declaration.member,
      name,
    };
    usedMethodKeys.add(getJavaMethodSignatureKey(member, sourceImports));
    return {
      ...declaration,
      member,
      remapMethodName: originalName,
    };
  });
};

const getTagDesc = (tag: string) => {
  return tag.startsWith(androidTagPrefix)
    ? tag.substring(androidTagPrefix.length)
    : tag;
};

const getApiRangeIndexes = (ranges: AndroidApiVersionRange[]) => {
  const firstIndexes = new Map<number, number>();
  const lastIndexes = new Map<number, number>();
  ranges.forEach((range, index) => {
    for (const version of getApiVersionsInRange(range)) {
      if (!firstIndexes.has(version.apiVersion)) {
        firstIndexes.set(version.apiVersion, index);
      }
      lastIndexes.set(version.apiVersion, index);
    }
  });
  return { firstIndexes, lastIndexes };
};

const startsAtFirstCheckedTag = (
  range: CodeSignatureSummaryRange,
  summary: CodeSignatureSummary,
) => {
  return summary.hasCheckedTagPositions
    ? range.fromRange.fromTagPosition === 'first-checked'
    : summary.firstIndexes.get(range.fromRange.fromApiVersion) ===
        range.fromIndex;
};

const endsAtLastCheckedTag = (
  range: CodeSignatureSummaryRange,
  summary: CodeSignatureSummary,
) => {
  return summary.hasCheckedTagPositions
    ? range.toRange.toTagPosition === 'last-checked'
    : summary.lastIndexes.get(range.toRange.toApiVersion) === range.toIndex;
};

const formatSummaryRange = (
  range: CodeSignatureSummaryRange,
  summary: CodeSignatureSummary,
) => {
  const { fromRange, toRange } = range;
  const startsAtFirst = startsAtFirstCheckedTag(range, summary);
  const endsAtLast = endsAtLastCheckedTag(range, summary);
  const fromDesc = startsAtFirst
    ? fromRange.fromVersion
    : getTagDesc(fromRange.fromTag);
  const toDesc = endsAtLast ? toRange.toVersion : getTagDesc(toRange.toTag);
  if (
    summary.hasCheckedTagPositions &&
    startsAtFirst &&
    endsAtLast &&
    fromDesc === toDesc
  ) {
    return fromDesc;
  }
  if (fromRange.fromTag === toRange.toTag) return getTagDesc(fromRange.fromTag);
  if (fromDesc === toDesc) return fromDesc;
  return `${fromDesc} - ${toDesc}`;
};

const findBoundaryRangeIndex = (
  ranges: AndroidApiVersionRangeResult[],
  boundaryTag: string,
  boundary: 'from' | 'to',
) => {
  const index = ranges.findIndex(
    (range) =>
      (boundary === 'from' ? range.fromTag : range.toTag) === boundaryTag,
  );
  if (index >= 0) return index;
  return boundary === 'from' ? 0 : Math.max(0, ranges.length - 1);
};

const collectSignatureSummaries = (
  overloads: AndroidApiOverloadResult[],
  checkedRanges: AndroidApiVersionRangeResult[],
  sourceImports: string[],
) => {
  const summaries = new Map<string, CodeSignatureSummary>();
  const { firstIndexes, lastIndexes } = getApiRangeIndexes(checkedRanges);
  const hasCheckedTagPositions =
    checkedRanges.some(
      (range) => range.fromTagPosition || range.toTagPosition,
    ) ||
    overloads.some((overload) =>
      overload.ranges.some(
        (range) => range.fromTagPosition || range.toTagPosition,
      ),
    );
  for (const overload of overloads) {
    for (const range of overload.ranges) {
      const member = range.member;
      if (!member) continue;
      const key = formatMemberIdentityKey(member, sourceImports);
      let summary = summaries.get(key);
      if (!summary) {
        summary = {
          signature: formatSummaryMemberType(member),
          ranges: [],
          firstIndexes,
          lastIndexes,
          hasCheckedTagPositions,
        };
        summaries.set(key, summary);
      } else {
        summary.signature = formatSummaryMemberType(member);
      }
      const fromIndex = findBoundaryRangeIndex(
        checkedRanges,
        range.fromTag,
        'from',
      );
      const toIndex = findBoundaryRangeIndex(checkedRanges, range.toTag, 'to');
      const lastRange = summary.ranges.at(-1);
      if (lastRange?.toIndex === fromIndex - 1) {
        lastRange.toRange = range;
        lastRange.toIndex = toIndex;
      } else {
        summary.ranges.push({
          fromRange: range,
          fromIndex,
          toRange: range,
          toIndex,
        });
      }
    }
  }
  return summaries;
};

const formatSignatureSummaryComment = (
  summary: CodeSignatureSummary | undefined,
) => {
  if (!summary) return;
  return summary.ranges
    .map((range) => formatSummaryRange(range, summary))
    .join(', ');
};

const supportsLifecycleAnnotations = (
  signatureSummaries: Map<string, CodeSignatureSummary>,
) => {
  if (signatureSummaries.size === 0) return false;
  return Array.from(signatureSummaries.values()).every((summary) => {
    if (summary.ranges.length !== 1) return false;
    const range = summary.ranges[0]!;
    return (
      startsAtFirstCheckedTag(range, summary) &&
      endsAtLastCheckedTag(range, summary)
    );
  });
};

const getTopLevelNameFromPath = (path: string | undefined): string => {
  return path?.split('/').at(-1)?.replace(sourceFileReg, '') ?? 'HiddenApi';
};

const isValidJavaIdentifier = (value: string): boolean => {
  return javaIdentifierReg.test(value);
};

const getPackageNameFromPath = (path: string | undefined): string => {
  const normalized = path?.replaceAll('\\', '/') ?? '';
  const match = normalized.match(
    /(?:^|\/)(?:java|src)\/(.+)\/[^/]+\.(?:aidl|java)$/i,
  );
  const packagePath = match?.[1];
  if (!packagePath) return '';
  const parts = packagePath.split('/').filter(Boolean);
  if (!parts.every(isValidJavaIdentifier)) return '';
  return parts.join('.');
};

const getActualClassPath = (result: AndroidApiQueryResult): string[] => {
  const target = result.resolvedTarget;
  if (!target) return [getTopLevelNameFromPath(result.selection?.path)];
  if (target.kind === 'member') {
    return target.paths.slice(0, -1);
  }
  return target.paths.length
    ? target.paths
    : [getTopLevelNameFromPath(result.selection?.path)];
};

const getQueryClassRefParts = (result: AndroidApiQueryResult): string[] => {
  const target = result.resolvedTarget;
  if (!target || target.kind === 'file') return [];

  let classRef = result.normalizedApiName.trim().replaceAll('$', '.');
  if (sourceFileReg.test(classRef)) return [];

  if (target.kind === 'member') {
    const isConstructorShorthand =
      classRef.endsWith('()') && target.paths.at(-1) === target.paths.at(-2);
    if (isConstructorShorthand) {
      classRef = classRef.substring(0, classRef.length - 2);
    } else {
      const hashIndex = classRef.indexOf('#');
      if (hashIndex >= 0) {
        classRef = classRef.substring(0, hashIndex);
      } else {
        const dotIndex = classRef.lastIndexOf('.');
        classRef = dotIndex >= 0 ? classRef.substring(0, dotIndex) : '';
      }
    }
  }

  return classRef.split('.').filter(Boolean);
};

const removePackagePrefix = (
  parts: string[],
  packageName: string,
): string[] => {
  if (!packageName) return parts;
  const packageParts = packageName.split('.');
  if (parts.length <= packageParts.length) return parts;
  const startsWithPackage = packageParts.every(
    (part, index) => parts[index] === part,
  );
  return startsWithPackage ? parts.slice(packageParts.length) : parts;
};

const getDisplayClassPath = (
  result: AndroidApiQueryResult,
  actualClassPath: string[],
  packageName: string,
  useAutomaticHiddenClass: boolean,
): string[] => {
  const classRefParts = removePackagePrefix(
    getQueryClassRefParts(result),
    packageName,
  );
  const displayClassPath =
    classRefParts.length < actualClassPath.length
      ? [...actualClassPath]
      : classRefParts.slice(-actualClassPath.length);
  if (!displayClassPath.every(isValidJavaIdentifier)) {
    return actualClassPath;
  }
  const hasExplicitRemap = displayClassPath.some(
    (name, index) => name !== actualClassPath[index],
  );
  if (useAutomaticHiddenClass && !hasExplicitRemap && displayClassPath[0]) {
    displayClassPath[0] = `${displayClassPath[0]}Hidden`;
  }
  return displayClassPath;
};

const isAidlInterface = (
  result: AndroidApiQueryResult,
  classPath: string[],
): boolean => {
  return (
    !!result.selection?.path.endsWith('.aidl') &&
    /^I[A-Z]/.test(classPath[0] ?? '')
  );
};

const getResolvedTypePath = (
  result: AndroidApiQueryResult,
  actualClassPath: string[],
  declarations: AndroidApiCodeDeclaration[],
): AndroidApiResolvedType[] => {
  const resolvedTypePath = result.resolvedTarget?.typePath;
  const hasMatchingTypePath =
    resolvedTypePath?.length === actualClassPath.length &&
    resolvedTypePath.every(
      (type, index) => type.name === actualClassPath[index],
    );
  const typePath: AndroidApiResolvedType[] = hasMatchingTypePath
    ? resolvedTypePath.map((type) => ({ ...type }))
    : actualClassPath.map((name, index) => ({
        name,
        kind:
          index === 0 && isAidlInterface(result, actualClassPath)
            ? ('interface' as const)
            : ('class' as const),
        isHidden: true,
      }));
  const hasAbstractMethod = declarations.some(
    (declaration) =>
      declaration.member.kind === 'method' && declaration.member.isAbstract,
  );
  const containingType = typePath.at(-1);
  if (hasAbstractMethod && containingType && containingType.kind === 'class') {
    containingType.isAbstract = true;
  }
  return typePath;
};

const formatMethodDeclaration = (
  member: Extract<AndroidApiMemberResult, { kind: 'method' }>,
  level: number,
  inInterface: boolean,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  const parameters = member.parameters
    .map((parameter, index) =>
      formatParameter(
        parameter,
        index,
        member,
        sourceImports,
        conflictingNames,
      ),
    )
    .join(', ');
  const isAbstract = inInterface || member.isAbstract;
  const prefix = inInterface
    ? ''
    : member.isAbstract
      ? 'public abstract '
      : 'public ';
  const body = isAbstract
    ? ';'
    : member.returnType === 'void'
      ? formatConcreteBody(level)
      : formatConcreteBody(level, ['throw new RuntimeException();']);
  return `${indent(level)}${prefix}${formatAnnotatedType(
    member.returnType,
    member.returnNullability,
    member,
    sourceImports,
    conflictingNames,
  )} ${member.name}(${parameters})${body}`;
};

const formatConstructorDeclaration = (
  member: Extract<AndroidApiMemberResult, { kind: 'constructor' }>,
  level: number,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  const parameters = member.parameters
    .map((parameter, index) =>
      formatParameter(
        parameter,
        index,
        member,
        sourceImports,
        conflictingNames,
      ),
    )
    .join(', ');
  return `${indent(level)}public ${member.name}(${parameters})${formatConcreteBody(
    level,
    ['throw new RuntimeException();'],
  )}`;
};

const getConstantInitializer = (member: AndroidApiMemberResult) => {
  if (
    member.kind !== 'constant' ||
    !primitiveTypeNames.has(member.type) ||
    member.type === 'void' ||
    !member.initializer?.trim()
  )
    return undefined;
  return member.initializer;
};

const formatFieldDeclaration = (
  member: Extract<AndroidApiMemberResult, { kind: 'field' | 'constant' }>,
  level: number,
  inInterface: boolean,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  const prefix = inInterface
    ? ''
    : member.kind === 'constant' || member.isStatic
      ? 'public static '
      : 'public ';
  const initializer = inInterface
    ? ` = ${
        getConstantInitializer(member) ??
        `${getGeneratedName(
          'RemapStub',
          'li.songe.remap.RemapStub',
          conflictingNames,
        )}.value()`
      }`
    : '';
  return `${indent(level)}${prefix}${formatAnnotatedType(
    member.type,
    member.fieldNullability,
    member,
    sourceImports,
    conflictingNames,
  )} ${member.name}${initializer};`;
};

const formatMemberDeclaration = (
  member: AndroidApiMemberResult,
  level: number,
  inInterface: boolean,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  if (member.kind === 'method') {
    return formatMethodDeclaration(
      member,
      level,
      inInterface,
      sourceImports,
      conflictingNames,
    );
  }
  if (member.kind === 'constructor') {
    return formatConstructorDeclaration(
      member,
      level,
      sourceImports,
      conflictingNames,
    );
  }
  return formatFieldDeclaration(
    member,
    level,
    inInterface,
    sourceImports,
    conflictingNames,
  );
};

const getDeclarationIdentityKey = (
  declaration: AndroidApiCodeDeclaration,
  sourceImports: string[],
) => {
  const member = declaration.member;
  if (member.kind === 'method' && declaration.remapMethodName) {
    return formatMemberIdentityKey(
      {
        ...member,
        name: declaration.remapMethodName,
      },
      sourceImports,
    );
  }
  return formatMemberIdentityKey(member, sourceImports);
};

const formatAnnotatedDeclaration = (
  declaration: AndroidApiCodeDeclaration,
  level: number,
  inInterface: boolean,
  baselineApiVersion: number | undefined,
  signatureSummaries: Map<string, CodeSignatureSummary>,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  const lines: string[] = [];
  const signatureSummary = signatureSummaries.get(
    getDeclarationIdentityKey(declaration, sourceImports),
  );
  const useLifecycleAnnotations =
    supportsLifecycleAnnotations(signatureSummaries);
  if (!useLifecycleAnnotations) {
    const comment = formatSignatureSummaryComment(signatureSummary);
    if (comment) {
      lines.push(`${indent(level)}// ${comment}`);
    }
  }
  if (useLifecycleAnnotations) {
    if (
      baselineApiVersion === undefined ||
      declaration.requiresApi.apiVersion > baselineApiVersion
    ) {
      lines.push(
        `${indent(level)}@${getGeneratedName(
          'RequiresApi',
          'androidx.annotation.RequiresApi',
          conflictingNames,
        )}(${getVersionCode(declaration.requiresApi, conflictingNames)})`,
      );
    }
    if (declaration.deprecatedSinceApi) {
      lines.push(
        `${indent(level)}@${getGeneratedName(
          'DeprecatedSinceApi',
          'androidx.annotation.DeprecatedSinceApi',
          conflictingNames,
        )}(api = ${getVersionCode(
          declaration.deprecatedSinceApi,
          conflictingNames,
        )})`,
      );
    }
  }
  if (declaration.remapMethodName) {
    lines.push(
      `${indent(level)}@${getGeneratedName(
        'RemapMethod',
        'li.songe.remap.RemapMethod',
        conflictingNames,
      )}("${declaration.remapMethodName}")`,
    );
  }
  lines.push(
    formatMemberDeclaration(
      declaration.member,
      level,
      inInterface,
      sourceImports,
      conflictingNames,
    ),
  );
  return lines.join('\n');
};

const getClassRemapLiteral = (
  actualClassPath: string[],
  displayClassPath: string[],
  index: number,
): string | undefined => {
  if (actualClassPath[index] === displayClassPath[index]) return;
  return `${actualClassPath.slice(0, index + 1).join('.')}.class`;
};

const getImportTarget = (importName: string) => {
  return importName.replace(importPrefixReg, '');
};

const getTypeImportInfo = (importName: string): TypeImportInfo => {
  const qualifiedName = getImportTarget(importName);
  if (importName.startsWith('static ') || qualifiedName.endsWith('.*')) {
    const sourceSimpleName = qualifiedName.endsWith('.*')
      ? undefined
      : qualifiedName.split('.').at(-1);
    return {
      qualifiedName,
      sourceSimpleName,
      bindingName: sourceSimpleName,
      renderedName: sourceSimpleName,
      normalizedImportName: importName,
    };
  }

  const parts = qualifiedName.split('.');
  const sourceSimpleName = parts.at(-1);
  const topLevelTypeIndex = parts.findIndex((part) => /^[A-Z]/.test(part));
  if (topLevelTypeIndex < 0) {
    return {
      qualifiedName,
      sourceSimpleName,
      bindingName: sourceSimpleName,
      renderedName: sourceSimpleName,
      normalizedImportName: importName,
    };
  }

  return {
    qualifiedName,
    sourceSimpleName,
    bindingName: parts[topLevelTypeIndex],
    renderedName: parts.slice(topLevelTypeIndex).join('.'),
    normalizedImportName: parts.slice(0, topLevelTypeIndex + 1).join('.'),
  };
};

const getImportSimpleName = (importName: string): string | undefined => {
  return getTypeImportInfo(importName).sourceSimpleName;
};

const getMemberTypeImportInfo = (
  member: AndroidApiMemberResult,
  sourceImports: string[],
  simpleName: string,
): TypeImportInfo | undefined => {
  for (const index of member.imports) {
    const importName = sourceImports[index];
    if (importName === undefined) {
      throw new Error(`Invalid member import index: ${index}`);
    }
    const info = getTypeImportInfo(importName);
    if (info.sourceSimpleName === simpleName) return info;
  }
};

const getMemberImportedType = (
  member: AndroidApiMemberResult,
  sourceImports: string[],
  simpleName: string,
): string | undefined => {
  return getMemberTypeImportInfo(member, sourceImports, simpleName)
    ?.qualifiedName;
};

const getGeneratedName = (
  simpleName: string,
  qualifiedName: string,
  conflictingNames: Set<string>,
) => {
  return conflictingNames.has(simpleName) ? qualifiedName : simpleName;
};

const getRenderedTypeName = (
  simpleName: string,
  fallbackQualifiedName: string,
  member: AndroidApiMemberResult,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  if (!conflictingNames.has(simpleName)) return simpleName;
  return (
    getMemberImportedType(member, sourceImports, simpleName) ??
    fallbackQualifiedName
  );
};

const qualifyTypeText = (
  type: string,
  member: AndroidApiMemberResult,
  sourceImports: string[],
  conflictingNames: Set<string>,
) => {
  return type.replace(qualifiedTypeReg, (qualifiedName) => {
    const simpleName = qualifiedName.split('.')[0]!;
    const info = getMemberTypeImportInfo(member, sourceImports, simpleName);
    if (!info?.renderedName || !info.bindingName) return qualifiedName;
    const importedType = conflictingNames.has(info.bindingName)
      ? info.qualifiedName
      : info.renderedName;
    return `${importedType}${qualifiedName.substring(simpleName.length)}`;
  });
};

const addImport = (
  imports: Set<string>,
  packageName: string,
  importName: string,
) => {
  const normalizedImportName =
    getTypeImportInfo(importName).normalizedImportName;
  const qualifiedName = getImportTarget(normalizedImportName);
  const importPackage = qualifiedName.endsWith('.*')
    ? qualifiedName.slice(0, -2)
    : qualifiedName.substring(0, qualifiedName.lastIndexOf('.'));
  if (
    !normalizedImportName.startsWith('static ') &&
    (importPackage === 'java.lang' ||
      (packageName && importPackage === packageName))
  ) {
    return;
  }
  imports.add(normalizedImportName);
};

const hasRemappedClass = (
  actualClassPath: string[],
  displayClassPath: string[],
): boolean => {
  return displayClassPath.some(
    (name, index) => name !== actualClassPath[index],
  );
};

const needsRequiresApiAnnotation = (
  declaration: AndroidApiCodeDeclaration,
  baselineApiVersion: number | undefined,
) => {
  return (
    baselineApiVersion === undefined ||
    declaration.requiresApi.apiVersion > baselineApiVersion
  );
};

const collectMemberTypeNames = (member: AndroidApiMemberResult): string[] => {
  return getMemberTypeTexts(member).flatMap(
    (type) => type.match(/[A-Za-z_$][\w$]*/g) ?? [],
  );
};

const getMemberTypeNullabilities = (
  member: AndroidApiMemberResult,
): { type: string; nullability?: Nullability }[] => {
  if ('parameters' in member) {
    return [
      ...member.parameters.map((parameter) => ({
        type: parameter.type,
        nullability: parameter.nullability,
      })),
      ...('returnType' in member
        ? [
            {
              type: member.returnType,
              nullability: member.returnNullability,
            },
          ]
        : []),
    ];
  }
  return [{ type: member.type, nullability: member.fieldNullability }];
};

const getImportGroupIndex = (item: string) => {
  const target = item.replace(/^static\s+/, '');
  if (target.startsWith('android.')) return 0;
  if (target.startsWith('androidx.')) return 1;
  if (target.startsWith('java.') || target.startsWith('javax.')) return 2;
  if (target.startsWith('li.songe.')) return 3;
  return 4;
};

const sortImports = (imports: Set<string>) => {
  return Array.from(imports).sort(
    (a, b) =>
      getImportGroupIndex(a) - getImportGroupIndex(b) || a.localeCompare(b),
  );
};

const resolveImportConflicts = (imports: Set<string>): CodeImportPlan => {
  const targetsBySimpleName = new Map<string, Set<string>>();
  for (const importName of imports) {
    const simpleName = getImportSimpleName(importName);
    if (!simpleName) continue;
    let targets = targetsBySimpleName.get(simpleName);
    if (!targets) {
      targets = new Set();
      targetsBySimpleName.set(simpleName, targets);
    }
    targets.add(getImportTarget(importName));
  }
  const conflictingNames = new Set(
    Array.from(targetsBySimpleName)
      .filter(([, targets]) => targets.size > 1)
      .map(([simpleName]) => simpleName),
  );
  if (conflictingNames.size > 0) {
    for (const importName of imports) {
      const simpleName = getImportSimpleName(importName);
      if (simpleName && conflictingNames.has(simpleName)) {
        imports.delete(importName);
      }
    }
  }
  return {
    imports: sortImports(imports),
    conflictingNames,
  };
};

const collectImports = (
  declarations: AndroidApiCodeDeclaration[],
  sourceImports: string[],
  packageName: string,
  aidlSource: boolean,
  aidlInterface: boolean,
  inInterface: boolean,
  actualClassPath: string[],
  displayClassPath: string[],
  baselineApiVersion: number | undefined,
  signatureSummaries: Map<string, CodeSignatureSummary>,
): CodeImportPlan => {
  const imports = new Set<string>();
  const useLifecycleAnnotations =
    supportsLifecycleAnnotations(signatureSummaries);

  if (aidlInterface) {
    addImport(imports, packageName, 'android.os.Binder');
    addImport(imports, packageName, 'android.os.IBinder');
    addImport(imports, packageName, 'android.os.IInterface');
  }
  if (hasRemappedClass(actualClassPath, displayClassPath)) {
    addImport(imports, packageName, 'li.songe.remap.RemapType');
  }
  if (
    inInterface &&
    declarations.some(
      ({ member }) =>
        (member.kind === 'field' || member.kind === 'constant') &&
        getConstantInitializer(member) === undefined,
    )
  ) {
    addImport(imports, packageName, 'li.songe.remap.RemapStub');
  }
  if (declarations.some((declaration) => declaration.remapMethodName)) {
    addImport(imports, packageName, 'li.songe.remap.RemapMethod');
  }

  for (const declaration of declarations) {
    if (useLifecycleAnnotations) {
      if (needsRequiresApiAnnotation(declaration, baselineApiVersion)) {
        addImport(imports, packageName, 'android.os.Build');
        addImport(imports, packageName, 'androidx.annotation.RequiresApi');
      }
      if (declaration.deprecatedSinceApi) {
        addImport(imports, packageName, 'android.os.Build');
        addImport(
          imports,
          packageName,
          'androidx.annotation.DeprecatedSinceApi',
        );
      }
    }
    const member = declaration.member;
    for (const index of member.imports) {
      const importName = sourceImports[index];
      if (importName === undefined) {
        throw new Error(`Invalid member import index: ${index}`);
      }
      addImport(imports, packageName, importName);
    }
    for (const item of getMemberTypeNullabilities(member)) {
      const annotation = getNullabilityAnnotationName(
        item.type,
        item.nullability,
      );
      if (annotation) {
        addImport(imports, packageName, `android.annotation.${annotation}`);
      }
    }
    if (aidlSource) {
      for (const typeName of collectMemberTypeNames(member)) {
        const qualifiedName = aidlImportBySimpleTypeName.get(typeName);
        if (qualifiedName) addImport(imports, packageName, qualifiedName);
      }
    }
  }

  return resolveImportConflicts(imports);
};

const pushFileHeader = (
  lines: string[],
  packageName: string,
  imports: string[],
) => {
  if (packageName) {
    lines.push(`package ${packageName};`);
    lines.push('');
  }
  if (imports.length > 0) {
    imports.forEach((item, index) => {
      if (
        index > 0 &&
        getImportGroupIndex(imports[index - 1]!) !== getImportGroupIndex(item)
      ) {
        lines.push('');
      }
      lines.push(`import ${item};`);
    });
    lines.push('');
  }
};

const pushClassOpenings = (
  lines: string[],
  actualClassPath: string[],
  displayClassPath: string[],
  typePath: AndroidApiResolvedType[],
  includeAidlStub: boolean,
) => {
  displayClassPath.forEach((name, index) => {
    const level = index;
    const type = typePath[index]!;
    const remapLiteral = getClassRemapLiteral(
      actualClassPath,
      displayClassPath,
      index,
    );
    if (remapLiteral) {
      lines.push(`${indent(level)}@RemapType(${remapLiteral})`);
    }
    if (type.kind === 'interface') {
      const extendsType =
        index === 0 && includeAidlStub ? ' extends IInterface' : '';
      lines.push(`${indent(level)}public interface ${name}${extendsType} {`);
      if (index === 0 && includeAidlStub) {
        lines.push(
          `${indent(level + 1)}abstract class Stub extends Binder implements ${name} {`,
        );
        lines.push(
          `${indent(level + 2)}public static ${name} asInterface(IBinder obj) {`,
        );
        lines.push(`${indent(level + 3)}throw new RuntimeException();`);
        lines.push(`${indent(level + 2)}}`);
        lines.push(`${indent(level + 1)}}`);
      }
      return;
    }
    const prefix = index === 0 ? 'public ' : 'public static ';
    const abstractModifier = type.isAbstract ? 'abstract ' : '';
    lines.push(`${indent(level)}${prefix}${abstractModifier}class ${name} {`);
  });
};

const pushClassClosings = (lines: string[], classPath: string[]) => {
  for (let index = classPath.length - 1; index >= 0; index--) {
    lines.push(`${indent(index)}}`);
  }
};

const renderCode = (
  result: AndroidApiQueryResult,
  declarations: AndroidApiCodeDeclaration[],
  baselineApiVersion: number | undefined,
  signatureSummaries: Map<string, CodeSignatureSummary>,
): RenderedCode => {
  if (declarations.length === 0) {
    return {
      memberCode: '',
      code: '',
    };
  }

  const packageName =
    result.package || getPackageNameFromPath(result.selection?.path);
  const actualClassPath = getActualClassPath(result);
  const typePath = getResolvedTypePath(result, actualClassPath, declarations);
  const useAutomaticHiddenClass = typePath[0]?.isHidden === false;
  const displayClassPath = getDisplayClassPath(
    result,
    actualClassPath,
    packageName,
    useAutomaticHiddenClass,
  );
  const inInterface = typePath.at(-1)?.kind === 'interface';
  const includeAidlStub =
    !!result.selection?.path.endsWith('.aidl') &&
    typePath[0]?.kind === 'interface';
  const memberLevel = displayClassPath.length;
  const importPlan = collectImports(
    declarations,
    result.imports,
    packageName,
    !!result.selection?.path.endsWith('.aidl'),
    includeAidlStub,
    inInterface,
    actualClassPath,
    displayClassPath,
    baselineApiVersion,
    signatureSummaries,
  );
  const memberCode = declarations
    .map((declaration) =>
      formatAnnotatedDeclaration(
        declaration,
        memberLevel,
        inInterface,
        baselineApiVersion,
        signatureSummaries,
        result.imports,
        importPlan.conflictingNames,
      ),
    )
    .join('\n\n');
  const lines: string[] = [];

  pushFileHeader(lines, packageName, importPlan.imports);
  pushClassOpenings(
    lines,
    actualClassPath,
    displayClassPath,
    typePath,
    includeAidlStub,
  );
  lines.push('');
  lines.push(memberCode);
  lines.push('');
  pushClassClosings(lines, displayClassPath);

  return {
    memberCode,
    code: lines.join('\n'),
  };
};

export const renderAndroidApiCodeWithMemberCode = async (
  result: AndroidApiQueryResult,
  constantExpressionKeys?: ConstantExpressionKeys,
): Promise<AndroidApiCodeResult & { memberCode: string }> => {
  if (result.tags.some((tag) => tag.status === 'error')) {
    throw new Error(
      'Cannot generate version guards while source queries have errors',
    );
  }
  const ranges = result.ranges;
  const baselineApiVersion = ranges[0]?.fromApiVersion;
  const initializers = [
    ...new Set(
      result.overloads.flatMap((overload) =>
        overload.ranges.flatMap((range) => {
          const value = range.member && getConstantInitializer(range.member);
          return value === undefined ? [] : [value];
        }),
      ),
    ),
  ];
  const keys = initializers.length
    ? await (
        constantExpressionKeys ??
        (await import('../parser/java/constant-expression.ts'))
          .getJavaConstantExpressionKeys
      )(initializers)
    : [];
  const expressionKeys = new Map(
    initializers.map((source, index) => [source, keys[index]]),
  );
  const getExpressionKey = (member: AndroidApiMemberResult) => {
    const initializer = getConstantInitializer(member);
    if (initializer === undefined) return undefined;
    return expressionKeys.get(initializer);
  };
  const lifecycleDeclarations = collectDeclarations(
    result.overloads.map((overload) => {
      const members = overload.ranges.flatMap((range) =>
        range.member ? [range.member] : [],
      );
      const first = members[0];
      const firstKey = first && getExpressionKey(first);
      const stable =
        first?.kind === 'constant' &&
        firstKey !== undefined &&
        members.every(
          (member) =>
            member.kind === 'constant' &&
            member.type === first.type &&
            getExpressionKey(member) === firstKey,
        );
      if (stable) return overload;
      // Clear unsupported/unstable expressions before declaration merging so
      // both field rendering and import collection take the RemapStub fallback.
      return {
        ...overload,
        ranges: overload.ranges.map((range) => {
          if (range.member?.kind !== 'constant') return range;
          const { initializer, ...member } = range.member;
          return { ...range, member };
        }),
      };
    }),
    result.imports,
  );
  const hasComplexDeclarationLifecycle = hasComplexLifecycle(
    lifecycleDeclarations,
    result.imports,
  );
  const codeDeclarations = hasComplexDeclarationLifecycle
    ? mergeDeclarationsByIdentity(lifecycleDeclarations, result.imports)
    : lifecycleDeclarations;
  const declarations = applyRemapMethodNames(codeDeclarations, result.imports);
  const signatureSummaries = collectSignatureSummaries(
    result.overloads,
    result.ranges,
    result.imports,
  );
  const renderedCode = renderCode(
    result,
    declarations,
    baselineApiVersion,
    signatureSummaries,
  );
  return {
    apiName: result.apiName,
    normalizedApiName: result.normalizedApiName,
    package: result.package,
    imports: result.imports,
    candidates: result.candidates,
    ...(result.selection ? { selection: result.selection } : {}),
    ...(result.resolvedTarget ? { resolvedTarget: result.resolvedTarget } : {}),
    summary: {
      checkedTags: result.summary.checkedTags,
      foundTags: result.summary.foundTags,
      declarationCount: declarations.length,
      overloadCount: result.overloads.length,
      ...(result.summary.firstFoundTag
        ? { firstFoundTag: result.summary.firstFoundTag }
        : {}),
      ...(result.summary.lastFoundTag
        ? { lastFoundTag: result.summary.lastFoundTag }
        : {}),
    },
    declarations,
    memberCode: renderedCode.memberCode,
    code: renderedCode.code,
  };
};

export const renderAndroidApiCode = async (
  result: AndroidApiQueryResult,
  constantExpressionKeys?: ConstantExpressionKeys,
): Promise<AndroidApiCodeResult> => {
  const { memberCode: _memberCode, ...codeResult } =
    await renderAndroidApiCodeWithMemberCode(result, constantExpressionKeys);
  return codeResult;
};
