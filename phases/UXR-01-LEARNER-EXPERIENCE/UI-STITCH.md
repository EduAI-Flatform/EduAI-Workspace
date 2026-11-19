# UXR-01 — Stitch design brief and verification state

## Source of truth
Owner supplied desktop screenshots of EduAI public navigation, learner Dashboard/Profile, AI/Library/Certificates, language/account dropdowns, Billing mock and GDS brand palette.

## Target visual direction
- Reuse GDS design tokens: #4700F4 violet, #E71F69 magenta, #00A89F teal, #7A8AD9 blue and #A97DFF lavender.
- Public and learner account surfaces share account avatar/dropdown/language controls.
- Sidebar organizes account management without duplicating public navigation.
- Learner dashboard highlights next action, courses, learning progress and upcoming classes only.
- Profile presents summary cards with modal/drawer editing; keep technical IDs out of dropdown.
- Billing and membership use restrained, accessible visual hierarchy, truthful statuses and clear actions.

## Required Stitch MCP workflow
requirements → inspect tokens/source → Stitch concept/refinement → review/refine → project-native implementation → responsive/a11y screenshots.

**Observed tool limitation:** the available connected tool inventory for this ChatGPT execution session does **not** provide a Stitch MCP action. Therefore no Stitch concept, generated screenshot, Stitch revision, or approval is claimed. Frontend source implementation is staged for review in PR #54; visual acceptance is still pending. No substitute tool has been silently declared equivalent to Stitch.

## Approval and evidence gate
Before PR merge, obtain documented Stitch design review or explicit owner-approved substitution, responsive/keyboard visual comparisons, exact-head CI PASS, and accessible synthetic + existing-browser UAT. Do not claim production approval.
