# SPR21-024 — TMI Rewards UAT and release runbook

## Scope

TMI Rewards is a points/entitlement feature. TMI is not a payment, cash,
wallet, or money-equivalent claim. Production verification is read-only unless
a separate bounded UAT authorization explicitly permits a mutation.

## Verified journey

- Learner wallet: current, earned, spent, and expired totals.
- Learner catalog: only active rewards inside their redemption window and
  below quota are returned.
- Redemption: the backend reads the authoritative reward cost; the request
  accepts only an idempotency key.
- Entitlement and history: redemption creates one entitlement and one debit
  ledger entry transactionally; replay is idempotent.
- Admin operations: reward catalog, sanitized redemption/ledger history,
  audited balance adjustment, and refund are role protected.
- Disabled, expired, insufficient-balance, and exhausted-quota paths reject
  safely without partial redemption state.

## Deployment and migration

1. Run Prisma generation, `npm run prisma:migrate:deploy`, backend tests/build,
   frontend tests/build, and the focused learner/admin browser checks.
2. Deploy the backend and frontend revisions through the existing VPS workflow.
3. Verify `/health`, `/api/docs-json`, learner TMI routes, and admin TMI routes
   with the approved test accounts. Record only statuses and aggregate results;
   never record tokens, passwords, response bodies, or private identifiers.
4. Do not run `db:seed:demo` against production. Demo seed remains a local/Neon
   test operation.

## Disable and rollback

- Immediate feature disable: mark the affected reward `disabled` through the
  guarded admin operation. Existing ledger and entitlement history is retained.
- Application rollback: redeploy the last known-good backend/frontend revision
  and rerun health, role, and read-only TMI checks.
- Database rollback: do not reverse an applied additive migration destructively.
  Preserve ledger history, fix forward, or restore only under the database
  recovery procedure after an explicit operator decision.
- After a failed redemption or deploy, verify no extra redemption, debit,
  entitlement, or audit record was created before retrying.

## Evidence for this task

- Local learner/admin UAT: 8/8 browser checks passed at 320px and 1440px.
- Production learner UAT: wallet/catalog/history returned HTTP 200 at 320px and
  1440px; no console errors or horizontal overflow.
- Production admin UAT: catalog/redemption/ledger returned HTTP 200 at 320px and
  1440px; no console errors or horizontal overflow.
- Neon integration: exact-once replay/refund and quota-one concurrency passed.
- Production mutation was not performed; test writes were isolated to Neon.
