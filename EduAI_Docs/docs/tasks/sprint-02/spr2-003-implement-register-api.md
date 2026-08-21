# SPR2-003 — Implement Register API

## Sprint

Sprint 02

## Suggested Day

Day 7

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

Implement user registration with default Student role.

## Deliverables

- Register DTO
- Auth service register
- POST /auth/register

## Acceptance Criteria

- [ ] Unique email enforced
- [ ] Default student role assigned
- [ ] Password is hashed
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-003 — Implement Register API

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement user registration with default Student role.

Deliverables:
- Register DTO
- Auth service register
- POST /auth/register

Acceptance criteria:
- Unique email enforced
- Default student role assigned
- Password is hashed
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
