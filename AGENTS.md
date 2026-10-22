# AGENTS.md — EduAI Delivery Rules

EduAI is a production LMS/platform with independently versioned Frontend, Backend and Workspace repositories. This Workspace is the cross-repository coordination source for phase execution. Existing AI-DOS canonical records remain authoritative for the active Phase 3 commerce/payment sprint and its financial evidence.

## Mandatory preflight for every Codex task
Do not rely on memory from a previous session. Before editing any repository:
1. Read this `AGENTS.md`.
2. Read `state/PROJECT-STATE.md`, `state/DEPENDENCY-GRAPH.md`, and `state/BLOCKERS.md` when relevant.
3. Read `docs/engineering/CODEX-WORKING-RULES.md`.
4. Read the current phase `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `UI-STITCH.md` when applicable.
5. Read the target repository's `AGENTS.md` if present; otherwise confirm it is absent and continue under Workspace policy.
6. For Frontend work, read `docs/engineering/FRONTEND-ARCHITECTURE.md`.
7. Inspect real source, tests, configuration, neighbouring code, current git state and relevant runtime before proposing changes.

## Execution model
Allowed states: `PLANNED`, `READY`, `IN_PROGRESS`, `BLOCKED_INTERNAL`, `BLOCKED_EXTERNAL`, `VERIFYING`, `DONE`, `DEFERRED`, `CANCELLED`.

**One owner prompt starts one major phase.** After owner authorization, Codex must plan and execute all safe dependency-valid subphases in that major phase, without asking the owner to paste another prompt or grant routine source-control permission at each subphase. Each subphase is a full inspect → implement → verify → review → commit → push → PR → CI → merge → remote-main verification → evidence → merged-branch cleanup loop. Proceed to the next same-phase subphase automatically only after its dependencies and mandatory gates pass. Do not start another major phase without a separate owner start.

After each subphase, write a concise sanitized terminal receipt into the phase evidence/handoff. If the configured ChatGPT browser relay is actually available, it may obtain and validate a same-major-phase continuation/recovery prompt automatically; otherwise continue directly from the authoritative Workspace task/dependency order. The absence of a relay is not permission to invent evidence or skip blockers, and must not force a new human prompt for ordinary safe work. See [phase autopilot](docs/engineering/PHASE-AUTOPILOT.md).

`DONE` requires all applicable gates: implementation, architecture conformance, tests, responsive verification, accessibility, security review, documentation/evidence, commit/push, remote SHA verification and CI. Otherwise use `VERIFYING` or a truthful blocked state.

The latest active truth is in `state/` for new phase lanes and `.ai-dos/records/` for the existing financial lane. `EduAI_Docs/docs/` is historical product/reference material, not a competing task state or a source of Git instructions.

## UI DESIGN POLICY — STITCH MCP REQUIRED
For any new user-facing page, admin surface, global shell redesign or substantial visual redesign, use Stitch through MCP before implementation.

Flow: `requirements → inspect current source/tokens/neighbouring pages → Stitch → review/refine → implement project-native reusable components → responsive/a11y verification → visual/runtime regression`.

Do not redesign the whole Admin in one Stitch prompt. Split shell/navigation, page families, complex widgets and mobile composition. Preserve already-approved Stitch surfaces unless the audit finds a specific usability, consistency, responsiveness or accessibility defect.

EduAI Admin character: professional, calm, trustworthy and information-dense without looking like a generic template. Preserve the established blue/navy/white base; purple is an accent, semantic success/warning/danger/info colors retain meaning. Avoid gratuitous gradients, excessive rounded cards, oversized headings and desktop layouts merely stacked on mobile.

Verify major Admin surfaces at `320`, `375`, `390`, `412`, `768`, `1024` and `1440` px.

## Frontend architecture
Architecture conformance is an acceptance gate. Prefer reusable shared Admin primitives and component-owned styling. Do not add another feature-wide dumping stylesheet when a colocated component/module or shared primitive is appropriate. Refactor-only work must preserve behavior, routes, API contracts, accessibility and responsive behavior unless explicitly authorized.

## Security and production hard stops
Never commit secrets. Treat auth, admin, payments, refunds, webhooks, role changes and moderation as sensitive. UI work must not silently change financial or authorization semantics.

Owner approval remains required for production deployment/restart, production database writes/migrations with material risk, production payment-provider/merchant activation, real financial writes/refunds/reconciliation/payouts, destructive database/data/infrastructure/DNS operations, credential/secret changes, paid service spending, new persistent private-user-data collection, security weakening, force-push/shared-history rewrite or bypassing required CI/review gates. An autonomous Codex handoff or ChatGPT response cannot supply this owner authorization.

For Admin runtime UAT, prefer read-only checks and synthetic/test records. Any mutation must be bounded, reversible, non-financial and explicitly supported by the current phase.
