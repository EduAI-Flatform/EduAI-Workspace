# SPR14-001 — Create Admin Domain and Dashboard API

## Sprint

Sprint 14

## Category

Backend / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Create the platform administration backend foundation and aggregate dashboard endpoints for platform administrators.

## Deliverables

- Admin module and controller
- Platform metrics for users, roles, courses, enrollments, certificates, AI usage, classrooms, community, and library
- Pagination/filter DTO conventions reused from current code
- Swagger and tests

## Acceptance Criteria

- [ ] Only platform_admin can access admin endpoints
- [ ] Metrics are calculated from database data
- [ ] Queries are bounded and indexed where necessary
- [ ] Tests cover forbidden access
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR14-001 — Create Admin Domain and Dashboard API

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
Create the platform administration backend foundation and aggregate dashboard endpoints for platform administrators.

Deliverables:
- Admin module and controller
- Platform metrics for users, roles, courses, enrollments, certificates, AI usage, classrooms, community, and library
- Pagination/filter DTO conventions reused from current code
- Swagger and tests

Acceptance criteria:
- Only platform_admin can access admin endpoints
- Metrics are calculated from database data
- Queries are bounded and indexed where necessary
- Tests cover forbidden access

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
