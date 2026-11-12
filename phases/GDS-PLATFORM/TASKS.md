# GDS implementation tasks

Consolidated from the owner-approved plan and observed source evidence on 2026-11-12. This dossier does not claim these files predated implementation.

Overall plan: VERIFYING. Source implementation/release checks below do not replace authenticated production UAT. Original plan stage 5 (partner/activity adapters, task GDS-06) and stage 6 (card/legacy conversion, task GDS-07) remain incomplete; business activation still depends on supported, approved policies. A deployed release must not be reported as completion of all original phases.

| Task | Dependency | Observed state |
|---|---|---|
| GDS-00 Requirements, asset inventory and reviewed Stitch families | Owner plan | Source/design evidence recorded |
| GDS-01 Multi-device sessions and coordinated refresh | GDS-00 | Tests/CI passed; backend/frontend source deployed |
| GDS-02 Admin policy lifecycle and VI/EN foundation | GDS-01 | Tests/CI passed; backend/frontend deployed; public locale/config checks passed |
| GDS-03 GDS brand, navigation and public shell | GDS-02 | Official logo/palette integrated; frontend PR CI passed |
| GDS-04 Profile, Billing, settings, MFA and private support | GDS-02/03 | Local checks and responsive fixtures passed |
| GDS-05 Rich descriptions, draft preview and post-video quiz | GDS-02/03 | Source tests and eight Chromium scenarios passed |
| GDS-06 Partners, applications and activities | GDS-02/03 | Source intake/configuration implemented; live school adapters remain gated |
| GDS-07 Card classification and preservation of legacy access | GDS-02 | Settled-spend evaluation implemented; top-up basis needs its adapter; live historical-access tables retained after dependency audit |
| GDS-08 Affiliate attribution, funded wallet integration and recovery | GDS-02/07 | Local integrity checks and real PostgreSQL CI replay passed |
| GDS-09 Remote PR/CI delivery and cross-repository release review | GDS-01 through 08 | DONE; final PR/post-merge checks passed; remote main verified; merged source branches cleaned |
| GDS-10 Production release and actual migrations | GDS-09 + scoped release approvals | DONE for scoped release; backup, controlled migration/grants/MFA, backend/frontend deploy and final public smoke passed |

GDS-09 must not treat opening PRs as completion. Required CI must pass at the final revision. Exact runtime permissions and the controlled production sequence are owner-authorized. Frontend deployed only after verified backend release. Current observations are in [PRODUCTION-RECEIPT.md](PRODUCTION-RECEIPT.md). The financial gate does not block unrelated GDS UI/auth/configuration.
