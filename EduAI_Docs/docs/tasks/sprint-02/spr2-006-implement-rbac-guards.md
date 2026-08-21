# SPR2-006 — Implement RBAC Guards

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

Implement role-based authorization.

## Deliverables

- Auth guard
- Roles decorator
- Roles guard

## Acceptance Criteria

- [ ] Protected route rejects unauthenticated users
- [ ] Role mismatch returns forbidden
- [ ] Admin role can access admin test route

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-006 — Implement RBAC Guards

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement role-based authorization.

Deliverables:
- Auth guard
- Roles decorator
- Roles guard

Acceptance criteria:
- Protected route rejects unauthenticated users
- Role mismatch returns forbidden
- Admin role can access admin test route

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
