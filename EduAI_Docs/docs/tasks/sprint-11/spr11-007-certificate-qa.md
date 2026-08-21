# SPR11-007 — Certificate QA

## Sprint

Sprint 11

## Suggested Day

Day 48

## Category

QA

## Required Context

Read these docs before implementation:

- docs/10-development-roadmap.md
- docs/12-security-requirements.md

## Objective

Verify certificate workflow.

## Deliverables

- manual QA
- bug fixes

## Acceptance Criteria

- [ ] Issue -> QR -> verify works
- [ ] Build passes
- [ ] Sensitive data hidden

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR11-007 — Certificate QA

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/10-development-roadmap.md
- docs/12-security-requirements.md

Objective:
Verify certificate workflow.

Deliverables:
- manual QA
- bug fixes

Acceptance criteria:
- Issue -> QR -> verify works
- Build passes
- Sensitive data hidden

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
