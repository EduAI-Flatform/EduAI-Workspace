# Manual Action Queue

## MANUAL:SPR24_005_PUSH_APPROVAL — Authorize or perform the SPR24-005 shared-main pushes

- Status: `WAITING_USER`
- Priority: `HIGH`
- Related task: `SPR24-005`
- Local readiness: Backend `8daafa3` and Frontend `2007db7` are committed; full unit/HTTP tests, schema validation, both builds, endpoint-security audit, and responsive 320px/1440px Chromium UAT pass.
- Required action: explicitly authorize pushing those exact commits to their configured `origin/main` branches, or push them through the approved repository workflow.
- Verification: confirm both remotes contain the exact commits and both CI workflows pass, then resume from remote synchronization/CI monitoring.
- Separate production blocker: do not deploy membership changes until `MANUAL:SPR24_MEMBERSHIP_MIGRATION_AUTHORITY` is resolved through the isolated migration-operator path.
- Security: no credential, token, session, response body, entity identifier, or raw idempotency key is required or recorded.

## MANUAL:SPR24_MEMBERSHIP_MIGRATION_AUTHORITY — Restore isolated migration authority

- Status: `WAITING_USER`
- Priority: `CRITICAL`
- Related tasks: `SPR24-001`, `SPR24-007`.
- Evidence: Backend `f3087e5` passed CI run `32708939182`. Deployment runs
  `32708939079` and `32709524724` stopped before restart; sanitized diagnostic
  run `32709934269` identified `MIGRATION_ROLE_PERMISSION_DENIED` for
  `20260824160000_add_membership_product_type`.
- Required action:
  - Through the approved migration-operator path, verify the failed migration's
    single enum-alter statement did not take effect, then mark that migration
    rolled back with Prisma migrate resolve.
  - Restore only the isolated migration credential's authority to alter the
    existing Commerce product enum. Do not change the runtime credential,
    runtime ownership, role membership, or any verified least-privilege
    assertion.
  - Rerun the normal Backend deployment and confirm both additive membership
    migrations, runtime-role assertions, build, PM2 restart, public membership
    routes, and readiness pass.
- Blocks: Sprint 24 production deployment/release verification only. Local
  `SPR24-001` acceptance is complete and `SPR24-002` remains runnable.
- Security: retain no credentials, connection values, host/database/role names,
  row data, raw migration log, response bodies, or entity identifiers.

## MANUAL:SPR23_005_DEPLOYMENT_UAT — Deploy and verify Sprint 23 Commerce

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR23-005`.
- Authorization: `AUTHORIZED` on 2026-08-24 for exactly one bounded,
  dedicated, non-sensitive Commerce production UAT.
- Required action: none.
- Verified: Backend `922a576` and Frontend `668f430` are deployed. The exact
  runtime reaches permanent Commerce with the mandatory secret configured and
  retains every sanitized least-privilege assertion. The single authorized
  production UAT passed cross-role and ownership boundaries, authoritative
  repricing, concurrent same-key convergence, one immutable pending order, one
  safe order audit event, and safe administrator history.
- Reconciliation: the dedicated product and course are archived; the immutable
  order/audit history is preserved; payment attempts, settlements, fulfillment
  effects, and provider calls are zero; all generated sessions were revoked;
  post-UAT health returned HTTP `200`.
- Local evidence: `EVIDENCE:SPR23-005:LOCAL-READINESS`.
- Database-role separation evidence:
  `EVIDENCE:SPR23-005:DATABASE-ROLE-SEPARATION`.
- Infrastructure remediation evidence:
  `EVIDENCE:SPR23-005:INFRASTRUCTURE-REMEDIATION`.
- Runtime privilege verifier evidence:
  `EVIDENCE:SPR23-005:RUNTIME-PRIVILEGE-VERIFIER`.
- Architecture amendment evidence:
  `EVIDENCE:SPR23-005:PERMANENT-COMMERCE-AMENDMENT`.
- Revised local readiness evidence:
  `EVIDENCE:SPR23-005:PERMANENT-COMMERCE-LOCAL-READINESS`.
- Authorization evidence:
  `EVIDENCE:SPR23-005:PRODUCTION-UAT-AUTHORIZATION`.
- Production evidence:
  `EVIDENCE:SPR23-005:PERMANENT-COMMERCE-PRODUCTION-UAT`.
- Blocks: none; `SPR23-005` and Sprint 23 are complete.
- Security: retain no credentials, sessions, role/database names, response
  bodies, entity identifiers, raw idempotency keys, provider payloads, payment
  links, QR data, or signatures.

## MANUAL:PHASE3_COMMERCE_RUNTIME_DB_ROLE — Verify least-privilege runtime DB role

- Status: `VERIFIED`
- Priority: `CRITICAL`
- Related tasks: `SPR23-003`, `SPR23-005`, `SPR25-002`, `SPR25-007`.
- Verified: the authorized operator confirmed separate runtime and migration
  credentials plus mode `600` for `.env.migration`. Backend run `32692761650`,
  attempt `1`, deployed exact revision `6cff606` with isolated migration
  preflight, 45 current migrations, build, PM2 restart, and readiness.
- Sanitized production assertions: Commerce tables present and least-privilege
  readiness true; superuser, `BYPASSRLS`, Commerce ownership, Commerce-owner
  assumption, guard bypass, and trigger-disable capability all false.
- Evidence: `EVIDENCE:SPR23-005:RUNTIME-ROLE-PRODUCTION-VERIFICATION`.
- Blocks: none. `MANUAL:SPR23_005_DEPLOYMENT_UAT` is independently verified
  with bounded Commerce write UAT and reconciliation evidence.
- Security: record only boolean privilege assertions and readiness status; do
  not record role names, hosts, connection strings, credentials, row contents,
  response bodies, or entity identifiers.

## MANUAL:SPR23_002_DEPLOYMENT — Deploy Phase 3 commerce persistence

- Status: `VERIFIED`
- Priority: `CRITICAL`
- Related task: `SPR23-002`
- Verified: Backend commit `84162aa` passed CI run `32683873089` and production
  deployment run `32683873087`. Migration
  `20260824013000_add_commerce_persistence` is applied and not rolled back;
  metadata-only verification found 15 tables, 76 indexes, 57 triggers, and 83
  named constraints. Public readiness returned HTTP `200`.
- Evidence: `EVIDENCE:SPR23-002:LOCAL-PERSISTENCE` and
  `EVIDENCE:SPR23-002:PRODUCTION-DEPLOYMENT`.
- Blocks: none; `SPR23-002` is `DONE` and `SPR23-003` is active.
- Security: no database credentials, role names, row contents, response bodies,
  provider data, signatures, payment/QR payloads, or identifiers were retained.

## MANUAL:SPR23_001_ADR_APPROVAL — Review and approve Phase 3 commerce boundaries

- Status: `VERIFIED`
- Priority: `CRITICAL`
- Related tasks: `SPR23-001`, `SPR23-002`
- Artifact: `EduAI_Docs/docs/decisions/ADR-005-phase-3-commerce-payment-and-access-boundaries.md`
- Required action: none; the human owner approved ADR-005 as proposed on
  2026-08-24.
- Verified: live Backend and Frontend contracts were inspected; two completed
  adversarial review cycles produced 29 substantive findings, all resolved.
  Human acceptance is recorded in `EVIDENCE:SPR23-001:HUMAN-APPROVAL`, and
  `SPR23-001` is complete.
- Blocks: none. `SPR23-002` is authorized to proceed under ADR-005.
- Security: do not provide or record PayOS credentials, signatures, webhook
  payloads, payment links, QR data, tokens, sessions, or personal payment data.

## MANUAL:SPR17_002_DEPLOYMENT — Learning-path compatibility deployment

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: none.
- Verified: Backend commit `7e42a55` passed CI run `32321579562` and production deployment run `32321579535`; production health returned HTTP `200`. Seed-learner UAT generated two consecutive validated v1 paths and every recommended course was accessible.
- Blocks: none; `SPR17-002` is `DONE` and `SPR17-003` is unblocked. `SPR17-004` remains independently blocked on the administrator embedding rebuild.
- Security: do not record credentials, tokens, sessions, response bodies, or entity identifiers.

## MANUAL:SPR17_001_GOOGLE_UAT — Google account-selection support for learner-profile UAT

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: none.
- Verified: the approved account completed normal Google sign-in. Contained production UAT saved two bounded learner skill goals, reloaded cleanly, then cleared the same data through the supported profile form. Backend `933b73a` and Frontend `80e572b` CI/deploy passed; production health returned HTTP `200` and browser console errors were zero.
- Blocks: none; `SPR17-001` is `DONE`.
- Security: do not use password login for this Google-authenticated account, and do not record account addresses, credentials, tokens, cookies, or profile content.

Project-owned compatibility overlay. Canonical source: `.ai-dos/records/manual-actions.json`.

## MANUAL:SPR16_002_DEPLOYMENT — Deploy and verify the shared notification center

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: deploy the focused Frontend commits and run fresh student, instructor, and administrator notification-center UAT on mobile/keyboard interaction.
- Verified: Frontend CI run `31674289296` and production deploy run `31674289172` succeeded for `5f3b0f9`. Fresh student, instructor, and administrator keyboard UAT passed with no mutating production API requests or console errors; temporary production auth states were discarded.
- Blocks: none; `SPR16-002` is `DONE`.
- Security: retain only sanitized route/status evidence; never retain notification payloads, IDs, credentials, tokens, sessions, or response bodies.

## MANUAL:SPR16_004_EMAIL_PROVIDER — Configure and verify opt-in production email

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: none; completed through the supported normal Google sign-in UI without password authentication.
- Blocks: none; `SPR16-004` is `DONE`.
- Does not block: `SPR16-003`, `SPR17-001`, or independent later-sprint work.
- Verified: Backend commit `b8bee8b` deployed in run `31985955198`; the sanitized Resend configuration guard passed, PM2 reloaded with `--update-env`, no migration was pending, and production health returned HTTP `200`. The prior HTTP `401` was only from the password-login endpoint and is not applicable to the Google-authenticated UAT account. One contained certificate flow then passed: opt-in enabled, recipient-scoped in-app notification, matching provider email receipt, instructor isolation, course archive, and preference restoration. No recipient, message body, token, key, raw response, or entity identifier was recorded.
- Security: do not commit or record API keys, sender/recipient addresses, email contents, tokens, sessions, verification links, or raw provider responses.

## MANUAL:AI_DOS_GIT_REMOTE — Provide a Git repository for workspace-level AI-DOS records

- Status: `VERIFIED`
- Priority: `HIGH`
- Repository: `https://github.com/EduAI-Flatform/EduAI-Workspace.git` on `main`.
- Local owner: `D:\Work\Edu-AI\EduAI-Workspace`.
- Verified: the repository is initialized on `main` with the exact `origin` remote. Migration commit `39a346339b43acbd6218cfab4028e78761b85d25` was pushed without force, and local `HEAD` matched `origin/main` immediately after publication. Backend and Frontend remained independent clean sibling repositories.
- Required action: none.
- Blocks: none.
- Does not block: application completion, AI-DOS conformance, or other workspace checks.
- Expected result: the migration is pushed as a separate commit without modifying Backend or Frontend history.

## MANUAL:PRODUCTION_ACCESS — Provide production deployment and UAT access

- Status: `VERIFIED`
- Priority: `HIGH`
- Related tasks: `SPR20-002`, `SPR20-004`
- Required action:
  - Securely provide production UAT accounts when Sprint 20 begins.
  - Approve or perform required DNS, Cloudflare, Firebase, VPS, OAuth, or hosting changes.
  - Provide least-privilege deployment and monitoring access.
- Blocks: final Sprint 20 release/production verification only.
- Does not block: independent local implementation and verification work.
- Expected result: production deployment, dependency health, and cross-role UAT pass at https://eduai.giaoducso.org.vn.

## MANUAL:SPR13_002_DEPLOYMENT — Provide valid authenticated production UAT evidence

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR13-002`
- Verified:
  - Fresh production-origin student, instructor, and administrator sessions
    were generated through the approved login flow without exposing contents.
  - 38 mobile/desktop route checks passed across all visible role destinations.
  - Student-to-instructor and instructor-to-administrator access were rejected.
  - Failed API responses, console errors, and non-read requests were all zero.
- Evidence: `EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT`.
- Blocks: none; `SPR13-002` is `DONE`.

## MANUAL:PLAYWRIGHT_DEMO_PASSWORD — Provide the deterministic demo password

- Status: `VERIFIED`
- Priority: `HIGH`
- Related tasks: `SPR13-001`, `SPR13-003`
- Verified:
  - Playwright loads `EduAI-Front-End-Web/.env`; runtime configured: yes.
  - All three deterministic accounts exist and match the configured value.
  - Student, instructor, and administrator login setup passed 4/4 tests.
  - The full Frontend Playwright suite passed 51/51 tests.
  - No credential value or storage-state content was logged or committed.
- Evidence: `EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK`.
- Blocks: none; `SPR13-003` completed its full regression checklist.

## MANUAL:AI_DOS_RUNTIME_LAYOUT — Choose the portable runtime layout

- Status: `VERIFIED`
- Priority: `MEDIUM`
- Required action: none; AI-DOS Core 1.2.0 is vendored at source revision `2abeea732122aae28f4ba9a6f4814d288a3510e1`.
- Verified: root-relative conformance and generation pass with 205 records, 62 completed tasks, zero active/blocked tasks, zero missing evidence, and zero diagnostics. Sibling and vendored runtime results and generated-file hashes match.
- Provenance: `core/AI_DOS_RUNTIME_PROVENANCE.md`.
- Blocks: none.
- Expected result: `node core/conformance.js ...` and `node core/project.js ...`
  run portably from `D:\Work\Edu-AI\EduAI-Workspace`.

## MANUAL:SPR14_001_DEPLOYMENT - Provide fresh authenticated admin verification

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR14-001`
- Locally verified:
  - Backend commit `7da075dbe9ab2c278a46c1dedca0e670a22c8ec2` adds the
    platform-admin-only `GET /api/v1/admin/reports/overview` endpoint.
  - 59 unit suites (325 tests), 6 HTTP suites (29 tests), Prisma validation,
    the aggregate query/index review, and the Backend build pass.
  - Migration `20260810000000_add_user_deleted_at_index` supplies the missing
    soft-delete index used by user aggregates.
- Production retest:
  - Backend remote `main` resolves to the verified commit.
  - The production API health route returns 200.
  - The new admin overview route returns 401 without credentials, confirming
    that the route is live behind its authentication guard.
  - Exact-revision workflow run `31379121071` and its migration-bearing Deploy
    to VPS job `93425247882` both completed successfully.
  - Fresh production-origin logins succeeded for the deterministic student,
    instructor, and platform-administrator accounts through the approved flow.
  - The read-only endpoint matrix returned student 403, instructor 403, and
    platform administrator 200.
  - The administrator payload matched only the expected aggregate sections and
    numeric counts; no entity rows, credential fields, or response body were
    retained.
  - No non-read requests, unexpected API 5xx responses, or browser console
    errors were observed.
  - All fresh single-use production storage states and transient Playwright
    artifacts were discarded without inspecting their contents.
  - Response bodies and credential material were not retained.
- Required action: completed on 2026-08-10 with the user-authorized fresh
  production authentication flow.
- Retest: student and instructor receive 403; platform administrator receives a
  200 aggregate-only response with no entity or credential record exposure.
- Evidence: `EVIDENCE:SPR14-001:LOCAL-READINESS`,
  `EVIDENCE:SPR14-001:DEPLOYMENT-RETEST`,
  `EVIDENCE:SPR14-001:MIGRATION-RETEST`,
  `EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT`.
- Blocks: none; `SPR14-001` is `DONE`.

## MANUAL:SPR14_002_DEPLOYMENT - Deploy and verify the admin dashboard

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR14-002`
- Verified:
  - Playwright loads `EduAI-Front-End-Web/.env`; the password was confirmed only
    through configured/match booleans and was never printed or retained.
  - Fresh local student, instructor, and administrator logins succeeded and the
    complete Frontend Playwright suite passed 58/58 tests.
  - Fresh production-origin sessions passed the selected read-only suite 20/20.
  - At 320px and 1440px, `/admin/dashboard` loaded live aggregate data with no
    horizontal overflow, failed API response, server 5xx, or console error.
  - Student and instructor sessions were rejected from destinations above their
    roles; administrator access succeeded without privilege elevation.
  - Only GET, HEAD, and OPTIONS were allowed after login. Temporary states and
    transient Playwright artifacts were discarded without content inspection.
  - Focused harness/baseline commit:
    `56b1bff1e3d88f604c716b17184cc8ce013406d9`.
- Evidence: `EVIDENCE:SPR14-002:LOCAL-READINESS`,
  `EVIDENCE:SPR14-002:DEPLOYMENT-RETEST`,
  `EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION`.
- Blocks: none; `SPR14-002` is `DONE`.

## MANUAL:SPR14_003_DEPLOYMENT - Rotate credentials and verify admin user-management mutations

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR14-003`
- Locally verified:
  - Backend heads through `81a1f450700e9236af21ffdf20176a5d24bf2433`
    add sanitized user list/detail APIs, guarded status/role mutations, live
    account-status and role enforcement, refresh-token revocation, last-active
    platform-administrator protection, and atomic audit events.
  - Frontend head `7fb19bbfd44277456b51e9354cf67e41db148a40`
    adds searchable/paginated account management with explicit confirmation,
    safe error states, stale-detail-response suppression, and responsive
    320px/1440px layouts.
  - Backend unit 63/345, Backend HTTP 6/39, Prisma validation, both builds,
    Frontend unit 28/85, and the full fresh-login Playwright matrix 60/60 pass.
  - No database migration is required for this task.
- Production read-only verification:
  - Backend `3ee80bb935e9ec786d599aa1022eb45d681e032a` and Frontend
    `a87a20772fa7de15cb141e4c85d60555f3427e33` are deployed through successful
    CI and production workflows and contain the approved task heads. The latest
    Frontend revision adds only the sanitized read-only UAT harness.
  - Fresh production-origin sessions returned 401 unauthenticated, 403 student,
    403 instructor, and 200 platform administrator for the bounded user list.
  - `/admin/dashboard/users` loaded live data at 320px and 1440px with no
    horizontal overflow, post-login non-read request, unexpected API 5xx, or
    console warning/error. Lower-role sessions were redirected.
  - Response and recursive key assertions found no credential or secret fields;
    no response body, authentication state, or transient artifact was retained.
- Production write verification:
  - A cryptographically strong deterministic credential was generated
    internally and applied through the Backend password-hashing path to exactly
    the three approved demo accounts. Runtime configured, database match, and
    unchanged-role booleans passed; fresh production logins passed for student,
    instructor, and platform administrator.
  - Exactly one dedicated non-sensitive account was created. Student and
    instructor status/role writes returned 403. Confirmed administrator UI
    flows passed suspend/reactivate and student/instructor/student transitions.
  - Suspended current access returned 401; refresh attempts returned 401 after
    status and role changes. The same access token followed current database
    roles with 200 before restoration and 403 afterward.
  - Two status and two role audit events were present with sanitized metadata.
    The target finished active with only the student role.
  - The 320px and 1440px user-management flows had no overflow, unexpected 5xx,
    console error, or out-of-scope browser write.
  - Sanitized preflight found exactly one active platform administrator. A live
    last-admin mutation was not attempted because the explicitly required
    unaffected-admin safety prerequisite could not be satisfied; the passing
    Backend HTTP/integration suite verifies the canonical 409/no-state-change
    safeguard.
- Containment: all failure artifacts, auth states, reports, and temporary
  runners were deleted; no credential value was committed or copied into
  canonical records.
- Evidence: `EVIDENCE:SPR14-003:LOCAL-READINESS`,
  `EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT`,
  `EVIDENCE:SPR14-003:FRONTEND-HARNESS-DEPLOYMENT-RETEST`,
  `EVIDENCE:SPR14-003:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT`.
- Blocks: none; `SPR14-003` is `DONE`.

Never place the rotated value or any credential material in this queue.

## MANUAL:SPR14_004_DEPLOYMENT - Rotate credentials and verify moderation mutations

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR14-004`
- Locally verified:
  - Backend moderation schema, platform-admin queue/detail/actions,
    owner-or-admin status reads, atomic audit history, public-query exclusions,
    and authorization boundaries pass 65 suites/357 unit tests and 6 suites/44
    HTTP tests.
  - Prisma validation and the Backend build pass. Migration
    `20260811030000_add_content_moderation_state` is validated.
  - The Frontend moderation queue, detail evidence, filters, pagination,
    explicit reason confirmation, error states, and stale-request protection
    pass 30 files/92 tests; the production build passes with the existing
    chunk-size warning.
  - A credential-independent frontend-only browser harness passes 2/2 at 320px
    and 1440px with no overflow, failed API response, request failure, or
    console warning/error. Its configuration is locked to the exact moderation
    spec, rejects override arguments, removes the demo-account secret from its
    child environment, and cannot run authentication setup or mutations.
  - An unintended authentication-setup attempt failed before producing a valid
    session. All transient auth states, test results, and reports were deleted
    without content inspection; no new storage state was retained or committed.
- Production read-only verification:
  - Exact Backend and Frontend task revisions are deployed. Successful Backend
    deploy job `93681260040` ran the checked-in migration-deploy step before
    build, restart, and health verification.
  - Frontend harness revision `a87a20772fa7de15cb141e4c85d60555f3427e33`
    subsequently passed CI and production deployment; status-only smoke checks
    for the public root, user-management route, and moderation route returned
    200 without repeating authenticated UAT.
  - Fresh sessions returned 401 unauthenticated, 403 student, 403 instructor,
    and 200 platform administrator for the bounded moderation queue contract.
  - `/admin/dashboard/moderation` loaded live data at 320px and 1440px with no
    placeholder, horizontal overflow, post-login non-read request, unexpected
    API 5xx, or console warning/error.
  - Recursive response checks found no credential or secret fields; no response
    body, authentication state, or transient artifact was retained.
- Production write verification:
  - The rotated credential prerequisite and fresh student, instructor, and
    platform-administrator production logins passed.
  - Exactly one dedicated non-sensitive instructor-owned course and one harmless
    lesson were created. Unauthenticated, student, and instructor moderation
    writes returned 401, 403, and 403.
  - The administrator rejected the exact target with a safe reason. Owner status
    returned the rejected state/reason, an unrelated student received 404, and
    public detail and catalog APIs excluded the target.
  - The administrator restored the exact target with a second safe reason.
    Public detail/catalog visibility returned, then the target was archived and
    left moderation-clear.
  - Exactly two immutable `CONTENT_MODERATION_CHANGED` events preserved the
    clear/rejected/clear transitions, safe reasons, actor/target shape, and
    timestamps without sensitive keys.
  - The 320px and 1440px UI flows passed with no overflow, unexpected 5xx,
    console error, or out-of-scope browser write.
  - The initial harness attempt stopped before any moderation mutation on a
    pre-mutation assertion defect. Read-only diagnostics confirmed safe state;
    the corrected run resumed the same target, and no second target was created.
- Evidence: `EVIDENCE:SPR14-004:LOCAL-READINESS`,
  `EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT`,
  `EVIDENCE:SPR14-004:FRONTEND-HARNESS-DEPLOYMENT-RETEST`,
  `EVIDENCE:SPR14-004:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT`.
- Blocks: none; `SPR14-004` is `DONE`.

Never place the rotated value, authentication state, or credential material in
this queue.

## MANUAL:SPR14_005_DEPLOYMENT - Deploy and verify the platform audit log

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR14-005`
- Verified:
  - Backend and Frontend revisions and migration deployment remain verified.
  - Fresh production sessions returned the audit API matrix 401 unauthenticated,
    403 student, 403 instructor, and 200 platform administrator.
  - The administrator payload matched the paginated audit contract. Recursive
    safety assertions found no password, token, secret, cookie, authorization,
    credential, session-identifier, or API-key fields; no body was retained.
  - The live audit viewer loaded paginated records at 320px and 1440px, submitted
    safe search/action/target filters through GET, rendered pagination, and had
    no horizontal overflow, unexpected server error, or console error.
  - Authorized read-only database checks confirm the finished migration,
    `audit_logs` table, `audit_logs_reject_update_or_delete` trigger, and
    sanitized `AUTH_LOGIN` records for all three deterministic accounts.
  - The configured target uses the development profile and contains the full
    deterministic fixture subset plus additional users; no connection or entity
    identifier was retained.
  - With explicit user authorization, exactly one dedicated non-sensitive audit
    verification row was inserted on the configured development-profile target.
  - The installed `audit_logs_reject_update_or_delete` trigger rejected both the
    scoped UPDATE and DELETE attempts with its append-only signal.
  - The dedicated row remains present and unchanged; no pre-existing audit row
    or unrelated application record was targeted.
  - The temporary verifier was removed. No connection value, credential, actor
    identifier, row identifier, raw exception, or sensitive content was retained.
- Evidence: `EVIDENCE:SPR14-005:LOCAL-READINESS`,
  `EVIDENCE:SPR14-005:DEPLOYMENT-RETEST`,
  `EVIDENCE:SPR14-005:ISOLATED-IMMUTABILITY-RETEST`,
  `EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT`,
  `EVIDENCE:SPR14-005:AUTHORIZED-DB-PREFLIGHT`,
  `EVIDENCE:SPR14-005:DATABASE-IMMUTABILITY-VERIFICATION`.
- Blocks: none; `SPR14-005` is `DONE` and its dependent Sprint 14 tasks are
  eligible for runtime selection.

Never place credentials or secret values in this queue.

## MANUAL:SPR20_003_NGINX_COMPRESSION - Compress hashed frontend assets

- Status: `WAITING_USER`
- Priority: `MEDIUM`
- Related tasks: `SPR20-003`, `SPR20-004`
- Verified:
  - Frontend `56b6a737c457cf548d01981dce4709385439e774` deployed successfully.
  - Production performance improved from Lighthouse 60 to two stable runs at
    88; accessibility and best practices are 100, CLS is 0.0001, and TBT is
    27-31 ms.
  - Nginx serves the 381,372-byte hashed entry JavaScript without
    `Content-Encoding` and adds `Cache-Control: public, no-transform`.
- Required action:
  - An authorized VPS operator should enable gzip or Brotli for JavaScript and
    CSS, remove `no-transform` for hashed assets, run `nginx -t`, and reload
    Nginx through the approved operational path.
  - Confirm the hashed JavaScript response has `Content-Encoding` for an
    `Accept-Encoding: gzip, br` request, then repeat sanitized Lighthouse.
- Security: do not copy the active Nginx config, VPS credentials, response
  bodies, tokens, or auth state into evidence.
- Blocks: none. This is a nonblocking release optimization; SPR20-003 acceptance
  and production UAT pass.

Never place credentials or secret values in this queue.

## MANUAL:SPR17_002_GOOGLE_UAT — Google OAuth support for contained Sprint 17 UAT

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: none. The normal Google sign-in UI was completed directly in the user's Chrome profile without disclosing credentials, tokens, cookies, or session material.
- Reason: a legitimate EduAI learner session exists. The earlier `401` was from the separate password-login endpoint, so it is not a credential failure for the Google-login account.
- Blocks: none.
- Resume: use the legitimate learner session only through supported UI; retain no session or account data.
- Security: do not record account addresses, credentials, tokens, cookies, session data, notification content, or entity identifiers.

## MANUAL:SPR17_004_ADMIN_EMBEDDING_REBUILD — Run the documented production AI embedding rebuild as platform administrator

- Status: `VERIFIED`
- Priority: `HIGH`
- Required action: none. Normal deterministic administrator login and the documented `POST /api/v1/ai/embeddings/rebuild` operation completed through the supported production contract.
- Verified: rebuild returned `201` with sanitized aggregates of 62 lessons, 6 library resources, and 68 chunks. Follow-up learner UI chat returned `201` with sourced grounding, selected-course isolation, and one citation resolving with `200`.
- Fixes: Backend `0d30ec8` aligned Gemini embeddings with `vector(1536)`; Backend `59b7fe5` made citation navigation follow the authorization-appropriate course route. Both exact revisions passed CI and VPS deployment.
- Blocks: none; `SPR17-004` is `DONE`.
- Security: do not share credentials, headers, tokens, cookies, sessions, source content, entity identifiers, or raw responses.

## MANUAL:SPR16_001_DEPLOYMENT - Deploy and verify the notification-domain foundation

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR16-001`
- Local evidence: `EVIDENCE:SPR16-001:LOCAL-READINESS`
- Required action:
  - Push Backend commit `bbf0fbe` through the approved workflow and confirm
    migration `20260813000000_create_notification_schema` succeeds.
  - With fresh authorized sessions, verify notification APIs reject
    unauthenticated access and never expose or mutate another user's records.
  - Retain only sanitized deployment revisions, HTTP statuses, aggregate counts,
    and contract checks; never retain payloads, sessions, or credentials.
- Blocks: none.
- Expected result: recipient-scoped, idempotent notifications and safe
  in-app/email defaults are verified in production before the task is `DONE`.
- Verified on 2026-08-13: Backend `origin/main` resolves to `bbf0fbe`; GitHub
  Actions deployment run `31667869369` completed successfully and its deploy
  workflow applies Prisma migrations. Public health, Swagger UI, and OpenAPI
  JSON returned `200`. Fresh student, instructor, and administrator logins
  passed the read-only matrix: all six unauthenticated notification routes
  returned `401`, while authenticated list, unread-count, and preference calls
  returned bounded, sanitized data with safe in-app/email defaults. Generated
  production auth-state files were discarded without inspecting their content.

## MANUAL:MEDIA_UPLOAD_STORAGE_READINESS - Managed media uploads production verification

- Status: `VERIFIED`
- Priority: `HIGH`
- Scope: course thumbnails, lesson video/PDF, avatars, and portfolio images.
- Verified on 2026-08-12 against the configured development profile:
  - Private-bucket presigned `PUT`, object metadata verification, signed `GET`,
    and cleanup passed with a bounded UUID test object.
  - Cloudflare Dashboard now has an allowlisted CORS policy for the production
    frontend and two local frontend origins, method `PUT`, and request header
    `Content-Type`. Browser-style preflight and PUT both passed afterward.
  - Public bucket access remains disabled. New thumbnail/avatar/portfolio URLs
    use an internal canonical media endpoint that accepts only allowlisted image
    prefixes and redirects to a five-minute signed GET. A real PNG upload,
    canonical resolution, download, byte comparison, and cleanup passed.
  - Migration `20260812160000_add_media_storage_keys` was applied successfully
    to the configured Neon development-profile database without destructive
    schema changes.
  - Authenticated local Playwright setup passed for student, instructor, and
    administrator accounts. Course list/detail, learning/profile routes, and
    instructor course/lesson management smoke checks passed against the real
    development API. Legacy R2 thumbnail URLs are translated to the canonical
    media endpoint and load successfully while unrelated external URLs remain
    unchanged.
  - The repository-wide Playwright run still has pre-existing dynamic fixture
    failures for classroom links and stale authenticated visual snapshots; these
    are not media upload failures and remain visible in the verification report.
- Required action:
  - Backend commit `dc1445f` deployed successfully via workflow run
    `31591951784`; the workflow applied migration
    `20260812160000_add_media_storage_keys` and passed readiness checks.
  - Frontend commit `69ef7df` deployed successfully via workflow run
    `31592219062` and passed the production website health check.
  - Production health and Swagger media contract checks pass. Authenticated
    production login passes for all three demo roles. Read-only production UAT
    passes except the pre-existing student classroom fixture 404.
  - Bounded production write UAT passed: course thumbnail upload/read, direct
    browser-compatible WebM PUT to R2, video finalize, student signed video GET,
    PDF upload and signed GET, and portfolio image upload/read all succeeded.
  - Cleanup passed: the dedicated portfolio and lesson records were deleted,
    their owned R2 objects were cleaned up, the dedicated thumbnail was removed,
    and the marked UAT course was archived. No credential, signed URL, entity ID,
    or response body was retained in evidence.
- Security note: do not place bucket credentials, signed URLs, database URLs,
  or object identifiers in this queue.
- Blocks: none for managed media upload release.

## MANUAL:EMAIL_PASSWORD_REGISTRATION_UAT - Verify fresh production registration

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR20-001`
- Verified:
  - Backend `36c87676974eadeb2ad17e83ec6068f617ca7086` and Frontend
    `3d1c528ac7b3a84a2a642e6caf5704d7bc52dbdb` are committed and deployed.
  - Backend and Frontend CI and production deployment workflows passed.
  - Normal password login always uses `POST /api/v1/auth/login`; the legacy
    unverified `POST /api/v1/auth/register` route is removed.
  - Fresh production student, instructor, and platform-administrator logins
    returned 200 through the Backend, reached their role routes, and made zero
    Firebase password-sign-in requests.
  - On the configured development-profile database, the four users with null
    password hashes are Google-only; no local or Firebase password account has
    a null hash. All three deterministic accounts match the configured secret.
  - All temporary browser states and results were deleted without content
    inspection; no credential material or response body was retained.
- Optional nonblocking follow-up:
  - Provide one approved dedicated non-sensitive email inbox/account for a
    production registration UAT, or have an authorized operator complete and
    record: Firebase creation, email verification, Backend registration
    completion, logout, and subsequent Backend-only password login.
  - Have an authorized production database operator record only sanitized counts
    by auth provider for users with `passwordHash=null`, distinguishing
    Google-only from email/password accounts. Do not return identities, hashes,
    credentials, connection values, or row data.
- Evidence: `EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION`.
- Resolution: deterministic three-role production login and the complete
  `SPR20-001` endpoint-security acceptance matrix are verified. A fresh
  registration lifecycle and production null-hash inventory remain a
  non-blocking product follow-up because they are outside the current task's
  canonical acceptance criteria.
- Blocks: none.

Never place credentials or secret values in this queue.

## MANUAL:SPR15_001_PRODUCTION_UAT - Authoritative course UAT complete

- Status: `VERIFIED`
- Priority: `HIGH`
- Related task: `SPR15-001`
- Authorization:
  - Bounded production write-UAT is covered by the standing user authorization
    granted 2026-08-12.
  - No additional production-mutation permission is required for this scenario.
- Verified:
  - Backend `6c412d93146604a7a29602f6fa5821f343d93deb` and Frontend
    `a4967817701af48024d06c6c11958cb41ff50eab` are committed and deployed.
  - Backend CI and Frontend CI passed. Production deployment workflows
    `31475947636` and `31475966218` completed successfully.
  - Migration-bearing Backend VPS job `93729828261` passed for migration
    `20260811100000_add_course_completion_policy`.
  - Backend unit regression passed 66 suites/370 tests; Backend HTTP regression
    passed 6 suites/44 tests; Frontend unit regression passed 31 files/93 tests.
  - Prisma validation and both builds pass. The existing Frontend chunk-size
    warning remains non-blocking.
  - Read-only production checks returned health 200, courses 200, and public
    lessons 200; every inspected lesson exposed boolean `isRequired`.
  - Production Swagger returned 200 and documents boolean completion-policy
    fields for lesson, quiz, assignment, lesson-detail, and learning-step
    contracts. No direct course-completion API is exposed; protected assignment
    reads returned 401 without authentication.
- Verified:
  - Two independent status-inclusive, paginated containment checks found exactly
    one marked course and reused it. No replacement target was created.
  - The required/optional lesson, quiz, and assignment policy matrix, concurrent
    final evaluation, idempotent reevaluation, and stable `completedAt` passed.
  - The exact target finished archived through supported behavior.
  - `EduAI-Front-End-Web/playwright/.tmp-spr15-001-results` was deleted and its
    absence verified; the temporary verifier, auth state, and results were also
    removed without content inspection.
- Evidence: `EVIDENCE:SPR15-001:AUTHORITATIVE-PRODUCTION-UAT`.
- Blocks: none.

## MANUAL:SPR15_003_PRODUCTION_DEPLOYMENT - Disable public assignment R2 access

- Status: `VERIFIED`
- Priority: `HIGH`
- Related tasks: `SPR15-003`
- Verified locally and at deployment:
  - Backend `f7e7707` deployed successfully through the repository workflow and
    includes the original Sprint 15 work. Both required Sprint 15 migrations are
    applied with no failed state.
  - The production HTTP 500 was caused by a standalone legacy assignment/user
    unique index. A normal Prisma migration removed only that index while
    preserving the versioned unique key.
  - The same exact dedicated target produced versions 2 and 3 with immutable,
    newest-first history. Rubric grading, signed assignment-file retrieval,
    containment, archive cleanup, and logout passed. No replacement was created.
- Verified privacy result:
  - The authenticated Cloudflare dashboard confirmed this bucket contained one
    bounded assignment object, had no custom domain, and exposed only the public
    development URL. That public URL was disabled without affecting unrelated
    public media.
  - The same exact target was reused: its five-minute signed application URL
    succeeded, direct public access was rejected, and the target was archived.
    Temporary authentication and verifier artifacts were removed.
- Evidence: `EVIDENCE:SPR15-003:PRODUCTION-UAT-DEPLOYMENT-BLOCKER` (passing
  authoritative result retained under its historical identifier).
- Blocks: none.

Never place credentials or secret values in this queue.

## MANUAL:SPR16_003_DEPLOYMENT — Deploy and verify authenticated notification SSE

- Status: `VERIFIED`
- Verified: Backend `0afdb99` publishes a user-scoped certificate notification only after a newly issued certificate commits. Backend CI/deploy, health, Frontend CI/deploy, contained student/instructor UAT, and three-role SSE reconnect/polling-fallback regression passed. The bounded course target was archived through the UI; temporary auth states were discarded.
- Evidence: `EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT`.
- Blocks: none; `SPR16-003` is `DONE`.
- Security: retain no notification content or IDs, credentials, tokens, sessions, or response bodies.
