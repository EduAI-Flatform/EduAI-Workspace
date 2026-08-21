# SPR10-011 — AI QA

## Sprint

Sprint 10

## Suggested Day

Day 46

## Category

QA

## Required Context

Read these docs before implementation:

- docs/10-development-roadmap.md
- docs/12-security-requirements.md

## Objective

Verify AI features and cost controls.

## Deliverables

- manual QA
- rate limit test
- bug fixes

## Acceptance Criteria

- [ ] AI Tutor works
- [ ] RAG sources work
- [ ] Quota enforced

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-011 — AI QA

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/10-development-roadmap.md
- docs/12-security-requirements.md

Objective:
Verify AI features and cost controls.

Deliverables:
- manual QA
- rate limit test
- bug fixes

Acceptance criteria:
- AI Tutor works
- RAG sources work
- Quota enforced

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
