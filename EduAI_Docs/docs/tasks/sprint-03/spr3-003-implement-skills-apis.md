# SPR3-003 — Implement Skills APIs

## Sprint

Sprint 03

## Suggested Day

Day 12

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

Implement skills CRUD for current user.

## Deliverables

- POST /profile/skills
- DELETE /profile/skills/:id
- DTOs

## Acceptance Criteria

- [ ] User can add/remove own skills
- [ ] Cannot delete another user's skill
- [ ] Validation works

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR3-003 — Implement Skills APIs

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement skills CRUD for current user.

Deliverables:
- POST /profile/skills
- DELETE /profile/skills/:id
- DTOs

Acceptance criteria:
- User can add/remove own skills
- Cannot delete another user's skill
- Validation works

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
