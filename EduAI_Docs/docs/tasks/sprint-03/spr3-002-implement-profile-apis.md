# SPR3-002 — Implement Profile APIs

## Sprint

Sprint 03

## Suggested Day

Day 11

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

Implement get/update current profile.

## Deliverables

- GET /profile/me
- PUT /profile/me
- DTOs

## Acceptance Criteria

- [ ] User can update own profile
- [ ] Ownership enforced
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR3-002 — Implement Profile APIs

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement get/update current profile.

Deliverables:
- GET /profile/me
- PUT /profile/me
- DTOs

Acceptance criteria:
- User can update own profile
- Ownership enforced
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
