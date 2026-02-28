# Phase 08: Hoàn thiện Học viên & Giáo viên Portal (Dashboard Hệ thống)

## 📌 Context
Học viên và Giáo viên là đối tượng sử dụng hệ thống Vân Trang Edu nhiều nhất. Do đó, việc xây dựng Portal (Dashboard) cá nhân hóa cho từng đối tượng qua cơ chế Adaptive UI là cốt lõi để thu hút và giữ chân người học.
- Học viên tập trung vào: Xem lịch, Làm bài tập/VSTEP, Học video R2.
- Giáo viên tập trung vào: Điểm danh nhanh, Quản lý lớp.

## 🎯 Mục Tiêu Phase 08:
1.  **Student Portal (`/tai-khoan`)**: Dashobard cá nhân hóa (Báo cáo Lớp học hiện tại, Lịch gần nhất, Các bài test đang làm dở).
2.  **Teacher Portal (`/giao-vien`)**: Bảng điều khiển tối giản cho Giáo viên thao tác điểm danh và tương tác với học viên (Kế thừa Component ở Phase 05).
3.  **Adaptive Shell Mở Rộng**: Xây layout rẽ nhánh (Desktop Sidebar / Mobile Tab) riêng cho từng Zone.

## 🛠️ Step-by-Step Implementation

1.  **Dựng Adaptive Shell cho Student (Mobile & PC):**
    -   Tạo `src/components/layouts/student/DesktopSidebar.tsx`.
    -   Tạo `src/components/layouts/student/MobileShell.tsx` (Tab bar có icon Sách, Đồng hồ, Test).

2.  **Khởi tạo Route & Layout Học viên:**
    -   Tạo `src/app/(student)/tai-khoan/layout.tsx`.
    -   Tạo `src/app/(student)/tai-khoan/page.tsx` (Bảng điều khiển học viên - Mock data tổng quan).

3.  **Khởi tạo Route & Layout Giáo viên:**
    -   Tương tự bước 1 & 2, nhưng tạo ở thư mục `src/app/(teacher)/giao-vien/...`.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Khi học viên đăng nhập, vào `/tai-khoan` -> Màn hình Dashboard thân thiện hiện ra (Đồng hồ, Lớp của tôi, VSTEP của tôi).
- Khi giáo viên đăng nhập, vào `/giao-vien` -> Giao diện Điểm danh/Lịch dạy gọn gàng, hiệu suất cao hiện ra.
