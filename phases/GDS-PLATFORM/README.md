# GDS platform implementation

Owner authorized source implementation of the GDS plan on 2026-11-11.

Overall plan status: VERIFYING. The base and continuation releases are deployed, including native activity-point processing, proven-top-up classification and service quota controls. Deployment alone does not prove the entire original plan complete. Resolve the itemized audit's remaining source/verification requirements, retain necessary historical consumers and keep real school/undeclared business capabilities conditional on their original prerequisites. See [production receipt](PRODUCTION-RECEIPT.md) and the later continuation receipts; earlier source/preflight statements are historical checkpoints.

Base release: backend #31/#32/#33 and frontend #31/#32 are merged and deployed with green post-merge checks. The controlled release created a verified private backup, applied reviewed migrations/grants, initialized MFA safely and restored auto-CD. Real public-browser smoke passed the official logo, all eight palette colors, GDS Point label/artwork, VI/EN, seven widths, backend health and anonymous profile protection. Merged source branches are cleaned. Policy activation and external integrations retain the original approval/contract conditions; existing balances, history and purchased access are preserved.

Phase dossier: [tasks](TASKS.md), [acceptance](ACCEPTANCE.md), [test plan](TEST-PLAN.md), [Stitch references](UI-STITCH.md). Current source and production evidence supersedes historical checkpoints in Workspace PRs #30–32.

Current continuation: [card qualification, benefit impact and partner onboarding](CARD-CONTINUATION.md) is deployed through backend/frontend PRs #34/#35 with green post-merge checks and production smoke. The owner clarified no school is connected yet; public application/Admin review is prepared before a provider-specific contract exists. An accepted application does not automatically activate a technical integration or points.

## Required outcomes

Dynamic policy/referral enum labels are now localized and released; see [dynamic labels](DYNAMIC-SYSTEM-LABELS.md). Their actual authenticated acceptance exposed refresh500, now corrected and verified using the same retained production session. [Session correctness](AUTH-REFRESH-CORRECTNESS.md) remains the immediate engineering priority before public course categories because broader revocation/family/MFA requirements remain open.

Backend PR51 additionally rejects stale MFA revisions instead of adopting a newer factor revision during renewal, using the issuance transaction's reader. Local auth tests, real PostgreSQL stale-enabled/disabled denial and rollback, final-head/post-merge checks, deployment and actual retained-session refresh200 all passed. Its temporary branch is cleaned. Coordinated revocation, atomic MFA proof/issuance and token binding/family requirements remain open; this narrow correction does not close the whole session stage.

Backend PR52 subsequently delivers the common subject row fence across issuance and password/provider/MFA/Admin revoke-all, current eligibility/password-state checks and native Prisma commit-conflict retry recognition. Both orders of seven real PostgreSQL revoker schedules, inverse admins and overlapping last-admin counts passed after the probe exposed and helped correct a native adapter retry gap. Final-head/main CI, deployment and actual retained production-session refresh200 passed; source branch cleanup is complete. Atomic MFA proof/issuance, primary-authentication epoch and exact-token/session-family requirements remain open in the session receipt.

The [itemized original-plan audit](PLAN-COMPLETION-AUDIT.md) now distinguishes inspected evidence, concrete gaps, pending review and original conditional integrations. It is the next-work inventory; broad earlier release receipts do not close its unverified requirements. The public catalog visibility defect has been fixed and verified without policy changes. The missing [school adapter/education-ID/event/reconciliation design](SCHOOL-ADAPTER-DESIGN.md) is now documented against existing native point boundaries; no provider-specific API or synchronization is activated.

Governed Admin defaults for new quizzes and backend instructor override restrictions are released, with actual read-only Admin/instructor acceptance in VI/EN at seven widths. The same check exposed and verified a fix for unread-badge overflow at 320 px. See [quiz defaults](QUIZ-DEFAULTS.md). Partner catalog connection-status metadata is now released with PostgreSQL and actual read-only Admin acceptance; approving a partner application or recording its status does not enable API/SSO. See [partner connection status](PARTNER-CONNECTION-STATUS.md). The catalog visibility fix is verified in the itemized audit; remaining original requirements still need their scoped completion evidence.

Actual private lesson media acceptance subsequently passed through both API/storage and native browser file-picker/CORS paths, with owner-preview playback, anonymous denial and verified deletion/archive of the synthetic media/lessons/drafts. See [lesson media UAT](LESSON-MEDIA-UAT.md). This supersedes the pending lesson-video upload note below without claiming a full learner/quiz lifecycle.

Latest acceptance continuation: actual fresh-login MFA/recovery and real portfolio image upload/reload/storage cleanup passed. Native video testing exposed precision and checkpoint defects, now fixed through frontend PR40; backend PR47 verifies actual PostgreSQL progress persistence/reload/replay and unchanged purchased grants. Both releases passed final-head/post-merge checks and deployment; temporary branches are cleaned. See [authenticated UAT](AUTHENTICATED-UAT.md), [request integration](REQUEST-INTEGRATION.md), [course authoring](COURSE-AUTHORING.md) and [video progress](VIDEO-PROGRESS.md). Production avatar/cover/lesson-media uploads and a full uploaded-video learner/quiz flow remain separate unproven cases; the overall plan stays VERIFYING.

Service-limit runtime and native Admin/catalog/learner controls are now deployed through backend PR45 and frontend PR38, with exact-head/post-merge CI and actual read-only production acceptance. Admin can add custom tiers; actual business quotas remain unconfigured/inactive. See [service-limit release evidence](SERVICE-LIMITS.md). This supersedes earlier runtime-not-implemented notes, while the original plan remains VERIFYING for remaining live integration acceptance.

- Independent multi-device sessions with 30-day refresh and coordinated refresh.
- Versioned administrator-managed policies, impact preview, approval and effective dates.
- GDS branding, navigation, system-wide VI/EN, account and support workflows.
- Rich course descriptions, authorized draft preview and post-video lesson quizzes.
- Partner/activity workflows, configurable membership cards and affiliate integration.
- Preserve existing accounts, purchases, balances and acquired course access.

## Delivery gates

Follow Workspace engineering rules and Stitch-first UI design. Preserve SPR25-007.
No live payment activation, financial writes or destructive production migration.
Record actual tests, design references, changes and remaining work in EVIDENCE.md.
Do not remove legacy tables until migration and reconciliation are verified.
