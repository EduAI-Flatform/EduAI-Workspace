# 08-api-design.md

# API Design

## Base URL

```text
/api/v1
```

## Response Format

Every response includes `X-Request-Id`. Error envelopes also include the same
sanitized `correlationId`, which clients may show to users for support without
exposing stack traces or internal details.

Success:

```json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

Command response rule:

- If a command endpoint returns necessary data, do not add `success`.
- If a command endpoint does not need to return data, return `success: true`
  with a human-readable `message`.

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Readable error message"
  }
}
```

## Health and monitoring

- `GET /health` is a public lightweight liveness response.
- `GET /api/v1/health/dependencies` is restricted to Platform Administrators and
  returns only `ok`, `disabled`, or `error` for database, Redis, R2, Firebase,
  OpenAI, and Gemini. Each probe is bounded to five seconds; no endpoint, model,
  account, credential, or exception detail is returned.
- Backend monitoring is opt-in through `MONITORING_ENABLED` and
  `MONITORING_ENDPOINT`. Frontend reporting uses the corresponding
  `VITE_MONITORING_ENABLED` and `VITE_MONITORING_ENDPOINT` build variables.
- Monitoring events contain only error code, HTTP status, correlation ID, safe
  path, environment, and timestamp. Delivery failure never replaces the original
  application error.

## Response Field Selection Policy

All API tasks MUST define an explicit response contract for each endpoint.

- Return only fields required by the current client use case.
- Use output DTOs/types and explicit Prisma `select` projections. Do not return a
  Prisma entity directly from a controller or service.
- Define separate contracts when list, detail, create, and update endpoints need
  different fields. List responses should normally be smaller than detail responses.
- Exclude internal fields by default, including password/token data, ownership fields
  used only for authorization, soft-delete fields, audit metadata, and internal
  relations.
- Include nested relations only when required, with an explicit nested `select`.
- Do not expose a newly added database column automatically. Adding a response field
  requires an intentional API contract change and corresponding documentation.
- Add focused tests that verify the selected fields and prevent accidental field
  exposure.

API task acceptance checklist:

- [ ] Response fields are documented.
- [ ] Output contract is independent from the database entity.
- [ ] Prisma queries use explicit `select` for data returned to clients.
- [ ] Internal or sensitive fields are absent from success responses.
- [ ] Tests protect the response projection.

## Auth

Use:

```text
Authorization: Bearer <token>
```

## Auth API

- POST /auth/login
- POST /auth/firebase
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me

Normal email/password login:

- `POST /auth/login` is the only normal email/password login path in every
  environment.
- The Backend normalizes the email, loads the PostgreSQL user, checks active and
  soft-delete state, and compares the submitted password with `passwordHash`
  through `PasswordService` before issuing EduAI tokens.
- Unknown accounts return `ACCOUNT_NOT_FOUND`, wrong passwords (including a
  missing local hash) return `INVALID_CREDENTIALS`, and non-active accounts
  return `ACCOUNT_BLOCKED`.
- Firebase password sign-in is not part of normal login.

Email/password registration completion:

- The Frontend creates the Firebase password account and sends the verification
  email. After verification, it sends the verified Firebase ID token, original
  registration password, and requested `student` or `instructor` role to
  `POST /auth/firebase` with `mode=register`.
- The Backend derives the email from the verified token, requires
  `email_verified=true`, hashes the password immediately through
  `PasswordService`, and creates the PostgreSQL account with the Firebase UID.
- The removed `POST /auth/register` route must not be restored as an
  email-verification bypass.

Google authentication:

- Google popup/redirect remains Firebase-based and exchanges a verified token
  through `POST /auth/firebase`.
- Google-only users may keep `passwordHash=null`; they cannot authenticate
  through `POST /auth/login`.

Password reset:

- No password-reset workflow is currently implemented.
- Any future reset flow must update PostgreSQL `passwordHash` through
  `PasswordService`; changing only the Firebase password would not change the
  credential used by normal login.

## Profile API

- GET /profile/me
- PUT /profile/me
- GET /profile/career
- PUT /profile/career
- GET /profiles/:publicSlug/career (public; excludes private contact and owner fields)
- POST /profile/avatar
- GET /profile/skills
- POST /profile/skills
- DELETE /profile/skills/:id
- GET /profile/portfolio
- POST /profile/portfolio
- PUT /profile/portfolio/:id
- DELETE /profile/portfolio/:id

## Job Opportunity API

- GET /jobs (public; published, unexpired jobs only; paginated search)
- GET /jobs/:id (public active-job detail)
- GET /admin/jobs
- GET /admin/jobs/:id
- POST /admin/jobs
- PATCH /admin/jobs/:id
- POST /admin/jobs/:id/publish
- POST /admin/jobs/:id/close
- DELETE /admin/jobs/:id
- POST /jobs/:id/saved (student)
- DELETE /jobs/:id/saved (student)
- GET /me/saved-jobs (student-private)
- POST /jobs/:id/applications (student-private)
- GET /me/job-applications (student-private)
- GET /me/job-applications/:id (student-private)
- POST /me/job-applications/:id/withdraw (student-private)
- GET /admin/job-applications (Platform Administrator)
- PATCH /admin/job-applications/:id/status (Platform Administrator)
- GET /jobs/:id/match (student; deterministic skill fit)

Public job responses exclude creator, soft-delete, and audit fields. Platform
Administrator guards protect every admin route, and create/update/publish/close/delete
mutations write sanitized audit events. A closed or expired job is not accepting
applications and is excluded from public queries.

Applications enforce one submission per learner/job, validate job publication and
deadline inside the submission transaction, preserve append-only status history,
and never appear in public job responses. Learners can read/withdraw only their own
applications; administrators can review applications and make validated status
transitions. Terminal application states cannot transition again.

Job matching is read-only and derives a reproducible integer fit score from the
authenticated learner's stored skills and the active job's required skills. Known
proficiency levels are ordered from foundational/beginner through expert; unknown
level labels must match exactly. The response separates matched skills from missing
or under-level skills and explains the aggregate score. Course recommendations are
bounded to non-deleted, moderation-clear, public, published catalog entries whose
title, description, or category matches a missing skill. The matching service does
not read or mutate application lifecycle state and does not depend on an AI provider.

## Mentor API

- GET /mentor/profile (instructor owner)
- PUT /mentor/profile (instructor owner)
- PATCH /mentor/profile/active (instructor owner)
- GET /mentors (student; paginated active approved directory)
- GET /mentors/:id (student; active approved detail)
- GET /admin/mentors (Platform Administrator)
- PATCH /admin/mentors/:id/approval (Platform Administrator)
- POST /mentors/:mentorId/bookings (student)
- GET /mentor-bookings (student owner)
- GET /mentor/bookings (instructor mentor owner)
- PATCH /mentor-bookings/:id/accept (booking participant)
- PATCH /mentor-bookings/:id/reject (booking participant)
- PATCH /mentor-bookings/:id/cancel (booking participant)
- PATCH /mentor-bookings/:id/reschedule (booking participant)
- POST /mentor-bookings/:id/session/join (booking participant or Platform Administrator)
- POST /mentor-bookings/:id/session/leave (booking participant or Platform Administrator)
- GET /mentor-bookings/:id/outcomes (booking participant)
- PUT /mentor-bookings/:id/private-note (booking mentor)
- PUT /mentor-bookings/:id/shared-note (booking mentor)
- POST /mentor-bookings/:id/goals (booking mentor)
- PATCH /mentor-bookings/:id/goals/:goalId (booking participant)
- POST /mentor-bookings/:id/complete (booking mentor)
- PUT /mentor-bookings/:id/review (booking learner)

Mentor profiles belong to instructors. Approval is an explicit administrator
decision and is audited; an instructor cannot activate mentor mode until the
profile is approved and has at least one availability slot. Rejection disables
the profile. Removing instructor eligibility also excludes an otherwise active
profile from the directory.

Recurring availability stores ISO weekday, start/end minute-of-day, and an
explicit validated IANA timezone on the owning profile. Slots must be ordered,
bounded to a day, and non-overlapping. Directory search supports bounded page,
page size, text, expertise, and timezone filters. Student responses use explicit
projections containing public name/avatar, mentor content, expertise, timezone,
and availability only; email, phone, user ID, approval actor, and private profile
fields are never returned.

Mentor bookings store one canonical UTC start/end pair visible to both parties.
Initial student requests require mentor acceptance. An accepted booking can be
rescheduled by either participant; the canonical time changes atomically and the
other participant must accept or reject the proposal. The requester cannot accept
or reject their own proposal. Rejection and cancellation are terminal, and every
cancellation requires a bounded reason preserved in append-only status history.
Every history entry also snapshots the canonical time and reschedules preserve the
previous time.

Acceptance runs in a retrying serializable transaction. It rejects any accepted
booking whose half-open interval overlaps for either the same mentor or student.
Requested/rescheduled times must be future, 15–240 minutes, and contained in the
mentor's recurring availability after conversion through the profile IANA timezone.
State changes send best-effort idempotent notifications to the other participant;
notification delivery cannot roll back an already committed canonical transition.

Accepted mentor bookings create a private Jitsi session lazily on the first authorized
join. The booking list never exposes the room name or meeting URL; the join endpoint
returns a URL only after server-side participant or Platform Administrator authorization.
Attendance is unique per session/user. Repeated join and leave calls preserve the first
canonical join/leave timestamps and duration instead of creating duplicate events.

Private mentor notes and learner-visible shared notes use separate persistence models.
Only the owning mentor can read or write the private note; learner outcome responses
never query or serialize it. Shared goals are participant-visible and participant-owned
status changes are validated server-side. Completion requires an accepted booking and
canonical ended attendance for both mentor and learner. A learner may create one review
per completed booking and edit it for seven days from creation; mentor rating aggregates
contain rating/count only and never expose review text in directory projections.

Mentor-review abuse reporting is explicitly deferred to SPR20-001. The current moderation
registry supports course, library, and community targets only; extending it safely requires
the endpoint-wide ownership and abuse-limit review rather than treating reviews as an
unrelated existing target.

SPR20-001 completed the endpoint-wide access and abuse-limit review. Mentor-review
report persistence and administrator disposition remain an explicitly deferred
product feature because no report lifecycle contract is defined; the review create/edit
endpoint itself remains learner-owned, session-gated, and protected by the global
authentication policy. See `docs/13-endpoint-security-matrix.md` for the complete audit.

## Course API

- GET /courses
- GET /courses/:id
- POST /courses
- PUT /courses/:id
- POST /courses/:id/publish
- POST /courses/:id/archive

Permission:

- Public can view published courses.
- Instructor can manage own courses.
- Admin can manage all courses.

Mutation contract:

- `POST /courses` and `PUT /courses/:id` accept the existing JSON payload or
  `multipart/form-data` with an optional `thumbnail` file.
- `slug` is optional on create. When omitted, the server generates a unique,
  URL-safe slug from the title; changing the title later does not change it.
  Existing clients may continue to provide a valid slug explicitly.
- Course thumbnails support JPEG, PNG, and WebP up to 5 MB. The server validates
  both the declared MIME type and file signature, generates the R2 object key
  under `course-thumbnails/`, and persists the generated public `thumbnailUrl`;
  client filenames are never used as storage keys.
- Omitting `thumbnail` on update preserves the existing thumbnail.

Response contract:

- Course responses expose only `id`, `title`, `slug`, `description`,
  `thumbnailUrl`, `level`, `status`, `visibility`, `createdAt`, and `updatedAt`.
- Course detail also exposes `lessonCount`.
- Course create, update, publish, and archive command responses expose only `id`
  and `status`.
- Internal ownership and soft-delete fields such as `instructorId` and `deletedAt`
  are not exposed.

## Instructor Course API

- GET /instructor/courses

Permission:

- Instructor only.
- The instructor is resolved from the authenticated JWT.
- The endpoint returns only courses owned by the authenticated instructor.

Query:

- `page` defaults to `1`.
- `pageSize` defaults to `20` and is capped at `100`.
- `status` filters by `draft`, `published`, or `archived`; values are
  case-insensitive. `Private` maps to `draft`; `Deleted` maps to `archived`
  for compatibility with the current course lifecycle model.
- `search` matches title, slug, or description.

Response contract:

- Returns `{ items, total, page, pageSize, totalPages }`.
- `items` use the course list response contract and do not expose `instructorId`
  or `deletedAt`.

## Lesson API

- GET /courses/:courseId/lessons
- GET /instructor/courses/:courseId/lessons
- POST /courses/:courseId/lessons
- PUT /lessons/:id
- DELETE /lessons/:id
- POST /lessons/:id/complete

Response contract:

- Public lesson lists expose lesson metadata only; lesson content and resource URLs
  are omitted.
- Instructor lesson lists are protected and return lesson metadata for lessons in
  courses owned by the authenticated instructor, including draft/private courses.
- Create and update responses may include editable content and resource URLs, but
  do not expose `deletedAt` or internal course ownership data.
- Lesson create/update requests and lesson responses include `isRequired`; when
  omitted it defaults to `true` for backwards compatibility.

## Enrollment API

- POST /courses/:id/enroll
- GET /me/enrollments
- GET /courses/:id/progress

Enrollment response contract:

- Enroll returns `success: true` and `message` only; clients should use
  `GET /me/enrollments` when enrollment data is needed.

Progress response contract:

- Returns `courseId`, `completedLessonIds`, `completedLessons`, `totalLessons`,
  `progressPercent`, and `completed`.
- `completedLessonIds` is the authoritative set used by clients; clients must not
  infer completed lessons from the aggregate count.
- Course completion is derived only by the server. An active enrollment becomes
  completed when the course has at least one required item and all required,
  non-deleted lessons plus all required, published quizzes and assignments are
  complete. Optional items do not block completion or later required steps.
- Lesson progress updates, passing quiz attempts, and assignment submissions run
  the same transactional, idempotent completion evaluator. Clients cannot mark an
  enrollment or course complete directly.

## Quiz API

- POST /courses/:courseId/quizzes
- GET /courses/:courseId/quizzes
- GET /quizzes/:id
- PUT /quizzes/:id
- DELETE /quizzes/:id
- POST /quizzes/:id/publish
- POST /quizzes/:id/questions
- GET /quizzes/:id/questions
- PUT /questions/:id
- DELETE /questions/:id
- GET /courses/:courseId/quizzes/available
- GET /quizzes/:id/take
- POST /quizzes/:id/attempts
- GET /quizzes/:id/attempts/me

Management permission:

- Instructor or platform admin authentication is required.
- Instructors can manage quizzes and questions only for their own courses.
- Unauthorized ownership lookups return not found without exposing the resource.

Management response contract:

- Quiz create/update requests and management responses expose `id`, `courseId`,
  `lessonId`, `title`, `description`, `passingScore`, `timeLimitMinutes`,
  `maxAttempts`, `randomizeQuestions`, `randomizeOptions`,
  `showCorrectAnswers`, `status`, `createdAt`, and `updatedAt`.
- Question management responses expose `id`, `quizId`, `type`, `questionText`,
  `optionsJson`, `correctAnswerJson`, `explanation`, `points`, `orderIndex`,
  `createdAt`, and `updatedAt`.
- `correctAnswerJson` is restricted to authenticated management endpoints and must
  not be included in student quiz-taking responses.
- New quizzes are always `draft`; status changes to `published` only through the
  dedicated publish endpoint. Deletion soft-deletes and archives the quiz.
- Quiz create/update requests and responses include `isRequired`; when omitted it
  defaults to `true`. Only required published quizzes participate in completion.
- Existing quizzes default to unlimited attempts, unrandomized presentation, and
  post-submission answer review enabled, preserving their established behavior.

Student quiz read contract:

- Enrolled students can list published quizzes for a published course through
  `GET /courses/:courseId/quizzes/available`.
- Enrolled students can read a published quiz for taking through
  `GET /quizzes/:id/take`.
- Student quiz-taking responses include quiz metadata plus questions with `id`,
  `quizId`, `type`, `questionText`, `optionsJson`, `points`, and `orderIndex`.
- Student quiz-taking responses must exclude `correctAnswerJson`, explanations,
  and stored submitted-answer JSON.
- When enabled, question and option randomization is deterministic for the
  student and current attempt number. It changes presentation only; answer
  submission and scoring continue to use immutable question identifiers.

Attempt permission and input contract:

- Student authentication and an enrollment in the published quiz course are
  required to submit an attempt.
- Submission accepts `answers[]` with exactly one unique `questionId` and JSON
  `answer` for every quiz question. Missing, duplicate, unknown, or incompatible
  answers are rejected.
- Scoring is weighted by question `points`; `scorePercent` is compared with the
  quiz `passingScore` to calculate `passed`.
- String answers are compared case-insensitively after trimming. Array ordering
  remains significant.
- A configured `maxAttempts` is enforced server-side for submitted attempts. The
  count-and-create path serializes on the quiz record so concurrent submissions
  cannot exceed the limit.

Attempt response contract:

- Returns `id`, `quizId`, `score`, `maxScore`, `scorePercent`, `passed`,
  `startedAt`, `submittedAt`, and `createdAt`.
- Attempt responses exclude correct-answer keys and stored submitted-answer JSON.
  Per-question submitted-answer correctness is returned only after submission
  when the instructor enables `showCorrectAnswers`; it is never included in
  quiz-taking or history responses.
- Attempt history is scoped to the authenticated student.

## Assignment API

- POST /courses/:courseId/assignments
- GET /courses/:courseId/assignments
- GET /assignments/:id
- PUT /assignments/:id
- DELETE /assignments/:id
- POST /assignments/:id/publish
- POST /assignments/:id/submissions
- GET /assignments/:id/submissions/me
- GET /assignments/:id/submissions
- POST /submissions/:id/grade

Assignment management contract:

- Instructor or platform admin authentication is required for create, update,
  publish, delete, and submission-list routes.
- Instructors can manage assignments only for their own courses. Unauthorized
  ownership lookups return not found.
- New assignments are `draft`; publishing uses the dedicated publish endpoint;
  deletion soft-deletes and archives the assignment.
- Assignment responses expose `id`, `courseId`, `lessonId`, `title`,
  `description`, `dueDate`, `maxScore`, `rubricCriteria`, `finalScorePolicy`,
  `isRequired`, `status`, `createdAt`, and `updatedAt`. Create/update requests
  may set `isRequired`; omission defaults it to `true`. Only required published
  assignments participate in completion.

Student submission contract:

- Enrolled students can read published assignments in published courses and submit
  multiple immutable versions per assignment. The latest version remains available
  through `GET /assignments/:id/submissions/me`; complete student-owned history is
  available through `GET /assignments/:id/submissions/me/history`.
- Submission requires text and/or a multipart `file`. Uploaded files receive a
  server-generated private R2 object key; arbitrary external `fileUrl` input is
  not accepted.
- Late work remains accepted. `isLate` is persisted at submission time from the
  server clock and due date, never calculated by a client.
- Submission responses expose submission metadata and content plus a short-lived
  authorized download URL for private uploaded files; internal object keys and
  assignment ownership data are never returned.
- A rubric-enabled assignment requires one score per configured criterion. The
  server derives the stored total and rejects unknown, duplicate, or out-of-range
  criterion scores. `finalScorePolicy` selects the latest graded version or the
  highest graded version for the student's final result.
- Enrolled students can read their own submission and grade state through
  `GET /assignments/:id/submissions/me`; this route must never expose other
  students' submissions.

Manual grading contract:

- Instructor or platform admin authentication is required.
- Instructors can grade submissions only for assignments in their own courses.
  Unauthorized ownership lookups return not found.
- Request body accepts `score` and optional `feedback`. `score` must be greater
  than or equal to `0` and must not exceed the assignment `maxScore`.
- Grading sets submission status to `graded`, records `gradedAt`, and stores the
  authenticated grader in `gradedById`.
- Grade responses use the submission response contract and include the
  server-derived `isLate` flag.

## Live Classroom API

- POST /courses/:courseId/classroom-sessions
- GET /courses/:courseId/classroom-sessions
- GET /classroom-sessions/:id
- PUT /classroom-sessions/:id
- DELETE /classroom-sessions/:id
- POST /classroom-sessions/:id/start
- POST /classroom-sessions/:id/join
- POST /classroom-sessions/:id/attendance
- POST /classroom-sessions/:id/recording

Classroom session management contract:

- Instructor or platform admin authentication is required for create, update,
  and delete routes.
- Instructors can manage sessions only for their own courses. Unauthorized
  ownership lookups return not found.
- New sessions are created with status `scheduled` and provider `jitsi`.
- Deletion soft-deletes the session and sets status to `cancelled`.
- Session responses expose `id`, `courseId`, `title`, `description`,
  `provider`, `meetingUrl`, `roomName`, `scheduledStart`, `scheduledEnd`,
  `actualStart`, `actualEnd`, `status`, `createdAt`, and `updatedAt`.
- Session responses do not expose `instructorId` or `deletedAt`.
- Room names are generated server-side. Create and update requests do not accept
  client-provided room names or meeting URLs.
- Start responses return `id`, `roomName`, `meetingUrl`, `status`, and
  `actualStart`. The meeting URL is generated from the stored room name and is
  not persisted as a permanent database link.
- Only the owning instructor can start a session. Platform admins can manage
  session records but do not start live classes on behalf of instructors.

Student classroom session contract:

- Enrolled students can list and read sessions for published courses they are
  enrolled in.
- Non-enrolled students receive not found and cannot infer whether sessions
  exist for a course.
- Join responses return `id`, `roomName`, and a generated `meetingUrl`.
- Students can join only live sessions for courses they are enrolled in.
- Attendance accepts `{ event: "join" | "leave" }` only for the authenticated
  enrolled student. The request body does not accept timestamps or user IDs.
- Attendance uses server-side timestamps. A join event creates or refreshes the
  unique `(sessionId, userId)` attendance row; a leave event sets `leftAt` and
  calculates `durationSeconds` from the stored `joinedAt`.
- Attendance responses expose `id`, `sessionId`, `userId`, `joinedAt`, `leftAt`,
  `durationSeconds`, `createdAt`, and `updatedAt`.
- Recording metadata can be added by the owning instructor or platform admin.
- Recording requests accept an HTTPS `recordingUrl` and optional
  `durationSeconds`; the session link comes from the path parameter.
- Recording responses expose `id`, `sessionId`, `recordingUrl`,
  `durationSeconds`, and `createdAt`.

## Library API

- GET /library/categories
- POST /library/categories
- PUT /library/categories/:id
- DELETE /library/categories/:id
- GET /library/tags
- POST /library/tags
- PUT /library/tags/:id
- DELETE /library/tags/:id
- GET /library/resources
- POST /library/resources
- GET /library/resources/:id
- PUT /library/resources/:id
- DELETE /library/resources/:id
- POST /library/resources/:id/favorite
- DELETE /library/resources/:id/favorite

Library taxonomy permission and response contract:

- Category and tag list routes are public read routes and return lean records.
- Category and tag create, update, and delete routes require an instructor or
  platform admin role.
- Category responses expose `id`, `name`, `slug`, `description`, `createdAt`,
  and `updatedAt`.
- Tag responses expose `id`, `name`, `slug`, and `createdAt`.
- Category and tag slugs are unique. Duplicate slugs return a conflict error.
- Deleting a category is rejected while library resources still reference it;
  deleting a tag removes its resource-tag links.

Resource upload contract:

- `POST /library/resources` accepts `multipart/form-data` with required `file`,
  `title`, `categoryId`, and `type`; optional fields are `description`,
  `visibility`, and `tagIds`.
- The upload route requires an instructor or platform admin role.
- Supported uploaded resource types are `pdf`, `docx`, `pptx`, `video`, and
  `image`; the server validates the MIME type and limits files to 50 MB.
- The server generates the R2 object key under `documents/` and ignores the
  client filename. The response stores and returns the generated public `fileUrl`.
- Resource responses expose only resource metadata, category summary, and tag
  summaries; storage credentials and internal upload details are never returned.

Resource search contract:

- `GET /library/resources` requires authentication and returns
  `{ items, total, page, limit, totalPages }`.
- Query parameters are `page`, `limit` (maximum `100`), `search`, `categoryId`,
  `tagId`, `type`, and `visibility`.
- `search` matches resource title/description, category name/slug, and tag
  name/slug. `type`, category, and tag filters are applied server-side.
- Students can see public resources only. Instructors can also see their own
  private resources. Platform admins can see all non-deleted resources.
- A requested private visibility filter never bypasses the role/owner scope.

Favorite contract:

- `GET /library/resources/favorites` returns the authenticated user's own
  visible saved resources.
- `POST /library/resources/:id/favorite` saves a visible resource for the
  authenticated user and returns `{ success: true, message }`.
- `DELETE /library/resources/:id/favorite` removes only the authenticated
  user's save and returns `{ success: true, message }`.
- The database unique constraint on `(user_id, resource_id)` prevents duplicate
  favorites; duplicate saves return a conflict error.

## Community API

- GET /community/posts
- POST /community/posts
- GET /community/posts/:id
- PUT /community/posts/:id
- DELETE /community/posts/:id
- POST /community/posts/:id/comments
- GET /community/posts/:postId/comments
- DELETE /community/comments/:id
- POST /community/posts/:id/reactions
- DELETE /community/posts/:id/reactions

Post contract:

- Public list and detail routes return active, public, non-deleted posts only.
- Create requires an authenticated user and accepts `title`, `content`, and
  optional `visibility` (`public` or `private`).
- Post responses expose `id`, `title`, `content`, `visibility`, `status`,
  `createdAt`, `updatedAt`, and an author summary containing `id`, `fullName`,
  and `avatarUrl`; they do not expose `authorId` or `deletedAt`.
- Authors can update or delete their own posts. Platform admins can update or
  delete any post; only admins can set moderation status to `hidden`.
- Delete is a soft delete that sets `status` to `removed` and records
  `deletedAt`; it returns `{ success: true, message }`.

Comment contract:

- `GET /community/posts/:postId/comments` returns active, non-deleted comments
  in creation order for a visible public post. Each comment includes `id`,
  `postId`, `parentId`, `content`, `status`, timestamps, and an author summary.
- Authenticated users create root comments or replies through
  `POST /community/posts/:postId/comments`. A reply's `parentId` must identify
  an active comment on the same post.
- Authors can delete their own comments. Platform admins can delete any
  comment. Deletion is soft and returns `{ success: true, message }`.
- Comment responses do not expose `authorId` or `deletedAt`.

Reaction contract:

- Authenticated users like a visible public post with
  `POST /community/posts/:id/reactions`; the server stores reaction type
  `like` and returns `{ success: true, message }`.
- The database unique constraint on `(post_id, user_id, type)` prevents
  duplicate likes; duplicates return a conflict error.
- Authenticated users remove only their own like with
  `DELETE /community/posts/:id/reactions`. Removing an absent like is
  idempotent and returns `{ success: true, message }`.

## AI API

- POST /ai/chat
- POST /ai/summary
- POST /ai/quiz-generator
- POST /ai/flashcards
- GET /ai/learning-paths/current
- POST /ai/learning-paths/regenerate
- POST /ai/embeddings/rebuild

Learning-path contract:

- Both learning-path routes require an authenticated student.
- `POST /ai/learning-paths/regenerate` creates a validated, versioned path from
  the learner profile and accessible course/progress/assessment summaries.
- `GET /ai/learning-paths/current` returns the latest learner-owned version or
  `null` when no path exists. Each milestone includes its reason and priority,
  an `available` flag, and a lean course summary only when that course remains
  accessible to the learner.
- Course summaries expose only `id`, `title`, `slug`, `thumbnailUrl`, `level`,
  `progressPercent`, and `enrollmentStatus`. An unavailable or newly private
  recommendation returns `course: null` and never leaks course metadata.

Chat persistence contract:

- `POST /ai/chat` requires authentication and accepts `message`, plus optional
  `conversationId`, `contextType`, `contextId`, and `title`.
- Without `conversationId`, the server creates a conversation owned by the
  authenticated user. With it, the server only appends to a conversation owned
  by that user; another user's conversation resolves as not found.
- The route stores the user message, retrieves only permitted RAG context, calls
  the configured AI model, stores the assistant message with `role=assistant`,
  and returns `{ conversationId, message, sources }`. `message` is the lean
  assistant message projection; each source includes `sourceType`, `sourceId`,
  `title`, `chunkText`, `similarity`, and stored metadata.
- Chat quota is enforced per authenticated user at 30 requests per UTC day;
  Redis is used when configured and a process-local fallback is used for local
  development without Redis.

Summary contract:

- `POST /ai/summary` requires authentication and accepts `{ sourceType,
  sourceId }`, where `sourceType` is `lesson` or `library_resource`.
- The server checks that the authenticated user can access the non-deleted
  source before sending its content to OpenAI. Unauthorized or missing sources
  return not found.
- The response is consistently `{ sourceType, sourceId, title, summary }`.
- Summary generation uses the same 30-requests-per-UTC-day AI quota policy.

Quiz and flashcard generation contract:

- `POST /ai/quiz-generator` and `POST /ai/flashcards` require authentication
  and accept `{ sourceType, sourceId, count? }`; source type is `lesson` or
  `library_resource`, and `count` is limited to `1..20`.
- Both routes enforce source permissions before generation and apply a separate
  30-requests-per-UTC-day quota per user and operation.
- Quiz responses return `{ quizId, sourceType, sourceId, questions }`, where
  each question has a question, exactly four options, a correct answer, and an
  optional explanation. Flashcard responses return `{ sourceType, sourceId,
  flashcards }`, with persisted `{ id, front, back }` cards.
- Provider output is parsed and structurally validated before database writes;
  malformed output returns a provider error without persistence.

AI chat UI consumes `POST /ai/chat` with the authenticated bearer token,
renders the returned assistant message, and displays only returned source
metadata; it does not call OpenAI or access private content directly.

Admin-only:

- POST /ai/embeddings/rebuild

## Certificate API

## Notification API

- GET /notifications
- GET /notifications/unread-count
- GET /notifications/stream
- PATCH /notifications/:id/read
- PATCH /notifications/read-all
- GET /notifications/preferences
- PUT /notifications/preferences

All notification routes require authentication and scope every read or mutation
to the current user. `GET /notifications` accepts `page` and `pageSize` (maximum
`100`) plus optional `unreadOnly=true`, and returns `{ items, page, pageSize,
total, totalPages }` in newest-first order. Items expose only `id`, `type`,
`category`, `title`, `body`, `link`, `isRead`, `readAt`, and `createdAt`; they
never expose recipient IDs, event keys, metadata, or delivery attempts.

`PATCH /notifications/:id/read` is idempotent for a current-user notification;
another user's identifier returns not found. `PATCH /notifications/read-all`
returns the current user's `{ updatedCount }`. Event creation uses a database
unique key on `(userId, eventKey)`, preventing duplicate notifications for the
same recipient and domain event.

`GET /notifications/stream` is an authenticated `text/event-stream` endpoint.
Clients send the bearer access token in the request header and may send
`Last-Event-ID` when reconnecting; when supplied, it must be a UUID v4. Every `notification` event uses the
notification identifier as its event ID and exposes the same lean notification
item contract as `GET /notifications`; it never exposes recipient IDs, event
keys, metadata, or delivery attempts. The server replays up to 100 later events
only when the supplied event ID belongs to the current user. Clients must
de-duplicate by event ID and continue normal polling if the stream is unavailable.

Preferences are per user, channel, and category. The response includes every
supported channel/category combination. Unconfigured in-app delivery defaults
to enabled; unconfigured email delivery defaults to disabled. Email delivery is
not implemented by this task.

- POST /certificates/issue
- GET /me/certificates
- GET /certificates/:id
- GET /certificates/verify/:code
- PATCH /admin/certificates/:id/revoke (platform administrator only)

The authoritative course-completion evaluator issues a certificate automatically
and idempotently when the completion policy passes. A course can have at most one
active certificate per learner; revoked certificates remain traceable by their
existing verification codes. The authenticated learner response includes status
and revocation details. The public verification response includes status and the
revocation timestamp, but never the revocation reason, internal identifiers,
email addresses, or certificate metadata.

Public:

- GET /certificates/verify/:code

## Admin API

- GET /admin/users (platform administrator only)
- GET /admin/users/:userId (platform administrator only)
- PATCH /admin/users/:userId/status (platform administrator only)
- PATCH /admin/users/:userId/roles (platform administrator only)
- GET /admin/courses
- GET /admin/reports/overview (platform administrator only)
- GET /admin/audit-logs (platform administrator only)
- GET /admin/moderation (platform administrator only)
- GET /admin/moderation/:targetType/:targetId (platform administrator only)
- PATCH /admin/moderation/:targetType/:targetId (platform administrator only)
- GET /moderation/:targetType/:targetId/status (owner or platform administrator)

The overview response contains aggregate counts only. Its `data` object has
explicit metrics for users and role assignments, courses, enrollments,
certificates, AI usage, classrooms, community activity, and library usage. It
does not return user, course, content, or credential records. User, course, and
classroom totals exclude soft-deleted records; role metrics count assignments,
so a multi-role user can contribute to more than one role total.

Admin user contract:

- `GET /admin/users` accepts `page`, `pageSize` (maximum `100`), `search`
  (maximum `120` characters), `role`, and `status`. Search matches normalized
  email or full name. Soft-deleted accounts are excluded and results have a
  deterministic order.
- List and detail responses expose only `id`, `email`, `fullName`, `status`,
  `authProvider`, `emailVerified`, `createdAt`, `updatedAt`, and `roles`. They do
  not expose password hashes, refresh tokens, credentials, or authentication
  material.
- `PATCH /admin/users/:userId/status` accepts only `active` or `suspended`.
  `PATCH /admin/users/:userId/roles` replaces the desired role set with a
  non-empty, unique list of supported roles.
- Status and role mutations revoke refresh tokens and write sanitized audit
  records in the same transaction. The authentication guard resolves current
  account status and roles from the database, so an existing access token
  cannot preserve suspended access or removed privileges.
- Mutations that would suspend or remove the role from the last active
  `platform_admin` fail with `409 Conflict`.

Audit log contract:

- `GET /admin/audit-logs` requires the `platform_admin` role. Authenticated
  students and instructors receive `403`; unauthenticated requests receive
  `401`.
- Query parameters are `page`, `pageSize` (maximum `100`), `search`, `action`,
  `targetType`, `occurredAfter`, and `occurredBefore`. Results are ordered by
  newest timestamp and id, and return `{ items, page, pageSize, total,
  totalPages }`.
- Each item contains `id`, `actorId`, `action`, `targetType`, `targetId`,
  `metadataJson`, `occurredAt`, and an actor summary with `id`, `email`, and
  `fullName`.
- Application code exposes audit insert and read operations only. A database
  trigger rejects updates and deletes from `audit_logs`.
- The audit writer recursively removes metadata keys associated with passwords,
  tokens, cookies, authorization values, credentials, session identifiers, API
  keys, and secrets. Callers must still provide the minimum metadata needed to
  explain an event.
- Existing producers record successful local/Firebase login, course/quiz/
  assignment publication, submission grading, certificate issuance, and
  administrator community moderation/removal. Typed actions for user role and
  status changes and certificate revocation are reserved for their owning
  command endpoints.

Content moderation contract:

- Supported targets are `course`, `library_resource`, `community_post`, and
  `community_comment`. Queue reads accept a target type, moderation status,
  bounded search, and pagination; detail reads return only the selected target
  summary and its bounded moderation audit history.
- `PATCH /admin/moderation/:targetType/:targetId` accepts only an action valid
  for that target and a required reason between 3 and 500 characters. Course
  actions are `reject`, `archive`, and `restore`; library actions also include
  `hide`; community actions are `hide`, `reject`, and `restore`.
- Each moderation change and its sanitized `CONTENT_MODERATION_CHANGED` audit
  event are committed atomically. The audit metadata preserves the previous
  status, new status, action, and reason without copying content bodies or
  authentication material.
- Public catalog, lesson preview, library, community, and public AI-source
  queries exclude content whose moderation state is not `clear`. Existing
  owner, administrator, and enrolled-user access remains governed by its
  resource-specific authorization rules.
- The status endpoint returns the current moderation status, reason, and
  moderation timestamp only to the resource owner or a platform administrator.
  Cross-owner requests return `404` so the endpoint does not disclose resource
  existence.

## Pagination

Paginated endpoints cap `limit` or `pageSize` at `100`. Legacy endpoints that
return a bare array instead of a page are also capped at 100 records at the
Prisma query boundary. This applies to the public course catalog, community
posts/comments, course lesson/assignment/quiz/classroom collections, learner
enrollments and attempts, profile skills/portfolio, library taxonomy/favorites,
certificates, and eligible scholarships. Internal workflows that require a
complete data set (for example completion evaluation or embedding rebuild) do
not reuse this presentation cap.

Query:

```text
?page=1&limit=20
```

Response:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Security Requirements

Every protected endpoint must check:

1. Authentication
2. Role permission
3. Resource ownership
4. Input validation
