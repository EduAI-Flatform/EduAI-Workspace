# SPR12-001 — Backend Security Review

## Sprint

Sprint 12

## Suggested Day

Day 49

## Category

Security

## Required Context

Read these docs before implementation:

- docs/12-security-requirements.md
- docs/08-api-design.md
- docs/11-coding-standards.md

## Objective

Review backend endpoints for auth, RBAC, ownership, validation.

## Deliverables

- security checklist
- fixes for critical gaps

## Acceptance Criteria

- [ ] All protected APIs guarded
- [ ] Ownership enforced
- [ ] Validation present

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR12-001 — Backend Security Review

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/12-security-requirements.md
- docs/08-api-design.md
- docs/11-coding-standards.md

Objective:
Review backend endpoints for auth, RBAC, ownership, validation.

Deliverables:
- security checklist
- fixes for critical gaps

Acceptance criteria:
- All protected APIs guarded
- Ownership enforced
- Validation present

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
