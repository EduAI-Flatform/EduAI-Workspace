# EduAI Workspace

Kho điều phối chung cho [Frontend](https://github.com/EduAI-Flatform/EduAI-Front-End-Web), [Backend](https://github.com/EduAI-Flatform/EduAI-Back-End) và [Workspace](https://github.com/EduAI-Flatform/EduAI-Workspace) của [EduAI](https://eduai.giaoducso.org.vn).

**Một major phase = một prompt của chủ dự án.** Sau khi phase được phê duyệt bắt đầu, Codex tự chạy các subphase an toàn đến khi đủ acceptance hoặc gặp hard stop thật: đọc nguồn → Stitch (nếu UI) → code → test/review → commit/PR/CI/merge → kiểm tra `main` → evidence → dọn nhánh. Không yêu cầu chủ dự án copy prompt mới sau từng subphase.

## Xem tình trạng dự án

| Luồng | Tình trạng hiện tại | Điều hướng |
| --- | --- | --- |
| AI-DOS commerce/payment | Sprint 25, `SPR25-007` chờ xử lý thủ công; hồ sơ tài chính là nguồn chuẩn | [Hồ sơ AI-DOS](.ai-dos/manifest.json) · [Trạng thái tương thích](10-state/TASK_STATUS.md) |
| Payment & Wallet | `PAYW-00` VERIFYING, quyết định pháp lý/đối soát chưa hoàn tất; `PAYW-01` chưa được duyệt bắt đầu | [Roadmap](phases/PAYMENT-WALLET-ROADMAP.md) · [Phase hiện tại](phases/PAYW-00-PAYMENT-WALLET-ARCHITECTURE-AUDIT/README.md) |
| Admin UI | Roadmap chuẩn bị xong; `ADM-00` READY nhưng chưa được duyệt bắt đầu | [Roadmap](phases/ADMIN-UI-ROADMAP.md) · [ADM-00](phases/ADM-00-ADMIN-UI-BASELINE-INVENTORY/README.md) |

## Bắt đầu ở đâu?

1. [`AGENTS.md`](AGENTS.md) — quy tắc bắt buộc với mọi phiên Codex.
2. [`state/PROJECT-STATE.md`](state/PROJECT-STATE.md) · [Dependencies](state/DEPENDENCY-GRAPH.md) · [Blockers](state/BLOCKERS.md) — phase nào được phép chạy.
3. [One-prompt phase autopilot](docs/engineering/PHASE-AUTOPILOT.md) · [Codex working rules](docs/engineering/CODEX-WORKING-RULES.md) — tự động trọn phase, CI/merge, hard stops.
4. [`phases/`](phases/README.md) — từng dossier `README/TASKS/ACCEPTANCE/TEST-PLAN/UI-STITCH`.
5. [Frontend architecture](docs/engineering/FRONTEND-ARCHITECTURE.md) · [Phase template](templates/PHASE-TASK-TEMPLATE.md).

Mỗi lần chỉ cần chỉ định major phase chính xác và ra lệnh bắt đầu. Prompt mẫu có thể copy trực tiếp trong [PHASE-AUTOPILOT.md](docs/engineering/PHASE-AUTOPILOT.md).

## Ranh giới không được phá vỡ

- `.ai-dos/records/` tiếp tục là nguồn chuẩn cho Sprint 25 payment/reconciliation, các bằng chứng lịch sử và gate `SPR25-007`. Không hợp nhất/suy diễn lại từ file planning.
- `phases/` + `state/` là điều phối theo kiến trúc CongDongNgonNgu cho các luồng mới, nhưng không tạo một bản sao AI-DOS.
- Thay đổi UI không ngầm thay đổi auth, khoản thu, hoàn tiền, phân chia doanh thu hay quyền của người dùng. Thiết kế mới phải theo Stitch, kiểm tra các kích thước `320/375/390/412/768/1024/1440`.
- Triển khai/restart production, tác động DB production, tiền thật, PayOS/VNPay/MB activation, chuyển khoản, bí mật/môi trường và hành động phá hủy vẫn cần phê duyệt riêng.

## Công cụ và tài liệu cũ

```bash
npm run test:contracts
npm run test:workspace
```

Các đặc tả kỹ thuật lịch sử vẫn được giữ có chọn lọc trong [`EduAI_Docs/docs/`](EduAI_Docs/docs/README.md). Bộ prompt/task Sprint 01–12 cũ đã đưa ra khỏi cây tài liệu đang hoạt động, có thể khôi phục từ [lịch sử Git](docs/archive/README.md). Các thư mục `core/`, `00-project/`, `05-operations/`, `06-roadmap/`, `07-tasks/`, `10-state/` còn nằm trong manifest AI-DOS nên **chưa được phép xóa**.
