Bạn đang làm việc trong dự án **EduAI**.

## MỤC TIÊU

Tôi vừa nhận thêm một nhóm yêu cầu sản phẩm cần được đưa vào AI-DOS và **ưu tiên thực hiện trước các backlog/task chưa cấp bách hiện tại**.

Ở bước này:

1. KHÔNG vội implement toàn bộ.
2. Trước tiên hãy audit repository và AI-DOS hiện tại.
3. Chuyển các yêu cầu bên dưới thành các task nhỏ, rõ ràng, có dependency và acceptance criteria.
4. Cập nhật canonical AI-DOS records để khi tôi chạy AI-DOS lần tiếp theo, hệ thống tự chọn nhóm công việc này trước.
5. Sau khi tạo task, nếu AI-DOS cho phép tiếp tục thực thi thì bắt đầu từ task READY có priority cao nhất.

---

# 1. BẮT BUỘC ĐỌC TRẠNG THÁI AI-DOS TRƯỚC

Trước khi thay đổi bất cứ thứ gì, hãy kiểm tra:

- `AGENTS.md`
- `.ai-dos/`
- project state hiện tại
- task manifest
- sprint hiện tại
- backlog
- manual-action records
- dependencies
- task đang `READY`
- task đang `IN_PROGRESS`
- task đang `WAITING_MANUAL`
- task đã `DONE`
- generated views của AI-DOS
- các quy tắc chọn next-task hiện tại.

Không được tạo ID task trùng với task đã tồn tại.

Không được phá trạng thái của task đang thực sự `IN_PROGRESS`.

Nếu cần tạo Sprint/Epic mới, hãy sử dụng **ID kế tiếp đúng theo convention hiện tại của repository** thay vì tự đoán ID.

---

# 2. NHÓM YÊU CẦU MỚI — PRIORITY HIGH

Đây là nhóm yêu cầu sản phẩm cần được ưu tiên.

## A. MOBILE UX / UI REFINEMENT

Giao diện mobile web EduAI hiện tại cần được chỉnh lại để:

- font-size hợp lý hơn;
- icon-size đồng nhất;
- khoảng cách giữa các thành phần gọn hơn;
- bottom navigation giống phong cách ứng dụng mobile hiện đại;
- không có cảm giác desktop responsive bị ép xuống mobile;
- typography rõ ràng;
- card gọn;
- button và touch target đúng kích thước mobile;
- giá tiền / tiền tệ không hiển thị thô;
- format giá tiền nhất quán toàn hệ thống;
- trạng thái miễn phí / giảm giá / giá gốc / giá sau giảm rõ ràng.

Có thể tham khảo UX của giao diện mobile trong ảnh CreativeHub mà Product Owner cung cấp, nhưng:

**KHÔNG copy branding, asset hoặc source code.**

Chỉ học:

- mật độ UI;
- kích thước font;
- kích thước icon;
- bottom navigation;
- card;
- khoảng trắng;
- hierarchy;
- cách hiển thị giá.

Phải giữ design language của EduAI.

---

# 3. BOTTOM NAVIGATION / PRODUCT NAVIGATION

Product Owner muốn phần dưới của mobile web bổ sung/review navigation theo hướng:

- Khóa học
- Cộng đồng
- Tính năng
- các mục quan trọng khác nếu IA hiện tại của EduAI thực sự cần.

Hãy audit navigation hiện tại trước.

Không tạo duplicate route.

Không tạo icon chỉ để trang trí.

Mỗi icon phải:

- có route hoặc action hợp lệ;
- có active state;
- có accessible label;
- có touch target phù hợp;
- không che nội dung;
- tương thích viewport mobile;
- không phá desktop navigation.

Nếu một mục như `Cộng đồng` chưa có sản phẩm thực tế:

- không tạo một trang rỗng chỉ để hoàn thành UI;
- tạo task dependency riêng hoặc feature placeholder có trạng thái rõ ràng theo architecture của dự án.

---

# 4. SAMPLE / DEMO COURSE DATA

Product Owner yêu cầu:

> Nhập thêm các khóa học mẫu chuẩn từ những nền tảng giáo dục khác để test tính năng.

Mục tiêu là tạo dataset đủ tốt để test các luồng của EduAI.

KHÔNG scrape/copy trái phép nội dung có bản quyền.

Thay vào đó:

- nghiên cứu cấu trúc dữ liệu/cách trình bày phổ biến của LMS;
- tạo **synthetic/demo courses** có chất lượng;
- có nhiều category;
- nhiều mức giá;
- khóa miễn phí;
- khóa có giảm giá;
- khóa có thumbnail;
- nhiều lesson;
- video/document/resource nếu hệ thống hỗ trợ;
- instructor;
- enrollment;
- progress;
- review/rating nếu schema hiện tại hỗ trợ.

Demo data cần giúp test:

- course listing;
- course detail;
- search;
- filter;
- enrollment;
- learning page;
- instructor course management;
- pricing;
- voucher;
- points/rewards sau này.

Nếu repo đã có seed framework thì mở rộng nó.

Không hard-code production data nguy hiểm.

Phân biệt rõ:

- development seed;
- UAT fixture;
- production/demo content nếu có.

---

# 5. VOUCHER / COUPON SYSTEM

Product Owner muốn bổ sung:

> Chính sách voucher.

Có file tham khảo:

`Theme-Couponis-V3.2.1(1).zip`

Hãy inspect source này **chỉ như tài liệu tham khảo về product flow và feature ideas**.

Couponis là WordPress theme nên:

### TUYỆT ĐỐI KHÔNG

- copy nguyên PHP/WordPress code vào EduAI;
- thêm WordPress vào architecture;
- phụ thuộc Couponis runtime;
- bê database schema WordPress sang hệ thống;
- copy copyrighted assets;
- biến EduAI thành coupon website.

### CÓ THỂ THAM KHẢO

- coupon lifecycle;
- voucher listing;
- validity period;
- percentage discount;
- fixed discount;
- minimum order/course value;
- max discount;
- usage limit;
- per-user usage limit;
- course-specific voucher;
- category-specific voucher;
- user eligibility;
- promo code;
- expired state;
- disabled state;
- admin management;
- redemption history;
- UX hiển thị voucher.

Sau khi inspect hãy thiết kế voucher theo architecture hiện tại của EduAI.

Nếu hiện tại EduAI chưa có commerce/order/payment engine đầy đủ, tuyệt đối không giả vờ rằng đã có payment.

Thiết kế voucher ở mức phù hợp với chức năng khóa học hiện tại.

---

# 6. SCHOLARSHIP

Bổ sung module/chức năng **Học bổng**.

Trước khi implement hãy xác định use case phù hợp EduAI.

Tối thiểu phải phân tích:

- scholarship campaign;
- title;
- description;
- eligibility;
- start/end date;
- quota;
- application hoặc automatic eligibility;
- trạng thái;
- course applicability;
- benefit:
  - giảm học phí;
  - miễn phí khóa học;
  - hoặc quyền lợi khác;
- admin management;
- learner-facing view;
- application/history nếu scope cho phép.

Không gộp scholarship và voucher thành một entity nếu semantics khác nhau.

Có thể dùng chung discount engine nếu architecture phù hợp.

---

# 7. TMI POINTS / REWARD SYSTEM

Product Owner yêu cầu:

> Thêm tính năng đổi điểm TMI lấy khóa học, quà tặng.

Hãy tạo một feature track riêng cho **TMI Rewards**.

Cần phân tích và thiết kế tối thiểu:

### Wallet

- điểm hiện có;
- tổng điểm kiếm được;
- tổng điểm đã dùng.

### Ledger

Mọi thay đổi điểm phải có transaction/ledger.

Không chỉ lưu một integer balance rồi cộng/trừ tùy ý.

Ledger cần đủ thông tin để audit:

- earn;
- redeem;
- refund;
- adjustment;
- expiry nếu có;
- source;
- actor;
- timestamp.

### Reward catalog

Có thể bao gồm:

- khóa học;
- voucher;
- quà tặng.

### Redeem flow

- xem số điểm;
- xem reward;
- kiểm tra đủ điểm;
- xác nhận đổi;
- chống double redemption;
- atomic transaction;
- tạo entitlement phù hợp;
- ghi ledger;
- history.

### Admin

- quản lý reward;
- số điểm cần đổi;
- quota;
- enable/disable;
- thời gian hiệu lực;
- inventory nếu là quà vật lý.

Không implement money-equivalent hoặc payment logic nếu chưa được Product Owner duyệt.

Tên hiển thị hiện tại là **TMI**.

Nếu codebase đã có points/rewards mechanism, reuse thay vì tạo duplicate.

---

# 8. DESKTOP APP-LIKE SHORTCUT

Product Owner yêu cầu:

> EduAI cũng tạo icon ra desktop giống AntiFake.

Trước tiên xác định đúng technical solution.

Ưu tiên audit xem EduAI có phù hợp với:

- PWA;
- Web App Manifest;
- service worker;
- install prompt;
- standalone display mode;
- desktop shortcut/icon;
- mobile home-screen installation.

Nếu PWA là giải pháp phù hợp thì thiết kế theo PWA chuẩn thay vì tạo desktop executable không cần thiết.

Task cần xem xét:

- `manifest.webmanifest`;
- app name;
- short name;
- icons;
- maskable icons;
- theme/background;
- display mode;
- start URL;
- scope;
- installability;
- favicon;
- Windows desktop install;
- Android install;
- browser support.

Không được tự tạo native Electron app trừ khi architecture hoặc yêu cầu thực sự cần.

---

# 9. TASK DECOMPOSITION

Không gom tất cả thành một task khổng lồ.

Hãy chia thành các task implementation đủ nhỏ để AI-DOS có thể xử lý tuần tự.

Ưu tiên logical order tương tự:

### P0 — Foundation / UX

1. Mobile UI audit
2. Mobile typography/icon/token cleanup
3. Bottom navigation
4. Money/price formatting
5. Responsive regression tests

### P0 — Demo Data

6. Demo course dataset design
7. Seed implementation
8. Seed/UAT validation

### P1 — Voucher

9. Voucher domain design
10. Voucher backend
11. Voucher admin UI
12. Voucher learner UI
13. Voucher testing/UAT

### P1 — Scholarship

14. Scholarship domain design
15. Scholarship backend
16. Scholarship UI
17. Scholarship testing/UAT

### P1 — TMI Rewards

18. TMI wallet/ledger design
19. Rewards catalog
20. Redemption backend
21. Learner rewards UI
22. Admin rewards UI
23. Race-condition/security tests
24. Production/UAT validation

### P2 — PWA

25. PWA technical audit
26. Manifest/icons/installability
27. Desktop/mobile installation QA

Đây chỉ là logical decomposition.

Hãy map sang ID task thực tế theo convention AI-DOS hiện tại.

---

# 10. PRIORITY / AI-DOS SCHEDULING

Đây là phần RẤT QUAN TRỌNG.

Sau khi tạo các task:

- cập nhật canonical AI-DOS task records;
- dependency graph;
- priority;
- sprint/epic nếu cần;
- project state;
- generated views;
- manual-action queue nếu thực sự cần action từ tôi.

Mục tiêu:

**Khi AI-DOS chạy next-task selection, nhóm requirement này phải được ưu tiên trước backlog cũ chưa cấp bách.**

Nhưng:

- không được reorder task vì dependency giả;
- không được mark task cũ DONE;
- không được cancel công việc hợp lệ chỉ để chen task mới;
- không được phá task đang IN_PROGRESS;
- security/deployment blockers thực sự vẫn phải được tôn trọng.

Nếu AI-DOS sử dụng `priority`, hãy đặt nhóm này ở mức cao thích hợp.

Nếu AI-DOS sử dụng `sprint order`, hãy đưa nhóm này vào sprint active/next appropriate.

Nếu AI-DOS sử dụng `selectedTask`, `nextTask`, manifest hoặc queue ordering thì cập nhật đúng canonical mechanism.

Không chỉ sửa generated Markdown nếu source-of-truth là JSON/YAML khác.

---

# 11. DEFINITION OF READY CHO TỪNG TASK

Mỗi task cần có ít nhất:

- ID;
- title;
- goal;
- user value;
- scope;
- out-of-scope;
- affected repositories;
- frontend/backend/database impact;
- dependencies;
- acceptance criteria;
- test strategy;
- UAT requirement;
- deployment requirement;
- security considerations;
- data migration nếu có;
- rollback considerations nếu cần;
- evidence expected;
- status.

Task không đủ rõ thì chưa được đặt `READY`.

---

# 12. SECURITY / DATA INTEGRITY

Đặc biệt với Voucher và TMI:

Phải có acceptance criteria chống:

- double redeem;
- replay;
- negative balance;
- race condition;
- unauthorized adjustment;
- privilege escalation;
- client-side price manipulation;
- voucher reuse vượt limit;
- expired voucher;
- invalid ownership;
- transaction partial failure.

Các phép cộng/trừ điểm quan trọng phải authoritative ở backend.

Frontend không được quyết định số điểm cuối cùng.

---

# 13. KIỂM TRA EXISTING FEATURES TRƯỚC KHI TẠO TASK

Search toàn bộ FE/BE trước khi tạo task mới.

Nếu đã có một phần functionality:

- reuse;
- mở rộng;
- tạo task gap-filling.

Không tạo duplicate:

- navigation;
- price formatter;
- promotion model;
- coupon model;
- reward model;
- wallet;
- seed tooling;
- PWA manifest;
- service worker.

---

# 14. COUPONIS SOURCE REVIEW

Inspect:

`Theme-Couponis-V3.2.1(1).zip`

Nhưng không thực thi code không tin cậy.

Có thể:

- unzip vào temporary analysis directory;
- đọc structure;
- đọc template/model/config;
- xác định feature ideas.

Không:

- `npm install`;
- `composer install`;
- chạy PHP;
- chạy migration;
- execute script;
- deploy bất kỳ file nào từ package.

Sau khi review, ghi một note ngắn:

`Couponis reference findings`

bao gồm:

- feature hữu ích;
- feature không phù hợp EduAI;
- feature có thể adapt;
- phần tuyệt đối không reuse.

---

# 15. UI REFERENCE

Các screenshots Product Owner cung cấp là **UX reference**, không phải pixel-perfect requirement.

Mục tiêu cuối:

EduAI phải trông như một sản phẩm duy nhất.

Không được:

- biến desktop thành bản clone CreativeHub;
- copy màu/branding;
- copy asset;
- tạo hai design system.

Hãy ưu tiên design tokens/components hiện tại của EduAI.

---

# 16. TESTING

Các task UI cần có ít nhất:

- mobile viewport;
- desktop viewport;
- regression;
- navigation;
- authenticated roles liên quan.

Các task domain cần:

- unit test;
- integration test;
- authorization test;
- edge case;
- concurrency test nếu có transaction.

Ưu tiên Playwright cho critical user journey nếu repo hiện sử dụng Playwright.

---

# 17. SAU KHI TẠO TASK

Chạy các validation/conformance command mà AI-DOS yêu cầu.

Kiểm tra:

- task graph hợp lệ;
- không orphan task;
- không circular dependencies;
- generated views đồng bộ;
- conformance PASS;
- project state hợp lệ.

Sau đó báo cáo cho tôi theo format:

## AI-DOS PRIORITY UPDATE

### New task group
Liệt kê các task mới theo thứ tự thực thi.

### First READY task
Task nào AI-DOS sẽ chọn đầu tiên.

### Dependency chain
Task nào chặn task nào.

### Existing tasks affected
Task cũ nào bị hạ sau nhóm mới và lý do.

### Couponis findings
Những gì có thể tham khảo.

### Manual actions
Chỉ liệt kê nếu thật sự cần tôi thao tác.

### Validation
- AI-DOS conformance
- generated views
- repo status
- test/build nếu đã chạy

---

# 18. EXECUTION RULE

Sau khi AI-DOS state đã được cập nhật thành công:

Nếu task đầu tiên:

- READY;
- không cần manual action;
- không bị dependency;
- nằm trong phạm vi có thể tự xử lý;

thì **tiếp tục triển khai task đó ngay**, không dừng lại chỉ để hỏi tôi.

Sau mỗi task:

1. test;
2. review;
3. cập nhật AI-DOS evidence;
4. mark DONE chỉ khi acceptance criteria đạt;
5. chọn task READY tiếp theo trong nhóm ưu tiên này.

Tiếp tục như vậy cho đến khi:

- hết context/runtime;
- gặp manual blocker thật;
- cần Product Owner decision;
- hoặc toàn bộ nhóm priority hoàn thành.

Không hỏi tôi những câu mà có thể tự giải quyết bằng cách đọc repository, AI-DOS records, tests hoặc source code.

---

# PRODUCT OWNER INTENT

Nhóm yêu cầu này hiện có mức ưu tiên cao vì mục tiêu là nhanh chóng làm EduAI có trải nghiệm giống một sản phẩm hoàn chỉnh hơn:

**Course content → Mobile UX → Discovery/navigation → Voucher/Scholarship → TMI loyalty → Installable web app.**

Hãy bảo toàn kiến trúc hiện tại của EduAI, tránh over-engineering và ưu tiên feature usable end-to-end hơn việc tạo nhiều màn hình chưa hoạt động.