# SPR4-004 — Implement Course Controller

## Sprint

Sprint 04

## Suggested Day

Day 17

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

Expose Course REST APIs.

## Deliverables

- GET /courses
- GET /courses/:id
- POST /courses
- PUT /courses/:id
- POST publish/archive

## Acceptance Criteria

- [ ] Swagger updated
- [ ] RBAC enforced
- [ ] Public only sees published courses

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR4-004 — Implement Course Controller

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Expose Course REST APIs.

Deliverables:
- GET /courses
- GET /courses/:id
- POST /courses
- PUT /courses/:id
- POST publish/archive

Acceptance criteria:
- Swagger updated
- RBAC enforced
- Public only sees published courses

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
