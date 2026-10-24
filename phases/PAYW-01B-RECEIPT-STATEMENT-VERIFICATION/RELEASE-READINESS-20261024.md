# PAYW-01B — Chuẩn bị phát hành, ngày 24/10/2026

**Phạm vi được chủ dự án giao:** rà soát và xử lý dependency, kiểm thử tích hợp staging, hoàn thiện hồ sơ điều kiện GO-LIVE. Không triển khai production, không kết nối ngân hàng thật, không thay đổi trạng thái `SPR25-007`.

## 1. Bản mã và kết quả dependency

Baseline đã merge: Backend `92cc78b`, Frontend `ab61ca0`, Workspace `9939556`. Các PR #19/#20/#18 tương ứng đều merged; main CI đã được đối chiếu trên GitHub.

Ngày 24/10, bản vá Backend giới hạn trong `package.json` và `package-lock.json`:

- Đồng bộ Prisma Client / CLI / PostgreSQL adapter từ 7.8.0 lên 7.10.1; bỏ override `deepmerge-ts@7.1.6` dễ bị stack exhaustion, để Prisma config sử dụng `deepmerge-ts@8.0.2`.
- Nâng riêng `multer` lên 2.5.0, `body-parser` lên 1.20.9 và `qs` lên 6.16.0; giữ NestJS major 10, PayOS/VNPay và mọi logic thanh toán.
- Audit **production-only** trước thay đổi: Backend 12 mục (6 high/6 moderate). Sau thay đổi: **6 moderate, 0 high/critical**. `npm audit --omit=dev --audit-level=high` PASS.
- Backend `prisma generate`, `prisma validate`, `npm run build`, endpoint audit **271 route / 0 implicit**, Jest **165 suite / 1.235 test**, tập trung thanh toán **31 suite / 428 test**, và migration/PGlite **5 suite / 73 test** PASS với biến môi trường và dữ liệu tổng hợp cục bộ.
- Frontend không sửa logic giao diện/thanh toán; nâng Vite trong major 6 lên 6.4.5, pin `browserslist@4.29.4` và `source-map-js@1.2.2`. Build và **99 file / 391 unit test** PASS. Audit **toàn bộ dependency**: trước 3 high/6 moderate, sau **0 high/5 moderate**. Audit production **2 moderate, 0 high/critical**, đều liên quan React Router 6; nâng lên React Router 7.18.4 là breaking major và cần riêng một đợt đánh giá tương thích/navigation.
- Backend còn 6 moderate ở production từ chuỗi NestJS 10/`file-type`/`ajv`; **audit toàn bộ (bao gồm dev)** còn 2 high (`picomatch`, `tmp`) do Nest CLI 10, cần đánh giá nâng major. Không dùng `npm audit fix --force`, không đánh dấu các mục này là đã khắc phục.

**Lưu ý nghiệm thu (đã đối chiếu 24/10):** Bản vá Backend [PR #20](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/20) đã merge `64af8307`, PR CI #244 (`40054591546`) PASS cả hai job. Frontend [PR #21](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/21) đã merge `0a270830`; PR CI #202 (`40054914617`) PASS cả ba job, gồm Chromium checkout và PWA. Chưa có bằng chứng CI sau merge trên main hoặc staging E2E, không tự suy diễn PASS.

## 2. Kiểm thử tích hợp staging — chưa đủ điều kiện tuyên bố PASS

Đã kiểm chứng mã Frontend/Backend riêng và DB migration qua PGlite. Bộ browser 25 ca trên bản main trước đó đã PASS tại GitHub Actions; khi chạy lại trên môi trường hiện tại, Chromium chưa được cài. Thao tác tải browser qua Playwright CDN thất bại do archive rỗng (0 MiB), **không phải một lỗi ứng dụng được chứng minh**.

Môi trường phiên làm việc này **không có Docker/PostgreSQL server/staging DB riêng**. Vì vậy **chưa có bằng chứng một luồng Frontend thực → Backend HTTP thực → PostgreSQL staging → OCR thực → Admin được chạy end-to-end cùng một thời điểm**. Không sử dụng Neon/VPS production thay cho staging.

Yêu cầu cho một lượt UAT tích hợp staging hợp lệ:

1. Tạo một cơ sở dữ liệu PostgreSQL **mới, rỗng, không chứa khách hàng thật**, với quyền tách biệt production; xác thực host và tên DB, tuyệt đối không dùng database URL sản xuất.
2. Từ bản commit được khóa SHA, cài package lock, tạo Prisma client, chạy migration `deploy` **trên staging được xác thực duy nhất**, kiểm tra `migrate status` và chạy seed tài khoản người học/Admin tổng hợp qua cơ chế có kiểm toán.
3. Khởi chạy Backend + Frontend riêng biệt, khóa `NODE_ENV` ở chế độ test/development thích hợp; các cờ `BANK_TRANSFER_SANDBOX_ENABLED`, `BANK_RECEIPT_SANDBOX_ENABLED`, `BANK_RECEIPT_EARLY_ACCESS_ENABLED` mặc định OFF, chỉ được bật trong staging tổng hợp có allowlist định danh.
4. Test khóa học, hội viên, QR tài khoản giả, ảnh OCR tổng hợp, cấp quyền chưa đối soát, Admin thu hồi/khôi phục; kiểm tra ảnh không set `PAID`, thứ tự hai approver khi có chứng cứ ngân hàng tổng hợp, tiêu dùng quota và quyền mua khác.
5. Chạy 25 browser test cùng smoke API thật, viewport 320/375/390/412/768/1024/1440; ghi API status, timestamp, SHA, migrations, logs đã làm sạch và rollback drill.
6. Tắt cờ sandbox và chứng minh đường production từ chối nhận ảnh/cấp quyền thật. Xóa dữ liệu thử bằng cơ chế staging đã được xác định rõ, không chạy lệnh xóa dựa trên biến đường dẫn chưa kiểm chứng.

Ngày 24/10, chủ dự án cho phép tận dụng **môi trường thử nghiệm đang có**. Đây là thông tin do chủ dự án cung cấp, **chưa chứng minh môi trường đó dùng database/test identities tách biệt với production**. Chỉ bắt đầu ca E2E có ghi dữ liệu sau khi kiểm chứng an toàn, tắt tiền thật và xác nhận không ảnh hưởng dữ liệu/người dùng hiện có.

Hiện trạng: **STAGING E2E = NOT RUN**, không được chuyển sang PASS từ bằng chứng unit/CI riêng lẻ.

## 3. GO-LIVE — các cổng còn mở

| Cổng | Hiện trạng / yêu cầu |
| --- | --- |
| `SPR25-007` | Chưa được giải quyết; bảo toàn chứng cứ tài chính chính thống |
| Nguồn MB + quyền thu tiền (D01) | Cần xác minh giấy tờ quyền nhận tiền, đúng giao dịch **tiền vào** của tài khoản công ty và trách nhiệm lưu nguồn |
| Điều hành một người (D08) | Backend vẫn yêu cầu hai Admin độc lập khi quyết toán thật; nếu đổi phải có phương án kiểm soát thay thế được duyệt riêng |
| Phạm vi bán hàng / chính sách (D03/D04/D10) | Điều khoản mua khóa học/hội viên, thu hộ bên thứ ba, hoàn tiền, thuế và hợp đồng cần chốt |
| Kho ảnh/giữ dữ liệu | Adapter lưu tạm sandbox chưa phải hạ tầng ảnh riêng tư production; cần retention, xóa, giám sát, phản hồi sự cố và hạn mức rủi ro OCR |
| Dependency | Bản vá Backend production và Frontend toàn bộ đưa **high về 0**; Backend dev còn 2 high, cả hai kho vẫn có moderate cần đánh giá/kiểm chứng, chưa được tự động miễn trừ |
| Ví GDS | Không có ví tiền thật hoạt động; không được nạp/trừ tiền hoặc dùng điểm TMI thay thế |
| Migration + rollback production | Các migration `20261023010000_add_bank_receipt_claims`, `20261023020000_add_receipt_access`, `20261023021000_add_receipt_quota_pools` mới chỉ thuộc mã nguồn; cần staging rehearsal và phê duyệt riêng |
| Thanh toán người dùng thật | **NO-GO**: OCR chỉ là claim, không được chuyển `PAID`/đối soát, không bật `BANK_TRANSFER_SANDBOX_ENABLED` ở production |

## 4. Thông tin cần từ chủ dự án ở bước protected tiếp theo

- Endpoint/đường triển khai **staging riêng** nếu đã có; xác nhận staging DB không phải Neon/VPS production. Không gửi bí mật hoặc chuỗi kết nối có mật khẩu trong chat/Git.
- Danh tính các approver hợp lệ hoặc phương án thay thế đã được phê duyệt; chỉ xác nhận nguồn sao kê tiền vào, **không cung cấp OTP/PIN**.
- Tài liệu quyền thu tiền, chính sách bán/hoàn tiền và quyết định giới hạn tổn thất do cấp quyền trước khi xác minh; lưu kênh nội bộ được kiểm soát, không commit.

Không cần sửa `.env` production, chạy migration hay khởi động lại PM2 trong lượt chuẩn bị này. Khi mọi gate được chấp nhận, cần một **quyết định GO-LIVE riêng ghi rõ commit, phạm vi, rollback, người trực và lệnh được phép**.
