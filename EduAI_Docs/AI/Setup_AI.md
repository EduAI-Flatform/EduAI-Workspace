Hãy kiểm tra toàn bộ repository backend EduAI và tích hợp Google Gemini API trực tiếp vào hệ thống theo kiến trúc provider, không hard-code và không làm hỏng các chức năng hiện có.

Repository:
https://github.com/EduAI-Flatform/EduAI-Back-End

MỤC TIÊU

1. Dùng Google Gemini API làm AI provider mặc định cho EduAI phiên bản hiện tại.
2. Sử dụng SDK chính thức mới của Google là `@google/genai`.
3. Tất cả lời gọi AI phải thực hiện ở backend.
4. Tuyệt đối không đưa Gemini API key xuống frontend.
5. Không hard-code API key hoặc tên model trong source code.
6. Thiết kế để sau này có thể thêm OpenAI hoặc OpenRouter mà không phải sửa các module nghiệp vụ.
7. Không thay đổi API contract hiện tại nếu không bắt buộc.
8. Không sửa các module không liên quan.

BƯỚC 1 — KIỂM TRA CODE HIỆN TẠI

Đọc toàn bộ repository và tìm tất cả vị trí liên quan đến:

- OPENAI_API_KEY
- OPENAI_MODEL
- GEMINI_API_KEY
- AI_PROVIDER
- package `openai`
- `new OpenAI`
- chat completions
- responses API
- AI chat
- AI tutor
- sinh quiz
- sinh câu hỏi
- chấm bài
- tóm tắt bài học
- phân tích tài liệu
- embeddings
- RAG
- structured output
- streaming

Trước khi sửa, ghi lại ngắn gọn:

- Các file đang liên quan đến AI.
- Luồng gọi AI hiện tại.
- API endpoint nào đang sử dụng AI.
- Phần nào chưa được triển khai.

Không chỉ lập kế hoạch. Sau khi khảo sát phải trực tiếp sửa code.

BƯỚC 2 — CÀI SDK CHÍNH THỨC

Cài package:

npm install @google/genai

Không sử dụng package cũ:

@google/generative-ai

Nếu package `openai` không còn được dùng ở bất kỳ đâu sau khi chuyển đổi thì có thể xóa. Nếu vẫn còn được dùng hoặc kiến trúc provider cần giữ để hỗ trợ OpenRouter/OpenAI, không tự ý xóa.

Kiểm tra tài liệu chính thức và API thực tế của phiên bản `@google/genai` được cài trước khi viết code. Không đoán tên method hoặc response field.

BƯỚC 3 — BIẾN MÔI TRƯỜNG

Chuẩn hóa các biến sau:

AI_PROVIDER=gemini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
AI_TIMEOUT_MS=60000
AI_MAX_RETRIES=2

Có thể giữ tương thích với biến tổng quát nếu dự án đang có:

AI_API_KEY
AI_MODEL

Thứ tự ưu tiên cấu hình:

1. Khi `AI_PROVIDER=gemini`, ưu tiên `GEMINI_API_KEY`.
2. Nếu `GEMINI_API_KEY` không có, có thể fallback sang `AI_API_KEY`.
3. Ưu tiên `GEMINI_MODEL`.
4. Nếu `GEMINI_MODEL` không có, có thể fallback sang `AI_MODEL`.

Không fallback sang `OPENAI_API_KEY`, vì đó có thể là key của provider khác.

Cập nhật:

- `.env.example`
- README hoặc tài liệu cấu hình
- validation config nếu dự án có
- `.gitignore`

Không đưa API key thật vào repository.

BƯỚC 4 — TẠO AI ABSTRACTION

Không để controller hoặc service nghiệp vụ tự khởi tạo GoogleGenAI.

Tận dụng module AI hiện có nếu repository đã có. Nếu chưa có, tạo cấu trúc phù hợp với NestJS, ví dụ:

src/
common/
ai/
ai.module.ts
ai.service.ts
ai.types.ts
ai.config.ts
ai.errors.ts
providers/
ai-provider.interface.ts
gemini.provider.ts

Có thể điều chỉnh đường dẫn theo cấu trúc dự án thực tế.

Tạo interface tối thiểu:

export interface AiProvider {
generateText(
input: GenerateTextInput,
): Promise<GenerateTextResult>;

generateStructured<T>(
input: GenerateStructuredInput,
): Promise<T>;
}

Các type nên có tối thiểu:

type GenerateTextInput = {
systemPrompt?: string;
prompt: string;
temperature?: number;
maxOutputTokens?: number;
};

type GenerateTextResult = {
text: string;
provider: string;
model: string;
};

type GenerateStructuredInput = {
systemPrompt?: string;
prompt: string;
schema?: Record<string, unknown>;
temperature?: number;
maxOutputTokens?: number;
};

Không tạo abstraction quá lớn cho MVP.

BƯỚC 5 — KHỞI TẠO GEMINI PROVIDER

Dùng SDK:

import { GoogleGenAI } from '@google/genai';

Khởi tạo client một lần trong provider hoặc singleton provider:

const client = new GoogleGenAI({
apiKey: config.geminiApiKey,
});

Không khởi tạo client cho mỗi request.

Model phải đọc từ config:

config.geminiModel

Không hard-code model trong các module nghiệp vụ.

Khi gọi API:

- Dùng API hiện hành của SDK `@google/genai`.
- Kiểm tra tên method và output field theo đúng phiên bản package được cài.
- Không sao chép code từ SDK cũ.
- Không sử dụng API đã deprecated nếu SDK cung cấp API mới ổn định và phù hợp.
- Tuy nhiên không ép chuyển sang API agentic phức tạp nếu chức năng hiện tại chỉ cần sinh text.

BƯỚC 6 — SYSTEM PROMPT VÀ NỘI DUNG

Nếu SDK hỗ trợ system instruction riêng, hãy map `systemPrompt` đúng cách.

Nếu không, ghép prompt có cấu trúc rõ ràng nhưng không thay đổi ý nghĩa nghiệp vụ.

Giữ nguyên:

- Tiếng Việt của prompt hiện tại.
- DTO hiện tại.
- Controller hiện tại.
- Response contract hiện tại.
- Validation.
- Authentication.
- Authorization.
- Logic nghiệp vụ.

Không tự viết lại toàn bộ prompt khi không cần thiết.

BƯỚC 7 — STRUCTURED OUTPUT

Đối với chức năng sinh quiz, câu hỏi, rubric, đánh giá hoặc nội dung JSON:

- Sử dụng structured output hoặc response schema của Gemini nếu SDK và model hỗ trợ.
- Định nghĩa JSON schema rõ ràng.
- Parse và validate kết quả bằng DTO, class-validator hoặc schema validation hiện có.
- Xử lý trường hợp model trả Markdown code fence.
- Không lưu trực tiếp JSON chưa validate vào database.
- Không dùng `JSON.parse` mà không bắt lỗi.
- Kiểm tra đầy đủ required fields.
- Giới hạn số lượng phần tử sinh ra theo input của người dùng.

Nếu model hoặc endpoint không hỗ trợ response schema, fallback sang yêu cầu JSON rõ ràng và parse có kiểm soát.

BƯỚC 8 — XỬ LÝ LỖI

Chuẩn hóa các trường hợp:

- Thiếu GEMINI_API_KEY.
- Thiếu GEMINI_MODEL.
- API key không hợp lệ.
- API key bị Google chặn hoặc báo leaked.
- Model không tồn tại.
- Model không hỗ trợ tính năng.
- Rate limit hoặc quota exceeded.
- Timeout.
- Upstream 5xx.
- Response rỗng.
- Structured output sai schema.
- Nội dung bị safety filter chặn.
- Request bị từ chối do policy.

Không trả nguyên lỗi SDK hoặc thông tin nhạy cảm cho frontend.

Map lỗi phù hợp:

- Thiếu cấu hình: ServiceUnavailableException.
- Request không hợp lệ: BadRequestException.
- Rate limit: HttpException với status 429.
- Timeout: GatewayTimeoutException.
- Gemini tạm thời lỗi: ServiceUnavailableException hoặc BadGatewayException.
- Output không hợp lệ: BadGatewayException.

Không log:

- GEMINI_API_KEY.
- Toàn bộ prompt có dữ liệu cá nhân.
- Bài làm riêng tư của học viên.
- Nội dung tài liệu riêng tư.
- Toàn bộ response nhạy cảm.

Có thể log:

- provider.
- model.
- tên chức năng nội bộ.
- thời gian xử lý.
- loại lỗi.
- HTTP status.
- request ID nếu dự án đã hỗ trợ.

BƯỚC 9 — RETRY VÀ TIMEOUT

Dùng:

AI_TIMEOUT_MS
AI_MAX_RETRIES

Yêu cầu:

- Chỉ retry lỗi tạm thời như 429, timeout hoặc 5xx.
- Dùng exponential backoff nhỏ.
- Không retry lỗi 400, API key sai hoặc model không tồn tại.
- Không retry vô hạn.
- Request phải có timeout thực sự, không chỉ khai báo config mà không áp dụng.

Nếu SDK không hỗ trợ trực tiếp timeout hoặc retry theo cách cần thiết, dùng AbortController hoặc wrapper phù hợp.

BƯỚC 10 — SAFETY VÀ DỮ LIỆU EDUAI

Không vô hiệu hóa toàn bộ safety settings chỉ để request chạy được.

Đối với Free Tier:

- Không gửi mật khẩu, token hoặc secret.
- Không đưa thông tin xác thực người dùng vào prompt.
- Hạn chế gửi dữ liệu cá nhân.
- Không log nội dung học viên.
- Chỉ gửi phần tài liệu thực sự cần cho tác vụ.

Nếu có prompt chứa thông tin người dùng, hãy giảm thiểu dữ liệu trước khi gửi nhưng không làm thay đổi luồng chức năng.

BƯỚC 11 — EMBEDDING

Kiểm tra xem dự án hiện đã dùng embedding hoặc vector database chưa.

Nếu chưa:

- Không tự thêm RAG.
- Không tự thêm vector database.
- Không tự thêm migration.
- Chỉ để abstraction mở rộng sau này nếu thật sự cần.

Nếu đã dùng:

- Không dùng model chat làm embedding.
- Thêm biến riêng:

GEMINI_EMBEDDING_MODEL=

- Kiểm tra model embedding hiện còn được Gemini API hỗ trợ.
- Không thay đổi vector dimension nếu chưa có migration.
- Không làm hỏng dữ liệu vector hiện có.

BƯỚC 12 — STREAMING

Nếu API hiện tại đang streaming:

- Giữ nguyên response contract.
- Dùng streaming API của Gemini nếu phù hợp.
- Xử lý client disconnect.
- Hủy upstream request khi frontend ngắt kết nối.
- Không biến endpoint streaming thành non-streaming mà không ghi rõ.

Nếu code hiện chưa streaming thì không tự thêm ngoài phạm vi.

BƯỚC 13 — UNIT TEST

Viết hoặc cập nhật test cho tối thiểu:

1. Provider đọc đúng GEMINI_API_KEY.
2. Provider đọc đúng GEMINI_MODEL.
3. Fallback từ GEMINI_API_KEY sang AI_API_KEY.
4. Fallback từ GEMINI_MODEL sang AI_MODEL.
5. Thiếu API key trả lỗi rõ ràng.
6. Thiếu model trả lỗi rõ ràng.
7. Sinh text thành công.
8. Response text rỗng.
9. Rate limit.
10. Timeout.
11. Upstream 5xx.
12. API key sai.
13. Safety block.
14. Structured JSON hợp lệ.
15. Structured JSON sai.
16. API key không xuất hiện trong log hoặc exception.

Mock toàn bộ request ra Google.

Unit test không được gọi Gemini API thật.

Nếu có e2e test, thêm test kiểm tra endpoint AI trả lỗi cấu hình rõ ràng khi thiếu key nhưng không gọi internet.

BƯỚC 14 — HEALTH CHECK

Nếu dự án có health check:

- Không gọi Gemini thật trong health check thông thường.
- Chỉ kiểm tra config đã tồn tại hoặc provider đã khởi tạo.
- Nếu cần live check, tạo endpoint riêng và bảo vệ phù hợp.
- Không làm health check production tốn quota.

BƯỚC 15 — TÀI LIỆU

Tạo hoặc cập nhật:

docs/gemini-setup.md

Nội dung gồm:

1. Cách tạo API key trong Google AI Studio.
2. Các biến môi trường cần cấu hình.
3. Cách chọn model.
4. Cách cấu hình local.
5. Cách cấu hình trên VPS/Render.
6. Cách kiểm tra Usage và quota.
7. Giải thích lỗi 401, 403, 429, timeout và model not found.
8. Cảnh báo không commit API key.
9. Cảnh báo Free Tier có quota và dữ liệu có thể được dùng để cải thiện sản phẩm.
10. Cách đổi provider trong tương lai.

Không ghi API key thật.

BƯỚC 16 — KIỂM TRA CUỐI

Chạy ít nhất:

npm install
npm run build
npm test -- --runInBand

Nếu repository có lint hoặc typecheck script thì chạy thêm.

Không bỏ qua lỗi TypeScript.

Nếu test cũ lỗi không liên quan, ghi rõ:

- Test nào lỗi.
- Có tồn tại trước thay đổi hay không.
- Vì sao không thuộc phạm vi Gemini.

TIÊU CHÍ HOÀN THÀNH

- Backend gọi Gemini API thông qua SDK `@google/genai`.
- API key chỉ nằm trong backend environment.
- Model lấy từ environment.
- Không có controller hoặc service nghiệp vụ tự tạo Gemini client.
- Không thay đổi API contract hiện tại ngoài trường hợp bắt buộc.
- Có xử lý timeout, retry, quota và output rỗng.
- Structured output được validate.
- Build thành công.
- Test liên quan thành công.
- `.env.example` và tài liệu đã cập nhật.
- Không commit API key.

ĐẦU RA CUỐI CÙNG

Sau khi hoàn thành, trả về:

1. Kiến trúc AI trước và sau khi sửa.
2. Danh sách file đã tạo hoặc sửa.
3. Package đã thêm hoặc xóa.
4. Các biến môi trường tôi cần điền.
5. Model đang sử dụng.
6. Các endpoint AI đã được chuyển đổi.
7. Các lệnh test đã chạy và kết quả.
8. Rủi ro hoặc phần chưa hoàn thành.

Không dừng ở bước phân tích hoặc lập kế hoạch. Phải trực tiếp sửa code và chạy kiểm tra.
