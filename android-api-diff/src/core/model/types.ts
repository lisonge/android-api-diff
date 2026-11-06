import type { SourceIndex, SourceLocation } from '../catalog/index.ts';

export type Nullability = 'nullable' | 'non-null';

export interface ClassMemberParam {
  name?: string;
  type: string;
  nullability?: Nullability;
}

interface ClassMemberBase {
  name: string;
  type: string;
  loc: number;
  imports: number[];
  isStatic?: true;
  parameterCount?: number;
}

export interface ClassFieldMember extends ClassMemberBase {
  kind: 'field';
  fieldNullability?: Nullability;
}

export interface ClassConstantMember extends ClassMemberBase {
  kind: 'constant';
  initializer?: string;
  fieldNullability?: Nullability;
}

export interface ClassMethodMember extends ClassMemberBase {
  kind: 'method';
  isAbstract?: true;
  returnType: string;
  returnNullability?: Nullability;
  parameters: ClassMemberParam[];
  parameterCount: number;
}

export interface ClassConstructorMember extends ClassMemberBase {
  kind: 'constructor';
  parameters: ClassMemberParam[];
  parameterCount: number;
}

export type ClassMember =
  | ClassFieldMember
  | ClassConstantMember
  | ClassMethodMember
  | ClassConstructorMember;

export interface ClassStruct {
  name: string;
  loc: number;
  isInterface?: true;
  isAbstract?: true;
  isHidden?: true;
  members: ClassMember[];
  children?: ClassStruct[];
}

export interface ApiFile {
  package: string;
  imports: string[];
  structs: ClassStruct[];
}

export type SourceLanguage = 'java' | 'aidl';
export type ConstantExpressionKeys = (
  sources: string[],
) => Promise<(string | undefined)[]>;

export interface AndroidVersionInfo {
  version: string;
  alias: string;
  apiVersion: number;
}

export interface AndroidVersionItem extends AndroidVersionInfo {
  tags: string[];
  futureTags: string[];
}

export type SearchTargetKind = 'file' | 'class' | 'member';

export interface SearchFromData {
  filePath: string;
  targetUrl: string;
  targetPaths: string[];
  targetKind: SearchTargetKind;
}

export interface AndroidApiSourceLocation {
  repo: string;
  path: string;
  /** Raw URL of the selected source at its anchor tag. */
  url: string;
}

export interface AndroidApiResolvedTarget {
  kind: SearchTargetKind;
  paths: string[];
  typePath?: AndroidApiResolvedType[];
}

export interface AndroidApiResolvedType {
  name: string;
  kind: 'class' | 'interface';
  isAbstract?: true;
  isHidden: boolean;
}

export interface AndroidApiResolution {
  source: AndroidApiSourceLocation;
  resolvedTarget: AndroidApiResolvedTarget;
}

export interface FileTarget {
  filePath: string;
  targetPaths: string[];
}

export interface CacheStore<T> {
  get(key: string): Promise<T | undefined>;
  set(key: string, value: T): Promise<void>;
  /**
   * Returns the canonical in-memory instance for this serialized value when
   * the store supports content-based object reuse.
   */
  intern?(value: T): T;
}

export interface AndroidApiQueryRuntime {
  /** Read source URLs and the bundled JSON asset URL (file: in Node, HTTP in Web). */
  fetchText(url: string, signal?: AbortSignal): Promise<string>;
  /** Optional execution adapter; omitted by CLI to parse in-process. */
  parseSource?(language: SourceLanguage, text: string): Promise<ApiFile>;
  constantExpressionKeys?: ConstantExpressionKeys;
  indexUrl?: string;
  loadSourceIndex?(signal?: AbortSignal): Promise<SourceIndex>;
  loadAndroidVersionList?(signal?: AbortSignal): Promise<AndroidVersionItem[]>;
  textCache?: CacheStore<string>;
  structCache?: CacheStore<AndroidApiStructCacheEntry>;
  queryCache?: CacheStore<AndroidApiQueryResult>;
}

export type SearchInput =
  | { mode: 'name'; text: string }
  | {
      mode: 'source';
      source: SourceLocation;
      target?: string;
      anchorTag?: string;
    };

export interface QueryAndroidApiOptions {
  input: SearchInput;
  minSdk?: number;
  concurrency?: number;
  signal?: AbortSignal;
  onProgress?(progress: AndroidApiQueryProgress): void | Promise<void>;
  onEvent?(event: AndroidApiQueryEvent): void;
}

export type AndroidApiQueryContext = Pick<
  AndroidApiQueryResult,
  'selection' | 'resolvedTarget'
>;

export type AndroidApiQueryEvent =
  | { type: 'selected'; context: AndroidApiQueryContext; tags: string[] }
  | { type: 'tag-start'; tag: string }
  | { type: 'tag-complete'; result: AndroidApiTagResult; file?: ApiFile };

export interface AndroidApiTagResult {
  tag: string;
  status: 'found' | 'not-found' | 'error';
  reason?: AndroidApiMissingReason;
  source?: SourceLocation;
  candidates?: SourceLocation[];
}

export interface AndroidApiQueryProgress {
  completedTags: number;
  totalTags: number;
  currentTag?: string;
}

type MemberResult<T extends ClassMember> = T extends ClassMember
  ? Omit<T, 'loc' | 'parameterCount'>
  : never;

export type AndroidApiMemberResult = MemberResult<ClassMember>;

export interface AndroidApiStructCacheEntry {
  file: ApiFile;
  sourceFileNotFound: boolean;
}

export type AndroidApiMissingReason =
  | 'source-file-not-found'
  | 'api-not-found'
  | 'index-unavailable'
  | 'network-error'
  | 'parse-error'
  | 'type-not-found';

export type AndroidApiOverloadMissingReason =
  | AndroidApiMissingReason
  | 'overload-not-found';

export interface AndroidApiVersionRange {
  fromVersion: string;
  fromAlias: string;
  fromApiVersion: number;
  fromTag: string;
  /** The endpoint is the first tag checked for this Android version in this query snapshot. */
  fromTagPosition?: 'first-checked';
  toVersion: string;
  toAlias: string;
  toApiVersion: number;
  toTag: string;
  /** The endpoint is the last tag checked in this query snapshot, not a permanent final tag. */
  toTagPosition?: 'last-checked';
}

export interface AndroidApiVersionRangeResult extends AndroidApiVersionRange {
  missingReason?: AndroidApiMissingReason;
  /** Stable overload identities available throughout this range. */
  overloadIds?: string[];
}

export interface AndroidApiOverloadVersionRangeResult extends AndroidApiVersionRange {
  missingReason?: AndroidApiOverloadMissingReason;
  member?: AndroidApiMemberResult;
}

export interface AndroidApiOverloadResult {
  /** Java overload identity: member kind, name, and parameter types. */
  overloadId: string;
  /** Full signature from the latest checked definition of this overload. */
  signature: string;
  /** Latest checked definition of this overload. */
  member: AndroidApiMemberResult;
  ranges: AndroidApiOverloadVersionRangeResult[];
}

export interface AndroidApiQueryResult {
  candidateErrors?: {
    source: SourceLocation;
    tag: string;
    reason: 'network-error' | 'parse-error';
  }[];
  tags: AndroidApiTagResult[];
  apiName: string;
  normalizedApiName: string;
  /** All matching sources in recommended order; metadata does not imply historical availability. */
  candidates: AndroidApiResolution[];
  package: string;
  imports: string[];
  selection?: AndroidApiSourceLocation;
  resolvedTarget?: AndroidApiResolvedTarget;
  summary: {
    checkedTags: number;
    foundTags: number;
    rangeCount: number;
    overloadCount: number;
    firstFoundTag?: string;
    lastFoundTag?: string;
  };
  ranges: AndroidApiVersionRangeResult[];
  overloads: AndroidApiOverloadResult[];
}

export interface AndroidApiCodeDeclaration {
  member: AndroidApiMemberResult;
  signature: string;
  remapMethodName?: string;
  requiresApi: AndroidVersionInfo;
  deprecatedSinceApi?: AndroidVersionInfo;
  fromTag: string;
  toTag: string;
}

export interface AndroidApiCodeResult {
  apiName: string;
  normalizedApiName: string;
  /** All matching sources in recommended order; metadata does not imply historical availability. */
  candidates: AndroidApiResolution[];
  package: string;
  imports: string[];
  selection?: AndroidApiSourceLocation;
  resolvedTarget?: AndroidApiResolvedTarget;
  summary: {
    checkedTags: number;
    foundTags: number;
    declarationCount: number;
    overloadCount: number;
    firstFoundTag?: string;
    lastFoundTag?: string;
  };
  declarations: AndroidApiCodeDeclaration[];
  code: string;
}
