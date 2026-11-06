import { computed, ref, watch, type ComputedRef } from 'vue';
import {
  getAndroidApiOverloadId,
  compareTags,
  type ClassMember,
  type ClassMemberParam,
  type AndroidVersionItem,
} from 'android-api-diff';
import { useEqualComputed } from '../../utils/index.ts';
import { assignSignatureColors } from './signatureColors.ts';
import { hasConcurrentOverloads } from './overloads.ts';
import type { TagViewRecord } from './queryTask.ts';
import { getTagRangeResults } from './tagRangeResults.ts';
export const NOT_FOUND_TYPE_COLOR = '#00000080';
const MISSING_TARGET_TYPE_COLOR = '#000';
const formatNullableType = (
  type: string,
  nullability: ClassMemberParam['nullability'],
) => {
  return nullability === 'nullable' && !type.endsWith('?') ? `${type}?` : type;
};

const formatMemberParam = (param: ClassMemberParam) => {
  return formatNullableType(param.type, param.nullability);
};

const formatMemberType = (member: ClassMember) => {
  if (member.kind === 'method') {
    const params = member.parameters.map(formatMemberParam).join(', ');
    return `(${params}) -> ${formatNullableType(
      member.returnType,
      member.returnNullability,
    )}`;
  }
  if (member.kind === 'constructor') {
    return `(${member.parameters.map(formatMemberParam).join(', ')}) -> ${
      member.name
    }`;
  }
  return formatNullableType(member.type, member.fieldNullability);
};

const formatMemberOverloadLabel = (member: ClassMember): string => {
  if (!('parameters' in member)) return member.name;
  return `${member.name}(${member.parameters
    .map((parameter) => parameter.type)
    .join(', ')})`;
};

export interface DiffOverloadOption {
  key: string;
  label: string;
  parameterCount: number;
}

export const useQueryDisplay = (
  records: ComputedRef<TagViewRecord[]>,
  searchFromData: ComputedRef<{
    filePath: string;
    targetKind: string;
    targetPaths: string[];
  }>,
  filteredAndroidVersionList: ComputedRef<AndroidVersionItem[]>,
  loading: ComputedRef<boolean> = computed(() => false),
) => {
  const selectedOverloadKey = ref<string | null>(null);
  const androidOrderTags = computed(() =>
    filteredAndroidVersionList.value.flatMap((v) => v.tags),
  );
  const orderedRecords = computed(() =>
    [...records.value].sort((a, b) => compareTags(a.tag, b.tag)),
  );
  const signatureColors = computed<ReadonlyMap<string, string>>(() => {
    const found = orderedRecords.value.filter(
      (item) => item.status === 'found',
    );
    return assignSignatureColors([
      ...found.map(
        (item) => item.members?.map(formatMemberType).join('\n') ?? 'Found',
      ),
    ]);
  });
  const overloadColors = computed(() =>
    assignSignatureColors(
      orderedRecords.value.flatMap((item) => {
        const member = item.members?.find(
          (candidate) =>
            getAndroidApiOverloadId(candidate) === selectedOverloadKey.value,
        );
        return member ? [formatMemberType(member)] : [];
      }),
    ),
  );
  const getTypeColor = (key: string) => signatureColors.value.get(key)!;
  const diffResultList = computed<DiffResultItem[]>(() =>
    orderedRecords.value.map((item) => {
      const typeDesc =
        item.status === 'found'
          ? (item.members?.map(formatMemberType).join('\n') ?? 'Found')
          : item.status === 'not-found'
            ? ''
            : item.reason === 'network-error'
              ? 'Source download failed'
              : item.reason === 'parse-error'
                ? 'Source parsing failed'
                : 'Source index unavailable';
      return {
        ...item,
        structs: item.file.structs,
        typeDesc,
        typeColor:
          item.status === 'error'
            ? '#d97706'
            : item.status === 'not-found'
              ? NOT_FOUND_TYPE_COLOR
              : getTypeColor(typeDesc),
        notFound: item.status !== 'found' && item.reason !== 'api-not-found',
      };
    }),
  );
  const overloadOptions = computed<DiffOverloadOption[]>(() => {
    if (
      searchFromData.value.targetKind !== 'member' ||
      !searchFromData.value.filePath.endsWith('.java')
    ) {
      return [];
    }
    const options = new Map<string, DiffOverloadOption>();
    for (const result of diffResultList.value) {
      for (const member of result.members ?? []) {
        if (!('parameters' in member)) continue;
        const key = getAndroidApiOverloadId(member);
        if (options.has(key)) continue;
        options.set(key, {
          key,
          label: formatMemberOverloadLabel(member),
          parameterCount: member.parameterCount ?? 0,
        });
      }
    }
    return Array.from(options.values()).sort(
      (a, b) =>
        a.parameterCount - b.parameterCount || a.label.localeCompare(b.label),
    );
  });
  const showOverloadSelect = computed(() =>
    hasConcurrentOverloads(diffResultList.value),
  );
  watch([overloadOptions, showOverloadSelect], ([options, showSelect]) => {
    const selected = selectedOverloadKey.value;
    if (
      selected &&
      (!showSelect || !options.some((option) => option.key === selected))
    ) {
      selectedOverloadKey.value = null;
    }
  });

  const displayDiffResultList = computed<DiffResultItem[]>(() => {
    const selected = selectedOverloadKey.value;
    if (!selected) return diffResultList.value;
    return diffResultList.value.map((result) => {
      const member = result.members?.find(
        (candidate) => getAndroidApiOverloadId(candidate) === selected,
      );
      const signatureNotFound = !result.notFound && !!result.target && !member;
      const typeDesc = member
        ? formatMemberType(member)
        : signatureNotFound
          ? ''
          : result.typeDesc;
      return {
        ...result,
        members: member ? [member] : [],
        typeDesc,
        typeColor: member
          ? overloadColors.value.get(typeDesc)!
          : signatureNotFound
            ? MISSING_TARGET_TYPE_COLOR
            : result.typeColor,
      };
    });
  });
  const getDiffResult = (tag: string): DiffResultItem | undefined => {
    return displayDiffResultList.value.find((v) => v.tag === tag);
  };

  const diffTypeReult = useEqualComputed<DiffTypeItem[]>(() => {
    const list: DiffTypeItem[] = [];
    const rangeResults = getTagRangeResults(
      filteredAndroidVersionList.value,
      displayDiffResultList.value,
      loading.value,
    );
    androidOrderTags.value.forEach((tag, index) => {
      const res = rangeResults.get(tag);
      let typeItem: DiffTypeItem | undefined;
      if (res) {
        typeItem = list.find(
          (v) => v.typeDesc === res.typeDesc && v.typeColor === res.typeColor,
        );
        if (!typeItem) {
          typeItem = {
            typeDesc: res.typeDesc,
            typeColor: res.typeColor,
            tagRanges: [],
          };
          list.push(typeItem);
        }
      }
      if (!typeItem) return;
      if (typeItem.tagRanges.length === 0) {
        typeItem.tagRanges.push([tag]);
        return;
      }
      const lastTag = androidOrderTags.value[index - 1];
      const lastRange = typeItem.tagRanges.at(-1)!;
      if (lastRange.at(-1) === lastTag) {
        lastRange.push(tag);
      } else {
        typeItem.tagRanges.push([tag]);
      }
    });
    return list;
  });

  const displayAndroidVersionColors = computed(() =>
    Object.fromEntries(
      filteredAndroidVersionList.value.map((v) => [
        v.version,
        [
          ...new Set(
            displayDiffResultList.value
              .filter((d) => v.tags.includes(d.tag))
              .map((d) => d.typeColor),
          ),
        ],
      ]),
    ),
  );
  return {
    diffResultList,
    diffTypeReult,
    overloadOptions,
    showOverloadSelect,
    selectedOverloadKey,
    getDiffResult,
    androidVersionColors: displayAndroidVersionColors,
  };
};
