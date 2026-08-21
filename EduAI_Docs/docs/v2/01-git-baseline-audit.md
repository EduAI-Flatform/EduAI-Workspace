# SPR13-001 Git and verification baseline

Recorded: 2026-08-10

## Scope and authority

This audit uses canonical task `SPR13-001`, the checked-out source trees, and the
remote `main` references as the source of truth. It does not infer completion
from earlier summaries or generated projections. No Backend or Frontend source
file was changed during this task.

## Repository baseline

| Repository | Local `main` | Remote `main` | Worktree |
| --- | --- | --- | --- |
| Backend | `147ac51f8c4dd4e6eb702cf80008bbc087ced68e` | `147ac51f8c4dd4e6eb702cf80008bbc087ced68e` | Clean |
| Frontend | `f0ef8ec1b15d0079116236eb550237c2520993cf` | `f0ef8ec1b15d0079116236eb550237c2520993cf` | Clean before verification |

Remote identities were checked read-only with `git ls-remote`; both local
commits exactly matched `refs/heads/main` on 2026-08-10.

The workspace root and `EduAI_Docs` are not Git repositories. The existing
`MANUAL:AI_DOS_GIT_REMOTE` action therefore still owns the commit/push blocker
for workspace-level records and these audit documents.

## Current implementation baseline

- Home and course discovery call `courseService.listPublishedCourses()` and the
  registered public `GET /api/v1/courses` endpoint.
- Course detail, enrollment, learning, quiz, assignment, classroom, library,
  community, AI, profile, dashboard, and certificate screens use the central
  API client and feature services. No page performs direct database access.
- Student dashboard home calls `GET /api/v1/me/dashboard`.
- Instructor dashboard home calls `GET /api/v1/instructor/dashboard`.
- All REST calls declared by files under `src/services` have a matching
  registered Backend controller route. The detailed mapping is in
  `02-api-ui-coverage-matrix.md`.
- The Backend registers Auth, Profile, Courses, Lessons, Quizzes, Assignments,
  Classrooms, Library, Community, AI, Certificates, Dashboards, and Health
  modules. Dedicated administration, notifications, Career Hub, Mentor, and
  versioned AI learning-path modules remain later-roadmap work.
- The Backend mock AI provider is an intentional deterministic test/development
  provider; environment validation rejects `AI_PROVIDER=mock` in production.

## Verification results

| Check | Command or method | Result |
| --- | --- | --- |
| AI-DOS conformance | `node D:\Work\AI-DOS\core\conformance.js --manifest .ai-dos/manifest.json` | PASS: 46 records and 32 tasks before this task update |
| Backend build | `npm.cmd run build` | PASS |
| Backend unit tests | `npm.cmd test -- --runInBand` | PASS: 57 suites, 321 tests |
| Backend E2E | `npm.cmd run test:e2e -- --runInBand` | PASS: 5 suites, 25 tests |
| Frontend build | `npm.cmd run build` | PASS with a 681.07 kB main-chunk warning |
| Frontend unit tests | `npm.cmd test` | PASS: 18 files, 52 tests |
| Frontend Playwright | `npm.cmd run test:e2e` | BLOCKED in auth setup: the demo-account secret is not configured; 1 setup test failed and 48 tests did not run |
| Production public pages | Headless Chromium, read-only | PASS on `/`, `/courses`, `/community`, and `/verify`: HTTP 200 and expected page headings |
| Production live APIs | Browser network observation | PASS: `GET /api/v1/courses` and `GET /api/v1/community/posts` returned 200 |

The first production browser pass logged one generic 500 resource error on
home, courses, and community. A follow-up with cache disabled captured no 4xx or
5xx responses and no console warnings/errors on any of the four routes, so the
symptom was transient and is not classified as a reproducible defect.

The task-required root-relative command
`node core/conformance.js --manifest .ai-dos/manifest.json` cannot run from this
workspace because `D:\Work\Edu-AI\core\conformance.js` does not exist. The
checked-in AI-DOS 1.2 runtime is available in the sibling `D:\Work\AI-DOS`
repository and passes against this manifest. The portable runtime layout is
tracked as a manual ownership decision rather than solved by copying framework
files into the project ad hoc.

## Prioritized defects and gaps

### P0

No P0 security, data-loss, or build-blocking defect was found in the audited
public and static scope.

### P1

1. **Admin dashboard is misrouted.** `App.tsx` sends
   `/admin/dashboard/*` to `StudentDashboard`, and the route has only the common
   authentication wrapper rather than an admin-specific route boundary.
2. **Instructor destinations silently fall back.** `/students`,
   `/certificates`, and `/settings` under `/instructor/dashboard` all render
   `InstructorDashboardHome`. The top-level `/assignments` destination renders
   the course-management page instead of a dedicated assignment overview.
3. **Legal links are dead.** Registration and authentication surfaces expose
   `/terms`, `/privacy`, and `/support`, but no matching route exists.
4. **Browser regression is not repeatable without a secret.** Playwright cannot
   create student/instructor auth state until a non-committed
   a demo-account secret matching the deterministic seed is supplied through the approved runtime channel.

### P2

1. **Marketing/navigation targets are dead.** `/pricing`, `/about`, `/contact`,
   `/language`, and `/global` are visible links without routes. `/pricing` is
   exposed from the desktop/mobile header and student upgrade control.
2. **Unknown routes have no explicit not-found UI.** Unmatched paths render an
   empty application main area.
3. **Instructor AI navigation is ambiguous.** The “AI assistant” destination
   renders `AiToolsPage`, while the student/global assistant renders
   `AiChatPage`.
4. **Frontend bundle warning.** The production main JavaScript chunk is
   681.07 kB (176.89 kB gzip), above Vite's 500 kB warning threshold.
5. **Portable AI-DOS entry point is absent.** The manifest is valid through the
   sibling framework runtime, but the documented root-relative `core/*.js`
   commands are unavailable from this workspace.

## Scope discipline

No application implementation was changed. Navigation gaps are assigned to
`SPR13-002`; deterministic regression coverage belongs to `SPR13-003`; new v2
domains remain in their declared dependency order.

## Workspace ownership update (2026-08-21)

The original baseline above is retained as historical evidence. Its sibling-runtime and missing-workspace-owner findings are superseded by the dedicated `EduAI-Workspace` repository at `https://github.com/EduAI-Flatform/EduAI-Workspace.git` on `main`.

AI-DOS Core 1.2.0 is now pinned under `core/`, with provenance in `core/AI_DOS_RUNTIME_PROVENANCE.md`. Canonical project commands run from the Workspace root as `node core/conformance.js --manifest .ai-dos/manifest.json` and `node core/project.js --manifest .ai-dos/manifest.json --out .ai-dos/generated`. Backend and Frontend remain independent sibling repositories; their contents are not tracked here.
