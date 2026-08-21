# Performance and Accessibility Audit

## Scope

SPR20-003 covers the public home/catalog path, route loading, critical images,
keyboard navigation, and API list/query bounds. Measurements use a mobile
Lighthouse profile. Raw Lighthouse JSON is temporary and is not a project
record.

## Baseline

The deployed home page before implementation produced:

| Metric | Baseline |
| --- | ---: |
| Performance | 60 |
| Accessibility | 100 |
| Best practices | 100 |
| FCP | 6.60 s |
| LCP | 6.75 s |
| CLS | 0.0001 |
| TBT | 88 ms |
| JavaScript transfer | 893,968 B |
| CSS transfer | 340,418 B |
| Estimated unused JavaScript | 542,398 B |
| Estimated unused CSS | 319,952 B |

The root document response was approximately 10 ms. The measured bottleneck was
unused frontend code, not server document latency.

## Implementation measurement

Route-level lazy loading splits every page/dashboard from the app shell. A
build-time budget fails when initial JavaScript exceeds 200 KiB gzip or initial
CSS exceeds 50 KiB gzip.

| Build metric | Before | After |
| --- | ---: | ---: |
| Initial JavaScript (raw) | 851,073 B | 381,378 B |
| Initial JavaScript (gzip) | not previously gated | 103,073 B |
| Initial CSS (raw) | 339,832 B | 24,738 B |
| Initial CSS (gzip) | not previously gated | 5,564 B |

The final optimized local production build produced performance 97,
accessibility 100, FCP 1.58 s, LCP 2.31 s, CLS 0, TBT 85 ms, JavaScript transfer
254,146 B, CSS transfer 9,806 B, and estimated unused JavaScript 37,087 B.
Local best-practices was 96 solely because the static preview intentionally had
no API proxy; the authoritative deployed measurement is recorded in AI-DOS
production evidence after release.

The deployed revision produced two stable confirmation runs at performance 88,
accessibility 100, best practices 100, and SEO 83. FCP was approximately 3.00 s,
LCP 3.15 s, CLS 0.0001, and TBT 27-31 ms. This is a material improvement over
the performance-60 baseline. The remaining transfer gap is infrastructure:
production Nginx serves the 381,372-byte hashed entry JavaScript without gzip or
Brotli and adds `Cache-Control: public, no-transform`. Enabling compression and
removing that directive requires VPS Nginx configuration access, so it is
tracked as a nonblocking manual release optimization.

An intermediate measurement exposed CLS 0.5213: the footer rendered while a
lazy route was pending and shifted after the route resolved. Moving the footer
inside the same Suspense boundary reduced the measured CLS to zero.

## Image loading audit

- The above-fold home dashboard preview is explicit `loading="eager"` with
  `fetchPriority="high"` and intrinsic 1200x820 dimensions.
- Featured course images and the below-fold certificate preview are lazy,
  asynchronously decoded, and have intrinsic dimensions.
- Route-level hero/detail images remain eager by default; no critical image is
  marked lazy.
- Dynamic course/profile images continue to use feature-owned aspect-ratio and
  object-fit rules. This task does not rewrite user-owned media URLs.

## Keyboard and accessibility audit

- A visible-on-focus skip link targets the focusable main landmark.
- Keyboard-only Playwright coverage activates the skip link, verifies focus on
  main content, activates the course navigation link with Enter, and verifies
  the lazy-loaded destination.
- Existing notification controls retain Enter/Escape coverage, and public
  home/catalog responsive checks continue at mobile and desktop widths.
- Lighthouse accessibility remains 100 after the change.

## API and query-bound audit

Paginated global endpoints already validate a maximum page size of 100. AI
sources are capped at 50, notification replay and TMI history at 100, and fixed
preference enumerations have a schema-defined cardinality. The remaining
legacy array responses now apply the shared `MAX_UNPAGINATED_API_ITEMS=100`
directly to their Prisma response queries:

- public courses and community posts/comments;
- course lessons, assignments/submissions, quizzes/questions/attempts, and
  classroom sessions;
- learner enrollments, profile skills/portfolio, certificates, and favorites;
- library categories/tags and eligible scholarship candidates.

The cap preserves existing response shapes and therefore does not require a
frontend contract migration. Internal correctness workflows that need complete
sets are deliberately excluded.

Static query-plan review confirmed indexes for the scoped owner/parent keys and
major filters, including course, lesson, enrollment, quiz, assignment,
submission, classroom, community, certificate, and scholarship relations. No
production latency evidence justified a speculative schema migration. Bounded
production UAT records safe aggregate response timings after deployment.

## Regression guards

- `npm.cmd run build`
- `npm.cmd run test:performance`
- frontend unit and focused Playwright suites
- backend unit/HTTP suites and build
- production Lighthouse and bounded API timing UAT
