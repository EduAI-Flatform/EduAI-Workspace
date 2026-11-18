# Authorization and content evidence map — 2026-11-17

Independent read-only review found no concrete authorization or rich-text XSS bypass
in these inspected paths. This maps original R02/R07 requirements to authoritative
source/tests; it is not a comprehensive production penetration test.

| Boundary | Source and meaningful checks | Scope |
|---|---|---|
| Platform settings and policy lifecycle | platform-settings.controller class JWT/RolesGuard/platform_admin; platform-settings.service.spec draft/approval/scheduling/cancellation/private-rule tests | Source/unit; menu state cannot remove the API guard |
| Profile/media | profile.controller CurrentUser; profile.service/profile-cover/avatar-storage tests; public-media allowlist and lesson-media ownership/type/size tests | Owned predicates, rejected unowned writes, private namespace/traversal denial and cleanup; R2 mocked |
| Billing | commerce controller and commerce-order-history.service.spec | Buyer scope, other-owner denial, filters before pagination |
| Requests/invoices/partner intake | platform-requests.controller.spec, platform-invoices.spec, test-platform-requests-prisma.cjs | HTTP uses real RolesGuard with overridden JWT/mocked Prisma; actual disposable PostgreSQL proves ownership/image decode and invoice idempotency without changing settlement |
| Drafts/lessons/quizzes | courses.service.spec owner/Admin and peer-instructor/student denial; lessons.service/private storage tests; quiz controller/service tests | Protected draft endpoint, unpublished/unenrolled denial, private signing, answer stripping, attempt ownership/limits and invalid answer sets |
| Cards/points | membership-cards.controller; tmi-learner/reward controller tests | User derived from JWT; impact/reward administration platform-admin only; source/unit scope |
| Affiliate/export | affiliate controller/service/spec | Owner relation on state/performance/reconcile, same scoped list for export; instructor role, buyer ownership and self-referral checks; funding/version guards separately released |
| Withdrawals | gds-withdrawal controller/service/spec and test-gds-withdrawals-prisma.cjs | JWT owner, admin-only processing, other-owner and foreign-admin claim denial, no self-processing; real disposable journal/ownership checks |
| MFA | mfa controller, mfa-guard/service/orchestration/issuance tests | Provisional credential only at challenge; revision/family/factor/freshness and consumed proof boundaries |

RichDescription constructs escaped React text/fixed elements rather than injecting
HTML/CSS; its regression keeps an onerror image payload as text with no image node.
Private preview and native-video end/replay are browser fixtures. Actual learning
service/Prisma checkpoints separately verify one progress row, reload/replay,
nonowner denial and unchanged purchased grants.

Retained receipts: REQUEST-INTEGRATION.md (disposable request/image/invoice data),
ACCOUNT-PAGES.md (shipped fixtures versus actual owned read-only avatar),
COURSE-AUTHORING.md and AUTHENTICATED-UAT.md (actual synthetic owned private draft,
inert HTML/anonymous denial followed by archive), VIDEO-PROGRESS.md (native fixture
versus actual Prisma progress), AUTH-REFRESH-CORRECTNESS.md (local MFA/session flows).
No production cover replacement, full learner quiz recording or composed real
external-provider SSO/MFA exercise is inferred. Additional production business
writes are not required merely to repeat these scoped proofs.
