# GDS platform implementation

Owner authorized source implementation of the GDS plan on 2026-11-11.

Status: IN_PROGRESS. This is not a production deployment authorization.

Latest integration: all backend/frontend PR CI checks passed; both PRs are ready for review. Delivery remains VERIFYING because source merges trigger production deployment and require separate release authorization. See [implementation receipt](IMPLEMENTATION-RECEIPT.md) for coverage, counts and release prerequisites.

Phase dossier: [tasks](TASKS.md), [acceptance](ACCEPTANCE.md), [test plan](TEST-PLAN.md), [Stitch references](UI-STITCH.md). Backend/frontend PR #31 are open after explicit owner authorization of GitHub authentication. Workspace evidence is tracked in PR #30. Production remains separately gated.

## Required outcomes

- Independent multi-device sessions with 30-day refresh and coordinated refresh.
- Versioned administrator-managed policies, impact preview, approval and effective dates.
- GDS branding, navigation, system-wide VI/EN, account and support workflows.
- Rich course descriptions, authorized draft preview and post-video lesson quizzes.
- Partner/activity workflows, configurable membership cards and affiliate integration.
- Preserve existing accounts, purchases, balances and acquired course access.

## Delivery gates

Follow Workspace engineering rules and Stitch-first UI design. Preserve SPR25-007.
No live payment activation, financial writes or destructive production migration.
Record actual tests, design references, changes and remaining work in EVIDENCE.md.
Do not remove legacy tables until migration and reconciliation are verified.
