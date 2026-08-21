# 14-stitch-ui-reference.md

# Stitch UI Reference

## Purpose

Use this file when implementing or adjusting frontend body content for EduAI pages.

Before designing a page body, find the matching Stitch screen below and keep the layout, density, visual hierarchy, and component style close to that reference.

Source project:

- Stitch project ID: `13344636180266816510`
- Project title: `Remix of Next-Gen AI Learning Hub`
- Theme name: `Cognitive Nexus`
- Device baseline: desktop

## Design Direction

EduAI UI should match the Cognitive Nexus direction:

- Modern AI learning platform.
- Clean, premium, educational, trustworthy.
- Soft glassmorphism for AI or insight sections.
- Spacious layouts with strong card hierarchy.
- Cyber blue for primary actions and navigation.
- Purple for AI features, generated insights, and smart recommendations.
- Emerald for success, completion, certificates, and verified states.

Avoid:

- Generic Bootstrap admin template.
- Dense ERP-style screens.
- Moodle-like legacy education UI.
- Heavy single-color pages.
- Body layouts unrelated to the matching Stitch screen.

## Tokens

Primary colors:

- Primary blue: `#0058be`
- Primary container: `#2170e4`
- Secondary purple: `#6b38d4`
- Secondary container: `#8455ef`
- Tertiary emerald: `#006947`
- Tertiary container: `#00855b`
- Background: `#faf8ff`
- Surface: `#faf8ff`
- Surface container: `#eaedff`
- Text: `#131b2e`
- Muted text: `#424754`
- Outline: `#727785`

Typography:

- Headings: `Plus Jakarta Sans`
- Body and labels: `Inter`
- Large display: 48px / 56px / 800
- Large headline: 32px / 40px / 700
- Medium headline: 24px / 32px / 600
- Body: 16px / 24px / 400
- Label: 14px / 20px / 600

Shape and spacing:

- Base spacing unit: 8px.
- Desktop container max: 1280px.
- Desktop outer margin: 40px.
- Mobile margin: 16px.
- Standard controls: 8px radius.
- Cards/modals: 16px radius.
- AI modules: 24px radius.

## Body Layout Rules

- Build the actual app body first; do not create marketing filler for authenticated screens.
- Use the Stitch page with the closest role and feature as the body reference.
- If Stitch MCP is available, call `mcp__stitch.list_screens` and `mcp__stitch.get_screen` for the matching screen ID before implementation. Do not rely only on this markdown summary when live Stitch screen data can be fetched.
- For auth pages specifically, match the Stitch standalone auth layout: no app header, split desktop screen, large learning illustration panel, compact form card, social divider/actions, and footer links.
- Keep nav/sidebar/header separate from the body, but align body spacing and card style with the reference.
- Put Stitch-matched shared styling in the feature CSS file, and component-specific styling beside the TSX file, for example `AuthPageShell.tsx` with `AuthPageShell.css`; keep TSX focused on structure and semantic state classes.
- Use white or light surface cards with soft borders and subtle shadows.
- Use glassmorphic treatment only for AI insight panels, overlays, and smart recommendation blocks.
- Use icon-plus-label controls for major actions; use Lucide icons where available.
- For dashboard bodies, prefer metric cards, progress panels, task queues, charts, and recent activity.
- For learning bodies, prioritize course progress, lesson navigation, content area, AI support, and next actions.
- For admin/instructor bodies, prioritize operational scanning: tables, stats, filters, and queues.
- For certificate bodies, emphasize trust, verification, QR/signature cues, and emerald success states.

## Page Reference Map

Use these screen IDs when a task touches the related page body.

| EduAI page/body | Stitch title | Screen ID |
|---|---|---|
| Home / landing | Trang chu AILearn | `17d69a62c1d34d11b8eab2b10815c8c4` |
| Login | Dang nhap - AILearn | `576421bb362e4d2fb18c15f712642a95` |
| Register | Dang ky - AILearn | `56c6bb17feba4ef29f27e51bde612fc7` |
| Student dashboard | Dashboard Sinh Vien - AILearn | `73ec91539e3041d99e5ebef1558af64a` |
| My learning / enrolled courses | My Learning - AILearn | `6f1296241556437f9f584c0b0db653fb` |
| Course detail | Chi tiet khoa hoc - AILearn | `f0b7c35ef5fa412497fb9c1aca55130c` |
| Lesson learning page | Hoc bai - AILearn | `01cb3b51fa0d415782b76ae168306471` |
| Assignment / exercise page | Lam bai tap - AILearn | `98ae035b0a8e4f16b18188a57c669f70` |
| Online classroom | Lop hoc truc tuyen - AILearn | `f54c3abf94834954bfb9c4ac76fa5fee` |
| AI assistant | Tro ly AI - AILearn | `4fa62ab0d1874903bb03cba25ccd2524` |
| Community | Cong dong - AILearn | `b09cc96ba7c24686bc60bcf7d454935d` |
| Profile | Ho so ca nhan - AILearn | `78d2eb58ee11464ababf25df7c3e3ab4` |
| Digital library | Thu vien so - AILearn | `a76de3ae79cc40ba8acc203e8dc24394` |
| Certificates | Chung chi - AILearn | `456e2bd450744ef4b123a6df6f29b800` |
| Certificate verification | Xac thuc chung chi - AILearn | `2bf7ec8afd434c26920e235e30854076` |
| Instructor dashboard | Dashboard Giang vien - AILearn | `a5cec55680da47fa9c5bfd7662cf51eb` |
| Admin dashboard | Dashboard Quan tri - AILearn | `3a9a540ac8da4259a083a9c02b49fbb5` |

## Supporting Asset References

Use these when a page needs matching image direction.

| Asset use | Screen ID |
|---|---|
| Dashboard mockup image | `efe9e354e848484db45dc9be4ce92e16` |
| Student lab group photo | `a0e7f5e071d347d590b63b6a44907282` |
| AI learning profile mockup | `aac2e686a9f440c2afb16d85c3be1b90` |
| AI/ML course thumbnail | `1c61a821e69a4ffe9686660610e0243f` |
| Advanced AI course hero banner | `8fdafb5f05084c13a23e9d758ca00504` |
| Student dashboard hero banner | `8a73ddfaf8b949ceb4a04de68a7949a7` |
| Video lecture/player image | `5ea0d9625815412a8837aba378d6010e` |
| Digital library hero banner | `bd5293c7a0b64d2483bf97f63f38a69b` |
| AI classroom illustration | `1700bc63b1e44220b857ba0fb2003b91` |
| AI ethics document thumbnail | `079c986d27e24ce8bfd8b0059a240040` |
| Neural networks video thumbnail | `f26ec54b450f494ea14047e2177e0172` |
| Data science course thumbnail | `bc2afa74a6664961b53e1373f42899bf` |
| Digital marketing AI thumbnail | `bc7aa34a9e574a5cb372110b47e4fc22` |
| Research paper PDF thumbnail | `71892b10cecd44aabb5dddfa434b4af5` |
| Admin dashboard hero banner | `4b8fcbdbcac345d9a44ab9f7490f5dc3` |
| Certificate verification background | `0ddf7b339c3249b3b414836c3b10b955` |
| Instructor dashboard hero banner | `0c06faf94d9d427b970d670efbd86163` |

## Agent Rule

For future frontend tasks:

1. Read `docs/09-ui-ux-guidelines.md`.
2. Read this file.
3. Match the target route/page to the Stitch screen ID.
4. When Stitch MCP is connected, fetch the live screen with `mcp__stitch.get_screen` and inspect its screenshot/HTML metadata before coding.
5. Design the body to resemble that screen's structure and visual treatment.
6. Keep implementation minimal and compatible with the current frontend codebase.
