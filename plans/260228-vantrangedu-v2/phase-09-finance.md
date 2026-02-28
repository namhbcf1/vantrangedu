# Phase 09: Bảng Mạch Tài Chính & Báo Cáo (SePay QR & Recharts)

## 📌 Context
Hệ thống cũ yêu cầu Admin xác nhận học phí bằng tay hoặc sinh viên upload ảnh biên lai rất vất vả (Dễ sai sót, mệt mỏi vào mùa tuyển sinh).
Chúng ta sẽ nâng cấp hệ thống thanh toán tự động 2026: **Tích hợp SePay (VietQR)**. Học viên quét mã QR -> Tiền vào tài khoản trung tâm -> Webhook của SePay bắn về Cloudflare Edge API -> D1 Database tự động "Duyệt" học sinh vào lớp.

## 🎯 Mục Tiêu Phase 09:
1.  **Drizzle Schema:** Cập nhật bảng `payments` để đánh dấu `transaction_code` từ SePay.
2.  **API Webhook:** Viết Endpoint `/api/webhooks/sepay` siêu bảo mật (Check API Token) nhận tin nhắn chuyển khoản và cập nhật trạng thái `class_enrollments`.
3.  **UI Component QR Code:** Trang thanh toán của học viên tự động render mã QR mượt mà với số tiền học phí và Nội dung chuyển khoản chuẩn xác (VD: `VTE NAM 001203 LOP01`).
4.  **Báo cáo Biểu đồ:** Trang Dashboard Admin sẽ vẽ biểu đồ Doanh thu bằng `Recharts` (Thư viện siêu nhẹ trên React 19).

## 🛠️ Step-by-Step Implementation

1.  **Chỉnh sửa Database:**
    -   Tạo file `src/server/db/schema/payments.ts`. Liên kết với `users` và `classes`.

2.  **Xây dựng Endpoint Webhook (Server Action):**
    -   Tạo `src/app/api/webhooks/sepay/route.ts`.
    -   Logic: Nhận JSON từ SePay -> Lọc nội dung chuyển khoản -> Tìm Enrollment ID -> Update `status: 'active'`.

3.  **Giao diện Nộp học phí (Student Portal):**
    -   Tạo `src/app/(student)/tai-khoan/thanh-toan/[enrollmentId]/page.tsx` hiển thị QR Code động (Dùng `https://qr.sepay.vn/img?...`).

4.  **Giao diện Báo Cáo Doanh Thu (Admin Dashboard):**
    -   Cập nhật `src/app/(admin)/admin/page.tsx` để render biểu đồ cột/đường doanh thu tháng.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Học sinh thấy QR Code > Chuyển tiền > Webhook bắn > Web tự động báo "Thanh toán thành công" (Bằng kỹ thuật Polling hoặc WebSocket ảo).
- Báo cáo Admin hoạt động trơn tru dựa trên Data thực từ `payments`.
