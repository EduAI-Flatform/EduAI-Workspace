# PAYW-01 - Observed evidence

**2026-10-22:** Sandbox technical implementation verified; phase BLOCKED_EXTERNAL for unresolved live/legal gates.

| Gate | Evidence |
| --- | --- |
| Authorization | Explicit PAYW-01 safe implementation/test/docs; no live or production authorization |
| Workspace baseline | feat/payw-01-manual-vietqr from b82f8f5ed4eaba3e511f4b5a2fd651e17ad4c630 |
| Entry | PAYW-00 VERIFYING, PAYW-D01/D08 OPEN; scoped safe-work dependency exception |
| Design | DESIGN.md prepared before source implementation; separate bank boundary/dual control/fail-closed production |
| Backend independent PostgreSQL invariants | npm.cmd run test:demo-data -- --runInBand bank-transfer-migration.spec.ts: PASS 42/42 (all historical migrations plus PAYW-01 migration applied in PGlite; no external database). Covers dual authorized approval, amount/account/reference/time/terminal mismatches, revoked authority, forged paid/fulfillment paths, immutable snapshots/evidence/approvals/support, normalized transaction uniqueness, settlement replay and occurrence-time provenance. Single-session harness does not prove multi-connection lock scheduling. |
| Backend tests | Entire Jest: 156 suites / 1061 tests PASS on final pagination head (original implementation1058 plus3 pagination regressions); focused payment subset 271 tests. Build, Prisma generate and endpoint authorization audit PASS (260 endpoints, implicit 0). |
| Frontend tests | 380 unit tests / 95 files PASS; build includes tsc --noEmit PASS. 28 Chromium browser scenarios PASS: bank 8 (seven widths plus real method-selector POST), PayOS 2, VNPay 16, membership 2. No separate lint/typecheck npm scripts exist. |
| Stitch/browser/a11y | Stitch project 18116946755394055085, screen d4b5c0fc57c24ea9aa6e17379968d3ea generated/reviewed before UI. Project-native tokens retained; invented shell/security claims rejected. Screenshots visually inspected at 320/390/1440; all seven widths checked overflow, 44px controls, focus, QR corners/center unobstructed, console/network guards and support never PAID. Chrome DevTools MCP unavailable due existing profile lock; real Playwright Chromium used. Synthetic QR browser fixtures test presentation, not live bank scanning. |
| Workspace checks | npm.cmd run test:contracts PASS (ok true, diagnostics empty, SPR25-007 blocked); npm.cmd run test:workspace PASS; git diff --check PASS. Initial npm invocation was blocked by PowerShell script policy; npm.cmd ran without policy changes. |
| PR/CI/merge/remote main | [Backend PR #10](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/10) merged as 1c7c6fcc47f619dad9031f652453bf1ef26459c1 after [PR CI](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39740159669) SUCCESS; remote main exact SHA and unchanged tree verified. [Main CI](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39740476584) SUCCESS; deployment inventory 0. [Frontend PR #18](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/18) merged as 67335effd9b9b9e849cb468d09d347b0f3b35ff3 after [PR CI](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/39740285480) SUCCESS, including PWA and 28 checkout browser scenarios. Exact remote main/tree verified; [main CI](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/39740995832) SUCCESS, deployment inventory empty. |
| Branch cleanup | Backend feat/payw-01-manual-vietqr deleted remote/local after exact main SHA + main CI SUCCESS; ancestry check and empty unique-commit list verified, refs pruned, local main clean. Frontend feature branch also removed remote/local after mainCI39740995832 SUCCESS, exact main SHA and no unique unmerged commits verified; refs pruned and local main clean. Workspace implementation branch removed after mainCI39741197246 SUCCESS. |
| Deployment safeguards | Independent reviewer ran node --test scripts/production-deployment-gate.test.cjs: PASS 3/3 Backend and 4/4 Frontend; coordinator also observed RED 3 then GREEN 3 each: workflow_dispatch only, explicit boolean approval defaults false, main-only deployment and skipped deploy notifications. Vercel git.deploymentEnabled.main=false also blocks automatic main deployment while preserving feature previews. Official reference: https://vercel.com/docs/project-configuration/git-configuration . No production deployment authorized. |
| Production acceptance | BLOCKED_EXTERNAL; none claimed |

Preserve pending facts until observed. Keep raw official statements/secrets out of Git; sanitized synthetic evidence or approved opaque references only. Historical PAYW-00 cleanup evidence is updated; AI-DOS canonical financial records are unchanged.

## Additional verification and review

- Multi-connection PostgreSQL CI uses pgvector/pgvector:pg16, two independent Prisma clients, strict localhost/eduai_payw_ci/empty-schema guard and no dotenv. Tests request/support replay, same-actor and distinct approvals, transaction collision across orders, canonical replay and five cancel-vs-approval races. Syntax and refusal without test configuration verified. Real CI runtime PASS: Backend run 39740159669 job 119695167202, head fedbb014952a426b81dd8f73e478749a0cfee775, all six scenario groups plus five race iterations; overall Backend PR CI PASS.
- Self/independent reviews corrected missing provider POST body, zero-payable selection bypass, immutable approval no-op update, idempotency resource constraint, production projection/fulfillment guards, statement custody/detail, scheduler actor attribution and QR quiet zone (4 modules).
- No credentials or raw statements entered Git; synthetic-only migration receiver constraint. Live-bank account ownership/receiving authority is not verified.

## Existing dependency audit findings

No dependency or lockfile change. Full Backend audit: 53 findings (38 high, 11 moderate, 4 low); omit-dev: 11 (3 high, 7 moderate, 1 low). High chain is existing Prisma CLI/config -> deepmerge-ts override 7.1.6, GHSA-ggr8-5vv4-36mx. npm explain and source search show configuration/build/migration use, no application source import of affected merge function. Deferred from this sandbox feature; review and remediate before any future production activation.

Full Frontend audit: 14 (8 high, 6 moderate) in existing development/build tooling; omit-dev: 2 moderate, zero high/critical (react-router). These are recorded limitations, not a clean full audit or production PASS.

## CI remediation receipts

- Backend run39739686376: new PostgreSQL job initially lacked test JWT config during Prisma postinstall. Added CI-only values, no secret changes.
- Backend run39739947000: real DB rejected synthetic order number length41 against varchar40; fixed fixture to36 characters. No financial schema weakening.
- Frontend run39739313880: membership fixture missed new GET methods mock and runtime guard caught proxy500 at both widths. Reproduced RED2, fixed fixture only; exact local CI command GREEN28/28, PR CI rerun39740285480 SUCCESS.

## Retained visual artifacts

[320px QR viewport](evidence/checkout-320.png), [390px QR viewport](evidence/checkout-390.png), [1440px overview](evidence/checkout-1440.png). Synthetic test records only; these images verify presentation, never receipt of money. Full CI screenshots are attached by the payment browser job.

- Workspace source PR [#7](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/7): conformance run39740016337 SUCCESS before final receipts; current-head CI must pass before merge.
- Final independent Workspace review corrected support status distinction and replaced misleading admin-UI wording with actual controlled API/runbook scope. No unresolved blocking source findings.

## Final operation review followup

Backend [PR #11](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/11), head869b0d98689e40c9592bed49294d2371fda503fe, adds bounded validated pagination so older manual-review requests remain reachable beyond newest100. Four files, bank-transfer3 suites/24 tests and build PASS; authority denial before count/list checked. Current-SHA CI run39741814081 SUCCESS; merged as e4688c0cbe1bc323658a9ee30e10dd1ca2d752df, exact remote main/tree verified. Main CI run39742078025 SUCCESS; fix/payw-01-review-queue removed remotely/locally after ancestry and unique-commit checks, refs pruned, local main clean. Deployment inventory for final main SHA is0. Full final Backend156 suites/1061 tests PASS. No money/state/production activation semantics changed.

Workspace PR#7 merged as a67a812134211f492da1982df9325d6fbae48ebf, exact remote main/tree verified; push conformance run39741197246 SUCCESS. Feature branch removed local/remote after ancestry/unique-commit checks and prune. This docs/payw-01-closeout branch records final followup; its own final review/CI/merge/cleanup receipt is tracked in [Workspace PR#8 timeline](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/8), which is authoritative for that self-referential final documentation lifecycle. No final-doc merge SHA is predicted here.

## Terminal disposition

Backend main e4688c0cbe1bc323658a9ee30e10dd1ca2d752df and Frontend main67335effd9b9b9e849cb468d09d347b0f3b35ff3 verified remotely, all corresponding PR/main CI SUCCESS, all source feature/fix branches deleted local/remote. Workspace implementation main a67a812134211f492da1982df9325d6fbae48ebf and mainCI39741197246 verified; implementation branch deleted. Both source-repository final-SHA deployment inventories are empty.

Safe technical implementation and synthetic validation are delivered. PAYW-01 overall remains BLOCKED_EXTERNAL for PAYW-D01/D08 and independent SPR25-007/live authorization. No production PASS/GO-LIVE, deployment, production DB action, real transaction or PAYW-02. Last documentation PR#8 must be checked for its own final CI, remote-main verification and cleanup receipt.
