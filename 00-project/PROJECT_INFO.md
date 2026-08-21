# Project Information

Project-owned compatibility overlay. Canonical source: `.ai-dos/records/project.profile.json`.

- Project name: EduAI
- Project ID: EDUAI:PLATFORM
- Repository type: MULTI_REPO
- Primary branch: main
- Target version: 2.0.0
- Execution profile: production_required
- Workspace: `.` (`https://github.com/EduAI-Flatform/EduAI-Workspace.git`)
- Backend sibling: `../EduAI-Back-End` (`https://github.com/EduAI-Flatform/EduAI-Back-End.git`)
- Frontend sibling: `../EduAI-Front-End-Web` (`https://github.com/EduAI-Flatform/EduAI-Front-End-Web.git`)
- Documentation: `EduAI_Docs/docs`
- V2 roadmap source: `EduAI_Docs/docs/tasks_2.0/20-v2-development-roadmap.md`
- V2 task source: `EduAI_Docs/docs/tasks_2.0/sprint-13` through `sprint-21`
- Production URL: https://eduai.giaoducso.org.vn
- Google Stitch project: https://stitch.withgoogle.com/projects/18220294492285025802
- API URL: https://api.eduai.giaoducso.org.vn

## UI/design rule

Inspect the current UI first. Reuse an existing required Stitch screen when present; create a prompt only for a missing screen, never duplicate screens unnecessarily, and preserve APIs, authorization, business logic, and data flows.

## Applicability and evidence

Planning tasks use `OPTIONAL` applicability because AI-DOS 1.2 otherwise demands future PASS evidence during conformance. Before `DONE`, applicability must be promoted to the completion requirements in the canonical profile and every required evidence kind must pass. All 62 current tasks are `DONE`; code presence alone was never treated as completion evidence.
