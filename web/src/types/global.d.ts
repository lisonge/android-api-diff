interface AndroidVersionItem {
  version: string;
  alias: string;
  tags: string[];
}

interface VersionUrlBuilder {
  filePath: string;
  templateUrl: [string, string];
}

interface ExampleItem {
  title: string;
  url: string;
  targetName: string;
  propName: string;
  refName: string;
}

interface DiffResultItem {
  tag: string;
  interfaces: ClassStruct[];
  typeDesc: string;
  typeColor: string;
  notFound: boolean;
}

interface DiffTypeItem {
  typeDesc: string;
  typeColor: string;
  tagRanges: string[][];
}
interface SearchFromData {
  targetUrl: string;
  targetName: string;
  targetProp: string;
}
