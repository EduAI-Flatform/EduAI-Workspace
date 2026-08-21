# Sprint 21 - Priority Product Experience Track

This is a high-priority product track added without changing the state of the
active Sprint 17 task. Canonical execution records live in
`.ai-dos/records/tasks.json`, `.ai-dos/records/sprint.json`, and
`.ai-dos/records/project.state.json`.

## Execution order

| Order | Task | Scope |
| ---: | --- | --- |
| 1 | SPR21-001 | Repository and AI-DOS product-track audit |
| 2 | SPR21-002 | Mobile UX token and typography foundation |
| 3 | SPR21-003 | Mobile bottom navigation contract and UI |
| 4 | SPR21-004 | Course price and promotion display contract |
| 5 | SPR21-005 | Responsive/mobile navigation regression coverage |
| 6 | SPR21-006 | Minimal course test fixture design (A: minimal fixture) |
| 7 | SPR21-007 | Minimal course test fixture implementation (A: minimal fixture) |
| 8 | SPR21-008 | Minimal course test fixture validation (A: minimal fixture) |
| 9 | SPR21-009 | Voucher domain and eligibility design |
| 10 | SPR21-010 | Voucher backend validation and redemption |
| 11 | SPR21-011 | Voucher admin management UI |
| 12 | SPR21-012 | Voucher learner experience |
| 13 | SPR21-013 | Voucher security and UAT |
| 14 | SPR21-014 | Scholarship domain and eligibility design |
| 15 | SPR21-015 | Scholarship backend |
| 16 | SPR21-016 | Scholarship learner/admin UI |
| 17 | SPR21-017 | Scholarship testing and UAT |
| 18 | SPR21-018 | TMI wallet and ledger design |
| 19 | SPR21-019 | TMI reward catalog |
| 20 | SPR21-020 | TMI redemption transaction |
| 21 | SPR21-021 | Learner rewards UI |
| 22 | SPR21-022 | Admin rewards UI |
| 23 | SPR21-023 | TMI concurrency/security verification |
| 24 | SPR21-024 | TMI production/UAT validation |
| 25 | SPR21-025 | PWA technical audit |
| 26 | SPR21-026 | PWA manifest, icons, and installability QA |
| 27 | SPR21-027 | Final demo course dataset design (B: final dataset) |
| 28 | SPR21-028 | Final demo course seed implementation (B: final dataset) |
| 29 | SPR21-029 | Integrated final demo dataset validation (B: final dataset) |
| 30 | SPR21-030 | Final integrated regression and UAT |

Tasks are intentionally dependency-ordered. Tasks 006-008 are minimal test
fixtures only; they do not represent the final demo catalog. The final demo
dataset is a P3 release-gated phase after Voucher, Scholarship, TMI Rewards,
and PWA work. The track does not copy Couponis/CreativeHub implementation or
introduce payment, WordPress, or Electron runtime dependencies.
