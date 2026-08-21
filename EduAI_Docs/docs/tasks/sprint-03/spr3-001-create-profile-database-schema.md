# SPR3-001 — Create Profile Database Schema

## Sprint

Sprint 03

## Suggested Day

Day 11

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

Add user_profiles, user_skills, portfolios models.

## Deliverables

- Prisma models
- migration

## Acceptance Criteria

- [ ] Migration succeeds
- [ ] Relations to users exist
- [ ] Unique profile per user

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR3-001 — Create Profile Database Schema

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add user_profiles, user_skills, portfolios models.

Deliverables:
- Prisma models
- migration

Acceptance criteria:
- Migration succeeds
- Relations to users exist
- Unique profile per user

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
