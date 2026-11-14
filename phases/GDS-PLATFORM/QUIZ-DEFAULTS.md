# Governed quiz defaults and notification overflow

Status: scoped feature and responsive fix released, with actual read-only production acceptance. The full original GDS plan remains VERIFYING.

## Requirement and behavior

Original stage 4 requires Admin-managed defaults for new quizzes, with instructors editing only within the permitted scope. The previous authoring form hardcoded these settings. The existing courses policy now governs passing score, time/attempt limits, question/option shuffling, answer visibility, required completion and instructor override permission through its draft, validation, preview, approval and effective-date lifecycle.

Creation inherits effective defaults. Zero configuration limits mean unlimited; quiz API values use null. Locked instructors cannot override protected fields through the API. Admin retains override authority. A new policy does not rewrite existing quizzes; title/content edits to an existing quiz remain possible without resetting its settings. Historical policy JSON without the optional section retains the old creation defaults without rewriting stored history. No migration, dependency, financial mutation or business-policy activation is included.

## Source and verification

- Backend PR48 candidate `59c117f1eb555f84f4024a59f405a4ad7043f63f` merged as `b1e1f6771751003b91615f4f5f8406d0cad0a82c`. Final quality CI `43547770243`, migration replay `43547770102`, main quality `43548408559`, main replay `43548408601` and automatic deployment `43548408472` passed. The merged temporary branch was removed remotely and locally.
- The disposable real PostgreSQL replay exercises actual policy draft/preview/approval/effectiveness, successive defaults of 85 and 90, forbidden teacher override, allowed title-only changes, unchanged earlier quiz settings and unchanged purchased grants. `GDS_GOVERNED_QUIZ_DEFAULTS_POSTGRES=PASS` was observed in both standard and production-classified synthetic cases at 02:44:01Z/02:44:03Z on 2026-11-14.
- Frontend PR41 candidate `d1822382140098a168a19f14aa32813427507a40` merged as `3f7b49a5591272e3ed4d8abcee7d13b95945cc25`. Final CI `43548171845`, main CI `43548907691` and deployment `43548907733` passed. Its temporary branch was removed remotely and locally.
- Frontend verification includes four form unit cases, four Chromium Admin/instructor cases in VI/EN across all seven required widths, full Vitest 141 files / 621 tests, TypeScript and build. Production dependency audits reported no high/critical vulnerabilities; existing lower-severity advisories and the pre-existing large-chunk build advisory remain visible.
- A read-only production check passed the Admin course configuration surface, then reproduced instructor overflow at 320 px with real unread notifications. The badge was positioned outside its trigger. PR42 contains the badge within that trigger; its fixture now uses 125 unread notifications and verifies `99+`. The four browser cases and twelve notification unit tests passed. Final PR CI `43549927298` passed before merge as `731d8b4b35fd48c59a1124164e54dd265e1bab55`, whose fetched main tree matches candidate `1c5851165d5c9ce2efced2e53f7afddf947775ba` exactly.
- The owner reconfirmed arbitrary additional card tiers. A fresh Chromium run passed adding/saving a fourth `diamond` tier and previewing quota impact in VI/EN across seven widths. The two focused backend validation/evaluator suites passed 39 tests. Three initial tiers are defaults, not a fixed enum.

## Final production acceptance

Frontend PR42 post-merge CI `43550399629` and production deployment `43550399637` passed at exact main `731d8b4b35fd48c59a1124164e54dd265e1bab55`. Its merged temporary branch was deleted remotely/locally and references pruned after verifying ancestry. At 2026-11-14T03:15:20.742Z, actual authenticated Admin and instructor checks passed in VI/EN at 320, 375, 390, 412, 768, 1024 and 1440 px. Both forms matched defaults from the actual API; the instructor also successfully read the owned course's quiz-management endpoint. There were no page JavaScript errors, policy/quiz writes, financial writes, changed settings or refresh requests. The instructor screenshot at 390 px was visually inspected and shows the real unread badge within its trigger. Sanitized receipt: `D:/Work/Edu-AI/.codex-artifacts/gds-production/quiz-defaults-readonly.json`; screenshots share the `quiz-defaults-` prefix in that directory.

## Remaining scope

The authenticated quiz-default check is read-only: it must not save a policy or create a production quiz. Disposable PostgreSQL and API-fixture browser evidence are distinct from a production learner submitting an actual quiz. School-specific integrations await a real partner contract. A source audit also found partner catalog items have name/logo/link/category but no separate connection-status field; application review status must not be presented as API/SSO connectivity. This remains an original-plan implementation item.
