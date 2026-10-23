# EduAI Project State

This file is the human-readable phase-orchestration state. Financial/payment execution state remains canonical in `.ai-dos/records/`.

```text
PROJECT=EduAI
PROJECT_STATUS=IN_PROGRESS
PRODUCTION_TARGET=https://eduai.giaoducso.org.vn

AI_DOS_ACTIVE_SPRINT=SPRINT:25
AI_DOS_ACTIVE_RELEASE_GATE=SPR25-007
AI_DOS_PAYMENT_STATE_AUTHORITY=.ai-dos/records
AI_DOS_STATE_PRESERVED=YES

ADMIN_UI_PROGRAM_STATUS=PLANNED
ADMIN_UI_CURRENT_PHASE=NONE
ADMIN_UI_NEXT_ELIGIBLE_PHASE=ADM-00
ADMIN_UI_PHASE_EXECUTION_AUTHORIZED=NO
ADMIN_UI_ROADMAP=phases/ADMIN-UI-ROADMAP.md

STITCH_MCP_REQUIRED_FOR_SUBSTANTIAL_UI=YES
RESPONSIVE_WIDTHS=320|375|390|412|768|1024|1440
MAJOR_PHASE_BOUNDARY_HUMAN_STOP=REQUIRED
SAME_PHASE_AUTONOMOUS_EXECUTION=AUTHORIZED_AFTER_OWNER_START
AUTO_COMMIT_PUSH_PR_CI_MERGE_CLEANUP=AUTHORIZED_AFTER_OWNER_START_AND_GATES
ONE_PROMPT_PER_MAJOR_PHASE=YES
AUTO_SUBPHASE_CHAINING=AUTHORIZED_AFTER_OWNER_START
SAME_PHASE_AUTOMATIC_CONTINUATION=AUTHORIZED_AFTER_OWNER_START_AND_GATES
SUBPHASE_BOUNDARY_HUMAN_STOP=DISABLED
SUBPHASE_TERMINAL_RECEIPT=REQUIRED
CHATGPT_RELAY=OPTIONAL_WHEN_CONFIRMED_AND_AVAILABLE
WORKSPACE_EXECUTION_CONTRACT=docs/engineering/PHASE-AUTOPILOT.md
PAYMENT_ACTIVATION_HUMAN_STOP=REQUIRED
REAL_FINANCIAL_WRITE_HUMAN_STOP=REQUIRED
PRODUCTION_DESTRUCTIVE_ACTION_HUMAN_STOP=REQUIRED
PRODUCTION_DEPLOY_RESTART_HUMAN_STOP=REQUIRED
PRODUCTION_DB_WRITE_OR_MIGRATION_HUMAN_STOP=REQUIRED
SECRETS_ENV_CHANGE_HUMAN_STOP=REQUIRED
FORCE_PUSH_HISTORY_REWRITE_HUMAN_STOP=REQUIRED
```

## Admin phase states

| Phase | State | Dependency | Execution |
|---|---|---|---|
| ADM-00 | READY | Existing Admin baseline | Not started |
| ADM-01 | PLANNED | ADM-00 DONE | Not started |
| ADM-02 | PLANNED | ADM-01 DONE | Not started |
| ADM-03 | PLANNED | ADM-02 DONE | Not started |
| ADM-04 | PLANNED | ADM-03 DONE | Not started |
| ADM-05 | PLANNED | ADM-04 DONE | Not started |
| ADM-06 | PLANNED | ADM-05 DONE | Not started |
| ADM-07 | PLANNED | ADM-06 DONE | Not started |

Creating this planning dossier does not authorize `ADM-00` implementation. When the owner explicitly starts `ADM-00`, update `ADMIN_UI_CURRENT_PHASE`, authorization and phase state before implementation.

## Payment & Wallet program state (independent lane)

```text
PAYW_PROGRAM_STATUS=IN_PROGRESS
PAYW_CURRENT_PHASE=PAYW-01
PAYW_CURRENT_PHASE_STATUS=BLOCKED_EXTERNAL
PAYW_SAFE_IMPLEMENTATION_STATUS=DONE
PAYW_FINAL_DOCUMENTATION_RECEIPT=phases/PAYW-01-MANUAL-VIETQR/EVIDENCE.md
PAYW_OWNER_START_AUTHORIZED=YES
PAYW_NEXT_MAJOR_PHASE_AUTHORIZED=NO
PAYW_SAFE_IMPLEMENTATION_AUTHORIZED=YES
PAYW_PRODUCTION_STATUS=BLOCKED_EXTERNAL
PAYW_ROADMAP=phases/PAYMENT-WALLET-ROADMAP.md
PAYW_TMI_POINTS_ISOLATED=YES
PAYW_PRODUCTION_PAYMENT_ACTIVATION_AUTHORIZED=NO
PAYW_REAL_FINANCIAL_WRITES_AUTHORIZED=NO
```

`PAYW-00` is design/audit only. No new money flow is live. Phase status may
become DONE only after accepted architecture/financial decision gates and
applicable evidence. Its documentation PRs and main conformance CI were
previously verified, but the ADR/owner legal-business decisions remain unresolved.
Historical temporary-branch cleanup was verified on 2026-10-22 (PAYW-00/EVIDENCE.md). The `SPR25-007` financial release
gate and `SPRINT:26` Analytics track remain unchanged.

## PAYW-01 safe owner start - 2026-10-22

Owner explicitly starts [PAYW-01](../phases/PAYW-01-MANUAL-VIETQR/README.md) design/source/synthetic tests/docs despite unresolved PAYW-00 decisions. PAYW-00 remains VERIFYING; ADR-006 is not accepted. This scoped implementation exception leaves PAYW-D01/D08 OPEN and production BLOCKED_EXTERNAL. No production/real financial writes or PAYW-02 are authorized; SPR25-007 and AI-DOS remain unchanged.


## PAYW-01B owner start and public GO-LIVE boundary — 2026-10-23

```text
PAYW_01B_PHASE=PAYW-01B-RECEIPT-STATEMENT-VERIFICATION
PAYW_01B_OWNER_SAFE_SOURCE_START=AUTHORIZED
PAYW_01B_SAFE_IMPLEMENTATION_STATE=IN_PROGRESS
PAYW_01B_PUBLIC_REAL_MONEY_GO_LIVE=BLOCKED_EXTERNAL
PAYW_01B_OWNER_BANK_APP_STATEMENT_SOURCE=REPORTED_SCOPE_UNVERIFIED
PAYW_01B_SCREENSHOT_AS_FINANCIAL_PROOF=PROHIBITED
PAYW_01B_EARLY_FULL_ENTITLEMENT=OWNER_REQUESTED_NOT_RELEASE_APPROVED
PAYW_01B_TWO_OPERATOR_ALTERNATIVE=UNDECIDED
PAYW_01B_DOSSIER=phases/PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/README.md
```

This is an explicitly owner-started **parallel safe source phase**, not completion or replacement of PAYW-01-LIVE. `PAYW_NEXT_MAJOR_PHASE_AUTHORIZED=NO` still forbids starting PAYW-02. Owner now reports viewing transactions through a bank app, but has not clarified whether it shows incoming corporate MB credits or payer-side outgoing receipts. Therefore D01/D08, `SPR25-007`, production guard and release hard stops remain open. User-requested immediate full access from a photo must never be represented as verified PAID. No real-world activation was executed by this documentation update.
