# SPR13-003 — Regression Test Core V1 Flows

## Sprint

Sprint 13

## Category

QA

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Add and run repeatable regression coverage for the existing V1 student, instructor, authentication, AI, classroom, library, community, and certificate flows.

## Deliverables

- Playwright journeys for seeded student and instructor accounts
- Backend integration tests for role and ownership boundaries
- A regression checklist with evidence and known limitations

## Acceptance Criteria

- [ ] Tests use deterministic demo seed data
- [ ] Critical happy paths and unauthorized paths are covered
- [ ] Builds and test suites pass or failures are documented precisely
- [ ] No feature expansion
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR13-003 — Regression Test Core V1 Flows

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
Add and run repeatable regression coverage for the existing V1 student, instructor, authentication, AI, classroom, library, community, and certificate flows.

Deliverables:
- Playwright journeys for seeded student and instructor accounts
- Backend integration tests for role and ownership boundaries
- A regression checklist with evidence and known limitations

Acceptance criteria:
- Tests use deterministic demo seed data
- Critical happy paths and unauthorized paths are covered
- Builds and test suites pass or failures are documented precisely
- No feature expansion

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
