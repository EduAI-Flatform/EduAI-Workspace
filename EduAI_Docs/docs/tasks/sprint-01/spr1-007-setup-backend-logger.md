# SPR1-007 — Setup Backend Logger

## Sprint

Sprint 01

## Suggested Day

Day 3

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Add structured backend logging.

## Deliverables

- Logger service
- request/error logging pattern
- log levels

## Acceptance Criteria

- [ ] Critical errors are logged
- [ ] Sensitive values are not logged
- [ ] Logs include timestamp/context

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-007 — Setup Backend Logger

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Add structured backend logging.

Deliverables:
- Logger service
- request/error logging pattern
- log levels

Acceptance criteria:
- Critical errors are logged
- Sensitive values are not logged
- Logs include timestamp/context

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
