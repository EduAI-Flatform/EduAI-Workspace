# SPR9-001 — Create Community Schema

## Sprint

Sprint 09

## Suggested Day

Day 40

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

Add posts/comments/reactions models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Relations work
- [ ] Reaction unique constraint

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR9-001 — Create Community Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add posts/comments/reactions models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Migration succeeds
- Relations work
- Reaction unique constraint

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
