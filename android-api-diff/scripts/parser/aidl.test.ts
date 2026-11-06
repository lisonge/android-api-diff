import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseAIDLFile } from '../../src/core/parser/aidl/index.ts';

test('interfaces preserve overloads, annotations, directions, IDs and nested generics', () => {
  const file = parseAIDLFile(`package sample;
import other.Payload;
@Descriptor(value="sample.IService") oneway interface IService {
  @nullable Payload load(in @nullable Payload key, out int[] values) = 7;
  void load(in List<List<Payload>> values);
  @EnforcePermission("ACCESS_NETWORK_STATE") oneway void notify(in Map<String,List<Payload>> values);
  const int SHIFT = (1 << 4) >> 1;
}`);
  assert.equal(file.package, 'sample');
  assert.deepEqual(file.imports, ['other.Payload']);
  const service = file.structs[0]!;
  assert.equal(service.isInterface, true);
  assert.deepEqual(
    service.members.map((member) => member.name),
    ['load', 'load', 'notify', 'SHIFT'],
  );
  const method = service.members[0]!;
  assert.equal(method.kind, 'method');
  if (method.kind !== 'method') throw new Error('Expected method');
  assert.equal(method.loc, 4);
  assert.equal(method.returnNullability, 'nullable');
  assert.deepEqual(method.parameters, [
    { name: 'key', type: 'Payload', nullability: 'nullable' },
    { name: 'values', type: 'int[]' },
  ]);
  assert.equal(service.members[1]!.type, '(List<List<Payload>>) -> void');
  assert.equal(service.members[2]!.type, '(Map<String,List<Payload>>) -> void');
});

test('parcelables and unions extract fields, constants and nested types without leaking members', () => {
  const file = parseAIDLFile(`package sample;
parcelable Container<T> {
  const @utf8InCpp String LABEL = "hello";
  int[2][3] matrix = {{1,2,3}, {4,5,6}};
  @nullable T value;
  union Choice { int number; String text; const int KIND = 1; }
  @Backing(type="long") enum Status { FIRST, SECOND = 4L, THIRD, }
  interface Callback { void done(); }
  int after;
}`);
  const container = file.structs[0]!;
  assert.deepEqual(
    container.members.map((member) => member.name),
    ['LABEL', 'matrix', 'value', 'after'],
  );
  assert.equal(container.members[0]!.kind, 'constant');
  assert.equal(container.members[1]!.type, 'int[][]');
  assert.deepEqual(
    container.children!.map((child) => child.name),
    ['Choice', 'Status', 'Callback'],
  );
  assert.deepEqual(
    container.children![0]!.members.map((member) => member.kind),
    ['field', 'field', 'constant'],
  );
  assert.deepEqual(
    container.children![1]!.members.map((member) =>
      member.kind === 'constant' ? [member.type, member.initializer] : null,
    ),
    [
      ['long', '0'],
      ['long', '4L'],
      ['long', 'SECOND + 1'],
    ],
  );
});

test('unstructured declarations, keyword identifiers, empty arrays and annotations', () => {
  const file =
    parseAIDLFile(`parcelable outer.Value<T> cpp_header "value.h" ndk_header "value_ndk.h" rust_type "crate::Value";
interface IForward;
@JavaDerive(equals=true, toString=true) parcelable Data {
  int[] empty = {};
  int cpp_header;
  @nullable(heap=true) String value;
  @SuppressWarnings(value={"a", "b"}) String description;
}`);
  assert.deepEqual(
    file.structs.map((struct) => struct.name),
    ['Value', 'IForward', 'Data'],
  );
  assert.equal(file.structs[2]!.members.length, 4);
});

test('numeric suffixes, byte literals and expression precedence remain usable in Java output', () => {
  const file = parseAIDLFile(`interface Constants {
    const long LIMIT = 0x7fffffffffffffffL;
    const byte NEGATIVE = 0xffu8;
    const float FRACTION = 1.5e-2f;
    const String TEXT = "0xffu8";
    const boolean CHECK = (1 + 2 * 3 == 7) && !false;
  }`);
  assert.deepEqual(
    file.structs[0]!.members.map(
      (member) => member.kind === 'constant' && member.initializer,
    ),
    [
      '0x7fffffffffffffffL',
      '(-1)',
      '1.5e-2f',
      '"0xffu8"',
      '(1 + 2 * 3 == 7) && !false',
    ],
  );
});

for (const source of [
  'interface Broken { void call( ; }',
  'parcelable Broken { int value }',
  'interface Broken { void call(); } $',
  'interface Broken { /* unterminated',
  'interface Broken { const String VALUE = "unterminated; }',
  'interface Broken { void call(in out int value); }',
  'interface Broken { void call() throws Exception; }',
  'interface Broken extends Other {}',
  'parcelable Broken { int a, b; }',
]) {
  test(`rejects malformed or Java-only syntax: ${source}`, () => {
    assert.throws(
      () => parseAIDLFile(source),
      (error: unknown) =>
        error instanceof SyntaxError && /^AIDL \d+:\d+:/.test(error.message),
    );
  });
}

const fixtures = JSON.parse(
  readFileSync(new URL('./fixtures/aidl.json', import.meta.url), 'utf8'),
) as { source: string; expected: unknown }[];
for (const [index, fixture] of fixtures.entries()) {
  test(`AIDL complete API regression ${index}`, () => {
    assert.deepEqual(parseAIDLFile(fixture.source), fixture.expected);
  });
}
test('AIDL source anchors retain identifier lines and parenthesized constants', () => {
  const file = parseAIDLFile(`// 😀
interface
  Service {
 const int
   VALUE = (1 /* kept */ + 2) * 3;
 const byte BYTE = 0xffu8 + 1u8;
 @nullable String
   call(in String value);
}`);
  assert.equal(file.structs[0]!.loc, 3);
  const members = file.structs[0]!.members;
  assert.equal(members[0]!.loc, 5);
  assert.equal(members[2]!.loc, 8);
  assert.equal(
    members[0]!.kind === 'constant' && members[0]!.initializer,
    '(1 /* kept */ + 2) * 3',
  );
  assert.equal(
    members[1]!.kind === 'constant' && members[1]!.initializer,
    '(-1) + (1)',
  );
});

test('AST locations disambiguate method names and preserve CR line numbers', () => {
  const file = parseAIDLFile(
    '// 😀 中文\rinterface I {\r String\r String();\r}',
  );
  assert.equal(file.structs[0].loc, 2);
  assert.equal(file.structs[0].members[0].loc, 4);
});

test('literal range replacement preserves strings, comments and parentheses', () => {
  const file = parseAIDLFile(
    'interface I { const byte X = ((0xf_fu8 /* 0xffu8 */ + 1u8)); const String S = "0xffu8; , ( ) /* */"; }',
  );
  assert.equal(
    file.structs[0].members[0].kind === 'constant' &&
      file.structs[0].members[0].initializer,
    '(((-1) /* 0xffu8 */ + (1)))',
  );
  assert.equal(
    file.structs[0].members[1].kind === 'constant' &&
      file.structs[0].members[1].initializer,
    '"0xffu8; , ( ) /* */"',
  );
});

test('qualified forward names do not synthesize explicit package declarations', () => {
  assert.equal(parseAIDLFile('parcelable outer.Value;').package, '');
  assert.equal(
    parseAIDLFile('package outer; parcelable Value;').package,
    'outer',
  );
});
