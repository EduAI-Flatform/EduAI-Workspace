# SPR17-003 — Learning Path Dashboard

## Sprint

Sprint 17

## Category

Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Build a visual roadmap where learners can follow, complete, and review AI-recommended milestones.

## Deliverables

- Roadmap timeline
- Milestone status and progress
- Links to courses, lessons, quizzes, and resources
- Regenerate and edit-goal actions

## Acceptance Criteria

- [ ] State is persisted through APIs
- [ ] Unavailable recommendations are clearly marked
- [ ] Responsive and accessible UI
- [ ] Loading/error/empty states included
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR17-003 — Learning Path Dashboard

Before implementation:
1. Inspect the current main branches in both repositories.
2. Reuse current services, DTO patterns, guards, components, tests, and coding conventions.
3. Do not rebuild screens that already use live APIs.
4. Treat the current source code as the source of truth when it differs from old planning docs.

Required context:
- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

Objective:
Build a visual roadmap where learners can follow, complete, and review AI-recommended milestones.

Deliverables:
- Roadmap timeline
- Milestone status and progress
- Links to courses, lessons, quizzes, and resources
- Regenerate and edit-goal actions

Acceptance criteria:
- State is persisted through APIs
- Unavailable recommendations are clearly marked
- Responsive and accessible UI
- Loading/error/empty states included

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
