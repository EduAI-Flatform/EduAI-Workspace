Bạn đang làm việc trên dự án EduAI.

Repository Frontend:
https://github.com/EduAI-Flatform/EduAI-Front-End-Web

Repository Backend:
https://github.com/EduAI-Flatform/EduAI-Back-End

Google Stitch Project:
https://stitch.withgoogle.com/projects/13344636180266816510?pli=1

====================================================
MỤC TIÊU
====================================================

Thiết kế lại:

1. Trang học bài.
2. Trang làm bài kiểm tra.
3. Trang kết quả bài kiểm tra.

Theo phong cách của project Stitch hiện có.

Không được chỉ lập kế hoạch.

Phải trực tiếp:

- kiểm tra source code
- chạy project
- dùng Chrome MCP
- dùng Stitch MCP
- chỉnh sửa code
- kiểm tra lại giao diện

====================================================
BƯỚC 1 - KIỂM TRA REPOSITORY
====================================================

- Kiểm tra git status.
- Không ghi đè thay đổi chưa commit.
- Xác định framework.
- Xác định router.
- Xác định UI library.
- Xác định component library.
- Xác định Design System.
- Xác định vị trí các component:
  - Lesson
  - Course Learning
  - Quiz
  - Quiz Result
  - Sidebar
  - Progress
  - Video Player
  - Document Viewer

====================================================
BƯỚC 2 - CHROME MCP
====================================================

Khởi động frontend.

Mở bằng Chrome MCP.

Kiểm tra:

- Lesson Page
- Quiz Page
- Quiz Result

Chụp trạng thái hiện tại.

Kiểm tra:

- responsive
- spacing
- typography
- alignment
- sticky
- progress
- completion logic

====================================================
BƯỚC 3 - STITCH MCP
====================================================

Mở project Stitch.

Đọc toàn bộ project.

Liệt kê tất cả các Screen.

Xác định:

- Lesson Screen
- Quiz Screen
- Quiz Result Screen

====================================================
QUY TẮC LÀM VIỆC VỚI STITCH
====================================================

TUYỆT ĐỐI KHÔNG tạo thêm Screen nếu project đã có.

Trước khi Generate bất kỳ Screen nào phải:

1. Kiểm tra toàn bộ project.
2. Xác định Screen đã tồn tại hay chưa.

Nếu Screen đã tồn tại:

- Không Generate.
- Không Duplicate.
- Không tạo V2.
- Không tạo Copy.
- Không tạo New Screen.

Chỉ được mở đúng Screen đó.

Sau đó nhập Prompt để Stitch cập nhật chính Screen đó.

Nếu Screen chưa tồn tại:

Lúc đó mới được Generate Screen mới.

Không được tạo project mới.

Không được duplicate.

====================================================
PROMPT CHO STITCH
====================================================

Nếu phát hiện thiếu Screen:

KHÔNG tự nghĩ Prompt.

Hãy sử dụng đúng Prompt tương ứng ở phía dưới.

Nếu Screen đã tồn tại:

Không Generate.

Chỉ dùng Prompt Update.

====================================================
TRANG HỌC BÀI
====================================================

Nếu đã tồn tại:

Dùng Prompt:

"Update the current Lesson Learning screen."

Không Generate.

Nếu chưa tồn tại:

Generate bằng Prompt Lesson Screen bên dưới.

====================================================
TRANG QUIZ
====================================================

Nếu đã tồn tại:

Update current screen.

Không Generate.

Nếu chưa tồn tại:

Generate bằng Prompt Quiz Screen.

====================================================
TRANG QUIZ RESULT
====================================================

Nếu đã tồn tại:

Update current screen.

Không Generate.

Nếu chưa tồn tại:

Generate bằng Prompt Quiz Result Screen.

====================================================
SAU KHI STITCH HOÀN THÀNH
====================================================

Dùng đúng thiết kế trong Stitch.

Triển khai vào source code.

Không copy pixel-perfect.

Chỉ học:

- layout
- spacing
- hierarchy
- UX
- typography
- responsive

====================================================
CÁC YÊU CẦU CHỈNH SỬA
====================================================

Lesson:

- Sidebar trái giống Stitch
- Nội dung giữa
- AI Sidebar phải
- Video nhỏ lại
- Không phải cuộn quá nhiều
- PDF nhúng trực tiếp
- Có Open New Tab
- Có Previous
- Next
- Complete Lesson

Quiz:

- Header cân đối
- Back button không bị lệch
- Title thẳng hàng
- Question Card đẹp hơn

Quiz Result:

- Score Card đẹp hơn
- Progress Ring
- History
- Attempt
- Retry
- Pass/Fail
- Sticky Sidebar

====================================================
LOGIC
====================================================

Không phá API.

Không hardcode.

Không dùng dữ liệu giả.

Giữ nguyên business logic.

Nếu cần thay đổi logic thì ghi rõ lý do.

====================================================
KIỂM TRA
====================================================

Sau khi sửa:

- npm lint
- typecheck
- build

Mở Chrome MCP.

Kiểm tra:

Desktop

Laptop

Tablet

Mobile

Không còn:

- Layout lệch
- Overflow
- Runtime Error
- Hydration Error
- Console Error

====================================================
BÁO CÁO
====================================================

Cuối cùng báo cáo:

- File đã sửa
- Component mới
- Điều gì lấy từ Stitch
- Điều gì thay đổi cho phù hợp EduAI
- API cần backend hỗ trợ
- Ảnh sau khi hoàn thành

PROMPT LESSON SCREEN (chỉ dùng nếu chưa có màn hình học bài)
Create a modern Learning Lesson page for EduAI.

Three-column desktop layout.

Left:

- Course curriculum
- Accordion chapters
- Lesson status
- Completed
- Locked
- Current lesson

Center:

- Video player
- Document viewer
- Lesson title
- Duration
- Difficulty
- Description
- Key takeaways
- Previous
- Next
- Complete Lesson

Right:

- AI Assistant
- Ask AI
- Lesson Summary
- Suggested Questions
- Flashcards

Modern LMS UI.

Clean.

Professional.

Blue accent.

Rounded cards.

Soft shadow.

Responsive.

Tablet.

Mobile.

Do not use dark theme.

PROMPT QUIZ SCREEN (chỉ dùng nếu chưa có màn hình làm bài)
Create a Quiz Taking page for EduAI.

Include:

- Header
- Back to Course
- Quiz title
- Description

Question cards

Single choice

Multiple choice

True False

Short Answer

Sidebar

Question Navigator

Remaining Time

Progress

Submit Button

Modern LMS style.

Professional.

Blue accent.

Responsive.

Desktop.

Tablet.

Mobile.
