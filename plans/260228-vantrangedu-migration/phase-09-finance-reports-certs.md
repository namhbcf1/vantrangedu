# Phase 9: Kế Toán Kỹ Thuật Số & Chứng Chỉ PDF/Excel

**Mục tiêu:** Xử lý dòng tiền Học Phí của học sinh. Xóa đi sự phụ thuộc thư viện Excel cũ rỗng tuếch, update Export chuyên nghiệp, làm Gen PDF xịn xò từ code `certificates.js`, `payments.js`.

## Công Việc Coding

1. **Hệ Thống Tiền Mặt & Công Nợ:**
   - Component thu/chi Dashboard.
   - Bảng học sinh nợ phí (Lấy tổng nợ = total giá lớp - total payment đã đóng). Hiển thị Badge báo động Đỏ/Xanh.
   - Lưu vết giao dịch ghi `activity-logs` nghiêm ngặt từng dòng tiền. Phân quyền chỉ Admin Kế Toán.

2. **ExcelJS Export Worker:**
   - API `GET /api/export/financial-report`: Dùng thư viện `exceljs` quét mảng dữ liệu Drizzles, định dạng style ô màu mè, đổ xuống trả về Header Data Buffer (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).

3. **Render PDF Chứng Chỉ Động (@react-pdf/renderer):**
   - Code cũ dùng pdfGenerator.js, có thể lằng nhằng Font chữ CJK (Tiếng Việt) trong Cloudflare Workers.
   - Thiết lập font tiếng Việt trong Worker, truyền payload `Tên Học Viên`, `Số Điểm`, `Loại Chứng Chỉ` vẽ PDF vector và return Stream PDF ngay tại thời điểm gọi. Tuyệt đối trong veo khi in ra.

## Tiêu chí Nghiệm Thu
- Tải file danh sách nợ. Mở bằng App Excel hiện chuẩn các cột và giá trị tính toán.
- Click nút Chứng Chỉ Thi VSEP sinh ra hình ảnh file PDF in sẵn tên với Font UTM hoặc Times New Roman đúng thể thức của VantrangEdu.
