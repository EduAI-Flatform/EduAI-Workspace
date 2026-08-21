# SPR4-006 — Implement Lesson Controller

## Sprint

Sprint 04

## Suggested Day

Day 18

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

Expose lesson APIs.

## Deliverables

- GET /courses/:courseId/lessons
- POST /courses/:courseId/lessons
- PUT /lessons/:id
- DELETE /lessons/:id

## Acceptance Criteria

- [ ] RBAC enforced
- [ ] Soft delete works
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR4-006 — Implement Lesson Controller

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Expose lesson APIs.

Deliverables:
- GET /courses/:courseId/lessons
- POST /courses/:courseId/lessons
- PUT /lessons/:id
- DELETE /lessons/:id

Acceptance criteria:
- RBAC enforced
- Soft delete works
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
