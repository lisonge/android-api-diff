# android-api-diff

**<https://diff.songe.li>**

Compare Android Java/AIDL APIs across versions and 24 AOSP repositories, including repository/path migrations. Search by name or select an exact repository and path.

The bundled index contains audited release snapshots. Unscanned tags are shown as unknown; see [index building and CLI usage](./CLI.md#multi-repository-index) for full-tag indexing.

## CLI + Agent Skill

Install or upgrade the global CLI:

```sh
npm install --global android-api-diff@latest
```

Then, from the root of a project that needs Android API inspection, install its
release-matched Codex Skill:

```sh
android-api-diff skill install
```

The Skill is project-scoped by default. Global installation is an explicit
opt-in. CLI and Skill lifecycles remain separate:

```sh
android-api-diff skill install --skill-scope global
android-api-diff skill remove
```

[CLI usage and Skill setup](./CLI.md)

## Web deployment

The Web package is private and does not publish to npm. Run `pnpm build` and
`pnpm preview` for local hosting. Set `CDN_BASE` when running `pnpm build` to use
a CDN, such as `https://cdn.jsdelivr.net/gh/lisonge/android-api-diff@page-<timestamp>/`.
`renderBuiltUrl` rewrites built asset URLs when `CDN_BASE` has a value; otherwise
Vite uses its default asset URLs. The router uses Vite's `BASE_URL`, independently
of the CDN resource URLs.

The deployment workflow runs on `main` and calls `Date.now()` once at the start
to generate `page-<timestamp>`. It shares the branch name and CDN base through
`GITHUB_ENV`, publishes the contents of `dist` at the root of that orphan branch,
and immediately deploys the matching site to Netlify after the push succeeds.
Every run builds a new version. Production deployments run serially.
Page routes remain rooted at `/`.

After a successful deployment, cleanup keeps the current build plus the two
most recent other builds by the numeric timestamp in the branch name, and
deletes older branches matching `page-<digits>`. Failed deployments do not clean
up branches. Each build commit has no parent, so retained branches do not retain
the entire build history. Deleting branches makes old commits eligible for
GitHub's garbage collection; it does not immediately shrink remote storage.
Old tabs and Netlify rollbacks outside the retained versions may lose access to
their CDN assets; CDN caches are not a substitute for retaining an origin.

The parser starts from a same-origin Blob module that imports the CDN Worker
entry. Its relative module imports and WASM URLs then resolve against the CDN,
keeping those assets independently cacheable. Same-origin builds start the
Worker directly. CDN resources require CORS; if the host uses CSP, allow Blob
Workers (`worker-src 'self' blob:`) and the CDN in the applicable script and
connection directives. Browser cross-origin loading still needs release smoke
testing; the Worker unit tests exercise parsing through Node workers.
