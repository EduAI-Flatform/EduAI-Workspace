# Frontend Architecture Baseline — EduAI Admin

## Purpose

Keep Admin UI maintainable while the current mixed-generation screens are normalized and completed.

## Component ownership

- Reusable Admin primitives belong in a coherent shared Admin component layer.
- Component-specific styling should be colocated with the component/module when practical.
- Do not expand a monolithic feature stylesheet to own unrelated page/component styling.
- Page components primarily compose UI, routing and feature orchestration.
- API access stays in services; pure mapping/formatting stays outside render code.

## Shared Admin primitives

The ADM-02 audit should converge on reusable equivalents of:

- `AdminShell`
- `AdminSidebar`
- `AdminMobileHeader`
- `AdminNavigationDrawer`
- `AdminPageHeader`
- `AdminMetricCard`
- `AdminPanel`
- `AdminFilterBar`
- `AdminSearchField`
- `AdminDataTable`
- `AdminMobileRecordCard`
- `AdminStatusBadge`
- `AdminActionMenu`
- `AdminConfirmDialog`
- `AdminFormDialog`
- `AdminDetailDrawer`
- loading / empty / error states

Names may change after source audit. Do not create abstractions that the actual application does not need.

## Design tokens

Prefer existing global tokens before adding one-off literals. Preserve EduAI's blue/navy/white foundation. Purple is secondary/accent; success, warning, danger and info colors are semantic.

## Responsive behavior

Desktop table layouts are not sacred on mobile. Where information density would make a table unusable at 320–412 px, use a deliberate mobile record/card presentation with equivalent actions and semantics. Avoid body-level horizontal scrolling.

Mobile navigation should prioritize a usable drawer/sheet pattern once ADM-01 approves the shell rather than forcing a long horizontally scrolling list of Admin destinations.

## Accessibility

All controls need keyboard operation, visible focus, correct labels/names, semantic status communication and adequate touch targets. Dialog/drawer focus trapping and dismissal behavior must be verified. Color alone must not encode state.

## Refactor rule

A refactor that claims to preserve behavior must actually preserve routes, API contracts, status semantics, role authorization, accessibility and responsive behavior unless the phase explicitly authorizes a change.
