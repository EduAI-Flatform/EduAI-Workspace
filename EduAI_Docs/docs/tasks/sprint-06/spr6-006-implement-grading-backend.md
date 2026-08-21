# SPR6-006 — Implement Grading Backend

## Sprint

Sprint 06

## Suggested Day

Day 29

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

Implement manual grading.

## Deliverables

- POST /submissions/:id/grade
- feedback/score logic

## Acceptance Criteria

- [ ] Instructor owner can grade
- [ ] Student cannot grade
- [ ] Score validation works

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR6-006 — Implement Grading Backend

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement manual grading.

Deliverables:
- POST /submissions/:id/grade
- feedback/score logic

Acceptance criteria:
- Instructor owner can grade
- Student cannot grade
- Score validation works

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
