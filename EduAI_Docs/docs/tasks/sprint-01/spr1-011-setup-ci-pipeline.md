# SPR1-011 — Setup CI Pipeline

## Sprint

Sprint 01

## Suggested Day

Day 5

## Category

DevOps

## Required Context

Read these docs before implementation:

- docs/10-development-roadmap.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

## Objective

Create CI checks for frontend and backend.

## Deliverables

- GitHub Actions workflow
- backend build step
- frontend build step

## Acceptance Criteria

- [ ] CI fails on build error
- [ ] Secrets are not committed
- [ ] Required env vars documented

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-011 — Setup CI Pipeline

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/10-development-roadmap.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

Objective:
Create CI checks for frontend and backend.

Deliverables:
- GitHub Actions workflow
- backend build step
- frontend build step

Acceptance criteria:
- CI fails on build error
- Secrets are not committed
- Required env vars documented

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
