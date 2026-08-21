# Sprint 13 Core V1 Regression Checklist

Recorded: 2026-08-10  
Task: `SPR13-003`  
Application revision verified in production: `cebb2beeccc991f6c161a1f7bd56d585eb24012b`

## Quality gates

| Gate | Command | Result |
|---|---|---|
| Demo fixture contract | `npm.cmd run test:demo-data` in Backend | PASS — 1 suite, 13 tests |
| Demo database verification | `npm.cmd run db:verify:demo` in Backend | PASS — expected entity counts and bcrypt rounds |
| Demo credential match | Read-only boolean comparison | PASS — three accounts present and configured value matches |
| Backend build | `npm.cmd run build` | PASS |
| Backend unit suite | `npm.cmd test -- --runInBand` | PASS — 57 suites, 321 tests |
| Backend HTTP E2E suite | `npm.cmd run test:e2e -- --runInBand` | PASS — 5 suites, 25 tests |
| Frontend build | `npm.cmd run build` | PASS — existing main-chunk size warning only |
| Frontend unit suite | `npm.cmd test` | PASS — 23 files, 64 tests |
| Frontend local Playwright | `npm.cmd run test:e2e` | PASS — 51 tests |
| Production authentication setup | production Playwright auth project | PASS — environment plus three role logins, 4 tests |
| Production read-only UAT | mobile and desktop production projects | PASS — 10 scenarios, 38 route/viewport checks |

No credential value, cookie, token, storage-state content, or trace/video artifact
was retained in this checklist or the canonical evidence records.

## Flow and authorization matrix

| Domain | Happy-path coverage | Unauthorized / ownership coverage | Status |
|---|---|---|---|
| Authentication | Backend register/login/refresh/logout/me tests; deterministic Playwright login for student, instructor, and administrator | Missing/invalid bearer token, wrong password, inactive user, revoked/expired refresh token, and missing role tests | PASS |
| Student experience | Dashboard, learning, quiz, assignment, classroom, library, community, certificate, AI, and profile Playwright journeys against demo data | Student production access to instructor routes redirects to the student dashboard at mobile and desktop widths | PASS |
| Instructor experience | Dashboard aggregate, courses, lessons, quizzes, assignments, classrooms, library, and AI route journeys | Non-owner course, quiz, question, assignment, classroom, recording, and embedding service tests; instructor production access to admin routes is rejected | PASS |
| AI | Conversation, summary, retrieval, embedding, quota, provider mapping, prompt, quiz, and flashcard unit coverage; authenticated AI pages render | Cross-user conversation, inaccessible source, and non-owner embedding paths return safe failures without provider calls | PASS |
| Classroom | Create/list/start/join/attendance/recording service coverage and authenticated browser routes | Non-owner instructor, non-enrolled student, non-live join, invalid attendance, and recording ownership paths are rejected | PASS |
| Library | Search, visibility, favorites, taxonomy, upload validation, and authenticated library pages | Student/public visibility scope, instructor private-owner scope, missing taxonomy, and duplicate favorite paths are covered | PASS |
| Community | Public feed plus authenticated post/comment/reaction service and page coverage | Only authors/admins can update or delete; cross-user update and comment deletion paths are rejected | PASS |
| Certificates | Completion issuance, duplicate prevention, current-user list, public verification, and browser certificate routes | Incomplete enrollment and unknown code are rejected; protected endpoints carry authentication/student-role guards | PASS |

## Production UAT summary

- Student visible routes: 10 routes × 2 widths = 20 checks.
- Instructor visible routes: 6 routes × 2 widths = 12 checks.
- Administrator destination: 1 route × 2 widths = 2 checks.
- Cross-role rejection: 2 boundaries × 2 widths = 4 checks.
- Failed monitored API responses: 0.
- Console errors: 0.
- Non-read requests after login: 0; only `GET`, `HEAD`, and `OPTIONS` were
  permitted.

## Known limitations

- Production UAT is intentionally read-only. Mutation behavior is verified by
  Backend service/controller tests, not by writes against production.
- Local AI generation uses the deterministic mock provider. Real third-party AI
  provider quality and quota operations remain outside this regression run.
- The Backend HTTP E2E suite focuses on transport, auth, error handling, health,
  and profile flows. Domain ownership boundaries are primarily verified by the
  focused controller/service suites listed above.
- The Frontend build continues to report the known approximately 680 kB main
  chunk warning; this does not fail the build and is not introduced by Sprint 13.
