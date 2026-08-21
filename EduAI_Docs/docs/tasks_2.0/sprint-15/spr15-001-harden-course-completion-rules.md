# SPR15-001 — Harden Course Completion Rules

## Sprint

Sprint 15

## Category

Backend / Database

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Define and implement authoritative course completion rules across lessons, quizzes, and assignments.

## Deliverables

- Completion policy fields or configuration
- Transactional completion evaluator
- Idempotent completion updates
- Tests for optional and required learning items

## Acceptance Criteria

- [ ] Frontend cannot directly mark a course completed
- [ ] Completion is derived from server-side records
- [ ] Concurrent updates remain consistent
- [ ] Existing lesson progress behavior is preserved
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR15-001 — Harden Course Completion Rules

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
Define and implement authoritative course completion rules across lessons, quizzes, and assignments.

Deliverables:
- Completion policy fields or configuration
- Transactional completion evaluator
- Idempotent completion updates
- Tests for optional and required learning items

Acceptance criteria:
- Frontend cannot directly mark a course completed
- Completion is derived from server-side records
- Concurrent updates remain consistent
- Existing lesson progress behavior is preserved

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
