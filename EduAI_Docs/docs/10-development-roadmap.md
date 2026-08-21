# 10-development-roadmap.md

# EduAI Development Roadmap

## Version

MVP 1.0

## Duration

50 days.

## Strategy

Backend-first.

Backend must stay 1 sprint ahead of frontend when possible.

## Phase 1: MVP

Day 1-50.

Includes:

- Backend
- Frontend web app
- Desktop browser
- Mobile browser
- Deployment

Excludes:

- Mobile app
- Multi-tenant SaaS
- Marketplace
- Payment
- Affiliate
- Career Hub
- Mentor System

## Phase 2

Day 51-80.

Includes:

- Career Hub
- Mentor System
- AI Learning Path

## Phase 3

Day 81-100/120.

Includes:

- Marketplace
- Payment
- Affiliate
- Advanced Analytics

---

# Sprint 1: Day 1-5

## Goal

Foundation.

## Backend

- Setup NestJS
- Setup Prisma
- Setup PostgreSQL
- Setup Redis
- Setup Config Module
- Setup logger
- Setup error handling

## Frontend

- Setup React or Next.js
- Setup TypeScript
- Setup TailwindCSS
- Setup Shadcn UI
- Create frontend folder structure

## DevOps

- Setup GitHub Actions
- Setup Vercel deployment
- Setup Render deployment

## Definition of Done

- Frontend runs locally.
- Backend runs locally.
- Database connects.
- CI passes.
- Staging deploy works.

---

# Sprint 2: Day 6-10

## Goal

Authentication and RBAC.

## Database

- users
- roles
- user_roles
- refresh_tokens

## Backend

- Register
- Login
- Refresh token
- Logout
- RBAC guards
- Role decorators
- Swagger docs

## Frontend

- Login page
- Register page
- Protected routes

## Definition of Done

- Login works.
- JWT works.
- RBAC works.
- Frontend auth flow works.

---

# Sprint 3: Day 11-15

## Goal

Digital Identity.

## Database

- user_profiles
- user_skills
- portfolios

## Backend

- Profile APIs
- Skills APIs
- Portfolio APIs
- Avatar upload

## Frontend

- Profile page
- Skills management
- Portfolio management

## Definition of Done

- User can fully manage profile.

---

# Sprint 4: Day 16-21

## Goal

Course and Lesson Management.

## Database

- courses
- lessons

## Backend

- Course CRUD
- Publish course
- Archive course
- Lesson CRUD

## Frontend

- Course list
- Course detail
- Instructor course management
- Lesson management

## Definition of Done

- Instructor can create and publish a course.
- Student can view published courses.

---

# Sprint 5: Day 22-26

## Goal

Enrollment and Learning Progress.

## Database

- enrollments
- learning_progress

## Backend

- Enrollment APIs
- Progress APIs
- Completion logic

## Frontend

- My courses
- Continue learning
- Progress tracking

## Definition of Done

- Student can enroll and complete lessons.

---

# Sprint 6: Day 27-31

## Goal

Assessment.

## Database

- quizzes
- questions
- quiz_attempts
- assignments
- submissions

## Backend

- Quiz engine
- Assignment engine
- Grading engine

## Frontend

- Quiz UI
- Assignment UI
- Submission UI
- Grade view

## Definition of Done

- Student can submit quiz.
- Instructor can grade assignment.

---

# Sprint 7: Day 32-35

## Goal

Live Classroom.

## Database

- classroom_sessions
- classroom_attendance
- classroom_recordings

## Backend

- Session APIs
- Attendance APIs
- Recording APIs

## Integration

- Jitsi

## Frontend

- Classroom dashboard
- Join session page
- Attendance view

## Definition of Done

- Instructor can host session.
- Student can join.
- Attendance is recorded.

---

# Sprint 8: Day 36-39

## Goal

Digital Library.

## Database

- library_resources
- library_categories
- library_tags
- resource_tags
- saved_resources

## Backend

- Upload
- Search
- Favorites
- Categories

## Frontend

- Library page
- Search
- Filters
- Favorites

## Definition of Done

- Library resources are manageable and searchable.

---

# Sprint 9: Day 40-42

## Goal

Community.

## Database

- community_posts
- community_comments
- community_reactions

## Backend

- Posts
- Comments
- Reactions

## Frontend

- Feed
- Composer
- Comments

## Definition of Done

- Users can create posts and comments.

---

# Sprint 10: Day 43-46

## Goal

AI Assistant.

## Database

- ai_conversations
- ai_messages
- ai_embeddings
- ai_generated_quizzes
- ai_flashcards

## Backend

- AI Tutor
- AI Summary
- AI Quiz Generator
- AI Flashcards
- RAG retrieval

## Frontend

- AI Chat
- Summary UI
- Quiz Generator UI
- Flashcard UI

## Definition of Done

- AI Tutor works.
- RAG sources work.
- AI tools are rate-limited.

---

# Sprint 11: Day 47-48

## Goal

Certificates.

## Database

- certificate_templates
- certificates

## Backend

- Issue certificate
- Verify certificate
- QR generation

## Frontend

- Certificate page
- Verification page

## Definition of Done

- Certificate verification works publicly.

---

# Sprint 12: Day 49-50

## Goal

Production Hardening.

## Backend

- Caching
- Performance
- Security review
- Audit logging

## Frontend

- Responsive audit
- Accessibility audit
- UI polish

## QA

- Regression testing
- UAT
- Bug fixing

## Definition of Done

- Production release candidate approved.

---

# Critical Path

- Auth
- Profile
- Course
- Lesson
- Enrollment
- AI
- Certificate

# Phase 2 Entry Criteria

Phase 2 starts only when:

- MVP deployed
- Critical bugs = 0
- AI stable
- Certificate verification stable
- UAT completed

# Codex Rules

- Do not start future phase features during Phase 1.
- Backend first.
- Update docs before changing architecture.
- Update Swagger when API changes.
- Every endpoint must have validation and authorization.
