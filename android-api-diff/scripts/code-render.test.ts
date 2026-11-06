import { toAndroidApiMemberResult } from '../src/core/model/struct.ts';
import { strict as assert } from 'node:assert';
import { parseJavaFile, parseAIDLFile } from '../src/core/parser/index.ts';
import {
  renderAndroidApiCode,
  renderAndroidApiCodeWithMemberCode,
} from '../src/core/generation/render.ts';
import {
  normalizeAndroidApiMemberRanges,
  type AndroidApiMemberVersionRangeInput,
} from '../src/core/query.ts';
import type {
  AndroidApiMemberResult,
  AndroidApiQueryResult,
  AndroidApiResolvedType,
} from '../src/core/model/types.ts';

interface AndroidApiMemberVersionRange extends AndroidApiMemberVersionRangeInput {
  members: AndroidApiMemberResult[];
}

const field = (
  fieldNullability?: Extract<
    AndroidApiMemberResult,
    { kind: 'field' }
  >['fieldNullability'],
): AndroidApiMemberResult => ({
  kind: 'field',
  name: 'name',
  type: 'String',
  imports: [],
  ...(fieldNullability ? { fieldNullability } : {}),
});

const constant = (type = 'int', name = 'FLAG'): AndroidApiMemberResult => ({
  kind: 'constant',
  name,
  type,
  imports: [],
});

const method = (
  type: string,
  parameters: Extract<AndroidApiMemberResult, { kind: 'method' }>['parameters'],
  name = 'getTasks',
  isAbstract = false,
): AndroidApiMemberResult => ({
  kind: 'method',
  name,
  type: `(${parameters.map((parameter) => parameter.type).join(', ')}) -> ${type}`,
  imports: [],
  ...(isAbstract ? { isAbstract: true } : {}),
  returnType: type,
  parameters,
});

const constructor = (
  name: string,
  parameters: Extract<
    AndroidApiMemberResult,
    { kind: 'constructor' }
  >['parameters'],
): AndroidApiMemberResult => ({
  kind: 'constructor',
  name,
  type: `(${parameters.map((parameter) => parameter.type).join(', ')}) -> ${name}`,
  imports: [],
  parameters,
});

const range = (
  version: string,
  alias: string,
  apiVersion: number,
  tag: string,
  members: AndroidApiMemberResult[],
  missingReason?: AndroidApiMemberVersionRangeInput['missingReason'],
): AndroidApiMemberVersionRange => ({
  fromVersion: version,
  fromAlias: alias,
  fromApiVersion: apiVersion,
  fromTag: tag,
  toVersion: version,
  toAlias: alias,
  toApiVersion: apiVersion,
  toTag: tag,
  ...(missingReason ? { missingReason } : {}),
  members,
});

const rangeSpan = (
  fromVersion: string,
  fromAlias: string,
  fromApiVersion: number,
  fromTag: string,
  toVersion: string,
  toAlias: string,
  toApiVersion: number,
  toTag: string,
  members: AndroidApiMemberResult[],
  missingReason?: AndroidApiMemberVersionRangeInput['missingReason'],
): AndroidApiMemberVersionRange => ({
  fromVersion,
  fromAlias,
  fromApiVersion,
  fromTag,
  toVersion,
  toAlias,
  toApiVersion,
  toTag,
  ...(missingReason ? { missingReason } : {}),
  members,
});

const baseResult = (
  apiName: string,
  sourcePath: string,
  targetPaths: string[],
  memberRanges: AndroidApiMemberVersionRange[],
  typePath?: AndroidApiResolvedType[],
  imports: string[] = [],
): AndroidApiQueryResult => {
  const { ranges, overloads } = normalizeAndroidApiMemberRanges(memberRanges);
  return {
    apiName,
    tags: [],
    normalizedApiName: apiName,
    candidates: [],
    package: '',
    imports,
    selection: {
      repo: 'platform/frameworks/base',
      path: sourcePath,
      url: `https://github.com/msft-mirror-aosp/platform.frameworks.base/blob/:tag/${sourcePath}`,
    },
    resolvedTarget: {
      kind: 'member',
      paths: targetPaths,
      ...(typePath ? { typePath } : {}),
    },
    summary: {
      checkedTags: ranges.length,
      foundTags: ranges.length,
      rangeCount: ranges.length,
      overloadCount: overloads.length,
    },
    ranges,
    overloads,
  };
};

{
  const result = await renderAndroidApiCode(
    baseResult(
      'android.database.ContentObserver()',
      'core/java/android/database/ContentObserver.java',
      ['ContentObserver', 'ContentObserver'],
      [
        range('15', 'VANILLA_ICE_CREAM', 35, 'android-15.0.0_r1', [
          constructor('ContentObserver', [
            { name: 'handler', type: 'Handler' },
          ]),
        ]),
      ],
    ),
  );

  assert.equal('memberCode' in result, false);
  assert.match(result.code, /^package android\.database;/);
  assert.match(result.code, /public class ContentObserver \{/);
  assert.match(
    result.code,
    /public ContentObserver\(Handler handler\) \{\n        throw new RuntimeException\(\);\n    \}/,
  );
  assert.doesNotMatch(result.code, /class database/);
}

{
  const abstractMethod = method('String', [], 'getValue', true);
  const concreteMethod = method(
    'String',
    [{ name: 'flags', type: 'int' }],
    'getValue',
  );
  const result = await renderAndroidApiCode(
    baseResult(
      'AbstractService.getValue',
      'core/java/android/app/AbstractService.java',
      ['AbstractService', 'getValue'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [
          abstractMethod,
          concreteMethod,
        ]),
      ],
      [
        {
          name: 'AbstractService',
          kind: 'class',
          isAbstract: true,
          isHidden: true,
        },
      ],
    ),
  );

  assert.match(result.code, /public abstract class AbstractService \{/);
  assert.match(result.code, /public abstract String getValue\(\);/);
  assert.doesNotMatch(
    result.code,
    /getValue\(\) \{\n        throw new RuntimeException\(\);\n    \}/,
  );
  assert.match(
    result.code,
    /public String getValue\(int flags\) \{\n        throw new RuntimeException\(\);\n    \}/,
  );
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'TaskManager.clear',
      'core/java/android/app/TaskManager.java',
      ['TaskManager', 'clear'],
      [range('8', 'O', 26, 'android-8.0.0_r1', [method('void', [], 'clear')])],
      [{ name: 'TaskManager', kind: 'class', isHidden: true }],
    ),
  );

  assert.match(result.code, /public void clear\(\) \{\n    \}/);
  assert.doesNotMatch(result.code, /clear\(\).*RuntimeException/);
}

{
  const result = await renderAndroidApiCodeWithMemberCode(
    baseResult(
      'Outer.Inner.setDisplayId',
      'core/java/android/example/Outer.java',
      ['Outer', 'Inner', 'setDisplayId'],
      [
        range('15', 'VANILLA_ICE_CREAM', 35, 'android-15.0.0_r1', [
          method('void', [{ name: 'displayId', type: 'int' }], 'setDisplayId'),
          method('int', [], 'getDisplayId'),
        ]),
      ],
      [
        { name: 'Outer', kind: 'class', isHidden: true },
        { name: 'Inner', kind: 'class', isHidden: true },
      ],
    ),
  );

  assert.match(
    result.code,
    /        public int getDisplayId\(\) \{\n            throw new RuntimeException\(\);\n        \}/,
  );
  assert.match(
    result.code,
    /        public void setDisplayId\(int displayId\) \{\n        \}/,
  );
  assert.match(
    result.memberCode,
    /^        public int getDisplayId\(\) \{\n            throw new RuntimeException\(\);\n        \}/,
  );
}

{
  const transact: AndroidApiMemberResult = {
    kind: 'method',
    name: 'transact',
    type: '(int, HwParcel, HwParcel, int) -> void',
    imports: [],
    returnType: 'void',
    returnNullability: 'non-null',
    parameters: [
      { name: 'code', type: 'int', nullability: 'non-null' },
      { name: 'request', type: 'HwParcel' },
      { name: 'reply', type: 'HwParcel' },
      { name: 'flags', type: 'int', nullability: 'non-null' },
    ],
  };
  const result = await renderAndroidApiCode(
    baseResult(
      'IHwBinder.transact',
      'core/java/android/os/IHwBinder.java',
      ['IHwBinder', 'transact'],
      [range('8', 'O', 26, 'android-8.0.0_r1', [transact])],
      [{ name: 'IHwBinder', kind: 'interface', isHidden: true }],
    ),
  );

  assert.match(result.code, /public interface IHwBinder \{/);
  assert.match(
    result.code,
    /void transact\(int code, HwParcel request, HwParcel reply, int flags\);/,
  );
  assert.doesNotMatch(result.code, /android\.annotation\.NonNull/);
  assert.doesNotMatch(result.code, /@NonNull/);
  assert.doesNotMatch(result.code, /transact\(.*RuntimeException/);
}

{
  const staticField: AndroidApiMemberResult = {
    kind: 'field',
    name: 'STATE',
    type: 'int',
    imports: [],
    isStatic: true,
  };
  const result = await renderAndroidApiCodeWithMemberCode(
    baseResult(
      'IBinder.SHELL_COMMAND_TRANSACTION',
      'core/java/android/os/IBinder.java',
      ['IBinder', 'SHELL_COMMAND_TRANSACTION'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [
          constant('int', 'SHELL_COMMAND_TRANSACTION'),
          staticField,
        ]),
      ],
      [{ name: 'IBinder', kind: 'interface', isHidden: false }],
    ),
  );

  assert.match(result.code, /import li\.songe\.remap\.RemapStub;/);
  assert.match(result.code, /import li\.songe\.remap\.RemapType;/);
  assert.match(
    result.code,
    /@RemapType\(IBinder\.class\)\npublic interface IBinderHidden \{/,
  );
  assert.match(
    result.code,
    /\n    int SHELL_COMMAND_TRANSACTION = RemapStub\.value\(\);\n/,
  );
  assert.match(result.code, /\n    int STATE = RemapStub\.value\(\);\n/);
  assert.doesNotMatch(result.code, /\b(?:static|final)\s+int\b/);
  assert.equal(
    result.memberCode,
    [
      '    int SHELL_COMMAND_TRANSACTION = RemapStub.value();',
      '',
      '    int STATE = RemapStub.value();',
    ].join('\n'),
  );
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'UserInfo.name',
      'core/java/android/content/pm/UserInfo.java',
      ['UserInfo', 'name'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [field()]),
        range('13', 'TIRAMISU', 33, 'android-13.0.0_r1', [
          { ...field('nullable'), imports: [0] },
        ]),
      ],
      undefined,
      ['android.annotation.Nullable'],
    ),
  );

  assert.equal(result.declarations.length, 1);
  assert.equal(result.declarations[0]?.member.fieldNullability, 'nullable');
  assert.match(result.code, /^package android\.content\.pm;/);
  assert.doesNotMatch(result.code, /@RequiresApi\(Build\.VERSION_CODES\.O\)/);
  assert.doesNotMatch(result.code, /@DeprecatedSinceApi/);
  assert.match(result.code, /import android\.annotation\.Nullable;/);
  assert.match(result.code, /public @Nullable String name;/);
  assert.doesNotMatch(result.code, /li\.songe\.remap\.RemapType/);
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'UserInfo.name',
      'core/java/android/content/pm/UserInfo.java',
      ['UserInfo', 'name'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [
          { ...field('non-null'), imports: [0] },
        ]),
        range('13', 'TIRAMISU', 33, 'android-13.0.0_r1', [
          { ...field('non-null'), imports: [1] },
        ]),
      ],
      undefined,
      ['android.annotation.NonNull', 'android.annotation.RecentlyNonNull'],
    ),
  );

  assert.equal(result.declarations.length, 1);
  assert.equal(result.declarations[0]?.member.fieldNullability, 'non-null');
  assert.match(result.code, /public @NonNull String name;/);
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'UserInfo.name',
      'core/java/android/content/pm/UserInfo.java',
      ['UserInfo', 'name'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [
          { ...field('non-null'), imports: [0] },
        ]),
        range('13', 'TIRAMISU', 33, 'android-13.0.0_r1', [field()]),
      ],
      undefined,
      ['android.annotation.NonNull'],
    ),
  );

  assert.equal(result.declarations.length, 1);
  assert.equal(
    Object.hasOwn(result.declarations[0]?.member ?? {}, 'fieldNullability'),
    false,
  );
  assert.doesNotMatch(result.code, /android\.annotation\.(?:NonNull|Nullable)/);
  assert.match(result.code, /public String name;/);
}

{
  const firstMethod: AndroidApiMemberResult = {
    ...method(
      'String',
      [
        {
          name: 'nullableParam',
          type: 'String',
          nullability: 'non-null',
        },
        { name: 'mixedParam', type: 'String', nullability: 'non-null' },
        { name: 'nonNullParam', type: 'String', nullability: 'non-null' },
      ],
      'mergeNullability',
    ),
    imports: [0],
    returnNullability: 'non-null',
  };
  const secondMethod: AndroidApiMemberResult = {
    ...method(
      'String',
      [
        { name: 'nullableParam', type: 'String', nullability: 'nullable' },
        { name: 'mixedParam', type: 'String' },
        { name: 'nonNullParam', type: 'String', nullability: 'non-null' },
      ],
      'mergeNullability',
    ),
    imports: [0, 1],
    returnNullability: 'non-null',
  };
  const result = await renderAndroidApiCode(
    baseResult(
      'Example.mergeNullability',
      'core/java/android/example/Example.java',
      ['Example', 'mergeNullability'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [firstMethod]),
        range('13', 'TIRAMISU', 33, 'android-13.0.0_r1', [secondMethod]),
      ],
      undefined,
      ['android.annotation.NonNull', 'android.annotation.Nullable'],
    ),
  );

  assert.equal(result.declarations.length, 1);
  const member = result.declarations[0]?.member;
  assert.equal(member?.kind, 'method');
  if (member?.kind !== 'method') assert.fail('Expected a method declaration');
  assert.equal(member.returnNullability, 'non-null');
  assert.equal(member.parameters[0]?.nullability, 'nullable');
  assert.equal(Object.hasOwn(member.parameters[1] ?? {}, 'nullability'), false);
  assert.equal(member.parameters[2]?.nullability, 'non-null');
  assert.deepEqual(member.imports, []);
  assert.match(
    result.code,
    /public @NonNull String mergeNullability\(@Nullable String nullableParam, String mixedParam, @NonNull String nonNullParam\)/,
  );
}

{
  const persistentDeviceId: AndroidApiMemberResult = {
    kind: 'field',
    name: 'PERSISTENT_DEVICE_ID_DEFAULT',
    type: 'String',
    imports: [],
    isStatic: true,
  };
  const result = await renderAndroidApiCode(
    baseResult(
      'VirtualDeviceManager.PERSISTENT_DEVICE_ID_DEFAULT',
      'core/java/android/companion/virtual/VirtualDeviceManager.java',
      ['VirtualDeviceManager', 'PERSISTENT_DEVICE_ID_DEFAULT'],
      [
        range('14', 'UPSIDE_DOWN_CAKE', 34, 'android-14.0.0_r1', [
          persistentDeviceId,
        ]),
      ],
      [
        {
          name: 'VirtualDeviceManager',
          kind: 'class',
          isHidden: false,
        },
      ],
    ),
  );

  assert.match(result.code, /^package android\.companion\.virtual;/);
  assert.match(result.code, /import li\.songe\.remap\.RemapType;/);
  assert.match(
    result.code,
    /@RemapType\(VirtualDeviceManager\.class\)\npublic class VirtualDeviceManagerHidden \{/,
  );
  assert.match(
    result.code,
    /public static String PERSISTENT_DEVICE_ID_DEFAULT;/,
  );
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'ServiceManager.getServiceOrThrow',
      'core/java/android/os/ServiceManager.java',
      ['ServiceManager', 'getServiceOrThrow'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [
          method(
            'IBinder',
            [{ name: 'name', type: 'String' }],
            'getServiceOrThrow',
          ),
        ]),
      ],
      [{ name: 'ServiceManager', kind: 'class', isHidden: true }],
    ),
  );

  assert.doesNotMatch(result.code, /li\.songe\.remap\.RemapType/);
  assert.doesNotMatch(result.code, /@RemapType/);
  assert.match(result.code, /public class ServiceManager \{/);
  assert.doesNotMatch(result.code, /ServiceManagerHidden/);
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'UserInfoHidden.name',
      'core/java/android/content/pm/UserInfo.java',
      ['UserInfo', 'name'],
      [range('8', 'O', 26, 'android-8.0.0_r1', [field()])],
    ),
  );

  assert.equal(result.declarations.length, 1);
  assert.match(result.code, /^package android\.content\.pm;/);
  assert.match(result.code, /import li\.songe\.remap\.RemapType;/);
  assert.match(
    result.code,
    /@RemapType\(UserInfo\.class\)\npublic class UserInfoHidden \{/,
  );
  assert.doesNotMatch(result.code, /public class UserInfo \{/);
  assert.doesNotMatch(result.code, /UserInfoHiddenHidden/);
}

{
  const result = await renderAndroidApiCode(
    baseResult(
      'UserInfo.name',
      'core/java/android/content/pm/UserInfo.java',
      ['UserInfo', 'name'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [], 'api-not-found'),
        range('10', 'Q', 29, 'android-10.0.0_r1', [field()]),
      ],
    ),
  );

  assert.equal(result.declarations.length, 1);
  assert.match(result.code, /@RequiresApi\(Build\.VERSION_CODES\.Q\)/);
  assert.match(result.code, /public String name;/);
}

{
  const methodA = method(
    'ParceledListSlice<PackageInfo>',
    [
      { name: 'flags', type: 'long' },
      { name: 'userId', type: 'int' },
    ],
    'getInstalledPackages',
  );
  const methodB = method(
    'PackageInfoList',
    [
      { name: 'flags', type: 'long' },
      { name: 'userId', type: 'int' },
    ],
    'getInstalledPackages',
  );
  const result = await renderAndroidApiCode(
    baseResult(
      'IPackageManager.getInstalledPackages',
      'core/java/android/content/pm/IPackageManager.aidl',
      ['IPackageManager', 'getInstalledPackages'],
      [
        rangeSpan(
          '8',
          'O',
          26,
          'android-8.0.0_r1',
          '12.1',
          'S_V2',
          32,
          'android-12.1.0_r1',
          [],
          'api-not-found',
        ),
        rangeSpan(
          '13',
          'TIRAMISU',
          33,
          'android-13.0.0_r1',
          '16',
          'BAKLAVA',
          36,
          'android-16.0.0_r1',
          [methodA],
        ),
        range('17', 'CINNAMON_BUN', 37, 'android-17.0.0_r1', [methodB]),
      ],
    ),
  );

  assert.equal(result.declarations.length, 2);
  assert.equal(result.declarations[0]?.remapMethodName, 'getInstalledPackages');
  assert.equal(result.declarations[0]?.member.name, 'getInstalledPackagesV13');
  assert.equal(result.declarations[1]?.remapMethodName, undefined);
  assert.equal(result.declarations[1]?.member.name, 'getInstalledPackages');
  assert.match(
    result.code,
    /package android\.content\.pm;\n\nimport android\.os\.Binder;\nimport android\.os\.Build;\nimport android\.os\.IBinder;\nimport android\.os\.IInterface;\n\nimport androidx\.annotation\.DeprecatedSinceApi;\nimport androidx\.annotation\.RequiresApi;\n\nimport li\.songe\.remap\.RemapMethod;/,
  );
  assert.match(result.code, /import li\.songe\.remap\.RemapMethod;/);
  assert.doesNotMatch(result.code, /import android\.content\.pm\.PackageInfo;/);
  assert.doesNotMatch(
    result.code,
    /import android\.content\.pm\.ParceledListSlice;/,
  );
  assert.match(
    result.code,
    /@DeprecatedSinceApi\(api = Build\.VERSION_CODES\.CINNAMON_BUN\)\n\s+@RemapMethod\("getInstalledPackages"\)\n\s+ParceledListSlice<PackageInfo> getInstalledPackagesV13\(long flags, int userId\);/,
  );
  assert.match(
    result.code,
    /@RequiresApi\(Build\.VERSION_CODES\.CINNAMON_BUN\)\n\s+PackageInfoList getInstalledPackages\(long flags, int userId\);/,
  );
  assert.equal(
    (result.code.match(/getInstalledPackages\(long flags, int userId\)/g) ?? [])
      .length,
    1,
  );
}

{
  const methodA = method(
    'ParceledListSlice<PackageInfo>',
    [{ name: 'flags', type: 'int' }],
    'getInstalledPackages',
  );
  const methodB = method(
    'PackageInfoList',
    [
      { name: 'flags', type: 'long' },
      { name: 'userId', type: 'int' },
    ],
    'getInstalledPackages',
  );
  const result = await renderAndroidApiCode(
    baseResult(
      'IPackageManager.getInstalledPackages',
      'core/java/android/content/pm/IPackageManager.aidl',
      ['IPackageManager', 'getInstalledPackages'],
      [
        range('16', 'BAKLAVA', 36, 'android-16.0.0_r1', [methodA]),
        range('17', 'CINNAMON_BUN', 37, 'android-17.0.0_r1', [methodB]),
      ],
    ),
  );

  assert.equal(result.declarations.length, 2);
  assert.doesNotMatch(result.code, /@RemapMethod/);
  assert.doesNotMatch(result.code, /li\.songe\.remap\.RemapMethod/);
  assert.match(
    result.code,
    /ParceledListSlice<PackageInfo> getInstalledPackages\(int flags\);/,
  );
  assert.match(
    result.code,
    /PackageInfoList getInstalledPackages\(long flags, int userId\);/,
  );
}

{
  const methodA = method(
    'boolean',
    [
      { name: 'crop', type: 'Rect' },
      { name: 'listener', type: 'ScreenCaptureListener' },
      { name: 'displayId', type: 'int' },
    ],
    'takeScreenshot',
  );
  methodA.imports = [0, 1];
  const methodB = method(
    'boolean',
    [
      { name: 'crop', type: 'Rect' },
      { name: 'listener', type: 'ScreenCaptureListener' },
      { name: 'displayId', type: 'int' },
    ],
    'takeScreenshot',
  );
  methodB.imports = [0, 2];
  const result = await renderAndroidApiCode(
    baseResult(
      'IUiAutomationConnection.takeScreenshot',
      'core/java/android/app/IUiAutomationConnection.aidl',
      ['IUiAutomationConnection', 'takeScreenshot'],
      [
        range('15.0.0_r6', 'VANILLA_ICE_CREAM', 35, 'android-15.0.0_r6', [
          methodA,
        ]),
        range('16.0.0_r4', 'BAKLAVA', 36, 'android-16.0.0_r4', [methodB]),
      ],
      undefined,
      [
        'android.graphics.Rect',
        'android.window.ScreenCapture.ScreenCaptureListener',
        'android.window.ScreenCaptureInternal.ScreenCaptureListener',
      ],
    ),
  );

  assert.equal(result.declarations.length, 2);
  assert.doesNotMatch(result.code, /@RemapMethod/);
  assert.doesNotMatch(result.code, /li\.songe\.remap\.RemapMethod/);
  assert.match(result.code, /import android\.window\.ScreenCapture;/);
  assert.match(result.code, /import android\.window\.ScreenCaptureInternal;/);
  assert.doesNotMatch(
    result.code,
    /import android\.window\.ScreenCapture\.ScreenCaptureListener;/,
  );
  assert.doesNotMatch(
    result.code,
    /import android\.window\.ScreenCaptureInternal\.ScreenCaptureListener;/,
  );
  assert.match(
    result.code,
    /boolean takeScreenshot\(Rect crop, ScreenCapture\.ScreenCaptureListener listener, int displayId\);/,
  );
  assert.match(
    result.code,
    /boolean takeScreenshot\(Rect crop, ScreenCaptureInternal\.ScreenCaptureListener listener, int displayId\);/,
  );
}

{
  const methodA = method(
    'String',
    [{ name: 'callingPkg', type: 'String' }],
    'call',
  );
  const methodB = method(
    'String',
    [
      { name: 'callingPkg', type: 'String' },
      { name: 'authority', type: 'String' },
    ],
    'call',
  );
  const methodC = method(
    'String',
    [
      { name: 'callingPkg', type: 'String' },
      { name: 'attributionTag', type: 'String' },
      { name: 'authority', type: 'String' },
    ],
    'call',
  );
  const methodD = method(
    'String',
    [
      { name: 'attributionSource', type: 'String' },
      { name: 'authority', type: 'String' },
      { name: 'method', type: 'String' },
      { name: 'arg', type: 'String' },
    ],
    'call',
  );
  const result = await renderAndroidApiCodeWithMemberCode(
    baseResult(
      'IContentProvider.call',
      'core/java/android/content/IContentProvider.java',
      ['IContentProvider', 'call'],
      [
        {
          ...range('8', 'O', 26, 'android-8.0.0_r1', [methodA]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
        {
          ...range('10', 'Q', 29, 'android-10.0.0_r1', [methodA, methodB]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
        {
          ...range('11', 'R', 30, 'android-11.0.0_r1', [methodA, methodC]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
        {
          ...range('12', 'S', 31, 'android-12.0.0_r1', [methodA, methodD]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
      ],
      [{ name: 'IContentProvider', kind: 'interface', isHidden: true }],
    ),
  );

  assert.match(result.code, /import android\.os\.Build;/);
  assert.match(result.code, /import androidx\.annotation\.DeprecatedSinceApi;/);
  assert.match(result.code, /import androidx\.annotation\.RequiresApi;/);
  assert.doesNotMatch(result.code, /^\s*\/\/ /m);
  assert.match(
    result.code,
    /@RequiresApi\(Build\.VERSION_CODES\.Q\)\n\s+@DeprecatedSinceApi\(api = Build\.VERSION_CODES\.R\)\n\s+String call\(String callingPkg, String authority\);/,
  );
  assert.match(
    result.memberCode,
    /    @RequiresApi\(Build\.VERSION_CODES\.Q\)\n    @DeprecatedSinceApi\(api = Build\.VERSION_CODES\.R\)\n    String call\(String callingPkg, String authority\);/,
  );
  assert.doesNotMatch(result.memberCode, /^(package|import|public interface)/m);
  assert.match(
    result.code,
    /@RequiresApi\(Build\.VERSION_CODES\.R\)\n\s+@DeprecatedSinceApi\(api = Build\.VERSION_CODES\.S\)\n\s+String call\(String callingPkg, String attributionTag, String authority\);/,
  );
  assert.match(
    result.code,
    /@RequiresApi\(Build\.VERSION_CODES\.S\)\n\s+String call\(String attributionSource, String authority, String method, String arg\);/,
  );
}

{
  const methodA = method(
    'List<UserInfo>',
    [{ name: 'excludeDying', type: 'boolean' }],
    'getUsers',
  );
  const methodB = method(
    'List<UserInfo>',
    [
      { name: 'excludePartial', type: 'boolean' },
      { name: 'excludeDying', type: 'boolean' },
      { name: 'excludePreCreated', type: 'boolean' },
    ],
    'getUsers',
  );
  methodA.imports = [0];
  methodB.imports = [0];
  const result = await renderAndroidApiCode(
    baseResult(
      'IUserManager.getUsers',
      'core/java/android/os/IUserManager.aidl',
      ['IUserManager', 'getUsers'],
      [
        range('8', 'O', 26, 'android-8.0.0_r1', [methodA]),
        range('8', 'O', 26, 'android-8.0.0_r2', [methodA]),
        range('8', 'O', 26, 'android-8.0.0_r3', [methodA]),
        range('8', 'O', 26, 'android-8.0.0_r4', [methodA]),
        rangeSpan(
          '8',
          'O',
          26,
          'android-8.0.0_r7',
          '10',
          'Q',
          29,
          'android-10.0.0_r29',
          [methodA],
        ),
        rangeSpan(
          '10',
          'Q',
          29,
          'android-10.0.0_r30',
          '10',
          'Q',
          29,
          'android-10.0.0_r45',
          [],
          'api-not-found',
        ),
        rangeSpan(
          '10',
          'Q',
          29,
          'android-10.0.0_r46',
          '10',
          'Q',
          29,
          'android-10.0.0_r52',
          [methodA],
        ),
        rangeSpan(
          '11',
          'R',
          30,
          'android-11.0.0_r1',
          '16',
          'BAKLAVA',
          36,
          'android-16.0.0_r2',
          [methodB],
        ),
        rangeSpan(
          '16',
          'BAKLAVA',
          36,
          'android-16.0.0_r3',
          '17',
          'CINNAMON_BUN',
          37,
          'android-17.0.0_r1',
          [methodA],
        ),
      ],
      undefined,
      ['android.content.pm.UserInfo'],
    ),
  );

  assert.equal(result.declarations.length, 2);
  assert.doesNotMatch(result.code, /androidx\.annotation\.RequiresApi/);
  assert.doesNotMatch(result.code, /androidx\.annotation\.DeprecatedSinceApi/);
  assert.match(result.code, /import android\.content\.pm\.UserInfo;/);
  assert.match(
    result.code,
    /\/\/ 8 - 10\.0\.0_r29, 10\.0\.0_r46 - 10, 16\.0\.0_r3 - 17\n\s+List<UserInfo> getUsers\(boolean excludeDying\);/,
  );
  assert.doesNotMatch(
    result.code,
    /8\.0\.0_r1, 8\.0\.0_r2, 8\.0\.0_r3, 8\.0\.0_r4/,
  );
  assert.match(
    result.code,
    /\/\/ 11 - 16\.0\.0_r2\n\s+List<UserInfo> getUsers\(boolean excludePartial, boolean excludeDying, boolean excludePreCreated\);/,
  );
  assert.equal(
    (result.code.match(/getUsers\(boolean excludeDying\)/g) ?? []).length,
    1,
  );
}

{
  const legacyMethod = method(
    'void',
    [
      { name: 'packageName', type: 'String' },
      { name: 'permissionName', type: 'String' },
      { name: 'userId', type: 'int' },
      { name: 'reason', type: 'String' },
    ],
    'revokeRuntimePermission',
  );
  const deviceIdMethod = method(
    'void',
    [
      { name: 'packageName', type: 'String' },
      { name: 'permissionName', type: 'String' },
      { name: 'deviceId', type: 'int' },
      { name: 'userId', type: 'int' },
      { name: 'reason', type: 'String' },
    ],
    'revokeRuntimePermission',
  );
  const persistentDeviceIdMethod = method(
    'void',
    [
      { name: 'packageName', type: 'String' },
      { name: 'permissionName', type: 'String' },
      { name: 'persistentDeviceId', type: 'String' },
      { name: 'userId', type: 'int' },
      { name: 'reason', type: 'String' },
    ],
    'revokeRuntimePermission',
  );
  const result = await renderAndroidApiCode(
    baseResult(
      'IPermissionManager.revokeRuntimePermission',
      'core/java/android/permission/IPermissionManager.aidl',
      ['IPermissionManager', 'revokeRuntimePermission'],
      [
        {
          ...rangeSpan(
            '11',
            'R',
            30,
            'android-11.0.0_r1',
            '14',
            'UPSIDE_DOWN_CAKE',
            34,
            'android-14.0.0_r28',
            [legacyMethod],
          ),
          fromTagPosition: 'first-checked' as const,
        },
        rangeSpan(
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r29',
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r37',
          [deviceIdMethod],
        ),
        rangeSpan(
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r38',
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r45',
          [legacyMethod],
        ),
        rangeSpan(
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r46',
          '14',
          'UPSIDE_DOWN_CAKE',
          34,
          'android-14.0.0_r49',
          [],
          'source-file-not-found',
        ),
        {
          ...rangeSpan(
            '14',
            'UPSIDE_DOWN_CAKE',
            34,
            'android-14.0.0_r50',
            '17',
            'CINNAMON_BUN',
            37,
            'android-17.0.0_r1',
            [persistentDeviceIdMethod],
          ),
          toTagPosition: 'last-checked' as const,
        },
      ],
    ),
  );

  assert.equal(result.declarations.length, 3);
  assert.doesNotMatch(result.code, /@RequiresApi/);
  assert.doesNotMatch(result.code, /@DeprecatedSinceApi/);
  assert.doesNotMatch(result.code, /androidx\.annotation\.RequiresApi/);
  assert.doesNotMatch(result.code, /import android\.os\.Build;/);
  assert.match(
    result.code,
    /\/\/ 11 - 14\.0\.0_r28, 14\.0\.0_r38 - 14\.0\.0_r45\n\s+void revokeRuntimePermission\(String packageName, String permissionName, int userId, String reason\);/,
  );
  assert.match(
    result.code,
    /\/\/ 14\.0\.0_r29 - 14\.0\.0_r37\n\s+void revokeRuntimePermission\(String packageName, String permissionName, int deviceId, int userId, String reason\);/,
  );
  assert.match(
    result.code,
    /\/\/ 14\.0\.0_r50 - 17\n\s+void revokeRuntimePermission\(String packageName, String permissionName, String persistentDeviceId, int userId, String reason\);/,
  );
}

{
  const methodA = method('List<ActivityManager.RunningTaskInfo>', [
    { name: 'maxNum', type: 'int' },
  ]);
  const methodB = method('List<ActivityManager.RunningTaskInfo>', [
    { name: 'maxNum', type: 'int' },
    { name: 'filterOnlyVisibleRecents', type: 'boolean' },
    { name: 'keepIntentExtra', type: 'boolean' },
  ]);
  const methodC = method('List<ActivityManager.RunningTaskInfo>', [
    { name: 'maxNum', type: 'int' },
    { name: 'filterOnlyVisibleRecents', type: 'boolean' },
    { name: 'keepIntentExtra', type: 'boolean' },
    { name: 'displayId', type: 'int' },
  ]);
  const result = await renderAndroidApiCodeWithMemberCode(
    baseResult(
      'IActivityTaskManager.getTasks',
      'core/java/android/app/IActivityTaskManager.aidl',
      ['IActivityTaskManager', 'getTasks'],
      [
        {
          ...range('10', 'Q', 29, 'android-10.0.0_r1', [methodA]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
        {
          ...range('12', 'S', 31, 'android-12.0.0_r1', [methodB]),
          fromTagPosition: 'first-checked',
          toTagPosition: 'last-checked',
        },
        {
          ...range('13', 'TIRAMISU', 33, 'android-13.0.0_r1', [methodC]),
          fromTagPosition: 'first-checked',
        },
        range('13', 'TIRAMISU', 33, 'android-13.0.0_r2', [methodC]),
        {
          ...range('13', 'TIRAMISU', 33, 'android-13.0.0_r3', [methodB]),
          toTagPosition: 'last-checked',
        },
      ],
    ),
  );

  assert.equal(result.declarations.length, 3);
  assert.match(result.code, /^package android\.app;/);
  assert.match(result.code, /import android\.os\.Binder;/);
  assert.match(result.code, /import android\.os\.IBinder;/);
  assert.match(result.code, /import android\.os\.IInterface;/);
  assert.match(result.code, /import java\.util\.List;/);
  assert.doesNotMatch(result.code, /androidx\.annotation\.RequiresApi/);
  assert.doesNotMatch(result.code, /androidx\.annotation\.DeprecatedSinceApi/);
  assert.doesNotMatch(result.code, /import android\.os\.Build;/);
  assert.match(
    result.code,
    /\/\/ 10\n\s+List<ActivityManager\.RunningTaskInfo> getTasks\(int maxNum\);/,
  );
  assert.match(
    result.code,
    /\/\/ 12, 13\.0\.0_r3\n\s+List<ActivityManager\.RunningTaskInfo> getTasks\(int maxNum, boolean filterOnlyVisibleRecents, boolean keepIntentExtra\);/,
  );
  assert.match(
    result.code,
    /\/\/ 13 - 13\.0\.0_r2\n\s+List<ActivityManager\.RunningTaskInfo> getTasks\(int maxNum, boolean filterOnlyVisibleRecents, boolean keepIntentExtra, int displayId\);/,
  );
  assert.match(
    result.memberCode,
    /^    \/\/ 10\n    List<ActivityManager\.RunningTaskInfo> getTasks\(int maxNum\);/,
  );
  assert.doesNotMatch(result.memberCode, /^(package|import|public interface)/m);
}

{
  const staticField: AndroidApiMemberResult = {
    kind: 'field',
    name: 'STATE',
    type: 'int',
    imports: [],
    isStatic: true,
  };
  const result = await renderAndroidApiCode(
    baseResult(
      'Example.FLAG',
      'core/java/android/example/Example.java',
      ['Example', 'FLAG'],
      [
        range('14', 'UPSIDE_DOWN_CAKE', 34, 'android-14.0.0_r1', [
          constant(),
          staticField,
        ]),
      ],
      [{ name: 'Example', kind: 'class', isHidden: true }],
    ),
  );
  assert.match(result.code, /public static int FLAG;/);
  assert.match(result.code, /public static int STATE;/);
  assert.doesNotMatch(result.code, /static final/);
  assert.doesNotMatch(result.code, /(FLAG|STATE)\s*=/);
}

{
  const useFoo = method('void', [{ name: 'value', type: 'A' }], 'useFoo');
  useFoo.imports = [0];
  const useBar = method('void', [{ name: 'value', type: 'A' }], 'useBar');
  useBar.imports = [1];
  const result = await renderAndroidApiCode(
    baseResult(
      'ImportConflict',
      'core/java/android/example/ImportConflict.java',
      ['ImportConflict'],
      [
        range('14', 'UPSIDE_DOWN_CAKE', 34, 'android-14.0.0_r1', [
          useFoo,
          useBar,
        ]),
      ],
      [{ name: 'ImportConflict', kind: 'class', isHidden: true }],
      ['foo.A', 'bar.A'],
    ),
  );
  assert.doesNotMatch(result.code, /import foo\.A;/);
  assert.doesNotMatch(result.code, /import bar\.A;/);
  assert.match(result.code, /useFoo\(foo\.A value\)/);
  assert.match(result.code, /useBar\(bar\.A value\)/);
}

{
  const useFoo = method('void', [{ name: 'value', type: 'Inner' }], 'useFoo');
  useFoo.imports = [0];
  const useBar = method('void', [{ name: 'value', type: 'Other' }], 'useBar');
  useBar.imports = [1];
  const result = await renderAndroidApiCode(
    baseResult(
      'NestedImportConflict',
      'core/java/android/example/NestedImportConflict.java',
      ['NestedImportConflict'],
      [
        range('14', 'UPSIDE_DOWN_CAKE', 34, 'android-14.0.0_r1', [
          useFoo,
          useBar,
        ]),
      ],
      [{ name: 'NestedImportConflict', kind: 'class', isHidden: true }],
      ['foo.Outer.Inner', 'bar.Outer.Other'],
    ),
  );
  assert.doesNotMatch(result.code, /import foo\.Outer;/);
  assert.doesNotMatch(result.code, /import bar\.Outer;/);
  assert.match(result.code, /useFoo\(foo\.Outer\.Inner value\)/);
  assert.match(result.code, /useBar\(bar\.Outer\.Other value\)/);
}

{
  const getValue = method('String', [], 'getValue');
  const internalAndroid13Range = rangeSpan(
    '13',
    'TIRAMISU',
    33,
    'android-13.0.0_r2',
    '13',
    'TIRAMISU',
    33,
    'android-13.0.0_r15',
    [getValue],
  );
  const android14MissingRange: AndroidApiMemberVersionRange = {
    ...range(
      '14',
      'UPSIDE_DOWN_CAKE',
      34,
      'android-14.0.0_r1',
      [],
      'api-not-found',
    ),
    fromTagPosition: 'first-checked',
    toTagPosition: 'last-checked',
  };
  const android15Range: AndroidApiMemberVersionRange = {
    ...range('15', 'VANILLA_ICE_CREAM', 35, 'android-15.0.0_r1', [getValue]),
    fromTagPosition: 'first-checked',
    toTagPosition: 'last-checked',
  };
  const result = await renderAndroidApiCode(
    baseResult(
      'Example.getValue',
      'core/java/android/app/Example.java',
      ['Example', 'getValue'],
      [internalAndroid13Range, android14MissingRange, android15Range],
    ),
  );

  assert.match(
    result.code,
    /\/\/ 13\.0\.0_r2 - 13\.0\.0_r15, 15\n\s+public String getValue\(\)/,
  );
  assert.doesNotMatch(result.code, /\/\/ 13, 15/);
}

// Parse the actual AOSP expression before exercising range normalization/rendering.
{
  const expression = "('_'<<24)|('C'<<16)|('M'<<8)|'D'";
  const parsed =
    await parseJavaFile(`package android.os; public interface IBinder {
    int SHELL_COMMAND_TRANSACTION = ${expression};
    int SECOND = 2, THIRD = 3;
    int ARRAY[] = {1};
  }`);
  const members = parsed.structs[0]!.members.map(toAndroidApiMemberResult);
  assert.equal(members.length, 4);
  assert.equal(members[3]!.type, 'int[]');
  const shell = members[0]!;
  const render = async (definitions: AndroidApiMemberResult[]) =>
    await renderAndroidApiCodeWithMemberCode(
      baseResult(
        'IBinder.SHELL_COMMAND_TRANSACTION',
        'core/java/android/os/IBinder.java',
        ['IBinder', 'SHELL_COMMAND_TRANSACTION'],
        definitions.map((member, index) =>
          range(
            String(8 + index),
            '',
            26 + index,
            `android-${8 + index}.0.0_r1`,
            [member],
          ),
        ),
        [{ name: 'IBinder', kind: 'interface', isHidden: false }],
      ),
    );
  const stable = await render([shell, { ...shell }]);
  assert.equal(
    stable.memberCode,
    `    int SHELL_COMMAND_TRANSACTION = ${expression};`,
  );
  assert.doesNotMatch(stable.code, /RemapStub/);
  const formattedExpression =
    "('_' << 24) /* command */ | ('C' << 16) |\n('M' << 8) | 'D'";
  const formatted = await render([
    shell,
    { ...shell, initializer: formattedExpression } as AndroidApiMemberResult,
  ]);
  assert.doesNotMatch(formatted.code, /RemapStub/);
  assert.ok(formatted.code.includes(`= ${formattedExpression};`));
  for (const [left, right] of [
    ['16', '0x10'],
    ['16', '1 << 4'],
    ['20', '7'], // WindowManager.TRANSIT_KEYGUARD_GOING_AWAY
    ['0x1', '(1 << 0)'], // WindowManager transition flag spelling change
    ["' '", "'\\t'"],
    ['1 + +2', '1++ + 2'],
    ['1 - -2', '1-- - 2'],
    ['"a b" == "a b"', '"ab" == "ab"'],
  ]) {
    assert.match(
      (
        await render([
          { ...shell, initializer: left } as AndroidApiMemberResult,
          { ...shell, initializer: right } as AndroidApiMemberResult,
        ])
      ).code,
      /RemapStub.value/,
    );
  }
  assert.match(
    (
      await render([
        shell,
        { ...shell, initializer: '42' } as AndroidApiMemberResult,
      ])
    ).code,
    /RemapStub.value/,
  );
  assert.match(
    (await render([constant('int', shell.name), shell])).code,
    /RemapStub.value/,
  );
  for (const [type, initializer] of [
    ['boolean', 'true'],
    ['byte', '(byte) 0x7f'],
    ['short', '(short) 1'],
    ['char', "'A'"],
    ['int', '1 << 4'],
    ['long', '0xffL'],
    ['float', '1.5f'],
    ['double', '1e-3'],
  ]) {
    const member = { ...constant(type), initializer } as AndroidApiMemberResult;
    assert.doesNotMatch((await render([member])).code, /RemapStub/);
    assert.ok((await render([member])).code.includes(`= ${initializer};`));
  }
  for (const [type, initializer] of [
    ['String', '"value"'],
    ['Integer', '1'],
    ['int[]', '{1}'],
    ['int', 'getValue()'],
    ['int', 'OTHER_FLAG | 1'],
    ['int', ''],
  ]) {
    assert.match(
      (
        await render([
          { ...constant(type), initializer } as AndroidApiMemberResult,
        ])
      ).code,
      /RemapStub.value/,
    );
  }
  const aidl = await parseAIDLFile(
    'interface IExample { const int FLAG = (1 << 2); }',
  );
  assert.equal(
    (aidl.structs[0]!.members[0] as { initializer?: string }).initializer,
    '(1 << 2)',
  );
  const classResult = await renderAndroidApiCode(
    baseResult(
      'Example.FLAG',
      'core/java/android/os/Example.java',
      ['Example', 'FLAG'],
      [range('8', 'O', 26, 'android-8.0.0_r1', [shell])],
      [{ name: 'Example', kind: 'class', isHidden: true }],
    ),
  );
  assert.doesNotMatch(classResult.code, / = /);
}

console.log('code-render tests passed');
