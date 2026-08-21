# SPR19-001 — Mentor Profiles and Availability

## Sprint

Sprint 19

## Category

Full-stack / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Add mentor profiles and recurring availability for approved instructors.

## Deliverables

- Mentor profile and expertise schema
- Availability rules
- Instructor mentor settings UI
- Student mentor directory

## Acceptance Criteria

- [ ] Only approved instructors can activate mentor mode
- [ ] Availability is stored in a timezone-safe form
- [ ] Private contact data is hidden
- [ ] Search and filtering are paginated
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR19-001 — Mentor Profiles and Availability

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
Add mentor profiles and recurring availability for approved instructors.

Deliverables:
- Mentor profile and expertise schema
- Availability rules
- Instructor mentor settings UI
- Student mentor directory

Acceptance criteria:
- Only approved instructors can activate mentor mode
- Availability is stored in a timezone-safe form
- Private contact data is hidden
- Search and filtering are paginated

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
