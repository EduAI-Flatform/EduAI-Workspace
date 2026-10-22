# EduAI phase task template

All tasks inherit [AGENTS](../AGENTS.md) and [phase autopilot](../docs/engineering/PHASE-AUTOPILOT.md). A task template is **not** another prompt the owner must paste.

```md
## <PHASE-ID>-<SUBPHASE-ID> — Outcome title
**Status:** READY
**Depends on:** <accepted previous outcome(s)>
**Target repositories:** <Frontend | Backend | Workspace>
**Architecture baseline:** <authoritative path>
**Financial/production hard stops:** <exact restricted operations>

### Objective
<One observable outcome, not merely a list of commands.>

### Scope and exclusions
- In: ...
- Out: ...

### Mandatory preflight
Read Workspace AGENTS/state/dependency/blockers/engineering rules,
the whole selected major-phase dossier, target-repo AGENTS,
relevant architecture and actual code/tests/git/runtime state.

### Implementation and design
- Smallest maintainable change and reuse of established contracts.
- Substantial UI: Stitch MCP, approved design comparison, mobile composition.
- Never hide financial/provider/permission semantics inside an unrelated UI edit.

### Acceptance
- Functional ...
- Architecture, security and privacy ...
- Responsive / accessibility / visual ... (when applicable)

### Verification and evidence
- Focused + all required repository tests, build, lint, typecheck, audit.
- Runtime/UAT or migration checks only when actually authorized/applicable.
- Diff review, Conventional Commit, branch push, PR, CI, merge,
  exact remote main, post-merge check and merged-branch cleanup.
- Record exact SHAs, actual PASS/FAIL results, CI URLs and unresolved gates.

### Continuation
When DONE, autonomously continue the next dependency-valid subphase in
the SAME owner-authorized major phase. When blocked, preserve safe completed
work, record exact blocker and stop at a genuine hard human dependency.
Never cross a new major-phase boundary without owner start.
```
