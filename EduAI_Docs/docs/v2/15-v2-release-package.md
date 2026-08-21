# EduAI Platform V2 release package

Recorded: 2026-08-20  
Task: `SPR20-004`

## Release identity

| Component | Release revision | Previous verified revision |
|---|---|---|
| Backend | `81dc22365861d512f6ec81e9a37b6a32035712d6` | `a45d0e51f5b75d0b862eaf6c45908f0d62c1fc30` |
| Frontend | `0076d439636b7497b0311caa162850580d3585ae` | `56b6a737c457cf548d01981dce4709385439e774` |

Production entry point: `https://eduai.giaoducso.org.vn`.

## Release decision

- P0: none open. The full build, unit, HTTP E2E, authorization, and seeded
  production journeys found no reproducible security, data-loss, or
  release-blocking defect.
- P1 from the Sprint 13 baseline: all four are closed. Administrator routing,
  instructor destinations, legal/support routes, and deterministic browser
  authentication are implemented and covered by regression checks.
- Accepted operational limitation: production Nginx currently sends static
  assets with `no-transform` and without compression. The application bundle
  budget passes and the site remains functional; the operator-only improvement
  is tracked by `MANUAL:SPR20_003_NGINX_COMPRESSION` and blocks no task.
- Transactional email provider configuration and one contained opt-in delivery
  were already verified by `MANUAL:SPR16_004_EMAIL_PROVIDER`; no provider
  action remains open.
- Accepted dependency P1: the release-time production audit reports no critical
  advisory, 9 backend high advisories, and 2 frontend moderate advisories. The
  backend highs are transitive Prisma/Google tooling or Nest 10 upload/Swagger
  dependencies. Upload routes require authentication and role checks, enforce
  per-user daily rate limits and file-size limits; Swagger consumes trusted
  application metadata; Prisma/glob/deep-merge tooling receives no public
  request input. Upstream remediation currently requires coordinated
  Nest/Swagger major upgrades or broader Prisma dependency changes, so it is
  explicitly accepted for this release instead of applying an unreviewed
  `--force` update. The React Router findings affect user-controlled navigation
  or SSR error deserialization; this application uses fixed internal links and
  a client-only Vite build. Reassess these advisories during the next dependency
  upgrade, preserving the existing upload controls and full regression gates.

Release decision: **GO**.

## Verification matrix

| Area | Verification | Result |
|---|---|---|
| Backend schema | Prisma merge and validate across 32 schema fragments | PASS |
| Backend tests | 104 suites, 563 tests | PASS |
| Backend HTTP E2E | 6 suites, 46 tests | PASS |
| Backend build | Nest production build | PASS |
| Frontend tests | 68 files, 177 tests | PASS |
| Frontend build | TypeScript and Vite production build | PASS |
| Bundle budget | Initial JS 381,378 B / 103,073 B gzip; initial CSS 24,738 B / 5,564 B gzip | PASS |
| Production dependency audit | 0 critical; backend high and frontend moderate advisories reviewed with scoped P1 acceptance | PASS WITH ACCEPTED P1 |
| Production authentication | Environment configured; student, instructor, and Platform Administrator supported login flow | PASS |
| Production UAT | 48 sanitized checks across mobile and desktop projects | PASS |

The UAT harness disables screenshots, traces, and video. Temporary cookies,
tokens, storage state, and diagnostic output are discarded after each run. No
credential value or raw authenticated response is retained.

## Seeded UAT journeys

| Journey | Production coverage |
|---|---|
| Learner | Dashboard, learning, learning path, classroom, library, community, profile, role rejection |
| Instructor | Dashboard, courses, classroom, library, AI tools, mentor settings/bookings, role rejection |
| Administrator | Overview, users, moderation, audit, career jobs/applications, mentor approvals, authorization matrix |
| Career | Public jobs plus learner applications and administrator job/application views |
| Mentor | Learner directory/bookings, instructor availability/bookings, administrator approvals |
| AI | Learner assistant/tools, instructor tools, retrieval/citation regression, administrator embedding rebuild evidence |
| Notification | Sanitized list/count/preferences, shared center, SSE reconnect and polling fallback |
| Certificate | Learner list/verification plus the contained completion notification producer |

The navigation matrix is read-only. The certificate producer is the existing
bounded mutation scenario and cleans up through its supported contained flow.

## Deployment and migration verification

Backend workflow run `32346347105` completed successfully for the release
revision. Its checked-in production workflow installs from lockfile, generates
and validates Prisma, runs `prisma migrate deploy`, builds the service, restarts
PM2 with the environment, and waits for readiness. The repository contains 44
ordered migrations; the latest is
`20260820132500_add_mentor_outcomes`.

Backend CI run `32346347230` completed successfully. Frontend CI run
`32348597571` and production deploy run `32348597575` completed successfully for
the exact release revision. The deployment ran the checked-in lockfile build,
required `dist/index.html`, validated Nginx, reloaded it, and probed the HTTPS
entry point.

## Rollback procedure and dry run

Application rollback is a forward Git revert, not an in-place server edit:

1. Confirm the failing release SHA and preserve sanitized monitoring evidence.
2. Revert only the offending focused commit on `main` after review.
3. Push the revert so the same CI and production workflow rebuilds from the
   lockfile and performs health checks.
4. Re-run the bounded seeded UAT matrix and confirm the released revision.

Prisma migrations are forward-only. Do not use `migrate dev`, reset the database,
or invent down migrations in production. The V2 migrations are retained when
rolling back compatible application code. If data restoration is required,
stop writes and use an authorized operator's verified database snapshot and
recovery procedure before redeploying.

Dry run on 2026-08-20: Git archives for both previous verified revisions were
materialized into isolated temporary directories. Required package manifests,
the backend migration tree, and the frontend production workflow were present.
Both artifacts passed and were deleted without altering either worktree or
index.

## Release checklist

- [x] P0 defects closed
- [x] P1 defects fixed or explicitly accepted
- [x] Backend CI, production deployment, migrations, build, and health verified
- [x] Exact frontend release revision CI and VPS deployment verified
- [x] Rollback procedure documented and artifact recovery dry-run passed
- [x] Complete relevant local regression suites passed
- [x] Seeded production role/domain UAT passed
- [x] Temporary authentication and diagnostic state discarded
- [x] Canonical evidence/state updated and AI-DOS conformance regenerated
