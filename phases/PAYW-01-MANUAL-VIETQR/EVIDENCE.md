# PAYW-01 - Observed evidence

**2026-10-22:** VERIFYING safe scope; production BLOCKED_EXTERNAL.

| Gate | Evidence |
| --- | --- |
| Authorization | Explicit PAYW-01 safe implementation/test/docs; no live or production authorization |
| Workspace baseline | feat/payw-01-manual-vietqr from b82f8f5ed4eaba3e511f4b5a2fd651e17ad4c630 |
| Entry | PAYW-00 VERIFYING, PAYW-D01/D08 OPEN; scoped safe-work dependency exception |
| Design | DESIGN.md prepared before source implementation; separate bank boundary/dual control/fail-closed production |
| Backend independent PostgreSQL invariants | npm.cmd run test:demo-data -- --runInBand bank-transfer-migration.spec.ts: PASS 42/42 (all historical migrations plus PAYW-01 migration applied in PGlite; no external database). Covers dual authorized approval, amount/account/reference/time/terminal mismatches, revoked authority, forged paid/fulfillment paths, immutable snapshots/evidence/approvals/support, normalized transaction uniqueness, settlement replay and occurrence-time provenance. Single-session harness does not prove multi-connection lock scheduling. |
| Backend tests | Entire Jest: 156 suites / 1058 tests PASS; focused payment subset 271 tests. Build, Prisma generate and endpoint authorization audit PASS (260 endpoints, implicit 0). |
| Frontend tests | 380 unit tests / 95 files PASS; build includes tsc --noEmit PASS. 26 Chromium browser scenarios PASS: bank 8 (seven widths plus real method-selector POST), PayOS 2, VNPay 16. No separate lint/typecheck npm scripts exist. |
| Stitch/browser/a11y | Stitch project 18116946755394055085, screen d4b5c0fc57c24ea9aa6e17379968d3ea generated/reviewed before UI. Project-native tokens retained; invented shell/security claims rejected. Screenshots visually inspected at 320/390/1440; all seven widths checked overflow, 44px controls, focus, QR corners/center unobstructed, console/network guards and support never PAID. Chrome DevTools MCP unavailable due existing profile lock; real Playwright Chromium used. Synthetic QR browser fixtures test presentation, not live bank scanning. |
| Workspace checks | npm.cmd run test:contracts PASS (ok true, diagnostics empty, SPR25-007 blocked); npm.cmd run test:workspace PASS; git diff --check PASS. Initial npm invocation was blocked by PowerShell script policy; npm.cmd ran without policy changes. |
| PR/CI/merge/remote main | Backend PR #10; Frontend PR #18 head 0d6adda8dce1a5a9d33cc7eec6141818699d04eb (Frontend CI run 39739313880 pending). No merge claimed. |
| Branch cleanup | PENDING after verified merge |
| Deployment safeguards | Independent reviewer ran node --test scripts/production-deployment-gate.test.cjs: PASS 3/3 Backend and 4/4 Frontend; coordinator also observed RED 3 then GREEN 3 each: workflow_dispatch only, explicit boolean approval defaults false, main-only deployment and skipped deploy notifications. Vercel git.deploymentEnabled.main=false also blocks automatic main deployment while preserving feature previews. Official reference: https://vercel.com/docs/project-configuration/git-configuration . No production deployment authorized. |
| Production acceptance | BLOCKED_EXTERNAL; none claimed |

Preserve pending facts until observed. Keep raw official statements/secrets out of Git; sanitized synthetic evidence or approved opaque references only. Historical PAYW-00 and AI-DOS financial records are unchanged.

## Additional verification and review

- Multi-connection PostgreSQL CI uses pgvector/pgvector:pg16, two independent Prisma clients, strict localhost/eduai_payw_ci/empty-schema guard and no dotenv. Tests request/support replay, same-actor and distinct approvals, transaction collision across orders, canonical replay and five cancel-vs-approval races. Syntax and refusal without test configuration verified; runtime result PENDING.
- Self/independent reviews corrected missing provider POST body, zero-payable selection bypass, immutable approval no-op update, idempotency resource constraint, production projection/fulfillment guards, statement custody/detail, scheduler actor attribution and QR quiet zone (4 modules).
- No credentials or raw statements entered Git; synthetic-only migration receiver constraint. Live-bank account ownership/receiving authority is not verified.

## Existing dependency audit findings

No dependency or lockfile change. Full Backend audit: 53 findings (38 high, 11 moderate, 4 low); omit-dev: 11 (3 high, 7 moderate, 1 low). High chain is existing Prisma CLI/config -> deepmerge-ts override 7.1.6, GHSA-ggr8-5vv4-36mx. npm explain and source search show configuration/build/migration use, no application source import of affected merge function. Deferred from this sandbox feature; review and remediate before any future production activation.

Full Frontend audit: 14 (8 high, 6 moderate) in existing development/build tooling; omit-dev: 2 moderate, zero high/critical (react-router). These are recorded limitations, not a clean full audit or production PASS.
