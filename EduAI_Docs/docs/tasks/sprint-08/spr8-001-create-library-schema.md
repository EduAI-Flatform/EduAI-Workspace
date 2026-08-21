# SPR8-001 — Create Library Schema

## Sprint

Sprint 08

## Suggested Day

Day 36

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

Add library resource/category/tag/favorite models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Tag relations work
- [ ] Favorites unique constraint

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR8-001 — Create Library Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add library resource/category/tag/favorite models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Migration succeeds
- Tag relations work
- Favorites unique constraint

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
