# Phase 1: Xóa Cũ, Lập Mới & Infrastructure Setup

**Mục tiêu:** Cách ly hoàn toàn mã nguồn cũ để giữ bản gốc dự phòng. Dọn đường khởi tạo dự án Next.js 15 (App Router) với các tools hiện đại nhất (Biome, Tailwind v4, ShadcnUI).

## Chỉ Tiêu Công Việc Cụ Thể

1. **Backup Toàn Bộ Dữ Liệu Hiện Tại:**
   - Script tạo thư mục `frontend_backup/`, move toàn bộ lõi frontend (Vite/React cũ) vào.
   - Script tạo thư mục `backend_backup/`, move toàn bộ API Express/Workers cũ vào đó.
   - Root project trở nên **trống trải**.

2. **Khởi Trị Dự Án Gốc (Next.js 15):**
   - Chạy lệnh cài đặt Next 15 ngay tại root: `npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm`
   - Gỡ bỏ ESlint/Prettier mặc định. Thay bằng **Biome** (`npm i -D @biomejs/biome`) để tối ưu tốc độ lint/format cực mạnh cho năm 2026. Tạo file `biome.json`.

3. **Cấu Hình Styling System (Tailwind v4):**
   - Nâng cấp `tailwindcss/postcss` lên phiên bản v4 hoặc cấu hình Next.js plugin mới nhất.
   - Thêm ShadcnUI framework: `npx shadcn-ui@latest init` với style 'New York', color 'Slate', và css variables active.

4. **Sắp Xếp Kiến Trúc Chuyên Sâu Của App Router:**
   - Cấu trúc thư mục (Lớp lang rõ rệt):
     - `src/app/`: (auth), (admin), (student), (teacher), api.
     - `src/components/`: ui (shadcn), layout, shared, forms (dùng react-hook-form + zod).
     - `src/lib/`:
       - `db/`: Cấu hình Drizzle ORM và connect DB.
       - `repositories/`: Giao tiếp Data Access Layer (100% queries Drizzle tập trung tại đây).
       - `services/`: Business Logic Layer (Auth logic, Tính điểm logic...).
       - `actions/`: Server Actions (Thay thế hoàn toàn cho GET/POST api routes nội bộ).
     - `src/types/`: Zod schemas & TypeScript definitions.

5. **Cloudflare Local Binding (Wrangler):**
   - Tạo file `wrangler.toml` (tạo mới định dạng cho framework VantrangEdu). Khai báo các biến `[[d1_databases]]`, `[[r2_buckets]]`, `[[kv_namespaces]]`, và `[ai]`. Tên db: `vantrangedu-db`.
   - Cập nhật `.env` và thiết lập `npm run setup:local` cho auto migration locally.

## Tiêu chí Nghiệm thu (Definition of Done)
- Run `npm run dev` lên cổng 3000 trang chủ Next 15 sạch bóng. Mọi file cũ được nằm gọn trong 2 folder backup.
- Biome check passing 100%. Shadcn UI components (như Button) đã sẵn sàng để Import.
