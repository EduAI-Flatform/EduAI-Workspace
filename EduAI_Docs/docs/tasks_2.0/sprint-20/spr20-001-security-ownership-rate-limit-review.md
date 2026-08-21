# SPR20-001 — Security, Ownership, and Rate-Limit Review

## Sprint

Sprint 20

## Category

Security / Backend

## Required Context

Read these docs and inspect current code before implementation:

- docs/10-development-roadmap.md
- docs/08-api-design.md
- docs/11-coding-standards.md
- docs/12-security-requirements.md

## Objective

Review every V1 and V2 endpoint for authentication, RBAC, ownership, validation, file safety, and abuse limits.

## Deliverables

- Endpoint security matrix
- Critical fixes
- Rate limits for auth, AI, uploads, and public verification
- Security regression tests

## Acceptance Criteria

- [ ] Every endpoint has an explicit public/protected decision
- [ ] Ownership is enforced server-side
- [ ] Production errors do not expose stack traces
- [ ] No secret is committed
- [ ] Backend and frontend builds pass where affected
- [ ] Relevant tests pass
- [ ] No unrelated files changed

## Codex Prompt

```text
You are working on EduAI Platform version 2.0.

Repositories:
- Backend: EduAI-Flatform/EduAI-Back-End
- Frontend: EduAI-Flatform/EduAI-Front-End-Web

Task: SPR20-001 — Security, Ownership, and Rate-Limit Review

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
Review every V1 and V2 endpoint for authentication, RBAC, ownership, validation, file safety, and abuse limits.

Deliverables:
- Endpoint security matrix
- Critical fixes
- Rate limits for auth, AI, uploads, and public verification
- Security regression tests

Acceptance criteria:
- Every endpoint has an explicit public/protected decision
- Ownership is enforced server-side
- Production errors do not expose stack traces
- No secret is committed

Keep the change focused on this task. Do not implement later tasks early.
Add Prisma migrations for database changes.
Update Swagger and relevant docs for API or behavior changes.
Run relevant backend/frontend build and tests.
Summarize changed files, commands run, failures, and manual verification steps.
```
