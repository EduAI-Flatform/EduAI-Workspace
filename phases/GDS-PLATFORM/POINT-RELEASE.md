# Native point lifecycle — release preparation

Status: VERIFYING. This dossier covers the point continuation, not completion of the entire original GDS plan.

## Reviewed source

- Backend [PR 36](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/36), `feature/gds-activity-points`, `6d386e11cf01c6a62af74f806ffe9c1b098e217b`.
- Frontend [PR 36](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/36), `feature/gds-point-admin-impact`, `ad26f974dca8d6188d0f7d3a805af494a38273be`.
- Additive migration: `20261112180000_activity_points`.
- Pinned SHA-256: `2CB0A2157FA15329AB0870ED46E30F3BFB3BAC4DB4B05498582B32185029A355`.

Canonical course completions select the approved policy effective at event time. Receipts retain zero outcomes without zero ledger transactions. Expiry and refund allocation use the existing non-cash ledger and user lock; native refunds keep original validity. Reserved postings require source receipts at commit. No client amount/recipient/authoritative completion endpoint is exposed.

## Observed evidence

Backend `d8b8dbb`: full CI `43215267361` and real PostgreSQL replay `43215267599` passed. The replay upgraded the historical 65-migration baseline through 23 upgrades and exercised actual restricted Prisma-role reads/inserts, competing spending, replay, audit rollback, native refund validity, disabled-trigger readiness, orphan posting protection and concurrent expiry with disabled accrual. The final verifier-only revision requires fresh remote checks.

Local source/build checks passed, including 15 isolated point migration assertions. Release checks cover separate approval flags, pinned artifact drift, backup ordering, historical ledger/policy digest preservation and read-only runtime verification before restart. Windows-specific backup test skips remain covered by the existing Linux CI job; do not describe them as local passes.

Frontend full suite: 132 files / 584 tests passed before the additive readiness explanation. Production build and Chromium platform flows passed after that explanation, including both readiness states, VI/EN and 320/375/390/412/768/1024/1440 px. API browser fixtures are synthetic; authenticated production acceptance is still outstanding.

## Controlled rollout order

1. Verify final-head required CI and complete source review for both PRs. Existing owner authorization covers deployment/migrations; this is not permission to skip checks.
2. Read and temporarily disable backend `EDUAI_AUTO_CD_ENABLED` before backend merge. Record its prior value. Do not let a source push start the new runtime before its schema exists.
3. Merge the reviewed backend revision, verify remote `main` and required post-merge checks, then dispatch its production workflow with `authorize_production=true`, `authorize_point_schema_migrations=true`, old receipt/platform migration flags false and all financial actions `preserve`.
4. Require a successful private backup before migration. Both preflights must match; the reviewed SQL fingerprint is checked again immediately before apply. Point ledger digests exclude only the new posting-order column; original ledger fields and point policy history must remain identical after migration. Concurrent writes cause a fail-closed result, not an assumed pass.
5. Apply bounded runtime grants, build, then execute the read-only `verify-point-runtime.cjs` using the actual application role before PM2 restart. Require readiness, health and unchanged point-policy state. No policy is created, approved, enabled or rescheduled as part of this rollout.
6. Restore the prior backend auto-CD value after verified backend release. Merge/deploy the verified frontend revision afterward; check public GDS behavior and available authorized Admin reads. Do not call anonymous smoke checks authenticated production UAT.
7. Verify final remote main SHAs/post-merge checks, record actual deployment receipts and delete merged temporary source branches locally/remotely after ancestry checks.

No production step above has been executed at this checkpoint. Rollback retains additive tables, receipts and original history; do not drop the schema to reverse a code release. A prior runtime can be restored only while point policies remain disabled; after activation, use a reviewed forward recovery that respects original expiry.

## Remaining original-plan work

Complete this controlled rollout and authenticated production UAT, then finish legacy entitlement/benefit migration and dependency-based cleanup. A future school connection uses the existing application/review flow and its actual API/SSO contract; no current school is required for native course-completion points. Unsupported external/sub-affiliate policies remain disabled according to the original plan.
