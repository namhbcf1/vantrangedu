# Phase 6: Quản lý Đào tạo Lớp Học Toàn Tập

**Mục tiêu:** Trái tim của trung tâm VantrangEdu. Migrate hoàn thiện chức năng `classes.js`, `online-classes.js`, `class-schedules.js`, `attendance.js`, `assignments.js`.

## Công Việc Coding

1. **Quản trị Lớp học (Online/Offline):**
   - Table quản lý Lớp theo Trạng thái (Chiêu sinh, Đang học, Kết thúc). Khóa học có các gói giá tiền, mô tả.
   - Logic thêm học viên vào lớp (Tạo relationship N-N trên D1 `class_students` table).

2. **Lập Lịch (Schedules) & Lịch Vạn Niên UI:**
   - Màn `/admin/classes/[id]/schedules`: CRUD lịch học từng ngày.
   - Thêm nút tạo hàng loạt (VD: Lịch học cố định T2-T4-T6, từ giờ tới giờ, kéo dài 3 tháng).
   - Link Google Meet đồng bộ vào từng buổi (Nâng cấp từ `google-calendar.js` của BE cũ). Viết service `src/lib/services/gcal.service.ts`.

3. **Điểm Danh (Attendance):**
   - Giao diện giáo viên (`/teacher/classes/[id]/attendance`): Nút Toggle (Có mặt/Vắng/Đi Trễ) cực nhạy.
   - Server action `markAttendance(scheduleId, marks[])`. Update bulk vô D1 nhẹ nhàng.

4. **Bài Tập (Assignments) & Nộp Bài R2:**
   - Teacher giao đề (pdf/word tải lên R2). Timeline deadline.
   - Student nộp bài (R2 upload link đính vào D1 record). Teacher vào chấm điểm form input.

## Tiêu chí Nghiệm Thu
- Quản lý đóng gói mọi luồng xoay quanh Lớp Học hoàn hảo. API chạy trơn tru, Giao diện Dashboard Lịch rõ ràng, Thầy cô điểm danh 1 cái chạm.
