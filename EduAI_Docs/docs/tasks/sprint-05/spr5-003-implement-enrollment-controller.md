# SPR5-003 — Implement Enrollment Controller

## Sprint

Sprint 05

## Suggested Day

Day 23

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

Expose enrollment APIs.

## Deliverables

- POST /courses/:id/enroll
- GET /me/enrollments

## Acceptance Criteria

- [ ] Auth required
- [ ] Student role enforced
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR5-003 — Implement Enrollment Controller

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Expose enrollment APIs.

Deliverables:
- POST /courses/:id/enroll
- GET /me/enrollments

Acceptance criteria:
- Auth required
- Student role enforced
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
