import {
  aidlJavaFiles,
  fileStructsMap,
  notFoundFileMap,
  pullStructsByUrl,
  searchFilePathByRefName,
} from '@/store';
import { colors, findStructByName, useEqualComputed, useTask } from '@/utils';
import androidVersionList from '@/utils/android.data';
import { emptyArray } from '@/utils/constant';
import { getVersionUrlBuilder } from '@/utils/url';
import {
  createSharedComposable,
  useLocalStorage,
  watchDebounced,
} from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { computed, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    location.reload();
  });
}

const androidOrderTags = androidVersionList.flatMap((v) => v.tags);

export const useSharedHomeState = createSharedComposable(() => {
  const mode = useLocalStorage<'file' | 'ref'>('mode', 'ref');
  const isRefMode = computed({
    get: () => mode.value === 'ref',
    set: (v: boolean) => {
      mode.value = v ? 'ref' : 'file';
    },
  });
  const searchUrl = useRouteQuery<string>('url', '');
  const searchName = useRouteQuery<string>('name', '');
  const searchProp = useRouteQuery<string>('prop', '');
  watch(searchUrl, () => {
    if (!searchUrl.value) {
      searchName.value = '';
    }
  });
  watch(searchName, () => {
    if (!searchName.value) {
      searchProp.value = '';
    }
  });
  watchDebounced(searchUrl, (v) => {
    if (v.match(/\w\.(java)|(aidl)\b/)) {
      searchName.value = v.split('/').at(-1)!.replace(/\..+$/g, '');
    }
  });
  const searchRef = useRouteQuery<string>('ref', '');
  if (searchRef.value) {
    isRefMode.value = true;
  } else if (searchUrl.value) {
    isRefMode.value = false;
  }
  const router = useRouter();
  const switchRefMode = () => {
    isRefMode.value = !isRefMode.value;
    router.replace({ query: {} });
  };

  const actualMainInput = computed({
    get() {
      return isRefMode.value ? searchRef.value : searchUrl.value;
    },
    set(v: string) {
      if (isRefMode.value) {
        searchRef.value = v;
      } else {
        searchUrl.value = v;
      }
    },
  });

  const emptySearchFromData: SearchFromData = {
    targetUrl: '',
    targetName: '',
    targetProp: '',
  };

  const searchFromData = useEqualComputed<SearchFromData>(() => {
    if (isRefMode.value) {
      return searchFilePathByRefName(searchRef.value) ?? emptySearchFromData;
    } else {
      return {
        targetUrl: searchUrl.value,
        targetName: searchName.value,
        targetProp: searchProp.value,
      };
    }
  });

  const urlBuilder = useEqualComputed(() =>
    getVersionUrlBuilder(searchFromData.value.targetUrl),
  );

  const isCanParsedUrl = computed(() => {
    const builder = urlBuilder.value;
    if (!builder) return false;
    const f = builder.filePath.substring('/'.length);
    return (
      (f.endsWith('.java') || f.endsWith('.aidl')) &&
      aidlJavaFiles.value.includes(f)
    );
  });

  const colorCache = new Map<string, string>();
  watch(searchFromData, () => colorCache.clear());
  const getCachedTypeColor = (key: string) => {
    if (!key) return '';
    const v = colorCache.get(key);
    if (v) return v;
    let i = colorCache.size;
    const color = colors[i % colors.length];
    colorCache.set(key, color);
    return color;
  };

  const diffResultList = computed<DiffResultItem[]>(() => {
    const builder = urlBuilder.value;
    if (!builder?.filePath) return emptyArray;
    const targetName = searchFromData.value.targetName;
    const propName = searchFromData.value.targetProp;
    if (!targetName || !propName || !isCanParsedUrl.value) return emptyArray;
    return androidOrderTags
      .map((tag) => {
        const filePath = tag + builder.filePath;
        const structs = fileStructsMap[tag + builder.filePath];
        if (!structs) return;
        let typeDesc = '';
        let typeColor = '#00000080'; // not found file
        const target = findStructByName(structs, targetName);
        let members: DiffResultItem['members'] | undefined;
        if (target) {
          typeColor = '#000'; // not found prop
          members = target.members.filter((v) => v.name === propName);
          if (members.length > 0) {
            typeDesc = members
              .sort((a, b) => (a.parameterCount ?? 0) - (b.parameterCount ?? 0))
              .map((v) => v.type)
              .join('\n');
            typeColor = getCachedTypeColor(typeDesc);
          }
        }
        const r: DiffResultItem = {
          tag,
          structs,
          members,
          typeDesc,
          typeColor,
          notFound: notFoundFileMap[filePath],
        };
        return r;
      })
      .filter((v): v is DiffResultItem => !!v);
  });
  const getDiffResult = (tag: string): DiffResultItem | undefined => {
    return diffResultList.value.find((v) => v.tag === tag);
  };

  const diffTypeReult = computed<DiffTypeItem[]>(() => {
    const list: DiffTypeItem[] = [];
    androidOrderTags.forEach((tag, index) => {
      const res = getDiffResult(tag);
      if (!res) return;
      let typeItem = list.find((v) => v.typeDesc === res.typeDesc);
      if (!typeItem) {
        typeItem = {
          typeDesc: res.typeDesc,
          typeColor: res.typeColor,
          tagRanges: [],
        };
        list.push(typeItem);
      }
      if (typeItem.tagRanges.length === 0) {
        typeItem.tagRanges.push([tag]);
        return;
      }
      const lastTag = androidOrderTags[index - 1];
      const lastRange = typeItem.tagRanges.at(-1)!;
      if (lastRange.at(-1) === lastTag) {
        lastRange.push(tag);
      } else {
        typeItem.tagRanges.push([tag]);
      }
    });
    return list;
  });

  let signal = new AbortController();
  const stopDiff = () => {
    signal.abort();
    signal = new AbortController();
  };
  onUnmounted(stopDiff);

  const handleDiff = useTask(async () => {
    const s = signal;
    if (isRefMode.value) {
      while (aidlJavaFiles.value.length === 0) {
        await new Promise((r) => setTimeout(r));
        if (s.signal.aborted) return;
      }
    }
    if (!urlBuilder.value) return;
    const builder = urlBuilder.value;
    for (const item of androidVersionList) {
      if (s.signal.aborted) return;
      await Promise.all(
        item.tags.map((tag) => pullStructsByUrl(tag + builder.filePath, s)),
      );
    }
  });
  setTimeout(handleDiff.invoke);

  const handleExample = (item: ExampleItem) => {
    if (handleDiff.loading) return;
    if (isRefMode.value) {
      searchRef.value = item.refName;
    } else {
      searchUrl.value = item.url;
      searchName.value = item.targetName;
      searchProp.value = item.propName;
    }
    setTimeout(handleDiff.invoke, 300);
  };

  const androidVersionColors = useEqualComputed<Record<string, string[]>>(
    () => {
      const map: Record<string, string[]> = {};
      androidVersionList.forEach((v) => {
        map[v.version] = Array.from(
          new Set(
            diffResultList.value
              .filter((d) => v.tags.includes(d.tag))
              .map((d) => d.typeColor),
          ),
        );
      });
      return map;
    },
  );

  return {
    isRefMode,
    actualMainInput,
    searchFromData,
    isCanParsedUrl,
    diffResultList,
    diffTypeReult,
    handleDiff,
    searchName,
    searchProp,
    searchRef,
    switchRefMode,
    handleExample,
    stopDiff,
    getDiffResult,
    urlBuilder,
    androidVersionColors,
  };
});
