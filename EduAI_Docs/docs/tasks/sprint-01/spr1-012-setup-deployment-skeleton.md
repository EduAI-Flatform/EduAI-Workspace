# SPR1-012 — Setup Deployment Skeleton

## Sprint

Sprint 01

## Suggested Day

Day 5

## Category

DevOps

## Required Context

Read these docs before implementation:

- docs/13-deployment-architecture.md
- docs/12-security-requirements.md

## Objective

Prepare Vercel/Render deployment configuration.

## Deliverables

- frontend deployment config
- backend health endpoint
- deployment notes

## Acceptance Criteria

- [ ] /health returns ok
- [ ] Staging deployment path documented
- [ ] CORS plan documented

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-012 — Setup Deployment Skeleton

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/13-deployment-architecture.md
- docs/12-security-requirements.md

Objective:
Prepare Vercel/Render deployment configuration.

Deliverables:
- frontend deployment config
- backend health endpoint
- deployment notes

Acceptance criteria:
- /health returns ok
- Staging deployment path documented
- CORS plan documented

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
