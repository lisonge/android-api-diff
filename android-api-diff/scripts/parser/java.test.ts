import { parseJavaFile } from '../../src/core/parser/index.ts';
import { getFileText } from './cache.ts';

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
  const result = await parseJavaFile(input);
  console.log('Parsed', name, Date.now() - st + 'ms');
  console.log(
    JSON.stringify(
      result.structs[0]?.members.map((v) => v.name) ?? [],
      null,
      2,
    ),
  );
}

// const result = await parseJavaFile(`
// public final class Example {
//     Example(){}
// }`);
// console.log(JSON.stringify(result, null, 2));
