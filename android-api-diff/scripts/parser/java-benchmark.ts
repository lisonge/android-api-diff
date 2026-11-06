import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
  initializeJavaParser,
  parseJavaFileTreeSitter as treeSitter,
} from '../../src/core/parser/java/tree-sitter.ts';

const directory = new URL(
  '../../../.cache/java-parser-benchmark/',
  import.meta.url,
);
await mkdir(directory, { recursive: true });
const samples = [
  'android-11.0.0_r48',
  'android-12.0.0_r34',
  'android-17.0.0_r1',
].flatMap((tag) => [
  ...[
    'android/view/MotionEvent.java',
    'android/view/View.java',
    'android/app/Activity.java',
    'android/content/Context.java',
    'android/content/Intent.java',
    'android/content/pm/PackageManager.java',
  ].map((path) => ({
    tag,
    repo: 'platform.frameworks.base',
    path: `core/java/${path}`,
  })),
  {
    tag,
    repo: tag.startsWith('android-11.')
      ? 'platform.frameworks.base'
      : 'platform.packages.modules.Connectivity',
    path: `${tag.startsWith('android-11.') ? 'core/java' : 'framework/src'}/android/net/ConnectivityManager.java`,
  },
]);
const corpus: { name: string; text: string }[] = [];
for (const sample of samples) {
  const name = `${sample.tag}-${sample.path.split('/').at(-1)}`;
  const path = new URL(name, directory);
  let text: string;
  try {
    text = await readFile(path, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    const url = `https://raw.githubusercontent.com/msft-mirror-aosp/${sample.repo}/${sample.tag}/${sample.path}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
    text = await response.text();
    await writeFile(path, text);
  }
  corpus.push({ name, text });
}
const initializationStart = performance.now();
await initializeJavaParser();
const initializationMs = performance.now() - initializationStart;
for (const sample of corpus) await treeSitter(sample.text);
const median = (values: number[]) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]!;
const results = [];
// Measure warmed parsing including extraction and ApiFile construction.
for (const sample of corpus) {
  const timings: number[] = [];
  for (let iteration = 0; iteration < 5; iteration++) {
    const start = performance.now();
    await treeSitter(sample.text);
    timings.push(performance.now() - start);
  }
  const treeSitterMs = median(timings);
  results.push({
    name: sample.name,
    bytes: Buffer.byteLength(sample.text),
    treeSitterMs,
  });
  console.log(`${sample.name}: Tree-sitter ${treeSitterMs.toFixed(1)} ms`);
}
const report = {
  node: process.version,
  platform: process.platform,
  initializationMs,
  iterations: 5,
  samples: results,
  treeSitterTotalMs: results.reduce((n, r) => n + r.treeSitterMs, 0),
};
await writeFile(
  new URL('tree-sitter-results.json', directory),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(
  JSON.stringify({ ...report, samples: report.samples.length }, null, 2),
);
