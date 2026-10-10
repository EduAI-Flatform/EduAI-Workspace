# VNPay Sandbox remediation and real-site UAT â€” 2026-10-09

Status: WAITING_MANUAL (actual local IPN delivery only). One actual Sandbox payment, signed QueryDR reconciliation, reload persistence and exactly-once fulfillment passed locally.

## Remote baseline

- Backend main: `0b657be723f6adfb2b14458e44ac7462ef127be3`; Draft PR [#7](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/7), original head `62ed78f5272a2edd558c547f4f34cceefaed4d29`.
- Frontend main: `46f0fb6dffbb56783dc012b0aab426661ed60861`; Draft PR [#17](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/17), original head `075304b848384857bfb8407f63c420ea0fc32a99`.
- Workspace main: `723bb0e4bd65036c2f9ef98a36c016d74080a472`. Existing unrelated local Workspace edits preserved.

## Root causes and remediation

Backend main omitted `payment.provider`; Frontend requires the authoritative `payos | vnpay` field. PR #7 supplies the canonical DTO for create/status/pending. Added pending-page regression coverage for both providers.

Fresh adversarial review found delayed PAY signing used a different timestamp from QueryDR, and QueryDR applied its response-size limit after full allocation. PAY now uses persisted attempt `createdAt`, matching QueryDR; streaming cancels on exceeding 64 KiB. Historical attempts created before this fix may have approximate QueryDR dates and must not be assumed valid or manually repaired financially.

Frontend checkout retained prior presentation across attempt/order/provider changes. Regression tests now constrain retention to the same live nonterminal identity. Synced both current-main mobile header fixes. Return tests validate canonical backend order reads without assuming an exact StrictMode request count. Exact frontend deployment SHA is now checked and printed by the established deployment workflow.

## Sandbox runtime classification

Backend deployment run `37924197025` reached the VPS and checked out the exact baseline SHA, but failed during dependency installation because old-main environment validation rejected default VNPay in a production Node runtime. This establishes working inherited deployment credentials despite repository-secret listings reporting zero; direct local SSH remains unauthorized.

The reviewed deployment helper changes only `DEPLOYMENT_CLASS=uat` when existing configuration already selects VNPay Sandbox, `NODE_ENV=production`, the exact official sandbox payment/API URLs, the exact EduAI HTTPS return/IPN routes, and valid credential presence. Technical production validation remains enabled. Production-provider configuration is not changed. No secret values are logged.

## Verification so far

- Backend final revision: 153 suites / 1,036 tests; clean full suite, build/typecheck pass. Endpoint audit: 254 endpoints, zero implicit authorization declarations.
- Narrow UAT classification helper: eight tests pass; adversarial review: four focused suites / 78 tests pass.
- Frontend: 93 suites / 368 tests pass; build/typecheck pass. PWA Chromium/WebKit checks include 320, 375, 390, 412, 768, 1024, 1440 widths. VNPay browser suite passes after the StrictMode assertion fix.
- Frontend final head `a3488f5` (including required VNPay browser CI scenarios): all required CI checks pass. Required production audit gate (`high`) passes after compatible gRPC override `1.13.7`; two moderate React Router findings remain.
- Backend final PR head `cd8456d43ed2b0a2688ef75cdf12fc02dee07658`: expanded VNPay/IPN/QueryDR/env/bounded evidence CI passed; PR #7 merged to `c4dfcf31f9b64c20333f082f29c83f41ffc972fc`. Temporary branch deleted locally/remotely; local main synced. Exact merge deployment run `37926854921` is in progress.

## Dependency risk assessment

Frontend remaining advisories: `GHSA-wrjc-x8rr-h8h6` (backslash open redirect), `GHSA-337j-9hxr-rhxg` (SSR hydration constructor injection). This app is a client-rendered Vite SPA; no SSR hydration deserialization is used. VNPay navigation uses exact trusted HTTPS hosts; application router links use internal route targets. No required high-severity audit gate is bypassed. Review by 2026-10-23; framework migration is separate work.

Backend compatible patches update the vulnerable HTTP/upload/gRPC/proxy and YAML/lodash dependency paths. Remaining high finding `GHSA-ggr8-5vv4-36mx` is `prisma -> @prisma/config -> deepmerge-ts`: recursive object graphs supplied to merge can exhaust the stack. Prisma configuration is checked-in, operator-controlled tooling and does not accept runtime request objects; production uses PostgreSQL adapter. Avoiding a forced Prisma major/downgrade preserves ORM compatibility. Backend CI currently requires payment tests, PostgreSQL lifecycle regression, endpoint authorization audit and build, not an npm high audit gate. No configured gate is bypassed. Review by 2026-10-23.

## Real-site evidence

URL: https://eduai.giaoducso.org.vn/ . Existing demo learner authenticated through normal browser login; no password/session material retained here. Orders were read only. Designated historical UAT course (10,000 VND) is already owned, so a new transaction must use another eligible bounded product, without changing its price or existing entitlement.

This initial real-site inspection predates the user?s explicit scope change: keep the VPS on PayOS and test VNPay locally. No real-site VNPay transaction was created. The local acceptance evidence below supersedes the initial pending status. Real money used: NO. Production VNPay activated: NO.

Final merged SHAs, deployments, test order, settlement identity, timestamps, branch cleanup and acceptance verdict will be added after verification.

QueryDR now binds known TransactionNo to the recorded order/attempt collection settlement and rejects conflicting or ambiguous identities. Verified IPN runtime logging uses allowlisted facts only; a protected SSH evidence workflow inspects one exact order and reconciles only an already paid/fulfilled canonical Sandbox settlement, with no global scheduler/outbox bootstrap. Five safety tests pass. Fresh security review found no blockers.


## Deployment remediation follow-up

Merged Backend deployment run 37926854921 reached c4dfcf31f9b64c20333f082f29c83f41ffc972fc but failed before restart at MIGRATION_PREFLIGHT_STATE_DRIFT. Read-only protected diagnostic run 37927655724 at 2026-10-09T12:04:25Z verified all hardened schema booleans true, source keys complete, structural invalid counts zero, exact legacy marker matched; legitimate cases grew 7 to 8, orders 7 to 9, attempts 5 to 7. Already-applied migration checks incorrectly pinned historical counts. Follow-up PR #8 permits legitimate applied-state growth while retaining strict initial baseline, role/ledger/checksum/schema/marker/source validation and full current financial before/after equality. No manual financial changes or migration reapplication. Fresh review passed; full gates underway.


Follow-up PR #8 merged after 153 suites / 1,036 tests, typecheck, build and expanded CI passed. Backend final candidate main: 401ed21491f90265b3ae1e7dbdb7527a61cd4f7c. Merged remediation branch deleted locally/remotely and main synced. Exact deployment run 38013739391 is underway; acceptance is still pending runtime/browser verification.


## User-directed local Sandbox acceptance ? 2026-10-10

The user explicitly changed VNPay UAT to local because the VPS uses PayOS. Acceptance URL: http://127.0.0.1:5173/ . The public website was not used for VNPay payment acceptance. Backend production configuration file was inspected through protected read-only diagnostic run 38014055857: defaultProvider=payos, vnpayEnvironment=sandbox, payosEnvironment=production. This is file-configuration evidence, not an independent PM2 environment dump.

The repository .env points at shared Neon data, so the local test deliberately overrides it in memory. All 61 migrations were applied to a separate persistent loopback PGlite database on port 55432. Only existing minimal learner/instructor/course fixtures were seeded; initial orders/events/settlements/enrollments/access grants were zero. No live database writes, price changes, forged IPN, direct paid-state mutation, or manual fulfillment were used. Local helper scripts are under workspace .vnpay-local and are not committed.

A callback-only HTTPS tunnel exposes GET /payments/return (redirects to local UI) and GET /api/v1/payments/webhooks/vnpay (forwards to local backend). All other paths return 404; authentication, application pages, and data APIs remain private. VNPAY_IPN_URL alone does not register the merchant callback at VNPay. No actual IPN reached the local endpoint as of this record; merchant Sandbox IPN registration is pending.

- Order ID: 43fc8870-3500-4d6f-9445-428616cf3786.
- Order number: EDU-MV1QNTO3-71D70381.
- Payment attempt: 4ae4b435-cc4f-4284-8ffb-dcce83e2f39a.
- Provider: vnpay; amount: 1,499,000 VND (existing minimal fixture price).
- Server creation: 2026-10-10T01:51:50.339Z; TxnRef: 2235038661294228.
- Before redirect, browser network response confirmed canonical server IDs, provider=vnpay, status=PENDING, and HTTPS sandbox.vnpayment.vn checkout URL.
- Exactly one actual hosted Sandbox payment completed with the official public NCB test card/OTP supplied by the user. Provider transaction: 15700786; provider pay date: 20261010085331 (Asia/Ho_Chi_Minh).
- Browser returned through the callback gateway. Before reconciliation, UI stayed pending despite return success parameters: backend state remained authoritative.
- Existing internal recoverVnPayAttemptForLifecycle queried the real Sandbox API, verified its response signature and merchant/reference/amount identity, and returned trusted=true, queryRequestStatus=success, transactionStatus=paid, responseCode=00, transactionStatusCode=00, amountMinor=1499000. The canonical webhook/fulfillment chain produced confirmed/paid/fulfilled state.
- Read-only database verification at 2026-10-10T01:59:22.133Z: exactly 1 order, 1 payment event, 1 settlement, 1 fulfillment effect, 1 learner enrollment, and 1 access grant. Settlement c989d911-d2b7-4172-8318-b9b2e55637f8 links the exact attempt and provider transaction 15700786.
- Browser reload of the clean return URL showed backend-confirmed payment; course reload showed enrolled with 1 learner and Continue Learning. No console errors/warnings on the final course page.
- An immediate second QueryDR received an invalid/missing response signature and was rejected without changing the paid state or duplicating fulfillment. No unsigned response was accepted. Official VNPay documentation limits duplicate queries within five minutes: https://sandbox.vnpayment.vn/apis/docs/bang-ma-loi/ . A spaced repeat at 2026-10-10T02:03:30Z passed: HTTPS 200, signed response 00, trusted paid status, matching transaction 15700786 and amount 1499000; financialRowsUnchanged=true and all six canonical/access counts remained 1.

## Merges and deployment updates

Backend PR #7 and follow-up #8 merged; exact runtime source revision 401ed21491f90265b3ae1e7dbdb7527a61cd4f7c verified in successful deployment run 38013739391. Health/readiness and migration postflight passed; financialRowsChanged=0. Both merged branches were deleted locally/remotely.

Frontend PR #17 merged to 98eb24582e871c8147d97ba01747ccf45cf5dc81 after all required checks passed. Its feature branch was deleted locally/remotely and local main synced. Exact-revision production deployment run 38015196373 and every post-merge CI check passed. Runtime deployment log at 2026-10-10T01:59:07.715Z recorded the exact SHA; public website HTTP 200. Provider selection remains backend-authoritative, preserving PayOS on the VPS.

Backend PR #9 contains only a protected enum-only configuration diagnostic already used above; fresh adversarial review found no security blockers. PR #9 merged to final Backend main 849d4ac4b89f4e0eb5a5dcdfc41ed5e562a92982 after CI passed; branch deleted locally/remotely. Deployment run 38015384977 passed, recording the exact SHA at 2026-10-10T02:02:04.298Z, financialRowsChanged=0, and successful restart/readiness at 2026-10-10T02:03:17.384Z. No merchant identifiers, passwords, signatures, session tokens, or secret-bearing environment output are retained here.

Remaining external acceptance blocker: configure the merchant Sandbox IPN callback to the currently running callback-only local tunnel, then verify actual provider delivery/retry for transaction 15700786. A text clarification is pending with the user; no merchant portal account/session is available in the established setup. No second payment has been created. The tunnel URL is temporary and valid only while the local tunnel process runs. Do not report full IPN acceptance or real-site VNPay UAT as PASS.
