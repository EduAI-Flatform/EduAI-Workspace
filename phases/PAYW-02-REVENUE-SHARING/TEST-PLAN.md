# PAYW-02 Test Plan

Use synthetic fixtures and isolated databases only. Never read credentials into evidence or operate on real financial records.

1. Allocation: discounted retail/member totals; fee endpoints 0/10000; positive weights; multiple courses per seller; deterministic largest remainder/tie order; exact conservation and large integer amounts.
2. Eligibility: AND criteria, omitted filters, ordered overlaps, all matching plans, override precedence, no-match consent, published/deleted/moderation transitions and seller exit.
3. Scheduling: immediate rejects days, delayed requires positive integer, correct effective instant, cancellation/replay, notification-before-activation, dilution recipients and current-participation reevaluation.
4. Database: real isolated transaction/constraint tests for checkout versus policy activation/join/exit, concurrent reconcilers, duplicate recognition and refund replay. Mock tests alone do not prove race safety.
5. Recognition: retail verified collection; receipt-only denial; actual subscription anchors, 31st/month-end and leap-year dates; future renewals; all months conserve total; missed runs catch up without duplicates; accounting failure preserves settlement.
6. Refund: partial/full before/after recognition, cumulative partial rounding, concurrent recognition/refund, replay and noncanonical duplicate-collection refund exclusion; access revocation remains distinct.
7. Security/API: unauthenticated/lower-role/admin/seller ownership matrix, bounded pagination, malformed arrays/rates/weights/date modes, financial data privacy and no admin-as-member-recipient.
8. Frontend: real service contracts, loading/empty/error/disabled states, no-match explanation, readable terms, percentage/weight preview, delayed-day validation, notices and report labels. Stitch before UI implementation. Browser inspect at 320/375/390/412/768/1024/1440 px; keyboard/focus/labels/touch, long Vietnamese copy, no body overflow or console errors.
9. Regression: existing checkout/PayOS/VNPay/bank/GDS settlement, fulfillment, membership continuity/grace, refund access and TMI separation. Run targeted Backend Jest, Prisma validation/build and Frontend lint/typecheck/unit/build; extend only for justified failures.
10. Workspace: npm run test:contracts and npm run test:workspace. Record observed exits and limitations, with no fabricated deployment/CI/production acceptance.
