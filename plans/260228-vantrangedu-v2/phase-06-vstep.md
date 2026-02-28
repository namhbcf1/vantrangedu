# Phase 06: Báu Vật VSTEP Exam Platform (JSON & Auto-Save Engine)

## 📌 Context
Hệ thống thi thử và thi thật VSTEP là "Trái tim kinh doanh" của Vân Trang Edu. Bản cũ lưu 1 đề thi thành 5-6 bảng SQL (Exam, Section, Passage, Question, Choice), làm cho tốc độ query cực chậm trên môi trường mạng yếu và dễ lỗi khi có hàng trăm học sinh thi cùng lúc.
Bản 2.0 đã chuẩn bị sẵn Cấu trúc `JSON` (ở Phase 02). Giờ ta sẽ tận dụng Server Actions và Client State (Zustand/React) để làm Form thi siêu mượt, Auto-save (Lưu tự động) từng câu hỏi về D1 mà không gây lag trình duyệt.

## 🎯 Mục Tiêu Phase 06:
1.  **Engine Giải mã Đề thi:** Dựng cấu trúc `json` lấy từ DB thành giao diện thi (Phân Trang theo Section: Reading, Listening, Writing, Speaking).
2.  **Auto-Save Mượt mà:** Viết Action `saveProgress` chạy ngầm. Khi học viên chọn A, B, C, D -> UI cập nhật lập tức, 1 giây sau Data mới gởi lên Server.
3.  **Adaptive Exam UI:** 
    -   PC: Chia đôi màn hình (Trái: Bài Đọc/Audio, Phải: Câu Hỏi).
    -   Mobile: Cuộn dọc liên tục (Passage hiện sticky trên đầu).

## 🛠️ Step-by-Step Implementation

1.  **Khởi tạo Route Thi VSTEP:**
    -   Tạo `src/app/(student)/tai-khoan/thi-vstep/[examId]/page.tsx`.
    -   Fetch đề thi (`exams.content`) và trạng thái làm bài (`examAttempts.studentAnswers`).

2.  **Xây dựng Giao diện Phòng Thi (Exam Hall):**
    -   `src/app/(student)/tai-khoan/thi-vstep/_components/exam-timer.tsx` (Đồng hồ đếm ngược).
    -   `src/app/(student)/tai-khoan/thi-vstep/_components/desktop-exam.tsx` (Bản PC chia cột).
    -   `src/app/(student)/tai-khoan/thi-vstep/_components/mobile-exam.tsx` (Bản Mobile cuộn).

3.  **Engine Auto-Save (Client-Side State):**
    -   Sử dụng Hook `useOptimistic` hoặc state nội bộ kết hợp `debounce` để gọi Server Action `saveAnswer(attemptId, questionId, chosenAnswer)`.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Học viên truy cập phòng thi, đồng hồ bắt đầu chạy.
- Click chọn đáp án trắc nghiệm -> Server lưu lại không giật lag màn hình (Optimistic UI).
- Giao diện PC tận dụng màn hình rộng để hiện đoạn văn Reading bên trái, câu hỏi bên phải. Giao diện Mobile tối ưu không gian đọc.
