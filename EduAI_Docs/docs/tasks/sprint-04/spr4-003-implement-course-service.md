# SPR4-003 — Implement Course Service

## Sprint

Sprint 04

## Suggested Day

Day 17

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Implement course business logic.

## Deliverables

- createCourse
- updateCourse
- publishCourse
- archiveCourse
- getCourse

## Acceptance Criteria

- [ ] Only instructor/admin creates
- [ ] Publish requires at least one lesson
- [ ] Ownership enforced

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR4-003 — Implement Course Service

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement course business logic.

Deliverables:
- createCourse
- updateCourse
- publishCourse
- archiveCourse
- getCourse

Acceptance criteria:
- Only instructor/admin creates
- Publish requires at least one lesson
- Ownership enforced

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
