export interface TextEtagTag {
  resourceKey: string;
  revision: number;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
}

export interface TextEtagRepresentation {
  etag: string;
  value: string;
}

export interface TextEtagCache {
  getByEtag(
    resourceKey: string,
    etag: string,
  ): Promise<TextEtagRepresentation | undefined>;
  getPredecessor(tag: TextEtagTag): Promise<TextEtagRepresentation | undefined>;
  set(tag: TextEtagTag, etag: string, value: string): Promise<void>;
}
