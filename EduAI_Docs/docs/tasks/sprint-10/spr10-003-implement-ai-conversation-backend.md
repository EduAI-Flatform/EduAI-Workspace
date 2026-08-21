# SPR10-003 — Implement AI Conversation Backend

## Sprint

Sprint 10

## Suggested Day

Day 43

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

Implement chat conversation/message persistence.

## Deliverables

- conversation service
- message service
- POST /ai/chat base

## Acceptance Criteria

- [ ] Messages stored
- [ ] User ownership enforced
- [ ] Rate limit hook prepared

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-003 — Implement AI Conversation Backend

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement chat conversation/message persistence.

Deliverables:
- conversation service
- message service
- POST /ai/chat base

Acceptance criteria:
- Messages stored
- User ownership enforced
- Rate limit hook prepared

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
