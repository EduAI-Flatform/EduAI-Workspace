# EduAI Phase Task Template

```md
## ADM-XX-YYY — Task title
**Status:** READY
**Depends on:** <dependencies>
**Target repo(s):** Frontend / Backend / Workspace
**Architecture conformance required:** YES

### Mandatory preflight
1. Read Workspace `AGENTS.md`.
2. Read `state/PROJECT-STATE.md`, `state/DEPENDENCY-GRAPH.md`, and relevant blockers.
3. Read `docs/engineering/CODEX-WORKING-RULES.md`.
4. Read current phase README/TASKS/ACCEPTANCE/TEST-PLAN/UI-STITCH.
5. Read target repo `AGENTS.md` if present.
6. For frontend work, read `docs/engineering/FRONTEND-ARCHITECTURE.md`.
7. Inspect real source, tests, config, neighbouring code, runtime and git state.

### Goal
<observable product outcome>

### In scope
- ...

### Out of scope
- ...

### Stitch requirement
`REQUIRED | NOT_REQUIRED_WITH_REASON`

### Functional acceptance
- ...

### Architecture acceptance
- reuse established primitives/patterns;
- no unrelated dumping stylesheet growth;
- no silent route/API/auth/payment semantic changes;
- responsive/a11y requirements pass.

### Verification
Run focused tests and all applicable repository gates. For frontend: lint, typecheck, tests, build, audit plus required browser/runtime/visual checks.

### Evidence required
Changed files, exact SHA, tests/build, responsive/a11y/visual evidence, CI, remote SHA, runtime evidence when applicable, merge and branch cleanup.

### Completion rule
Use DONE only after every applicable gate is observed. Otherwise use VERIFYING or a truthful blocked state.
```
