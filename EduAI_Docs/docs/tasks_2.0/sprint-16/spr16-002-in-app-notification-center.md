# SPR16-002 — In-App Notification Center

## Sprint

Sprint 16

## Category

Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Build a shared notification bell and notification center for student, instructor, and admin layouts.

## Deliverables

- Unread badge
- Paginated notification list
- Read/unread actions
- Deep links to supported destinations

## Acceptance Criteria

- [ ] All data comes from notification APIs
- [ ] Missing destinations fail safely
- [ ] Keyboard and mobile interaction work
- [ ] Optimistic updates reconcile on failure
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR16-002 — In-App Notification Center

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
Build a shared notification bell and notification center for student, instructor, and admin layouts.

Deliverables:
- Unread badge
- Paginated notification list
- Read/unread actions
- Deep links to supported destinations

Acceptance criteria:
- All data comes from notification APIs
- Missing destinations fail safely
- Keyboard and mobile interaction work
- Optimistic updates reconcile on failure

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
