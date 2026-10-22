# EduAI — One prompt per major phase

## Objective

Adopt the proven CongDongNgonNgu-Workspace **one owner prompt → complete major-phase execution** pattern, adapted to EduAI's separate AI-DOS payment ledger, Admin UI and Payment/Wallet lanes. This policy is a repository contract, not a claim that any external browser relay or production permission already exists.

## One-time owner start

1. Owner chooses an exact major phase (for example `ADM-00` or `PAYW-01`) and explicitly authorizes its start. A `READY` dossier alone does **not** grant execution authority.
2. Codex reads root `AGENTS.md`, `state/PROJECT-STATE.md`, `state/DEPENDENCY-GRAPH.md`, `state/BLOCKERS.md`, these rules, the phase dossier, and applicable target-repository rules. Inspect actual code, tests, latest Git states and real configured tools.
3. Codex reconciles existing DONE/VERIFYING evidence, decomposes the authorized phase into useful dependency-ordered subphases, and records the plan inside the phase dossier. Do not manufacture extra phases or redo verified work.

## Autonomous same-phase lifecycle

For **every safe eligible subphase**, Codex independently:

1. Audits exact source, existing behavior, current active gates and dependencies.
2. Implements the smallest coherent result. For substantial UI, runs Stitch MCP design/refinement **before** implementation; audits and keeps already-approved designs where appropriate.
3. Runs focused and repository-required tests, architecture/security checks, and applicable responsive/a11y/browser/runtime checks. EduAI Admin widths: 320/375/390/412/768/1024/1440.
4. Inspects the diff, fixes ordinary defects, records an honest review, and produces a Conventional Commit.
5. Publishes only on the authorized branches/repositories, verifies remote head, opens a PR, waits for authoritative CI and resolves ordinary CI failures.
6. Merges only after required gates pass, verifies the exact merged `main` SHA and post-merge checks, removes **only verified merged temporary branches** locally/remotely, then synchronizes local `main`.
7. Publishes sanitized evidence/handoff (scope, changed files/SHAs, tests, CI/run links, runtime proof, blockers, unresolved gates and next eligible subphase).
8. **Automatically** starts the next dependency-valid subphase within the same owner-authorized major phase. A subphase completion is not a human permission boundary.

Do not claim `DONE` from a planned test, PR creation, green local command or unobserved deployment. A missing required gate is `VERIFYING`, `BLOCKED_INTERNAL` or `BLOCKED_EXTERNAL` as observed.

## Optional ChatGPT continuation relay

When the approved browser relay is configured and the exact project conversation is confirmed, Codex can send a sanitized terminal receipt and retrieve a same-phase continuation/recovery prompt without asking the owner to paste it. Validate project, exact major phase, dependency order, scope and hard stops before executing the returned prompt.

When no confirmed relay exists, **continue from this repository's `TASKS.md` and dependency graph**. Never claim relay success without observing a completed send/response. Retry transient relay failure boundedly and preserve an actual blocker; do not loop or fabricate a response.

## Hard stops (never inferred from a Codex/ChatGPT continuation)

- Entering a **new major phase**.
- Production deployments/restarts; production DB writes and risky schema migrations.
- Live payments, merchant/provider activation, real-money top-ups, refunds, reconciliation changes, transfers, seller payouts or settlement.
- Credential/secret/environment changes; infrastructure/DNS/destructive data actions; third-party spending and paid service activation.
- Unauthorized private-user-data collection/export, security-policy weakening, force push/history rewriting or bypass of required review/CI.

At a hard stop: preserve completed safe work, record `HUMAN_AUTHORIZATION_REQUIRED=<exact action>`, specify current state and risk, and await the owner. A planning-only simulation or sandbox test is not real-money acceptance.

## Program lanes and protected authority

| Lane | State authority | Execution |
| --- | --- | --- |
| Existing commerce/payment Sprint 25 | `.ai-dos/records/`; gate `SPR25-007` | Preserve facts, four open cases and independent release restrictions |
| Admin UI `ADM-00..07` | `state/`, `phases/ADM-*/` | Planning only until the owner starts `ADM-00` |
| Payment & Wallet `PAYW-00..06` | `state/`, `phases/PAYW-*/`, finance ADRs | `PAYW-00` VERIFYING; no PAYW-01 start or live money-flow authorization |

TMI points remain noncash; seller earnings payable is not by itself a licensed wallet. Buyer stored-value wallet is sandbox/design only until licensed partner, legal, merchant-of-record, KYC/AML and owner gates are resolved.

## Copy once to start the chosen major phase

```text
PROJECT=EduAI
MAJOR_PHASE=<EXACT OWNER-AUTHORIZED PHASE ID>

Read EduAI-Workspace/AGENTS.md, state/PROJECT-STATE.md,
state/DEPENDENCY-GRAPH.md, state/BLOCKERS.md,
docs/engineering/CODEX-WORKING-RULES.md and PHASE-AUTOPILOT.md.
Read the selected major phase's complete dossier and relevant roadmap.
Inspect the latest Frontend/Backend/Workspace main, real source, tests, AGENTS.md,
active gates and available Stitch/runtime/review/CI tools.

Execute the complete authorized major phase autonomously:
select dependency-valid subphases; for each, inspect -> design/Stitch if required
-> implement -> tests/a11y/security/architecture -> review/remediate ->
Conventional Commit -> push/PR -> CI -> merge -> verify remote main ->
record evidence -> clean merged branches -> continue the next safe subphase.
Do not pause for another copy-pasted prompt between subphases.

Stop before another major phase or an actual hard human stop.
Respect AI-DOS Sprint25 SPR25-007 payment/reconciliation truth and protect
real financial operations, production DB/deploy, secrets and provider activation.
Never invent evidence or mark DONE early. Report exact SHAs, gates, blockers
and the final major-phase disposition.
```

Replace the placeholder with the exact phase ID. The owner start must be explicit; this reusable template **does not** pre-authorize any currently unstarted phase.
