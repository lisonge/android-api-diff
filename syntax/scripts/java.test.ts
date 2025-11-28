import { getJavaStructList } from '../src';
import { getFileText } from './cache';

const baseUrl =
  'https://android.googlesource.com/platform/frameworks/base/+/main/core/java/';
const urls = [
  // 'android/app/ActionBar.java',
  'android/view/MotionEvent.java',
];

for (const name of urls) {
  console.log('Parsing', name);
  const st = Date.now();
  const input = await getFileText(baseUrl + name + '?format=TEXT');
  const result = getJavaStructList(input);
  console.log('Parsed', name, Date.now() - st + 'ms');
  console.log(
    JSON.stringify(
      result[0].members.map((v) => v.name),
      null,
      2,
    ),
  );
}

// const result = getJavaStructList(`
// public final class Example {
//     Example(){}
// }`);
// console.log(JSON.stringify(result, null, 2));
