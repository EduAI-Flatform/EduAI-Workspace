# SPR14-002 — Build Dedicated Admin Dashboard

## Sprint

Sprint 14

## Category

Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Replace the current admin route reuse of StudentDashboard with a dedicated platform administrator dashboard.

## Deliverables

- Admin layout and sidebar
- Overview cards and operational queues backed by admin APIs
- Responsive loading, empty, error, and retry states
- Role-protected routes

## Acceptance Criteria

- [ ] The /admin/dashboard route no longer renders StudentDashboard
- [ ] Non-admin users are redirected safely
- [ ] No static business metrics
- [ ] Mobile and desktop layouts work
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR14-002 — Build Dedicated Admin Dashboard

Before implementation:
1. Inspect the current main branches in both repositories.
2. Reuse current services, DTO patterns, guards, components, tests, and coding conventions.
3. Do not rebuild screens that already use live APIs.
4. Treat the current source code as the source of truth when it differs from old planning docs.

Required context:
- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Replace the current admin route reuse of StudentDashboard with a dedicated platform administrator dashboard.

Deliverables:
- Admin layout and sidebar
- Overview cards and operational queues backed by admin APIs
- Responsive loading, empty, error, and retry states
- Role-protected routes

Acceptance criteria:
- The /admin/dashboard route no longer renders StudentDashboard
- Non-admin users are redirected safely
- No static business metrics
- Mobile and desktop layouts work

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
