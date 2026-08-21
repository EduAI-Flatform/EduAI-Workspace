# SPR8-004 — Implement Resource Search Backend

## Sprint

Sprint 08

## Suggested Day

Day 37

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

Implement resource list/search/filter.

## Deliverables

- GET /library/resources
- search query
- filters

## Acceptance Criteria

- [ ] Search by title/category/tag/type
- [ ] Pagination works
- [ ] Visibility respected

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR8-004 — Implement Resource Search Backend

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/04-business-rules.md
- docs/07-database-design.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Implement resource list/search/filter.

Deliverables:
- GET /library/resources
- search query
- filters

Acceptance criteria:
- Search by title/category/tag/type
- Pagination works
- Visibility respected

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
