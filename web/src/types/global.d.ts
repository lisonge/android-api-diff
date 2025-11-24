interface TagItem {
  version: string;
  alias: string;
  tags: string[];
}

interface VersionUrlBuilder {
  replaceUrl: (tag: string) => string;
  filePath: string;
}

interface ExampleItem {
  title: string;
  url: string;
  targetName: string;
  propName: string;
  refName: string;
}
