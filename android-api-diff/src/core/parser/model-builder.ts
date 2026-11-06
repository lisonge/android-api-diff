import type { ApiFile, ClassMember, ClassStruct } from '../model/types.ts';

interface TempClassStruct extends ClassStruct {
  parent?: TempClassStruct;
  children: TempClassStruct[];
}

const importPrefixReg = /^static\s+/;
const wildcardImportSuffix = '.*';
const qualifiedTypeReg = /[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*/g;
const implicitTypeNames = new Set([
  'Boolean',
  'Byte',
  'Character',
  'Class',
  'Double',
  'Enum',
  'Float',
  'Integer',
  'Long',
  'Number',
  'Object',
  'Record',
  'Short',
  'String',
  'StringBuffer',
  'StringBuilder',
  'Throwable',
  'Void',
  'boolean',
  'byte',
  'char',
  'double',
  'extends',
  'float',
  'int',
  'long',
  'short',
  'super',
  'void',
]);

const getImportTarget = (value: string) => {
  return value.replace(importPrefixReg, '');
};

const getImportSimpleName = (value: string) => {
  return getImportTarget(value).split('.').at(-1) ?? '';
};

export const createImportResolver = (sourceImports: string[]) => {
  const explicitImportIndexes = new Map<string, number>();
  const wildcardImportIndexes: number[] = [];
  sourceImports.forEach((value, index) => {
    if (value.endsWith(wildcardImportSuffix)) {
      wildcardImportIndexes.push(index);
      return;
    }
    explicitImportIndexes.set(getImportSimpleName(value), index);
  });

  return (texts: (string | undefined | null)[]): number[] => {
    const indexes = new Set<number>();
    let hasUnresolvedType = false;
    for (const text of texts) {
      if (!text) continue;
      for (const match of text.matchAll(qualifiedTypeReg)) {
        const name = match[0]!.split('.')[0]!;
        const index = explicitImportIndexes.get(name);
        if (index !== undefined) {
          indexes.add(index);
        } else if (!implicitTypeNames.has(name) && /^[A-Z_$]/.test(name)) {
          hasUnresolvedType = true;
        }
      }
    }
    if (hasUnresolvedType) {
      wildcardImportIndexes.forEach((index) => indexes.add(index));
    }
    return Array.from(indexes).sort((a, b) => a - b);
  };
};

const walkStructMembers = (
  structs: ClassStruct[],
  callback: (member: ClassMember) => void,
) => {
  for (const struct of structs) {
    struct.members.forEach(callback);
    if (struct.children) walkStructMembers(struct.children, callback);
  }
};

export const createApiFile = (
  packageName: string,
  sourceImports: string[],
  structs: ClassStruct[],
): ApiFile => {
  const usedIndexes = new Set<number>();
  walkStructMembers(structs, (member) => {
    for (const index of member.imports) {
      if (
        !Number.isSafeInteger(index) ||
        index < 0 ||
        index >= sourceImports.length
      ) {
        throw new Error(`Invalid source import index: ${index}`);
      }
      usedIndexes.add(index);
    }
  });
  const indexMap = new Map<number, number>();
  const imports = sourceImports.filter((_, index) => {
    if (!usedIndexes.has(index)) return false;
    indexMap.set(index, indexMap.size);
    return true;
  });
  walkStructMembers(structs, (member) => {
    member.imports = member.imports.map((index) => indexMap.get(index)!);
  });
  return {
    package: packageName,
    imports,
    structs,
  };
};

export const useStructEditor = () => {
  const tempAllStructs: TempClassStruct[] = [];
  const structs: TempClassStruct[] = [];
  let currentStruct: TempClassStruct | undefined;
  const enterStruct = (
    name: string,
    loc: number,
    kind: 'class' | 'interface',
    isAbstract = false,
    isHidden = false,
  ) => {
    const v: TempClassStruct = {
      name,
      loc,
      ...(kind === 'interface' ? { isInterface: true as const } : {}),
      ...(isAbstract ? { isAbstract: true as const } : {}),
      ...(isHidden ? { isHidden: true as const } : {}),
      members: [],
      children: [],
    };
    tempAllStructs.push(v);
    const parent = currentStruct;
    if (parent) {
      v.parent = parent;
      parent.children.push(v);
    } else {
      structs.push(v);
    }
    currentStruct = v;
  };
  const exitStruct = () => {
    currentStruct = currentStruct?.parent;
  };
  const hasCurrentStruct = () => {
    return !!currentStruct;
  };
  const addMember = (value: ClassMember) => {
    if (!currentStruct) {
      throw new Error('No current struct to add member to');
    }
    currentStruct.members.push(value);
  };
  const clearUseless = () => {
    for (const v of tempAllStructs) {
      delete v.parent;
      if (v.children.length === 0) {
        // @ts-ignore
        delete v.children;
      }
    }
  };
  return {
    enterStruct,
    exitStruct,
    hasCurrentStruct,
    addMember,
    structs,
    clearUseless,
  };
};
