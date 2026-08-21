# 05-feature-specification.md

# Feature Specification

## MVP Scope

EduAI MVP includes:

1. Digital Identity
2. Digital Learning
3. Live Classroom
4. Digital Library
5. Learning Community
6. AI Assistant
7. Digital Certificate

The MVP excludes mobile app, marketplace, payment, affiliate, career hub, mentor system, and multi-tenant SaaS.

---

# Module 1: Digital Identity

## Purpose

Digital Identity is the user's learning profile.

## MVP Features

- Profile information
- Avatar
- Bio
- Skills
- Portfolio
- Learning history
- Certificate list

## Acceptance Criteria

- User can view own profile.
- User can edit own profile.
- User can add and remove skills.
- User can create portfolio entries.
- Profile works on desktop and mobile browser.

## Database Impact

- users
- user_profiles
- user_skills
- portfolios

## API Impact

- GET /profile/me
- PUT /profile/me
- POST /profile/avatar
- POST /profile/skills
- DELETE /profile/skills/:id
- POST /profile/portfolio
- PUT /profile/portfolio/:id
- DELETE /profile/portfolio/:id

---

# Module 2: Digital Learning

## Purpose

Digital Learning is the core LMS module.

## MVP Features

### Courses

- Create course
- Edit course
- Publish course
- Archive course
- Browse published courses

### Lessons

- Video lesson
- PDF lesson
- Article lesson
- Lesson ordering
- Preview lesson

### Enrollment

- Enroll course
- View my courses
- Continue learning

### Progress

- Mark lesson complete
- Track course completion percentage
- Store last accessed lesson

## Phase 2 Preparation

Schema may later support:

- Learning Path
- Course prerequisites
- AI recommendations

Do not implement these in Phase 1.

## Acceptance Criteria

- Instructor can create and publish course.
- Student can enroll once.
- Student can complete lessons.
- Course progress updates correctly.

## Database Impact

- courses
- lessons
- enrollments
- learning_progress

## API Impact

- GET /courses
- GET /courses/:id
- POST /courses
- PUT /courses/:id
- POST /courses/:id/publish
- POST /courses/:id/enroll
- GET /me/enrollments
- POST /lessons/:id/complete

---

# Module 3: Assessment

## MVP Features

### Quiz

- Quiz CRUD
- Question CRUD
- Multiple choice
- True/false
- Short answer
- Auto grading for objective questions

### Assignment

- Assignment CRUD
- Text submission
- File submission
- Manual grading
- Feedback

## Acceptance Criteria

- Instructor can create quizzes and assignments.
- Student can submit quiz attempt.
- Score is calculated.
- Instructor can grade assignment.

## Database Impact

- quizzes
- questions
- quiz_attempts
- assignments
- submissions

---

# Module 4: Live Classroom

## Purpose

Provide live teaching inside EduAI.

MVP uses Jitsi integration.

Do not build custom WebRTC.

## MVP Features

- Schedule live session
- Start live session
- Join live session
- Attendance tracking
- Recording link storage

## Phase 2 Preparation

Possible future:

- Announcements
- Session chat logs
- Polling
- Whiteboard
- Breakout rooms

## Acceptance Criteria

- Instructor can create classroom session.
- Student can join if enrolled.
- Attendance is recorded.
- Recording URL can be linked.

## Database Impact

- classroom_sessions
- classroom_attendance
- classroom_recordings

---

# Module 5: Digital Library

## Purpose

Centralized learning resource library.

## MVP Features

- Upload resource
- External link resource
- Categories
- Tags
- Search
- Favorites

## Resource Types

- pdf
- docx
- pptx
- video
- image
- external_link

## Acceptance Criteria

- Instructor/Admin can upload resources.
- Users can search resources.
- Users can save favorites.

## Database Impact

- library_resources
- library_categories
- library_tags
- resource_tags
- saved_resources

---

# Module 6: Learning Community

## Purpose

Academic community for learning discussions.

## MVP Features

- Posts
- Comments
- Reactions
- Feed

## Phase 2 Preparation

- Groups
- Events
- Livestream

Do not implement in Phase 1.

## Acceptance Criteria

- User can create post.
- User can comment.
- User can like post.
- Admin can remove inappropriate content.

## Database Impact

- community_posts
- community_comments
- community_reactions

---

# Module 7: AI Assistant

## Purpose

AI Assistant is the key differentiator of EduAI.

## MVP Features

- AI Tutor
- AI Summary
- AI Quiz Generator
- AI Flashcard Generator
- RAG over course and library content

## AI Tutor

Answers questions based on:

- Course content
- Lesson content
- Library resources
- Allowed retrieval context

## AI Summary

Summarizes:

- PDF
- Article lesson
- Library resource

## AI Quiz Generator

Generates quiz questions from:

- Lesson
- PDF
- Library resource

## AI Flashcards

Generates front/back flashcards from learning content.

## Phase 2 Preparation

- AI Study Plan
- AI Learning Path
- AI Progress Insights
- AI Career Coach

Do not implement in Phase 1.

## Acceptance Criteria

- AI chat works.
- RAG sources are returned.
- AI summaries are generated.
- AI quiz generation works.
- AI usage is rate-limited.

## Database Impact

- ai_conversations
- ai_messages
- ai_embeddings
- ai_generated_quizzes
- ai_flashcards

---

# Module 8: Digital Certificate

## Purpose

Verify learning achievements.

## MVP Features

- Certificate template
- Issue certificate
- QR verification
- Public verification page

## Rules

Certificates are immutable after issuance.

## Acceptance Criteria

- Certificate can be issued after completion.
- QR code is generated.
- Public verification works.
- Sensitive user data is not exposed.

## Database Impact

- certificate_templates
- certificates

---

# Phase 2 Modules

## Career Hub

Planned after MVP.

Features:

- Job listings
- Job applications
- Company profiles
- Public portfolio

## Mentor System

Planned after MVP.

Features:

- Mentor profile
- Mentor booking
- Mentor sessions

---

# Phase 3 Modules

## Marketplace

- Paid courses
- Paid resources
- Orders

## Payment

- VNPay
- MoMo
- ZaloPay

## Affiliate

- Referral links
- Commission tracking
- Withdrawal requests
