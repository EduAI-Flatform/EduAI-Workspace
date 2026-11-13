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

GDS_PLATFORM_STATUS=VERIFYING
GDS_PLATFORM_BASE_RELEASE_STATUS=DONE
GDS_PLATFORM_AUTHENTICATED_PRODUCTION_UAT=PARTIAL_READONLY_AND_BOUNDED_POLICY_LIFECYCLE_PASS_OTHER_SCENARIOS_PENDING
GDS_PLATFORM_NEXT_WORK=COMPLETE_ORIGINAL_PLAN_STAGES_5_AND_6_WITH_PRODUCTION_UAT
GDS_PLATFORM_CERTIFICATE_CACHE_FIX_STATUS=DONE
GDS_PLATFORM_CARD_CONTINUATION_STATUS=DONE
GDS_PLATFORM_CARD_CONTINUATION_SCOPE=SOURCE_IMPACT_ACTIVITY_ONBOARDING_RELEASE
GDS_PLATFORM_CARD_CONTINUATION_EVIDENCE=phases/GDS-PLATFORM/CARD-CONTINUATION.md
GDS_PLATFORM_ACTIVITY_POINTS_STATUS=DONE_SCOPED_NATIVE_LIFECYCLE_RELEASE
GDS_PLATFORM_ACTIVITY_POINTS_EVIDENCE=phases/GDS-PLATFORM/ACTIVITY-POINTS.md
GDS_PLATFORM_SOURCE_IMPLEMENTATION_AUTHORIZED=YES
GDS_PLATFORM_EVIDENCE=phases/GDS-PLATFORM/IMPLEMENTATION-RECEIPT.md
GDS_PLATFORM_PRODUCTION_DEPLOYMENT_AUTHORIZED=YES_SCOPED_GDS_RELEASE_2026_11_12
GDS_PLATFORM_PR_CI=PASS_FINAL_RELEASE_AND_CLEANUP_REVISIONS
GDS_PLATFORM_SOURCE_MERGE_HELD=NO_OWNER_EXPLICIT_SEQUENCE_AUTHORIZED_2026_11_12
GDS_PLATFORM_PRODUCTION_EVIDENCE=phases/GDS-PLATFORM/PRODUCTION-RECEIPT.md
GDS_PLATFORM_BACKEND_MAIN=e971125fe8878fec0f0cde8c14ad2fb9fd4ee660
GDS_PLATFORM_PACKAGE_RETIREMENT_EVIDENCE=phases/GDS-PLATFORM/PACKAGE-RETIREMENT.md
GDS_PLATFORM_FRONTEND_MAIN=7ff4f6a85966ddb7614b371433019cdf2f4f5d2a
GDS_PLATFORM_PRODUCTION_VERIFICATION=PASS_PUBLIC_SMOKE_WARM_CERTIFICATE_CACHE_POST_MERGE_CI_AND_SOURCE_BRANCH_CLEANUP
GDS_PLATFORM_RUNTIME_PERMISSION_MATRIX_APPROVED=YES_OWNER_2026_11_12
GDS_PLATFORM_LEGACY_CLEANUP_AUTHORIZED=YES_PRESERVE_PURCHASED_ACCESS_AND_HISTORY
GDS_PLATFORM_RELEASE_PREFLIGHT=phases/GDS-PLATFORM/RELEASE-PREFLIGHT.md
GDS_PLATFORM_BACKEND_PR=https://github.com/EduAI-Flatform/EduAI-Back-End/pull/31
GDS_PLATFORM_FRONTEND_PR=https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/31

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

## Direct environment UAT owner decision - 2026-10-30

The owner now explicitly authorizes PAYW-01B-UAT on the existing EduAI website/API and Neon project muddy-term-45367509 / branch br-late-flower-aoj42wzx / neondb, plus deployment of tested Frontend main through existing CD if stale. No new staging resource is required or permitted for this continuation. This supersedes only the earlier separate-staging prerequisite. Before any test write, verify snapshot/recovery, exact DB and bounded test identity/data scope. Payment guards, production NODE_ENV, existing financial records, public NO-GO and SPR25-007 remain protected. Current observations and remaining access are in phases/PAYW-01B-RECEIPT-STATEMENT-VERIFICATION/DIRECT-UAT-20261030.md; no E2E completion is asserted.

## PAYW-02 source start - 2026-11-03

The owner explicitly requests implementation of [PAYW-02 revenue sharing](../phases/PAYW-02-REVENUE-SHARING/README.md): configurable fees, seller participation, rule-based membership versions, monthly recognition/refund journal and reports. This is source/synthetic-test authorization despite unresolved upstream live gates; it does not assert those gates passed. PAYW-03 payouts, production deployment/migration, provider activation and real financial writes remain outside scope. Existing SPR25-007 state and completed-task evidence remain unchanged. PAYW-02 source state is IN_PROGRESS; no new DONE claim is made.
