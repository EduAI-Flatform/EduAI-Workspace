# SPR2-005 — Implement Refresh And Logout

## Sprint

Sprint 02

## Suggested Day

Day 8

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

Implement refresh token rotation and logout.

## Deliverables

- POST /auth/refresh
- POST /auth/logout
- refresh token persistence

## Acceptance Criteria

- [ ] Expired/invalid token rejected
- [ ] Logout invalidates token
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-005 — Implement Refresh And Logout

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement refresh token rotation and logout.

Deliverables:
- POST /auth/refresh
- POST /auth/logout
- refresh token persistence

Acceptance criteria:
- Expired/invalid token rejected
- Logout invalidates token
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
