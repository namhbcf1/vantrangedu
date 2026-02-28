# Phase 04: Cấu trúc Giao diện & Adaptive UI (Client/Server Separation)

## 📌 Context
Hệ thống Vân Trang Edu v2.0 yêu cầu hai giao diện riêng cho PC và Mobile, trả về tùy theo thiết bị mà không cần tải file JS dư thừa. Chúng ta sẽ áp dụng **Adaptive UI Pattern** ở Server Components (Dùng headers để detect User-Agent), kết hợp với Shadcn/UI để xây form điều khiển.

## 🎯 Mục Tiêu Phase 04:
1.  **Chốt Cấu trúc App Router:** Thiết lập cây thư mục Route Groups rành mạch cho Public (`(storefront)`), Học sinh (`(student)`), Quản trị (`(admin)`).
2.  **User-Agent Detection:** Viết hàm `lib/device.ts` (lấy dữ liệu browser từ header request).
3.  **Adaptive Container:** Viết các Layout vỏ ngoài chặn đường render (để gọi Mobile/Desktop Component riêng rẽ cho từng Route).
4.  **Tích hợp UI Engine:** Thêm Shadcn/UI cơ sở (`button`, `input`, `card`) lên Tailwind v4.

## 🛠️ Step-by-Step Implementation

1.  **Dựng Route Groups (Phân lô khu đất):**
    -   Tạo `src/app/(storefront)/page.tsx` (Trang chủ Marketing/SEO).
    -   Tạo `src/app/(student)/tai-khoan/layout.tsx` và `page.tsx` (Bảng điều khiển học viên).
    -   Tạo `src/app/(admin)/admin/layout.tsx` và `page.tsx` (Trái tim Quản trị viên).

2.  **Phân Giải Thiết Bị (Device Detection):**
    -   Viết công cụ `getDeviceType()` từ header `user-agent` ở `src/lib/device.ts`.

3.  **Xây dựng "Adaptive Shell":**
    -   Tạo thư mục `src/components/layouts/admin` chứa `DesktopSidebar.tsx`, `MobileBottomTab.tsx`.
    -   Logic Layout chính: `<AdminLayout>{isMobile ? <MobileShell/> : <DesktopShell/>}</AdminLayout>`.

4.  **Áp dụng Shadcn/UI Component:**
    -   Chạy lệnh npx cài đặt các khối UI xịn xò vào `src/components/ui/` (dùng chung cho cả PC và Mobile ở cấp component siêu nhỏ).

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Khi mở máy tính vào `/admin`: Load giao diện Sidebar bề thế.
- Khi F12 đổi sang màn hình điện thoại -> F5 tải lại: Trả về cục giao diện thẻ/vuốt tối giản, không hề dính CSS rác của bản Desktop.
- Cây folder chuẩn mực, không rác code.
