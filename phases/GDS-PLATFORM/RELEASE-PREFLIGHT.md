# GDS release preflight — 2026-11-12

The owner authorized continuing the GDS production release and clarified that the financial gate must not be used as a blanket blocker for this approved plan. `SPR25-007` applies to its existing financial activation scope; it does not prohibit GDS branding, account/authentication, configuration, profile, support or course source release.

The owner subsequently approved all remaining actions in direct response to the exact nine-table/17-column runtime matrix question, and additionally authorized deletion of tables/columns where needed to retain only used functionality. That deletion scope preserves the original purchased-access/balance/history invariants. The parent reviewed the same proposed helper against the explicit question, response and source matrix; automatic approval accepted that exact source patch after this evidence review. No indirect alternative was used to apply the previously rejected operation.

## Prepared release sequence

1. Verify final backend/frontend PR checks and immutable source heads.
2. Verify the now-approved exact runtime matrix below through positive/negative permission tests and the real PostgreSQL CI fixture. Prior rejection and subsequent parent-context acceptance are retained in this record.
3. Use the controlled backend release workflow, with all top-up/checkout/withdrawal admission actions left at `preserve`. Temporarily pause automatic backend deployment while merging the reviewed source, then dispatch the explicit GDS migration input and restore the prior auto-CD value after validation. No action has yet been taken on the repository variable.
4. Create a private server-local custom-format database backup, verify its archive listing and record only path/size/hash metadata. Do not upload database backups to CI artifacts.
5. Apply only the seven SHA256-pinned GDS migration artifacts through the isolated migration role. Require historical schema prerequisites, ledger agreement, repeat preflight and financial-history postflight checks. Unknown migrations remain rejected.
6. Apply only the approved minimal runtime grants, verify role separation and health, and restart/build the backend through its existing workflow. Existing policies remain unchanged; new card/point/affiliate settings default disabled pending Admin approval and effective dates.
7. After backend health and public/configuration checks pass, merge/deploy the frontend and verify actual GDS assets and responsive public behavior.
8. Verify merged main SHAs and post-merge CI, clean only merged temporary branches and record actual production evidence.

Actual deployment, backup, database migration, repository-variable change and runtime grants have not been performed during this preflight. Frontend code remains at its already-green PR candidate while backend release tooling is extended and tested.

### Observed source/CI evidence

- Backend release-tooling commit: `42a9eaf6c428c2f0726483e40b1eb9da52d736e1`, pushed to the existing backend PR #31.
- Local targeted release checks: 40 passed, two platform-specific Windows skips; syntax, YAML parsing and diff checks passed. Existing reconciliation/role Jest tests also passed (30 tests).
- Independent read-only review found no actionable defects in the backup/workflow scope; this review did not approve the rejected runtime grant change.
- [Real PostgreSQL CI replay](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43141371700) passed, including all schema upgrades, concurrent withdrawals and a real private custom-format backup of the disposable CI database. The archive was 1,647,861 bytes, with SHA256 `72a628371038c8f077e3f658a53c21f5b9e9c192cb712be23f926ac178c1d4d4`; archive listing validation succeeded. This is CI evidence, not a production backup.
- [Backend CI](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43141371721) passed the full source regression and new schema/backup safeguards; remaining legacy regression/build steps are still running at this receipt.
- `scripts/membership-runtime-privileges.cjs` remains unchanged from the prior candidate after the automatic grant rejection. No equivalent helper, raw SQL command or indirect privilege operation was executed.

## Concrete runtime permission decision

Automatic approval review rejected adding persistent grants without approval of their exact scope. The rejected helper patch was not applied, including indirectly. This is a database-permission approval boundary, not an application of `SPR25-007`.

Resolution: the owner approved the exact matrix after it was presented, and the parent successfully submitted the same source patch with the full authorization context. The matrix is no longer awaiting another human approval. Actual production application follows final CI, private backup and the controlled release workflow.

Recipient: the existing backend **application runtime database role**, identified internally from its configured connection. This is not a grant to anonymous users, browser accounts or PostgreSQL `PUBLIC`. The migration role remains separate.

| Table | Proposed runtime access | Purpose |
|---|---|---|
| `platform_policy_revisions` | SELECT, INSERT; UPDATE only `status`, `approved_by_id`, `approved_at`, `effective_at` | Read configuration, create immutable versions and advance approved lifecycle |
| `platform_support_tickets` | SELECT, INSERT; UPDATE only `status`, `updated_at` | Owner/Admin support and invoice request workflows; private attachments inserted with the ticket |
| `platform_support_replies` | SELECT, INSERT | Append support conversation replies |
| `platform_partner_applications` | SELECT, INSERT; UPDATE only `status`, `updated_at` | Receive and process partnership applications |
| `user_mfa` | SELECT, INSERT; UPDATE only the nine fields listed below | Backend TOTP enrollment/challenge/recovery and replay prevention |
| `affiliate_identities` | SELECT, INSERT | Existing owner's referral identity |
| `affiliate_visits` | SELECT, INSERT | Immutable issued referral visit |
| `affiliate_attributions` | SELECT, INSERT | Immutable order attribution |
| `affiliate_accruals` | SELECT, INSERT | Append policy-versioned accrual/adjustment records |

The nine MFA update fields are `revision`, `enabled`, `secret_encrypted`, `pending_secret_encrypted`, `pending_expires_at`, `last_used_step`, `recovery_code_hashes`, `enabled_at`, `updated_at`. Backend SELECT includes encrypted MFA secrets and hashed recovery codes required for verification; these do not become public API data. The existing MFA encryption key workflow remains separate, and enrollment stays unavailable if the key is absent.

No DELETE, TRUNCATE, schema-owner or role-admin rights are proposed. Policy content/group/version/creator remain immutable after INSERT. Replies and the four affiliate tables remain append/read only. No new grants on existing financial-source tables are proposed; the existing append-only `affiliate_wallet_effects` helper remains separately constrained. Existing PUBLIC or broader table/column privileges on these nine tables would be removed before granting the exact allowlist, so inherited rights cannot bypass it.

Read-only source analysis tests verify this matrix against actual ORM write fields and Prisma column mappings. After the owner's approval, ephemeral PostgreSQL tests verify read/append operations and all 17 approved update columns while denying immutable changes, deletion and unrelated financial access.

## Recovery boundaries

If preflight, backup, schema/role validation or readiness fails, stop before frontend rollout and preserve the previous running release where possible. Additive schema remains intact; do not drop new tables or restore a backup automatically over newer user/financial activity. Any code rollback must target a previously verified release SHA through the existing deployment procedure. Financial activation and real transfers remain outside this release request.

## Authorized cleanup evidence

### Final observed candidates and execution boundary

- Backend candidate: `dfe2e879c71023852d410aa8a384d00807a1c976`; all checks passed, including [full backend CI](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43167499241) and [real migration/permission/backup replay](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43167499432). The real Prisma fixture exercised the nine-table matrix and emitted `GDS_PLATFORM_RESTRICTED_RUNTIME_MATRIX=PASS`.
- Frontend cleanup candidate: `b967be74f960ebeafd2d06c2767ffcfe754f6d15`; all six checks passed, including [frontend CI](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/43143679464). No schema tables were dropped: historical consumers remain active.
- The release-only MFA initializer preserves an existing valid key, refuses regeneration when encrypted/enabled/pending/recovery material exists, writes a missing key atomically as private server configuration, and emits only boolean status. Its source tests and independent read-only review passed. It has not run on production.
- Automatic execution review rejected the combined command to pause backend auto-CD and merge backend PR #31, stating that trusted evidence did not contain specific approval for the repository-variable change and production-main merge. The command was rejected before execution. No alternate API/tool was used to attempt the same mutation.
- Read-only confirmation after rejection: backend `EDUAI_AUTO_CD_ENABLED` remains `true`; backend main remains `21906fdce2b09950251c258582aae70c4e35ec5c`; frontend main remains `b3c6c04585ace31b3e38dfcd70a47f1f5f7b653c`. Both PRs remain OPEN/CLEAN with no merge commit. No production backup, migration, runtime grant, MFA-key initialization, restart or new deployment was performed.
- Owner approval of the GDS plan/runtime matrix remains recorded. The remaining execution-layer authorization must explicitly identify changing `EDUAI_AUTO_CD_ENABLED` temporarily, merging both #31 source PRs into main, and running/restoring the controlled deployment sequence. This boundary does not come from `SPR25-007`.

Frontend commit `b967be74f960ebeafd2d06c2767ffcfe754f6d15` removes the unreachable learner/Admin package-sales pages, their exclusive services/editor/styles and obsolete tests, an unused lazy import, and the unused 941,286-byte PNG hero. The optimized WebP hero remains. Eleven files were removed; the diff removes 1,484 lines and adds two assertions proving the old Admin route redirects to the GDS policy editor.

The final local source suite passed 578 tests across 129 files (the decrease from 599 removes only tests for the deleted unreachable screens/services). Build/typecheck passed; 13 membership navigation/history browser tests and two GDS platform scenarios passed. Final PR CI is rerunning at the new head.

All eleven legacy membership/entitlement tables have production-source or relation consumers. Examples include order fulfillment, receipt access, refunds, historical order views, quota usage and membership revenue scheduling. They remain necessary to preserve paid access and financial history; no table/column deletion is justified by this audit yet. The cleanup removed dead source without dropping these live dependencies. Further schema removal requires the data/consumer migration specified in the original plan, not another permission request.
