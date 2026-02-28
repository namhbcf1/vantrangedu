# Phase 07: Tài liệu & R2 Storage (Streaming & Security)

## 📌 Context
Hệ thống cũ của Vân Trang tốn tiền và phức tạp khi dùng cả "Cloudflare Images" (trả phí) và "Cloudflare R2" (phiên bản cấu hình loằng ngoằng presigned URL qua Hono). 
Với phiên bản 2.0, chúng ta sẽ **dùng 100% Cloudflare R2 (Miễn phí 10GB lưu trữ và Vô hạn băng thông xuất)**. Cloudflare R2 Binding trong Next.js 15 cực kỳ mạnh mẽ: Backend gọi R2 thẳng từ biến môi trường `env.R2` không cần dùng thư viện AWS SDK nặng nề.

## 🎯 Mục Tiêu Phase 07:
1.  **Direct R2 Binding:** Tạo lõi giao tiếp R2 qua Cloudflare Workers env (Bỏ hẳn AWS SDK).
2.  **Upload siêu tốc (Server Actions):** Học viên upload ảnh CCCD hoặc Giảng viên up Video Bài Giảng từ Client -> Bắn thẳng mảng byte lên R2.
3.  **Tài liệu Bảo mật (Signed URL / Secure Route):** Video bài giảng và file PDF mật không được phép lấy link chia sẻ ra ngoài. Khi học viên có quyền xem (Role student + đã mua khoá học), sinh ra link tạm thời (Streaming an toàn).

## 🛠️ Step-by-Step Implementation

1.  **Core R2 Utility (Server Only):**
    -   Tạo `src/server/storage/r2.ts`: Hàm `uploadFileToR2()`, `getSecureFileStream()`.
    
2.  **API Streaming Tối Tưu (`/api/files/[key]`):**
    -   Tạo Route API trả về `ReadableStream` (Cho phép tua Video cực mượt mà trên browser, xem PDF không cần tải về).
    -   Kiểm tra Middleware Session (Phải đăng nhập mới được xem).

3.  **Giao diện Kho Tài Liệu (Bản PC vs Mobile):**
    -   `src/app/(admin)/admin/tai-lieu/page.tsx`: Giao diện Admin quản lý File dạng thư mục (File Explorer) kéo thả. Tải lên bằng Form Action.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Hệ thống có khả năng nhận file từ form, đẩy thẳng lên Bucket R2 của Vân Trang Edu (`vantrangedu-files`).
- Video nội bộ truyền xuống mượt mà qua API Stream, không bị download lộ link.
