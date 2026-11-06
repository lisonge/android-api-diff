import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseJavaFile } from '../../src/core/parser/java/index.ts';
import type { ApiFile } from '../../src/core/model/types.ts';

const fixtures: { name: string; source: string; expected: ApiFile }[] =
  JSON.parse(
    await readFile(new URL('./fixtures/java.json', import.meta.url), 'utf8'),
  );
for (const fixture of fixtures) {
  test(`Java complete API regression: ${fixture.name}`, async () => {
    assert.deepEqual(await parseJavaFile(fixture.source), fixture.expected);
  });
}
test('Java rejects malformed input instead of returning partial APIs', async () => {
  await assert.rejects(
    parseJavaFile('class Broken { int valid; void broken( ; }'),
    /^SyntaxError: Java \d+:\d+:/,
  );
});

test('Java preserves every field and normalizes declaration dimensions and varargs', async () => {
  const file = await parseJavaFile(`class Example {
    int first, second[], third[][];
    int[] fourth[];
    void call(String... args) {}
    void call(String arg) {}
    void arrays(int value[], String[] values[]) {}
    int result()[][] { return null; }
    void receiver(Example this, int value) {}
  }`);
  const members = file.structs[0]!.members;
  assert.deepEqual(
    members.map((m) => [m.name, m.type]),
    [
      ['first', 'int'],
      ['second', 'int[]'],
      ['third', 'int[][]'],
      ['fourth', 'int[][]'],
      ['call', '(String[]) -> void'],
      ['call', '(String) -> void'],
      ['arrays', '(int[], String[][]) -> void'],
      ['result', '() -> int[][]'],
      ['receiver', '(int) -> void'],
    ],
  );
  assert.equal(
    members[1]!.kind === 'field' && members[1]!.fieldNullability,
    undefined,
  );
});

test('Java keeps enum members in their own type and excludes anonymous and unsupported bodies', async () => {
  const file = await parseJavaFile(`class Outer {
    enum Kind { A { void special() {} }; int code; void run() {} class Nested { int own; } }
    Runnable task = new Runnable() { public void run() {} int anonymous; };
    @interface Marker { int VALUE = 1; }
    record Record(int value) { void recordMethod() {} }
    int after;
  }
  enum Top { VALUE; int topField; }
  class Last { int last; }`);
  assert.deepEqual(
    file.structs.map((s) => s.name),
    ['Outer', 'Top', 'Last'],
  );
  const outer = file.structs[0]!;
  assert.deepEqual(
    outer.members.map((m) => m.name),
    ['task', 'after'],
  );
  assert.deepEqual(
    outer.children!.map((s) => s.name),
    ['Kind'],
  );
  assert.deepEqual(
    outer.children![0]!.members.map((m) => m.name),
    ['code', 'run'],
  );
  assert.deepEqual(
    outer.children![0]!.children![0]!.members.map((m) => m.name),
    ['own'],
  );
  assert.deepEqual(
    file.structs[1]!.members.map((m) => m.name),
    ['topField'],
  );
});
