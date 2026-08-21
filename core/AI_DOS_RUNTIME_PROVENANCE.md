# AI-DOS Runtime Provenance

## Pinned source

- Runtime: AI-DOS Core 1.2.0
- Source repository: `https://github.com/TDrake11/AI-DOS.git`
- Source checkout used for vendoring: `D:\Work\AI-DOS`
- Source Git revision: `2abeea732122aae28f4ba9a6f4814d288a3510e1`
- Vendored on: 2026-08-21

The source checkout was clean at the recorded revision. It was one local commit ahead of its configured `origin/main`; this repository pins the exact revision above rather than an inferred remote branch state.

## Vendored dependency set

The complete 29-file `core/` directory was copied to preserve the internal module and contract dependency graph used by `conformance.js` and `project.js`. The source root `package.json` was also copied because its `type: module` and Node 20+ engine contract are required for the runtime entry points.

Excluded from the vendor set: the source `.git/`, tests, project-specific records and manifests, caches, temporary files, secrets, `node_modules/`, and generated output.

## Update procedure

1. Obtain a clean, reviewed AI-DOS source checkout and record its version and full Git revision.
2. Inspect the `core/` dependency graph and security-sensitive file inventory.
3. Replace only `core/` and the required ESM package metadata; do not import source repository state, caches, credentials, or project records.
4. Update this file with the new revision, version, date, and dependency-set changes.
5. Run the sibling runtime and vendored runtime against the same canonical manifest and compare their structured conformance summaries.
6. Regenerate projections only after both results match with zero diagnostics.

## Verification

From the EduAI Workspace root:

```powershell
node core/conformance.js --manifest .ai-dos/manifest.json
node core/project.js --manifest .ai-dos/manifest.json --out .ai-dos/generated
```

Expected for this pin: conformance and projection succeed with zero diagnostics, 205 canonical records, 62 completed tasks, no active or blocked executable tasks, and no missing required evidence.
