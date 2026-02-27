# Phase 2: Database Schema (D1) & Drizzle ORM

**Mục tiêu:** Không dùng DB tinhoc cũ. Định nghĩa lại Schema 1:1 bằng DrizzleORM (Typescript) rồi build ra Sqlite đẩy lên DB D1 mới có tên `vantrangedu_db`.

## Phân tích Từ Schema Cũ Sang Schema Mới
Backyard (backend cũ) có `backend/src/db/*-queries.js`. Ta cần map thành các Tables trong `src/lib/db/schema.ts`:

1. **User Group (Đổi từ admins/students/teachers rời rạc):**
   - **Tối ưu:** Tạo bảng `users` với cột `role` rành mạch (`super_admin`, `admin`, `teacher`, `student`).
   - Các field CCCD, avatar_url, phone (làm username), name, dob (ngày sinh), status.

2. **Class & Attendance Group:**
   - `classes` (name, status, start_date, end_date, price).
   - `class_schedules` (class_id, date, start_time, end_time, google_meet_link).
   - `attendance` (schedule_id, user_id, status(present, absent)).
   - `assignments` (class_id, title, deadline, file_url).
   - Cảnh báo: Loại bỏ Foreign Key khắt khe nếu Sqlite khó khăn trong Soft Deletes, thay thế bằng Relational queries của Drizzle.

3. **Exam Platform Group:**
   - `exams` (name, type: vstep/toeic/... ).
   - `exam_schedules` (exam_id, date, start_time, room).
   - `registrations` (schedule_id, student_id, status(pending, approved, rejected), score).
   - `exam_questions` (ngân hàng câu hỏi lưu JSON cấu trúc sâu trong trường `content`).

4. **Kế toán & Tiện ích nội bộ:**
   - `payments` (student_id, amount, reason, date, status).
   - `activity_logs` (admin_id, action, target, timestamp).
   - `documents` và `document_folders`.

## Công Việc Coding
- Cài `drizzle-orm`, `drizzle-kit`, `better-sqlite3` (cho dev local).
- Viết cục bộ toàn thể file `schema.ts`.
- Tạo bash script `npm run db:generate` và `npm run db:migrate` chạy bằng wrangler để push lên D1 Cloudflare.
- Thiết lập module `src/lib/db/client.ts` để init Drizzle connect tới Cloudflare D1 environment bindings ở cả Server Components.

## Tiêu chí Nghiệm thu 
- Gen được file `0000_init.sql` hợp lệ.
- Lệnh query thử lấy User từ Drizzle (dùng Drizzle Studio local) thành công và trả về Type safety.
