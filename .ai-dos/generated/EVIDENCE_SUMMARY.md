# AI-DOS Evidence Summary

| Evidence | Task | Check kind | Check | Status | Command |
| --- | --- | --- | --- | --- | --- |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | OTHER | Static route and API coverage audit | PASS | — |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | BUILD | Backend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | TEST | Backend unit suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | TEST | Backend E2E suite | PASS | npm.cmd run test:e2e -- --runInBand |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | TEST | Frontend unit suite | PASS | npm.cmd test |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | TEST | Frontend Playwright suite | BLOCKED | npm.cmd run test:e2e |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | PRODUCTION | Read-only public production smoke | PASS | Headless Chromium navigation and network observation against https://eduai.giaoducso.org.vn |
| EVIDENCE:SPR13-001:AUDIT | SPR13-001 | DEPLOY | Deployment | NOT_APPLICABLE | — |
| EVIDENCE:SPR13-002:AUTH-STATE-RETEST | SPR13-002 | PRODUCTION | Authorized student authentication-state suitability | BLOCKED | Read-only headless Chromium navigation to /dashboard |
| EVIDENCE:SPR13-002:AUTH-STATE-RETEST | SPR13-002 | PRODUCTION | Authorized instructor authentication-state suitability | BLOCKED | Read-only headless Chromium navigation to /instructor/dashboard |
| EVIDENCE:SPR13-002:AUTH-STATE-RETEST | SPR13-002 | OTHER | Authentication-state safety controls | PASS | — |
| EVIDENCE:SPR13-002:AUTH-STATE-RETEST | SPR13-002 | PRODUCTION | Authenticated student, instructor, and administrator route matrix | BLOCKED | — |
| EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT | SPR13-002 | PRODUCTION | Fresh production-origin role authentication | PASS | npm.cmd run test:e2e:production-uat -- --project=production-auth-setup |
| EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT | SPR13-002 | PRODUCTION | Authenticated mobile and desktop role-route matrix | PASS | npm.cmd run test:e2e:production-uat -- --project=production-uat-mobile --project=production-uat-desktop --no-deps |
| EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT | SPR13-002 | PRODUCTION | Cross-role authorization boundaries | PASS | — |
| EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT | SPR13-002 | PRODUCTION | Live API, console, and read-only safety summary | PASS | — |
| EVIDENCE:SPR13-002:AUTHENTICATED-PRODUCTION-UAT | SPR13-002 | OTHER | Production authentication-state handling | PASS | — |
| EVIDENCE:SPR13-002:DEPLOYMENT-RETEST | SPR13-002 | DEPLOY | Frontend revision on production branch | PASS | git ls-remote origin refs/heads/main |
| EVIDENCE:SPR13-002:DEPLOYMENT-RETEST | SPR13-002 | PRODUCTION | Public navigation and responsive production smoke | PASS | Read-only headless Chromium against https://eduai.giaoducso.org.vn |
| EVIDENCE:SPR13-002:DEPLOYMENT-RETEST | SPR13-002 | PRODUCTION | Unauthenticated admin route guard | PASS | Navigate to https://eduai.giaoducso.org.vn/admin/dashboard |
| EVIDENCE:SPR13-002:DEPLOYMENT-RETEST | SPR13-002 | PRODUCTION | Authenticated cross-role production UAT | BLOCKED | — |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | OTHER | Navigation and authorization implementation review | PASS | — |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | TEST | Frontend unit suite | PASS | npm.cmd test -- --run |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | TEST | Desktop and mobile role-route browser matrix | PASS | Local Vite server plus headless Chromium route matrix |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | LINT | Focused diff integrity review | PASS | git diff --cached --check |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | OTHER | Installed production dependency integrity | PASS | npm.cmd ls --omit=dev --depth=0 |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | DEPLOY | Frontend deployment | BLOCKED | — |
| EVIDENCE:SPR13-002:LOCAL-READINESS | SPR13-002 | PRODUCTION | Affected route and cross-role production verification | BLOCKED | — |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | TEST | Deterministic demo fixture contract | PASS | npm.cmd run test:demo-data |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | OTHER | Demo database integrity | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | BUILD | Backend build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | TEST | Backend unit and role/ownership suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | TEST | Backend HTTP E2E suite | PASS | npm.cmd run test:e2e -- --runInBand |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | BUILD | Frontend build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | TEST | Frontend unit and local Playwright suites | PASS | npm.cmd test && npm.cmd run test:e2e |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | PRODUCTION | Read-only cross-role production regression | PASS | — |
| EVIDENCE:SPR13-003:CORE-V1-REGRESSION | SPR13-003 | OTHER | Core V1 regression checklist | PASS | — |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | OTHER | Frontend Playwright environment resolution | PASS | Playwright config load plus boolean runtime assertion |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | OTHER | Deterministic demo-account credential verification | PASS | npm.cmd run db:verify:demo plus read-only boolean password comparison |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | TEST | Approved local authentication setup | PASS | npm.cmd run test:e2e -- --project=auth-setup |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | TEST | Frontend Playwright suite | PASS | npm.cmd run test:e2e |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | TEST | Frontend unit suite | PASS | npm.cmd test |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR13-003:PLAYWRIGHT-AUTH-UNBLOCK | SPR13-003 | OTHER | Credential and artifact safety | PASS | — |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | TEST | Fresh production authentication setup | PASS | npm.cmd run test:e2e:production-uat -- --project=production-spr14-admin-api |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | PRODUCTION | Admin overview authenticated authorization matrix | PASS | Read-only Playwright GET verification against https://api.eduai.giaoducso.org.vn/api/v1/admin/reports/overview |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | PRODUCTION | Administrator aggregate response safety | PASS | — |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | PRODUCTION | Read-only and runtime-error safeguards | PASS | — |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | OTHER | Temporary authentication-state disposal | PASS | — |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | TEST | Frontend unit regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR14-001:AUTHENTICATED-PRODUCTION-UAT | SPR14-001 | LINT | Focused UAT harness integrity and credential review | PASS | git diff --cached --check plus focused source review |
| EVIDENCE:SPR14-001:DEPLOYMENT-RETEST | SPR14-001 | DEPLOY | Backend revision on production branch | PASS | git ls-remote origin refs/heads/main |
| EVIDENCE:SPR14-001:DEPLOYMENT-RETEST | SPR14-001 | PRODUCTION | Production API health | PASS | Body-discarding read-only GET https://api.eduai.giaoducso.org.vn/health |
| EVIDENCE:SPR14-001:DEPLOYMENT-RETEST | SPR14-001 | PRODUCTION | Admin overview route and unauthenticated boundary | PASS | Body-discarding read-only GET https://api.eduai.giaoducso.org.vn/api/v1/admin/reports/overview |
| EVIDENCE:SPR14-001:DEPLOYMENT-RETEST | SPR14-001 | MANUAL | Production migration attestation | BLOCKED | — |
| EVIDENCE:SPR14-001:DEPLOYMENT-RETEST | SPR14-001 | PRODUCTION | Authenticated role and aggregate-data matrix | BLOCKED | — |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | OTHER | Admin domain implementation review | PASS | — |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | TEST | Focused admin controller and service tests | PASS | npm.cmd test -- --runInBand src/modules/admin/admin.controller.spec.ts src/modules/admin/admin.service.spec.ts |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | TEST | Admin authorization HTTP integration | PASS | npm.cmd run test:e2e -- --runInBand test/admin.e2e-spec.ts |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | TEST | Backend unit regression suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | TEST | Backend HTTP regression suite | PASS | npm.cmd run test:e2e -- --runInBand |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | BUILD | Backend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | OTHER | Aggregate query and index profile | PASS | npm.cmd run prisma:validate plus focused static query review |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | LINT | Focused commit integrity and secret scan | PASS | git diff --cached --check plus staged secret-pattern scan |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | DEPLOY | Backend and migration deployment | BLOCKED | — |
| EVIDENCE:SPR14-001:LOCAL-READINESS | SPR14-001 | PRODUCTION | Admin overview production authorization and data verification | BLOCKED | — |
| EVIDENCE:SPR14-001:MIGRATION-RETEST | SPR14-001 | DEPLOY | Exact-revision production workflow | PASS | Read-only GitHub Actions workflow-run metadata query |
| EVIDENCE:SPR14-001:MIGRATION-RETEST | SPR14-001 | DEPLOY | Production migration and deploy job | PASS | Read-only GitHub Actions job metadata plus workflow-source review |
| EVIDENCE:SPR14-001:MIGRATION-RETEST | SPR14-001 | PRODUCTION | Authenticated role and aggregate-data matrix | BLOCKED | — |
| EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION | SPR14-002 | OTHER | Deterministic Playwright authentication readiness | PASS | Boolean-only environment/runtime checks plus approved login flow |
| EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION | SPR14-002 | TEST | Complete Frontend Playwright regression | PASS | npm.cmd run test:e2e |
| EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION | SPR14-002 | PRODUCTION | Authenticated dashboard role and responsive UAT | PASS | npm.cmd run test:e2e:production-uat -- --project=production-uat-mobile --project=production-uat-desktop --project=production-spr14-audit-api |
| EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION | SPR14-002 | OTHER | Read-only and credential-artifact controls | PASS | — |
| EVIDENCE:SPR14-002:AUTHENTICATED-UAT-COMPLETION | SPR14-002 | LINT | Focused harness and visual-baseline review | PASS | git diff --cached --check plus five-axis review |
| EVIDENCE:SPR14-002:DEPLOYMENT-RETEST | SPR14-002 | DEPLOY | Dashboard revision on remote main | PASS | git ls-remote origin refs/heads/main |
| EVIDENCE:SPR14-002:DEPLOYMENT-RETEST | SPR14-002 | DEPLOY | Exact-revision Frontend CI and production deploy | PASS | Read-only GitHub Actions run/job metadata query |
| EVIDENCE:SPR14-002:DEPLOYMENT-RETEST | SPR14-002 | PRODUCTION | Production dashboard route deployment | PASS | Read-only GET of the production dashboard page and in-memory public script marker check |
| EVIDENCE:SPR14-002:DEPLOYMENT-RETEST | SPR14-002 | MANUAL | Authenticated dashboard role and responsive UAT | BLOCKED | — |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | TEST | Frontend unit regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | OTHER | Responsive deterministic layout verification | PASS | Playwright render-only assertions with the API route replaced by a local aggregate fixture |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | TEST | Authenticated local Playwright dashboard matrix | BLOCKED | playwright test playwright/admin-dashboard.spec.ts |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | DEPLOY | Frontend deployment | BLOCKED | — |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | PRODUCTION | Dedicated admin dashboard production UAT | BLOCKED | — |
| EVIDENCE:SPR14-002:LOCAL-READINESS | SPR14-002 | LINT | Focused diff and security review | PASS | git diff --cached --check plus five-axis source and artifact review |
| EVIDENCE:SPR14-003:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-003 | TEST | Deterministic credential rotation and fresh authentication | PASS | Temporary sanitized Backend rotation verifier and Playwright production auth setup; both removed after use |
| EVIDENCE:SPR14-003:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-003 | PRODUCTION | Dedicated user-management mutation lifecycle | PASS | Temporary exact-target sanitized Playwright production write UAT; removed after use |
| EVIDENCE:SPR14-003:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-003 | TEST | Last-active-platform-administrator safeguard | PASS | — |
| EVIDENCE:SPR14-003:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-003 | OTHER | Secret and artifact containment | PASS | — |
| EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-003 | DEPLOY | Exact-revision production deployment | PASS | Read-only Git remote and GitHub Actions API verification |
| EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-003 | PRODUCTION | Admin user-management read authorization matrix | PASS | Sanitized production-spr14-remaining-readonly Playwright project |
| EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-003 | PRODUCTION | Live responsive user-management view | PASS | — |
| EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-003 | OTHER | Fresh-session and artifact containment | PASS | — |
| EVIDENCE:SPR14-003:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-003 | MANUAL | Credential rotation and dedicated account-mutation UAT | BLOCKED | — |
| EVIDENCE:SPR14-003:FRONTEND-HARNESS-DEPLOYMENT-RETEST | SPR14-003 | DEPLOY | Sanitized UAT harness revision deployment | PASS | Read-only Git remote and GitHub Actions API verification |
| EVIDENCE:SPR14-003:FRONTEND-HARNESS-DEPLOYMENT-RETEST | SPR14-003 | PRODUCTION | Post-deployment public smoke check | PASS | — |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | TEST | Backend account authorization and mutation safeguards | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | TEST | Backend HTTP, schema, and build regression | PASS | npm.cmd run test:e2e -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | TEST | Frontend user-management behavior and build | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | TEST | Fresh-login local Playwright regression and responsive user management | PASS | Temporary external-server Playwright runner removed after execution |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | OTHER | Secret artifact containment | PASS | — |
| EVIDENCE:SPR14-003:LOCAL-READINESS | SPR14-003 | MANUAL | Production deployment and authorized safe account-mutation UAT | BLOCKED | — |
| EVIDENCE:SPR14-004:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-004 | PRODUCTION | Dedicated moderation authorization and lifecycle | PASS | Temporary exact-target sanitized Playwright production write UAT; removed after use |
| EVIDENCE:SPR14-004:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-004 | PRODUCTION | Responsive production moderation UI | PASS | — |
| EVIDENCE:SPR14-004:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-004 | TEST | Immutable reason-preserving moderation evidence | PASS | — |
| EVIDENCE:SPR14-004:CREDENTIAL-ROTATION-AND-PRODUCTION-WRITE-UAT | SPR14-004 | OTHER | Failure containment and single-target guarantee | PASS | — |
| EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-004 | DEPLOY | Exact-revision production deployment and migration | PASS | Read-only Git remote and GitHub Actions API verification |
| EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-004 | PRODUCTION | Moderation read authorization matrix and response safety | PASS | Sanitized production-spr14-remaining-readonly Playwright project |
| EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-004 | PRODUCTION | Live responsive moderation queue | PASS | — |
| EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-004 | OTHER | Read-only enforcement and sanitized reporting | PASS | — |
| EVIDENCE:SPR14-004:DEPLOYMENT-READONLY-PRODUCTION-UAT | SPR14-004 | MANUAL | Dedicated moderation mutation and visibility lifecycle UAT | BLOCKED | — |
| EVIDENCE:SPR14-004:FRONTEND-HARNESS-DEPLOYMENT-RETEST | SPR14-004 | DEPLOY | Sanitized UAT harness revision deployment | PASS | Read-only Git remote and GitHub Actions API verification |
| EVIDENCE:SPR14-004:FRONTEND-HARNESS-DEPLOYMENT-RETEST | SPR14-004 | PRODUCTION | Post-deployment moderation-route smoke check | PASS | — |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | TEST | Backend moderation authorization, invariants, and regression | PASS | npm.cmd test -- --runInBand; npm.cmd run test:e2e -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | TEST | Frontend moderation workflow and build | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | TEST | Credential-independent responsive browser verification | PASS | npm.cmd run test:e2e:visual |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | OTHER | Schema, public visibility, and documentation review | PASS | — |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | OTHER | Authentication artifact containment | PASS | — |
| EVIDENCE:SPR14-004:LOCAL-READINESS | SPR14-004 | MANUAL | Production deployment, migration, and authorized moderation UAT | BLOCKED | — |
| EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT | SPR14-005 | PRODUCTION | Audit API authorization matrix | PASS | npm.cmd run test:e2e:production-uat -- --project=production-spr14-audit-api |
| EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT | SPR14-005 | OTHER | Administrator audit response shape and sanitization | PASS | — |
| EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT | SPR14-005 | PRODUCTION | Live responsive audit viewer and filters | PASS | Production Playwright at 320px and 1440px |
| EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT | SPR14-005 | OTHER | Representative safe audit events | PASS | Authorized read-only Prisma verification |
| EVIDENCE:SPR14-005:AUTHENTICATED-PRODUCTION-UAT | SPR14-005 | OTHER | Read-only production controls | PASS | — |
| EVIDENCE:SPR14-005:AUTHORIZED-DB-PREFLIGHT | SPR14-005 | TEST | Configured deterministic fixture integrity | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR14-005:AUTHORIZED-DB-PREFLIGHT | SPR14-005 | OTHER | Runtime audit migration and trigger preflight | PASS | Authorized sanitized read-only Prisma catalog queries |
| EVIDENCE:SPR14-005:AUTHORIZED-DB-PREFLIGHT | SPR14-005 | OTHER | Representative record sanitization preflight | PASS | — |
| EVIDENCE:SPR14-005:AUTHORIZED-DB-PREFLIGHT | SPR14-005 | MANUAL | Database-enforced UPDATE and DELETE rejection execution | BLOCKED | — |
| EVIDENCE:SPR14-005:DATABASE-IMMUTABILITY-VERIFICATION | SPR14-005 | TEST | Authorized dedicated audit verification row insertion | PASS | Temporary TypeScript/Prisma verifier removed after execution |
| EVIDENCE:SPR14-005:DATABASE-IMMUTABILITY-VERIFICATION | SPR14-005 | TEST | Database-enforced UPDATE rejection | PASS | — |
| EVIDENCE:SPR14-005:DATABASE-IMMUTABILITY-VERIFICATION | SPR14-005 | TEST | Database-enforced DELETE rejection and final invariant | PASS | — |
| EVIDENCE:SPR14-005:DATABASE-IMMUTABILITY-VERIFICATION | SPR14-005 | OTHER | Scoped mutation and evidence safety controls | PASS | — |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | DEPLOY | Exact Backend and Frontend revisions on remote main | PASS | git ls-remote origin refs/heads/main |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | DEPLOY | Exact-revision Backend CI, migration, and production deploy | PASS | Read-only GitHub Actions run/job metadata query plus versioned workflow-source review |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | DEPLOY | Exact-revision Frontend CI and production deploy | PASS | Read-only GitHub Actions run/job metadata query |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | PRODUCTION | Production health and unauthenticated audit API boundary | PASS | Body-discarding read-only GET checks against the production API |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | PRODUCTION | Production audit viewer route deployment | PASS | Read-only GET of the production audit page and in-memory public script marker check |
| EVIDENCE:SPR14-005:DEPLOYMENT-RETEST | SPR14-005 | MANUAL | Authenticated role matrix, representative events, and live viewer UAT | BLOCKED | — |
| EVIDENCE:SPR14-005:ISOLATED-IMMUTABILITY-RETEST | SPR14-005 | OTHER | Database-test isolation audit | PASS | Targeted package, Jest, environment-filename, migration, and audit-test source review |
| EVIDENCE:SPR14-005:ISOLATED-IMMUTABILITY-RETEST | SPR14-005 | OTHER | Disposable PostgreSQL runtime availability | BLOCKED | Non-mutating Docker and PostgreSQL CLI availability checks |
| EVIDENCE:SPR14-005:ISOLATED-IMMUTABILITY-RETEST | SPR14-005 | TEST | Database-enforced audit UPDATE and DELETE rejection | BLOCKED | — |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | OTHER | Audit schema and append-only migration validation | PASS | npm.cmd run prisma:validate plus focused migration review |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | TEST | Backend unit regression and sensitive producer coverage | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | TEST | Admin audit HTTP authorization contract | PASS | npm.cmd run test:e2e -- --runInBand admin.e2e-spec.ts |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | TEST | Frontend unit regression suite | PASS | npm.cmd run test |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | BUILD | Affected production builds | PASS | npm.cmd run build in EduAI-Back-End and EduAI-Front-End-Web |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | OTHER | Responsive deterministic audit viewer verification | PASS | playwright test --update-snapshots --project=chromium --no-deps admin-dashboard.spec.ts --grep renders the audit log |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | LINT | Focused diff and security review | PASS | git diff --check plus contract, authorization, data-minimization, and artifact review |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | DEPLOY | Audit migration and application deployment | BLOCKED | — |
| EVIDENCE:SPR14-005:LOCAL-READINESS | SPR14-005 | PRODUCTION | Production audit creation and admin-only viewer UAT | BLOCKED | — |
| EVIDENCE:SPR15-001:AUTHORITATIVE-PRODUCTION-UAT | SPR15-001 | PRODUCTION | Exact-target containment and supported restoration | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-001:AUTHORITATIVE-PRODUCTION-UAT | SPR15-001 | PRODUCTION | Required and optional lesson, quiz, and assignment completion policy | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-001:AUTHORITATIVE-PRODUCTION-UAT | SPR15-001 | PRODUCTION | Concurrent final evaluation and idempotent completion | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-001:AUTHORITATIVE-PRODUCTION-UAT | SPR15-001 | PRODUCTION | Dedicated topology archive and artifact containment | PASS | Sanitized temporary production API verifier and scoped local cleanup |
| EVIDENCE:SPR15-001:DEPLOYMENT-READONLY-VERIFICATION | SPR15-001 | DEPLOY | Exact Backend revision and completion-policy migration deployment | PASS | Read-only GitHub Actions API verification |
| EVIDENCE:SPR15-001:DEPLOYMENT-READONLY-VERIFICATION | SPR15-001 | DEPLOY | Exact Frontend contract deployment | PASS | Read-only GitHub Actions API verification |
| EVIDENCE:SPR15-001:DEPLOYMENT-READONLY-VERIFICATION | SPR15-001 | PRODUCTION | Read-only production health and public completion-policy contract | PASS | Sanitized GET-only production verification |
| EVIDENCE:SPR15-001:DEPLOYMENT-READONLY-VERIFICATION | SPR15-001 | MANUAL | Dedicated authoritative completion production scenario | BLOCKED | — |
| EVIDENCE:SPR15-001:LOCAL-READINESS | SPR15-001 | TEST | Required-item completion policy and transactional evaluator | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR15-001:LOCAL-READINESS | SPR15-001 | TEST | HTTP and application regression | PASS | npm.cmd run test:e2e -- --runInBand |
| EVIDENCE:SPR15-001:LOCAL-READINESS | SPR15-001 | TEST | Schema, migration, and affected builds | PASS | npm.cmd run prisma:validate; npm.cmd run build in each affected repository |
| EVIDENCE:SPR15-001:LOCAL-READINESS | SPR15-001 | OTHER | Authoritative completion and compatibility review | PASS | — |
| EVIDENCE:SPR15-001:LOCAL-UAT-ARTIFACT-CLEANUP | SPR15-001 | OTHER | Temporary production-UAT Playwright artifact cleanup | PASS | Remove-Item -LiteralPath D:\Work\Edu-AI\EduAI-Front-End-Web\playwright\.tmp-spr15-001-results -Recurse -Force |
| EVIDENCE:SPR15-001:PRODUCTION-WRITE-UAT-ATTEMPT | SPR15-001 | OTHER | Standing bounded production write-UAT authorization | NOT_APPLICABLE | — |
| EVIDENCE:SPR15-001:PRODUCTION-WRITE-UAT-ATTEMPT | SPR15-001 | PRODUCTION | Single dedicated completion-policy topology attempt | FAIL | Sanitized Playwright API-level production verifier |
| EVIDENCE:SPR15-001:PRODUCTION-WRITE-UAT-ATTEMPT | SPR15-001 | MANUAL | Exact-target containment diagnostic | BLOCKED | — |
| EVIDENCE:SPR15-002:AUTHORITATIVE-PRODUCTION-UAT | SPR15-002 | TEST | Quiz policy backend regression suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR15-002:AUTHORITATIVE-PRODUCTION-UAT | SPR15-002 | TEST | Quiz policy frontend regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR15-002:AUTHORITATIVE-PRODUCTION-UAT | SPR15-002 | DEPLOY | Quiz policy deployment contract | PASS | Pushed focused backend/frontend main commits and read-only production Swagger check |
| EVIDENCE:SPR15-002:AUTHORITATIVE-PRODUCTION-UAT | SPR15-002 | PRODUCTION | Contained quiz policy, history, and cleanup UAT | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-003:PRODUCTION-UAT-DEPLOYMENT-BLOCKER | SPR15-003 | TEST | Assignment versioning and rubric regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR15-003:PRODUCTION-UAT-DEPLOYMENT-BLOCKER | SPR15-003 | TEST | Assignment management frontend regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR15-003:PRODUCTION-UAT-DEPLOYMENT-BLOCKER | SPR15-003 | DEPLOY | Assignment versioning deployment and API contract | PASS | Pushed focused commits, deployment workflow verification, and read-only production Swagger check |
| EVIDENCE:SPR15-003:PRODUCTION-UAT-DEPLOYMENT-BLOCKER | SPR15-003 | PRODUCTION | Contained authenticated assignment-submission UAT | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | TEST | Certificate lifecycle backend verification | PASS | npm.cmd test; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | TEST | Certificate lifecycle frontend verification | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | DEPLOY | Certificate lifecycle deployment and migrations | PASS | GitHub production workflows and sanitized migration-status verifier |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | PRODUCTION | Production defect diagnosis and corrective migration | PASS | Scoped local reproduction against configured production services |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | PRODUCTION | Automatic issuance, idempotency, revocation, and public privacy UAT | PASS | Sanitized temporary production API verifier |
| EVIDENCE:SPR15-004:AUTHORITATIVE-PRODUCTION-UAT | SPR15-004 | PRODUCTION | Dedicated topology cleanup | PASS | Sanitized API cleanup and read-only aggregate verification |
| EVIDENCE:SPR16-001:AUTHENTICATED-PRODUCTION-UAT | SPR16-001 | DEPLOY | Backend CI, deploy, migration, and readiness workflow | PASS | Read-only GitHub Actions API verification for run 31667869369; inspect deploy-production.yml |
| EVIDENCE:SPR16-001:AUTHENTICATED-PRODUCTION-UAT | SPR16-001 | PRODUCTION | Fresh role authentication and unauthenticated notification boundaries | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-notifications-readonly |
| EVIDENCE:SPR16-001:AUTHENTICATED-PRODUCTION-UAT | SPR16-001 | PRODUCTION | Bounded, sanitized current-user notification read contracts | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-notifications-readonly |
| EVIDENCE:SPR16-001:AUTHENTICATED-PRODUCTION-UAT | SPR16-001 | BUILD | Frontend notification UAT harness compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-001:DEPLOYMENT-READONLY-VERIFICATION | SPR16-001 | DEPLOY | Backend notification foundation is present on origin/main | PASS | git fetch origin main; git rev-list --left-right --count origin/main...main |
| EVIDENCE:SPR16-001:DEPLOYMENT-READONLY-VERIFICATION | SPR16-001 | PRODUCTION | Public production health and Swagger notification contract | PASS | curl.exe -sS -o NUL -w status https://api.eduai.giaoducso.org.vn/health /api/docs /api/docs-json; parse docs-json paths |
| EVIDENCE:SPR16-001:DEPLOYMENT-READONLY-VERIFICATION | SPR16-001 | PRODUCTION | Fresh authenticated notification read UAT | BLOCKED | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-notifications-readonly |
| EVIDENCE:SPR16-001:LOCAL-READINESS | SPR16-001 | TEST | Notification-domain focused regression | PASS | npm.cmd test -- notifications.service.spec.ts --runInBand |
| EVIDENCE:SPR16-001:LOCAL-READINESS | SPR16-001 | TEST | Backend notification-domain regression and compilation | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR16-002:LOCAL-BROWSER-READINESS | SPR16-002 | TEST | Notification API client, safe deep links, optimistic updates, and keyboard behavior | PASS | npm.cmd test -- NotificationCenter.test.tsx notification-destination.test.ts notification.service.test.ts --run |
| EVIDENCE:SPR16-002:LOCAL-BROWSER-READINESS | SPR16-002 | TEST | Fresh authenticated mobile notification center scenario | PASS | npm.cmd exec -- playwright test playwright/notification-center.spec.ts --project chromium --reporter=line |
| EVIDENCE:SPR16-002:LOCAL-BROWSER-READINESS | SPR16-002 | BUILD | Frontend notification center compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-002:LOCAL-BROWSER-READINESS | SPR16-002 | PRODUCTION | Deployed cross-role notification center verification | BLOCKED | Requires MANUAL:SPR16_002_DEPLOYMENT |
| EVIDENCE:SPR16-002:LOCAL-UI-INCREMENT | SPR16-002 | TEST | Notification API client, safe deep links, and optimistic UI rollback | PASS | npm.cmd test -- src/features/notifications/NotificationCenter.test.tsx src/features/notifications/notification-destination.test.ts src/services/notification.service.test.ts |
| EVIDENCE:SPR16-002:LOCAL-UI-INCREMENT | SPR16-002 | BUILD | Frontend notification center compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-002:LOCAL-UI-INCREMENT | SPR16-002 | TEST | Local keyboard and mobile notification center scenario | BLOCKED | npm.cmd run test:e2e -- playwright/notification-center.spec.ts |
| EVIDENCE:SPR16-002:PRODUCTION-UAT | SPR16-002 | DEPLOY | Frontend CI and production deployment | PASS | Read-only GitHub Actions API verification for runs 31674289296 and 31674289172 |
| EVIDENCE:SPR16-002:PRODUCTION-UAT | SPR16-002 | PRODUCTION | Fresh three-role keyboard notification center UAT | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-notification-center-readonly --reporter=line |
| EVIDENCE:SPR16-002:PRODUCTION-UAT | SPR16-002 | BUILD | Production UAT harness compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | TEST | Certificate issuance notification producer coverage | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | BUILD | Backend and frontend production compilation | PASS | EduAI-Back-End: npm.cmd run prisma:validate; npm.cmd run build. EduAI-Front-End-Web: npm.cmd run build. |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | DEPLOY | Backend certificate producer and frontend UAT harness deployments | PASS | Read-only GitHub Actions API verification for Backend runs 31859525626 and 31859525636 and Frontend runs 31861196175 and 31861196177 |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | PRODUCTION | Backend health after certificate producer deployment | PASS | GET https://api.eduai.giaoducso.org.vn/health |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | PRODUCTION | Contained certificate issuance notification UAT and recipient boundary | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-certificate-producer --reporter=line |
| EVIDENCE:SPR16-003:CERTIFICATE-PRODUCER-PRODUCTION-UAT | SPR16-003 | PRODUCTION | Deployed SSE reconnect and polling fallback regression | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-sse-readonly --reporter=line |
| EVIDENCE:SPR16-003:DEPLOYMENT-READONLY-UAT | SPR16-003 | DEPLOY | Backend and Frontend SSE deployment | PASS | Read-only GitHub Actions API verification for Backend runs 31781200025 and 31781200032 and Frontend runs 31781203138 and 31781203130 |
| EVIDENCE:SPR16-003:DEPLOYMENT-READONLY-UAT | SPR16-003 | PRODUCTION | Read-only authenticated SSE connection, retry, and fallback UAT | PASS | npm.cmd exec -- playwright test --config playwright.production.config.ts --project production-spr16-sse-readonly --reporter=line |
| EVIDENCE:SPR16-003:DEPLOYMENT-READONLY-UAT | SPR16-003 | BUILD | Production SSE UAT harness compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-003:DEPLOYMENT-READONLY-UAT | SPR16-003 | PRODUCTION | Contained recipient-isolation and visible replay UAT | BLOCKED | Requires MANUAL:SPR16_003_DEPLOYMENT |
| EVIDENCE:SPR16-003:LOCAL-READINESS | SPR16-003 | TEST | Authenticated notification stream ownership, replay, and cleanup | PASS | npm.cmd test -- --runInBand notification-stream.service.spec.ts notifications.service.spec.ts |
| EVIDENCE:SPR16-003:LOCAL-READINESS | SPR16-003 | BUILD | Backend SSE compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-003:LOCAL-READINESS | SPR16-003 | TEST | Frontend stream reconnect, de-duplication, and polling fallback | PASS | npm.cmd test -- --run src/services/notification-stream.client.test.ts src/services/notification.service.test.ts src/features/notifications/NotificationCenter.test.tsx src/features/notifications/use-notification-stream.test.tsx |
| EVIDENCE:SPR16-003:LOCAL-READINESS | SPR16-003 | BUILD | Frontend SSE compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-003:LOCAL-READINESS | SPR16-003 | PRODUCTION | Deployed cross-role SSE UAT | BLOCKED | Requires MANUAL:SPR16_003_DEPLOYMENT |
| EVIDENCE:SPR16-003:PRODUCER-GAP | SPR16-003 | OTHER | Notification producer source audit | BLOCKED | rg -n "createForUser\(\|NotificationsService\|notificationService" EduAI-Back-End/src --glob '!**/*.spec.ts' |
| EVIDENCE:SPR16-004:LOCAL-DELIVERY-POLICY | SPR16-004 | TEST | Email purpose, preferences, retry claim, failure redaction, preview, and idempotent delivery coverage | PASS | npm.cmd test -- env.validation.spec.ts notification-email.provider.spec.ts notification-email-delivery.service.spec.ts notifications.service.spec.ts --runInBand |
| EVIDENCE:SPR16-004:LOCAL-DELIVERY-POLICY | SPR16-004 | BUILD | Backend schema and compilation verification | PASS | npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR16-004:LOCAL-DELIVERY-POLICY | SPR16-004 | PRODUCTION | Approved provider deployment and bounded optional email receipt | BLOCKED | Requires MANUAL:SPR16_004_EMAIL_PROVIDER |
| EVIDENCE:SPR16-004:LOCAL-IMPLEMENTATION | SPR16-004 | TEST | Email provider, preference, retry claim, failure redaction, and idempotent delivery coverage | PASS | npm.cmd test -- env.validation.spec.ts notification-email.provider.spec.ts notification-email-delivery.service.spec.ts notifications.service.spec.ts --runInBand |
| EVIDENCE:SPR16-004:LOCAL-IMPLEMENTATION | SPR16-004 | BUILD | Backend schema and compilation verification | PASS | npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR16-004:LOCAL-IMPLEMENTATION | SPR16-004 | TEST | Frontend email preference API and accessible control coverage | PASS | npm.cmd test -- NotificationCenter.test.tsx notification.service.test.ts --run |
| EVIDENCE:SPR16-004:LOCAL-IMPLEMENTATION | SPR16-004 | BUILD | Frontend production compilation | PASS | npm.cmd run build |
| EVIDENCE:SPR16-004:LOCAL-IMPLEMENTATION | SPR16-004 | PRODUCTION | Approved provider deployment and opt-in email receipt | BLOCKED | Requires MANUAL:SPR16_004_EMAIL_PROVIDER |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | TEST | Focused notification-email delivery coverage | PASS | npm.cmd test -- env.validation.spec.ts notification-email.provider.spec.ts notification-email-delivery.service.spec.ts notifications.service.spec.ts --runInBand |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | DEPLOY | Production email runtime guard and PM2 reload | PASS | GitHub Actions run 31985955198 for Backend commit b8bee8b8c09a5e396aa5a954abe32433bffe059e |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Public health after runtime reload | PASS | GET https://api.eduai.giaoducso.org.vn/health |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Password-login endpoint applicability classification | PASS | Scoped production password-endpoint preflight and source review |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Normal Google sign-in session | PASS | Production Google account chooser through the supported frontend UI |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Contained certificate optional-email flow | PASS | Production UI: enable certificate preference, enroll in one temporary public course, complete its only lesson |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Provider acceptance and bounded inbox delivery | PASS | Approved-recipient mailbox query limited to the configured EduAI sender and current-day UAT window |
| EVIDENCE:SPR16-004:PRODUCTION-RUNTIME-READINESS | SPR16-004 | PRODUCTION | Recipient isolation and UAT cleanup | PASS | Production instructor notification-center check and temporary-course archive |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | TEST | Learner profile backend service coverage | PASS | npm.cmd test -- profile.service.spec.ts --runInBand |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | TEST | Learner profile frontend interaction coverage | PASS | npm.cmd test -- LearningProfileSection.test.tsx NotificationCenter.test.tsx |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | BUILD | Backend schema and application build | PASS | npm.cmd run prisma:generate && npm.cmd run prisma:validate && npm.cmd run build |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | DEPLOY | Backend learner-profile deployment | PASS | GitHub Actions Backend CI run 31992009506 and Deploy Backend Production run 31992009572 for commit 933b73a |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | DEPLOY | Frontend learner-profile deployment | PASS | GitHub Actions Frontend CI run 31992173690 and Deploy Frontend Production run 31992173682 for commit 80e572b |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | PRODUCTION | Backend health after learner-profile deployment | PASS | GET https://api.eduai.giaoducso.org.vn/health |
| EVIDENCE:SPR17-001:PRODUCTION-UAT | SPR17-001 | PRODUCTION | Contained Google-authenticated learner-profile UAT and cleanup | PASS | Production Student Profile UI through normal Google sign-in |
| EVIDENCE:SPR17-002:DELIVERY-READINESS | SPR17-002 | TEST | Backend learning-path and provider regression suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR17-002:DELIVERY-READINESS | SPR17-002 | BUILD | Backend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR17-002:DELIVERY-READINESS | SPR17-002 | DEPLOY | Backend learning-path deployment | PASS | GitHub Actions Backend CI run 31994137461 and Deploy Backend Production run 31994137392 for commit 7352ec5 |
| EVIDENCE:SPR17-002:DELIVERY-READINESS | SPR17-002 | PRODUCTION | Backend health after learning-path deployment | PASS | GET https://api.eduai.giaoducso.org.vn/health |
| EVIDENCE:SPR17-002:GEMINI-SCHEMA-COMPATIBILITY | SPR17-002 | TEST | Gemini response-schema compatibility regression | PASS | npm.cmd test -- --runInBand src/modules/ai/ai-learning-path.service.spec.ts |
| EVIDENCE:SPR17-002:GEMINI-SCHEMA-COMPATIBILITY | SPR17-002 | TEST | Backend AI module regression | PASS | npm.cmd test -- --runInBand src/modules/ai |
| EVIDENCE:SPR17-002:GEMINI-SCHEMA-COMPATIBILITY | SPR17-002 | BUILD | Backend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR17-002:GEMINI-SCHEMA-COMPATIBILITY | SPR17-002 | OTHER | Official provider schema contract | PASS | — |
| EVIDENCE:SPR17-002:PRODUCTION-GENERATION-UAT | SPR17-002 | DEPLOY | Backend CI and production deployment | PASS | — |
| EVIDENCE:SPR17-002:PRODUCTION-GENERATION-UAT | SPR17-002 | PRODUCTION | Production API health | PASS | — |
| EVIDENCE:SPR17-002:PRODUCTION-GENERATION-UAT | SPR17-002 | PRODUCTION | Seed learner learning-path generation and regeneration | PASS | npx.cmd playwright test --config playwright/.tmp-spr17-002.production.config.ts |
| EVIDENCE:SPR17-002:PRODUCTION-GENERATION-UAT | SPR17-002 | PRODUCTION | Recommended-course authorization | PASS | — |
| EVIDENCE:SPR17-002:PRODUCTION-GENERATION-UAT | SPR17-002 | OTHER | UAT containment and harness correction | PASS | — |
| EVIDENCE:SPR17-002:PRODUCTION-UAT-BLOCKED | SPR17-002 | PRODUCTION | Google-authentication applicability correction | PASS | — |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | TEST | Backend learning-path read contract and AI regression | PASS | npm.cmd test -- --runInBand src/modules/ai; npm.cmd run build |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | TEST | Frontend component, service, routing, and full unit regression | PASS | npm.cmd test -- --run |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | TEST | Responsive and accessible browser matrix | PASS | npx.cmd playwright test --config playwright/.tmp-learning-path.config.ts |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | OTHER | Shared local auth setup diagnostic | NOT_APPLICABLE | — |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | DEPLOY | Exact-revision CI and production deployments | PASS | — |
| EVIDENCE:SPR17-003:PRODUCTION-DASHBOARD-UAT | SPR17-003 | PRODUCTION | Seed-learner dashboard UAT | PASS | npx.cmd playwright test --config playwright/.tmp-spr17-003.production.config.ts |
| EVIDENCE:SPR17-004:DELIVERY-READINESS | SPR17-004 | TEST | Backend course-grounding regression suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR17-004:DELIVERY-READINESS | SPR17-004 | BUILD | Backend and frontend production builds | PASS | npm.cmd run build in both application repositories |
| EVIDENCE:SPR17-004:DELIVERY-READINESS | SPR17-004 | DEPLOY | Exact-revision backend and frontend production deployment | PASS | GitHub Actions run metadata for backend CI 31995653008, backend deployment 31995653003, frontend CI 31995910660, and frontend deployment 31995910877 |
| EVIDENCE:SPR17-004:DELIVERY-READINESS | SPR17-004 | PRODUCTION | Tutor API availability and authorization boundary | PASS | Read-only GET checks against production health, OpenAPI, and unauthenticated AI sources |
| EVIDENCE:SPR17-004:EMBEDDING-REBUILD-DEPLOYMENT | SPR17-004 | TEST | Embedding rebuild focused and full backend regression coverage | PASS | npm.cmd test -- --runInBand src/modules/ai/ai-embedding.service.spec.ts src/modules/ai/ai.controller.spec.ts; npm.cmd test -- --runInBand |
| EVIDENCE:SPR17-004:EMBEDDING-REBUILD-DEPLOYMENT | SPR17-004 | BUILD | Backend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR17-004:EMBEDDING-REBUILD-DEPLOYMENT | SPR17-004 | DEPLOY | Exact-revision backend CI and production deployment | PASS | GitHub Actions Backend CI run 32010434726 and Deploy Backend Production run 32010434669 |
| EVIDENCE:SPR17-004:EMBEDDING-REBUILD-DEPLOYMENT | SPR17-004 | PRODUCTION | Health and documented rebuild contract | PASS | Read-only GET production health and OpenAPI |
| EVIDENCE:SPR17-004:PRODUCTION-CITATION-UAT | SPR17-004 | TEST | Backend grounded-tutor and complete regression | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR17-004:PRODUCTION-CITATION-UAT | SPR17-004 | DEPLOY | Exact-revision embedding and citation fixes | PASS | — |
| EVIDENCE:SPR17-004:PRODUCTION-CITATION-UAT | SPR17-004 | MANUAL | Administrator embedding rebuild | PASS | — |
| EVIDENCE:SPR17-004:PRODUCTION-CITATION-UAT | SPR17-004 | PRODUCTION | Learner selected-course citation UAT | PASS | — |
| EVIDENCE:SPR17-004:PRODUCTION-UAT-BLOCKED | SPR17-004 | MANUAL | Contained Google-authenticated course tutor UAT | BLOCKED | — |
| EVIDENCE:SPR18-001:CAREER-PROFILE-UAT | SPR18-001 | TEST | Career profile ownership, privacy, and projection regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR18-001:CAREER-PROFILE-UAT | SPR18-001 | TEST | Career profile UI and frontend regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR18-001:CAREER-PROFILE-UAT | SPR18-001 | DEPLOY | Exact-revision CI and production deployments | PASS | — |
| EVIDENCE:SPR18-001:CAREER-PROFILE-UAT | SPR18-001 | PRODUCTION | Seed learner owner and published career profile UAT | PASS | — |
| EVIDENCE:SPR18-001:CAREER-PROFILE-UAT | SPR18-001 | OTHER | UAT containment | PASS | — |
| EVIDENCE:SPR18-002:JOB-OPPORTUNITY-UAT | SPR18-002 | TEST | Job lifecycle, visibility, pagination, authorization, and audit regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR18-002:JOB-OPPORTUNITY-UAT | SPR18-002 | TEST | Admin and student job UI regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR18-002:JOB-OPPORTUNITY-UAT | SPR18-002 | DEPLOY | Exact-revision CI and production deployments | PASS | — |
| EVIDENCE:SPR18-002:JOB-OPPORTUNITY-UAT | SPR18-002 | PRODUCTION | Bounded administrator lifecycle and student listing UAT | PASS | — |
| EVIDENCE:SPR18-002:JOB-OPPORTUNITY-UAT | SPR18-002 | OTHER | Production cleanup and credential containment | PASS | — |
| EVIDENCE:SPR18-003:JOB-APPLICATION-UAT | SPR18-003 | TEST | Private application lifecycle, ownership, transition, notification, and duplicate regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR18-003:JOB-APPLICATION-UAT | SPR18-003 | TEST | Learner and administrator application UI regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR18-003:JOB-APPLICATION-UAT | SPR18-003 | DEPLOY | Exact-revision CI and production deployments | PASS | — |
| EVIDENCE:SPR18-003:JOB-APPLICATION-UAT | SPR18-003 | PRODUCTION | Bounded learner and administrator application lifecycle UAT | PASS | — |
| EVIDENCE:SPR18-003:JOB-APPLICATION-UAT | SPR18-003 | OTHER | Production cleanup and credential containment | PASS | — |
| EVIDENCE:SPR18-004:JOB-SKILL-MATCHING-UAT | SPR18-004 | TEST | Deterministic skill scoring, proficiency gaps, course visibility, and application boundary regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR18-004:JOB-SKILL-MATCHING-UAT | SPR18-004 | TEST | Learner skill-gap UI and role-aware job detail regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR18-004:JOB-SKILL-MATCHING-UAT | SPR18-004 | DEPLOY | Exact-revision CI and production deployments | PASS | — |
| EVIDENCE:SPR18-004:JOB-SKILL-MATCHING-UAT | SPR18-004 | PRODUCTION | Bounded deterministic matching and accessible-course UAT | PASS | — |
| EVIDENCE:SPR18-004:JOB-SKILL-MATCHING-UAT | SPR18-004 | OTHER | Production cleanup and credential containment | PASS | — |
| EVIDENCE:SPR19-001:MENTOR-PROFILE-UAT | SPR19-001 | TEST | Mentor approval, activation, timezone, availability, pagination, and privacy regression | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR19-001:MENTOR-PROFILE-UAT | SPR19-001 | TEST | Instructor settings, administrator approval, and student directory UI regression | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR19-001:MENTOR-PROFILE-UAT | SPR19-001 | DEPLOY | Exact-revision CI, migration, and production deployments | PASS | — |
| EVIDENCE:SPR19-001:MENTOR-PROFILE-UAT | SPR19-001 | PRODUCTION | Bounded instructor, administrator, and student mentor lifecycle UAT | PASS | — |
| EVIDENCE:SPR19-001:MENTOR-PROFILE-UAT | SPR19-001 | OTHER | Production containment and credential handling | PASS | — |
| EVIDENCE:SPR19-002:MENTOR-BOOKING-UAT | SPR19-002 | TEST | Transactional mentor booking and status-history regression | PASS | npm.cmd test -- --runInBand --silent; npx.cmd prisma validate --schema prisma/schema; npm.cmd run build |
| EVIDENCE:SPR19-002:MENTOR-BOOKING-UAT | SPR19-002 | TEST | Student and instructor booking UI regression | PASS | npm.cmd test -- --silent; npm.cmd run build |
| EVIDENCE:SPR19-002:MENTOR-BOOKING-UAT | SPR19-002 | DEPLOY | Exact-revision CI, migration, and production deployments | PASS | — |
| EVIDENCE:SPR19-002:MENTOR-BOOKING-UAT | SPR19-002 | PRODUCTION | Bounded student and instructor mentor-booking lifecycle UAT | PASS | — |
| EVIDENCE:SPR19-002:MENTOR-BOOKING-UAT | SPR19-002 | OTHER | Production containment and credential handling | PASS | — |
| EVIDENCE:SPR19-003:MENTOR-JITSI-UAT | SPR19-003 | TEST | Private mentor session, authorization, attendance, and classroom regression | PASS | npm.cmd test -- --runInBand --silent; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR19-003:MENTOR-JITSI-UAT | SPR19-003 | TEST | Authenticated mentor-session booking UI regression | PASS | npm.cmd test -- --silent; npm.cmd run build |
| EVIDENCE:SPR19-003:MENTOR-JITSI-UAT | SPR19-003 | DEPLOY | Exact-revision CI, migration, production deployments, and UAT repair | PASS | — |
| EVIDENCE:SPR19-003:MENTOR-JITSI-UAT | SPR19-003 | PRODUCTION | Bounded participant and administrator mentor Jitsi UAT | PASS | — |
| EVIDENCE:SPR19-003:MENTOR-JITSI-UAT | SPR19-003 | OTHER | Production containment and credential handling | PASS | — |
| EVIDENCE:SPR19-004:MENTOR-OUTCOMES-UAT | SPR19-004 | TEST | Mentor outcome privacy, completion, goal, review, and rating regression | PASS | npm.cmd test -- --runInBand --silent; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR19-004:MENTOR-OUTCOMES-UAT | SPR19-004 | TEST | Participant mentor outcome UI regression | PASS | npm.cmd test -- --silent; npm.cmd run build |
| EVIDENCE:SPR19-004:MENTOR-OUTCOMES-UAT | SPR19-004 | DEPLOY | Exact-revision CI, migration, and production deployments | PASS | — |
| EVIDENCE:SPR19-004:MENTOR-OUTCOMES-UAT | SPR19-004 | PRODUCTION | Bounded mentor outcomes lifecycle UAT | PASS | — |
| EVIDENCE:SPR19-004:MENTOR-OUTCOMES-UAT | SPR19-004 | OTHER | Abuse-report deferral and production containment | PASS | — |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | OTHER | Sanitized credential-source and account-data audit | PASS | — |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | TEST | Backend authentication and regression verification | PASS | npm.cmd test -- --runInBand; npm.cmd run test:e2e -- --runInBand; npm.cmd run test:demo-data -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | TEST | Frontend authentication and browser regression verification | PASS | npm.cmd test; npm.cmd run build; npm.cmd run test:e2e |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | DEPLOY | Exact Backend and Frontend production deployment | PASS | — |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | PRODUCTION | Backend-only deterministic password login | PASS | Sanitized Playwright production-auth-setup |
| EVIDENCE:SPR20-001:EMAIL-PASSWORD-AUTH-REMEDIATION | SPR20-001 | MANUAL | Fresh verified-email registration production scenario and production null-hash audit | BLOCKED | — |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | OTHER | Complete endpoint access, ownership, upload, error, and secret audit | PASS | npm.cmd run security:audit-endpoints; tracked-file secret scan; diff review |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | TEST | Backend security regression, HTTP regression, Prisma, and build | PASS | npm.cmd test -- --runInBand; npm.cmd run test:e2e -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | TEST | Frontend compatibility build | PASS | npm.cmd run build |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | DEPLOY | Exact backend revision CI and production deployment | PASS | — |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | PRODUCTION | Bounded production access, RBAC, error-shape, header, and abuse-limit UAT | PASS | — |
| EVIDENCE:SPR20-001:ENDPOINT-SECURITY-UAT | SPR20-001 | OTHER | Production UAT containment and credential handling | PASS | — |
| EVIDENCE:SPR20-002:OBSERVABILITY-HEALTH-UAT | SPR20-002 | TEST | Backend correlation, monitoring, health, endpoint-policy, regression, and build verification | PASS | npm.cmd test -- --runInBand; npm.cmd run test:e2e -- --runInBand; npm.cmd run security:audit-endpoints; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR20-002:OBSERVABILITY-HEALTH-UAT | SPR20-002 | TEST | Frontend correlated error reporting regression and build verification | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR20-002:OBSERVABILITY-HEALTH-UAT | SPR20-002 | DEPLOY | Exact backend and frontend revision CI and production deployment | PASS | — |
| EVIDENCE:SPR20-002:OBSERVABILITY-HEALTH-UAT | SPR20-002 | PRODUCTION | Bounded production correlation and dependency-health UAT | PASS | — |
| EVIDENCE:SPR20-002:OBSERVABILITY-HEALTH-UAT | SPR20-002 | OTHER | Production UAT containment and secret-safe health contract | PASS | — |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | OTHER | Measured bundle, image, accessibility, list-bound, and query-index audit | PASS | npm.cmd run build; npm.cmd run test:performance; source and Prisma index review |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | TEST | Backend bounded-list regression, HTTP regression, Prisma, and build | PASS | npm.cmd test -- --runInBand; npm.cmd run test:e2e -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | TEST | Frontend regression, bundle budget, keyboard, and responsive verification | PASS | npm.cmd test; npm.cmd run build; npm.cmd run test:performance; focused Playwright keyboard and 320/1024 carousel checks |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | DEPLOY | Exact backend and frontend revision CI and production deployment | PASS | — |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | PRODUCTION | Bounded production responsive, keyboard, image, seed-role, API, and Lighthouse UAT | PASS | — |
| EVIDENCE:SPR20-003:PERFORMANCE-ACCESSIBILITY-UAT | SPR20-003 | OTHER | Production containment and Nginx compression disposition | PASS | — |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | TEST | Complete backend and frontend release regression | PASS | Backend prisma:validate, build, unit, and HTTP E2E; Frontend build, unit, and bundle budget |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | DEPLOY | Exact release revisions, migrations, CI, and VPS deployment | PASS | — |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | PRODUCTION | Seeded cross-role and V2 domain production UAT | PASS | — |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | OTHER | Rollback recovery dry run and release package | PASS | — |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | OTHER | Release dependency advisory review and explicit P1 disposition | PASS | npm.cmd audit --omit=dev --audit-level=high in both repositories; npm.cmd audit fix --dry-run --omit=dev |
| EVIDENCE:SPR20-004:V2-RELEASE-UAT | SPR20-004 | OTHER | Secret-safe UAT containment and manual-action normalization | PASS | — |
| EVIDENCE:SPR21-001:PRIORITY-CORRECTION | SPR21-001 | TEST | AI-DOS conformance after Sprint 21 priority correction | PASS | node D:/Work/AI-DOS/core/conformance.js --manifest .ai-dos/manifest.json |
| EVIDENCE:SPR21-001:PRIORITY-CORRECTION | SPR21-001 | TEST | AI-DOS runtime selector staged priority proof | PASS | AI-DOS selectRunnableTasks in-memory stage simulation using canonical tasks and project.state |
| EVIDENCE:SPR21-001:PRIORITY-CORRECTION | SPR21-001 | OTHER | Final demo classification audit | PASS | — |
| EVIDENCE:SPR21-001:REPOSITORY-AUDIT | SPR21-001 | TEST | AI-DOS conformance after priority-track records | PASS | node D:/Work/AI-DOS/core/conformance.js --manifest .ai-dos/manifest.json |
| EVIDENCE:SPR21-001:REPOSITORY-AUDIT | SPR21-001 | TEST | AI-DOS runnable-task planning | PASS | node D:/Work/AI-DOS/core/runtime.js plan --manifest .ai-dos/manifest.json |
| EVIDENCE:SPR21-001:REPOSITORY-AUDIT | SPR21-001 | OTHER | Repository and reference audit | PASS | — |
| EVIDENCE:SPR21-002:BROWSER-ACCEPTANCE | SPR21-002 | TEST | Focused public responsive layout and visual regression | PASS | npm.cmd run test:e2e -- responsive-visual.spec.ts -g "public course list fits\|public visual baselines" --project=chromium --no-deps |
| EVIDENCE:SPR21-002:BROWSER-ACCEPTANCE | SPR21-002 | OTHER | Rendered public screenshot review | PASS | — |
| EVIDENCE:SPR21-002:BROWSER-ACCEPTANCE | SPR21-002 | TEST | Restored demo Prisma access | PASS | npm.cmd run db:seed:demo; npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-002:DB-ACCESS-BROWSER-RECHECK | SPR21-002 | TEST | Documented PostgreSQL demo restore | PASS | npm.cmd run prisma:generate; npm.cmd run prisma:migrate:deploy; npm.cmd run db:seed:demo; npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-002:DB-ACCESS-BROWSER-RECHECK | SPR21-002 | TEST | Prisma course/data access reproduction | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-002:DB-ACCESS-BROWSER-RECHECK | SPR21-002 | TEST | Mobile token and responsive browser acceptance | PASS | npm.cmd test -- --run src/styles/mobile-tokens.test.ts; npm.cmd run build; npx.cmd playwright test --config playwright.config.ts --project=chromium playwright/responsive-visual.spec.ts -g "public course list fits\|public visual baselines" --reporter=list |
| EVIDENCE:SPR21-002:DB-RESTORE-RECHECK | SPR21-002 | TEST | Prisma client generation and migration status | PASS | npm.cmd run prisma:generate; npm.cmd run prisma:migrate:deploy |
| EVIDENCE:SPR21-002:DB-RESTORE-RECHECK | SPR21-002 | TEST | Guarded demo seed and verification | PASS | npm.cmd run db:seed:demo; npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-002:DB-RESTORE-RECHECK | SPR21-002 | TEST | Mobile token unit test | PASS | npm.cmd test -- --run src/styles/mobile-tokens.test.ts |
| EVIDENCE:SPR21-002:DB-RESTORE-RECHECK | SPR21-002 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-002:DB-RESTORE-RECHECK | SPR21-002 | TEST | Course-screen responsive browser acceptance | PASS | npm.cmd run test:e2e -- responsive-visual.spec.ts -g "public course list fits\|public visual baselines" --project=chromium --no-deps --reporter=list |
| EVIDENCE:SPR21-002:MOBILE-TOKEN-IMPLEMENTATION | SPR21-002 | TEST | Mobile token unit test | PASS | npm.cmd test -- --run src/styles/mobile-tokens.test.ts |
| EVIDENCE:SPR21-002:MOBILE-TOKEN-IMPLEMENTATION | SPR21-002 | TEST | Frontend regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR21-002:MOBILE-TOKEN-IMPLEMENTATION | SPR21-002 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-002:PRODUCTION-VPS-UAT | SPR21-002 | DEPLOY | Production frontend and backend deployment | PASS | — |
| EVIDENCE:SPR21-002:PRODUCTION-VPS-UAT | SPR21-002 | TEST | Production API smoke | PASS | GET https://api.eduai.giaoducso.org.vn/api/docs; GET /health; GET /api/v1/courses |
| EVIDENCE:SPR21-002:PRODUCTION-VPS-UAT | SPR21-002 | TEST | Production demo account authentication | PASS | npx.cmd playwright test --config playwright.production.config.ts --project=production-auth-setup --reporter=list |
| EVIDENCE:SPR21-002:PRODUCTION-VPS-UAT | SPR21-002 | TEST | Production read-only route and responsive UAT matrix | PASS | — |
| EVIDENCE:SPR21-002:RESPONSIVE-SMOKE-BLOCKED | SPR21-002 | TEST | Playwright responsive smoke | BLOCKED | npm.cmd run test:e2e -- responsive-visual.spec.ts -g "public course list fits" --project=chromium --no-deps |
| EVIDENCE:SPR21-003:MOBILE-NAV-CONTRACT | SPR21-003 | TEST | Mobile navigation contract unit tests | PASS | npm.cmd test -- --run src/components/layout/header.test.tsx |
| EVIDENCE:SPR21-003:MOBILE-NAV-CONTRACT | SPR21-003 | TEST | Frontend regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR21-003:MOBILE-NAV-CONTRACT | SPR21-003 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-003:MOBILE-NAV-CONTRACT | SPR21-003 | TEST | Focused public responsive and visual regression | PASS | npm.cmd run test:e2e -- responsive-visual.spec.ts -g "public course list fits\|public visual baselines" --project=chromium --no-deps |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | TEST | Frontend course price display contract | PASS | npm.cmd test -- --run src/features/courses/course-display.test.ts |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | TEST | Backend price API contract | PASS | npm.cmd test -- src/modules/courses/courses.service.spec.ts --runInBand |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | TEST | Frontend regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | TEST | Backend regression suite | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-004:PRICE-DISPLAY-CONTRACT | SPR21-004 | TEST | Focused public course responsive and visual regression | PASS | npm.cmd run test:e2e -- responsive-visual.spec.ts -g "public course list fits\|public visual baselines" --project=chromium --no-deps |
| EVIDENCE:SPR21-005:RESPONSIVE-NAV-REGRESSION | SPR21-005 | TEST | Focused Sprint 21 responsive regression | PASS | npm.cmd run test:e2e -- sprint21-responsive-regression.spec.ts --project=chromium --no-deps |
| EVIDENCE:SPR21-005:RESPONSIVE-NAV-REGRESSION | SPR21-005 | TEST | Frontend regression suite | PASS | npm.cmd test |
| EVIDENCE:SPR21-005:RESPONSIVE-NAV-REGRESSION | SPR21-005 | BUILD | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-006:MINIMAL-FIXTURE-DESIGN | SPR21-006 | TEST | Minimal fixture design contract | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-006:MINIMAL-FIXTURE-DESIGN | SPR21-006 | TEST | Prisma schema validation | PASS | npm.cmd run prisma:validate |
| EVIDENCE:SPR21-006:MINIMAL-FIXTURE-DESIGN | SPR21-006 | OTHER | Minimal fixture design review | PASS | — |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | TEST | Minimal fixture contract suite | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | BUILD | Prisma validation and backend build | PASS | npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | TEST | Guarded minimal fixture seed and idempotence | PASS | MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:seed:minimal; npm.cmd run db:verify:minimal (twice) |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | TEST | Existing demo contract preserved | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | TEST | Reset and production guard | PASS | MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:reset:minimal; post-reset db:verify:minimal; NODE_ENV=production npm.cmd run db:seed:minimal |
| EVIDENCE:SPR21-007:MINIMAL-FIXTURE-SEED | SPR21-007 | TEST | Affected frontend contract tests | PASS | npm.cmd test -- --run src/features/courses/course-display.test.ts src/components/layout/header.test.tsx |
| EVIDENCE:SPR21-008:MINIMAL-FIXTURE-VALIDATION | SPR21-008 | TEST | Minimal fixture state-matrix contract | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-008:MINIMAL-FIXTURE-VALIDATION | SPR21-008 | TEST | Authorized fixture-backed verification | PASS | MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:seed:minimal; npm.cmd run db:verify:minimal (twice) |
| EVIDENCE:SPR21-008:MINIMAL-FIXTURE-VALIDATION | SPR21-008 | TEST | Fixture cleanup and rollback | PASS | MINIMAL_FIXTURES_ENABLED=true npm.cmd run db:reset:minimal; post-reset npm.cmd run db:verify:minimal |
| EVIDENCE:SPR21-008:MINIMAL-FIXTURE-VALIDATION | SPR21-008 | TEST | Production rejection and regression suites | PASS | NODE_ENV=production npm.cmd run db:seed:minimal; npm.cmd test -- --runInBand; frontend focused contract tests |
| EVIDENCE:SPR21-008:MINIMAL-FIXTURE-VALIDATION | SPR21-008 | OTHER | Fixture target and rollback documentation | PASS | — |
| EVIDENCE:SPR21-009:VOUCHER-DOMAIN-CONTRACT | SPR21-009 | TEST | Voucher eligibility and discount contract | PASS | npm.cmd run test:demo-data -- --runInBand voucher-contract.spec.ts |
| EVIDENCE:SPR21-009:VOUCHER-DOMAIN-CONTRACT | SPR21-009 | OTHER | Voucher architecture decision | PASS | — |
| EVIDENCE:SPR21-009:VOUCHER-DOMAIN-CONTRACT | SPR21-009 | TEST | Backend regression and schema validation | PASS | npm.cmd test -- --runInBand; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR21-010:VOUCHER-BACKEND-REDEMPTION | SPR21-010 | TEST | Voucher service transaction and idempotency tests | PASS | npm.cmd test -- --runInBand src/modules/vouchers/vouchers.service.spec.ts src/modules/vouchers/vouchers.controller.spec.ts |
| EVIDENCE:SPR21-010:VOUCHER-BACKEND-REDEMPTION | SPR21-010 | TEST | Development database voucher smoke | PASS | Dedicated compiled-service smoke: create draft, activate, preview, redeem, replay, cleanup |
| EVIDENCE:SPR21-010:VOUCHER-BACKEND-REDEMPTION | SPR21-010 | TEST | Backend regression, build, and schema validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate; npx.cmd prisma migrate status --schema prisma\schema.prisma |
| EVIDENCE:SPR21-010:VOUCHER-BACKEND-REDEMPTION | SPR21-010 | TEST | Existing demo seed preservation | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-010:VOUCHER-BACKEND-REDEMPTION | SPR21-010 | OTHER | Voucher implementation boundary | PASS | — |
| EVIDENCE:SPR21-011:VOUCHER-ADMIN-UI | SPR21-011 | TEST | Voucher admin component, service, learner, and navigation tests | PASS | npm.cmd test -- --run src/services/voucher.service.test.ts src/features/courses/CourseEnrollCard/CourseEnrollCard.test.tsx src/features/dashboard/AdminDashboard/AdminVoucherManagementPage.test.tsx src/features/dashboard/dashboard-navigation.test.tsx |
| EVIDENCE:SPR21-011:VOUCHER-ADMIN-UI | SPR21-011 | TEST | Frontend regression and build | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR21-011:VOUCHER-ADMIN-UI | SPR21-011 | TEST | Role-protected responsive browser checks | PASS | npm.cmd run test:e2e -- sprint21-voucher-admin.spec.ts --project=chromium --no-deps |
| EVIDENCE:SPR21-011:VOUCHER-ADMIN-UI | SPR21-011 | TEST | Backend authorization regression | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-012:VOUCHER-LEARNER-UX | SPR21-012 | TEST | Learner voucher component and service contract tests | PASS | npm.cmd test -- --run src/services/voucher.service.test.ts src/features/courses/CourseEnrollCard/CourseEnrollCard.test.tsx |
| EVIDENCE:SPR21-012:VOUCHER-LEARNER-UX | SPR21-012 | TEST | Learner responsive browser state matrix | PASS | npx.cmd playwright test sprint21-voucher-learner.spec.ts --project=chromium --no-deps --reporter=list |
| EVIDENCE:SPR21-012:VOUCHER-LEARNER-UX | SPR21-012 | TEST | Frontend regression and build | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR21-013:VOUCHER-SECURITY-UAT | SPR21-013 | TEST | Voucher eligibility and adversarial contract matrix | PASS | npx.cmd jest --rootDir . --testRegex '.*\.spec\.ts$' prisma/voucher-contract.spec.ts --runInBand |
| EVIDENCE:SPR21-013:VOUCHER-SECURITY-UAT | SPR21-013 | TEST | Voucher authorization and transaction tests | PASS | npm.cmd test -- --runInBand src/modules/vouchers/vouchers.service.spec.ts src/modules/vouchers/vouchers.controller.spec.ts |
| EVIDENCE:SPR21-013:VOUCHER-SECURITY-UAT | SPR21-013 | TEST | Sanitized learner/admin UAT browser matrix | PASS | sprint21-voucher-admin.spec.ts and sprint21-voucher-learner.spec.ts via Playwright chromium |
| EVIDENCE:SPR21-014:SCHOLARSHIP-DOMAIN-CONTRACT | SPR21-014 | TEST | Scholarship eligibility design contract | PASS | npx.cmd jest --rootDir . --testRegex '.*\.spec\.ts$' prisma/scholarship-contract.spec.ts --runInBand --runTestsByPath |
| EVIDENCE:SPR21-014:SCHOLARSHIP-DOMAIN-CONTRACT | SPR21-014 | TEST | Backend build and Prisma safety validation | PASS | npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-014:SCHOLARSHIP-DOMAIN-CONTRACT | SPR21-014 | OTHER | Scholarship architecture decision | PASS | — |
| EVIDENCE:SPR21-015:SCHOLARSHIP-BACKEND | SPR21-015 | TEST | Scholarship backend service and controller tests | PASS | npm.cmd test -- --runInBand src/modules/scholarships/scholarships.service.spec.ts src/modules/scholarships/scholarships.controller.spec.ts |
| EVIDENCE:SPR21-015:SCHOLARSHIP-BACKEND | SPR21-015 | TEST | Backend regression and schema validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate; npx.cmd prisma migrate status --schema prisma\schema.prisma |
| EVIDENCE:SPR21-015:SCHOLARSHIP-BACKEND | SPR21-015 | TEST | Development database Scholarship smoke | PASS | Dedicated compiled-service smoke: create draft, activate, preview, apply, replay, quota rejection, cleanup |
| EVIDENCE:SPR21-015:SCHOLARSHIP-BACKEND | SPR21-015 | TEST | Existing demo seed preservation | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-015:SCHOLARSHIP-BACKEND | SPR21-015 | OTHER | Scholarship additive migration | PASS | — |
| EVIDENCE:SPR21-016:SCHOLARSHIP-UI | SPR21-016 | TEST | Scholarship service, component, course, and navigation tests | PASS | npm.cmd test -- --run src/services/scholarship.service.test.ts src/features/courses/CourseEnrollCard/CourseEnrollCard.test.tsx src/features/dashboard/AdminDashboard/AdminScholarshipManagementPage.test.tsx src/features/dashboard/dashboard-navigation.test.tsx |
| EVIDENCE:SPR21-016:SCHOLARSHIP-UI | SPR21-016 | TEST | Frontend regression and build | PASS | npm.cmd test; npm.cmd run build |
| EVIDENCE:SPR21-016:SCHOLARSHIP-UI | SPR21-016 | TEST | Scholarship role and responsive browser checks | PASS | npx.cmd playwright test sprint21-scholarship.spec.ts --project=chromium --no-deps --reporter=list |
| EVIDENCE:SPR21-017:SCHOLARSHIP-UAT | SPR21-017 | TEST | Scholarship full backend UAT regression | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate; npx.cmd prisma migrate status --schema prisma\schema.prisma |
| EVIDENCE:SPR21-017:SCHOLARSHIP-UAT | SPR21-017 | TEST | Scholarship learner/admin browser UAT | PASS | npx.cmd playwright test sprint21-scholarship.spec.ts --project=chromium --no-deps --reporter=list |
| EVIDENCE:SPR21-017:SCHOLARSHIP-UAT | SPR21-017 | OTHER | Scholarship domain separation review | PASS | — |
| EVIDENCE:SPR21-018:TMI-LEDGER-DESIGN | SPR21-018 | TEST | TMI ledger and redemption invariant contract | PASS | npx.cmd jest --rootDir . --testRegex '.*\.spec\.ts$' prisma/tmi-ledger-contract.spec.ts --runInBand --runTestsByPath |
| EVIDENCE:SPR21-018:TMI-LEDGER-DESIGN | SPR21-018 | TEST | Backend build and schema safety validation | PASS | npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-018:TMI-LEDGER-DESIGN | SPR21-018 | OTHER | TMI architecture decision | PASS | — |
| EVIDENCE:SPR21-019:TMI-REWARD-CATALOG | SPR21-019 | TEST | TMI reward catalog service/controller tests | PASS | npm.cmd test -- --runInBand src/modules/tmi/tmi-reward.service.spec.ts src/modules/tmi/tmi-reward.controller.spec.ts |
| EVIDENCE:SPR21-019:TMI-REWARD-CATALOG | SPR21-019 | TEST | Backend regression, build, and migration validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate; npx.cmd prisma migrate status --schema prisma\schema.prisma |
| EVIDENCE:SPR21-019:TMI-REWARD-CATALOG | SPR21-019 | OTHER | TMI reward catalog migration | PASS | — |
| EVIDENCE:SPR21-020:ATOMIC-REDEMPTION-DEPLOY-UAT | SPR21-020 | TEST | Focused TMI redemption and authorization tests | PASS | npm.cmd test -- --runInBand src/modules/tmi/tmi-redemption.service.spec.ts src/modules/tmi/tmi-redemption.controller.spec.ts |
| EVIDENCE:SPR21-020:ATOMIC-REDEMPTION-DEPLOY-UAT | SPR21-020 | TEST | Neon PostgreSQL transaction and concurrency contract | PASS | TMI_INTEGRATION_TEST=true npm.cmd run test:demo-data -- tmi-redemption.integration.spec.ts --runInBand |
| EVIDENCE:SPR21-020:ATOMIC-REDEMPTION-DEPLOY-UAT | SPR21-020 | TEST | Backend regression, build, schema, and migration validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate; npx.cmd prisma migrate status --schema prisma\schema.prisma; npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-020:ATOMIC-REDEMPTION-DEPLOY-UAT | SPR21-020 | DEPLOY | VPS deployment | PASS | — |
| EVIDENCE:SPR21-020:ATOMIC-REDEMPTION-DEPLOY-UAT | SPR21-020 | PRODUCTION | Production TMI API surface and auth guards | PASS | — |
| EVIDENCE:SPR21-021:LEARNER-TMI-DEPLOY-UAT | SPR21-021 | TEST | Learner TMI service and component tests | PASS | npm.cmd test -- --run src/services/tmi.service.test.ts src/features/dashboard/StudentDashboard/TmiRewardsPage/TmiRewardsPage.test.tsx src/features/dashboard/dashboard-navigation.test.tsx |
| EVIDENCE:SPR21-021:LEARNER-TMI-DEPLOY-UAT | SPR21-021 | TEST | Frontend regression and build | PASS | npm.cmd test -- --run; npm.cmd run build; git diff --check |
| EVIDENCE:SPR21-021:LEARNER-TMI-DEPLOY-UAT | SPR21-021 | TEST | Local learner TMI responsive browser smoke | PASS | npx.cmd playwright test --config playwright.config.ts --project=chromium playwright/sprint21-tmi.spec.ts --reporter=list |
| EVIDENCE:SPR21-021:LEARNER-TMI-DEPLOY-UAT | SPR21-021 | DEPLOY | Frontend VPS deployment | PASS | — |
| EVIDENCE:SPR21-021:LEARNER-TMI-DEPLOY-UAT | SPR21-021 | PRODUCTION | Production learner TMI UI UAT | PASS | — |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | TEST | Admin TMI service/component and navigation tests | PASS | npm.cmd test -- --run src/services/tmi.service.test.ts src/features/dashboard/AdminDashboard/AdminTmiManagementPage.test.tsx src/features/dashboard/dashboard-navigation.test.tsx |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | TEST | Frontend regression and build | PASS | npm.cmd test -- --run; npm.cmd run build; git diff --check |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | TEST | Local admin TMI responsive browser smoke | PASS | npx.cmd playwright test --config playwright.config.ts --project=chromium playwright/sprint21-admin-tmi.spec.ts --reporter=list |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | TEST | Backend admin TMI regression and schema validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | DEPLOY | Backend and frontend VPS deployment | PASS | — |
| EVIDENCE:SPR21-022:ADMIN-TMI-DEPLOY-UAT | SPR21-022 | PRODUCTION | Admin TMI role and responsive UAT | PASS | — |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | TEST | Focused TMI security and authorization invariants | PASS | npm.cmd test -- --runInBand src/modules/tmi/tmi-redemption.service.spec.ts src/modules/tmi/tmi-redemption.controller.spec.ts |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | TEST | Demo data contract regression | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | TEST | Neon concurrency integration | PASS | $env:TMI_INTEGRATION_TEST='true'; npm.cmd run test:demo-data -- tmi-redemption.integration.spec.ts --runInBand |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | TEST | Backend regression and schema validation | PASS | npm.cmd test -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | DEPLOY | Backend VPS deployment | PASS | — |
| EVIDENCE:SPR21-023:TMI-SECURITY-INVARIANTS-UAT | SPR21-023 | PRODUCTION | Role-protected TMI endpoint verification | PASS | — |
| EVIDENCE:SPR21-024:TMI-UAT-RELEASE-READINESS | SPR21-024 | TEST | Local learner and admin TMI UAT | PASS | npm.cmd run test:e2e -- --project=chromium playwright/sprint21-tmi.spec.ts playwright/sprint21-admin-tmi.spec.ts --reporter=list |
| EVIDENCE:SPR21-024:TMI-UAT-RELEASE-READINESS | SPR21-024 | TEST | TMI business-state and transaction coverage | PASS | npm.cmd test -- --runInBand; $env:TMI_INTEGRATION_TEST='true'; npm.cmd run test:demo-data -- tmi-redemption.integration.spec.ts --runInBand |
| EVIDENCE:SPR21-024:TMI-UAT-RELEASE-READINESS | SPR21-024 | TEST | Release runbook and schema readiness | PASS | npm.cmd run prisma:generate; npm.cmd run prisma:migrate:deploy; npm.cmd run prisma:validate; npm.cmd run build |
| EVIDENCE:SPR21-024:TMI-UAT-RELEASE-READINESS | SPR21-024 | PRODUCTION | Production learner read-only UAT | PASS | — |
| EVIDENCE:SPR21-024:TMI-UAT-RELEASE-READINESS | SPR21-024 | PRODUCTION | Production admin read-only UAT | PASS | — |
| EVIDENCE:SPR21-025:PWA-TECHNICAL-AUDIT | SPR21-025 | TEST | Frontend production build | PASS | npm.cmd run build |
| EVIDENCE:SPR21-025:PWA-TECHNICAL-AUDIT | SPR21-025 | OTHER | Local PWA asset audit | PASS | Inspect dist output and search manifest/service-worker registration code |
| EVIDENCE:SPR21-025:PWA-TECHNICAL-AUDIT | SPR21-025 | PRODUCTION | Production installability runtime audit | PASS | — |
| EVIDENCE:SPR21-026:PWA-INSTALLABILITY-DEPLOY-UAT | SPR21-026 | TEST | PWA contract and frontend build | PASS | npm.cmd test -- --run; npm.cmd run build; git diff --check |
| EVIDENCE:SPR21-026:PWA-INSTALLABILITY-DEPLOY-UAT | SPR21-026 | TEST | Local production-preview installability smoke | PASS | npm.cmd run preview -- --host 127.0.0.1 --port 4173; Chromium browser smoke |
| EVIDENCE:SPR21-026:PWA-INSTALLABILITY-DEPLOY-UAT | SPR21-026 | DEPLOY | Frontend VPS deployment | PASS | — |
| EVIDENCE:SPR21-026:PWA-INSTALLABILITY-DEPLOY-UAT | SPR21-026 | PRODUCTION | Chrome production installability diagnostics | PASS | — |
| EVIDENCE:SPR21-026:PWA-INSTALLABILITY-DEPLOY-UAT | SPR21-026 | PRODUCTION | Authenticated navigation/cache regression | PASS | — |
| EVIDENCE:SPR21-027:FINAL-DEMO-DATASET-DESIGN | SPR21-027 | OTHER | Final Product Owner dataset matrix review | PASS | — |
| EVIDENCE:SPR21-027:FINAL-DEMO-DATASET-DESIGN | SPR21-027 | TEST | Existing guarded seed contract | PASS | npm.cmd run test:demo-data -- --runInBand |
| EVIDENCE:SPR21-027:FINAL-DEMO-DATASET-DESIGN | SPR21-027 | TEST | Existing Neon demo verification | PASS | npm.cmd run db:verify:demo |
| EVIDENCE:SPR21-027:FINAL-DEMO-DATASET-DESIGN | SPR21-027 | OTHER | Synthetic data and cleanup design | PASS | — |
| EVIDENCE:SPR21-028:FINAL-DEMO-SEED-DEPLOY-UAT | SPR21-028 | TEST | Backend regression and final seed contract | PASS | npm.cmd test -- --runInBand; npm.cmd run test:demo-data -- --runInBand; npm.cmd run build; npm.cmd run prisma:validate |
| EVIDENCE:SPR21-028:FINAL-DEMO-SEED-DEPLOY-UAT | SPR21-028 | TEST | Neon final seed, verification, and idempotence | PASS | npm.cmd run db:seed:demo; npm.cmd run db:verify:demo; npm.cmd run db:verify:final-demo; repeat db:seed:demo and db:verify:final-demo |
| EVIDENCE:SPR21-028:FINAL-DEMO-SEED-DEPLOY-UAT | SPR21-028 | TEST | Final dataset reset and production guard | PASS | NODE_ENV=production npm.cmd run db:reset:final-demo; npm.cmd run db:reset:final-demo; npm.cmd run db:seed:demo; npm.cmd run db:verify:final-demo |
| EVIDENCE:SPR21-028:FINAL-DEMO-SEED-DEPLOY-UAT | SPR21-028 | DEPLOY | Backend VPS deployment | PASS | — |
| EVIDENCE:SPR21-028:FINAL-DEMO-SEED-DEPLOY-UAT | SPR21-028 | PRODUCTION | Post-deploy account smoke | PASS | — |
| EVIDENCE:SPR21-029:FINAL-DEMO-INTEGRATED-UAT | SPR21-029 | TEST | Final dataset database verification | PASS | npm.cmd run db:verify:demo; npm.cmd run db:verify:final-demo |
| EVIDENCE:SPR21-029:FINAL-DEMO-INTEGRATED-UAT | SPR21-029 | TEST | Public discovery and role dashboard UAT | PASS | CI=1 npm.cmd run test:e2e -- --project=chromium playwright/smoke.spec.ts -g "renders seeded course list and detail\|dashboard response and DOM\|dashboard uses aggregate instructor response" --reporter=list |
| EVIDENCE:SPR21-029:FINAL-DEMO-INTEGRATED-UAT | SPR21-029 | TEST | Final responsive feature UAT | PASS | npm.cmd run test:e2e -- --project=chromium playwright/sprint21-tmi.spec.ts playwright/sprint21-admin-tmi.spec.ts playwright/sprint21-responsive-regression.spec.ts --reporter=list |
| EVIDENCE:SPR21-029:FINAL-DEMO-INTEGRATED-UAT | SPR21-029 | PRODUCTION | Production PWA/runtime regression reference | PASS | — |
| EVIDENCE:SPR21-029:FINAL-DEMO-INTEGRATED-UAT | SPR21-029 | OTHER | Harness limitation recorded | PASS | — |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | TEST | Final Neon dataset API and responsive UAT | PASS | npm.cmd run db:verify:final-demo; CI=1 npm.cmd run test:e2e -- --project=chromium playwright/sprint21-final-demo.spec.ts --reporter=list |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | TEST | Frontend regression and build | PASS | npm.cmd test -- --run; npm.cmd run build |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | PRODUCTION | Production deployment and account UAT | PASS | — |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | PRODUCTION | Production health, PWA, and API documentation | PASS | — |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | OTHER | Known harness limitation and bounded replacement | PASS | — |
| EVIDENCE:SPR21-030:FINAL-INTEGRATED-REGRESSION-UAT | SPR21-030 | OTHER | Unsupported/native install surfaces | NOT_APPLICABLE | — |
| EVIDENCE:SPR22-001:UI-UX-REFINEMENT | SPR22-001 | TEST | Frontend regression, build, bundle, and responsive visual matrix | PASS | npm.cmd test; npm.cmd run build; npm.cmd run test:performance; Playwright focused visual and 14-viewport catalog regression |
| EVIDENCE:SPR22-001:UI-UX-REFINEMENT | SPR22-001 | DEPLOY | Frontend CI and production deployment | PASS | — |
| EVIDENCE:SPR22-001:UI-UX-REFINEMENT | SPR22-001 | PRODUCTION | Browser inspection and sanitized cross-role production UAT | PASS | — |
| EVIDENCE:SPR22-001:UI-UX-REFINEMENT | SPR22-001 | OTHER | UI/UX audit, accessibility, and scope review | PASS | — |
| EVIDENCE:SPR23-001:ADR-PROPOSAL | SPR23-001 | OTHER | Live contract and boundary review | PASS | — |
| EVIDENCE:SPR23-001:ADR-PROPOSAL | SPR23-001 | OTHER | Adversarial architecture and security review | PASS | — |
| EVIDENCE:SPR23-001:ADR-PROPOSAL | SPR23-001 | TEST | AI-DOS validation and conformance | PASS | node core/validate.js .ai-dos/manifest.json; npm.cmd test; node core/conformance.js --manifest .ai-dos/manifest.json |
| EVIDENCE:SPR23-001:HUMAN-APPROVAL | SPR23-001 | MANUAL | Human ADR acceptance | PASS | — |
| EVIDENCE:SPR23-001:HUMAN-APPROVAL | SPR23-001 | OTHER | SPR23-001 acceptance criteria review | PASS | — |
| EVIDENCE:SPR23-001:HUMAN-APPROVAL | SPR23-001 | TEST | AI-DOS conformance after approval transition | PASS | node core/conformance.js --manifest .ai-dos/manifest.json |
| EVIDENCE:SPR23-001:HUMAN-APPROVAL | SPR23-001 | DEPLOY | Application deployment | NOT_APPLICABLE | — |
| EVIDENCE:SPR23-001:HUMAN-APPROVAL-BLOCKED | SPR23-001 | MANUAL | Human ADR acceptance | BLOCKED | — |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | TEST | Commerce persistence contracts and executable PostgreSQL migration | PASS | npm.cmd run test:demo-data -- --runInBand prisma/commerce-persistence-postgres.spec.ts prisma/commerce-persistence-contract.spec.ts prisma/commerce-persistence-migration.spec.ts |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | TEST | Backend regression | PASS | npm.cmd test -- --runInBand |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | BUILD | Prisma and Backend compilation | PASS | npm.cmd run prisma:validate; npm.cmd run prisma:generate; npm.cmd run build; git diff --check |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | OTHER | Architecture, data-integrity, rollback, and security review | PASS | — |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | DEPLOY | Production-required deployment gate | BLOCKED | Requires MANUAL:SPR23_002_DEPLOYMENT |
| EVIDENCE:SPR23-002:LOCAL-PERSISTENCE | SPR23-002 | PRODUCTION | Production migration and readiness verification | BLOCKED | Requires MANUAL:SPR23_002_DEPLOYMENT |
| EVIDENCE:SPR23-002:PRODUCTION-DEPLOYMENT | SPR23-002 | TEST | Local persistence acceptance evidence | PASS | See EVIDENCE:SPR23-002:LOCAL-PERSISTENCE |
| EVIDENCE:SPR23-002:PRODUCTION-DEPLOYMENT | SPR23-002 | DEPLOY | Backend production deployment | PASS | GitHub Actions Deploy Backend Production run 32683873087 |
| EVIDENCE:SPR23-002:PRODUCTION-DEPLOYMENT | SPR23-002 | PRODUCTION | Commerce migration metadata and readiness | PASS | Read-only PostgreSQL metadata transaction and public GET /api/docs |
| EVIDENCE:SPR23-002:PRODUCTION-DEPLOYMENT | SPR23-002 | OTHER | Runtime database-role risk disposition | PASS | — |
| EVIDENCE:SPR23-003:COMMERCE-CART-ORDER | SPR23-003 | TEST | Backend pricing, ownership, voucher, idempotency, and regression | PASS | npm.cmd test -- --runInBand; npm.cmd run test:demo-data -- --runInBand commerce-persistence-contract.spec.ts commerce-persistence-migration.spec.ts commerce-persistence-postgres.spec.ts |
| EVIDENCE:SPR23-003:COMMERCE-CART-ORDER | SPR23-003 | TEST | Frontend cart, checkout, and regression | PASS | npm.cmd test; npm.cmd run build; npm.cmd run test:performance |
| EVIDENCE:SPR23-003:COMMERCE-CART-ORDER | SPR23-003 | OTHER | Authorization, financial authority, quota, and sensitive-data review | PASS | npm.cmd run security:audit-endpoints; npm.cmd run prisma:validate |
| EVIDENCE:SPR23-003:COMMERCE-CART-ORDER | SPR23-003 | OTHER | Responsive real-browser cart and pending-order verification | PASS | — |

Generated projection; evidence is valid only when recorded in canonical evidence records.
