# GDS implementation tasks

Consolidated from the owner-approved plan and observed source evidence on 2026-11-12. This dossier does not claim these files predated implementation.

| Task | Dependency | Observed state |
|---|---|---|
| GDS-00 Requirements, asset inventory and reviewed Stitch families | Owner plan | Source/design evidence recorded |
| GDS-01 Multi-device sessions and coordinated refresh | GDS-00 | Local tests passed; backend PR CI pending |
| GDS-02 Admin policy lifecycle and VI/EN foundation | GDS-01 | Local source/browser checks passed; PR CI pending |
| GDS-03 GDS brand, navigation and public shell | GDS-02 | Official logo/palette integrated; frontend PR CI pending |
| GDS-04 Profile, Billing, settings, MFA and private support | GDS-02/03 | Local checks and responsive fixtures passed |
| GDS-05 Rich descriptions, draft preview and post-video quiz | GDS-02/03 | Source tests and eight Chromium scenarios passed |
| GDS-06 Partners, applications and activities | GDS-02/03 | Source intake/configuration implemented; live school adapters remain gated |
| GDS-07 Card classification and preservation of legacy access | GDS-02 | Settled-spend evaluation implemented; top-up basis and destructive legacy cleanup remain gated |
| GDS-08 Affiliate attribution, funded wallet integration and recovery | GDS-02/07 | Local data-integrity checks passed; real PostgreSQL CI replay pending |
| GDS-09 Remote PR/CI delivery and cross-repository release review | GDS-01 through 08 | IN_PROGRESS; backend/frontend PR #31 opened |
| GDS-10 Production release and actual migrations | GDS-09 + explicit release approvals | NOT AUTHORIZED; preserve SPR25-007 |

GDS-09 must not treat opening PRs as completion. Required CI must pass at the final revision. Merge of source PRs is held because frontend main triggers production deployment. Workspace documentation may be integrated independently after its own conformance check.
