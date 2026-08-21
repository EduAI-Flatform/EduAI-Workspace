# SPR1-003 — Setup Prisma And PostgreSQL

## Sprint

Sprint 01

## Suggested Day

Day 2

## Category

Database

## Required Context

Read these docs before implementation:

- docs/07-database-design.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

## Objective

Connect backend to PostgreSQL using Prisma.

## Deliverables

- Prisma installed
- DATABASE_URL configured
- initial migration workflow documented

## Acceptance Criteria

- [ ] Prisma generate works
- [ ] Migration command runs
- [ ] Backend can connect to database

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-003 — Setup Prisma And PostgreSQL

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/07-database-design.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

Objective:
Connect backend to PostgreSQL using Prisma.

Deliverables:
- Prisma installed
- DATABASE_URL configured
- initial migration workflow documented

Acceptance criteria:
- Prisma generate works
- Migration command runs
- Backend can connect to database

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
