# SPR10-005 — Implement RAG Retrieval

## Sprint

Sprint 10

## Suggested Day

Day 44

## Category

Backend

## Required Context

Read these docs before implementation:

- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/07-database-design.md
- docs/12-security-requirements.md

## Objective

Implement retrieval of relevant chunks for AI Tutor.

## Deliverables

- retrieval service
- top-k search
- source formatting

## Acceptance Criteria

- [ ] Returns relevant chunks
- [ ] Respects context permissions
- [ ] Sources included

## Codex Prompt

```text
You are working on EduAI Platform.

Task: SPR10-005 — Implement RAG Retrieval

Follow AGENTS.md and the EduAI docs.

Required docs:
- docs/05-feature-specification.md
- docs/06-system-architecture.md
- docs/07-database-design.md
- docs/12-security-requirements.md

Objective:
Implement retrieval of relevant chunks for AI Tutor.

Deliverables:
- retrieval service
- top-k search
- source formatting

Acceptance criteria:
- Returns relevant chunks
- Respects context permissions
- Sources included

Do not implement features outside this task.
Keep the change minimal and focused.
Update docs only if this task changes architecture, API, database, or security behavior.
Run relevant build/tests if available and summarize only failures.
```
