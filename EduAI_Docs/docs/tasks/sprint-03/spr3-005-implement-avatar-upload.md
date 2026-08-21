# SPR3-005 — Implement Avatar Upload

## Sprint

Sprint 03

## Suggested Day

Day 13

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md
- docs/13-deployment-architecture.md

## Objective

Implement avatar upload through backend.

## Deliverables

- multipart upload endpoint
- R2 upload service stub or integration
- avatar_url update

## Acceptance Criteria

- [ ] File type validated
- [ ] Filename generated server-side
- [ ] No local prod path stored

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR3-005 — Implement Avatar Upload

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md
- docs/13-deployment-architecture.md

Objective:
Implement avatar upload through backend.

Deliverables:
- multipart upload endpoint
- R2 upload service stub or integration
- avatar_url update

Acceptance criteria:
- File type validated
- Filename generated server-side
- No local prod path stored

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
