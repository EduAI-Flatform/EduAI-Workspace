# Legacy package authoring retirement

Status: VERIFYING. The original GDS goal remains active; structured card benefit fulfillment and historical consumer cleanup are not complete.

The deployed checkout retirement still left old package catalog/authoring routes exposed. Backend [PR 41](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/41), reviewed `22a6503b9d135693fa16bdda63a4ce8cc2c4ec94`, retires the five Admin create/version/publish/course-benefit/service-benefit HTTP paths with `MEMBERSHIP_SALES_RETIRED` (410). The learner catalog now returns an empty items array and `salesRetired: true` without querying packages. Existing authentication, role guards and request validation remain unchanged.

Historical plan listing, current purchased membership, archives, emergency membership-derived course revocation and reusable service definitions remain available. Existing settlement, fulfillment, refund, continuity, grants, usage, balances and audit history are untouched. Internal authoring/checkout fixture helpers remain dependency-bound; this is not full code/table removal. The source diff contains no schema, environment, financial activation or frontend change.

Regression first failed for all five authoring methods and the catalog. After the fix, 118 tests across 16 membership/card/revenue-checkout suites and the Nest build passed. Existing preserved-operation delegation and RBAC metadata remain checked. [PR CI 43250014816](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43250014816) passed full backend regression/build and concurrent bank tests; [real PostgreSQL migration replay 43250014748](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43250014748) passed. Reviewed source merged at `e971125fe8878fec0f0cde8c14ad2fb9fd4ee660`. Final release evidence is recorded below.

## Observed production release

[Deployment 43250936940](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43250936940), [post-merge CI 43250937309](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43250937309) and [replay 43250937088](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/43250937088) passed at exact main `e971125fe8878fec0f0cde8c14ad2fb9fd4ee660`. Backend health returned 200. No migration was added.

Actual role acceptance on 2026-11-13 passed: student catalog returned the exact empty retired shape (200), existing current-membership lookup remained 200, Admin historical listing remained 200, and personal card reads returned 200 for all three synthetic roles. Cross-role accesses remained 403 and anonymous catalog/publish remained 401. Admin publication against a deliberately nonexistent version returned 410 with the retirement code; no real package was targeted. Student/instructor publication returned 403. Initial attempts used a saved previous-date access snapshot and returned 401 before exercising the retired route; all four ordinary authentication setup checks passed, then the complete role matrix passed with fresh sessions. This was not a product refresh test: the opaque probe bypasses the application's normal refresh path and blocks browser writes. Sanitized receipt: `.codex-artifacts/gds-production/package-retirement.json`.

The merged source branch was deleted remotely and locally only after exact tree, deployment, post-merge CI/replay and live acceptance; stale refs were pruned. Local/remote backend main match and the working tree is clean. This scoped retirement release is delivered; the entire original GDS goal remains VERIFYING.

## Bounded account acceptance

Fresh synthetic-role logins passed all four normal authentication setup checks. On the synthetic student profile, actual UI bio save, persistence after reload and exact original-bio restoration passed with two expected PUTs and zero unexpected writes. Existing public visibility was preserved. An initial private-profile-only precondition stopped without writes because this synthetic profile is public; the final test used harmless synthetic text and restored the original content, without changing visibility. Sanitized receipt outside Git: `.codex-artifacts/gds-production/profile-bio.json`. No user content, identity or credentials are copied into this document. This accepts bio editing only, not avatar/cover uploads, MFA or other account mutations.

Public operational configuration was read as `supportEnabled=false`, `invoiceRequestsEnabled=false` and `partnerApplicationsEnabled=false`. These settings were not changed to manufacture enabled-flow production acceptance. Disabled intake remains a supported state; actual enabled support/invoice/application lifecycle tests remain pending and distinct from source/fixture checks.

## Remaining original work

Finish structured card benefit fulfillment/provenance, migrate remaining legacy consumers before justified deletion, and complete the remaining bounded account/upload/support/invoice/MFA/course/quiz acceptance scenarios. The prior inventory found no verified missing paid-access repair case; do not create grants or money transactions merely to satisfy a checklist. A school adapter requires a future real partner contract. Canonical financial release records remain unchanged.
