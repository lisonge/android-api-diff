import lf from 'localforage';

const persistentCache = lf.createInstance({ name: 'persistentCache' });
const getPersistentCache = async <T>(
  key: string,
  fallback: () => Promise<T>
) => {
  let value = await persistentCache.getItem<T>(key);
  if (!value) {
    value = await fallback();
    await persistentCache.setItem(key, value);
  }
  return value;
};

const expiredCache = lf.createInstance({ name: 'expiredCache' });
interface ExpiredItem<T> {
  data: T;
  mtime: number;
}
const getExpiredCache = async <T>(
  key: string,
  expires: number,
  fallback: () => Promise<T>
) => {
  let value = await expiredCache.getItem<ExpiredItem<T>>(key);
  if (value) {
    const now = Date.now();
    if (now - value.mtime > expires) {
      value = null;
    }
  }
  if (!value) {
    const data = await fallback();
    value = {
      data,
      mtime: Date.now(),
    };
    await expiredCache.setItem(key, value);
  }
  return value.data;
};


export const getAndroidTags = async (): Promise<TagItem[]> => {
  const list: {
    ref: string;
  }[] = await getExpiredCache('androidTags', 24 * 3600 * 1000, async () => {
    return fetch(
      'https://api.github.com/repos/aosp-mirror/platform_frameworks_base/git/refs/tags'
    ).then((r) => r.text());
  }).then((r) => JSON.parse(r));
  const tagReg = /^android-\d+\.\d+\.\d+_r\d+$/;
  const map: Record<string, string[]> = {};
  list
    .map((v) => v.ref.replace('refs/tags/', ''))
    .filter((v) => tagReg.test(v))
    .forEach((v) => {
      const vserion = v
        .split('.')
        .slice(0, 2)
        .join('.')
        .replace('android-', '');
      let list = map[vserion];
      if (!list) {
        list = [];
        map[vserion] = list;
      }
      list.push(v);
    });
  return Object.entries(map)
    .map(([version, tags]) => {
      tags.sort((a, b) => {
        const ra = Number(a.split('_r')[1]);
        const rb = Number(b.split('_r')[1]);
        return ra - rb;
      });
      return {
        version,
        tags,
      } as TagItem;
    })
    .filter((v) => Number(v.version) >= 8.0)
    .sort((a, b) => Number(a.version) - Number(b.version));
};
