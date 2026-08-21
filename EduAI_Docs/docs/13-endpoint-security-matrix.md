# Endpoint Security Matrix

## Scope and authority

This review covers every NestJS HTTP route under `src/modules` as of Sprint 20.
Runtime decorators and server-side service queries remain authoritative; this
document is an audited view. Run `npm run security:audit-endpoints` in the backend
repository to enumerate every route directly from the controller AST. The command
fails if a route is neither protected nor explicitly marked `@Public()`.

Audit result: **206 endpoints**: **187 protected**, **15 public**, and **4 public
with optional authentication**. There are **0 implicit access decisions**.

The application registers `JwtAuthGuard` globally, so new routes are protected by
default. Public routes must opt out explicitly. Protected requests resolve the
current active database user and current database roles; JWT role claims alone are
not trusted. Resource services enforce ownership or enrollment in their database
queries and return not-found where disclosure of another user's resource would be
unsafe.

## Per-controller matrix

Every route emitted by the audit command belongs to exactly one row below; the
endpoint counts total 206.

| Controller / route family | Count | Access and RBAC decision | Server-side scope / validation |
| --- | ---: | --- | --- |
| Admin | 6 | Platform Administrator | Admin-only reports, audit logs, and transactional user status/role changes. |
| Admin moderation | 3 | Platform Administrator | Supported target registry, bounded reason, atomic immutable audit event. |
| AI | 8 | Authenticated; embedding rebuild is Platform Administrator | User-scoped sources and generated data; source authorization occurs before retrieval. |
| Assignments | 11 | Student or instructor/admin by operation | Course ownership, enrollment, submission ownership, DTOs, and private file projections. |
| Auth | 6 | 4 explicit public; `me` authenticated; admin test Platform Administrator | DTO validation, current-user resolution, token rotation/revocation. |
| Certificates | 4 | 1 explicit public verification; student owner/admin mutations protected | Enrollment ownership; public response excludes email, phone, and internal IDs. |
| Classrooms | 9 | Student or instructor/admin by operation | Course ownership/enrollment and server-recorded attendance timestamps. |
| Community | 10 | 3 explicit public reads; mutations authenticated | Author/admin ownership and moderation-aware public projections. |
| Courses | 12 | 2 explicit public/optional reads; mutations protected | Instructor ownership/admin override, enrollment checks, explicit response projections. |
| Dashboards | 2 | Authenticated student/instructor | Queries are scoped to the current user or owned courses. |
| Health | 2 | Public liveness; dependency health is Platform Administrator | Sanitized named statuses only; no configuration, endpoint, model, account, or credential data. |
| Job applications | 9 | Learner owner or Platform Administrator | Learner ownership in reads/withdrawals; admin-only review transitions. |
| Job matching | 1 | Student | Uses only the authenticated learner's profile and public active jobs/courses. |
| Jobs | 9 | 2 explicit public reads; 7 Platform Administrator operations | Public projections exclude creator, deletion, and audit fields. |
| Lessons | 12 | 2 explicit public/optional reads; mutations protected | Course ownership/enrollment; private content and media require authorization. |
| Library resources | 5 | Authenticated; create is instructor/admin | User-scoped favorites, visibility checks, explicit resource projections. |
| Library taxonomy | 8 | 2 explicit public reads; 6 instructor/admin mutations | UUID/DTO validation and relation-conflict checks. |
| Mentor bookings | 7 | Student/instructor by operation | Participant checks and validated state transitions hide non-participant records. |
| Mentor outcomes | 7 | Booking participant; mentor/learner role by mutation | Private notes are mentor-only; goals/reviews are participant- and lifecycle-scoped. |
| Mentor profiles | 7 | Student directory, instructor owner, or Platform Administrator | Instructor ownership; public projections exclude contact and approval metadata. |
| Mentor sessions | 2 | Booking participant or Platform Administrator | Server-side participant check and idempotent attendance. |
| Moderation owner status | 1 | Authenticated owner or Platform Administrator | Ownership predicate is applied before returning moderation state. |
| Notifications | 7 | Authenticated | Every query/mutation is scoped to the current user. |
| Profile | 14 | Authenticated | Current-user ownership for profile, skills, portfolio, and upload mutations. |
| Public media | 1 | Explicit public | Opaque signed token; short-lived redirect; no storage key returned. |
| Public career profile | 1 | Explicit public | Published projection excludes private contact and owner fields. |
| Quizzes | 14 | Student or instructor/admin by operation | Course ownership/enrollment, attempt ownership, and bounded DTO inputs. |
| Scholarships | 9 | Student owner or Platform Administrator | Student application ownership and administrator campaign/application scope. |
| TMI learner | 3 | Student | Wallet, rewards, and history scoped to the authenticated learner. |
| TMI redemption | 5 | Student owner or Platform Administrator | Transactional balance checks; admin-only refund/adjustment operations. |
| TMI reward | 4 | Platform Administrator | Admin-only CRUD with DTO validation and explicit projections. |
| Vouchers | 7 | Student or Platform Administrator | Redemption is bound to the current student and eligible course transaction. |

## Explicit public routes

- Auth: `POST /auth/login`, `/auth/firebase`, `/auth/refresh`, `/auth/logout`.
- Catalog/content: `GET /courses`, `/courses/:id`,
  `/courses/:courseId/lessons`, `/lessons/:id`, `/community/posts`,
  `/community/posts/:id`, `/community/posts/:postId/comments`, `/jobs`,
  `/jobs/:id`, `/library/categories`, and `/library/tags`.
- Verification/projections: `GET /certificates/verify/:code`,
  `/profiles/:publicSlug/career`, `/media/public/:token`, and `/health`.

The four course/lesson/community detail routes that accept optional JWT reject an
invalid supplied token while still allowing an anonymous request.

## Abuse limits and file safety

- Password login: 5 attempts per IP per 15 minutes.
- Firebase login: 5 attempts per IP per 15 minutes; Firebase registration
  (`mode=register`): 10 requests per IP per hour.
- Refresh and logout: 30 requests per IP per 15 minutes each.
- AI chat, summary, quiz, flashcards, and learning-path generation: 30 requests
  per authenticated user per UTC day. Embedding rebuild: 2 per administrator per
  hour.
- Multipart uploads and direct video-upload authorization: 20 per authenticated
  user per 24-hour window.
- Public certificate verification: 60 requests per IP per 15 minutes. Public
  profile and media projections: 120 requests per IP per 15 minutes.

Redis performs each increment-and-expiry operation atomically and keys contain a
SHA-256 identity digest rather than raw user IDs or IP addresses. Production fails
closed with 503 when the configured limiter is unavailable. Local in-memory fallback
is limited to development and test runtimes.

Upload endpoints retain their existing byte-size, MIME, file-signature, generated
object-key, and R2 storage checks. JSON-only updates on multipart-capable endpoints
do not consume upload quota.

## Cross-cutting production controls

- Global DTO validation uses transformation and an allowlist.
- Production 500 responses use the stable error envelope and never include a stack
  trace or exception message.
- Responses set CSP, frame denial, MIME-sniff prevention, and no-referrer headers.
- CORS uses the configured origin allowlist, and one trusted reverse-proxy hop is
  used in production for client-IP rate limits.
- Secret verification is performed against tracked files only; `.env`, tokens,
  cookies, and raw authentication state are excluded from evidence.
