# Phase 7: Nền Tảng Thi VSEP/TOEIC (Exam Platform)

**Mục tiêu:** Tính năng ăn tiền nhất - Mô phỏng môi trường phòng thi Realtime. Migrate nguyên cục `exam-schedules`, `registrations`, `vstep` và file Bank câu hỏi sang cấu trúc Next.js Client Components.

## Công Việc Coding

1. **Quy Lưu Ngân Hàng Đề Thi:**
   - Logic `import_vstep.py` JSON cũ convert thành một script Server hoặc Form Admin upload file JSON, auto bóc tách Reading (Đọc), Listening (Nghe MP3 đính R2), Writing, Speaking vào DB bảng `exam_tests`.

2. **Tổ chức Ca Thi (Schedules & Registrations):**
   - Tạo Ca Thi. Thí sinh lên `/tai-khoan/dang-ky-thi` để nhấp đăng ký.
   - Quản trị viên Accept thì danh sách mới vào phòng.

3. **The Real-Time Exam Room UI (`/exam/[uuid]`):**
   - Bắt buộc dùng `use client` và Zustand/Redux: Mọi tiến trình nhấn nút A,B,C,D, điền chữ đều được bọc trong state local. Tắt trình duyệt vô lại sẽ load lại state từ `Cloudflare KV` (Autosave mỗi 10 Giây !).
   - Component Time Countdown. Chống Copy Paste/ Chuột phải.
   - Lọc bài Nghe tự động chèn Audio Player, cấm tua lùi (logic tuỳ tâm). Lọc bài Đọc cấu trúc 2 cột.

4. **Logic Chấm Điểm Auto (VSTEP):**
   - Server Action `submitExam(payload)`: So sánh đáp án lưu trên server (Tuyệt đối không đẩy đáp án về HTML của client để tránh F12 hack).
   - Áp quy chế chấm Scale điểm (vd: 35/40 Đọc = B2, Viết chấm tay sau).

## Tiêu chí Nghiệm Thu
- Mở bài thi thử VSEP Test 1 từ file json cũ. Lướt chọn Random đáp án, time countdown nhảy. Bấm Nộp nảy điểm ra báo cáo đạt mức nào.
