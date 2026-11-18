# UXR-01 acceptance gate

01A:
1. Public header learning opens an independent /study route; public certificates opens /certificates, with private data accessible only to signed-in users.
2. Existing /dashboard/learning and /dashboard/certificates links remain compatible, preserving access controls.
3. Student sidebar has grouped, logical navigation and no redundant Library/Community/AI/Certificates links; feature routes remain available publicly.
4. Student account navigation (Billing, Wallet, Membership, Settings, Support, Profile, Affiliate if eligible) preserves Dashboard shell, including supported order deep links.
5. Role checks for student, instructor and platform admin remain intact.
6. Locale and navigation settings loaded from API cannot override the two public destinations to legacy account routes.
7. Page transitions begin at top; POP restores position; anchors work without sticky-header concealment.
8. Unit, lint/typecheck, build, browser UAT, responsive & a11y tests PASS, then reviewed PR/CI/merge and main verification. No manual bypass.

Other subphases require corresponding reviewed design and QA evidence. Financial semantics unchanged.

No production deployment without explicit owner approval.
