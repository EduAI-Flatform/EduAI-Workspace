# GOAL: Hoàn thiện luồng học tập EduAI

## 1. Bối cảnh và mục tiêu

Dự án gồm hai repository:

- Frontend: `https://github.com/EduAI-Flatform/EduAI-Front-End-Web`
- Backend: `https://github.com/EduAI-Flatform/EduAI-Back-End`

Frontend hiện dùng React, Vite và TypeScript.

### 1.1. Mục tiêu tổng quát

Xây dựng một luồng học tập đầu-cuối, có dữ liệu thật và được Backend bảo vệ, để học viên có thể:

1. Xem đúng nội dung khóa học đã đăng ký.
2. Học bài theo đúng thứ tự và điều kiện của learning path.
3. Lưu và tiếp tục tiến độ sau khi tải lại trang hoặc đổi thiết bị.
4. Hoàn thành video, tài liệu, bài tập và bài kiểm tra theo quy tắc tương ứng.
5. Biết rõ bước hiện tại, bước tiếp theo và lý do một bước bị khóa.

Thành công không chỉ được đánh giá bằng giao diện hiển thị đúng, mà bằng việc toàn bộ trạng thái nghiệp vụ được tính và xác thực ở Backend, có thể kiểm chứng qua test và luồng thực tế.

### 1.2. Phạm vi chức năng

Task bao gồm các nhóm chức năng sau:

- Trang chi tiết khóa học.
- Trình phát bài học.
- Tiến độ học tập.
- Điều kiện mở khóa bài tiếp theo.
- Bài tập.
- Bài kiểm tra.
- Trạng thái hoàn thành.
- Điều hướng bước tiếp theo.
- Responsive desktop và mobile.

Không được chỉ sửa giao diện hoặc hard-code dữ liệu. Phải kiểm tra và sửa đồng bộ cả Frontend và Backend.

### 1.3. Kết quả đầu ra bắt buộc

Khi hoàn thành, hệ thống phải có:

- Một learning path thống nhất, gồm lesson, assignment và quiz theo đúng thứ tự.
- Một nguồn dữ liệu Backend trả về trạng thái, tiến độ, quyền truy cập, current step và next step.
- Các màn hình học tập có trạng thái loading, empty, error và retry phù hợp.
- Các API bảo vệ quyền truy cập, tính hoàn thành, chấm điểm và lưu submission.
- Test Backend, Frontend và tối thiểu một luồng E2E cho các quy tắc cốt lõi.
- Báo cáo thay đổi, kiểm thử, migration, Git và Production theo mẫu ở cuối tài liệu.

### 1.4. Trong phạm vi

- Phân tích và sửa đồng bộ hai repository Frontend và Backend được nêu ở trên.
- Mở rộng model/API hiện có khi có thể; chỉ tạo migration hoặc module mới khi cần thiết.
- Cải thiện UI/UX của course detail, learning player, sidebar, assignment và quiz để hỗ trợ các hành vi nghiệp vụ.
- Bổ sung kiểm thử, tài liệu kỹ thuật và kiểm tra Production theo quyền truy cập thực tế.

### 1.5. Ngoài phạm vi

Trừ khi phát hiện là điều kiện bắt buộc để luồng học tập hoạt động, task không bao gồm:

- Viết lại toàn bộ Frontend hoặc Backend.
- Thay đổi hệ thống đăng nhập, thanh toán, đăng ký khóa học hoặc đánh giá sao của khóa học.
- Xây dựng hệ thống chấm tự động mới cho bài tự luận.
- Thay đổi nội dung khóa học, đáp án, dữ liệu người học hoặc dữ liệu Production bằng thao tác thủ công.
- Thêm dịch vụ bên thứ ba xử lý tài liệu riêng tư khi chưa có phê duyệt và cấu hình bảo mật.

### 1.6. Mức độ ưu tiên

Thực hiện theo thứ tự ưu tiên:

1. **P0 — Tính đúng và an toàn:** authorization, unlock condition, completion, progress, quiz scoring, submission ownership.
2. **P1 — Luồng sử dụng chính:** course detail, learning player, assignment, quiz, next step, refresh/resume.
3. **P2 — Trải nghiệm:** responsive, sidebar, loading/error/empty state, accessibility, tối ưu khung học.
4. **P3 — Hoàn thiện phát hành:** test E2E, migration an toàn, CI/CD, Production verification và báo cáo.

### 1.7. Giả định và quy tắc mặc định

- Backend là nguồn sự thật duy nhất cho quyền truy cập, trạng thái step, tiến độ và kết quả chấm.
- Ngưỡng hoàn thành video phải là một giá trị cụ thể, có cấu hình; mặc định đề xuất là **90%**, không dùng mô tả mơ hồ “90–95%”. Nếu hệ thống đã có cấu hình hợp lệ thì giữ cấu hình đó và ghi rõ trong báo cáo.
- Step được sắp xếp theo `position` do Backend trả về; Frontend không tự suy đoán thứ tự từ các mảng lesson, assignment hoặc quiz riêng lẻ.
- Assignment chỉ hoàn thành khi nộp thành công, hoặc khi đạt điểm tối thiểu nếu assignment hiện có yêu cầu chấm đạt. Quy tắc thực tế phải được xác định từ model/config hiện tại và ghi rõ trong báo cáo.
- Nếu thiếu quyền truy cập repository, môi trường, tài khoản test, secret cấu hình hoặc Production, phải dừng ở checkpoint tương ứng và báo chính xác thông tin còn thiếu; không giả định đã kiểm tra thành công.

### 1.8. Tiêu chí thành công định lượng

- 100% các quy tắc P0 có test Backend tương ứng, bao gồm cả case hợp lệ và case bị từ chối.
- 100% endpoint đọc/ghi dữ liệu học tập có kiểm tra enrollment và ownership/authorization phù hợp.
- 100% bước trong learning path được trả về với trạng thái do Backend tính; Frontend không có nhánh quyết định unlock dựa trên dữ liệu hard-code.
- Luồng E2E tối thiểu đi từ mở khóa học đến hoàn thành khóa học và kiểm chứng progress 100%.
- Course detail không có lỗi JavaScript nghiêm trọng hoặc request 5xx chưa được xử lý trong luồng chính trên môi trường được kiểm tra.
- Desktop và mobile không bị tràn ngang; các thao tác chính có thể thực hiện bằng bàn phím ở các màn hình đã sửa.

---

## 2. Yêu cầu chung

1. Phân tích code hiện tại của cả Frontend và Backend trước khi sửa.
2. Tái sử dụng cấu trúc, convention, component, service, DTO, entity/model và API hiện có nếu hợp lý.
3. Không tạo dữ liệu hard-code mới để giả lập tính năng.
4. Những logic quan trọng như:
   - Hoàn thành bài học.
   - Tính tiến độ.
   - Chấm bài kiểm tra.
   - Điều kiện mở khóa.
   - Quyền truy cập bài học.

   phải được kiểm tra và bảo vệ ở Backend.
5. Frontend chỉ hiển thị trạng thái mà Backend trả về, không tự quyết định quyền mở khóa.
6. Không làm hỏng các luồng đăng nhập, đăng ký khóa học và các tính năng đang hoạt động.
7. Sau khi sửa phải chạy:
   - Typecheck.
   - Build.
   - Test hiện có.
   - Bổ sung test cho các logic quan trọng.
8. Không commit file `.env`, secret, API key hoặc credential.
9. Không thay đổi kiến trúc lớn nếu chưa thật sự cần thiết.
10. Tách code hợp lý, tránh tạo một component hoặc service quá lớn.

### 2.1. Yêu cầu chức năng cấp cao

Các yêu cầu dưới đây là lớp kiểm tra tổng quát; các mục từ phần 3 đến phần 15 là đặc tả chi tiết và có quyền bổ sung cho các yêu cầu này.

| Mã | Yêu cầu | Kết quả phải kiểm chứng |
| --- | --- | --- |
| FR-01 | Course detail | Học viên đăng ký có thể mở đúng khóa học, tab, lesson preview và bước hiện tại. |
| FR-02 | Learning path | Lesson, assignment và quiz được trả về trong một thứ tự thống nhất, có `status`, `required` và `lockedReason`. |
| FR-03 | Progress | Tiến độ được Backend tính từ các bước bắt buộc và lưu được sau refresh. |
| FR-04 | Completion | Video/tài liệu chỉ hoàn thành khi đạt điều kiện tương ứng; không tin vào trạng thái do Frontend tự gửi. |
| FR-05 | Unlock | Chỉ Backend quyết định step được mở; truy cập bằng URL hoặc API trái phép phải bị từ chối. |
| FR-06 | Assignment | Đề bài, cấu hình hình thức nộp, validation, attachment và trạng thái submission được hiển thị và lưu đúng. |
| FR-07 | Quiz | Attempt được chấm ở Backend, khóa sau submit, không lộ answer key và hỗ trợ làm lại theo chính sách hiện có. |
| FR-08 | Navigation | `Tiếp tục học` và `Bước tiếp theo` điều hướng đúng theo current/next step do Backend trả về. |
| FR-09 | Resilience | Có loading/error/empty state; thao tác lặp lại không tạo dữ liệu trùng; lỗi API được xử lý rõ ràng. |

### 2.2. Yêu cầu phi chức năng

- **Bảo mật:** kiểm tra quyền ở mọi endpoint liên quan đến course, lesson, progress, assignment, submission, quiz và attempt; không đưa secret hoặc answer key không cần thiết xuống Frontend.
- **Tính nhất quán:** các thao tác cập nhật progress, submit và hoàn thành phải idempotent hoặc được chống double-submit.
- **Hiệu năng:** không gửi progress mỗi giây; danh sách learning path chỉ tải theo API cần thiết; không làm tăng đáng kể thời gian tải course detail hiện tại.
- **Responsive:** không tràn ngang ở mobile; desktop dùng layout hai vùng hợp lý; sidebar có drawer/sheet/accordion trên màn hình nhỏ.
- **Accessibility:** dùng semantic HTML, keyboard focus, label và trạng thái không phụ thuộc duy nhất vào màu sắc.
- **Quan sát lỗi:** lỗi nghiệp vụ có mã/thông báo có thể xử lý; không nuốt lỗi và không để debug log hoặc dữ liệu nhạy cảm trong Production.

### 2.3. Quy tắc hợp đồng API

Mỗi API mới hoặc API được sửa phải ghi rõ trong implementation/report:

- Quyền truy cập và điều kiện tiền đề.
- Request/response chính, trường bắt buộc và enum trạng thái.
- Status code cho thành công, validation error, unauthorized/forbidden, not found và conflict.
- Quy tắc idempotency và xử lý retry.
- Tác động tới migration, dữ liệu cũ và khả năng tương thích ngược.

Không bắt buộc dùng đúng tên route/DTO trong tài liệu nếu convention hiện tại khác, nhưng hành vi và dữ liệu tương đương phải được bảo đảm.

### 2.4. Checkpoint bắt buộc

Không chuyển sang UI hoặc deploy khi checkpoint trước chưa đạt:

1. **Audit:** xác định model, API, route, component và test hiện có ở cả hai repository.
2. **Backend contract:** learning path, progress, completion và unlock có test nghiệp vụ.
3. **Frontend integration:** UI dùng API thật, không còn mock/hard-code trong luồng chính.
4. **Verification:** typecheck, build, test liên quan và E2E đạt; lỗi còn lại được ghi rõ.
5. **Release:** chỉ commit/push/deploy khi có quyền và đã hoàn thành các kiểm tra an toàn tương ứng.

### 2.5. Lệnh kiểm chứng chuẩn

Chạy từ đúng thư mục repository. Nếu package manager hoặc script thực tế khác, phải ghi lại lệnh thay thế và lý do.

**Frontend — `EduAI-Front-End-Web`:**

```bash
npm ci
npm run build
npm test -- --run
npm run test:e2e
```

**Backend — `EduAI-Back-End`:**

```bash
npm ci
npm run prisma:validate
npm run build
npm test -- --runInBand
npm run test:e2e -- --runInBand
```

Không chạy `prisma migrate:dev`, seed, reset database hoặc test có ghi dữ liệu Production nếu chưa xác định rõ database đích và được phép thực hiện.

### 2.6. Thông tin cần chốt trước khi triển khai

Các câu hỏi dưới đây phải được đối chiếu trong lúc audit. Nếu chưa có quyết định hiện tại, dùng mặc định nêu trong ngoặc và ghi lại trong báo cáo:

- [ ] Ngưỡng hoàn thành video là bao nhiêu? (**Mặc định: 90%, cấu hình được theo hệ thống.**)
- [ ] Tài liệu hoàn thành theo thời gian xem, số trang, thao tác cuộn hay sự kiện xác nhận? (**Mặc định: không hoàn thành chỉ khi mở; dùng cơ chế theo dõi khả thi nhất và được Backend xác minh.**)
- [ ] Assignment hoàn thành khi nộp hay sau khi được chấm đạt? (**Mặc định: nộp thành công nếu không có cấu hình yêu cầu điểm.**)
- [ ] Quiz cho phép bao nhiêu lần làm lại và có giới hạn thời gian hay không? (**Mặc định: tuân theo policy/model hiện có; không tự mở rộng quyền.**)
- [ ] Tài khoản và dữ liệu test nào được phép dùng ở E2E/Production? (**Không dùng dữ liệu thật nếu chưa được chỉ định.**)
- [ ] Branch, quy trình CI/CD và quyền push/deploy nào được áp dụng? (**Chỉ thực hiện trong phạm vi quyền được cấp.**)

---

# 3. Trang chi tiết khóa học

## 3.1. Sửa toàn bộ nút và tab đang không hoạt động

Kiểm tra và làm cho các thành phần sau hoạt động thật:

- `Đăng ký học`
- `Xem giáo trình`
- Tab `Tổng quan`
- Tab `Bài học`
- Tab `Bài tập`
- Tab `Đánh giá`
- Từng bài học trong danh sách
- `Tiếp tục học`
- `Xem bài học thử`
- Link hoặc nút mở bài tập
- Link hoặc nút mở bài kiểm tra

## 3.2. Hành vi yêu cầu

### Xem giáo trình

- Cuộn xuống hoặc chuyển sang tab `Bài học`.
- Không reload toàn bộ trang nếu không cần thiết.

### Tiếp tục học

- Mở bước học chưa hoàn thành đầu tiên.
- Nếu đang có một bước `IN_PROGRESS`, ưu tiên mở bước đó.
- Nếu đã hoàn thành toàn bộ khóa học thì điều hướng tới trang tổng kết hoặc hiển thị trạng thái hoàn thành.

### Xem bài học thử

- Chỉ mở lesson được đánh dấu preview.
- Không được dùng một lesson hard-code cố định.
- Backend phải kiểm tra lesson đó có được phép preview hay không.

### Bài học bị khóa

- Không cho truy cập bằng cách click trực tiếp.
- Không cho truy cập trái phép bằng URL hoặc gọi API thủ công.
- Khi click vào bài bị khóa, hiển thị lý do cụ thể, ví dụ:
  - `Bạn cần hoàn thành bài tập "Xây dựng mô hình dự báo đầu tiên".`
  - `Bạn cần đạt tối thiểu 70% bài kiểm tra "Đánh giá kiến thức".`

---

# 4. Hoàn thành bài học video

## 4.1. Không cho tự đánh dấu hoàn thành

Đối với bài học video:

- Không hiển thị nút `Đánh dấu hoàn thành` thủ công.
- Không cho học viên tự gọi API hoàn thành nếu chưa xem đủ video.
- Hoàn thành phải dựa trên tiến độ xem thực tế.

## 4.2. Theo dõi tiến độ xem

Cần lưu tối thiểu:

```ts
{
  lessonId: string;
  watchedSeconds: number;
  durationSeconds: number;
  watchedPercent: number;
  lastPositionSeconds: number;
  completedAt: string | null;
}
```

Có thể mở rộng bằng danh sách các đoạn đã xem để tránh việc tua tới cuối.

## 4.3. Điều kiện hoàn thành

- Chỉ hoàn thành khi học viên đạt ngưỡng xem được cấu hình; mặc định là 90% tổng thời lượng nếu hệ thống chưa có cấu hình khác.
- Ngưỡng phải là một giá trị cụ thể trong khoảng 90%–95%, được Backend áp dụng thống nhất và được test; không dùng điều kiện mơ hồ “khoảng 90% đến 95%”.
- Không chỉ dựa vào sự kiện `ended`.
- Không được tính hoàn thành nếu người học kéo thanh thời gian tới cuối nhưng chưa xem đủ.
- Backend phải xác minh dữ liệu tiến độ.
- Khi đạt điều kiện, Backend tự cập nhật lesson progress thành `COMPLETED`.

## 4.4. Lưu tiến độ

- Lưu vị trí đang xem định kỳ.
- Khi reload trang, video tiếp tục từ vị trí gần nhất.
- Không gửi API liên tục mỗi giây.
- Có thể debounce hoặc gửi sau mỗi 5 đến 15 giây, khi pause, khi rời trang và khi video kết thúc.

## 4.5. Giao diện

Hiển thị trạng thái phù hợp:

- `Đang học - 62%`
- `Đã xem đủ`
- `Đã hoàn thành`
- `Tiếp tục từ 12:35`

Khi bài hoàn thành, nút chính chuyển thành:

- `Chuyển bước tiếp theo`

---

# 5. Bài học PDF, DOC, DOCX, PPT, PPTX và tài liệu

## 5.1. Hiển thị trong web

Tài liệu phải được nhúng trực tiếp trong khu vực học.

### PDF

Ưu tiên một trong các cách:

- PDF.js.
- `iframe` nếu URL và header cho phép.
- Viewer nội bộ hiện có của dự án.

### DOC, DOCX, PPT, PPTX

Ưu tiên:

- Backend tạo bản preview PDF khi upload.
- Lưu cả file gốc và file preview.
- Frontend hiển thị preview PDF.

Không dùng dịch vụ bên thứ ba có thể làm lộ tài liệu riêng tư nếu chưa được cấu hình rõ ràng.

## 5.2. Nút thao tác

Phải có:

- `Mở trong tab mới`
- `Tải xuống` nếu giảng viên cho phép
- Thông báo lỗi rõ ràng nếu file không xem được

## 5.3. Điều kiện hoàn thành tài liệu

Không nên chỉ mở tài liệu là hoàn thành ngay.

Có thể áp dụng:

- Đã mở viewer.
- Đã xem tối thiểu một khoảng thời gian.
- Đã cuộn hoặc xem gần hết số trang.
- Sau khi đủ điều kiện, Backend cập nhật lesson progress.

Nếu hệ thống hiện tại chưa đủ dữ liệu để theo dõi từng trang, triển khai phiên bản tối thiểu hợp lý nhưng không cho hoàn thành ngay lập tức khi vừa mở.

---

# 6. Thu nhỏ và tối ưu khung học

## 6.1. Vấn đề hiện tại

- Khung học quá cao.
- Header phía trên chiếm nhiều diện tích.
- Người dùng phải cuộn lên xuống nhiều.
- Sidebar bên phải dài và khó theo dõi.

## 6.2. Yêu cầu desktop

- Giảm chiều cao header khóa học.
- Viewer dùng chiều cao theo viewport.
- Có thể tham khảo:

```css
height: min(68vh, 720px);
```

- Viewer và sidebar phải nằm cùng hàng.
- Sidebar có chiều cao bằng khu vực học.
- Sidebar tự cuộn bên trong.
- Nội dung dưới viewer gọn hơn.
- Không để toàn bộ trang phải cuộn quá nhiều chỉ để xem video và lộ trình.

## 6.3. Yêu cầu mobile

- Sidebar chuyển thành drawer, sheet hoặc accordion.
- Không ép layout hai cột.
- Viewer full width.
- Các nút đủ lớn để thao tác trên điện thoại.
- Không bị tràn ngang.

---

# 7. Tiến độ khóa học

## 7.1. Phải tính cả bài học, bài tập và bài kiểm tra

Không chỉ tính số lesson.

Công thức:

```text
Tiến độ =
Số bước bắt buộc đã hoàn thành
/
Tổng số bước bắt buộc
× 100
```

Một bước bắt buộc có thể là:

- Video.
- Bài đọc.
- PDF hoặc tài liệu.
- Bài tập.
- Bài kiểm tra.

Ví dụ:

- 4 bài học.
- 1 bài tập.
- 1 bài kiểm tra.

Tổng là 6 bước. Hoàn thành 3 bước thì tiến độ là 50%.

## 7.2. Backend trả dữ liệu tiến độ

Không để Frontend tự cộng thủ công.

Ví dụ response:

```ts
{
  completedSteps: 3;
  totalSteps: 6;
  progressPercent: 50;
}
```

Có thể bổ sung:

```ts
{
  requiredCompletedSteps: 3;
  requiredTotalSteps: 6;
  optionalCompletedSteps: 1;
  optionalTotalSteps: 2;
}
```

## 7.3. Trạng thái hoàn thành khóa học

Khóa học chỉ hoàn thành khi:

- Tất cả bước bắt buộc đã hoàn thành.
- Các bài kiểm tra bắt buộc đã đạt điểm tối thiểu.
- Các bài tập bắt buộc đã thỏa điều kiện hoàn thành.

Không chỉ dựa vào việc xem hết lesson.

---

# 8. Learning path và điều kiện mở khóa

## 8.1. Hợp nhất thành một lộ trình

Không xử lý lesson, assignment và quiz như ba nhóm rời rạc.

Ví dụ lộ trình:

```text
1. Bài 1
2. Bài 2
3. Bài tập 1
4. Bài 3
5. Bài kiểm tra 1
6. Bài 4
```

## 8.2. Quy tắc mở khóa

Ví dụ:

- Hoàn thành Bài 2 mới mở Bài tập 1.
- Nộp hoặc đạt yêu cầu Bài tập 1 mới mở Bài 3.
- Hoàn thành Bài 3 mới mở Bài kiểm tra 1.
- Đạt tối thiểu 70% bài kiểm tra mới mở Bài 4.
- Nếu chưa đạt thì Bài 4 tiếp tục bị khóa.

## 8.3. Cấu trúc dữ liệu đề xuất

Có thể dùng cấu trúc tương đương:

```ts
type LearningStepType = "LESSON" | "ASSIGNMENT" | "QUIZ";

type LearningStepStatus =
  | "LOCKED"
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "COMPLETED";

interface LearningStep {
  id: string;
  type: LearningStepType;
  position: number;
  required: boolean;
  status: LearningStepStatus;
  lockedReason?: string | null;
  title: string;
  completionRequirement?: {
    type:
      | "VIEW_LESSON"
      | "WATCH_VIDEO"
      | "READ_DOCUMENT"
      | "SUBMIT_ASSIGNMENT"
      | "PASS_QUIZ";
    minimumPercent?: number;
  };
}
```

Không bắt buộc dùng đúng tên trên nếu schema hiện tại đã có cấu trúc tương đương.

## 8.4. Backend là nguồn sự thật

Backend phải quyết định:

- Step nào đang khóa.
- Step nào được phép truy cập.
- Step nào đã hoàn thành.
- Step tiếp theo là gì.
- Lý do khóa.
- Tiến độ hiện tại.

Frontend chỉ render theo response.

---

# 9. Sidebar bên phải

## 9.1. Thứ tự mới

Thứ tự yêu cầu:

```text
Tiến độ khóa học
Lộ trình
Bài tập
Bài kiểm tra
```

Đổi toàn bộ nhãn `Đánh giá` thành `Bài kiểm tra` trong ngữ cảnh quiz.

## 9.2. Accordion

Các phần sau phải đóng/mở được:

- Lộ trình.
- Bài tập.
- Bài kiểm tra.

Yêu cầu:

- Có icon mũi tên hoặc chevron.
- Click tiêu đề để đóng/mở.
- Mặc định mở `Lộ trình`.
- Có thể lưu trạng thái trong component hoặc session.
- Không làm mất trạng thái học khi đóng/mở.
- Mobile phải sử dụng thuận tiện.

## 9.3. Sidebar tổng thể

Có thể thêm nút:

- `Ẩn thanh bên`
- `Hiện thanh bên`

Trên desktop, khi ẩn sidebar, viewer mở rộng.
Trên mobile, sidebar mở dưới dạng drawer.

---

# 10. Khối “Bước tiếp theo”

## 10.1. Vị trí

Thêm một khối bên dưới viewer hoặc dưới thông tin bài học hiện tại.

Ví dụ:

```text
Bước tiếp theo
Bài tập: Xây dựng mô hình dự báo đầu tiên
[Tiếp tục]
```

## 10.2. Logic

- Nếu bước hiện tại chưa hoàn thành, nút phải giải thích điều kiện cần hoàn thành.
- Nếu bước tiếp theo khả dụng, điều hướng đến bước đó.
- Nếu bước tiếp theo là bài tập, mở trang bài tập.
- Nếu bước tiếp theo là bài kiểm tra, mở trang bài kiểm tra.
- Nếu bị khóa, hiển thị lý do khóa.
- Nếu đã hoàn thành toàn bộ khóa học, hiển thị:
  - `Đã hoàn thành khóa học`
  - hoặc `Xem kết quả khóa học`

Backend nên trả:

```ts
{
  currentStep: LearningStep;
  nextStep: LearningStep | null;
}
```

---

# 11. Bài kiểm tra

## 11.1. Đổi tên

Đổi toàn bộ tên hiển thị phù hợp từ:

- `Đánh giá`

thành:

- `Bài kiểm tra`

Không đổi các khái niệm review/rating khóa học nếu đó là phần đánh giá sao của học viên. Chỉ đổi phần quiz/assessment kiến thức.

## 11.2. Sau khi nộp bài

Sau khi người dùng nộp:

- Khóa toàn bộ radio.
- Khóa checkbox.
- Khóa textarea và input.
- Không cho thay đổi đáp án.
- Chuyển giao diện sang chế độ chỉ xem.
- Không hiện lại nút `Nộp bài`.
- Đổi thành nút `Làm lại`.

## 11.3. Hiển thị đúng hoặc sai

Sau khi chấm:

- Đáp án người dùng chọn đúng: hiển thị trạng thái đúng.
- Đáp án người dùng chọn sai: hiển thị trạng thái sai.
- Với tự luận ngắn, hiển thị trạng thái theo kết quả Backend trả về.
- Không hiển thị đáp án đúng nếu người dùng chọn sai.
- Không gửi đáp án đúng xuống Frontend nếu không được phép.
- Không để lộ answer key trong API trước khi nộp.

## 11.4. Điều kiện hoàn thành

- Nếu điểm đạt mức yêu cầu, đánh dấu quiz step là `COMPLETED`.
- Nếu không đạt, quiz step chưa hoàn thành.
- Bước tiếp theo vẫn khóa nếu quiz là điều kiện bắt buộc.
- Nút `Làm lại` tạo một attempt mới.
- Lưu lịch sử các lần làm.

## 11.5. Response đề xuất

```ts
{
  attemptId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  answers: Array<{
    questionId: string;
    selectedAnswer: unknown;
    isCorrect: boolean | null;
  }>;
}
```

Không bắt buộc đúng hoàn toàn cấu trúc trên nếu hệ thống hiện có DTO tương đương.

## 11.6. Lịch sử làm bài

Hiển thị:

- Lần làm.
- Thời gian nộp.
- Điểm.
- Phần trăm.
- Đạt hoặc chưa đạt.

---

# 12. Bài tập

## 12.1. Bổ sung đề bài đầy đủ

Trang bài tập phải có:

- Tiêu đề.
- Mô tả hoặc đề bài.
- Yêu cầu đầu ra.
- Tiêu chí chấm.
- Điểm tối đa.
- Hạn nộp.
- Loại file được phép.
- Dung lượng tối đa.
- Trạng thái nộp bài.
- Phản hồi hoặc điểm của giảng viên nếu có.

Không được chỉ hiển thị tiêu đề bài tập rồi để form nộp bài.

## 12.2. Hình thức nộp bài

Cho phép giảng viên cấu hình một hoặc nhiều hình thức:

- Nhập nội dung văn bản.
- Đính kèm đường dẫn.
- Tải file lên.

## 12.3. Đổi nhãn liên kết

Không dùng nhãn:

```text
Liên kết tệp HTTPS
```

Đổi thành:

```text
Đường dẫn bài làm
Dán liên kết Google Drive, GitHub hoặc sản phẩm đã triển khai
```

Backend vẫn phải validate URL an toàn.

## 12.4. Upload file

Thêm nút:

```text
Chọn file
```

Sau khi chọn:

- Hiển thị tên file.
- Hiển thị dung lượng.
- Hiển thị loại file.
- Có nút xóa.
- Có nút chọn lại.
- Hiển thị tiến trình upload nếu cần.

Ví dụ mô tả:

```text
Chấp nhận: PDF, DOCX, ZIP, PNG, JPG - tối đa 20 MB
```

Giới hạn thực tế phải lấy từ cấu hình Backend, không hard-code riêng ở Frontend.

## 12.5. Lưu file

Ưu tiên dùng cơ chế upload hiện có của dự án.

Nếu đang dùng object storage:

- Backend tạo presigned URL hoặc xử lý upload.
- Frontend không chứa secret storage.
- Backend lưu metadata attachment.
- Kiểm tra MIME type, extension và dung lượng.
- Không chỉ tin vào extension của file.

## 12.6. Điều kiện nộp bài

- Validate theo cấu hình của assignment.
- Nếu yêu cầu file thì phải có file.
- Nếu yêu cầu nội dung thì phải có nội dung.
- Nếu yêu cầu URL thì URL phải hợp lệ.
- Không cho submit form rỗng.
- Sau khi nộp thành công phải cập nhật trạng thái.
- Không upload file lại mỗi khi refresh.

## 12.7. Trạng thái hoàn thành assignment

Xác định theo cấu hình hiện tại:

- Hoàn thành ngay sau khi nộp.
- Hoặc chỉ hoàn thành sau khi giảng viên chấm đạt.

Nếu hệ thống chưa có quy tắc, ưu tiên:

- Assignment thường: hoàn thành khi nộp thành công.
- Assignment yêu cầu đạt điểm: hoàn thành khi điểm đạt ngưỡng.

---

# 13. API và Backend

## 13.1. Kiểm tra model hiện tại

Trước khi tạo migration mới, kiểm tra các model liên quan:

- Course.
- Section/module.
- Lesson.
- Enrollment.
- Lesson progress.
- Course progress.
- Assignment.
- Assignment submission.
- Quiz.
- Quiz attempt.
- Question.
- Answer.
- Attachment/media.

Chỉ tạo model mới nếu cấu trúc hiện tại không thể mở rộng hợp lý.

## 13.2. Các nhóm API cần có

Có thể giữ route hiện tại nếu đã tồn tại. Nếu thiếu thì bổ sung API tương đương.

### Learning path

```text
GET /courses/:courseId/learning-path
```

Trả về:

- Danh sách step theo đúng thứ tự.
- Trạng thái từng step.
- Lý do khóa.
- Current step.
- Next step.
- Tiến độ tổng.

### Lesson progress

```text
GET /lessons/:lessonId/progress
PATCH /lessons/:lessonId/progress
```

Dùng để lưu:

- Vị trí video.
- Thời gian đã xem.
- Tiến độ tài liệu.
- Trạng thái hoàn thành.

### Assignment

```text
GET /assignments/:assignmentId
POST /assignments/:assignmentId/submissions
GET /assignments/:assignmentId/submissions/me
```

### Quiz

```text
GET /quizzes/:quizId
POST /quizzes/:quizId/attempts
POST /quizzes/:quizId/attempts/:attemptId/submit
GET /quizzes/:quizId/attempts/me
GET /quizzes/:quizId/attempts/:attemptId
```

Route thực tế có thể khác theo convention của dự án.

## 13.3. Authorization

Backend phải kiểm tra:

- Người dùng đã đăng ký khóa học hay chưa.
- Lesson có phải preview hay không.
- Step đã được mở khóa chưa.
- Attempt có thuộc người dùng hiện tại hay không.
- Submission có thuộc người dùng hiện tại hay không.
- Không cho học viên xem answer key.
- Không cho học viên sửa submission hoặc attempt của người khác.

## 13.4. Idempotency

- Gửi progress nhiều lần không tạo bản ghi trùng.
- Đánh dấu hoàn thành nhiều lần không làm sai tiến độ.
- Submit quiz không được submit lại cùng attempt.
- Submit assignment phải tránh tạo bản ghi trùng do double click.

---

# 14. Frontend

## 14.1. Không hard-code

Xóa hoặc thay các phần hard-code liên quan đến:

- Course progress.
- Lesson list.
- Completion state.
- Quiz result.
- Assignment state.
- Locked state.
- Current user enrollment.
- Next step.

Tất cả phải lấy từ API hoặc state đã được hydrate từ API.

## 14.2. Loading và error state

Mỗi trang phải có:

- Loading state.
- Error state.
- Empty state.
- Retry khi phù hợp.
- Toast hoặc thông báo rõ ràng khi thao tác thất bại.

## 14.3. Điều hướng

Các route cần hoạt động đúng khi:

- Refresh trực tiếp.
- Mở URL trong tab mới.
- Back/forward trình duyệt.
- Truy cập step bị khóa.
- Truy cập course chưa đăng ký.

## 14.4. Accessibility

- Button phải là `button` hoặc link đúng semantic.
- Có keyboard focus.
- Accordion có `aria-expanded`.
- Input có label.
- Trạng thái đúng/sai không chỉ dựa vào màu sắc.
- Video có controls phù hợp.

---

# 15. Test bắt buộc

## 15.1. Backend tests

Bổ sung test cho:

1. Không thể hoàn thành video khi chưa đủ phần trăm xem.
2. Tua tới cuối không được tính hoàn thành.
3. Hoàn thành video khi đủ ngưỡng.
4. Progress không bị cộng trùng.
5. Bước tiếp theo bị khóa nếu assignment chưa hoàn thành.
6. Bước tiếp theo bị khóa nếu quiz chưa đạt.
7. Bước tiếp theo mở khi quiz đạt.
8. Course progress tính cả lesson, assignment và quiz.
9. Học viên không xem được answer key.
10. Không thể submit lại một quiz attempt đã submit.
11. Không thể truy cập lesson khóa bằng API.
12. Upload assignment kiểm tra loại và dung lượng file.

## 15.2. Frontend tests

Bổ sung test cho:

1. Nút `Xem giáo trình` hoạt động.
2. `Tiếp tục học` mở đúng step.
3. Step bị khóa hiển thị lý do.
4. Sidebar accordion đóng/mở.
5. Nút ẩn/hiện sidebar hoạt động.
6. Video không có nút hoàn thành thủ công.
7. PDF viewer có nút mở tab mới.
8. Quiz sau submit chuyển sang read-only.
9. Nút `Nộp bài` đổi thành `Làm lại`.
10. Đáp án đã chọn hiển thị đúng/sai.
11. Assignment có đề bài.
12. Assignment có nút chọn file.
13. Nút `Bước tiếp theo` điều hướng đúng.

## 15.3. E2E flow

Tạo hoặc cập nhật một luồng E2E tối thiểu:

1. Đăng nhập bằng tài khoản học viên.
2. Mở khóa học đã đăng ký.
3. Mở bài video.
4. Cập nhật progress.
5. Hoàn thành lesson.
6. Mở assignment.
7. Nộp nội dung hoặc file.
8. Mở quiz.
9. Nộp quiz không đạt và xác nhận step sau còn khóa.
10. Làm lại quiz và đạt.
11. Xác nhận step sau được mở.
12. Hoàn thành khóa học.
13. Xác nhận progress đạt 100%.

---

# 16. Acceptance Criteria

Task chỉ được coi là hoàn thành khi đáp ứng toàn bộ các điều kiện sau:

- Không còn nút giả hoặc nút không có hành vi trong trang chi tiết khóa học.
- Các tab hoạt động và hiển thị đúng dữ liệu.
- `Tiếp tục học` mở đúng bước cần học.
- Không thể truy cập bài bị khóa bằng giao diện hoặc API.
- Bài video không có nút tự đánh dấu hoàn thành.
- Tua video tới cuối không được tính hoàn thành.
- Video chỉ hoàn thành khi đạt ngưỡng xem.
- Refresh trang không làm mất vị trí video và tiến độ.
- PDF được nhúng trực tiếp trong web.
- PDF có nút mở sang tab mới.
- DOC/DOCX/PPT/PPTX có preview hợp lý hoặc fallback rõ ràng.
- Khung học trên desktop gọn hơn và không phải cuộn quá nhiều.
- Sidebar có thể đóng/mở từng phần.
- Có thể ẩn/hiện sidebar.
- Tiến độ tính cả lesson, assignment và quiz bắt buộc.
- Backend trả progress thay vì Frontend tự tính.
- Learning path có thứ tự thống nhất giữa lesson, assignment và quiz.
- Step tiếp theo khóa đúng theo điều kiện.
- Có lý do khóa rõ ràng.
- Có khối `Bước tiếp theo`.
- `Bước tiếp theo` điều hướng đúng.
- Đổi phần quiz từ `Đánh giá` thành `Bài kiểm tra`.
- Sau khi nộp quiz, form chuyển sang chỉ xem.
- Không cho sửa đáp án sau khi nộp.
- Hiển thị đáp án đã chọn đúng hoặc sai.
- Không hiện đáp án đúng khi người dùng chọn sai.
- Nút `Nộp bài` đổi thành `Làm lại`.
- Quiz đạt yêu cầu tự đánh dấu hoàn thành.
- Quiz chưa đạt không mở khóa step tiếp theo.
- Assignment hiển thị đầy đủ đề bài.
- Assignment có nút chọn file.
- Assignment hỗ trợ nội dung, URL và file theo cấu hình.
- Upload file được validate ở Backend.
- Không có secret storage trong Frontend.
- Build Frontend thành công.
- Build Backend thành công.
- Test liên quan đều pass.
- Không làm hỏng chức năng đăng nhập và đăng ký khóa học.

---

# 17. Thứ tự thực hiện

Thực hiện theo thứ tự sau để tránh sửa chắp vá:

1. Audit code hiện tại của cả hai repository.
2. Xác định model, API và UI đang có.
3. Hoàn thiện Backend learning path.
4. Hoàn thiện Backend progress calculation.
5. Hoàn thiện Backend unlock conditions.
6. Hoàn thiện video progress.
7. Hoàn thiện document progress và preview.
8. Hoàn thiện assignment submission và upload file.
9. Hoàn thiện quiz attempt, chấm điểm và review.
10. Kết nối Frontend course detail với API thật.
11. Sửa learning player.
12. Sửa sidebar accordion và responsive.
13. Thêm khối bước tiếp theo.
14. Viết test.
15. Chạy build và test.
16. Tổng hợp thay đổi.

---

# 18. Yêu cầu đầu ra từ Codex

Sau khi hoàn thành, báo cáo theo mẫu:

## Summary

- Các chức năng đã triển khai.
- Những phần Frontend đã sửa.
- Những phần Backend đã sửa.

## Database changes

- Model đã thay đổi.
- Migration đã tạo.
- Lý do thay đổi.

## API changes

- API mới.
- API đã sửa.
- Request và response chính.

## UI changes

- Trang đã sửa.
- Component mới.
- Hành vi mới.

## Tests

- Test đã thêm.
- Kết quả chạy test.
- Kết quả build.

## Remaining issues

- Các vấn đề chưa thể hoàn thành.
- Lý do.
- Hướng xử lý tiếp theo.

## Files changed

Liệt kê các file quan trọng đã tạo hoặc chỉnh sửa.

---

# 19. Lưu ý cuối

Đây là một epic hoàn thiện trải nghiệm học tập, không phải task chỉ chỉnh CSS.

Ưu tiên:

1. Logic đúng.
2. Backend bảo vệ nghiệp vụ.
3. Không hard-code.
4. Không làm hỏng tính năng cũ.
5. UI dễ sử dụng.
6. Responsive.
7. Có test.

---

# 20. Git, commit, push, deploy VPS và kiểm tra Production

Codex được phép tự thực hiện toàn bộ quy trình sau sau khi code và test local thành công:

1. Kiểm tra trạng thái Git của cả Frontend và Backend.
2. Chỉ commit các file liên quan trực tiếp đến task.
3. Không commit:
   - `.env`
   - Secret
   - API key
   - Credential
   - File build tạm
   - File log
   - Dữ liệu cá nhân
4. Tạo commit message rõ ràng, có thể tách thành nhiều commit hợp lý giữa Backend và Frontend.
5. Push code lên đúng branch/repository đang triển khai.
6. Theo dõi quá trình CI/CD và deploy lên VPS.
7. Chờ deploy hoàn tất thành công trước khi kết luận task đã hoàn thành.
8. Sau khi deploy, kiểm tra trực tiếp trên môi trường Production:

```text
https://eduai.giaoducso.org.vn
```

Không được chỉ kiểm tra trên localhost.

## 20.1. Điều kiện trước khi commit và push

Trước khi commit, bắt buộc:

- Review `git diff`.
- Chạy typecheck.
- Chạy build.
- Chạy test liên quan.
- Kiểm tra migration.
- Kiểm tra không có secret bị đưa vào Git.
- Kiểm tra không có debug log hoặc mock data không cần thiết.
- Kiểm tra Frontend đang trỏ đúng API Production thông qua cấu hình môi trường, không hard-code URL local.

Nếu build hoặc test thất bại thì phải sửa trước, không push code đang lỗi.

## 20.2. Quy tắc commit

Có thể dùng commit tương tự:

```text
feat(learning): implement learning path and progress rules
feat(assignments): support assignment details and file submissions
feat(quizzes): complete quiz attempts and result review
feat(ui): improve course player navigation and responsive sidebar
```

Không bắt buộc dùng đúng message trên, nhưng message phải mô tả đúng thay đổi.

Nếu hai repository độc lập thì phải commit và push riêng cho từng repository.

## 20.3. Theo dõi deploy

Sau khi push:

- Kiểm tra workflow CI/CD, GitHub Actions hoặc cơ chế deploy hiện tại của dự án.
- Xác định commit đã được VPS nhận.
- Chờ trạng thái deploy thành công.
- Nếu deploy thất bại:
  - Đọc log.
  - Xác định nguyên nhân.
  - Sửa code hoặc cấu hình phù hợp.
  - Commit và push bản sửa.
  - Chờ deploy lại.
- Không kết luận hoàn thành khi workflow hoặc VPS vẫn đang lỗi.

Không tự ý thay đổi secret Production nếu không cần thiết. Nếu thiếu secret hoặc quyền truy cập khiến không thể deploy, phải báo rõ tên biến/cấu hình còn thiếu, nhưng không được ghi giá trị secret vào báo cáo.

## 20.4. Migration Production

Nếu có thay đổi database:

- Tạo migration đúng theo convention của Backend.
- Không dùng lệnh xóa hoặc reset database Production.
- Không dùng `prisma migrate reset` trên Production.
- Không làm mất dữ liệu hiện có.
- Deploy migration bằng cơ chế an toàn của dự án, ví dụ `prisma migrate deploy` nếu dự án dùng Prisma.
- Kiểm tra migration đã chạy thành công trên VPS.
- Nếu migration có nguy cơ breaking change, phải dùng chiến lược tương thích ngược.

## 20.5. Kiểm tra trực tiếp trên Production

Sau khi deploy thành công, mở và kiểm tra:

```text
https://eduai.giaoducso.org.vn
```

Phải kiểm tra tối thiểu các luồng sau trên Production:

1. Trang chủ tải bình thường.
2. Đăng nhập hoạt động.
3. Trang chi tiết khóa học tải được.
4. Các tab và nút trong trang chi tiết khóa học hoạt động.
5. `Tiếp tục học` mở đúng bước.
6. Video lưu tiến độ.
7. Tua đến cuối không tự hoàn thành sai.
8. Video hoàn thành khi xem đủ ngưỡng.
9. PDF/tài liệu hiển thị trong web.
10. Nút mở tài liệu ở tab mới hoạt động.
11. Sidebar đóng/mở được.
12. Khối `Bước tiếp theo` hoạt động.
13. Bài tập hiển thị đề bài.
14. Chọn và upload file bài tập hoạt động.
15. Nộp bài tập hoạt động.
16. Bài kiểm tra nộp được.
17. Sau khi nộp, đáp án ở chế độ chỉ xem.
18. Nút chuyển thành `Làm lại`.
19. Không đạt thì bài tiếp theo bị khóa.
20. Đạt thì bài tiếp theo được mở.
21. Tiến độ khóa học cập nhật đúng.
22. Refresh trang không làm mất trạng thái.
23. Không xuất hiện lỗi nghiêm trọng trong Console.
24. Không có request API lỗi 500 không được xử lý.
25. Kiểm tra responsive tối thiểu ở desktop và mobile viewport.

## 20.6. Kiểm tra API Production

Ngoài giao diện, kiểm tra:

- API health check nếu có.
- API trả đúng status code.
- Không có CORS error.
- Cookie/token hoạt động đúng trên domain Production.
- File/video/PDF không bị lỗi CORS hoặc mixed content.
- Upload file hoạt động với storage Production.
- Không có URL `localhost`, `127.0.0.1` hoặc domain staging bị hard-code trong bundle Production.

## 20.7. Không phá dữ liệu Production

Khi kiểm thử trên Production:

- Ưu tiên dùng tài khoản test có sẵn.
- Không xóa dữ liệu thật.
- Không sửa khóa học thật nếu không cần thiết.
- Không tạo hàng loạt dữ liệu rác.
- Những dữ liệu test tạo ra phải có tên dễ nhận biết và được dọn dẹp khi an toàn.
- Không chạy seed tự động lên Production nếu seed có thể ghi đè hoặc xóa dữ liệu.

## 20.8. Điều kiện hoàn thành cuối cùng

Task chỉ được đánh dấu hoàn thành khi:

- Code local đã build và test thành công.
- Đã commit thay đổi.
- Đã push lên remote.
- CI/CD thành công.
- VPS deploy thành công.
- Migration Production thành công nếu có.
- Đã kiểm tra trực tiếp trên `https://eduai.giaoducso.org.vn`.
- Các luồng chính hoạt động trên Production.
- Không có lỗi nghiêm trọng trong browser console và network.
- Báo cáo cuối có commit hash và trạng thái deploy.

## 20.9. Báo cáo bổ sung từ Codex

Trong báo cáo cuối, bổ sung:

### Git

- Repository.
- Branch.
- Commit hash.
- Commit message.
- Trạng thái push.

### Deployment

- Workflow hoặc cơ chế deploy đã dùng.
- Trạng thái deploy Frontend.
- Trạng thái deploy Backend.
- Trạng thái migration.
- Thời điểm kiểm tra Production.

### Production verification

- URL đã kiểm tra: `https://eduai.giaoducso.org.vn`
- Các luồng đã kiểm tra.
- Luồng pass.
- Luồng fail.
- Lỗi Console/Network nếu có.
- Bằng chứng hoặc mô tả ngắn kết quả kiểm tra.

Nếu Codex không có quyền push, không có quyền xem deploy hoặc không truy cập được Production thì phải dừng ở bước tương ứng và báo chính xác quyền hoặc thông tin còn thiếu. Không được tuyên bố đã deploy hoặc đã kiểm tra Production khi chưa thực hiện thật.
