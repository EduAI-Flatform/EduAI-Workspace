# SPR6-004 — Create Assignment Schema

## Sprint

Sprint 06

## Suggested Day

Day 28

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

Add assignments and submissions models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Unique submission constraint
- [ ] Status enum exists

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR6-004 — Create Assignment Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add assignments and submissions models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Migration succeeds
- Unique submission constraint
- Status enum exists

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
