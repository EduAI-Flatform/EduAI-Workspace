# SPR10-002 — Setup OpenAI Service

## Sprint

Sprint 10

## Suggested Day

Day 43

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/12-security-requirements.md
- docs/13-deployment-architecture.md

## Objective

Create centralized OpenAI provider service.

## Deliverables

- OpenAI service
- config env usage
- safe error handling

## Acceptance Criteria

- [ ] API key from env
- [ ] No secret logging
- [ ] Service is injectable

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-002 — Setup OpenAI Service

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/12-security-requirements.md
- docs/13-deployment-architecture.md

Objective:
Create centralized OpenAI provider service.

Deliverables:
- OpenAI service
- config env usage
- safe error handling

Acceptance criteria:
- API key from env
- No secret logging
- Service is injectable

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
