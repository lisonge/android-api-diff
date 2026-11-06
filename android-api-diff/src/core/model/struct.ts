import type {
  ClassMember,
  ClassStruct,
  AndroidApiMemberResult,
  AndroidApiResolvedType,
} from './types.ts';

export const toAndroidApiResolvedType = (
  struct: ClassStruct,
): AndroidApiResolvedType => {
  return {
    name: struct.name,
    kind: struct.isInterface ? 'interface' : 'class',
    ...(struct.isAbstract ? { isAbstract: true } : {}),
    isHidden: !!struct.isHidden,
  };
};

export const findStructByName = (
  list: ClassStruct[] | undefined,
  name: string,
): ClassStruct | undefined => {
  if (!list?.length) return;
  const v = list.find((v) => v.name === name);
  if (v) return v;
  for (const struct of list) {
    const v2 = findStructByName(struct.children, name);
    if (v2) return v2;
  }
};

export const findStructByPath = (
  list: ClassStruct[] | undefined,
  paths: string[],
): ClassStruct | undefined => {
  return findStructPathByPath(list, paths)?.at(-1);
};

export const findStructPathByPath = (
  list: ClassStruct[] | undefined,
  paths: string[],
): ClassStruct[] | undefined => {
  if (!list?.length || paths.length === 0) return;
  let currentList: ClassStruct[] | undefined = list;
  const result: ClassStruct[] = [];
  for (const name of paths) {
    const current: ClassStruct | undefined = currentList?.find(
      (v) => v.name === name,
    );
    if (!current) return;
    result.push(current);
    currentList = current.children;
  }
  return result;
};

const cloneParameters = (
  member: Extract<ClassMember, { parameters: unknown }>,
) => {
  return member.parameters.map((parameter) => ({ ...parameter }));
};

export const toAndroidApiMemberResult = (
  member: ClassMember,
): AndroidApiMemberResult => {
  if (member.kind === 'method') {
    return {
      kind: member.kind,
      name: member.name,
      type: member.type,
      imports: [...member.imports],
      ...(member.isAbstract ? { isAbstract: true } : {}),
      returnType: member.returnType,
      ...(member.returnNullability
        ? { returnNullability: member.returnNullability }
        : {}),
      parameters: cloneParameters(member),
    };
  }
  if (member.kind === 'constructor') {
    return {
      kind: member.kind,
      name: member.name,
      type: member.type,
      imports: [...member.imports],
      parameters: cloneParameters(member),
    };
  }
  return {
    kind: member.kind,
    name: member.name,
    type: member.type,
    imports: [...member.imports],
    ...(member.kind === 'constant' && member.initializer !== undefined
      ? { initializer: member.initializer }
      : {}),
    ...(member.isStatic ? { isStatic: true } : {}),
    ...(member.fieldNullability
      ? { fieldNullability: member.fieldNullability }
      : {}),
  };
};
