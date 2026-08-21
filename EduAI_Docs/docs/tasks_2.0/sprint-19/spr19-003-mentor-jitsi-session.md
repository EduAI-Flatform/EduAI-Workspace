# SPR19-003 — Mentor Jitsi Session

## Sprint

Sprint 19

## Category

Backend / Frontend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Reuse the classroom Jitsi integration for secure mentoring sessions.

## Deliverables

- Mentoring room generation
- Join authorization
- Attendance timestamps
- Session links in booking views

## Acceptance Criteria

- [ ] Only booking participants and admins can join
- [ ] Room details are not public
- [ ] Join/leave events are idempotent
- [ ] Classroom behavior is not broken
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR19-003 — Mentor Jitsi Session

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
Reuse the classroom Jitsi integration for secure mentoring sessions.

Deliverables:
- Mentoring room generation
- Join authorization
- Attendance timestamps
- Session links in booking views

Acceptance criteria:
- Only booking participants and admins can join
- Room details are not public
- Join/leave events are idempotent
- Classroom behavior is not broken

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
