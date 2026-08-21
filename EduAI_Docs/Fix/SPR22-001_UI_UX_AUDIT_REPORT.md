# SPR22-001 — Production UI/UX Audit and Refinement

## Scope and route inventory

The audit covered the public and authenticated route families defined by the application router and navigation:

- Public: `/`, `/courses`, `/courses/:courseId`, `/jobs`, `/jobs/:jobId`, `/community`, `/career/:slug`, certificate verification, login, registration, and email verification.
- Student: dashboard, learning, classrooms, library, community, certificates, job applications, mentors/bookings, AI tools, quizzes, assignments, profile, rewards, and course learning.
- Instructor: dashboard, course/lesson/quiz/assignment management, classrooms, library, AI, mentoring, and bookings.
- Platform administrator: dashboard, audit log, users, moderation, vouchers, scholarships, TMI, jobs, applications, and mentors.

Production was inspected with browser tooling at `https://eduai.giaoducso.org.vn/`. Deterministic layout regression covered 320, 360, 375, 390, 412, 430, 768, 820, 1024, 1280, 1366, 1440, 1536, and 1920 pixels. The existing production UAT suite exercised Student, Instructor, and Administrator route families at 320 and 1440 pixels.

## Principal findings and root causes

1. Course cards were excessively tall: the catalog used square media and three desktop columns, while the homepage maintained a duplicate card presentation with stale CSS overrides.
2. Mobile navigation wrapped into two rows because seven destinations competed for six grid columns.
3. Notification controls and panels used desktop-style positioning on narrow screens and could collide with content or fixed navigation.
4. Typography used 700–900 weights broadly, making headings, labels, buttons, cards, learning pages, and dashboards compete visually.
5. Surface, border, radius, focus, motion, and control values were not fully expressed through one semantic foundation.
6. On mobile course detail, enrollment information followed the full syllabus because the complete desktop sidebar was appended after main content.
7. Several visual regression assertions encoded the former square-card and six-link mobile assumptions.

## Implemented design-system changes

- Expanded semantic color, surface, border, radius, container, shadow, focus, selection, and reduced-motion foundations.
- Standardized global box sizing, form typography inheritance, focus-visible behavior, horizontal overflow protection, and motion fallback.
- Refined shared Button, Input, and Modal states, sizing, padding, radii, disabled/loading behavior, and viewport bounds.
- Removed interface weights above 700 and shifted routine headings and controls toward 500/600. A static regression test prevents 750/800/900 from returning.
- Retained the established EduAI blue/purple/emerald identity while introducing controlled subtle and elevated surfaces.

## Page and component changes

- Homepage: simplified hierarchy and copy, removed duplicated course markup and obsolete CSS, reused the shared CourseCard, reduced section/card dominance, and retained responsive carousel navigation.
- Course discovery: changed catalog density to one horizontal card per row on phones, two columns on tablets, and four 16:9 cards on desktop; preserved search, level filters, price, rating, and pagination.
- Course detail: reduced mobile hero/type/spacing and promotes the enrollment card before long syllabus content while secondary side information remains after the main content.
- Navigation: five primary phone destinations plus an accessible “More” dialog for Library and Certificates; one fixed safe-area-aware row.
- Notifications: selected a bottom-sheet pattern because the center contains a list and preferences rather than a transient single message. The trigger sits above bottom navigation; the sheet is viewport-bounded and safe-area-aware.
- Learning, dashboard, admin, classroom, assignment, quiz, AI, library, certificate, career, job, and profile surfaces received the restrained typography pass. Existing responsive card/list handling for key admin tables was retained and visually re-baselined.

No business logic, API contract, role boundary, or authorization rule was changed.

## Accessibility and responsive evidence

- Shared focus-visible outlines, semantic controls, labelled navigation/dialogs, lazy course images with meaningful Vietnamese alt text, reduced-motion handling, bounded dialogs, and minimum mobile controls were preserved or improved.
- Long course titles are clamped without fixed-height text clipping; mobile cards remain at or below 180 pixels in deterministic regression.
- The catalog has no horizontal overflow throughout the 14 required viewport widths.
- Admin user management at 320 pixels renders labelled record cards rather than an unreadable compressed table.
- Production browser console remained clean on the public homepage and catalog; production catalog measured four columns, 300 × 378 pixel cards, 168 pixel media, and zero horizontal overflow at 1440 pixels.

## Visual evidence

- `EduAI-Front-End-Web/playwright/__screenshots__/home-course-carousel.spec.ts/home-refined-320.png`
- `EduAI-Front-End-Web/playwright/__screenshots__/home-course-carousel.spec.ts/home-refined-1024.png`
- `EduAI-Front-End-Web/playwright/__screenshots__/sprint21-mobile-catalog.spec.ts/course-catalog-refined-320.png`
- `EduAI-Front-End-Web/playwright/__screenshots__/sprint21-mobile-catalog.spec.ts/course-catalog-refined-1440.png`
- `EduAI-Front-End-Web/playwright/__screenshots__/admin-users-responsive.spec.ts/admin-users-320.png`
- `EduAI-Front-End-Web/playwright/__screenshots__/admin-users-responsive.spec.ts/admin-users-1440.png`

## Verification and release

- Frontend unit/component regression: PASS — 69 files, 181 tests.
- Production build: PASS — TypeScript and Vite.
- Bundle budget: PASS — initial JS 382,527 bytes raw / 103,347 bytes gzip; initial CSS 28,454 bytes raw / 6,292 bytes gzip.
- Course catalog viewport matrix: PASS — 14/14 required widths.
- Homepage and catalog visual regression: PASS — 7 checks with four new snapshots.
- Administrator responsive visual regression: PASS — 320 and 1440 pixels.
- Production UAT: PASS — 48/48 sanitized checks across Student, Instructor, Administrator, authorization, notification center/SSE, and certificate flow.
- Frontend revision: `21af7fd32db85a3207688152d976cf1d655f4e02` (`9c4b72b`, `21af7fd`).
- Frontend CI: PASS — run `32448158454`.
- Production deployment: PASS — run `32448158552`.
- Production cache-busted browser UAT: PASS — shared CourseCard assets and updated page copy loaded with zero public console errors.

## Remaining bounded issues

- The standard non-cache-busted browser tab briefly served its previously cached entry document after deployment; a cache-busted navigation loaded the new hashed asset immediately. This was a client cache observation, not a failed deployment.
- The comprehensive visual suite still depends on seeded/local course data for its legacy non-fixture scenarios. The deterministic SPR22 card/catalog and role-based production UAT suites provide the acceptance evidence for this task.
- Nginx compression remains the existing nonblocking manual optimization `MANUAL:SPR20_003_NGINX_COMPRESSION`; this task did not alter infrastructure.
