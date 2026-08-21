# SPR4-007 — Backend Tests Course Lesson

## Sprint

Sprint 04

## Suggested Day

Day 19

## Category

Backend QA

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Test course and lesson critical rules.

## Deliverables

- unit tests
- integration tests if available

## Acceptance Criteria

- [ ] Publish without lesson fails
- [ ] Duplicate slug handled
- [ ] Ownership checks tested

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR4-007 — Backend Tests Course Lesson

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Test course and lesson critical rules.

Deliverables:
- unit tests
- integration tests if available

Acceptance criteria:
- Publish without lesson fails
- Duplicate slug handled
- Ownership checks tested

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
