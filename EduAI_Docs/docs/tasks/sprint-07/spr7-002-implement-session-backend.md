# SPR7-002 — Implement Session Backend

## Sprint

Sprint 07

## Suggested Day

Day 32

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md
- docs/06-system-architecture.md

## Objective

Implement classroom session CRUD.

## Deliverables

- session DTOs
- session service/controller

## Acceptance Criteria

- [ ] Instructor owner creates session
- [ ] Enrolled students can list
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR7-002 — Implement Session Backend

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md
- docs/06-system-architecture.md

Objective:
Implement classroom session CRUD.

Deliverables:
- session DTOs
- session service/controller

Acceptance criteria:
- Instructor owner creates session
- Enrolled students can list
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
