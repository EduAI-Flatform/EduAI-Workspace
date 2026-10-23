# PAYW-01B Stitch design

Existing checkout basis: project 18116946755394055085 / screen d4b5c0fc57c24ea9aa6e17379968d3ea. Inspected shared PaymentMethodChoice, BankTransferCheckout and AdminCommercePage before design.

New bounded Admin reference generated 2026-10-23 via Stitch MCP: project 18116946755394055085 / screen 2d7844baf0b949a79fee93d0f561b95b, title “Đối soát Ngân hàng Admin - EduAI PAYW-01B”. Two panes: receipt queue and separate buyer-claim versus incoming-bank-source details, 0/2 approval, unverified access badge and source-specific revocation/audit. Native implementation must reuse existing EduAI tokens and components.

Review constraints: reject generated claims of Napas/webhooks/verified integrations not in source; replace with owner-managed bank-app review. Do not enable payment confirmation directly from OCR. Second approval is submitted through existing API; do not create a UI deadlock requiring 2/2 before the second submission. Generated desktop design and responsive notes are references, NOT proof of seven-width runtime/a11y verification. Mobile composition, revoke confirmation and customer upload design still need concrete review before E implementation.
