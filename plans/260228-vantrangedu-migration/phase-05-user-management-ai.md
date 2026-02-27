# Phase 5: Quản lý User & AI Cloudflare CCCD

**Mục tiêu:** Các endpoint cũ liên quan tới Users (`students.js`, `admins.js`, `cccd-upload.js`) nay có hình hài Server Actions. Sử dụng Cloudflare AI model để parse CMND/CCCD thay phiên bản Python/OpenCV cũ.

## Công Việc Coding

1. **Giao Diện & Chức Năng CRUD (Create, Read, Update, Delete):**
   - Trang `/admin/users/students`: Hiển thị tất học viên. Form tạo có xác thực số điện thoại và email.
   - Server Actions: `createStudent`, `updateStudent`, `deleteStudent`. 100% validate bởi Zod. Zod validation failed trả về format State chuẩn cho React `useFormState`.

2. **R2 Image Storage (Avatar/CCCD):**
   - Viết api `POST /api/upload/presigned-url` gen link trực tiếp tải hình lên cục R2 `vantrangedu-bucket`, loại bỏ tình trạng thắt nút cổ chai (bottleneck) băng thông khi tải hình qua RAM của máy chủ.

3. **Cloudflare Workers AI (Quét CCCD thông minh):**
   - Module `src/lib/services/ai-cccd.service.ts`.
   - Request trỏ thẳng đến Cloudflare Llama Vision Core Model hoặc `@cf/meta/llama-3.2-11b-vision-instruct` (nếu account CF cấp phép vision).
   - **Luồng AI:** Gửi link ảnh R2 -> Model Vision -> Prompt: "Return a strict JSON with Name, DOB, ID_Number from this ID card".
   - Bơm cục JSON thuẩn khiết đó vào React Form (Nút điền vào điền tự động). Đảm bảo logic từ `cccd-detector.js` cũ hoạt động nhưng thông minh gấp 10 lần nhờ Vison LLM.

## Tiêu chí Nghiệm Thu
- Admin thêm, sửa, xóa học viên (Mã hóa mật khẩu).
- Nút "Quét CCCD" tải hình lên R2 và trả về mảng text Form điền sẵn chính xác thông tin học sinh trong < 5 giây.
