# Handoff: Hoàn thiện luồng học tập EduAI

## Đã triển khai

- Backend trả learning path thống nhất gồm lesson, assignment, quiz; tính `currentStep`, `nextStep`, trạng thái khóa và progress từ dữ liệu thật.
- Progress lesson có vị trí video, watched/max watched, duration, document percent; video hoàn thành ở ngưỡng 90% và chống tua tới cuối.
- Bổ sung `GET/PATCH /lessons/:id/progress`; route hoàn thành cũ không còn tự ghi completed.
- Assignment hỗ trợ text, HTTPS URL và multipart file; MIME/signature/dung lượng được validate ở Backend, lưu metadata và policy file trong Assignment.
- Quiz trả kết quả selected answer + `isCorrect` nhưng không trả answer key; Frontend khóa form sau submit và hỗ trợ làm lại.
- Course detail tabs, preview lesson, enroll/continue, assignment navigation, review metrics hoạt động; learning player có resume, next-step, accordion lộ trình và ẩn/hiện sidebar.

## Database/migration

- `learning_progress`: watched/duration/position/max watched/document percent.
- `submissions`: file name/size/MIME.
- `assignments`: instructions, rubric, allowed MIME types, max file size.
- Migrations: `20260805000000_add_learning_progress_tracking`, `20260805010000_add_submission_file_metadata`, `20260805020000_add_assignment_requirements`.

## Commits

- Backend: `1e8552f`, `f0dd2fc`.
- Frontend: `4e991cb`, `4b0445b`, `31244fa`, `a832491`, `25024fc`.

## Verification

- Backend: `prisma validate`, build, 56 suites / 309 tests pass với `AI_PROVIDER=mock`.
- Frontend: build và 14 suites / 44 tests pass.
- E2E: đã bổ sung assertion learning-path vào smoke flow; đã thử `npm.cmd run test:e2e` nhưng môi trường Playwright bị treo ở bước khởi động API/Vite, nên chưa có bằng chứng runtime thành công.
- Production/VPS: chưa thực hiện; không có quyền/secret/database Production trong phiên này.

## Cần làm trước khi release

- Chạy migration bằng cơ chế deploy an toàn trên database đích.
- Chạy E2E với configured demo-account secret, database/seed hợp lệ và browser runtime; bổ sung flow video → assignment → quiz fail/pass → 100%.
- Kiểm tra R2 production: account, access key, secret, bucket và public URL; không dùng fallback storage URL ở production.
- Rà visual trên mobile/desktop và kiểm tra bundle warning chunk >500KB nếu cần tối ưu.
