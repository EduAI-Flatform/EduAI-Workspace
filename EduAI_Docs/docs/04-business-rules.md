# 04-business-rules.md

# Business Rules

## Scope Rules

EduAI MVP is Single Tenant.

Do not implement:

- organization_id
- tenant_id
- organization admin
- school-level isolation
- tenant-specific branding
- tenant-specific certificate ownership

## Authentication Rules

BR-AUTH-001: Email must be unique.

BR-AUTH-002: New users are Student by default.

BR-AUTH-003: Passwords must be hashed.

BR-AUTH-004: Users may have multiple roles if manually assigned by admin.

## Profile Rules

BR-PROFILE-001: Each user has one profile.

BR-PROFILE-002: Users may edit only their own profile.

BR-PROFILE-003: Admin may view all profiles.

## Course Rules

BR-COURSE-001: Only Instructor or Admin can create courses.

BR-COURSE-002: A course must have at least one lesson before publication.

BR-COURSE-003: Course statuses are draft, published, archived.

BR-COURSE-004: Students can only enroll in published courses.

BR-COURSE-005: Instructors can only manage their own courses unless they are Admin.

## Lesson Rules

BR-LESSON-001: Every lesson belongs to exactly one course.

BR-LESSON-002: Supported MVP lesson types are video, pdf, article.

BR-LESSON-003: Lessons must have order_index inside a course.

## Enrollment Rules

BR-ENROLL-001: A student can enroll in a course only once.

BR-ENROLL-002: Enrollment creates learning progress records.

BR-ENROLL-003: Course completion requires required lessons and assessments to be completed.

## Quiz Rules

BR-QUIZ-001: Quiz attempts must be stored.

BR-QUIZ-002: Objective quizzes are auto-graded.

BR-QUIZ-003: Instructors may review or override scores if needed.

## Assignment Rules

BR-ASSIGN-001: Assignments may have due dates.

BR-ASSIGN-002: Late submissions are allowed but flagged.

BR-ASSIGN-003: Assignment grading is manual in MVP.

## Live Classroom Rules

BR-CLASS-001: Only instructors can create sessions.

BR-CLASS-002: Only enrolled students can join course classroom sessions.

BR-CLASS-003: Attendance must be recorded server-side.

BR-CLASS-004: Jitsi is used for MVP. Do not build custom WebRTC.

## Library Rules

BR-LIB-001: Library resources must have type and category.

BR-LIB-002: File uploads must be validated.

BR-LIB-003: AI can use eligible library resources for RAG.

## Community Rules

BR-COM-001: Authenticated users can create posts.

BR-COM-002: Users can edit only their own posts.

BR-COM-003: Admin can hide or remove any content.

## AI Rules

BR-AI-001: AI responses are advisory.

BR-AI-002: AI must respect user permissions.

BR-AI-003: RAG must not leak private content.

BR-AI-004: AI usage must be rate-limited.

## Certificate Rules

BR-CERT-001: Certificates are issued after course completion.

BR-CERT-002: Certificate code must be unique.

BR-CERT-003: Certificates are immutable after issuance.

BR-CERT-004: Public verification must not expose sensitive data.

## Phase Rules

Phase 1 includes:

- Auth
- RBAC
- Profile
- Courses
- Lessons
- Enrollment
- Progress
- Quiz
- Assignment
- Live Classroom
- Library
- Community
- AI
- Certificates

Phase 2 includes:

- Career Hub
- Mentor System
- AI Learning Path

Phase 3 includes:

- Marketplace
- Payment
- Affiliate
