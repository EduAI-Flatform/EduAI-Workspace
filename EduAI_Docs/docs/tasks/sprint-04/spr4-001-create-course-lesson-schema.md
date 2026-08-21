# SPR4-001 — Create Course Lesson Schema

## Sprint

Sprint 04

## Suggested Day

Day 16

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

Add courses and lessons models.

## Deliverables

- Prisma models
- migration
- course/lesson enums

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Relations exist
- [ ] Course slug unique

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR4-001 — Create Course Lesson Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add courses and lessons models.

Deliverables:
- Prisma models
- migration
- course/lesson enums

Acceptance criteria:
- Migration succeeds
- Relations exist
- Course slug unique

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
