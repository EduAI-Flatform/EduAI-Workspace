# Affiliate dashboard source acceptance

Checkpoint: 2026-11-17. This closes the nonzero read-model evidence gap separately
from financial activation. Main release and shipped-bundle checks are still tracked
below; the overall GDS plan remains under verification.

Backend PR65 invokes actual AffiliateService and PlatformSettingsService through
native Prisma in the guarded disposable PostgreSQL replay. Three owners prove
separate attributed-order counts, signed corrections, empty state and two identity
kinds. Owner results are3 referrals/80000 minor units,1/-5000 and0/0. An extra
unattributed visit and multiple accrual rows cannot inflate referral counts.
Actual QRCode generation matches each expected URL; missing public URL produces
no link/QR. Disabled policy and unavailable wallet reads do not fabricate balances.
Before/after identities, visits, attributions, accruals, orders, immutable lines,
wallet counts and actor audits match. No reconciliation or money posting is called.

Initial fixture replay failed at order creation with PostgreSQL23514: the existing
deferred order-total guard requires matching immutable lines at commit. The fix
seeds a canonical course/product and creates order/line in one transaction without
weakening guards. These pending orders and historical signed accruals are synthetic
read-model fixtures, not valid commission-earning or eligibility examples.

Final candidate94d016d65168a331c595477f4f5afc2799cd2f68 passed backend
CI44033775406 and PostgreSQL replay44033775486. Independent initial and fixture-fix
reviews found no substantive issues. Unsafe-target guard tests cover nine refusal
cases before imports; no.env or production credential is loaded by the script.
Merge:d9f288e914afc68560026bfa88c4c2992b310db8.

Frontend PR53 adds14 API-fixture Chromium cases: VI/EN at320,375,390,412,768,1024,
1440 px. Populated Dashboard/Withdraw/Performance preserve signed amounts, authored
content, canonical order/revision identifiers, link/code/QR and isolated mocked
clipboard behavior. Disabled or unavailable money states remain explicit. No
unexpected API, business write, runtime error or horizontal overflow was observed.
PNG rendering is checked; QR decoding is not claimed by the browser fixture.
Final candidate2875978dd67ee5366b4cbc2518448227c6487af9 passed all four frontend
CI jobs44000861814 and preview. Merge:60ce116cd3eeeccc806f4a602a2db0ed553811a9.

Production financial policies, commission rates, sub-affiliates and withdrawals
were not activated.

## Main release checkpoint

Backend main d9f288e914afc68560026bfa88c4c2992b310db8 matches the final tested
tree. Main CI44035044569, PostgreSQL replay44035044548 and deployment44035044556
passed. The merged temporary branch was removed remotely/locally after ancestry
verification and references were pruned.

Frontend main60ce116cd3eeeccc806f4a602a2db0ed553811a9 matches its tested tree.
Main CI44035043147 and deployment44035043447 passed. All14 Dashboard/Withdraw/
Performance fixture cases passed against shipped JavaScript at the seven required
widths in VI/EN, with zero unexpected APIs/writes/errors/overflow. This uses
intercepted synthetic data, not production commission activation. Home contrast
and remaining-system-label shipped fixtures separately passed five scenarios.
Both dashboard and Home-contrast temporary frontend branches were deleted
remotely/locally after main ancestry/gates; references were pruned.
