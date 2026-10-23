# PAYW-01B observed evidence

## A — source audit and executable claim contract (2026-10-23)

State: A DONE (safe source contract). No B–F completion claimed.

- Clean local main in all three repos, no unique unpushed commits; fast-forward sync preserved Workspace PRs #10/#11. Exact baseline and production HTTP limits: SOURCE-CONTRACTS.md.
- New pure Backend policy: default-OFF synthetic buyer allowlist, production/staging refusal, exact bank/payee/account/amount/content/explicit-time match, optional transaction code; all assessments financialProof=false. No endpoint or data mutation. CI existing bank-transfer test path includes new tests.
- TDD: new spec first failed TS2307 (missing policy module); then 20 tests passed, adversarial review added 5 date/payee regressions; 25 new tests PASS. Review approved after rejecting impossible dates, future timestamps and normalizing Vietnamese payee characters. This is field matching, not image-forgery detection or OCR integration.
- Baseline full unit tests initially 155 suites/1064 tests PASS and 1 test FAIL due Windows CRLF on immutable bank migration. Git index LF/worktree CRLF confirmed. Added .gitattributes LF rule and restored local LF bytes; exact approved SHA256 C26538AF0A17D8F1CEE9CE78FC974141ADF50C13E55E79356D8372D661A80244. Staged diff has no SQL modification and no reviewed hash modification. Focused preflight 16/16 PASS.
- Final full Backend: 157 suites / 1090 tests PASS, build PASS, endpoint audit 261 endpoints / zero implicit authorization PASS.
- npm audit --audit-level=high: FAIL, 53 existing findings (4 low, 11 moderate, 38 high); no dependencies changed by A. --omit=dev: 11 findings (1 low, 7 moderate, 3 high), high chain Prisma/@prisma/config/deepmerge-ts; CLI/config tooling path, no new route or untrusted config ingestion in A. Not waived for GO-LIVE. Reassess before upload integration/release; broad major-version upgrades were not silently applied.
- Workspace test:contracts PASS (330 records, canonical SPR25-007 still blocked); test:workspace PASS; diff --check PASS. Canonical .ai-dos unchanged.
- Stitch MCP generated bounded Admin screen 2d7844baf0b949a79fee93d0f561b95b in project 18116946755394055085. Review rejects invented provider integrations; see UI-STITCH.md. No browser responsive/a11y PASS is claimed.
- Backend commit 87cb46dba5e25e3aec23923b70d25f05b03d6d94, PR https://github.com/EduAI-Flatform/EduAI-Back-End/pull/14; CI run 39913473662 observed in_progress. No merge/main/branch-cleanup claim yet.
- Owner now confirms incoming company MB app-only view and self-managed reconciliation operations; Admin verification UI remains in scope. New bank adapter deferred, existing two-approver guards preserved.

## Runtime configuration and UAT limits

A introduces no live env change or new public route. Policy reads BANK_RECEIPT_SANDBOX_ENABLED (absent/false disables), BANK_RECEIPT_SYNTHETIC_BUYER_IDS (comma-separated isolated synthetic UUIDs), and existing BANK_TRANSFER_SANDBOX_ENABLED. They are future integration configuration, not an activation procedure; setting them alone does not create an upload API. Do not edit production .env or scan a real-bank recipient preview for synthetic checkout tests.

Current website has no newly implemented receipt-upload/Admin queue/full-access flow. Do not transfer real money to test A. Unit matching can be exercised with npm test -- --runInBand modules/payments/bank-transfer-receipt-policy in Backend with NODE_ENV=test. Full website instructions follow only after B/D/E runtime implementation and seven-width verification.

### A terminal receipt

- Backend PR #14 merged at f01dbdc21775c4f7d963766e72ec39c1695139a4; exact remote main verified. PR CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39913473662 success. Main CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39913721977 success (quality and real PostgreSQL concurrent transactions).
- Workspace PR #12 merged at e16fe6a727530c3b513c36fb1312d5e0d2c134dc; exact remote main verified. PR CI https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/39913688616 success; main CI https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/39913819833 success.
- Verified both PR heads are ancestors of local/remote main. Remote and local branches feat/payw-01b-claim-policy and docs/payw-01b-a-contracts deleted; stale refs pruned. Frontend unchanged at 67335effd9b9b9e849cb468d09d347b0f3b35ff3.
- Next eligible: B secure image/OCR pipeline. C new bank adapter deferred by owner; Admin review remains required. Runtime/deploy/GO-LIVE remain unverified/no-go; existing audit findings recorded above.

## B — secure receipt source (2026-10-23)

State: VERIFYING, not DONE. Backend PR #15 https://github.com/EduAI-Flatform/EduAI-Back-End/pull/15, commits ec8c0b7 (image/private storage/local OCR) and 0a63c2d1357dd41b840e9bca361ee9e562636881 (claim SQL/API/retention/audit). Backend #15 merged at3879a918e8e50e2028966040bdf1b53764d8d3f4; post-merge concurrency CI failed, so no cleanup/DONE claim. Corrective PR #16 pending.

Implemented: JPEG/PNG MIME+magic+actual decode, input<=5MiB,12MP/8192px bound, metadata/trailing-payload stripping, original/canonical hashes; private UUID-only no-store image retrieval with owner/Admin checks; upload6/hour+DB max3/order, order locking/serializable retry/idempotency/replay; strict local OCR; immutable nonfinancial assessment records,5-minute interrupted-job lease, expired/cancelled/buyer-disabled recheck;24h image retention and independent minute cleanup20/batch; audit without raw OCR text or object paths. All new capabilities default OFF and refuse production/staging. Payment/order fulfillment, verified financial ledger and entitlements unchanged.

Observed verification:

- Full Backend163 suites/1187 tests PASS;53 PGlite SQL tests PASS (11 receipt +42 existing bank settlement); build PASS; endpoint audit267/zero implicit authorization PASS.
- TDD recorded initial missing-module failures; actual ancestor-symlink exploit reproduced1FAIL/8PASS, fixed to9PASS. Independent review approved isolated synthetic source after ownership/mode0700/per-user private root fixes. Windows storage depends on OS-user temp isolation; no production storage adapter is claimed.
- Real local OCR smoke PASS: synthetic image rendered in memory; confidence94, seven exact fields, warnings empty. Initial engine failure diagnosed in Tesseract7.0.0 object-language initialization; use explicit local language names/path, no network fallback, bounded host worker.49 OCR regression tests PASS. Script scripts/test-bank-receipt-ocr.cjs reproduces this with caller-supplied vetted local models; it never downloads assets or creates DB/payment records.
- Official tessdata_fast models fetched as public software assets into local temp only (no receipt uploaded): eng SHA2567D4322BD2A7749724879683FC3912CB542F19906C83BCC1A52132556427170B2; vie SHA25679DF64CAF7BCFB2A27DF5042ECB6121E196EADA34DA774956995747636D5BFA1. No model binary/customer image committed.
- Four genuine receipt race scenarios added to existing PostgreSQL CI script: same-key one claim; competing uploads max3; canonical-image cross-order collision; scoped transaction replay one match/one review. Script syntax and refusal without explicit disposable test DB verified; local real PostgreSQL race PASS is NOT claimed.
- CI run39917211275 https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39917211275: workflow endpoint reported success while head check-runs/job endpoints still reported queued/null and PR mergeable_state unstable. Treat per-job gate as pending, do not merge from the overall workflow label alone. Await consistent authoritative success/log evidence; no check override/re-run/bypass performed.
- Audit install output remains53 existing findings(38high); no new reported count. New dependencies pinned sharp0.35.5 and tesseract.js7.0.0; npm resolver also updated semver patch. No framework/toolchain major upgrade or financial release waiver.
- Backend handoff docs/handoffs/payw-01b-receipts.md records exact flags, private model/storage setup and synthetic API/OCR UAT. No .env runtime/production migration/deploy/real financial operation performed.

## Next dependencies and scope

C retains incoming-source/two-Admin compatibility checks; owner operates bank app manually and no new adapter is planned. Admin review UI is still required. D full unverified course/membership access and exact revoke/restore/verified conversion are not implemented. Design audit found membership quotas are per grant ID: restore/conversion must share a logical order-line/definition consumption pool across generations or would incorrectly refill consumed benefits. Existing access and membership emergency-revocation paths must be covered. E upload/Admin UI, seven widths/a11y and F complete integration/financial regressions remain pending. Do not mark PAYW-01B complete from A/B source alone.

### B post-merge recovery (observed)

Direct check/job detail endpoints eventually confirmed PR15 quality and PostgreSQL jobs success; log showed all4receipt scenarios PASS and PAYW_POSTGRES_CONCURRENCY=PASS. PR15 merged at3879a918e8e50e2028966040bdf1b53764d8d3f4; remote main matched. Main CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39917816349: quality success; PostgreSQL job120295511825 FAILURE on receipt transaction-code collision with DriverAdapterError/TransactionWriteConflict. First3receipt scenarios passed. This is a genuine post-merge failure, not only stale metadata.

Installed @prisma/adapter-pg maps SQLSTATE40001 to structured cause.kind=TransactionWriteConflict; the receipt service only recognized PrismaP2034. Added regression reproducing2FAIL/21PASS, then fixed structured-driver recognition with3attempts, safe exhausted-conflict response, P2002 duplicate handling preserved and unrelated errors not retried. Final local163suites/1190tests and build PASS. Independent review approved; actual failing PostgreSQL scenario now repeated3times with distinct images/transaction IDs and strict one-match/one-review assertions.

Corrective Backend PR16 https://github.com/EduAI-Flatform/EduAI-Back-End/pull/16, commit9809160e44e6e12028b453b5b6e6eaec29ed7879; CI not yet accepted here. Branch feat/payw-01b-private-receipts retained temporarily because mandatory post-merge main CI failed; branch fix/payw-01b-receipt-conflicts remains active/unmerged. These branches must be cleaned after corrected remote main and required CI pass. No gate bypass, blind rerun, D implementation or production operation performed.

### B terminal recovery receipt and C compatibility checkpoint

- Corrective PR16 CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39918863756 success; direct job log shows the previously failing transaction replay scenario PASS3times plus whole payment harness PASS. Merge b13ec5f3560a461380feda2aab35b90330bb4d93.
- Exact remote main b13ec5f3560a461380feda2aab35b90330bb4d93 verified; post-merge CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39919310014 both quality and real PostgreSQL concurrency success (direct check IDs120300416471/120300415982). Prior failure at3879a91 is resolved by source change, not hidden or rerun as success.
- Verified PR15 and16 heads are ancestors of corrected main; remote/local feat/payw-01b-private-receipts and fix/payw-01b-receipt-conflicts deleted; refs pruned. Final local163suites/1190tests and build PASS. No financial status/entitlements created by receipt-only races.
- B safe Backend source complete. This Workspace receipt is PR14; its CI/main/cleanup must finish before D. Frontend still unchanged at67335effd9b9b9e849cb468d09d347b0f3b35ff3.
- C reduced scope per owner: verified compatibility of unchanged statement source requirement, exact account/amount/reference/time/transaction evidence, active allowlisted Admin and two distinct approvers through existing42SQL/CI regressions. No new ingest adapter or one-operator override. This completes source compatibility only; actual company MB viewing authority, trustworthy incoming-record custody and live legal/financial release gates remain OPEN. Admin checking surface remains E requirement.

### D source implementation under verification

Backend PR17 https://github.com/EduAI-Flatform/EduAI-Back-End/pull/17; commit1694690202f718f097036df8797aee0b41b30fb3. Adds synthetic full-course/membership access, immutable generation/effect/event ledger, exact revoke/restore, canonical conversion and order-line service quota pools. Admin HTTP checks and reasons are implemented; browser UI not yet implemented. Existing financial proof and dual approvals retained. Actual .env untouched; production operations not performed.

Observed local full run165 suites/1224 tests PASS before final targeted additions; targeted access/upload/membership/fulfillment suites PASS after additions. New SQL PGlite15cases PASS. Prisma validate/build PASS. Endpoint audit271/zero implicit PASS. CI run39923238549 pending at this record, includes new actual PostgreSQL two-client grant/revoke/restore/payment races plus shared-pool final-unit race. No merge/main success or branch cleanup asserted until observed. D remains VERIFYING; E/F not complete.
D PR17 CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39923238549 both quality/PostgreSQL success. Direct PostgreSQL job120313278635 log confirms same-pool final-unit race, concurrent full grant, revoke/restore original window, real dual-approval payment versus revocation and PAYW_POSTGRES_CONCURRENCY=PASS. Expected serialization rejections are asserted and recovered, not suppressed. Final local165 suites/1227tests PASS. Merge f62ba2cdde2565baab718810a571ff725399faa3; fetched remote main matches and local main clean. Post-merge main CI and branch cleanup still pending at this entry; do not treat this paragraph as terminal D completion.
### D Backend terminal receipt

PR17 merge f62ba2cdde2565baab718810a571ff725399faa3 verified on remote/main and local/main. Post-merge CI https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39923596056 quality job120314456901 and PostgreSQL job120314457307 success on exact merge SHA. Verified PR head1694690 ancestor of remote main, deleted remote/local feat/payw-01b-unverified-access and pruned refs. Backend worktree clean. D synthetic Backend source complete; Workspace receipt PR15 must finish CI/merge/main verification/cleanup before E. E/F UI/browser completion and production activation are not asserted. Final local165suites/1227tests PASS,15new SQL cases PASS, build/schema/endpoints PASS.