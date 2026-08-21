# SPR5-005 — Implement Progress Controller

## Sprint

Sprint 05

## Suggested Day

Day 24

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Expose progress APIs.

## Deliverables

- POST /lessons/:id/complete
- GET /courses/:id/progress

## Acceptance Criteria

- [ ] Ownership/enrollment enforced
- [ ] Swagger updated
- [ ] Errors are clear

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR5-005 — Implement Progress Controller

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Expose progress APIs.

Deliverables:
- POST /lessons/:id/complete
- GET /courses/:id/progress

Acceptance criteria:
- Ownership/enrollment enforced
- Swagger updated
- Errors are clear

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
