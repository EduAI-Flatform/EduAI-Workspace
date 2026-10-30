# PAYW-01B — Báo cáo nghiệm thu nguồn và sandbox

Cập nhật ngày 23/10/2026. A–F trong phạm vi mã nguồn/sandbox đã hoàn tất; cả ba kho đã merge, exact main CI PASS và nhánh F đã xóa. **Production vẫn NO-GO.** Phạm vi C đã được chủ dự án giảm: chủ dự án tự xử lý đối soát tiền vào MB trên app; vẫn giữ màn hình Admin và các kiểm soát tài chính hiện có.

## 1. Trạng thái kho mã

| Kho | Merge nguồn mới nhất | PR | Trạng thái |
|---|---|---|---|
| Backend | `92cc78bd7a50d2bcc605a3681b315a6debb03c52` | [19](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/19) | PR/main CI39935234234 PASS; remote/local main trùng SHA; nhánh F đã xóa |
| Frontend | `ab61ca0c4f2ae63dc4668a3d5b4bc336f8054fd6` | [20](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/20) | PR/main CI39935243468 PASS; remote/local main trùng SHA; nhánh F đã xóa |
| Workspace | F: `67435eaad7bfff8a3bc568e17f6b753260ac11e9` | [17](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/17) | PR CI39948687577 / main CI39948775478 PASS; nhánh F đã xóa. Bản ghi terminal bổ sung nằm trong lịch sử Git sau SHA này |

Không reset/force-push hay bỏ commit cũ. Các cập nhật Workspace đã được giữ và bổ sung theo từng subphase. `SPR25-007` vẫn blocked; cấu trúc AI-DOS giữ nguyên330records/97tasks.

## 2. Chức năng đã thực hiện

- Checkout khóa học/hội viên dùng QR do Backend tạo, đúng số tiền và nội dung riêng của đơn. Frontend không chứa tài khoản nhận tiền trong mã sản phẩm. Ví GDS hiển thị chưa khả dụng; không tạo ví giả, số dư giả hay trừ điểm TMI.
- QR checkout **vẫn là sandbox có tài khoản tổng hợp** theo guard hiện có. Preview QR MB thật đọc cấu hình Backend và chỉ dành cho Admin; đây là luồng riêng, không tự kích hoạt thu tiền cho khách hàng.
- Ảnh PNG/JPEG: kiểm tra MIME/magic/decode,5MiB đầu vào, giới hạn12MP/kích thước cạnh, tối đa3ảnh/đơn, giới hạn tốc độ, quyền sở hữu và lưu trữ ngoài webroot. Chuẩn hóa PNG, hash ảnh gốc/ảnh chuẩn, kiểm tra mã giao dịch trùng. Ảnh riêng tư qua bearer/no-store, không có URL công khai; tự xóa ảnh sau24h theo cơ chế thử nghiệm.
- OCR chạy cục bộ với model được kiểm soát, timeout và giới hạn worker. Trích xuất ngân hàng, người nhận/tài khoản, số tiền, nội dung, thời gian và mã giao dịch nếu có. Kết quả/cảnh báo nằm dưới ảnh. Ảnh luôn là claim, không tạo settlement hoặc PAID.
- Khi đủ điều kiện sandbox và allowlist người mua/người bán: cấp đầy đủ quyền học qua nguồn `UNVERIFIED_RECEIPT_ACCESS`; hội viên có kỳ hạn, khóa học riêng tư được bao gồm và hạn mức dịch vụ thật. Không phải quyền demo.
- Ledger riêng theo đơn/thế hệ/từng tài nguyên; upload lặp không tự hồi sinh quyền đã thu hồi. Admin thu hồi/khôi phục có lý do, xác nhận, idempotency và kiểm tra phiên bản. Quyền đã trả tiền từ nguồn khác được giữ nguyên. Khôi phục giữ cửa sổ gốc, không cấp lại quota đã dùng. Chuyển sang quyền trả tiền chỉ sau settlement chuẩn trong cùng transaction fulfillment.
- Admin `/admin/dashboard/receipt-review`: hàng chờ theo đơn chưa thanh toán/quyền chưa đối soát còn hiệu lực, chế độ toàn bộ lịch sử, người mua/loại quyền/số tiền/mã đơn, ảnh/OCR/cảnh báo, thông tin cần đối chiếu MB, chứng cứ ngân hàng riêng, lý do/xác nhận và nhật ký. Có nút xác nhận thanh toán, thu hồi, khôi phục. Ảnh người mua không tạo chứng cứ ngân hàng; server vẫn bắt hai Admin độc lập đang có quyền.
- Khôi phục đơn hội viên sau refresh và giữ khóa idempotency khi thử lại. Giữ luồng hỗ trợ/tra soát hiện có. Sửa focus khi đóng dialog bằng Escape; kiểm tra đủ320/375/390/412/768/1024/1440.

## 3. Kiểm thử thực tế

| Kiểm tra | Kết quả quan sát |
|---|---|
| Backend toàn bộ unit |165suites /1235tests PASS |
| Frontend unit trên CI |99files /391tests PASS |
| Build Backend/Frontend, Prisma validate, audit endpoint |PASS;271endpoint/0implicit tại checkpoint D, endpoint E/F không thêm đường thiếu guard |
| SQL mới quyền/quota |15ca PGlite PASS; các bất biến ngân hàng cũ vẫn được kiểm tra |
| OCR Tesseract thật, ảnh tổng hợp cục bộ |PASS, confidence94, warnings[]; không gọi OCR cloud |
| Browser mới |25ca PASS: cả hai loại mua/Admin,7kích thước, ảnh private blob, OCR dưới ảnh, không tràn ngang, nút44px, keyboard/focus, lỗi OCR, thu hồi sau refresh |
| Browser hồi quy cũ |28ca PayOS/VNPay/QR/hội viên PASS; PWA job PASS |
| PostgreSQL thật,2Prisma client độc lập |PASS: idempotency, giới hạn ảnh, ảnh/mã trùng,10vòng race mã giao dịch, phê duyệt/hủy, grant/revoke/restore, quota cuối cùng; thêm luồng hội viên đầy đủ |
| Hội viên trên PostgreSQL thật |Checkout trùng trả1đơn; ảnh mở quyền học đầy đủ không settlement; dùng2/3quota; thu hồi giữ quyền mua khác; khôi phục còn1; thanh toán qua2Admin vẫn còn0quota, kỳ hạn gốc, không bịa usage carry-forward |
| Workspace |Conformance330records/97tasks và layout PASS; SPR25-007 không thay đổi |

CI thất bại đã được ghi nhận và sửa bằng nguồn, không che hoặc chạy lại mù: adapter serialization, hot retries(giữ3lần, backoff25/50ms), select tràn419px, focus Escape và fixture Int/BigInt. Xem [EVIDENCE.md](EVIDENCE.md) để phân biệt từng head/run.

**Dependency audit chưa đạt:** Backend53(38high), Frontend14(8high). Khi bỏ dev dependencies: Backend11(3high: Prisma/config/deepmerge-ts chain), Frontend2moderate(react-router/react-router-dom). Không chạy `npm audit fix`, không tự nâng cấp major, không miễn trừ các phát hiện này cho GO-LIVE.

## 4. Commit/PR/CI

- Backend: A[14](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/14); B[15](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/15)/[16](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/16); D[17](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/17); E[18](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/18); F[19](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/19).
- Frontend: E[19](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/19); F[20](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/pull/20).
- Workspace: A12/13, B/C14, D15, E16; F [17](https://github.com/EduAI-Flatform/EduAI-Workspace/pull/17), main CI [39948775478](https://github.com/EduAI-Flatform/EduAI-Workspace/actions/runs/39948775478) PASS; nhánh đã xóa. SHA/runs terminal đầy đủ tại [EVIDENCE.md](EVIDENCE.md).
- F Backend PR CI[39934429307](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39934429307) PASS; PostgreSQL job120350371268 xác nhận các ca hội viên thực tế.
- F Frontend PR CI[39934640147](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/39934640147) PASS. Exact main CI [39935234234](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/39935234234) và [39935243468](https://github.com/EduAI-Flatform/EduAI-Front-End-Web/actions/runs/39935243468) PASS; hai nhánh F đã được kiểm tra ancestor, xóa remote/local và prune.

## 5. Phần chưa mở / giới hạn còn lại

Chưa triển khai lên website/VPS production, chưa chạy migration production hoặc sửa `.env` thật. Checkout thu tiền MB thật và full-access từ ảnh cho người dùng thật chưa được kích hoạt. GDS chưa có ledger/số dư/giao dịch tiền nên không sử dụng được. Không bổ sung adapter sao kê/feed hoặc cơ chế một người thay hai approver; chủ dự án vận hành đối soát và phải giữ điều kiện chứng cứ ngân hàng. Runtime production deployed SHA/schema/env và UAT tích hợp staging với DB thật chưa được xác nhận trong lượt này. UI fixture, OCR thật và PostgreSQL được kiểm thử ở các lớp riêng; không mô tả chúng thành một giao dịch ngân hàng thật.

Các quy tắc overlap/đổi gói hội viên hiện có vẫn giữ; trường hợp không được hỗ trợ fail closed để Admin kiểm tra. Lưu trữ tạm theo tài khoản OS là adapter sandbox, chưa được coi là hạ tầng lưu ảnh thật lâu dài. Raster decode/re-encode không chứng minh ảnh giao dịch là thật. Dữ liệu đã xem/tải/tiêu dùng không thể bị thu hồi vật lý.

## 6. Tên biến môi trường và cách đặt

Chỉ cấu hình trong môi trường đã được phép; agent không đặt giá trị vào `.env` thực. Không có biến Frontend chứa tài khoản ngân hàng.

| Tên | Cách đặt |
|---|---|
|`NODE_ENV`|`test`/`development` cho thử nghiệm; code từ chối receipt sandbox ở production |
|`BANK_TRANSFER_SANDBOX_ENABLED`|Mặc định OFF; chỉ bật ở sandbox tổng hợp |
|`BANK_RECEIPT_SANDBOX_ENABLED`|Mặc định OFF; bật cùng sandbox ngân hàng |
|`BANK_RECEIPT_EARLY_ACCESS_ENABLED`|Mặc định OFF; bật riêng khi nghiệm thu quyền đầy đủ trước đối soát |
|`BANK_RECEIPT_SYNTHETIC_BUYER_IDS`|UUID người mua thử nghiệm, phân cách dấu phẩy |
|`BANK_RECEIPT_SYNTHETIC_SELLER_IDS`|UUID người bán thử nghiệm của mọi dòng đơn, phân cách dấu phẩy |
|`BANK_TRANSFER_SANDBOX_OPERATOR_IDS`|UUID Admin thử nghiệm được phép; xác nhận tiền vẫn cần2người độc lập |
|`BANK_RECEIPT_OCR_DATA_PATH`|Thư mục tuyệt đối cục bộ có model eng/vie đã kiểm tra; không URL/CDN/UNC |
|`BANK_RECEIPT_STORAGE_ROOT`|Tùy chọn: thư mục riêng tư tuyệt đối ngoài ứng dụng/webroot; bỏ trống dùng temp riêng của OS user |
|`BANK_TRANSFER_PREVIEW_ENABLED`|OFF mặc định; chỉ bật preview QR Admin được phép, không bật checkout thật |
|`BANK_TRANSFER_RECEIVER_BANK_NAME`|Tên ngân hàng do chủ tài khoản cung cấp cho preview Backend |
|`BANK_TRANSFER_RECEIVER_BANK_BIN`|BIN ngân hàng hợp lệ từ nguồn MB được phép |
|`BANK_TRANSFER_RECEIVER_ACCOUNT_NUMBER`|Chủ dự án đặt tài khoản nhận được phép ở Backend; không đưa vào Git/Frontend |
|`BANK_TRANSFER_RECEIVER_NAME`|Tên thụ hưởng đúng theo tài khoản MB, chủ dự án tự đặt |

## 7. Điều kiện trước GO-LIVE

1. Giữ trạng thái NO-GO đến khi các chủ sở hữu canonical xử lý `SPR25-007` và các gate D01/D03/D04/D08/D10 liên quan. Việc chủ dự án xem tiền vào MB trên app đã được ghi nhận; điều đó không tự thay thế chứng cứ về quyền thu tiền/nguồn ngân hàng và quy trình kiểm soát.
2. Chốt quy trình nguồn tiền vào đáng tin cậy do chủ dự án vận hành; giữ2Admin hoặc có thay đổi kiểm soát riêng được phê duyệt. Không dùng ảnh người mua hoặc hash của ảnh đó để xác nhận tiền.
3. Triage/khắc phục dependency audit, kiểm chứng snapshot pháp lý/đối tác/refund/tax/điều khoản và hạ tầng ảnh riêng tư/retention/giám sát theo gate hiện có.
4. Kiểm thử staging tích hợp và duyệt migration additive/release/rollback với revision cụ thể. Các migration `20261023010000_add_bank_receipt_claims`, `20261023020000_add_receipt_access`, `20261023021000_add_receipt_quota_pools` phải có trước khi chạy mã mới; tắt flag không thay yêu cầu schema.
5. Bất kỳ pilot cấp đầy đủ quyền từ ảnh cho người thật phải có phê duyệt riêng về rủi ro, giới hạn phơi nhiễm, thời hạn đối soát, thông báo/kháng nghị và kill switch. Không đổi ảnh thành PAID.
6. Chủ dự án cấp phép riêng cho lệnh migration/env/deploy/restart production sau khi các điều kiện trên đạt. Không có lệnh production nào được agent thực hiện trong phase này; không tự kích hoạt bằng cách đổi flag.

## 8. Kiểm thử website không chuyển tiền thật

Tại `EduAI-Front-End-Web`:

```powershell
npm ci
npx playwright install chromium
npx playwright test --config playwright.payw.config.ts
```

Để xem từng bước trên browser local:

```powershell
npx playwright test --config playwright.payw.config.ts --headed --debug --grep "Admin confirms exact revocation"
```

Config riêng mở Frontend127.0.0.1:5174, không đọc dotenv, không có proxy Backend, không dùng lại server khác; API/ảnh/tài khoản đều là fixture tổng hợp. Có thể xem ảnh/OCR, quyền đang chờ đối soát, nút bị khóa khi thiếu chứng cứ ngân hàng, xác nhận thao tác và thu hồi. Đây là UAT giao diện, không tạo giao dịch hay quyền trong DB thật. Kết quả PostgreSQL/OCR thật ở mục3/CI là bằng chứng riêng cho lớp Backend.

Ảnh chụp tại `test-results/payw-01b/`; CI lưu artifact theo run. Không dùng tài khoản hoặc dữ liệu production, không chuyển dù chỉ một khoản nhỏ vào tài khoản tổng hợp. Website production hiện chưa có thay đổi của phase này.

## 9. Nhật ký CD và tình trạng sẵn sàng phát hành — 24/10/2026

**Quyết định: NO-GO cho checkout thu tiền thật và phát hành PAYW-01B; không thay đổi `SPR25-007`.** Môi trường website hiện được chủ dự án sử dụng để kiểm thử, nhưng điểm triển khai vẫn dùng đường CD `Deploy Backend Production` và cơ sở dữ liệu thật; tên gọi “môi trường thử nghiệm” không tự bỏ yêu cầu phê duyệt tác động dữ liệu.

### Bằng chứng điều tra

- [Backend CD #40066410831](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40066410831), source `64af8307eda970d0b9a09768f9349ec4539a5c3b`: build/validate thành công, deploy dừng trước khi apply migration, tại `migrationPreflightSnapshotStep: LEDGER_ASSERT` với `MIGRATION_LEDGER_STATE_DRIFT`. Đây là quy tắc fail-closed ở `scripts/run-production-migrations.cjs`, không phải lỗi cài package.
- Mã mới có ba migration schema tiếp theo mà gate cũ chưa cho phép: `20261023010000_add_bank_receipt_claims`, `20261023020000_add_receipt_access`, `20261023021000_add_receipt_quota_pools`. Chúng ảnh hưởng receipt, entitlement và quota; phải nghiệm thu dữ liệu cùng quyền trước khi chạy.
- Log CD cho thấy `git reset` và `npm ci` trên VPS đã diễn ra; không có bằng chứng migration mới được apply hoặc PM2 được restart trong lượt thất bại. Kiểm tra đọc-only `GET https://api.eduai.giaoducso.org.vn/health` trả HTTP 200, chỉ chứng minh API trả health; không chứng minh luồng thanh toán hoạt động.
- [Backend PR #21](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/21) sửa preflight theo hướng ghim đúng thứ tự và SHA-256 của cả ba file SQL, kiểm tra lại ngay trước khi apply và phân loại `MIGRATION_RELEASE_APPROVAL_REQUIRED` thay cho thông báo drift chung trong trường hợp đúng ba migration đang đợi phê duyệt. PR CI [#40067438302](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40067438302) PASS; PR đã merge vào `main` tại `b7d03367133209f4ad0e506af74fc891b0d1c788`. Đây là **sửa mã nguồn**, không phải deploy.
- Workflow CD giờ có input riêng `authorize_receipt_schema_migrations`, mặc định **false**. Chỉ khi chủ dự án cấp phép phát hành schema cụ thể và chọn input này trong lượt CD thủ công, runner mới có thể chấp nhận đúng các migration đã ghim; mọi migration không rõ nguồn hoặc sai checksum vẫn bị chặn. `authorize_production` và các kiểm soát khác không bị loại bỏ. Không bật payment, sửa khóa bí mật, restart PM2 hay ghi database trong sửa PR.
- Chế độ CD tự động theo push **chưa được bật lại**; file workflow vẫn chỉ `workflow_dispatch`, do việc tự chạy migration hoặc deploy mã phụ thuộc schema lên dữ liệu đang hoạt động không được bao gồm trong phê duyệt sửa nguồn này. Cần quyết định riêng về cơ chế CI/CD tự động có phân tách deployment an toàn.

### Hành động còn phải hoàn tất

1. Xem xét và duyệt kế hoạch phát hành ba migration nêu trên theo đúng SHA-256 đã ghim, backup/rollback và chạy staging rehearsal đối với PostgreSQL và dữ liệu entitlement/quota thực tế. Đối chiếu trực tiếp trạng thái ledger, không dùng `migrate resolve` để bỏ qua lỗi.
2. Phê duyệt riêng lượt tác động database/PM2 trên VPS, sau đó thực thi CD với input đúng phạm vi; kiểm tra schema/role/postflight và source SHA khớp trước khi đưa mã mới phục vụ người dùng.
3. Sau khi migration ổn định, đánh giá restore tự động CD theo nhánh `main` với gate độc lập và khả năng dừng khi còn pending migrations; không biến input manual thành bật mặc định.
4. Kiểm thử website bằng dữ liệu/tài khoản thử nghiệm không chuyển tiền thật, đối chiếu UAT khóa học/hội viên, ảnh biên lai, Admin đối soát/thu hồi, idempotency, receipt privacy, các lỗi dependency còn mở và tiếp tục giải quyết các điều kiện GO-LIVE ở mục 7.

**Giới hạn chứng cứ:** Báo cáo này chỉ dựa vào CI/GitHub Actions, mã workflow và HTTP health công khai; chưa có ảnh chụp trực tiếp ledger/backup staging hay xác nhận tiền vào ngân hàng. Không coi mã nguồn PASS hoặc health 200 là GO-LIVE.


## 10. Tiến độ được chủ dự án phê duyệt và chốt tạm — 26/10/2026

**Phạm vi đã được chủ dự án cho phép:** kiểm tra/sao lưu trước khi áp dụng đúng ba migration receipt/access đã ghim SHA-256 lên Neon `neondb`, và khôi phục CD tự động Backend từ `main` lên VPS. Việc cấp phép này **không** phải phê duyệt thu tiền thật từ ảnh biên lai, bỏ hai người đối soát, mở Ví GDS, kích hoạt nhà cung cấp thanh toán, hoàn tiền hay nới `SPR25-007`.

### Sao lưu và trạng thái Neon được quan sát trực tiếp

- Ngày **26/10/2026, 08:21:36 Asia/Saigon** (01:21:36 UTC), trong Neon Console dự án EduAI / nhánh `production`, đã chọn **Create snapshot** và nhận thông báo `Snapshot was successfully created`; trang `Backup & Restore` hiển thị **1 manual snapshot**, `Expires on: never`. Đây là bản snapshot trên Neon, không khẳng định đã xuất một `pg_dump` ngoại tuyến hoặc diễn tập phục hồi.
- Màn hình Neon đồng thời cảnh báo `Limit reached` — đã dùng hết compute tháng. Free Plan hiển thị **100 compute hours/project**; trang chi tiết nhánh hiển thị khoảng **103.96 CU-hrs** từ ngày 01/10. Nhánh `production` hiển thị endpoint `Inactive`. Không được coi DB là sẵn sàng để chạy migration/health thực tế ở thời điểm này.
- Trang Billing nêu tùy chọn tăng hạn mức có phí (`Add for $10 / month`) và plan trả theo mức sử dụng. **Không chọn nâng gói, không tạo chi phí.** Cần chủ dự án quyết định chờ allowance mới hay cấp phép riêng khoản chi nếu thực sự cần chạy ngay.

### Khôi phục nguồn tự động CD theo cơ chế có chốt

- [Backend PR #22](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/22) sửa `.github/workflows/deploy-production.yml` để `push` trên `main` kích hoạt workflow, nhưng job deploy tự động chỉ được xét khi biến repository `EDUAI_AUTO_CD_ENABLED` bằng `true`; manual deploy vẫn cần `authorize_production=true`, ba migration chỉ được áp dụng bằng `authorize_receipt_schema_migrations=true` của lượt thủ công.
- PR #22 CI [#40254110779](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40254110779) PASS; merge Backend `main` ở `352bd4b8cb245c180bbddca81152558454ca4dff`.
- Đã kiểm tra GitHub Settings → Actions Variables: không có biến ở cấp repository hay organization, nên `EDUAI_AUTO_CD_ENABLED` **đang không được bật**. Lượt workflow `push` sau merge [#40254351259](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40254351259) được khởi tạo; trước khi ghi trạng thái DONE cần xác minh CI sau merge và job deploy `skipped` theo chốt.
- Chỉ khôi phục cơ chế trigger có chốt; **chưa apply SQL trên Neon**, **chưa restart PM2**, **chưa cho phép auto-CD thực sự SSH lên VPS**, không thay đổi `.env` hoặc nghiệp vụ tài chính.

### Việc bắt buộc còn lại

1. Giải quyết Neon Free compute allowance bằng quyết định riêng; xác nhận database truy cập bình thường, migration ledger và snapshot phục hồi được trước khi chạy SQL.
2. Chạy rehearsal trên nhánh/dữ liệu thử nghiệm và kiểm soát tác động của ba migration, hậu kiểm entitlement/quota/permissions trước khi dùng chốt manual migration.
3. Chạy một lượt thủ công đã duyệt đúng SHA với `authorize_production=true`, `authorize_receipt_schema_migrations=true`; thu bằng chứng từ CI/CD và postflight runtime. Không thay bằng `prisma migrate resolve` hoặc thao tác xóa/ghi lại ledger.
4. Chỉ sau khi schema và runtime ổn định mới có thể đặt biến `EDUAI_AUTO_CD_ENABLED=true` để chính thức tự động deploy các commit `main` kế tiếp, có quy trình tắt khẩn cấp và giám sát.
5. Duy trì **PAYW-01B public GO-LIVE = NO-GO**, `SPR25-007` không đổi. Ảnh biên lai/OCR không xác minh tiền vào MB và không tự đánh dấu PAID.

## 11. Bằng chứng Neon Launch, schema và Backend CD — 30/10/2026

**Quyết định kỹ thuật:** Gói Neon đã được chủ dự án nâng và xác nhận trực tiếp là **Launch**. Ba migration receipt/access đã được apply và Backend CD thủ công thành công. Việc này **không** thay đổi quyết định **PAYW-01B checkout thu tiền thật = NO-GO** hoặc trạng thái `SPR25-007`; không coi ảnh biên lai là chứng cứ tiền vào ngân hàng.

### Snapshot và ledger quan sát trực tiếp

- Neon EduAI project `muddy-term-45367509`, branch `production` (`br-late-flower-aoj42wzx`), database `neondb`: Console xác nhận **Launch** sau khi chủ dự án nâng gói.
- Giữ snapshot ngày 26/10. Đã tạo thêm snapshot thủ công lúc **09:35:33, 30/10/2026 (Asia/Saigon)**; Neon trả `Snapshot was successfully created`, hiển thị **2 snapshots**, cùng `Expires on: never`. Không thực hiện `pg_dump` ngoại tuyến hay thử restore.
- [Backend CD #159, attempt 1](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40992759128) chạy thủ công với `authorize_production=true` và `authorize_receipt_schema_migrations=true`. Migration đã thực sự apply; bảng `_prisma_migrations` trên Neon có `finished_at`, `rolled_back_at=NULL`, `applied_steps_count=1` với các checksum:

| Migration | SHA-256 / checksum quan sát trong ledger |
|---|---|
| `20261023010000_add_bank_receipt_claims` | `ff4c6807b7be7a0caf95acdeb347bca28024b9545ea93fe113c17bc68e740571` |
| `20261023020000_add_receipt_access` | `f6533ebc1f4d6c1cdcad9f3a3f3d498bd84f639171be65f00607ccb1890f85d1` |
| `20261023021000_add_receipt_quota_pools` | `4a3b322c2c8a219138126326839dcd09406e7a3b2c92b65abb2a346449646703` |

### CD và hậu kiểm sau migration

- Attempt 1 thất bại **sau khi apply đủ 3 migration**, tại hậu kiểm `MIGRATION_FINANCIAL_STATE_CHANGED`. Phân loại lỗi chứng minh có sai khác trong snapshot kiểm tra chứ **chưa xác định bảng/nguồn nào gây sai khác**. Guard vẫn fail-closed; không sửa ledger, bỏ so khớp digest hoặc đưa lỗi về PASS.
- Đã rerun job deploy bị lỗi của cùng run #159 (attempt 2), **PASS**. Log xác nhận `migrationTargetApplied: true`, `migrationApply: SKIPPED_ALREADY_APPLIED`, `migrationPostflight: PASS`, `financialRowsChanged: 0`, `runtimeFinancialGuardPrivilegesBlocked: true`, `runtimeRoleLeastPrivilegeReady: true`. Build và PM2 restart thành công; `deployedBackendSha: 352bd4b8cb245c180bbddca81152558454ca4dff`.
- HTTP read-only `GET https://api.eduai.giaoducso.org.vn/health` sau restart trả `success:true`, `status:ok`, Redis `ok`. Không suy diễn health thành UAT thanh toán/học viên.
- Log trên VPS ghi `paymentProviderActivated:true` và `paymentProviderDisabled:false` theo cấu hình đã có; lượt này **không sửa .env/không bật provider bằng thao tác chủ động**. Đây là tín hiệu cần đánh giá độc lập trước mọi GO-LIVE.
- Tại GitHub Settings → Actions Variables, đã đặt và đọc lại repository variable **`EDUAI_AUTO_CD_ENABLED=true`** để cho phép job deploy khi push `main`. Workflow còn giữ điều kiện `authorize_receipt_schema_migrations` cho manual input; tự động không được dùng input này. Có thể dừng tự động deploy bằng cách đặt biến `false` hoặc xóa biến.

### Xác minh push → auto-CD end-to-end

- [Backend PR #23](https://github.com/EduAI-Flatform/EduAI-Back-End/pull/23) chỉ thêm tài liệu vận hành và kill switch. PR CI [#40994328108](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40994328108): `Test and build backend` PASS; job PostgreSQL concurrent có lần đầu FAILED ở `RECEIPT_CONCURRENT_OPERATION` trong 10 vòng upload cạnh tranh do serialization conflict, rerun độc lập PASS. Không sửa/miễn trừ test và không gọi lỗi đã được sửa dứt điểm.
- Sau CI PASS, PR #23 được merge trên Backend `main` tại `dccb4db7d1e80b92ac7bfae177ef83c5e110b2d0` (docs-only).
- GitHub **tự kích hoạt** [Backend CD #160](https://github.com/EduAI-Flatform/EduAI-Back-End/actions/runs/40994679159) từ sự kiện **push main**, không phải thủ công. `Validate and build` PASS, `Deploy to VPS` PASS, `deployedBackendSha=dccb4db7d1e80b92ac7bfae177ef83c5e110b2d0`.
- Job deploy auto ghi `receiptSchemaMigrationAuthorization: NOT_GRANTED`, `pendingMigrationName: UNAVAILABLE`, `migrationApply: SKIPPED_ALREADY_APPLIED`, `migrationPostflight: PASS`, `financialRowsChanged: 0`, `runtimeRoleLeastPrivilegeReady: true`, PM2 restart thành công, `Backend deployment completed.` Đây là bằng chứng chốt **AUTO_CD_TRIGGER_AND_DEPLOY=PASS**.
- Ngay sau restart, một lượt kiểm tra `/health` trả HTTP 200 và `status:ok` nhưng `redis.status:error`; **hai lần kiểm tra tiếp theo** đều trả `redis.status:ok`. Ghi nhận như một tín hiệu transient có thể cần quan sát; không khẳng định Redis hoàn toàn không còn lỗi trong tương lai.
- **Chưa mở thanh toán từ ảnh/QR MB thật, chưa thay đổi `.env`, chưa bỏ kiểm soát hai Admin, chưa vận hành GDS, chưa GO-LIVE.** Những hạn chế dependency audit và release gate `SPR25-007` tiếp tục có hiệu lực.

### Bàn giao

- Backend tự động CD trên `main`: **PASS** ở run #160 và đang **ON** qua `EDUAI_AUTO_CD_ENABLED=true`.
- Database/schema: **PASS** trong đúng ba migration đã duyệt và kiểm tra lại, nhưng **chưa thực hiện khôi phục snapshot**; rollback data phải theo quy trình riêng nếu cần.
- Payment public: **NO-GO** đến khi điều kiện tài chính, bảo mật, UAT và `SPR25-007` được xử lý độc lập.
