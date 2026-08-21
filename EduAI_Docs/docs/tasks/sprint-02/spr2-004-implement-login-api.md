# SPR2-004 — Implement Login API

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

Implement login and token issuing.

## Deliverables

- Login DTO
- POST /auth/login
- access/refresh token response

## Acceptance Criteria

- [ ] Invalid credentials rejected
- [ ] Tokens issued on valid login
- [ ] No password_hash returned

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-004 — Implement Login API

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement login and token issuing.

Deliverables:
- Login DTO
- POST /auth/login
- access/refresh token response

Acceptance criteria:
- Invalid credentials rejected
- Tokens issued on valid login
- No password_hash returned

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
