import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  searchAndroidSources,
  bundledIndexUrl,
  parseSource,
  getJavaConstantExpressionKeys,
} from '../dist/index.js';

test('built constant comparisons use WASM and production JS excludes ANTLR', async () => {
  const keys = await getJavaConstantExpressionKeys([
    '1 << 4',
    '1 /* note */ << 4',
    '16',
    'call()',
  ]);
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[0], keys[2]);
  assert.equal(keys[3], undefined);
  const root = new URL('../dist/', import.meta.url);
  for (const path of await readdir(root, { recursive: true })) {
    if (!path.endsWith('.js')) continue;
    assert.doesNotMatch(
      await readFile(new URL(path.replaceAll('\\', '/'), root), 'utf8'),
      /\b(?:JavaLexer|JavaParser|AIDLLexer|AIDLParser|BinaryOperatorExpressionContext)\b|reference\/antlr-java/,
    );
  }
});

test('built Java parser ships its WASM without a tree-sitter-java runtime dependency', async () => {
  const root = new URL('../dist/', import.meta.url);
  const files = await readdir(root, { recursive: true });
  assert.ok(files.some((path) => /tree-sitter-java-.*\.wasm$/.test(path)));
  const manifest = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );
  assert.equal(manifest.dependencies['tree-sitter-java'], undefined);
  for (const path of files.filter((path) => path.endsWith('.js'))) {
    assert.doesNotMatch(
      await readFile(new URL(path.replaceAll('\\', '/'), root), 'utf8'),
      /node_modules\/tree-sitter-java|import\.meta\.resolve\(['"]tree-sitter-java/,
    );
  }
  const file = await parseSource(
    'java',
    'package sample; public class Example { public int value; }',
  );
  assert.equal(file.package, 'sample');
  assert.equal(file.structs[0]?.members[0]?.name, 'value');
});

test('built core loads the bundled index without network access', async () => {
  const candidates = await searchAndroidSources(
    {
      fetchText: async (url) => {
        assert.equal(new URL(url).protocol, 'file:');
        assert.match(url, /\/dist\/assets\/index-data-[^/]+\.json$/);
        return readFile(new URL(url), 'utf8');
      },
    },
    'IConnectivityManager',
  );
  assert.ok(candidates.some((c) => c.repo === 'platform/frameworks/base'));
  assert.ok(
    candidates.some((c) => c.repo === 'platform/packages/modules/Connectivity'),
  );
});

test('built CLI entrypoint can search the bundled index', () => {
  const output = execFileSync(
    process.execPath,
    [
      fileURLToPath(new URL('../dist/cli.js', import.meta.url)),
      'search',
      'IConnectivityManager',
    ],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output);
  assert.equal(result.ok, true);
  assert.ok(result.result.candidates.length >= 2);
});

test('built browser entrypoints do not import Node or installer modules', async () => {
  const seen = new Set<string>();
  const visit = async (url: URL) => {
    if (seen.has(url.href)) return;
    seen.add(url.href);
    const text = await readFile(url, 'utf8');
    for (const match of text.matchAll(
      /(?:from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g,
    )) {
      const specifier = match[1]!;
      assert.ok(
        !specifier.startsWith('node:') &&
          specifier !== 'skills' &&
          !specifier.startsWith('skills/'),
        `${url}: ${specifier}`,
      );
      if (specifier.startsWith('.')) await visit(new URL(specifier, url));
    }
  };
  await visit(new URL('../dist/index.js', import.meta.url));
});

test('built AIDL parser loads WASM and returns the shared model', async () => {
  const file = await parseSource(
    'aidl',
    'package sample; interface Service { int getValue(); }',
  );
  assert.equal(file.package, 'sample');
  assert.equal(file.structs[0]?.members[0]?.name, 'getValue');
});

test('build emits a standalone index JSON asset rather than a bundled JS index', async () => {
  const root = new URL('../dist/', import.meta.url);
  const files = await readdir(root, { recursive: true });
  assert.ok(files.some((path) => /index-data-.*\.json$/.test(path)));
  assert.equal(
    files.some((path) => /bundled-.*\.js$/.test(path)),
    false,
  );
  const index = JSON.parse(await readFile(bundledIndexUrl, 'utf8'));
  assert.equal(index.schemaVersion, 3);
  assert.equal(index.repositories.length, 24);
});

test('published exports expose one library with a separate CLI executable', async () => {
  const manifest = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );
  assert.deepEqual(manifest.publishConfig.bin, {
    'android-api-diff': './dist/cli.js',
  });
  assert.deepEqual(manifest.publishConfig.exports, {
    '.': './dist/index.js',
  });
  const library = await import('../dist/index.js');
  for (const name of [
    'searchAndroidSources',
    'queryAndroidApi',
    'generateAndroidApiCode',
    'renderAndroidApiCode',
    'renderAndroidApiCodeWithMemberCode',
    'parseSource',
    'parseJavaFile',
    'parseAIDLFile',
    'initializeJavaParser',
    'getJavaConstantExpressionKey',
    'getJavaConstantExpressionKeys',
  ]) {
    assert.equal(
      typeof library[name as keyof typeof library],
      'function',
      name,
    );
  }
  const files = await readdir(new URL('../dist/', import.meta.url));
  assert.equal(files.includes('core'), false);
  assert.equal(files.includes('parser.js'), false);
  assert.match(
    await readFile(new URL('../dist/cli.js', import.meta.url), 'utf8'),
    /^#!\/usr\/bin\/env node/,
  );
});

test('importing the library does not initialize a WASM parser or run the CLI', () => {
  const output = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `
    WebAssembly.instantiate = () => { throw new Error('Unexpected WASM initialization'); };
    WebAssembly.compile = () => { throw new Error('Unexpected WASM compilation'); };
    WebAssembly.Module = class { constructor() { throw new Error('Unexpected WASM module'); } };
    await import(${JSON.stringify(new URL('../dist/index.js', import.meta.url).href)});
  `,
    ],
    { encoding: 'utf8' },
  );
  assert.equal(output, '');
});
