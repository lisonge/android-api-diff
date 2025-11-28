export interface ClassMember {
  name: string;
  type: string;
  loc: number;
  parameterCount?: number;
}

export interface ClassStruct {
  name: string;
  members: ClassMember[];
  children?: ClassStruct[];
}

export interface TempClassStruct extends ClassStruct {
  parent?: TempClassStruct;
  children: TempClassStruct[];
}

export const useStructEditor = () => {
  const tempAllStructs: TempClassStruct[] = [];
  const structs: TempClassStruct[] = [];
  let currentStruct: TempClassStruct | undefined;
  const enterStruct = (name: string) => {
    const v: TempClassStruct = {
      name,
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
  return { enterStruct, exitStruct, addMember, structs, clearUseless };
};
