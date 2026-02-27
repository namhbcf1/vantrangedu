# Phase 02: Thiết Lập Cơ Sở Dữ Liệu (Drizzle ORM & Cloudflare D1)

## 📌 Context
Hệ thống cũ viết 30+ bảng bằng 33 file migration raw SQL, sinh ra thừa thãi bảng metadata (ví dụ: VSTEP cần 5-6 bảng riêng).
Chúng ta chuyển đổi sang **Drizzle ORM (Type-Safe)**, định nghĩa database bằng TypeScript, và quản lý Schema gọn gàng.

## 🎯 Mục Tiêu Phase 02:
1.  Thiết lập config Drizzle kết nối D1 local và remote.
2.  Tối ưu hóa Schema 30+ bảng xuống còn khoảng 15 bảng cốt lõi (Sử dụng SQLite `text` mode `'json'` cho metadata).
3.  Seed Schema để chuẩn bị Migration.

## 🛠️ Step-by-Step Implementation

1.  **Cấu hình Drizzle:**
    -   Tạo file `drizzle.config.ts`.
    -   Tạo thư mục `src/server/db` và file `index.ts` kết nối D1 instance.

2.  **Định nghĩa Cấu trúc Bảng Cốt Lõi (Core Schema):**
    -   Tạo file `schema/users.ts`: Gộp Admin, Staff, Teacher, Student (Dùng Role thay vì tách 4 bảng).
    -   Tạo file `schema/classes.ts`: Lớp học Offline / Online (Dùng JSON để lưu link Google Meet, cấu hình thay vì rẽ bảng).
    -   Tạo file `schema/exams.ts`: Kỳ thi (Gộp cả thi nội bộ và thi VSTEP vào 1 bảng chuẩn hóa JSON structure).
    -   Tạo file `schema/payments.ts`: Học phí, Thanh toán.
    -   Tạo file `schema/documents.ts`: Quản lý tài liệu (R2 ID) và Hệ thống phân quyền JSON array.

3.  **Khởi tạo Database Scripts:**
    -   Update `package.json` với lệnh `db:generate` và `db:push`.
    -   Chạy test generate schema để đảm bảo Drizzle chạy ngon, xuất file SQL trong `.drizzle`.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Chạy npm run db:generate ra output migrate success, không lỗi TypeScript.
- File `drizzle.config.ts` trỏ đúng vào Cloudflare local preview & remote D1 ID.
- Mở đầu cho chức năng Authentication (Better-Auth) tiếp theo trong Phase 03.
