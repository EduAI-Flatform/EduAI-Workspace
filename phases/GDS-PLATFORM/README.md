# GDS platform implementation

Owner authorized source implementation of the GDS plan on 2026-11-11.

Overall plan status: VERIFYING. The scoped base source/production release is deployed; this does not complete authenticated production UAT, school/activity-point adapters, top-up qualification, legacy dependency migration or policy-dependent affiliate/sub-affiliate activation. Complete original plan stages 5/6 and the pending UAT before declaring the entire plan DONE. See [production receipt](PRODUCTION-RECEIPT.md) for deployment and cache-hotfix evidence; earlier source/preflight statements are historical checkpoints.

Base release: backend #31/#32/#33 and frontend #31/#32 are merged and deployed with green post-merge checks. The controlled release created a verified private backup, applied reviewed migrations/grants, initialized MFA safely and restored auto-CD. Real public-browser smoke passed the official logo, all eight palette colors, GDS Point label/artwork, VI/EN, seven widths, backend health and anonymous profile protection. Merged source branches are cleaned. Policy activation and external integrations retain the original approval/contract conditions; existing balances, history and purchased access are preserved.

Phase dossier: [tasks](TASKS.md), [acceptance](ACCEPTANCE.md), [test plan](TEST-PLAN.md), [Stitch references](UI-STITCH.md). Current source and production evidence supersedes historical checkpoints in Workspace PRs #30–32.

Current continuation: [card qualification, benefit impact and partner onboarding](CARD-CONTINUATION.md) is deployed through backend/frontend PRs #34/#35 with green post-merge checks and production smoke. The owner clarified no school is connected yet; public application/Admin review is prepared before a provider-specific contract exists. An accepted application does not automatically activate a technical integration or points.

## Required outcomes

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
