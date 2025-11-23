interface TagItem {
  version: string;
  alias: string;
  tags: string[];
}

interface VersionUrlBuilder {
  replaceUrl: (tag: string) => string;
  filePath: string;
}
