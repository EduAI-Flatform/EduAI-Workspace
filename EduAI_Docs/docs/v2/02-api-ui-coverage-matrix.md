# SPR13-001 API and UI coverage matrix

Recorded: 2026-08-10

> Historical snapshot: the email/password authentication architecture changed
> on 2026-08-11. See `../08-api-design.md` for the current contract. In
> particular, normal login now uses only `POST /auth/login`, registration is
> completed through verified Firebase token exchange, and `POST /auth/register`
> is no longer exposed.

## Audit method

The matrix was built from the checked-out Frontend `main` route tree,
dashboard navigation components, all non-test `src/services/*.service.ts`
files, the Backend `app.module.ts`, and every registered `*.controller.ts`.
Paths below omit the common `/api/v1` prefix. “Matched” means an exact HTTP
method/path exists in a controller; it does not claim every user journey has
passed browser E2E.

## Application route coverage

| Frontend route | Access | Component/behavior | Live data | Status |
| --- | --- | --- | --- | --- |
| `/` | Public | `HomePage` | `GET /courses` | Complete; production 200/API 200 |
| `/courses` | Public | `CoursesPage` | `GET /courses` | Complete; production 200/API 200 |
| `/courses/:courseId` | Public with authenticated actions | `CourseDetailPage` | course, lessons, assignments, enrollment APIs | Complete |
| `/library` | Authenticated | `LibraryPage` | library taxonomy/resource/favorite APIs | Complete |
| `/community` | Public read; authenticated writes | `CommunityPage` | community post/comment/reaction APIs | Complete; production 200/API 200 |
| `/verify` | Public | `CertificateVerificationPage` | certificate verification after code input | Complete; production 200 |
| `/verify/:code` | Public | `CertificateVerificationPage` | `GET /certificates/verify/:code` | Complete |
| `/certificates/verify/:code` | Public | `CertificateVerificationPage` | `GET /certificates/verify/:code` | Complete |
| `/ai` | Authenticated | `AiChatPage` | `POST /ai/chat` | Complete |
| `/ai/tools` | Authenticated | `AiToolsPage` | AI source/summary/quiz/flashcard APIs | Complete |
| `/certificates` | Authenticated | Redirect to `/dashboard/certificates` | None | Complete |
| `/login` | Public | `LoginPage` | Firebase Auth plus Backend auth exchange/fallback | Complete |
| `/register` | Public | `RegisterPage` | Firebase Auth plus Backend auth exchange | Complete |
| `/check-email` | Public | `CheckEmailPage` | Firebase verification workflow | Complete |
| `/learning/:courseId` | Authenticated | `LearningPage` | course/lesson/progress/quiz/assignment/AI APIs | Complete |
| `/quizzes/:quizId/take` | Authenticated | `QuizAttemptPage` | quiz take/attempt/history APIs | Complete |
| `/assignments/:assignmentId/submit` | Authenticated | `AssignmentSubmissionPage` | assignment/submission APIs | Complete |
| `/classroom-sessions/:sessionId` | Authenticated | `ClassroomJoinPage` | classroom join/start/attendance APIs | Complete |
| `/dashboard/*` | Authenticated | `StudentDashboard` | student dashboard and feature services | Complete for declared student branches |
| `/instructor/dashboard/*` | Authenticated plus component instructor check | `InstructorDashboard` | instructor dashboard and management services | Partial: some destinations fall back |
| `/admin/dashboard/*` | Authenticated only | `StudentDashboard` | student services | Incorrect: dedicated admin page/role boundary absent |
| `/profile` | Authenticated | Redirect to `/dashboard/profile` | None | Complete |

There is no wildcard/not-found route. Any unmatched link renders an empty main
area beneath the application chrome.

## Visible navigation coverage

### Student sidebar

| Target | Result |
| --- | --- |
| `/` | Home page |
| `/dashboard` | Student dashboard home |
| `/dashboard/learning` | Live enrollment list |
| `/dashboard/classrooms` | Live classroom dashboard |
| `/dashboard/library` | Live library |
| `/dashboard/community` | Live community |
| `/dashboard/certificates` | Live certificate list |
| `/dashboard/ai` | Live AI chat |
| `/dashboard/ai/tools` | Live AI tools |
| `/dashboard/profile` | Live profile/dashboard data |
| `/pricing` | Incomplete: no route |

### Instructor sidebar

| Target | Result |
| --- | --- |
| `/` | Home page |
| `/instructor/dashboard` | Live instructor dashboard |
| `/instructor/dashboard/courses` | Live course management |
| `/instructor/dashboard/students` | Incomplete: silently renders dashboard home |
| `/instructor/dashboard/classrooms` | Live classroom management |
| `/instructor/dashboard/assignments` | Partial: renders course management, not an assignment overview |
| `/instructor/dashboard/library` | Live library |
| `/instructor/dashboard/ai` | Partial: renders AI tools, not AI chat |
| `/instructor/dashboard/certificates` | Incomplete: silently renders dashboard home |
| `/instructor/dashboard/settings` | Incomplete: silently renders dashboard home |

Nested instructor course routes for lessons, quizzes, and assignments resolve
to their corresponding live management pages.

### Global and auth links

| Target(s) | Result |
| --- | --- |
| `/`, `/courses`, `/community`, `/ai`, `/login`, `/register` | Working routes |
| Role-derived `/dashboard`, `/instructor/dashboard`, `/admin/dashboard` | Student/instructor work; admin is misrouted |
| `/pricing` | Incomplete: header and footer link to an absent route |
| `/terms`, `/privacy` | Incomplete: footer and registration/auth legal links are absent |
| `/about`, `/contact`, `/language`, `/global`, `/support` | Incomplete: visible link targets are absent |
| Newsletter submit | Static form; no service or submit handler |

## Frontend service to Backend endpoint matrix

### Authentication and profile

| Frontend operation | HTTP endpoint | Backend authorization | Match |
| --- | --- | --- | --- |
| `authService.login` | `POST /auth/login` | Public; validated credentials | Matched |
| Email verification / Google exchange call sites | `POST /auth/firebase` | Public; verified Firebase ID token | Matched |
| `authService.logout` | `POST /auth/logout` | Refresh-token command | Matched |
| `authService.register` | `POST /auth/register` | Public; cannot self-assign platform admin | Matched |
| `authService.me` | `GET /auth/me` | JWT | Matched |
| `profileService.getCurrentProfile` | `GET /profile/me` | JWT; current user | Matched |
| `profileService.updateCurrentProfile` | `PUT /profile/me` | JWT; current user | Matched |
| `profileService.uploadAvatar` | `POST /profile/avatar` | JWT; current user and upload validation | Matched |
| `profileService.listSkills` | `GET /profile/skills` | JWT; current user | Matched |
| `profileService.addSkill` | `POST /profile/skills` | JWT; current user | Matched |
| `profileService.deleteSkill` | `DELETE /profile/skills/:id` | JWT; owner | Matched |
| `profileService.listPortfolio` | `GET /profile/portfolio` | JWT; current user | Matched |
| `profileService.createPortfolio` | `POST /profile/portfolio` | JWT; current user | Matched |
| `profileService.updatePortfolio` | `PUT /profile/portfolio/:id` | JWT; owner | Matched |
| `profileService.deletePortfolio` | `DELETE /profile/portfolio/:id` | JWT; owner | Matched |

Firebase SDK email/password, verification-email, and Google popup/redirect
operations are external identity-provider calls, not missing Backend REST
routes. Successful Firebase authentication is exchanged through
`POST /auth/firebase`.

### Courses, lessons, enrollment, progress, and dashboards

| Frontend operation | HTTP endpoint | Backend authorization | Match |
| --- | --- | --- | --- |
| `courseService.listPublishedCourses` | `GET /courses` | Public; published scope | Matched |
| `courseService.listInstructorCourses` | `GET /instructor/courses` | JWT; instructor; owner-scoped | Matched |
| `courseService.createCourse` | `POST /courses` | JWT; instructor/platform admin | Matched |
| `courseService.updateCourse` | `PUT /courses/:id` | JWT; instructor/platform admin; ownership in service | Matched |
| `courseService.publishCourse` | `POST /courses/:id/publish` | JWT; instructor/platform admin; ownership in service | Matched |
| `courseService.archiveCourse` | `POST /courses/:id/archive` | JWT; instructor/platform admin; ownership in service | Matched |
| `courseService.getCourse` | `GET /courses/:id` | Optional JWT; published/authorized scope | Matched |
| `courseService.getLesson` | `GET /lessons/:id` | Optional JWT; content scope enforced in service | Matched |
| `courseService.listCourseLessons` | `GET /courses/:courseId/lessons` | Public metadata scope | Matched |
| `courseService.listInstructorLessons` | `GET /instructor/courses/:courseId/lessons` | JWT; instructor/platform admin; ownership | Matched |
| `courseService.createLesson` | `POST /courses/:courseId/lessons` | JWT; instructor/platform admin; ownership | Matched |
| `courseService.updateLesson` | `PUT /lessons/:id` | JWT; instructor/platform admin; ownership | Matched |
| `courseService.deleteLesson` | `DELETE /lessons/:id` | JWT; instructor/platform admin; ownership | Matched |
| `enrollmentService.enrollCourse` | `POST /courses/:id/enroll` | JWT; student | Matched |
| `enrollmentService.listMyEnrollments` | `GET /me/enrollments` | JWT; student; current user | Matched |
| `learningService.getLearningPath` | `GET /courses/:id/learning-path` | JWT; student; enrollment | Matched |
| `learningService.updateLessonProgress` | `PATCH /lessons/:id/progress` | JWT; student; enrollment | Matched |
| `learningService.getLessonProgress` | `GET /lessons/:id/progress` | JWT; student; enrollment | Matched |
| `learningService.getCourseProgress` | `GET /courses/:id/progress` | JWT; student; enrollment | Matched |
| `dashboardService.getStudentDashboard` | `GET /me/dashboard` | JWT; student | Matched |
| `dashboardService.getInstructorDashboard` | `GET /instructor/dashboard` | JWT; instructor/platform admin | Matched |

### Quizzes and assignments

| Frontend operation | HTTP endpoint | Backend authorization | Match |
| --- | --- | --- | --- |
| `quizService.listCourseQuizzes` | `GET /courses/:courseId/quizzes` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.listAvailableCourseQuizzes` and `listStudentCourseQuizzes` | `GET /courses/:courseId/quizzes/available` | JWT; student; enrollment | Matched |
| `quizService.createQuiz` | `POST /courses/:courseId/quizzes` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.publishQuiz` | `POST /quizzes/:id/publish` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.deleteQuiz` | `DELETE /quizzes/:id` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.listQuestions` | `GET /quizzes/:id/questions` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.createQuestion` | `POST /quizzes/:id/questions` | JWT; instructor/platform admin; ownership | Matched |
| `quizService.getStudentQuiz` | `GET /quizzes/:id/take` | JWT; student; enrollment; answer keys excluded | Matched |
| `quizService.listMyAttempts` | `GET /quizzes/:id/attempts/me` | JWT; student; current user | Matched |
| `quizService.submitAttempt` | `POST /quizzes/:id/attempts` | JWT; student; enrollment | Matched |
| `assignmentService.listCourseAssignments` | `GET /courses/:courseId/assignments` | JWT; student or manager; role/ownership scope | Matched |
| `assignmentService.getAssignment` | `GET /assignments/:id` | JWT; student or manager; role/ownership scope | Matched |
| `assignmentService.createAssignment` | `POST /courses/:courseId/assignments` | JWT; instructor/platform admin; ownership | Matched |
| `assignmentService.publishAssignment` | `POST /assignments/:id/publish` | JWT; instructor/platform admin; ownership | Matched |
| `assignmentService.deleteAssignment` | `DELETE /assignments/:id` | JWT; instructor/platform admin; ownership | Matched |
| `assignmentService.submitAssignment` (JSON and multipart branches) | `POST /assignments/:id/submissions` | JWT; student; enrollment | Matched |
| `assignmentService.getMySubmission` | `GET /assignments/:id/submissions/me` | JWT; student; current user | Matched |
| `assignmentService.listSubmissions` | `GET /assignments/:id/submissions` | JWT; instructor/platform admin; ownership | Matched |
| `assignmentService.gradeSubmission` | `POST /submissions/:id/grade` | JWT; instructor/platform admin; ownership | Matched |

### Classroom, library, and community

| Frontend operation | HTTP endpoint | Backend authorization | Match |
| --- | --- | --- | --- |
| `classroomService.getSession` | `GET /classroom-sessions/:id` | JWT; student or manager; enrollment/ownership | Matched |
| `classroomService.listSessions` | `GET /courses/:courseId/classroom-sessions` | JWT; student or manager; enrollment/ownership | Matched |
| `classroomService.createSession` | `POST /courses/:courseId/classroom-sessions` | JWT; instructor/platform admin; ownership | Matched |
| `classroomService.startSession` | `POST /classroom-sessions/:id/start` | JWT; owning instructor | Matched |
| `classroomService.joinSession` | `POST /classroom-sessions/:id/join` | JWT; enrolled student | Matched |
| `classroomService.recordAttendance` | `POST /classroom-sessions/:id/attendance` | JWT; enrolled student; server timestamps | Matched |
| `classroomService.recordAttendanceKeepalive` direct `fetch` | `POST /classroom-sessions/:id/attendance` | Same JWT/student boundary; keepalive transport | Matched |
| `libraryService.listCategories` | `GET /library/categories` | Public | Matched |
| `libraryService.listTags` | `GET /library/tags` | Public | Matched |
| `libraryService.listResources` | `GET /library/resources` | JWT; visibility/owner scope | Matched |
| `libraryService.listFavorites` | `GET /library/resources/favorites` | JWT; current user | Matched |
| `libraryService.favoriteResource` | `POST /library/resources/:id/favorite` | JWT; current user and visible resource | Matched |
| `libraryService.unfavoriteResource` | `DELETE /library/resources/:id/favorite` | JWT; current user | Matched |
| `libraryService.uploadResource` | `POST /library/resources` | JWT; instructor/platform admin; upload validation | Matched |
| `communityService.listPosts` | `GET /community/posts` | Optional JWT; public visibility | Matched |
| `communityService.createPost` | `POST /community/posts` | JWT | Matched |
| `communityService.updatePost` | `PUT /community/posts/:id` | JWT; author/platform admin | Matched |
| `communityService.deletePost` | `DELETE /community/posts/:id` | JWT; author/platform admin | Matched |
| `communityService.listComments` | `GET /community/posts/:id/comments` | Public visible-post scope | Matched |
| `communityService.createComment` | `POST /community/posts/:id/comments` | JWT | Matched |
| `communityService.deleteComment` | `DELETE /community/comments/:id` | JWT; author/platform admin | Matched |
| `communityService.likePost` | `POST /community/posts/:id/reactions` | JWT; current user | Matched |
| `communityService.unlikePost` | `DELETE /community/posts/:id/reactions` | JWT; current user | Matched |

### AI and certificates

| Frontend operation | HTTP endpoint | Backend authorization | Match |
| --- | --- | --- | --- |
| `aiService.sendChat` | `POST /ai/chat` | JWT; conversation/source ownership and quota | Matched |
| `aiToolsService.listSources` | `GET /ai/sources` | JWT; authorized sources only | Matched |
| `aiToolsService.summarize` | `POST /ai/summary` | JWT; source authorization and quota | Matched |
| `aiToolsService.generateQuiz` | `POST /ai/quiz-generator` | JWT; source authorization, bounds, quota | Matched |
| `aiToolsService.generateFlashcards` | `POST /ai/flashcards` | JWT; source authorization, bounds, quota | Matched |
| `certificateService.listMyCertificates` | `GET /me/certificates` | JWT; current user | Matched |
| `certificateService.verifyCertificate` | `GET /certificates/verify/:code` | Public; private identity fields excluded | Matched |

## Conclusions

- No frontend REST service definition points to an absent Backend controller
  method/path.
- The live-API gap is navigation composition, not missing endpoints for the
  screens already implemented.
- Home, course pages, student dashboard, and instructor dashboard are confirmed
  live integrations and must not be rebuilt in `SPR13-002`.
- `SPR13-002` should make every visible destination explicit, enforce role
  boundaries at the route level, and avoid visual redesign or unrelated API
  changes.
