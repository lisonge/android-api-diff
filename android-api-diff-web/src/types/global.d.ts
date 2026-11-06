interface DiffResultItem {
  tag: string;
  source?: import('android-api-diff').SourceLocation;
  status?: import('android-api-diff').AndroidApiTagResult['status'];
  file: import('android-api-diff').ApiFile;
  structs: import('android-api-diff').ClassStruct[];
  target: import('android-api-diff').ClassStruct | undefined;
  members: import('android-api-diff').ClassMember[] | undefined;
  typeDesc: string;
  typeColor: string;
  notFound: boolean;
}

interface DiffTypeItem {
  typeDesc: string;
  typeColor: string;
  tagRanges: string[][];
}
