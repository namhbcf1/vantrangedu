# Phase 10: Testing, Tối Ưu Tốc Độ & Bấm Nút Deploy

**Mục tiêu:** Không còn code chết. Kiểm tra tỉ số và CI/CD tự động toàn chu trình nhằm triệt tiêu các lỗi 500 ngu ngốc trên trang Live trực tiếp. Nối mạng đưa VantrangEdu cất cánh.

## Công Việc Coding

1. **Testing Unit (Vitest):**
   - Không cần test 100% component nhảm, nhưng **Cần Unit Test** các services quan trọng: `Tính điểm VSTEP`, `Hash Password Auth`, `Giải thuật Công nợ`. 
   - Thêm câu lệnh `vitest run` vào quy trình hook.

2. **End-to-End (E2E) với Playwright:**
   - Viết 1 kịch bản User Journey: Login -> Xem Lịch -> Làm Bài Thi Mẫu -> Nộp Bài -> Thoát. (Cho chạy Local để check độ thông chuột).

3. **Tối Ưu Hoá Giao Trình (Caching & SEO):**
   - Cài đặt meta tag SEO (Dynamic Title next.js). Bật Gzip/Brotli.
   - Những nội dung tĩnh như Trang Tin Tức (Posts), Route `/api/posts` thêm thuộc tính Cache mạnh `revalidate: 3600` (1 tiếng mới query db 1 lần) để tiết kiệm Read Operation D1 Cloudflare.

4. **Kịch Bản Git Action CI/CD Tự Động:**
   - Xóa bỏ cái `AUTO_DEPLOY.yml` sứt sẹo cũ. Viết lại File `.github/workflows/deploy.yml`.
   - Các step: Actions/Checkout -> Setup Node 20 / pnpm -> Biome Check -> Vitest -> `npx @cloudflare/next-on-pages` (Build App Router) -> Xuất kết quả Output sang lệnh `wrangler pages deploy .vercel/output/static --project-name vantrangedu`.

## Tiêu chí Nghiệm Thu
- App chạy nhanh, nhẹ, mọi Request vào DB cực mượt, không có log đỏ ở Server component console.
- Nhấn Push mã nguồn nhánh Main, Github Action xoay vòng xanh lá, tự động đẻ ra Domain VantrangEdu trực tuyến chạy độc lập ở Cloudflare. Masterpiece hoàn tất!!! 🎉
