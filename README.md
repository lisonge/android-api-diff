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
