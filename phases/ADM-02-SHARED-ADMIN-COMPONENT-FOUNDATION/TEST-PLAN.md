# ADM-02 Test Plan

Run focused component/navigation tests plus:

```text
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=high
```

Browser-check shell/navigation at all seven widths. Verify keyboard focus, drawer open/close/Escape/outside behavior as designed, active-route state, no body overflow and representative table-to-mobile-record behavior.
