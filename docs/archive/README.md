# Historical material retired from active Workspace

**Audit date:** 2026-10-22

**Last full pre-cleanup remote-main snapshot:** `d80338df814fc83d128672006685704123a3306e`
**Recovery method:** Git history, not a second active document tree.

The current Workspace intentionally omits these **129 superseded files**:

| Previous location | Count | Why removed from active tree |
| --- | ---: | --- |
| `EduAI_Docs/docs/tasks/` | 121 | Sprint 01–12 MVP task cards and one old template; the current coordination is in `state/`, `phases/` and AI-DOS records |
| `EduAI_Docs/AI/` | 3 | Old standalone AI-DOS/Codex setup prompts superseded by root `AGENTS.md` and engineering rules |
| `EduAI_Docs/Prompt/` | 4 | Ad hoc historical UI/learning-flow prompts; not executable current-phase instructions |
| `EduAI_Docs/demo/` | 1 | Historical demo seeding instructions; not an approved current deployment/data operation |

These are **removed only from the current Git tree**, not erased from Git history. To inspect any specific previous file:

```bash
git show d80338df814fc83d128672006685704123a3306e:EduAI_Docs/docs/tasks/sprint-01/README.md
```

Or use the GitHub tree at
[pre-cleanup baseline](https://github.com/EduAI-Flatform/EduAI-Workspace/tree/d80338df814fc83d128672006685704123a3306e/EduAI_Docs).

No `.ai-dos/` records, production/payment evidence, active Sprint 25/26 definition, phase dossier, required legacy 2.0/3.0 manifest input, product ADR, Backend/Frontend repository or secret was removed. Any restoration must be task-scoped with a reason, never a bulk reintroduction of competing instructions.
