# Course authoring increment — 2026-11-11

Source implementation is verified locally with synthetic tests. This record does
not claim production deployment, live migration, remote CI or merged status.

## Delivered behavior

- Description toolbar supports bold, italic, underline, bullet lists and three
  text sizes, with a live preview. The description remains a string containing
  restricted text markup; existing plain text stays readable. Rendering creates
  React elements only, with no HTML injection or arbitrary user-provided CSS.
- Backend normalizes line endings/control characters and enforces the effective
  administrator-configured description limit (bounded by the existing DTO cap).
- `GET /courses/:id/preview` requires an instructor/platform-admin role and then
  checks ownership/admin authority. Draft preview reuses the course detail page,
  managed lesson list and signed media authorization without enrollments or
  learning progress writes. Tab changes preserve preview mode.
- Lesson previews use the existing shared Radix Modal for focus containment and
  Escape dismissal.
- The video lesson form can explicitly attach an unassigned course quiz, show
  attached quizzes and link to a quiz creation form with the lesson selected.
- Ending a lesson video offers its linked, unlocked quizzes when the configured
  feature is enabled. Learners can defer. No quiz attempt is created or submitted
  automatically; existing score, retry and access rules continue to apply.

## Design reference

Stitch project: `projects/7305056649090413856`.
Authoring screen: `screens/4fd1e032a8cd42dda2741e21aca0a388`.
Screenshot: `files/dd9fd930539b45adae1a8147ebd78b05`.
The screenshot was downloaded through Stitch MCP and visually inspected before
implementing the toolbar, preview and post-video quiz controls.

## Observed verification

- Frontend `node node_modules/typescript/bin/tsc --noEmit --pretty false`: PASS.
- Backend Jest description normalization, course service and controller:
  3 suites / 50 tests PASS.
- Focused frontend tests for markup/XSS, formatting selection, course upload,
  form validation, lesson player, lesson media uploads, course lesson rendering
  and quiz attachment: PASS in focused runs.
- `npm.cmd exec playwright test -- --config playwright/gds-course.config.ts
  --max-failures=1`: 8 tests PASS against local Vite on port 5174.
- Responsive widths: 320, 375, 390, 412, 768, 1024 and 1440 px. Each width checks
  author preview, formatted content, modal dismissal, no author-preview writes,
  video-ended quiz prompt/defer, no automatic quiz attempt, no document overflow
  and no uncaught browser errors. An additional test rejects preview fallback
  after an authorization denial.
- Course preview at 320 px and video quiz at 375 px were visually inspected.
  Screenshots are generated under frontend `test-results/` (ignored artifacts).

## Security review and limits

Author preview uses `findCourseDetailOrThrow` and existing management authority.
The managed lesson endpoint checks ownership; existing media retrieval checks
MANAGE/PUBLIC_PREVIEW/FULL_LEARNING before issuing signed media URLs. Other
instructors and students cannot use the new draft-preview endpoint.

Browser APIs were intercepted with synthetic data; no real account, production
course, financial write or production database was used. Video completion was
simulated using a DOM ended event, not a full real-media playback test. No DB
migration or legacy table deletion is part of this increment.

Subsequent actual production acceptance on2026-11-13 verified one owned synthetic private draft's creation, formatted author-preview API/UI, inert HTML, anonymous404/401 boundary and all seven responsive widths, followed by archive of that exact owned draft. An earlier probe-contract mistake also created a private synthetic draft, which was recovered by exact owned marker/content and archived before rerunning. No publication/enrollment/progress/provider operation occurred. See [authenticated UAT](AUTHENTICATED-UAT.md) for full failure/recovery accounting and sanitized receipts. Real media/post-video quiz and upload acceptance remain unproven.
