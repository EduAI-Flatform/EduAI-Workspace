# GDS implementation tasks

Consolidated from the owner-approved plan and observed source evidence on 2026-11-12. This dossier does not claim these files predated implementation.

Overall plan: VERIFYING. The original-plan itemized audit is `PLAN-COMPLETION-AUDIT.md`; it separates evidence from remaining review/implementation and original conditional capabilities. Source/API-fixture/database/actual production checks prove their stated scopes. Real school connections and undeclared business activation retain their original prerequisites. A deployed release must not be reported as completion of all original phases.

| Task | Dependency | Observed state |
|---|---|---|
| GDS-00 Requirements, asset inventory and reviewed Stitch families | Owner plan | Source/design evidence recorded |
| GDS-01 Multi-device sessions and coordinated refresh | GDS-00 | Tests/CI passed; backend/frontend source deployed |
| GDS-02 Admin policy lifecycle and VI/EN foundation | GDS-01 | Tests/CI passed; backend/frontend deployed; public locale/config checks passed |
| GDS-03 GDS brand, navigation and public shell | GDS-02 | Official logo/palette integrated; frontend PR CI passed |
| GDS-04 Profile, Billing, settings, MFA and private support | GDS-02/03 | Actual account read-only/bio, fresh-login MFA and portfolio image upload/reload/storage cleanup passed; restricted real PostgreSQL support/image/partner/invoice intake passed; avatar/cover and remaining production request acceptance are separate |
| GDS-05 Rich descriptions, draft preview and post-video quiz | GDS-02/03 | Video timestamp/checkpoint defects fixed and deployed; actual private author draft/native lesson-video upload/CORS/preview/cleanup, nine Chromium scenarios on local/deployed code and real PostgreSQL progress reload/replay passed; governed Admin quiz defaults and instructor override boundaries released with actual read-only seven-width VI/EN acceptance; full learner-quiz lifecycle remains separate |
| GDS-06 Partners, applications and activities | GDS-02/03 | Intake/review, VI/EN onboarding, strict activity validation and governed connection metadata delivered; catalog visibility flag fixed with actual/deployed-fixture acceptance; provider-neutral adapter/education-ID/reconciliation design documented; actual school adapters follow a future partner contract |
| GDS-07 Card classification and preservation of legacy access | GDS-02 | Spend/top-up classification, arbitrary Admin tiers, consumed-quota impact, governed service-limit runtime and native Admin/learner/catalog controls deployed with PostgreSQL and production read-only evidence; actual business terms remain inactive, historical dependency cleanup requires continued audit |
| GDS-08 Affiliate attribution, funded wallet integration and recovery | GDS-02/07 | Local integrity checks and real PostgreSQL CI replay passed |
| GDS-09 Remote PR/CI delivery and cross-repository release review | GDS-01 through 08 | DONE; final PR/post-merge checks passed; remote main verified; merged source branches cleaned |
| GDS-10 Production release and actual migrations | GDS-09 + scoped release approvals | DONE for scoped release; backup, controlled migration/grants/MFA, backend/frontend deploy and final public smoke passed |

GDS-09 must not treat opening PRs as completion. Required CI must pass at the final revision. Exact runtime permissions and the controlled production sequence are owner-authorized. Frontend deployed only after verified backend release. Current observations are in [PRODUCTION-RECEIPT.md](PRODUCTION-RECEIPT.md). The financial gate does not block unrelated GDS UI/auth/configuration.
