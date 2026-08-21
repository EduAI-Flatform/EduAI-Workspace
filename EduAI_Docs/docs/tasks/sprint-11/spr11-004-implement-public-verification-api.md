# SPR11-004 — Implement Public Verification API

## Sprint

Sprint 11

## Suggested Day

Day 48

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

Implement public certificate verification.

## Deliverables

- GET /certificates/verify/:code

## Acceptance Criteria

- [ ] Public access works
- [ ] Invalid code handled
- [ ] No email/phone/internal IDs exposed

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR11-004 — Implement Public Verification API

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement public certificate verification.

Deliverables:
- GET /certificates/verify/:code

Acceptance criteria:
- Public access works
- Invalid code handled
- No email/phone/internal IDs exposed

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
