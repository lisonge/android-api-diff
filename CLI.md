# android-api-diff CLI

[`android-api-diff`](https://www.npmjs.com/package/android-api-diff) lets
developers and AI agents inspect Android framework Java/AIDL APIs across
platform versions and generate Java hidden-API code without a continuously
running MCP server. It requires Node.js 26.5.0 or newer.

The CLI loads a versioned source index and downloads Java/AIDL source files on demand,
then keeps query data in a local content-addressed SQLite cache.

## Install and upgrade

Install or upgrade the global CLI with pnpm:

```sh
pnpm add --global android-api-diff@latest
```

The same command upgrades an existing installation. npm users can run:

```sh
npm install --global android-api-diff@latest
```

Then, from the root of a project that needs Android API inspection, install the
matching Codex Skill:

```sh
android-api-diff skill install
```

The Skill comes from the Git tag matching the installed CLI version, so their
instructions stay in sync. Skill changes run through the exact `skills` CLI
version bundled with `android-api-diff`, so a target project's dependencies or
npm configuration cannot replace the Skill manager. The project root is the
nearest Git or Gradle root, and the successful JSON result reports the resolved
Skill path and scope.

To make the Skill available across all projects instead, opt in explicitly:

```sh
android-api-diff skill install --skill-scope global
```

Install and remove change only the matching Skill:

```sh
android-api-diff skill install
android-api-diff skill remove
```

Both commands default to the current project. Add `--skill-scope global` to
manage the global Skill. Skill removal targets the canonical and Codex-visible
installation without mutating other agents' directories. It reports success
only after those paths are gone and the matching lock record has been removed.

The CLI does not implement its own version check.
After upgrading the CLI with npm or pnpm, run `android-api-diff skill install`
again in each project that should receive the new Skill instructions.

## Search and query

```sh
android-api-diff search "IConnectivityManager"
android-api-diff query --name "android.net.IConnectivityManager" --min-sdk 30
android-api-diff query --repo platform/packages/modules/Connectivity --path framework/src/android/net/IConnectivityManager.aidl --target IConnectivityManager --anchor-tag android-12.0.0_r34
android-api-diff source --repo platform/packages/modules/Connectivity --path framework/src/android/net/IConnectivityManager.aidl --tag android-12.0.0_r34
android-api-diff generate --name "ActivityThread.currentApplication" --min-sdk 28
android-api-diff preload "ContentObserver()" "IActivityManager.getTasks" --min-sdk 28
```

`search` performs case-insensitive substring discovery and Java reference matching
across the 24 default repositories. Each candidate has `repo`, `path`,
`availableTags`, `targetPaths`, `targetKind`, and `matchedBy`. These are indexed
file locations, not proof that a member exists.

`query` and `generate` accept either `--name <reference>` or the explicit
`--repo <AOSP project> --path <repository-relative path>` input. These modes are
mutually exclusive. Ambiguous names return candidates instead of silently
choosing a repository. Use `ClassName()` for constructors, or
`package.Outer.Inner.member` for nested members.

With `--target`, the explicit input selects a type/member in that file. Its
fully qualified type name is then tracked across repository and directory moves
for every tag. `--anchor-tag` identifies the initial definition; without it,
the latest indexed occurrence is used. Renamed packages/types are not assumed
to be the same API. Multiple definitions in a tag are reported as ambiguous. An explicit source
selection takes precedence while that file defines the same type.
Without `--target`, `query` checks the exact file and does not follow moves.
`source` always reads the exact repository, path and tag, without an index lookup.
`generate` requires a type/member target.

All commands default to `--format json`, returning `{ "ok": true, "command":
"query", "result": {} }`. `--format pretty` is available. Failures write a
structured error to stderr and return a nonzero exit code.

`query` returns the chosen anchor in `selection` and a per-tag timeline in
`tags`, including each actual repository/path. Status is `found`, `not-found`,
`unknown`, or `ambiguous`. A missing mirror tag, unindexed tree, failed download,
or type absent from the filtered index does not prove that Android lacks the
API. A confirmed missing member is `not-found`. Code generation refuses unknown
or ambiguous intervals.

Member results use `overloads`, each with a stable `overloadId`, latest checked
`signature` and structured `member`, and independent version `ranges`.
`ranges[].overloadIds` identifies overloads present together. Range endpoints
refer to the first/last tag checked in this snapshot, not permanent final tags.

## Multi-repository index

The whitelist and directory rules are in
[`repositories.ts`](./android-api-diff/src/core/catalog/repositories.ts). Only `.java` and `.aidl`
files in those directories are retained. The bundled bootstrap index contains
the previously audited release snapshots; other enumerated tags remain
`unknown` until scanned. It is not a complete history of every Android release tag.

Build the full Android 8–17 tag index from GitHub trees (a `GITHUB_TOKEN` is
recommended for API rate limits):

```sh
pnpm -F android-api-diff build:index --output ../.cache/source-index --bundle
```

For a limited scan, repeat `--tag android-12.0.0_r34`. Unscanned tags remain
unknown. The builder repairs truncated recursive trees by walking subtrees,
caches Git objects, and writes the manifest only after all requested scans
succeed. It does not download source blobs.

The schema v3 manifest contains `revision`, grouped `versions` and repository
shard URLs. Each version stores its full numeric version string once (such as
`8.1.0`) and a numeric `revisions` array. Expanding groups in order produces the
global tag positions; full tags are reconstructed as `android-${version}_r${r}`.

Each repository shard contains:

- `repo`: repository name.
- `paths`: a dictionary of unique repository-relative paths.
- `snapshots`: deduplicated arrays of path IDs.
- `tagSnapshots`: snapshot IDs aligned with the global tag positions; `-1` means
  the repository does not publish the tag, and `-2` means it is not indexed.
  A nonnegative ID referencing an empty snapshot means it was scanned and has
  no matching files.

Git commit/tree SHAs are used only during index construction and download
caching. The published index retains only the overall content `revision` for
cache invalidation. Schema v2 indexes must be rebuilt; no compatibility reader
is included. Search/query responses continue to expose full Android tag strings.

Serve the generated output over HTTP and set `ANDROID_API_DIFF_INDEX_URL` to its
`manifest.json` URL for the CLI. Web builds use `VITE_SOURCE_INDEX_URL`.
Without those settings, both use the bundled index. `--bundle` replaces that
bundle for the next application build. Index revisions participate in query
cache keys; source/structure caches include repository, tag and path.

The editable catalog rules live in `android-api-diff/src/core/catalog/config/`:
`repositories.json` contains the repository whitelist, included directories and
exclusion pattern; `redirects.json` contains repository-qualified historical
redirects and superseded-definition rules. These files are maintained in Git,
separately from generated index data.

The large `generated/index-data.json` is ignored by Git. Its GitHub attachment
URL, file SHA-256, byte size and index revision are pinned in
`generated/index-asset.json`; the small `metadata-data.json` remains in Git.
`pnpm prepare:index` reuses a verified local file or downloads and verifies the
pinned attachment. Web development/builds, CLI builds/start and the full test
command run this preparation automatically. Downloads need no credentials.

After regenerating with `pnpm -F android-api-diff build:index --bundle`, run
`pnpm upload:index` with `GITHUB_COOKIE` in the environment. This uploads to
GitHub issue #1, creates and removes a temporary attachment comment, verifies
the public download, and updates the two small committed JSON files. Upload
results are also recorded in the ignored `.cache/index-upload-result.json`.
The build rejects mismatched metadata/asset revisions until the new index has
been uploaded. The npm package and website still include the prepared index,
so their runtime loading behavior is unchanged.

The builder also writes `metadata.json` with the index revision and version/tag
list. `--bundle` updates both `index-data.json` and `metadata-data.json` in
`android-api-diff/src/core/catalog/generated/` from the
same index. The homepage uses the small bundled metadata immediately while the
full path index loads independently. The full index is a separate hashed JSON
asset referenced by shared `new URL(..., import.meta.url)` code. Node reads the
asset from the installed package; Web stores it in IndexedDB through its text
cache. A changed content hash produces a new cache key. With a remote index configured, the tag list
comes from the manifest without waiting for repository shards.

## Advanced installation

### Migrate an existing global Skill

Changing the installer default does not remove an existing global Skill. Remove
it explicitly once:

```sh
android-api-diff skill remove --skill-scope global
```

Then install from each project that needs the Skill:

```sh
android-api-diff skill install
```

### Retry a failed Skill installation

If `android-api-diff skill install` or `skill remove` fails, run the exact retry
command from its structured error message. The install command keeps the Skill
pinned to the same release as the installed CLI and, for project scope, names
the project directory from which to run it.

### Uninstall the CLI

Removing a Skill leaves the global CLI available. To remove the CLI as well:

```sh
npm uninstall --global android-api-diff
```

The Skill routes natural-language requests to the narrowest CLI command. In
particular, code-generation requests call `generate` directly instead of
running a redundant `query` first.

Example requests:

- `Inspect how IActivityManager.getTasks changes from minSdk 28.`
- `Inspect all ContentObserver() constructor overloads.`
- `Generate Java code for ActivityThread.currentApplication with minSdk 28.`
- `Find the repository and path for android.app.IActivityManager.`

## Cache and local development

Set `ANDROID_API_DIFF_CACHE_DIR` to override the Node.js cache directory. Cache
values are stored as Brotli-compressed BLOBs. Custom cache roots are never
recursively migrated or deleted automatically.

To run the CLI from this repository:

```sh
pnpm install
pnpm -F android-api-diff start query --name "IActivityManager.getTasks" --min-sdk 28
```

Run all type checks, unit tests, and package tests with:

```sh
pnpm test
```

`pnpm test:unit` runs only the unit tests, including the Node worker-thread
tests for the shared Web parser. Index preparation may download the pinned
index on first use; subsequent runs reuse the verified local file.

AIDL parsing uses `aidl-parser`, powered by the official AOSP Android 17 grammar
compiled to WebAssembly. Its module initializes WASM on import and exposes a
synchronous parser. No local parser generation or Java installation is needed.
Parser regression tests run offline:

```sh
pnpm -F android-api-diff test:parser
```

Java source parsing uses `web-tree-sitter` with the packaged Java WASM grammar.
The CLI loads it directly; Web loads it inside its parsing Worker. Java constant
expressions use the same Tree-sitter parser, with batched comparisons in the Web
Worker. Code rendering APIs are asynchronous. Both languages use WASM parsers. Java regression tests compare complete API models and
constant-expression equivalence groups against fixed expected fixtures.

```sh
pnpm -F android-api-diff test:java
pnpm -F android-api-diff bench:java
```

The benchmark measures five warmed Tree-sitter runs including model extraction
for 21 files from fixed Android 11, 12, and 17 tags. Source downloads are cached
in `.cache/java-parser-benchmark`; results are written to `tree-sitter-results.json`
in that directory. Network access is needed on the first
run; reported parsing times exclude downloads.
