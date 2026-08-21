# SPR17-004 — Course-Grounded AI Tutor

## Sprint

Sprint 17

## Category

AI / Security / Full-stack

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Strengthen the existing AI tutor so each answer can be grounded in authorized course and library sources with citations.

## Deliverables

- Course context selector
- Authorization-filtered retrieval
- Source citations in API and UI
- Conversation scope and usage controls

## Acceptance Criteria

- [ ] Unauthorized chunks never enter prompts
- [ ] Answers distinguish sourced content from general model knowledge
- [ ] Citation links resolve to accessible resources
- [ ] Regression tests cover private course boundaries
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR17-004 — Course-Grounded AI Tutor

Before implementation:
1. Inspect the current main branches in both repositories.
2. Reuse current services, DTO patterns, guards, components, tests, and coding conventions.
3. Do not rebuild screens that already use live APIs.
4. Treat the current source code as the source of truth when it differs from old planning docs.

Required context:
- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

Objective:
Strengthen the existing AI tutor so each answer can be grounded in authorized course and library sources with citations.

Deliverables:
- Course context selector
- Authorization-filtered retrieval
- Source citations in API and UI
- Conversation scope and usage controls

Acceptance criteria:
- Unauthorized chunks never enter prompts
- Answers distinguish sourced content from general model knowledge
- Citation links resolve to accessible resources
- Regression tests cover private course boundaries

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
