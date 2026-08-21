# SPR18-003 — Job Applications

## Sprint

Sprint 18

## Category

Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Allow learners to save jobs, apply once, and track application status.

## Deliverables

- Saved job and application schemas
- Apply/withdraw APIs
- Student application dashboard
- Admin status management

## Acceptance Criteria

- [ ] Duplicate active applications are prevented
- [ ] Status history is preserved
- [ ] Application data is private
- [ ] Deadline and job status are enforced server-side
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR18-003 — Job Applications

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
Allow learners to save jobs, apply once, and track application status.

Deliverables:
- Saved job and application schemas
- Apply/withdraw APIs
- Student application dashboard
- Admin status management

Acceptance criteria:
- Duplicate active applications are prevented
- Status history is preserved
- Application data is private
- Deadline and job status are enforced server-side

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
