# EDUAI — FULL PROFESSIONAL UI/UX AUDIT & MOBILE-FIRST POLISH

Bạn đang làm việc trên dự án **EduAI**.

Production:

`https://eduai.giaoducso.org.vn/`

Mục tiêu của task này **không phải chỉ sửa vài lỗi CSS cụ thể**, mà là đóng vai trò như một **Senior Product Designer + Senior UI/UX Designer + Senior Frontend Engineer** để audit và nâng cấp toàn bộ UI/UX hiện tại của EduAI.

Kết quả cuối cùng phải khiến sản phẩm:

- Hiện đại.
- Cao cấp hơn.
- Có cảm giác hoàn thiện như sản phẩm production thực sự.
- Nhất quán giữa các trang.
- Dễ sử dụng.
- Dễ đọc.
- Có visual hierarchy rõ.
- Responsive tốt.
- Đặc biệt đẹp và tự nhiên trên mobile.
- Khi người dùng mở sản phẩm lên phải có cảm giác **“wow, đây là một nền tảng học tập được thiết kế chuyên nghiệp”**, nhưng không được đánh đổi usability để lấy hiệu ứng thị giác.

---

# 0. QUY TẮC THỰC THI

Trước khi sửa code:

1. Đọc:
   - `AGENTS.md`
   - các skill/instruction liên quan.
   - AI-DOS manifest/state.
   - `.ai-dos/records/tasks.json`
   - `.ai-dos/records/sprint.json`
   - `.ai-dos/records/roadmap.json`
   - tài liệu UX/UI hoặc design-system hiện có nếu có.

2. Xác định task/sprint hiện tại.

3. Nếu yêu cầu này chưa tồn tại trong AI-DOS:
   - tạo task UX/UI audit/refinement phù hợp;
   - đặt priority cao phù hợp với roadmap hiện tại;
   - không phá canonical state.

4. Kiểm tra git status trước khi sửa.

5. Không overwrite hoặc rollback những thay đổi không liên quan đang tồn tại.

6. Không thay đổi business logic, API contract hoặc authorization chỉ vì mục đích UI.

7. Không mock API nếu production/local đã có API thật.

---

# 1. DÙNG CHROME DEVTOOLS MCP ĐỂ AUDIT SẢN PHẨM THẬT

Bắt buộc dùng Chrome DevTools MCP/browser tooling để truy cập:

`https://eduai.giaoducso.org.vn/`

Không được chỉ đọc source rồi đoán giao diện.

Hãy trực tiếp:

- mở từng route;
- tương tác menu;
- cuộn trang;
- mở modal;
- dropdown;
- form;
- card;
- table;
- tabs;
- notification;
- search;
- filter;
- pagination;
- course pages;
- learning pages;
- dashboard;
- profile;
- các màn hình Student;
- Instructor;
- Administrator;
- và những feature hiện đang public/accessible.

Nếu có các account UAT/demo hợp lệ đã được project cung cấp thì dùng đúng account đã được phép sử dụng.

Không tự ý lấy, log hoặc expose credential/secret.

---

# 2. AUDIT TOÀN BỘ PAGE — KHÔNG CHỈ HOMEPAGE

Hãy lập inventory route/page hiện có từ source và navigation.

Sau đó audit từng trang ở ít nhất các viewport:

### Mobile

- 320px
- 360px
- 375px
- 390px
- 412px
- 430px

### Tablet

- 768px
- 820px
- 1024px

### Desktop

- 1280px
- 1366px
- 1440px
- 1536px
- 1920px

Không chỉ kiểm tra xem có overflow hay không.

Phải đánh giá xem giao diện ở từng breakpoint có **thực sự đẹp và hợp lý hay chưa**.

---

# 3. VẤN ĐỀ ĐÃ ĐƯỢC PHÁT HIỆN

Đây là những vấn đề người dùng đã nhìn thấy. Hãy coi đây là **known issues**, không phải danh sách đầy đủ.

Bạn phải tự phát hiện thêm những vấn đề khác.

## 3.1 Course cards đang quá lớn và quá dài

Ở homepage desktop:

- card khóa học hiện quá to;
- chiều cao bị kéo dài;
- tổng thể không compact;
- tỷ lệ thumbnail/content chưa cân;
- nhiều khoảng trống không cần thiết;
- nhiều card nhìn giống một khối dài thay vì một component cân đối.

Ở mobile cũng gặp tình trạng tương tự:

- course card quá cao;
- nội dung kéo dài;
- cảm giác thô;
- card không có tỷ lệ đẹp;
- scrolling phải đi qua quá nhiều chiều cao chỉ để xem vài khóa học.

Trang danh sách khóa học cũng có vấn đề tương tự.

### Yêu cầu

Thiết kế lại CourseCard theo một hệ thống thống nhất.

Cân nhắc:

- thumbnail aspect ratio rõ ràng, ví dụ 16:9 / 4:3 tùy context;
- không để ảnh tự kéo card cao bất thường;
- clamp title;
- clamp description nếu cần;
- metadata ngắn gọn;
- rating/progress/instructor/category phải có hierarchy;
- CTA không làm card cao thêm quá nhiều;
- spacing compact;
- border/radius/shadow tinh tế;
- hover desktop;
- touch state mobile.

Desktop nên cho phép nhìn được nhiều course hơn trong một viewport.

Mobile cần **compact nhưng không chật**.

Không được chỉ giảm `height` bằng CSS rồi làm text overflow.

---

# 4. TYPOGRAPHY ĐANG QUÁ NẶNG

Hiện tại nhiều vị trí đang dùng font-weight quá đậm.

Hệ quả:

- giao diện có cảm giác “phô”;
- nhiều khu vực cạnh tranh thị giác với nhau;
- heading, button, card title đều gần như bold;
- không có đủ contrast hierarchy giữa các cấp typography.

Hãy audit toàn bộ typography.

Thiết lập hierarchy rõ ràng:

- Display
- H1
- H2
- H3
- Section heading
- Card title
- Body
- Secondary
- Caption
- Label
- Button

Không lạm dụng:

`font-weight: 700/800`

Phần lớn body/interface text nên sử dụng khoảng:

`400 / 500`

Heading quan trọng mới dùng:

`600 / 700`

nhưng phải tùy font và context.

Mục tiêu là:

**nhẹ hơn, tinh tế hơn, dễ đọc hơn.**

---

# 5. BUTTON ĐANG CÓ CẢM GIÁC CỨNG

Audit toàn bộ:

- primary button;
- secondary button;
- outline;
- destructive;
- icon button;
- ghost button;
- chip;
- filter;
- CTA;
- pagination;
- menu action.

Hiện tại một số button:

- chữ quá bold;
- padding chưa cân;
- border radius chưa tinh tế;
- hình dáng hơi “blocky”;
- màu sắc nặng;
- chưa có cảm giác mềm mại.

Thiết kế lại button system thống nhất.

Cần có đầy đủ:

- default;
- hover;
- focus-visible;
- active;
- disabled;
- loading.

Mobile touch target tối thiểu hợp lý.

Không được biến tất cả button thành những pill khổng lồ.

---

# 6. GIAO DIỆN ĐANG QUÁ TRẮNG / ĐEN

Hiện tại cảm giác visual còn phụ thuộc nhiều vào:

- white;
- black;
- gray.

Điều này khiến giao diện tuy sạch nhưng thiếu sức sống và thiếu identity.

EduAI cần một hệ màu có chiều sâu hơn.

Không biến sản phẩm thành rainbow UI.

Hãy thiết kế hệ màu semantic:

- primary;
- secondary;
- accent;
- surface;
- elevated surface;
- muted;
- info;
- success;
- warning;
- danger;
- interactive;
- subtle background.

Sử dụng màu nhấn có chủ đích cho:

- icon;
- chip;
- badges;
- progress;
- active state;
- CTA;
- highlighted statistics;
- course categories;
- AI features;
- success states.

Hãy tạo cảm giác:

**modern education + AI + premium SaaS**

chứ không phải một admin template generic.

---

# 7. REFERENCE VỀ VISUAL QUALITY

Người dùng đã cung cấp một screenshot tham khảo của ứng dụng CreativeHub.

Không copy UI 1:1.

Chỉ nghiên cứu những nguyên tắc tốt trong screenshot:

- section hierarchy rõ;
- card proportion cân đối;
- màu accent được kiểm soát;
- dark/light surface có độ phân cấp;
- spacing đều;
- iconography dễ hiểu;
- bottom navigation mobile rõ ràng;
- cards không quá cao;
- CTA dễ nhận biết;
- rounded corner mềm;
- layout tạo cảm giác app-native;
- nội dung có density tốt;
- glanceability cao.

Hãy chuyển những nguyên tắc tốt đó sang **EduAI design language**.

EduAI vẫn phải có identity riêng.

---

# 8. MOBILE-FIRST LÀ ƯU TIÊN CAO

Đây là phần đặc biệt quan trọng.

Không được coi mobile đơn giản là:

> desktop thu nhỏ xuống.

Mỗi trang cần được suy nghĩ lại theo mobile UX.

Audit:

- header;
- breadcrumb;
- sidebar;
- drawer;
- tabs;
- filters;
- cards;
- tables;
- forms;
- modals;
- dialogs;
- toasts;
- notifications;
- FAB;
- bottom navigation;
- course player;
- quiz;
- editor;
- profile;
- dashboard;
- admin screens.

### Mobile cần ưu tiên:

- thumb reach;
- one-hand usability;
- touch target;
- safe area;
- keyboard;
- viewport resize;
- sticky component;
- bottom navigation;
- scroll position;
- long title;
- long Vietnamese content;
- modal height;
- form input;
- dropdown;
- horizontal scrolling.

Không được để:

- chữ quá sát mép;
- component dính nhau;
- button full-width một cách máy móc;
- card quá cao;
- modal vượt viewport;
- fixed element che nội dung;
- header chiếm quá nhiều chiều cao;
- breadcrumb dài ngoằng;
- table desktop bị ép nhỏ đến mức không đọc được.

---

# 9. MOBILE NOTIFICATION — HIỆN ĐANG ĐẶT VỊ TRÍ KHÔNG HỢP LÝ

Đặc biệt kiểm tra hệ thống notification/toast trên mobile.

Hiện tại vị trí notification có trường hợp:

- che nội dung;
- che CTA;
- chiếm không gian;
- nằm ở vị trí thiếu tự nhiên;
- tạo cảm giác “web desktop được scale xuống mobile”.

Không được đơn giản đổi `top` hoặc `bottom` vài pixel rồi kết luận xong.

Hãy đánh giá UX tốt nhất giữa:

### Option A — Safe-area Toast

Toast xuất hiện trong vùng an toàn:

- dưới mobile header;
- hoặc phía trên bottom navigation.

Không che CTA.

### Option B — Notification Bottom Sheet

Đối với nhiều notification hoặc nội dung dài:

- mở từ notification icon;
- hiển thị bằng bottom sheet;
- hỗ trợ swipe;
- dễ dùng bằng một tay.

### Option C — Draggable / Edge-snapping Notification Control

Nếu thật sự cần floating element:

- người dùng có thể kéo;
- snap về cạnh trái/phải;
- không nằm giữa nội dung;
- không che navigation;
- không che input;
- respect safe-area;
- lưu vị trí trong local preference;
- tự điều chỉnh khi orientation/viewport thay đổi;
- có reset/default position;
- accessibility vẫn hoạt động.

Không tạo một toast có thể bị kéo đi lung tung mà không có UX rationale.

Chọn phương án tốt nhất dựa trên context thật của EduAI.

---

# 10. DESIGN SYSTEM AUDIT

Không sửa UI bằng hàng trăm giá trị ngẫu nhiên.

Audit hiện tại:

- color token;
- spacing token;
- typography;
- radius;
- shadow;
- border;
- container width;
- grid;
- breakpoint;
- icon sizing;
- animation;
- button;
- input;
- card;
- badge;
- modal.

Chuẩn hóa thành một design system có quy luật.

Ví dụ spacing cần dựa trên scale nhất quán thay vì:

`13px`, `19px`, `27px`, `31px`

rải rác không có lý do.

Không bắt buộc phải dùng chính xác 4/8px grid nếu codebase có hệ thống tốt hơn, nhưng cần có logic.

---

# 11. SPACING VÀ ALIGNMENT

Đây là phần thường làm giao diện trông “thô”.

Audit rất kỹ:

- padding trong card;
- khoảng section;
- gutter;
- horizontal alignment;
- baseline;
- icon + text;
- heading + action;
- title + description;
- field + label;
- empty state;
- CTA;
- top/bottom whitespace.

Tìm những tình trạng như:

- title lệch 5–10px so với container;
- card không cùng baseline;
- button không cùng height;
- icon lệch vertical center;
- section lúc 16px, lúc 37px không có rationale;
- desktop content kéo quá rộng;
- whitespace chỗ quá lớn, chỗ quá hẹp.

Tất cả cần được tinh chỉnh.

---

# 12. LAYOUT VÀ MAX WIDTH

Audit global container.

Desktop không được:

- quá rộng trên 1440/1920;
- stretch content vô hạn;
- card bị kéo ngang/quá lớn;
- text line quá dài.

Thiết lập max-width hợp lý cho từng loại:

- marketing/home;
- course listing;
- dashboard;
- learning content;
- settings;
- forms.

Không áp một max-width duy nhất cho toàn hệ thống nếu use case khác nhau.

---

# 13. HOMEPAGE

Audit riêng homepage.

Homepage cần có:

- hierarchy rõ;
- hero/header cân đối;
- quick actions;
- sections;
- course discovery;
- continue learning;
- recommendation;
- categories;
- CTA.

Không để:

- card course quá dominant;
- quá nhiều text;
- section nào cũng giống nhau;
- toàn bộ page chỉ có rectangle trắng + text đen.

Sử dụng:

- subtle surface variation;
- accent backgrounds;
- icons;
- illustration nếu project đã có;
- progress;
- personalized context;
- visual grouping.

Nhưng phải tránh visual clutter.

---

# 14. COURSE DISCOVERY / COURSE LIST

Audit:

- `/courses`
- search
- category
- filter
- sorting
- course card
- pagination/infinite list
- empty state
- loading skeleton

Desktop:

- density tốt;
- nhiều course/view;
- dễ scan.

Mobile:

- filter nên dùng sheet/drawer nếu phù hợp;
- card compact;
- thumbnail rõ;
- CTA dễ touch.

---

# 15. COURSE DETAIL

Kiểm tra:

- course hero;
- thumbnail;
- instructor;
- rating;
- learning outcomes;
- curriculum;
- enrollment CTA;
- progress;
- sections;
- reviews;
- sidebar.

Mobile không được chỉ bê sidebar xuống cuối trang một cách máy móc.

Xác định thông tin nào cần lên trước.

Sticky enrollment/continue CTA có thể cân nhắc nếu có lợi cho UX.

---

# 16. LEARNING EXPERIENCE

Trang học bài là một trong những màn hình quan trọng nhất.

Audit cực kỹ:

- lesson title;
- course navigation;
- video/document/content;
- lesson list;
- previous/next;
- progress;
- quiz;
- notes;
- resources;
- discussion nếu có;
- responsive state.

Mobile cần tạo cảm giác giống một learning app thực sự.

Không để:

- course sidebar bóp content;
- title quá dài;
- control quá nhỏ;
- lesson navigation chiếm nửa màn hình;
- video bị sai ratio;
- CTA đặt xa thumb reach.

---

# 17. DASHBOARD

Student/Instructor/Admin dashboard không nên chỉ là các ô statistic template.

Audit:

- information priority;
- meaningful KPI;
- quick action;
- recent activity;
- progress;
- charts;
- empty states;
- responsiveness.

Tạo visual hierarchy rõ ràng.

---

# 18. TABLES TRÊN MOBILE

Admin/instructor tables cần xử lý mobile có chủ đích.

Không được chỉ:

`overflow-x-auto`

cho mọi table rồi coi là responsive.

Đánh giá từng table:

- table thực sự cần horizontal scroll;
- hoặc chuyển thành card/list;
- hide secondary columns;
- expandable row;
- details drawer.

Giữ usability.

---

# 19. FORMS

Audit:

- login;
- registration;
- profile;
- course editor;
- lesson form;
- settings;
- admin forms;
- voucher/scholarship/TMI nếu đã có.

Kiểm tra:

- label;
- helper text;
- validation;
- error state;
- success state;
- disabled;
- focus;
- autocomplete;
- mobile keyboard;
- input type;
- long Vietnamese strings.

Form cần cảm giác nhẹ nhàng, rõ ràng, không giống Bootstrap form mặc định.

---

# 20. ICONOGRAPHY

Kiểm tra consistency.

Không dùng:

- icon style lẫn lộn;
- stroke thickness khác nhau;
- emoji cho action quan trọng nếu design system không chủ đích;
- icon không có tooltip ở desktop khi meaning không rõ.

Chuẩn hóa:

- size;
- stroke;
- container;
- active state.

---

# 21. BORDER / SHADOW / RADIUS

Không được lạm dụng:

- border xám bao quanh mọi thứ;
- drop-shadow lớn;
- radius cực lớn cho tất cả component.

Tạo depth bằng combination:

- surface;
- subtle border;
- subtle shadow;
- spacing.

Card quan trọng có thể elevated nhẹ.

Card bình thường nên sạch.

---

# 22. ANIMATION & MICRO-INTERACTION

Bổ sung animation chỉ khi cải thiện UX:

- hover;
- pressed;
- menu;
- accordion;
- modal;
- toast;
- progress;
- skeleton;
- tab indicator.

Animation:

- nhanh;
- subtle;
- không gây lag;
- hỗ trợ `prefers-reduced-motion`.

Không tạo animation chỉ để “trông fancy”.

---

# 23. ACCESSIBILITY

Audit ít nhất:

- contrast;
- keyboard navigation;
- focus-visible;
- button semantics;
- aria label;
- dialog focus trap;
- form labels;
- alt text;
- touch target;
- zoom;
- reduced motion.

Mục tiêu visual đẹp **không được phá accessibility**.

---

# 24. RESPONSIVE TEXT

Dùng typography responsive hợp lý.

Không hard-code một `font-size` desktop rồi scale toàn trang.

Có thể dùng:

- responsive tokens;
- `clamp()`;

nhưng phải kiểm soát.

Heading mobile không được khổng lồ.

Body không được quá nhỏ.

---

# 25. VIETNAMESE CONTENT

Test bằng nội dung tiếng Việt thực.

Đặc biệt:

- title dài;
- tên khóa học dài;
- tên người dùng dài;
- notification dài;
- course description dài;
- table labels.

Không test chỉ bằng `"Test"` hoặc `"Lorem ipsum"`.

---

# 26. EMPTY / LOADING / ERROR STATES

Một sản phẩm đẹp không chỉ đẹp khi có dữ liệu.

Audit:

- empty;
- loading;
- skeleton;
- 404;
- error;
- permission denied;
- network failure;
- no search result.

Những state này phải cùng design language.

---

# 27. KHÔNG OVERDESIGN

Rất quan trọng.

Không được biến EduAI thành:

- landing page Dribbble;
- gradient ở mọi nơi;
- glassmorphism everywhere;
- neon UI;
- animation nặng;
- gigantic cards;
- giant headings;
- excessive rounded corners.

Mục tiêu:

**professional + premium + restrained + modern + usable.**

---

# 28. IMPLEMENTATION STRATEGY

Không sửa ngẫu nhiên từng page.

Thực hiện theo thứ tự:

## Phase 1 — Audit

- inventory toàn bộ routes/components;
- screenshots;
- viewport testing;
- UX issue list;
- visual inconsistency list.

## Phase 2 — Foundation

Sửa:

- tokens;
- typography;
- spacing;
- buttons;
- inputs;
- cards;
- layout;
- containers;
- breakpoints.

## Phase 3 — Shared Components

Chuẩn hóa:

- CourseCard
- SectionHeader
- StatCard
- Button
- Badge
- Search
- Filter
- Modal
- Toast
- Mobile navigation
- Empty state
- Loading state

## Phase 4 — Pages

Refactor từng nhóm page.

## Phase 5 — Mobile QA

Kiểm thử tất cả breakpoint.

## Phase 6 — Desktop QA

Regression desktop/tablet.

## Phase 7 — Production UAT

Kiểm tra sản phẩm thật sau deploy nếu workflow cho phép.

---

# 29. KHÔNG ĐƯỢC DUPLICATE COMPONENT

Trước khi tạo component mới:

search toàn repo.

Nếu đã có component tương tự:

- refactor;
- generalize;
- reuse.

Không tạo:

- `CourseCardNew`
- `CourseCardV2`
- `BetterCourseCard`
- `MobileCourseCardFinal`

chỉ để tránh sửa component cũ.

---

# 30. SCREENSHOT COMPARISON

Trong quá trình làm:

chụp screenshot trước/sau ở các page quan trọng.

Ít nhất:

### Desktop

- homepage
- course listing
- course detail
- learning page
- dashboard

### Mobile

- homepage
- course listing
- course detail
- learning page
- notification
- dashboard
- menu/navigation

So sánh bằng mắt như một product designer.

Nếu screenshot vẫn có cảm giác:

- thô;
- dài;
- nặng;
- lệch;
- quá trắng;
- quá nhiều bold;
- spacing không đều;

thì chưa được coi là hoàn thành.

---

# 31. DEVTOOLS CHECK

Sau refactor, kiểm tra:

- horizontal overflow;
- layout shift;
- CLS;
- console error;
- hydration warning;
- missing key;
- broken image;
- button inaccessible;
- overlap;
- fixed/sticky collision.

Đặc biệt kiểm tra:

`100vw`

và fixed elements trên mobile vì đây thường là nguồn overflow.

---

# 32. ACCEPTANCE CRITERIA

Task chỉ được DONE khi:

- [ ] Đã inventory và audit toàn bộ route chính.
- [ ] Homepage desktop đã có course card compact/cân đối hơn.
- [ ] Homepage mobile không còn card dài bất hợp lý.
- [ ] Trang `/courses` sử dụng course-card system nhất quán.
- [ ] Typography không còn lạm dụng bold.
- [ ] Button system mềm mại, hiện đại và nhất quán.
- [ ] Visual hierarchy rõ ràng hơn.
- [ ] Không còn cảm giác phần lớn UI chỉ trắng/đen/xám.
- [ ] Màu accent được sử dụng có chủ đích.
- [ ] Mobile spacing được review thủ công.
- [ ] Không có horizontal overflow ở viewport phổ biến.
- [ ] Notification mobile không che CTA/navigation.
- [ ] Notification UX đã được thiết kế lại có rationale.
- [ ] Tables/forms/modals responsive đúng.
- [ ] Bottom/fixed navigation respect safe-area.
- [ ] Cards có tỷ lệ hợp lý.
- [ ] Long Vietnamese content không phá layout.
- [ ] Touch target hợp lý.
- [ ] Desktop không bị ảnh hưởng xấu.
- [ ] Accessibility cơ bản pass.
- [ ] Build pass.
- [ ] Tests pass.
- [ ] Browser console không có regression đáng kể.
- [ ] AI-DOS canonical records được cập nhật đúng.
- [ ] Không còn worktree dirty ngoài những thay đổi có chủ đích.

---

# 33. DEFINITION OF “WOW”

“WOW” ở đây KHÔNG có nghĩa là thêm thật nhiều hiệu ứng.

Nó phải đến từ:

**Polish + proportion + spacing + typography + hierarchy + responsiveness + consistency + micro-interaction.**

Người dùng phải có cảm giác:

- nhìn vào biết ngay cần làm gì;
- không bị ngợp;
- không phải đọc quá nhiều;
- touch/click đúng chỗ;
- mobile giống một app thật;
- desktop tận dụng không gian tốt;
- mọi component thuộc cùng một sản phẩm;
- sản phẩm có bản sắc riêng.

Nếu một UI trông đẹp trong screenshot nhưng sử dụng khó hơn, không được chọn phương án đó.

---

# 34. QUYỀN CHỦ ĐỘNG

Những vấn đề người dùng nêu chỉ là những gì họ nhìn thấy sơ bộ.

Bạn được yêu cầu chủ động tìm thêm các vấn đề như một Senior UI/UX Designer.

Không cần đợi người dùng chỉ ra từng component xấu.

Nếu phát hiện một khu vực:

- chưa đẹp;
- thiếu hierarchy;
- thô;
- inconsistent;
- density không hợp lý;
- mobile UX kém;
- desktop spacing không đẹp;

hãy tự đánh giá nguyên nhân và sửa theo design system.

Tuy nhiên:

**không thay đổi business flow lớn nếu chưa có lý do rõ ràng.**

Nếu cần thay đổi interaction pattern lớn, ghi rationale trước khi thực hiện.

---

# 35. BÁO CÁO CUỐI CÙNG

Khi hoàn thành, báo cáo:

1. Những vấn đề UI/UX chính đã phát hiện.
2. Root causes.
3. Design system changes.
4. Pages đã chỉnh.
5. Mobile-specific changes.
6. Desktop-specific changes.
7. Course-card redesign.
8. Typography changes.
9. Button changes.
10. Notification mobile solution đã chọn và lý do.
11. Accessibility improvements.
12. Screenshots/visual evidence.
13. Test/build result.
14. Browser UAT result.
15. Commit SHA.
16. CI/deployment status nếu có.
17. AI-DOS task/status.
18. Những UX issue còn lại nếu có.

Không được báo DONE chỉ vì build pass.

**DONE = code pass + browser pass + responsive visual review pass + UX review pass.**
