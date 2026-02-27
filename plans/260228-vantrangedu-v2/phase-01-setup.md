# Phase 01: Thiết Lập Bộ Khung Dự Án (Framework Setup & Cloudflare Integration)

## 📌 Context
Chúng ta cần một nền móng vững chắc bằng Next.js 15, tương thích hoàn toàn với nền tảng Edge của Cloudflare. Đồng thời, cấu hình Tailwind CSS v4, shadcn/ui để sẵn sàng cho Adaptive UI sau này.

## 🎯 Mục Tiêu Phase 01:
1.  Tạo được cấu trúc thư mục `src` (vì đã bị xoá).
2.  Cấu hình routing cơ bản chuẩn Next.js App Router.
3.  Tích hợp thành công và build thử nghiệm nghiệm với `@cloudflare/next-on-pages`.

## 🛠️ Step-by-Step Implementation

1.  **Khôi phục cấu trúc `src` cơ bản:**
    -   Tạo thư mục `src/app`, `src/components`, `src/lib`.
    -   Viết file `src/app/layout.tsx` (Root layout chứa html, body cơ bản).
    -   Viết file `src/app/page.tsx` (Trang chủ tạm thời xác nhận dự án chạy).
    -   Tạo file CSS toàn cục `src/app/globals.css`.

2.  **Cấu hình UI Tooling:**
    -   Tạo file `components.json` (phục vụ shadcn/ui).
    -   Tích hợp Tailwind CSS vào file `globals.css`.
    -   Cài đặt công cụ format (`biome.json`).

3.  **Tích hợp & Build Cloudflare:**
    -   Điều chỉnh `next.config.ts` để tối ưu môi trường Edge deploy.
    -   Cập nhật `package.json` các script build (`pages:build`, `pages:deploy`).
    -   Thực hiện chạy thử lệnh build để đảm bảo hệ thống render tĩnh không lỗi.

## ✅ Thành Quả Kỳ Vọng (Definition of Done)
- Lệnh `npm run build` hoặc lệnh dev chạy mượt mà mà không ném ra lỗi.
- Kiến trúc thư mục chuẩn bị sẵn sàng rẽ nhánh component Mobile/Desktop.
- Dự án sẵn sàng ở mức Base rỗng để triển khai Phase 2 (Database).