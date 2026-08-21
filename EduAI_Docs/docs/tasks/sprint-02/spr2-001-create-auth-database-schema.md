# SPR2-001 — Create Auth Database Schema

## Sprint

Sprint 02

## Suggested Day

Day 6

## Category

Database

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Add users, roles, user_roles, refresh_tokens schema.

## Deliverables

- Prisma models/enums
- migration
- seed default roles

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Default roles exist
- [ ] Email unique constraint exists

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR2-001 — Create Auth Database Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add users, roles, user_roles, refresh_tokens schema.

Deliverables:
- Prisma models/enums
- migration
- seed default roles

Acceptance criteria:
- Migration succeeds
- Default roles exist
- Email unique constraint exists

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
