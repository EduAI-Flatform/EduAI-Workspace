# SPR2-007 — Implement Current User API

## Sprint

Sprint 02

## Suggested Day

Day 9

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

Implement GET /auth/me.

## Deliverables

- Current user decorator
- GET /auth/me

## Acceptance Criteria

- [ ] Returns safe user profile
- [ ] Requires auth
- [ ] No sensitive fields returned

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-007 — Implement Current User API

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement GET /auth/me.

Deliverables:
- Current user decorator
- GET /auth/me

Acceptance criteria:
- Returns safe user profile
- Requires auth
- No sensitive fields returned

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
