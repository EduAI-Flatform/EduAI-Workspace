# Codex Working Rules — EduAI

## 1. Session reconstruction

Every session reconstructs context from repository truth. Read root `AGENTS.md`, project state/dependencies, current phase dossier, frontend architecture when applicable, target-repo rules, real source/tests/config and git state. Do not rely on chat memory as the only source of truth.

## 2. Major-phase execution

A major phase requires explicit owner start. After start, Codex may execute dependency-valid work in that same phase without asking routine permission for branch creation, edits, tests, review/remediation, commit, push, PR, CI observation/retry of ordinary failures, merge after gates pass, remote-main verification and merged-branch cleanup.

Do not cross into the next major phase automatically.

## 3. Stitch-first UI workflow

For substantial Admin UI work:

`requirements → current-source/token audit → Stitch MCP → review/refinement → project-native implementation → responsive/a11y checks → visual/runtime regression`

Do not generate an entire Admin application in one Stitch prompt. Design shell/navigation, page families, complex widgets and mobile composition in bounded iterations. Existing good Stitch designs should be preserved and normalized, not rewritten for novelty.

## 4. Responsive contract

Verify relevant UI at `320`, `375`, `390`, `412`, `768`, `1024`, `1440` px. Check body overflow, text clipping, dialogs, drawers, filters, tables/cards, pagination, touch targets, sticky elements, scroll lock, focus, keyboard behavior and long Vietnamese copy.

## 5. Architecture

Prefer shared primitives and responsibility-based modules. Pages compose flows; services handle APIs; reusable behavior belongs in coherent hooks/modules; pure transforms should not depend on React. Avoid adding unrelated component styles to a single feature-wide dumping stylesheet.

## 6. Verification baseline

Use focused tests plus every applicable repository gate. Frontend baseline:

```text
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=high
```

Add Playwright/runtime/accessibility/visual checks where required by the phase. Never fabricate PASS evidence.

## 7. Evidence

Record only observed facts: changed files, commit SHA, test/build result, responsive/a11y result, CI run/conclusion, runtime evidence, remote SHA, merge and branch cleanup. `DONE` requires all applicable evidence.

## 8. Production and security hard stops

Explicit owner approval is still required for payment-provider activation, real financial/refund/reconciliation writes, risky production schema migration, destructive production data actions, credential/secrets changes, security weakening or required-gate bypass.

## 9. Git lifecycle

Use descriptive Conventional Commits. After a PR is merged and remote `main` is verified, delete merged feature branches locally and remotely unless explicitly persistent, then prune/sync. Do not leave stale merged branches.

## 10. Relationship to AI-DOS

Admin phase orchestration must not rewrite AI-DOS payment truth. If an Admin phase discovers a payment/reconciliation defect, record it separately and preserve the existing canonical financial evidence.
