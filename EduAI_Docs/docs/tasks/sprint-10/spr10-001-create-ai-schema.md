# SPR10-001 — Create AI Schema

## Sprint

Sprint 10

## Suggested Day

Day 43

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

Add AI conversation/message/embedding/generated tables.

## Deliverables

- Prisma models
- migration
- pgvector setup notes

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Embedding field supported/planned
- [ ] Relations work

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-001 — Create AI Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add AI conversation/message/embedding/generated tables.

Deliverables:
- Prisma models
- migration
- pgvector setup notes

Acceptance criteria:
- Migration succeeds
- Embedding field supported/planned
- Relations work

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
