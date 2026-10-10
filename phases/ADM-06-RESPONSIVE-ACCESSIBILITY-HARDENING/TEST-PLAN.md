# ADM-06 Test Plan

For every Admin route verify 320, 375, 390, 412, 768, 1024 and 1440.

Check:
- body overflow and text clipping;
- shell/drawer active state and dismissal;
- tables/cards/filter bars/pagination;
- modal/drawer sizing and scroll lock;
- keyboard navigation, Escape, outside click when applicable;
- focus visibility and focus restoration;
- touch targets and control labels;
- loading/empty/error states;
- reduced-motion compatibility.

Run the full frontend baseline and relevant Playwright/accessibility checks.
