# SPR1-006 — Setup Global Error Handling

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

Implement consistent error response handling.

## Deliverables

- Global exception filter
- standard error response format
- request-safe error messages

## Acceptance Criteria

- [ ] Error response matches API docs
- [ ] No stack traces exposed in production
- [ ] Validation errors are readable

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-006 — Setup Global Error Handling

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement consistent error response handling.

Deliverables:
- Global exception filter
- standard error response format
- request-safe error messages

Acceptance criteria:
- Error response matches API docs
- No stack traces exposed in production
- Validation errors are readable

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
