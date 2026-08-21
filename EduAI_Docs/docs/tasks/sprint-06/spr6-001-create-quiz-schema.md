# SPR6-001 — Create Quiz Schema

## Sprint

Sprint 06

## Suggested Day

Day 27

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

Add quizzes, questions, quiz_attempts models.

## Deliverables

- Prisma models
- migration
- enums

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Relations exist
- [ ] Question JSON fields work

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR6-001 — Create Quiz Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add quizzes, questions, quiz_attempts models.

Deliverables:
- Prisma models
- migration
- enums

Acceptance criteria:
- Migration succeeds
- Relations exist
- Question JSON fields work

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
