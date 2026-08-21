# Handoff: Hoàn thiện chi tiết khóa học

## Phạm vi

- Cập nhật frontend cho Learning Lesson, Quiz Taking và trạng thái Quiz Result.
- Không thay đổi backend API, schema hoặc business rule tiến độ.
- Không tạo screen mới trong Stitch; project đã có screen `Học bài - AILearn`. Stitch chưa có screen Quiz/Quiz Result riêng.

## Thay đổi chính

- `LearningPage`: bố cục responsive 3 cột — curriculum trái, nội dung giữa, AI Assistant phải; tablet chuyển AI xuống dưới; mobile ưu tiên nội dung bài học.
- `LessonPlayer`: PDF iframe trực tiếp + mở tab mới, điều hướng Bài trước/Bài tiếp theo, Hoàn thành bài học và trạng thái disabled khi video chưa đạt ngưỡng tiến độ.
- `LessonAssistant`: gọi các API AI hiện có cho hỏi đáp, tóm tắt và flashcard; không hiển thị dữ liệu giả.
- `QuizAttemptPage`: progress ring, question navigator, question cards rõ hơn, result ring, lịch sử attempt và sidebar sticky responsive.

## Tham chiếu Stitch

- Palette: Primary `#3B82F6`, Secondary `#8B5CF6`, Tertiary `#10B981`, Neutral `#0F172A`.
- Typography: Plus Jakarta Sans cho heading, Inter cho body.
- UX lấy từ screen `Học bài - AILearn`: sidebar curriculum, video gọn, hierarchy rõ, AI panel, controls ở cuối nội dung.

## API cần backend hỗ trợ

- Không cần API mới.
- Tận dụng `PATCH /lessons/:lessonId/progress` cho hoàn thành tài liệu.
- Tận dụng `/ai/chat`, `/ai/summary`, `/ai/flashcards` cho AI Assistant.

## Verification

- `npm.cmd test -- --run`: 47 tests passed.
- `npm.cmd run build`: passed; build vẫn có cảnh báo chunk > 500 kB hiện hữu.
- `npm.cmd run lint`: không chạy được vì package chưa khai báo script `lint`.
- Chrome: route protected redirect đúng về login, console không có warning/error; kiểm tra Lesson/Quiz đầy đủ bị giới hạn vì Chrome session không có demo auth.
- Targeted Playwright E2E bị timeout ở backend readiness `/api/v1/courses` sau 180s; không tiếp tục retry khi backend chưa sẵn sàng.
