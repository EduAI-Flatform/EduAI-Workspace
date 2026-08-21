# SPR7-004 — Implement Attendance Tracking

## Sprint

Sprint 07

## Suggested Day

Day 33

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

Record join/leave attendance events.

## Deliverables

- attendance endpoint
- duration calculation

## Acceptance Criteria

- [ ] Server-side timestamp used
- [ ] Unique attendance per session/user
- [ ] Swagger updated

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR7-004 — Implement Attendance Tracking

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Record join/leave attendance events.

Deliverables:
- attendance endpoint
- duration calculation

Acceptance criteria:
- Server-side timestamp used
- Unique attendance per session/user
- Swagger updated

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
