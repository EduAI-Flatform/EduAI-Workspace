# SPR1-004 — Setup Redis Configuration

## Sprint

Sprint 01

## Suggested Day

Day 2

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/06-system-architecture.md
- docs/10-development-roadmap.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

## Objective

Configure Redis client for rate limit/cache usage.

## Deliverables

- Redis config service
- environment variable support
- connection health check

## Acceptance Criteria

- [ ] Redis URL loaded from env
- [ ] App handles missing Redis safely in local dev
- [ ] No secrets hardcoded

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-004 — Setup Redis Configuration

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/06-system-architecture.md
- docs/10-development-roadmap.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

Objective:
Configure Redis client for rate limit/cache usage.

Deliverables:
- Redis config service
- environment variable support
- connection health check

Acceptance criteria:
- Redis URL loaded from env
- App handles missing Redis safely in local dev
- No secrets hardcoded

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
