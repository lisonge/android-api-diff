const sourceBaseurl = 'https://android.googlesource.com/';
// https://android.googlesource.com/platform/frameworks/base/+/refs/heads/android11-d1-release/apex/Android.bp
// https://android.googlesource.com/platform/frameworks/layoutlib/+/refs/tags/android-16.0.0_r3/README
// https://android.googlesource.com/platform/frameworks/base/+/main/.prebuilt_info/OWNERS
const sourceRegs = [
  /\/\+\/refs\/heads\/[^\/]+(.*)$/g,
  /\/\+\/refs\/tags\/[^\/]+(.*)$/g,
  /\/\+\/[^\/]+(.*)$/g,
];

const csBaseUrl = 'https://cs.android.com/';
// https://cs.android.com/android/platform/superproject/+/android-latest-release:Android.bp
// https://cs.android.com/android/platform/superproject/+/android-latest-release:frameworks/base/Android.bp
// https://cs.android.com/android/platform/superproject/main/+/main:bootable/
const csReg = /\/\+\/[^\/\:]+\:?(.*)$/g;

const mirrorBaseUrl =
  'https://github.com/aosp-mirror/platform_frameworks_base/';
// https://github.com/aosp-mirror/platform_frameworks_base/blob/main/android-sdk-flags/flags.aconfig
// https://github.com/aosp-mirror/platform_frameworks_base/tree/android-16.0.0_r3/.prebuilt_info
// https://github.com/aosp-mirror/platform_frameworks_base/raw/android-16.0.0_r3/core/java/android/app/IActivityManager.aidl
const mirrorRegs = [
  /\/blob\/[^\/]+(.*)$/g,
  /\/tree\/[^\/]+(.*)$/g,
  /\/raw\/[^\/]+(.*)$/g,
];

export const mirrorContentBaseUrl =
  'https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/';
// https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/refs/heads/main/core/java/android/app/IActivityManager.aidl
// https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/refs/tags/android-16.0.0_r3/core/java/android/app/IActivityManager.aidl
// https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/android-11.0.0_r13/core/java/android/app/IActivityManager.aidl
// https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/1cdfff555f4a21f71ccc978290e2e212e2f8b168/core/java/android/app/IActivityManager.aidl
const mirrorContentRegs = [
  /\/refs\/heads\/[^\/]+(.*)$/g,
  /\/refs\/tags\/[^\/]+(.*)$/g,
  /\/[0-9a-f]{40}(.*)$/g,
  /\/aosp\-mirror\/platform_frameworks_base\/[^\/]+(.*)$/g,
];

export const fixFilePath = (filePath: string): string => {
  const a1 = filePath.indexOf(';');
  if (a1 >= 0) {
    filePath = filePath.substring(0, a1);
  }
  const a2 = filePath.indexOf('?');
  if (a2 >= 0) {
    filePath = filePath.substring(0, a2);
  }
  const a3 = filePath.indexOf('#');
  if (a3 >= 0) {
    filePath = filePath.substring(0, a3);
  }
  return filePath;
};

export const getVersionUrlBuilder = (
  url: string,
): VersionUrlBuilder | undefined => {
  if (url.startsWith(sourceBaseurl)) {
    const repository = url.substring(sourceBaseurl.length, url.indexOf('/+/'));
    if (!repository) {
      return;
    }
    const filePath = (() => {
      for (const reg of sourceRegs) {
        reg.lastIndex = 0;
        const r = reg.exec(url)?.[1];
        if (r === undefined) continue;
        return r;
      }
    })();
    if (filePath === undefined) return;
    return {
      replaceUrl(tag) {
        return sourceBaseurl + repository + `/+/` + tag + filePath;
      },
      filePath: fixFilePath(filePath),
    };
  } else if (url.startsWith(csBaseUrl)) {
    url = url.replace('/main/+/', '/+/');
    csReg.lastIndex = 0;
    const r = csReg.exec(url);
    if (!r) return;
    const baseUrl = url.substring(0, r.index);
    const filePath = r[1];
    let actualFilePath = '';
    if (filePath.startsWith('frameworks/base/')) {
      actualFilePath = filePath.substring('frameworks/base/'.length);
      actualFilePath = '/' + actualFilePath;
    }
    return {
      replaceUrl(tag) {
        return baseUrl + `/+/` + tag + (filePath && ':' + filePath);
      },
      filePath: fixFilePath(actualFilePath),
    };
  } else if (url.startsWith(mirrorBaseUrl)) {
    const filePath = (() => {
      for (const reg of mirrorRegs) {
        reg.lastIndex = 0;
        const r = reg.exec(url)?.[1];
        if (r === undefined) continue;
        return r;
      }
    })();
    if (filePath === undefined) return;
    const type = url
      .substring(mirrorBaseUrl.length, url.indexOf(filePath))
      .split('/')[0];
    return {
      replaceUrl(tag) {
        return mirrorBaseUrl + type + `/` + tag + filePath;
      },
      filePath: fixFilePath(filePath),
    };
  } else if (url.startsWith(mirrorContentBaseUrl)) {
    const filePath = (() => {
      for (const reg of mirrorContentRegs) {
        reg.lastIndex = 0;
        const r = reg.exec(url)?.[1];
        if (r === undefined) continue;
        return r;
      }
    })();
    if (filePath === undefined) return;
    return {
      replaceUrl(tag) {
        return mirrorContentBaseUrl + tag + filePath;
      },
      filePath: fixFilePath(filePath),
    };
  }
};
