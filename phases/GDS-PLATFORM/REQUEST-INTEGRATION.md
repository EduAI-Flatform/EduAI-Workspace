# Private requests: real PostgreSQL acceptance

Backend PR46 final candidate `593154f6331dc26f3eb8c4f87ff0af452cd18e13` adds a restricted-Prisma integration probe to the existing disposable PostgreSQL migration replay. The replay first applies the historical 65-migration baseline and all 24 pending migrations. This is CI integration evidence, separate from production browser acceptance.

Initial replay run `43393171835` passed at 2026-11-13T08:27:38Z. A final assertion then directly checked the runtime role's identity, non-superuser status and absence of order-update/policy-create privileges. Final-head replay `43393784140` passed, with the new probe's success marker at 08:32:24Z, and quality/concurrency run `43393784196` passed all checks. The probe uses the real platform settings and request services with a temporary NOLOGIN role and explicit table/column grants. It rejects execution outside the localhost CI replay database and never loads production environment files.

Verified outcomes:

- Disabled intake does not create a ticket; re-disabling preserves historical reads.
- Valid images are decoded/re-encoded as PNG and excluded from list/detail payloads; another owner cannot read the image/detail or reply.
- Lists truncate private content; reply pagination, Admin replies/status changes and closed-ticket rejection work through real Prisma transactions.
- Invalid/oversized uploads leave the ticket count unchanged.
- Partner intake normalizes email and retains consent/effective-policy provenance; Admin review succeeds and audit metadata excludes private content/email.
- Invoice requests reuse an earlier checkout replay's canonical settled synthetic order. Another owner is rejected, repeated requests return the same ticket, Admin handling succeeds, and the original order/settlement stay unchanged. Disabled invoice intake is rejected.

Local Node syntax validation and four platform-request Jest suites (23 tests) passed. PR46 merged as `fdcc0f1396d92eea1f8546789d5083dc77ecbe34`; the fetched remote main tree matched the tested candidate exactly. Post-merge verification and branch cleanup are recorded separately below when observed. No production intake flag, policy, database permission or application code was changed. These tests do not claim actual production support/invoice/partner submissions or school integration.

Fresh MFA login acceptance is separately recorded in [authenticated UAT](AUTHENTICATED-UAT.md), Workspace PR48 merge `e6febd00887ca010ba87c26edf8f0cfdc50c36eb`, with PR CI `43393185576` and main CI `43393260907` successful. Its merged temporary branch was deleted remotely and locally and stale references pruned.

## Backend terminal receipt

Exact main `fdcc0f1396d92eea1f8546789d5083dc77ecbe34` passed post-merge quality/concurrency `43394555522`, replay `43394555673` and existing automatic deployment `43394555429`. Actual backend health returned200 at08:41:00Z. Public settings read at08:41:38Z confirmed support/invoice/partner intake all remainfalse and no private card capability is exposed. No migration or policy activation was requested. The merged backend temporary branch was deleted remotely and locally, then stale references pruned.
