# SPR7-003 — Implement Jitsi Room Generation

## Sprint

Sprint 07

## Suggested Day

Day 33

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/12-security-requirements.md

## Objective

Generate Jitsi room and meeting URL for sessions.

## Deliverables

- room name generator
- start/join endpoints

## Acceptance Criteria

- [ ] Only instructor starts
- [ ] Only enrolled student joins
- [ ] No permanent unsafe room link

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR7-003 — Implement Jitsi Room Generation

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/12-security-requirements.md

Objective:
Generate Jitsi room and meeting URL for sessions.

Deliverables:
- room name generator
- start/join endpoints

Acceptance criteria:
- Only instructor starts
- Only enrolled student joins
- No permanent unsafe room link

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
