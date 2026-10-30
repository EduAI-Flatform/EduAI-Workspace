# PAYW-01B-UAT - Direct environment continuation (2026-10-30)

Status: BLOCKED_EXTERNAL (GitHub workflow dispatch, VPS access and backup verification). Public payment remains NO-GO.

## Owner decision and current scope

The owner explicitly authorizes using the existing EduAI website/API and Neon project `muddy-term-45367509`, branch `br-late-flower-aoj42wzx`, database `neondb` for this UAT. Do not create a staging project, database, VPS or domain. The older separate-staging prerequisite in UAT-20261030.md is superseded for this continuation only.

The owner also explicitly authorizes deploying the tested Frontend main via the existing CD workflow, preserving runtime configuration and payment guards. This does not authorize real-money collection, provider activation, forged bank evidence/IPN, force-PAID, GDS, a NODE_ENV change or bypassing production receipt restrictions. Before any test-data write: verify current backup/recovery, exact target, test identities and bounded impact. Stop only the unsafe/dependent action when those facts are unavailable. Existing financial rows and real-user entitlements must remain untouched.

The owner subsequently explicitly authorized using demo learner/Admin credentials already in Backend `.env` for normal EduAI sign-in. No credential value is retained in this dossier.

## Reconstructed baseline and prior report lifecycle

- Backend main: `dccb4db7d1e80b92ac7bfae177ef83c5e110b2d0`; Frontend main: `0a270830430b3d9ce8c5686e8556a7236732ca63`. Both fetched, clean and already current; no new application implementation or repeat of passed test suites.
- Workspace PR [24](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/24) was already merged by the time this continuation inspected it, at `f235c38cf43a103b9dc37084a0996e7f85ca3f9b`. The previous 29 screenshot files and report matched the accepted branch contents exactly.
- Exact main [CI 41000095167](https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/41000095167), job `123882232474`, contract/layout steps success. Old local and remote `docs/payw-01b-uat-20261030` removed after integration verification; stale refs pruned. New continuation branch: `docs/payw-01b-direct-uat-20261030`.

## Runtime and deployment evidence

- Website GET continues to return HTTP 200 with `/assets/index-DLMGz8QZ.js` and `/assets/index-BCYXaNhl.css`.
- API `/health`: `success:true`, status `ok`, Redis `ok`.
- Read current Backend [CD 40994679159](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40994679159), deploy job `123865377616` logs via the GitHub connector: `deployedBackendSha: dccb4db7d1e80b92ac7bfae177ef83c5e110b2d0`, PM2 `eduai-backend` online, `migrationApply: SKIPPED_ALREADY_APPLIED`, `migrationPostflight: PASS`, `financialRowsChanged: 0`, `runtimeRoleLeastPrivilegeReady: true`. These facts are from the 30/10 CD timestamp, not a new VPS shell observation.
- Direct read-only SSH using existing `tino-vps` alias, BatchMode and strict host verification, failed `Permission denied (publickey,password)`. No password guessing, key extraction, secret inspection, restart or migration retry.
- Frontend exact main [CI 40055135195](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/40055135195) success; there is no CD run for that SHA in the observed run list. Latest recorded successful Frontend deployment remains [38015196373](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/38015196373), `98eb24582e871c8147d97ba01747ccf45cf5dc81`. Current exact serving filesystem SHA cannot be inferred solely from the bundle URL.
- Actual demo Admin sign-in succeeded in a separate browser context. Opening `/admin/dashboard/receipt-review` renders Admin navigation plus `Trang chua kha dung` / route unavailable; navigation lacks the receipt-review entry. This is direct authenticated runtime evidence of the missing PAYW UI, in addition to the old bundle/deployment evidence.

Frontend CD is explicitly authorized and pending normal GitHub Actions dispatch access. The connected GitHub toolset supports PR/checks/logs but exposes no workflow-dispatch operation. GitHub CLI v2.103.3 was downloaded from the official cli/cli release into temporary storage, verified against the official release SHA-256 `98d0cfa794721665d7973dd728c78aff7bd836d58f10f6d7a03568eccb0a22e0`. CLI `auth status` reports no logged-in host; a standard device-login handoff was started. It did not read credential helper or tokens and did not change the existing Git credential configuration. Device codes are intentionally omitted here.

## Read-only database verification

A one-off Node/pg probe used only the existing local Backend DATABASE_URL, without printing that URL or password. It refused targets outside Neon/neondb, connected with existing TLS settings and ran `BEGIN READ ONLY`, SELECTs and ROLLBACK only. No application startup, seed, migration script or DDL was invoked.

Observed connection: endpoint `ep-soft-morning-aopvsb1x-pooler`, database `neondb`, `transaction_read_only=on`. This is a **local configuration connection**, not proof that VPS PM2 uses the same URL or that the endpoint maps to the owner-named Neon project/branch. Local NODE_ENV is development, bank/receipt sandbox flags false; these are not production environment assertions.

| Migration | Finished | Rolled back | Steps | Checksum |
| --- | --- | --- | --- | --- |
| 20261023010000_add_bank_receipt_claims | yes | no | 1 | ff4c6807b7be7a0caf95acdeb347bca28024b9545ea93fe113c17bc68e740571 |
| 20261023020000_add_receipt_access | yes | no | 1 | f6533ebc1f4d6c1cdcad9f3a3f3d498bd84f639171be65f00607ccb1890f85d1 |
| 20261023021000_add_receipt_quota_pools | yes | no | 1 | 4a3b322c2c8a219138126326839dcd09406e7a3b2c92b65abb2a346449646703 |

The preceding report records two retained Neon snapshots on 26/10 and 30/10, but this continuation has not revalidated snapshot availability, recovery procedure/window or endpoint-to-branch mapping. No restore was performed; creating a staging branch is expressly excluded. A Neon connection has been requested using the available integration. Until backup/recovery and exact target are established, no commerce/order/receipt/entitlement test write is permitted by this continuation's own preconditions.

## Browser and actual account observations

- DevTools initially recovered and listed an existing blank page. No second Chrome process with a locked profile was launched, profile/cookies were not cleared, and no auth cookie/token was read.
- Native access to the already-open Chrome window timed out at tool approval; browser extension access host still reported unavailable. DevTools is a distinct working path, not proof of native-relay repair.
- Normal form login using owner-authorized demo learner values from `.env`: success; authenticated membership and order-list views observed. The existing history includes eight orders, zero pending, both expired/cancelled tests and previously confirmed course/membership UAT purchases. Those records are historical evidence only and were not altered. Existing paid records must never be used as disposable reset fixtures.
- Membership page shows a dedicated UAT membership, expired on 09/10/2026, one-month price VND 20,000, unchecked benefits acknowledgement and disabled Continue button. No checkbox, checkout or payment action was submitted.
- Normal demo Admin form login: success in isolated browser context `eduai-payw-admin-uat`. Receipt route missing as above. No Admin role change or privilege bypass.
- A read-only order-detail click was rejected by automatic approval review, which did not accept the snapshot/action context and required backup/test-data proof. No retry through an alternate route was made. Later source inspection confirms initial OrderDetailPage load uses getOrder/status, with createPayment in a separate handler; no live detail-navigation result is claimed.
- At the end of the initial observation sequence, DevTools screenshot/snapshot calls stopped returning promptly. Bounded orchestration was terminated; no browser process or profile was killed. Do not report browser availability as continuously stable.

## Responsive boundary

A native resize request for 320px actually returned innerWidth=500, so it is **not** 320px evidence. Device emulation then confirmed course innerWidth/client/scroll = 320/320/320 and membership = 320/320/320; membership Continue remained disabled. A full live course screenshot was inspected in-conversation. Screenshot persistence was blocked by the browser tool's configured filesystem roots and read-only Node runtime; no fake image or fixture is relabelled as a live screenshot.

Actual authenticated seven-width checkout/receipt/Admin UAT remains NOT RUN. The already-passed seven-width synthetic screenshots remain only in the prior fixture dossier. No responsive PASS for all requested live flows is asserted from two 320px observations.

## Current acceptance

| Flow | Direct environment result |
| --- | --- |
| Learner normal sign-in, membership/history reads | PASS, observed UI only |
| Admin normal sign-in | PASS, observed UI only |
| Course checkout / VietQR / membership checkout | NOT RUN end-to-end; write preconditions and latest Frontend deployment pending |
| Receipt upload / OCR | BLOCKED: deployed receipt surface unavailable; production guard retained |
| Access grant/revoke/restore/quota | BLOCKED: no test entitlement mutation; protected production policy retained |
| Admin receipt / persisted receipt audit | BLOCKED: route unavailable on serving Frontend |
| Responsive full requested matrix | NOT RUN live; partial 320px checks above |

The code's development/test-only bankTransferEnabled and receipt/early-access allowlists remain intact. No deployment alone will turn those production-denied capabilities into PASS, and this UAT must not change NODE_ENV or enable flags to evade them.

## Remaining actions

1. Finish standard GitHub CLI login, dispatch existing Frontend CD on exact tested main with authorize_production=true, watch CI/deploy, read deployedFrontendSha and recheck served assets/PAYW routes. Preserve .env.production and all payment controls.
2. Restore permitted VPS read access for actual HEAD/PM2/runtime identity checks; no redeploy of already-current Backend is needed.
3. Connect Neon read-only access, verify exact owner-named branch/database and existing snapshot/recovery capability. Classify demo records without publishing private IDs, then permit only scoped test writes with no impact on existing financial/paid records.
4. Resume authenticated learner/Admin read checks; where production guards deny receipt/access, retain explicit BLOCKED rather than engineering around the policy.
5. Complete normal Workspace PR/check/merge/main verification and branch cleanup for this continuation. Overall PAYW-01B-UAT is not DONE; public payment NO-GO and SPR25-007 remain unchanged.
