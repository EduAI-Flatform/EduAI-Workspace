# SPR10-006 — Implement AI Tutor

## Sprint

Sprint 10

## Suggested Day

Day 45

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/05-feature-specification.md
- docs/08-api-design.md
- docs/12-security-requirements.md

## Objective

Implement AI Tutor response generation.

## Deliverables

- POST /ai/chat
- prompt builder
- source citations in response object

## Acceptance Criteria

- [ ] AI answers with allowed context
- [ ] Conversation saved
- [ ] Rate limits enforced

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-006 — Implement AI Tutor

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/05-feature-specification.md
- docs/08-api-design.md
- docs/12-security-requirements.md

Objective:
Implement AI Tutor response generation.

Deliverables:
- POST /ai/chat
- prompt builder
- source citations in response object

Acceptance criteria:
- AI answers with allowed context
- Conversation saved
- Rate limits enforced

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
