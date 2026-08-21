# SPR5-001 — Create Enrollment Progress Schema

## Sprint

Sprint 05

## Suggested Day

Day 22

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

Add enrollments and learning_progress models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Unique user+course enrollment
- [ ] Unique user+lesson progress
- [ ] Migration succeeds

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR5-001 — Create Enrollment Progress Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add enrollments and learning_progress models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Unique user+course enrollment
- Unique user+lesson progress
- Migration succeeds

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
