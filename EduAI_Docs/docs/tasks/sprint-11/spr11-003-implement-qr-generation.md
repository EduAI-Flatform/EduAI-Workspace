# SPR11-003 — Implement QR Generation

## Sprint

Sprint 11

## Suggested Day

Day 47

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

Generate QR for certificate verification URL.

## Deliverables

- QR generation utility
- qr_code_url storage

## Acceptance Criteria

- [ ] QR generated
- [ ] URL uses verification route
- [ ] No sensitive data in QR

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR11-003 — Implement QR Generation

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Generate QR for certificate verification URL.

Deliverables:
- QR generation utility
- qr_code_url storage

Acceptance criteria:
- QR generated
- URL uses verification route
- No sensitive data in QR

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
