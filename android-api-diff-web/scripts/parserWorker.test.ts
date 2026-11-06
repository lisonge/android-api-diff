import assert from 'node:assert/strict';
import test from 'node:test';
import { Worker } from 'node:worker_threads';
import {
  createWorkerParser,
  type ParserWorker,
} from '../src/utils/parser/client.ts';
import type {
  ParseRequest,
  ParseResponse,
} from '../src/utils/parser/protocol.ts';
import {
  parseSource,
  getJavaConstantExpressionKeys,
  generateAndroidApiCode,
  loadParsedSource,
} from 'android-api-diff';
import {
  movedFixture,
  base,
  connectivity,
  oldPath,
  newPath,
  t11,
  t12,
} from '../../android-api-diff/scripts/fixtures.ts';

// Execute the actual browser Worker module in a separate Node thread with a
// minimal Web Worker messaging bridge. No alternate parsing implementation.
const threadWorker = (): ParserWorker => {
  const moduleUrl = new URL(
    '../src/utils/parser/parser.worker.ts',
    import.meta.url,
  ).href;
  const thread = new Worker(
    `
    const { parentPort } = require('node:worker_threads');
    globalThis.postMessage = data => parentPort.postMessage(data);
    import(${JSON.stringify(moduleUrl)}).then(() => {
      parentPort.on('message', data => globalThis.onmessage({ data }));
    });
  `,
    { eval: true },
  );
  const bridge: ParserWorker = {
    onmessage: null,
    onerror: null,
    onmessageerror: null,
    postMessage: (data) => thread.postMessage(data),
    terminate: () => {
      void thread.terminate();
    },
  };
  thread.on('message', (data) =>
    bridge.onmessage?.({ data } as MessageEvent<ParseResponse>),
  );
  thread.on('error', (error) =>
    bridge.onerror?.({ message: error.message } as ErrorEvent),
  );
  return bridge;
};

test('Worker returns the same Java/AIDL model as direct parsing, including concurrent calls', async () => {
  const parser = createWorkerParser(threadWorker);
  try {
    const java =
      'package sample; public class Example { public int count; public void run(String name) {} }';
    const aidl =
      'package sample; interface IExample { @nullable String run(in int[] ids); }';
    const results = await Promise.all([
      parser.parseSource('java', java),
      parser.parseSource('aidl', aidl),
    ]);
    assert.deepEqual(results, [
      await parseSource('java', java),
      await parseSource('aidl', aidl),
    ]);
    await assert.rejects(
      parser.parseSource('aidl', 'interface Broken { void run( ; }'),
      { name: 'SyntaxError', message: /^AIDL \d+:\d+:/ },
    );
    assert.deepEqual(await parser.parseSource('aidl', aidl), results[1]);
  } finally {
    parser.dispose();
  }
});

test('Worker initializes Java for batched constant comparisons without a prior Java parse', async () => {
  const parser = createWorkerParser(threadWorker);
  try {
    const sources = [
      '1 << 4',
      '1 /* note */ << 4',
      '16',
      'call()',
      '"a b"',
      '1++',
    ];
    assert.deepEqual(
      await parser.constantExpressionKeys(sources),
      await getJavaConstantExpressionKeys(sources),
    );
  } finally {
    parser.dispose();
  }
});

test('Web generation batches constant comparisons in the Worker and matches direct CLI generation', async () => {
  const parser = createWorkerParser(threadWorker);
  const { runtime, contents } = movedFixture();
  for (const key of contents.keys())
    contents.set(
      key,
      'package android.net; interface IConnectivityManager { const int FLAG = (1 << 4); }',
    );
  runtime.parseSource = parser.parseSource;
  const batches: string[][] = [];
  runtime.constantExpressionKeys = (sources) => {
    batches.push(sources);
    return parser.constantExpressionKeys(sources);
  };
  try {
    const options = {
      input: {
        mode: 'name' as const,
        text: 'android.net.IConnectivityManager.FLAG',
      },
    };
    const web = await generateAndroidApiCode(runtime, options);
    const cli = await generateAndroidApiCode(
      { ...runtime, constantExpressionKeys: undefined },
      options,
    );
    assert.deepEqual(web, cli);
    assert.deepEqual(batches, [['(1 << 4)']]);
    assert.match(web.code, /FLAG = \(1 << 4\)/);
  } finally {
    parser.dispose();
  }
});

test('large Java parsing runs off the calling thread', async () => {
  const parser = createWorkerParser(threadWorker);
  let ticks = 0;
  try {
    // Warm the actual worker so the measured wait does not just cover startup.
    await parser.parseSource('java', 'class Warmup {}');
    const source = `public class Large { ${Array.from({ length: 5000 }, (_, i) => `public int method${i}(int value) { return value + ${i}; }`).join('\n')} }`;
    const timer = setInterval(() => {
      ticks++;
    }, 1);
    try {
      const file = await parser.parseSource('java', source);
      assert.equal(
        file.structs[0]!.members.filter((member) => member.kind === 'method')
          .length,
        5000,
      );
      assert.ok(
        ticks > 0,
        'calling thread must continue processing timers during parsing',
      );
    } finally {
      clearInterval(timer);
    }
  } finally {
    parser.dispose();
  }
});

test('runtime adapter preserves content deduplication and cache hits across repository moves', async () => {
  const parser = createWorkerParser(threadWorker);
  const { runtime } = movedFixture();
  let calls = 0;
  runtime.parseSource = (language, text) => {
    calls++;
    return parser.parseSource(language, text);
  };
  try {
    const [oldFile, newFile] = await Promise.all([
      loadParsedSource(runtime, { repo: base, path: oldPath }, t11),
      loadParsedSource(runtime, { repo: connectivity, path: newPath }, t12),
    ]);
    assert.equal(calls, 1);
    assert.strictEqual(oldFile, newFile);
    assert.deepEqual(
      await loadParsedSource(runtime, { repo: base, path: oldPath }, t11),
      oldFile,
    );
    assert.equal(calls, 1);
  } finally {
    parser.dispose();
  }
});

test('worker failures reject outstanding requests and a later request can create a new worker', async () => {
  const workers: ParserWorker[] = [];
  const messages: ParseRequest[] = [];
  const parser = createWorkerParser(() => {
    const worker: ParserWorker = {
      onmessage: null,
      onerror: null,
      onmessageerror: null,
      postMessage: (request) => {
        messages.push(request);
      },
      terminate() {},
    };
    workers.push(worker);
    return worker;
  });
  assert.equal(workers.length, 0);
  const first = parser.parseSource('java', 'class A {}');
  const second = parser.parseSource('aidl', 'interface B {}');
  const rejected = Promise.all([
    assert.rejects(first, /worker failed/),
    assert.rejects(second, /worker failed/),
  ]);
  workers[0]!.onerror!({ message: 'worker failed' } as ErrorEvent);
  await rejected;
  const third = parser.parseSource('java', 'class C {}');
  assert.equal(workers.length, 2);
  const file = await parseSource('java', 'class C {}');
  workers[1]!.onmessage!({
    data: { id: messages[2]!.id, file },
  } as MessageEvent<ParseResponse>);
  assert.deepEqual(await third, file);
  parser.dispose();
});
