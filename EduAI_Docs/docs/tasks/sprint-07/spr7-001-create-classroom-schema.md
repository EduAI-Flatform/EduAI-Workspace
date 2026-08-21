# SPR7-001 — Create Classroom Schema

## Sprint

Sprint 07

## Suggested Day

Day 32

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

Add classroom session, attendance, recording models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Relations to course/user exist
- [ ] Status enum exists

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR7-001 — Create Classroom Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add classroom session, attendance, recording models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Migration succeeds
- Relations to course/user exist
- Status enum exists

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
