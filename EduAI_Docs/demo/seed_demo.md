Hoàn thiện bộ dữ liệu demo để kiểm thử đầy đủ phiên bản 1 hiện tại của EduAI trên cả hai repository:

Backend: https://github.com/EduAI-Flatform/EduAI-Back-End
Frontend: https://github.com/EduAI-Flatform/EduAI-Front-End-Web
Mục tiêu chính

Tạo một môi trường demo hoàn chỉnh, có thể seed lại nhiều lần, để kiểm thử toàn bộ tính năng đang có trong phiên bản 1.

Backend hiện đã có hệ thống demo seed tại:

prisma/seed.ts
prisma/demo-seed.ts
prisma/demo-fixtures.ts
prisma/demo-contract.ts
prisma/verify-demo.ts
Lệnh npm run db:seed:demo
Lệnh npm run db:verify:demo
Lệnh npm run test:demo-data

Hãy tận dụng và mở rộng hệ thống seed hiện có, không tạo một hệ thống seed trùng lặp.

1. Tạo đúng 10 khóa học mẫu về AI

Hiện dữ liệu demo đang có 9 khóa học. Hãy chỉnh thành đúng 10 khóa học, tất cả đều liên quan trực tiếp đến AI và phù hợp để trình diễn nền tảng EduAI.

Có thể sử dụng danh sách sau:

Nhập môn Trí tuệ nhân tạo
Machine Learning với Python
Deep Learning từ cơ bản đến nâng cao
Generative AI và Prompt Engineering
Xây dựng ứng dụng với OpenAI API
AI trong Marketing và sáng tạo nội dung
Data Science và phân tích dữ liệu với AI
Computer Vision thực chiến
Natural Language Processing thực chiến
AI Automation cho doanh nghiệp

Tên khóa học có thể điều chỉnh để phù hợp với giao diện hiện tại nhưng phải giữ đúng 10 khóa học về AI.

Mỗi khóa học phải có dữ liệu đủ sâu để kiểm thử thực tế, không chỉ có tiêu đề và mô tả.

Mỗi khóa học tối thiểu cần có:

Giảng viên hợp lệ
Slug riêng
Mô tả ngắn và mô tả đầy đủ
Cấp độ
Trạng thái published
Visibility public
Thumbnail phù hợp
Giá hoặc trạng thái miễn phí tùy schema hiện tại
Khoảng 4–6 bài học
Bài học video
Bài học dạng nội dung văn bản
Bài học có tài liệu
Một số bài được xem thử
Thời lượng hợp lý
Thứ tự bài học chính xác

Không sử dụng cùng một thumbnail placeholder cho toàn bộ 10 khóa học nếu frontend hiện có khả năng hiển thị ảnh khác nhau. Có thể sử dụng ảnh demo ổn định từ thư mục public, URL công khai ổn định hoặc tạo bộ SVG demo riêng trong frontend.

2. Phủ dữ liệu cho toàn bộ chức năng phiên bản 1

Mười khóa học phải được liên kết với dữ liệu demo để người kiểm thử có thể đăng nhập và sử dụng gần như toàn bộ chức năng hiện có.

Phân bổ dữ liệu hợp lý cho các chức năng sau, tùy theo schema và API thực tế của dự án:

Học tập
Enrollment
Tiến độ học tập
Bài học đã hoàn thành
Bài học đang học
Khóa học chưa bắt đầu
Khóa học đã hoàn thành
Lịch sử truy cập bài học
Đánh giá khóa học

Tài khoản học viên demo chính phải có nhiều trạng thái khác nhau:

Đã đăng ký một số khóa
Đang học một số khóa
Hoàn thành ít nhất một khóa
Chưa đăng ký một số khóa
Có đánh giá khóa học
Có tiến độ học khác nhau

Không đăng ký học viên demo vào toàn bộ 10 khóa vì cần giữ lại dữ liệu để kiểm thử luồng đăng ký khóa học mới.

Quiz

Tạo vừa đủ dữ liệu để kiểm thử:

Quiz đã published
Nhiều loại câu hỏi mà hệ thống đang hỗ trợ
Đáp án đúng
Giải thích đáp án
Điểm đạt
Giới hạn thời gian nếu đang hỗ trợ
Quiz attempt đã đạt
Quiz attempt chưa đạt hoặc điểm thấp
Một quiz chưa làm

Không cần tạo quiz cho toàn bộ bài học. Chỉ cần phân bổ đủ trên một số khóa học để kiểm thử đầy đủ các trạng thái.

Assignment

Tạo dữ liệu để kiểm thử:

Bài tập đang mở
Bài tập sắp hết hạn
Bài tập đã quá hạn nếu hệ thống hỗ trợ
Submission đã nộp
Submission đang chờ chấm
Submission đã chấm
Điểm và nhận xét của giảng viên
Chứng chỉ

Tạo dữ liệu vừa đủ để kiểm thử:

Certificate template
Chứng chỉ đã cấp cho học viên hoàn thành khóa học
Liên kết đúng user, course và template
Preview hoặc mã chứng chỉ nếu schema hiện tại hỗ trợ
Thư viện tài nguyên

Seed vừa đủ:

Danh mục
Tag
Tài liệu PDF
Video
Link ngoài
Tài nguyên public
Tài nguyên được lưu bởi học viên
Cộng đồng

Seed vừa đủ:

Bài đăng từ học viên
Bài đăng từ giảng viên
Bình luận
Phản hồi nếu schema hỗ trợ
Reaction
Nhiều trạng thái tương tác để kiểm thử UI
Hồ sơ người dùng

Giữ hoặc bổ sung dữ liệu phù hợp:

Học viên
Giảng viên
Platform admin
Profile
Skills
Portfolio
Avatar
Headline
Bio

Không cần tạo quá nhiều user. Chỉ cần số lượng vừa đủ để dữ liệu hiển thị tự nhiên và kiểm thử được phân quyền.

3. Lớp học trực tuyến: tạm bỏ điều kiện admin duyệt người vào lớp

Hiện phiên bản 1 chưa có giao diện hoặc bảng quản trị hoàn chỉnh để admin duyệt người dùng vào lớp học trực tuyến.

Hãy kiểm tra toàn bộ backend và frontend của chức năng lớp học trực tuyến, sau đó tạm thời loại bỏ yêu cầu:

Admin phải duyệt học viên
Admin phải thêm học viên vào lớp
Học viên phải chờ phê duyệt mới được tham gia

Luồng tạm thời của phiên bản 1 phải là:

Giảng viên tạo hoặc quản lý buổi học trực tuyến theo quyền hiện tại.
Học viên đã đăng ký khóa học có chứa buổi học được phép xem thông tin buổi học.
Khi buổi học cho phép tham gia theo thời gian và trạng thái hiện tại, học viên đã đăng ký khóa học được vào lớp trực tiếp.
Không cần admin thêm thủ công học viên vào lớp.
Không cần trạng thái chờ admin duyệt.
Người chưa đăng ký khóa học vẫn không được vào lớp.
Người không có quyền vẫn phải bị backend từ chối, không chỉ ẩn nút ở frontend.

Không xóa dữ liệu hoặc bảng phục vụ approval nếu chúng có thể được dùng trong phiên bản sau. Chỉ tạm vô hiệu hóa hoặc bỏ chúng khỏi luồng hiện tại một cách rõ ràng, dễ khôi phục.

Nếu code hiện tại chưa có bảng approval nhưng đang kiểm tra một điều kiện tương đương, hãy loại bỏ đúng điều kiện đó.

Cập nhật đồng bộ:

Service backend
Guard hoặc authorization
Controller/API
DTO nếu cần
Swagger
Frontend API client
Nút tham gia lớp
Thông báo lỗi
Trạng thái loading
Empty state
Unit test và e2e test liên quan 4. Dữ liệu lớp học trực tuyến

Seed ít nhất:

Một buổi sắp diễn ra
Một buổi đang diễn ra hoặc có thể tham gia để test
Một buổi đã kết thúc
Một bản ghi attendance
Một recording cho buổi đã kết thúc
Một buổi thuộc khóa học mà học viên demo đã đăng ký
Một buổi thuộc khóa học mà học viên demo chưa đăng ký để kiểm thử chặn quyền

Do thời gian seed được chạy ở nhiều thời điểm khác nhau, thời gian buổi học phải được tính tương đối từ thời điểm seed, không hard-code một ngày đã hết hạn.

5. Tài khoản demo

Giữ ba tài khoản demo chính hiện tại:

student.demo@eduai.local
instructor.demo@eduai.local
admin.demo@eduai.local

Mật khẩu tiếp tục lấy từ cơ chế demo seed hiện tại, không hard-code mật khẩu mới trong source code.

Đảm bảo:

Học viên có dữ liệu học tập đầy đủ
Giảng viên có khóa học, quiz, assignment và lớp học để quản lý
Admin có thể đăng nhập và kiểm thử các API thuộc quyền admin đang tồn tại
Các tài khoản demo không bị trùng email
Seed chạy lại không tạo dữ liệu trùng 6. Yêu cầu kỹ thuật cho seed

Seed phải:

Idempotent
Có UUID ổn định
Không tạo bản ghi trùng khi chạy lại
Không phụ thuộc dữ liệu ngẫu nhiên khó kiểm thử
Không phá dữ liệu ngoài phạm vi demo
Không dùng deleteMany() toàn bộ database một cách nguy hiểm
Giữ quan hệ khóa ngoại hợp lệ
Sắp xếp thứ tự seed đúng dependency
Có expected counts được cập nhật
Có kiểm tra tính toàn vẹn fixture
Có verify script kiểm tra dữ liệu sau seed

Cập nhật toàn bộ các giá trị trong DEMO_EXPECTED_COUNTS để phản ánh đúng dữ liệu mới.

Mở rộng assertDemoFixtureContract() và verifyDemoData() để kiểm tra tối thiểu:

Có đúng 10 khóa học AI
Mỗi khóa học có bài học
Slug không trùng
Có đủ ba role chính
Tài khoản demo tồn tại
Học viên demo có enrollment
Vẫn có ít nhất một khóa chưa đăng ký
Có learning progress
Có review
Có quiz, question và attempt
Có assignment và submission
Có classroom session
Học viên đã đăng ký có thể tham gia lớp theo authorization mới
Học viên chưa đăng ký bị chặn
Có library resource
Có community data
Có certificate 7. Kiểm tra và sửa frontend

Kiểm tra frontend để bảo đảm dữ liệu demo hiển thị đúng ở toàn bộ các trang hiện có, đặc biệt:

Trang chủ
Danh sách khóa học
Chi tiết khóa học
Khóa học của tôi
Trang học bài
Tiến độ học
Quiz
Assignment
Chứng chỉ
Lớp học trực tuyến
Thư viện
Cộng đồng
Hồ sơ học viên
Hồ sơ giảng viên
Dashboard theo role

Sửa các vấn đề phát hiện trong quá trình kiểm thử như:

Dữ liệu không hiển thị
Mapping sai field
Giá trị null làm vỡ giao diện
Ảnh bị lỗi
Loading vô hạn
Empty state không đúng
Sai đường dẫn
Nút không hoạt động
Nút tham gia lớp vẫn yêu cầu admin duyệt
API frontend không khớp backend
Giao diện bị vỡ trên desktop hoặc mobile
Nhãn tiếng Việt không thống nhất

Không redesign toàn bộ hệ thống. Chỉ sửa những phần cần thiết để phiên bản 1 hoạt động ổn định và dữ liệu demo hiển thị đẹp, nhất quán với giao diện hiện tại.

8. Quy trình thực hiện

Trước khi sửa code:

Đọc AGENTS.md, README và tài liệu dự án ở cả hai repository.
Kiểm tra toàn bộ schema Prisma đã merge và các model liên quan.
Kiểm tra fixture, seed, verify và test hiện tại.
Liệt kê đầy đủ các tính năng phiên bản 1 đang tồn tại từ code thực tế.
Xác định chính xác luồng authorization hiện tại của lớp học trực tuyến.
Lập kế hoạch thay đổi theo từng repository.

Sau đó thực hiện thay đổi trực tiếp, không chỉ đưa ra hướng dẫn.

9. Kiểm thử bắt buộc

Backend phải chạy tối thiểu:

npm install
npm run prisma:validate
npm run prisma:generate
npm run build
npm run test
npm run test:e2e
npm run db:seed:demo
npm run db:verify:demo
npm run test:demo-data

Chỉ chạy lệnh seed trên database demo hoặc database local được cấu hình cho việc kiểm thử. Không chạy seed vào production nếu chưa xác nhận rõ môi trường.

Frontend phải chạy các lệnh tương ứng đang có trong package.json, tối thiểu gồm:

npm install
npm run build
npm run lint
npm run test

Nếu repository không có một lệnh trong danh sách thì không tự tạo test giả chỉ để vượt qua yêu cầu. Hãy ghi rõ lệnh nào tồn tại, lệnh nào không tồn tại và chạy toàn bộ quality checks thực tế của repository.

Sau khi hoàn tất, kiểm thử luồng thực tế bằng ba tài khoản demo:

Học viên
Đăng nhập
Xem danh sách 10 khóa học
Xem chi tiết khóa
Đăng ký khóa chưa học
Mở khóa học của tôi
Học bài
Cập nhật tiến độ
Làm quiz
Xem bài tập
Nộp bài nếu luồng hỗ trợ
Xem chứng chỉ
Mở thư viện
Lưu tài nguyên
Xem cộng đồng
Bình luận hoặc reaction
Tham gia lớp học trực tuyến mà không cần admin duyệt
Xác nhận không thể tham gia lớp thuộc khóa chưa đăng ký
Giảng viên
Xem khóa học của mình
Xem hoặc chỉnh sửa nội dung theo quyền hiện tại
Quản lý quiz
Quản lý assignment
Xem submission
Chấm bài nếu tính năng hiện có
Xem và quản lý lớp học trực tuyến
Admin
Đăng nhập
Kiểm tra các chức năng admin hiện có
Xác nhận việc bỏ approval lớp học không làm mất các quyền quản trị khác 10. Giới hạn phạm vi
Không thêm hệ thống thanh toán mới.
Không thêm marketplace mới.
Không thêm một bảng quản trị lớp học mới.
Không xây lại kiến trúc.
Không xóa các model dự kiến dùng cho phiên bản sau nếu không thực sự cần thiết.
Không dùng mock ở frontend để che API backend bị thiếu.
Không chỉ seed dữ liệu bề mặt; dữ liệu phải có quan hệ và dùng được trong các luồng thật.
Không bỏ qua lỗi có sẵn làm cản trở việc kiểm thử phiên bản 1. 11. Kết quả cuối cùng cần báo cáo

Sau khi hoàn thành, trả về:

Danh sách file đã thay đổi ở backend.
Danh sách file đã thay đổi ở frontend.
Danh sách chính xác 10 khóa học đã seed.
Thống kê số lượng dữ liệu demo theo từng bảng hoặc module.
Mô tả luồng lớp học trực tuyến trước và sau khi sửa.
Danh sách lỗi frontend/backend đã phát hiện và sửa.
Kết quả từng lệnh build, lint, test, seed và verify.
Các lỗi còn lại hoặc giới hạn chưa thể xử lý.
Hướng dẫn chạy seed demo.
Thông tin ba tài khoản demo và biến môi trường dùng để đặt mật khẩu.
Checklist các luồng phiên bản 1 đã kiểm thử thành công.
Không commit hoặc push nếu chưa được yêu cầu; chỉ để thay đổi trong working tree và báo cáo rõ.
