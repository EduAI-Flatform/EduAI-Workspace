# PAYW-02 observed source checkpoint - 2026-11-03

Status: IN_PROGRESS. No task is declared DONE. Canonical scoped records: EVIDENCE:PAYW-02-001 through005:SOURCE-TESTS-20261103.

| Check | Observed result |
| --- | --- |
| Revenue-sharing Jest suites | PASS5 suites /35 tests |
| Isolated PostgreSQL historical+new migration rehearsal | PASS1 suite /9 tests including canonical refund provenance |
| Existing runtime-role separation regressions | PASS2 suites /29 tests |
| Workspace layout | PASS |
| Frontend final focused UI/service/navigation | Agent observed PASS16 |
| Frontend earlier full suite/build | Agent observed PASS103 files /431 tests; build PASS; direct tsc PASS |
| Frontend final build/browser | Agent observed final build PASS and final PASS14 at seven widths after latest preview refinements; intercepted API fixtures |

Final frontend build/browser recheck passed after the latest UI changes. Coordinator additionally reports backend targeted19 suites/132 tests and new authorization/controller6 tests; final backend build after provenance extension remains pending. Complete backend live-runtime UAT and real multi-client concurrency verification are not claimed. No external database migration, live grant, production activation, financial write, payout, commit/CI/merge or branch cleanup was executed by this checkpoint.

Runtime privilege checks use PGlite synthetic roles: history SELECT succeeds; UPDATE terms and DELETE ledger are denied; journal INSERT and policy UPDATE are granted. Immutable-history triggers remain an additional database guard. Signed refund redistribution deltas and zero recognised amounts are supported; earning periods cannot be negative.

Stitch reference reported by frontend agent: project18116946755394055085/screen17858e669bf8406cb52fb648dd10d3e3. Browser screenshots are ignored local artifacts under Frontend test-results/revenue-{role}-{width}.png, not committed acceptance proof.

## Refund source follow-up

Ledger adjustments now carry nullable sourceRefundId with RESTRICT foreign key. Database validation requires a recorded canonical refund allocated to the matching period/order line; recognized entries have no refund source. Isolated real synthetic payment/refund fixtures accept the canonical source and reject missing, unrecorded and recorded duplicate-collection refund sources. Prisma merge/client regeneration passed without a database migration.

## Final coordinator local verification

2026-11-03, feature/revenue-sharing in all three repositories:
- Backend final targeted regression PASS20 suites/146 tests, Nest build PASS, Prisma schema validation PASS.
- Isolated migration/privilege/canonical-refund provenance tests rerun PASS9.
- Frontend final complete regression PASS103 files/432 tests, final TypeScript/Vite build PASS.
- Agent observed responsive PASS14 scenarios across all seven required widths, plus final seller-state check at390 PASS.
- Endpoint security audit PASS286 endpoints/0 implicit protection.
These source checks do not claim live-runtime, real multi-client database concurrency, remote CI, production deployment or real financial movement. No task or release gate has been marked DONE.