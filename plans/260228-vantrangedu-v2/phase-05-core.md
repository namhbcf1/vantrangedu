# Phase 05: Core Modules (Quản lý Học viên & Server Actions)

## 📌 Context
Hệ thống cũ dùng React Fetch gọi API từ Hono.js. Phiên bản 2.0 sử dụng "Server Actions" của Next.js 15 kết hợp Drizzle ORM để query D1 Database siêu tốc. Chúng ta sẽ làm trang `/admin/hoc-vien` áp dụng triệt để Adaptive UI:
- Desktop: Hiển thị `<DataTable>` đồ sộ (Nhiều cột: CCCD, Email, Lớp, Học phí).
- Mobile: Hiển thị `<StudentCardList>` tối giản (Avatar, Tên, Nút Gọi điện to, Dễ vuốt).

## 🎯 Mục Tiêu Phase 05:
1.  **Data Fetching:** Tạo hàm `getStudents` chạy trên Server (Cloudflare Edge).
2.  **Xây giao diện PC:** Bảng DataTable (Table Component).
3.  **Xây giao diện Mobile:** Vuốt danh sách (Card Component).
4.  **Tối ưu Loading:** Sử dụng React Suspense để trải nghiệm tải mượt mà.

## 🛠️ Step-by-Step Implementation

1.  **Viết Logic Query (Server Action):**
    -   Tạo `src/app/(admin)/admin/hoc-vien/actions.ts`.
    -   Dùng `getRequestContext().env.DB` để lấy DB instance -> Drizzle `select()`.

2.  **Khởi tạo Components Giao diện:**
    -   `src/app/(admin)/admin/hoc-vien/_components/desktop-table.tsx`
    -   `src/app/(admin)/admin/hoc-vien/_components/mobile-list.tsx`

3.  **Lắp ráp tại Page Router:**
    -   Tạo `src/app/(admin)/admin/hoc-vien/page.tsx`.
    -   Gọi `isMobileDevice()` -> Quyết định render `<DesktopTable>` hay `<MobileList>`.
    -   Push Dữ liệu (Mock / Real Data) vào 2 components trên làm Props.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Khi truy cập `/admin/hoc-vien` trên PC -> Bảng 4-5 cột hiện ra.
- Khi truy cập `/admin/hoc-vien` trên Mobile -> Danh sách thẻ dọc hiện ra.
- Dữ liệu fetch trực tiếp bằng Drizzle type-safe.
