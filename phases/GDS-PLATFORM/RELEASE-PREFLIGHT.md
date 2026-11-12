# GDS release preflight — 2026-11-12

The owner authorized continuing the GDS production release and clarified that the financial gate must not be used as a blanket blocker for this approved plan. `SPR25-007` applies to its existing financial activation scope; it does not prohibit GDS branding, account/authentication, configuration, profile, support or course source release.

## Prepared release sequence

1. Verify final backend/frontend PR checks and immutable source heads.
2. Complete the explicit database runtime-permission approval below. Do not apply an equivalent grant through an indirect path while the automatic approval rejection remains unresolved.
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

Read-only source analysis tests verify this matrix against actual ORM write fields and Prisma column mappings. Approval must precede implementing/retrying the rejected helper and any actual production grant.

## Recovery boundaries

If preflight, backup, schema/role validation or readiness fails, stop before frontend rollout and preserve the previous running release where possible. Additive schema remains intact; do not drop new tables or restore a backup automatically over newer user/financial activity. Any code rollback must target a previously verified release SHA through the existing deployment procedure. Financial activation and real transfers remain outside this release request.
