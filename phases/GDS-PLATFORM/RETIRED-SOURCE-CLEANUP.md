# Retired membership source cleanup

Checkpoint: 2026-11-17. This supplements PACKAGE-RETIREMENT.md; earlier pending
statements retain their historical timing. Card service-limit fulfillment is
covered separately by SERVICE-LIMITS.md.

Backend PR63 removed five unreachable Admin package-authoring methods and their
exclusive helpers. The retired available-courses path returns410. Historical
listing, pricing snapshots, archival locks/audit and reusable service definitions
remain. The disposable revenue-lock fixture now exercises the retained archive
operation, including its missing-version result after lock acquisition.

Final candidate ffb344d7c4e30f4dad60edf36ccc59c825ae96b8 passed CI43996495894
and PostgreSQL replay43996495871. Merge5fc10a6bf214f5f74796f2f92998df7043d8e9f8
passed main CI43997509066, replay43997509177 and deployment43997509117.
Thirteen focused tests, build and independent review passed before release.

Backend PR64 removed unreachable catalog/checkout creation and exclusive product
and membership-change helpers. The current-membership historical read remains.
Disposable integration scripts now seed canonical draft-to-active products,
immutable order lines and original purchase intents transactionally, rather than
calling retired sales helpers. They continue exercising actual settlement,
fulfillment, refund, revoke/restore and spent-quota behavior; restored terms must
equal the original purchase intent. No database guard was disabled.

Final candidate1befff7d76de749dcc60cfe8181f8e7d66f0c226 passed CI43997661968
and replay43997661812. Mergeb35ecc578a070a3f9396e6574f3ec1afe3b759cd passed
main CI43999375422, replay43999375412 and deployment43999375490.
Sixty-four focused/retained tests, build, script syntax and independent review passed.

Both merged temporary branches were deleted remotely and locally after fetched
main ancestry, matching tested trees and required main gates; references were pruned.

These two releases remove approximately1,013 net implementation/test lines
(972 net lines including added handoff documentation) without schema changes.
Eleven legacy tables still have necessary historical access, fulfillment, refund
or revenue consumers. They are retained on that evidence, rather than dropped by
name. No account, balance, purchased right or immutable financial history was
deleted or recalculated. No package sale or financial policy was activated.

Rollback uses a reviewed source revert and normal deployment; it does not require
restoring deleted tables or rewriting historical transactions.
