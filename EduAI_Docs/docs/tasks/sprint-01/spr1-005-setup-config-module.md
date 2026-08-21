# SPR1-005 — Setup Config Module

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

Create centralized environment configuration for backend.

## Deliverables

- Config module
- validated env schema
- typed config access

## Acceptance Criteria

- [ ] Missing required env fails fast
- [ ] No direct process.env usage outside config
- [ ] JWT/DB/Redis/R2/OpenAI keys are represented

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR1-005 — Setup Config Module

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/06-system-architecture.md
- docs/10-development-roadmap.md
- docs/11-coding-standards.md
- docs/13-deployment-architecture.md

Objective:
Create centralized environment configuration for backend.

Deliverables:
- Config module
- validated env schema
- typed config access

Acceptance criteria:
- Missing required env fails fast
- No direct process.env usage outside config
- JWT/DB/Redis/R2/OpenAI keys are represented

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
