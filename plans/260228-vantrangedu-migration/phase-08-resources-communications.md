# Phase 8: Tài Liệu, Messaging & Bảng Tin Thông Báo

**Mục tiêu:** Môi trường chia sẻ tài nguyên. Đập đi tính năng File System lỗi thời và thay bằng giao diện Tree (Tương tự Google Drive mini) và Chat. Bản thân cũ có `document-folders.js`, `videos.js`, `messaging.js`.

## Công Việc Coding

1. **Trình Quản Lý Kho Dữ Liệu Học Phụ Trợ (Google Drive CloneUI):**
   - Bảng `document_folders` (Mô hình Parent-Child) hiển thị Nested Folders dùng React recursive components.
   - Bảng `documents`: Tên file, liên kết R2. Thêm quyền (`permission: 'ALL', 'CLASS_12A'`).
   - Tương tự với `videos.js`.

2. **Chat Nội Bộ & Hệ Thống Nhắn Tin:**
   - Code cũ có `messaging.js`. Trong hệ sinh thái Serverless (Cloudflare/Next), để làm chat realtime ít rớt, ta áp dụng Polling SWR (`useSWR` fetch 3s 1 lần) HOẶC nếu dùng CF DO (Durable Objects), ta thiết lập WebSocket Route `src/app/api/ws/route.ts`. Phương án an toàn & nhanh nhất 2026: **Server-Sent Events (SSE)** hoặc Polling tối ưu.

3. **Bảng Tin Chung (News & Notifications):**
   - `posts.js`: Quản trị viết bài đăng SEO/Hoạt động. Dùng UI WYSIWYG editor (VD: Tiptap hoặc Quill) để viết bài.
   - `notifications.js`: Loa thông báo mỗi khi Bài thi được chấm hoặc Bài tập gần tới hạn (Push Notification chèn vô Navbar chuông).

## Tiêu chí Nghiệm Thu
- Xem được cây tài liệu các cấp trong mục Tài Liệu.
- Thử nhắn gửi 1 tin nhắn vào hộp thư Giáo Viên và có chuông báo đỏ hiện lên.
