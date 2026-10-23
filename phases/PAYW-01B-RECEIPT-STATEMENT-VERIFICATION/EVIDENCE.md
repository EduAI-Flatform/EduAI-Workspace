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
