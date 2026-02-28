# Phase 03: Xác Thực Đa Vai Trò trên Edge (Better-Auth / Auth.js)

## 📌 Context
Hệ thống cũ tự viết cơ chế JWT cho từng luồng (Admin riêng, Giáo viên riêng, Học sinh đăng nhập bằng CCCD + SĐT riêng). Cách này bảo mật kém, khó quản lý phiên (session) khi học sinh đăng nhập trên nhiều thiết bị, và không chạy tốt trên Edge của Cloudflare.
Chúng ta sẽ dùng giải pháp xác thực hiện đại nhất 2026: **Xác thực dựa trên Session tại Edge** kết hợp Drizzle ORM.

## 🎯 Mục Tiêu Phase 03:
1.  Bổ sung các bảng cần thiết cho thư viện Auth (Session, Account) vào Drizzle schema.
2.  Thiết lập bộ xử lý Auth API (`/api/auth/[...route]`) chạy native trên Cloudflare Workers.
3.  Hỗ trợ 2 luồng đăng nhập (Credentials):
    -   **Luồng Admin/Teacher**: Đăng nhập bằng Email/Username + Mật khẩu.
    -   **Luồng Học Viên (Đặc thù)**: Đăng nhập trần bằng SĐT + CCCD (Không cần mật khẩu).

## 🛠️ Step-by-Step Implementation

1.  **Cập nhật Database Schema cho Auth:**
    -   Mở rộng file `users.ts` để thêm bảng `session` và `account` (Bắt buộc của thư viện Auth hiện đại để quản lý thiết bị đăng xuất từ xa).
    -   Chạy `db:generate` để tạo migration kết hợp.

2.  **Cấu trúc Auth Core:**
    -   Tạo file `src/lib/auth.ts`: Khởi tạo Auth config nối thẳng vào Drizzle adapter.
    -   Định nghĩa Credentials Provider với logic kiểm tra `role` từ bảng `users`.
    -   Phân luồng: Nếu `cccd` và `phone` khớp -> Cho qua (Luồng học viên). Nếu password encrypt khớp -> Cho qua (Luồng Admin).

3.  **Route API & Middleware:**
    -   Tạo `src/app/api/auth/[...route]/route.ts`.
    -   Tạo `src/middleware.ts`: Bảo vệ các luồng route tĩnh. (Ví dụ: Chặn User thường vào `/admin`, đưa kẻ chưa đăng nhập ra ngoài `/login`).

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Hệ thống có file cấu hình Auth vững chắc, API Auth sẵn sàng nhận request.
- Middleware Edge tự động chuyển hướng người dùng khi cố truy cập trái phép.
