# Phase 4: Thiết kế Master Layouts & VantrangEdu Branding

**Mục tiêu:** Tạo áo ngoài quy mô lớn, rebrand từ tên Tinhoc cũ sang chuẩn VantrangEdu. Setup các component tái sử dụng 100%.

## Công Việc Coding

1. **Re-branding VantrangEdu Toàn Cục:**
   - Các file `metadata` (Title, description, og:image) trong `layout.tsx` sửa dứt điểm thành: "VantrangEdu - Nền Tảng Đào Tạo Thế Hệ Mới".
   - Bảng màu: Thay thế các mã config `.css` màu chủ đạo (Primary color) sang màu phù hợp Giáo dục (Xanh than, hoặc Vàng/Đỏ tuỳ nhận diện Vantrang).
   - Thiết kế logo Text hoặc file SVG, nhúng vào Header.

2. **Khung cảnh Admin Dashboard (`(admin)/layout.tsx`):**
   - Dùng **Shadcn Sidebar** (Bản cập nhật v2 mới nhất của shadcn) để tạo Sidebar đóng/mở mượt.
   - Menu cấu trúc: Trang chủ thống kê, User, Lớp Học, Kỳ Thi, Tài Liệu, Tài Chính, Hệ Thống...
   - Cây Breadcrumb hiển thị đường link đang đứng. Dark/light mode switcher.

3. **Khung cảnh Student/Teacher (`(student)/layout.tsx`):**
   - Layout nhẹ nhàng, thân thiện người dùng hơn (Bỏ cột trái thay bằng Top Menu Bar, hoặc làm Sidebar nhỏ gọn).

4. **Data Tables System (Thần Hồn của ERP):**
   - Thay vì code đi code lại hàng chục bảng, ta viết component `<DataTable columns={...} data={...} />` được wrap bởi `@tanstack/react-table`.
   - Tích hợp Sort, Paginate, Filter (dùng query string URL `?page=1&q=xxx` để Next.js SSR cache hiệu quả).

## Tiêu chí Nghiệm Thu
- Navbar và Sidebar tương tác không delay. Chuyển Dark/Light theme tức thì. 
- Màn hình mobile co giãn hoàn hảo. Data table load khung mẫu xương rồng (skeleton loading) đẹp mắt.
