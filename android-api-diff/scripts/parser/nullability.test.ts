import assert from 'node:assert/strict';
import { parseAIDLFile, parseJavaFile } from '../../src/core/parser/index.ts';

const findMember = <T extends { name: string }>(members: T[], name: string) => {
  const member = members.find((item) => item.name === name);
  assert.ok(member, `Expected member ${name}`);
  return member;
};

const javaFile = await parseJavaFile(`
import android.annotation.NonNull;
import android.annotation.Nullable;

public abstract class Example {
  @Nullable String maybeName;
  @android.annotation.NonNull String sureName;
  String unknownName;
  int count;

  /** @hide */
  @Deprecated
  public static String hiddenName;

  Example(@NonNull String name) {}

  /**
   * Loads a hidden value.
   *
   * @hide
   */
  @Deprecated
  String loadHiddenName() {
    return "";
  }

  @Nullable String findName(@Nullable String key, @NonNull Object token) {
    return null;
  }

  public @NonNull String strictName() {
    return "";
  }

  String inferName(String key) {
    return key;
  }

  abstract String loadName();

  void setName(@Nullable String name) {}
}

interface ExampleApi {
  @Nullable String findName(@NonNull String key);
}

/** @hide */
@Deprecated
class HiddenExample {}
`);
const javaStructs = javaFile.structs;
assert.equal(javaFile.package, '');
assert.deepEqual(javaFile.imports, [
  'android.annotation.NonNull',
  'android.annotation.Nullable',
]);

const javaExample = javaStructs.find((item) => item.name === 'Example');
assert.ok(javaExample);
assert.equal(Object.hasOwn(javaExample, 'isInterface'), false);
assert.equal(javaExample.isAbstract, true);
assert.equal(Object.hasOwn(javaExample, 'isHidden'), false);

const javaHiddenExample = javaStructs.find(
  (item) => item.name === 'HiddenExample',
);
assert.ok(javaHiddenExample);
assert.equal(javaHiddenExample.isHidden, true);

const maybeName = findMember(javaExample.members, 'maybeName');
assert.equal(maybeName.kind, 'field');
assert.equal(maybeName.fieldNullability, 'nullable');

const sureName = findMember(javaExample.members, 'sureName');
assert.equal(sureName.kind, 'field');
assert.equal(sureName.fieldNullability, 'non-null');

const unknownName = findMember(javaExample.members, 'unknownName');
assert.equal(unknownName.kind, 'field');
assert.equal(Object.hasOwn(unknownName, 'fieldNullability'), false);

const count = findMember(javaExample.members, 'count');
assert.equal(count.kind, 'field');
assert.equal(count.fieldNullability, 'non-null');

const hiddenName = findMember(javaExample.members, 'hiddenName');
assert.equal(Object.hasOwn(hiddenName, 'isHidden'), false);

const loadHiddenName = findMember(javaExample.members, 'loadHiddenName');
assert.equal(Object.hasOwn(loadHiddenName, 'isHidden'), false);

const constructor = findMember(javaExample.members, 'Example');
assert.equal(constructor.kind, 'constructor');
assert.equal(constructor.parameters[0]?.nullability, 'non-null');

const findName = findMember(javaExample.members, 'findName');
assert.equal(findName.kind, 'method');
assert.equal(findName.returnNullability, 'nullable');
assert.equal(findName.parameters[0]?.name, 'key');
assert.equal(findName.parameters[0]?.nullability, 'nullable');
assert.equal(findName.parameters[1]?.name, 'token');
assert.equal(findName.parameters[1]?.nullability, 'non-null');

const strictName = findMember(javaExample.members, 'strictName');
assert.equal(strictName.kind, 'method');
assert.equal(strictName.returnNullability, 'non-null');

const inferName = findMember(javaExample.members, 'inferName');
assert.equal(inferName.kind, 'method');
assert.equal(Object.hasOwn(inferName, 'returnNullability'), false);
assert.equal(Object.hasOwn(inferName.parameters[0]!, 'nullability'), false);
assert.equal(Object.hasOwn(inferName, 'isAbstract'), false);

const loadName = findMember(javaExample.members, 'loadName');
assert.equal(loadName.kind, 'method');
assert.equal(loadName.isAbstract, true);

const setName = findMember(javaExample.members, 'setName');
assert.equal(setName.kind, 'method');
assert.equal(setName.returnType, 'void');
assert.equal(setName.returnNullability, 'non-null');
assert.equal(setName.parameters[0]?.nullability, 'nullable');
assert.deepEqual(setName.imports, [1]);

const javaInterface = javaStructs.find((item) => item.name === 'ExampleApi');
assert.ok(javaInterface);
assert.equal(javaInterface.isInterface, true);
const interfaceFindName = findMember(javaInterface.members, 'findName');
assert.equal(interfaceFindName.kind, 'method');
assert.equal(interfaceFindName.returnNullability, 'nullable');
assert.equal(interfaceFindName.parameters[0]?.nullability, 'non-null');
assert.deepEqual(interfaceFindName.imports, [0, 1]);

const javaImportFile = await parseJavaFile(`
package sample.api;

import java.util.List;
import sample.model.A;
import sample.model.Unused;
import static sample.model.Container.Nested;
import sample.wildcard.*;

class ImportExample {
  public static final A DEFAULT = null;

  List<A> load(Nested nested, WildType value) {
    return null;
  }
}
`);
assert.equal(javaImportFile.package, 'sample.api');
assert.deepEqual(javaImportFile.imports, [
  'java.util.List',
  'sample.model.A',
  'static sample.model.Container.Nested',
  'sample.wildcard.*',
]);
const javaImportExample = javaImportFile.structs[0];
assert.ok(javaImportExample);
const load = findMember(javaImportExample.members, 'load');
assert.deepEqual(load.imports, [0, 1, 2, 3]);
const defaultValue = findMember(javaImportExample.members, 'DEFAULT');
assert.equal(defaultValue.kind, 'field');
assert.equal(defaultValue.isStatic, true);
assert.deepEqual(defaultValue.imports, [1]);

const aidlFile = await parseAIDLFile(`
package android.app;

interface IExample {
  @nullable String findName(@nullable String key, int count);
  String requiredName(String key);
  const String KIND = "kind";
}

parcelable ExampleParcelable {
  @nullable String maybeName;
  String sureName;
  int count;
}
`);
const aidlStructs = aidlFile.structs;
assert.equal(aidlFile.package, 'android.app');
assert.deepEqual(aidlFile.imports, []);

const aidlInterface = aidlStructs.find((item) => item.name === 'IExample');
assert.ok(aidlInterface);
assert.equal(aidlInterface.isInterface, true);
assert.equal(aidlInterface.isHidden, true);

const aidlFindName = findMember(aidlInterface.members, 'findName');
assert.equal(aidlFindName.kind, 'method');
assert.equal(aidlFindName.returnNullability, 'nullable');
assert.equal(aidlFindName.parameters[0]?.nullability, 'nullable');
assert.equal(Object.hasOwn(aidlFindName.parameters[1]!, 'nullability'), false);

const requiredName = findMember(aidlInterface.members, 'requiredName');
assert.equal(requiredName.kind, 'method');
assert.equal(Object.hasOwn(requiredName, 'returnNullability'), false);
assert.equal(Object.hasOwn(requiredName.parameters[0]!, 'nullability'), false);

const kind = findMember(aidlInterface.members, 'KIND');
assert.equal(kind.kind, 'constant');
assert.equal(Object.hasOwn(kind, 'fieldNullability'), false);

const aidlParcelable = aidlStructs.find(
  (item) => item.name === 'ExampleParcelable',
);
assert.ok(aidlParcelable);
assert.equal(Object.hasOwn(aidlParcelable, 'isInterface'), false);
assert.equal(aidlParcelable.isHidden, true);

const aidlMaybeName = findMember(aidlParcelable.members, 'maybeName');
assert.equal(aidlMaybeName.kind, 'field');
assert.equal(aidlMaybeName.fieldNullability, 'nullable');

const aidlSureName = findMember(aidlParcelable.members, 'sureName');
assert.equal(aidlSureName.kind, 'field');
assert.equal(Object.hasOwn(aidlSureName, 'fieldNullability'), false);

const aidlCount = findMember(aidlParcelable.members, 'count');
assert.equal(aidlCount.kind, 'field');
assert.equal(Object.hasOwn(aidlCount, 'fieldNullability'), false);

const aidlImportFile = await parseAIDLFile(`
package sample.api;

import sample.model.A;
import sample.model.Unused;

interface IImportExample {
  List<A> load(A value);
}
`);
assert.equal(aidlImportFile.package, 'sample.api');
assert.deepEqual(aidlImportFile.imports, ['sample.model.A']);
const aidlImportExample = aidlImportFile.structs[0];
assert.ok(aidlImportExample);
const aidlLoad = findMember(aidlImportExample.members, 'load');
assert.deepEqual(aidlLoad.imports, [0]);

console.log('nullability parser tests passed');
