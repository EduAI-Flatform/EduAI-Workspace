# EduAI Workspace

This repository owns EduAI workspace-level coordination and AI-DOS records. The Backend and Frontend remain independent sibling repositories and are not vendored here.

## Layout

- `.ai-dos/` — canonical AI-DOS records, manifest, runtime inventory, and generated views.
- `core/` — pinned AI-DOS 1.2 runtime used by the root-relative commands below.
- `EduAI_Docs/` — human-authored project and delivery documentation.
- `00-project/`, `05-operations/`, `06-roadmap/`, `07-tasks/`, `10-state/` — compatibility and operational overlays.
- `../EduAI-Back-End/` and `../EduAI-Front-End-Web/` — independently versioned application repositories required by manifest handoff checks.

## AI-DOS commands

Run from this repository root:

```powershell
node core/conformance.js --manifest .ai-dos/manifest.json
node core/project.js --manifest .ai-dos/manifest.json --out .ai-dos/generated
```

Generated Markdown is a projection only. Edit canonical JSON records under `.ai-dos/records/`, then regenerate the views.

Runtime provenance and the update procedure are documented in [`core/AI_DOS_RUNTIME_PROVENANCE.md`](core/AI_DOS_RUNTIME_PROVENANCE.md).
