# EduAI Workspace

Workspace điều phối phát triển liên repository cho **EduAI**.

## Repositories

- Frontend: `EduAI-Flatform/EduAI-Front-End-Web`
- Backend: `EduAI-Flatform/EduAI-Back-End`
- Workspace: `EduAI-Flatform/EduAI-Workspace`
- Production target: `https://eduai.giaoducso.org.vn`

## Mô hình điều phối

EduAI hiện dùng hai lớp điều phối có trách nhiệm tách biệt:

1. `.ai-dos/` là nguồn canonical cho Phase 3 commerce/payment hiện hữu, gồm Sprint 23–28, bằng chứng tài chính, reconciliation và release gate `SPR25-007`.
2. `phases/` + `state/` là lớp điều phối phase theo phong cách CongDongNgonNgu cho các chương trình phát triển mới, bắt đầu với `ADMIN-UI`.

Không được dùng lớp phase mới để ghi đè, làm mất hoặc suy diễn lại bằng chứng payment/production trong `.ai-dos/records/`.

## Nguyên tắc vận hành

1. Đọc `AGENTS.md` trước mọi task.
2. Đọc `state/PROJECT-STATE.md`, `state/DEPENDENCY-GRAPH.md` và `state/BLOCKERS.md` khi liên quan.
3. Đọc `docs/engineering/CODEX-WORKING-RULES.md`.
4. Đọc dossier của phase hiện tại: `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `UI-STITCH.md`.
5. Với Frontend, đọc `docs/engineering/FRONTEND-ARCHITECTURE.md`.
6. Với UI mới hoặc redesign đáng kể, bắt buộc dùng Stitch qua MCP trước khi code.
7. Mỗi task phải implement → verify → architecture review → review/remediation → commit → push → CI → remote verification → evidence trước khi `DONE`.
8. Không tự chạy sang major phase kế tiếp nếu chủ dự án chưa cho phép bắt đầu phase đó.

## Admin UI program

Roadmap authoritative cho chương trình hoàn thiện giao diện Admin: [`phases/ADMIN-UI-ROADMAP.md`](phases/ADMIN-UI-ROADMAP.md).

Các phase:

- `ADM-00` — Admin UI Baseline & Inventory
- `ADM-01` — Admin Design System & Shell
- `ADM-02` — Shared Admin Component Foundation
- `ADM-03` — Governance & Platform Operations
- `ADM-04` — Commerce & Benefits Operations
- `ADM-05` — Career & Mentor Operations
- `ADM-06` — Mobile, Tablet & Accessibility Hardening
- `ADM-07` — Admin Runtime UAT & Visual Acceptance

Program hiện ở trạng thái planning; `ADM-00` là phase tiếp theo đủ điều kiện nhưng chưa được coi là đã bắt đầu chỉ vì dossier đã được tạo.

## AI-DOS compatibility

Các thư mục `.ai-dos/`, `core/`, `00-project/`, `05-operations/`, `06-roadmap/`, `07-tasks/`, `10-state/` vẫn được giữ để bảo toàn hệ thống hiện tại. `10-state/TASK_STATUS.md` và `06-roadmap/ROADMAP.md` tiếp tục là compatibility views của AI-DOS.

Canonical AI-DOS commands:

```powershell
node core/conformance.js --manifest .ai-dos/manifest.json
node core/project.js --manifest .ai-dos/manifest.json --out .ai-dos/generated
```

`npm run test:contracts` là contract gate chính của runtime AI-DOS đã vendored.

## Cách khởi động Codex cho Admin UI

```text
Read AGENTS.md and the EduAI-Workspace repository.
Read state/PROJECT-STATE.md, state/DEPENDENCY-GRAPH.md, state/BLOCKERS.md, and docs/engineering/CODEX-WORKING-RULES.md.
Read phases/ADMIN-UI-ROADMAP.md and determine the current owner-authorized Admin phase without redoing completed work.
Read that phase's README/TASKS/ACCEPTANCE/TEST-PLAN/UI-STITCH files.
Read docs/engineering/FRONTEND-ARCHITECTURE.md and the target Frontend AGENTS.md if present.
Inspect the real Frontend source, tests, git state and relevant runtime before editing.
For any substantial UI/redesign, use Stitch MCP before implementation.
Execute dependency-valid work inside the authorized major phase through implementation, verification, review/remediation, commit, push, PR/CI, merge, remote-main verification, evidence and branch cleanup.
Do not start the next major Admin phase without owner authorization.
Preserve the independent AI-DOS Sprint 25 payment/reconciliation state and all financial hard stops.
```
