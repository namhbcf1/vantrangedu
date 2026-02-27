# TỔNG QUAN KẾ HOẠCH TÁI CẤU TRÚC VANTRANGEDU (BẢN CHI TIẾT)

**Mục tiêu tối thượng:** 
- **Xóa sổ** kiến trúc Frontend và Backend cũ rời rạc. Xây dựng một khối thống nhất (Monorepo/Fullstack) bằng **Next.js 15 (App Router)**.
- **Cam kết:** Giữ lại 100% logic, tính năng, và các endpoint API hệ thống cũ. Tuyệt đối không chạm vào DB hay source đang chạy trên production (online hiện tại).
- **Thương hiệu mới:** Re-brand toàn bộ cỗ máy từ "Tinhoc" sang "VantrangEdu".
- **Công nghệ 2026:** React 19, Server Components, Server Actions, Tích hợp sâu Cloudflare (D1 Database, R2 Storage, KV Cache, Workers AI), Drizzle ORM, Tailwind v4, ShadcnUI, Biome (Linting siêu tốc), Vitest/Playwright.

**Quy tắc An Toàn:**
- Mã nguồn cũ được đưa vào thư mục backup (`frontend_backup`, `backend_backup`). Mọi file codebase mới sẽ nằm ở thư mục root (`src/`). Không đụng chạm dữ liệu thật (Production DB/KV/R2). Tạo resource hoàn toàn mới trên Cloudflare cho dự án "VantrangEdu".

---

## Danh sách Phases Dày Đặc (10 Phases)

| Trạng thái | Giai đoạn | Nội dung chính |
| :---: | :--- | :--- |
| ⏳ Pending | [Phase 1: Xóa cũ, Lập mới & Infrastructure Setup](./phase-01-architect-infrastructure.md) | Backup backend/frontend, Init Next.js 15, Biome, Tailwind v4, ShadcnUI. |
| ⏳ Pending | [Phase 2: Database Schema (D1) & Drizzle ORM](./phase-02-database-drizzle-d1.md) | Cấu trúc lại toàn bộ SQL schema cũ sang Drizzle Types. Tạo CF D1, R2, KV. |
| ⏳ Pending | [Phase 3: Core Security, Authentication & Role-Based Guard](./phase-03-auth-security.md) | JWT, Bcrypt, Edge Middleware, Phân quyền Super Admin/Admin/Teacher/Student. |
| ⏳ Pending | [Phase 4: Design System & Re-brand UI/UX (VantrangEdu)](./phase-04-ui-ux-design-system.md) | Master Layouts, Sidebar Component, Bảng màu giáo dục, "VantrangEdu" re-branding. |
| ⏳ Pending | [Phase 5: User Management & AI Feature (CCCD Scanner)](./phase-05-user-management-ai.md) | Quản lý Users. Upload hình vào R2. Tích hợp Cloudflare Workers AI quét hình CCCD. |
| ⏳ Pending | [Phase 6: Academic & Class Management](./phase-06-academic-class-management.md) | Tạo & Theo dõi lớp Online/Offline, Điểm danh, Giao Chấm Bài tập, Lịch Google Meet. |
| ⏳ Pending | [Phase 7: Nền Tảng Thi Đánh Giá (Exam Platform VSTEP) ](./phase-07-exam-platform.md) | Lên lịch thi, Import ngân hàng đề VSTEP/TOEIC, Giao diện thi Realtime, Chấm điểm tự động. |
| ⏳ Pending | [Phase 8: Resources, Messaging & Notifications](./phase-08-resources-communications.md) | Cây thư mục tài liệu (Explorer), Kho Video, Hệ thống Chat tin nhắn nội bộ, Bảng tin (Posts). |
| ⏳ Pending | [Phase 9: Finance, Báo cáo Excel & Export Chứng chỉ (PDF)](./phase-09-finance-reports-certs.md) | Học phí, Nợ phí, Báo cáo doanh thu, In file Excel tĩnh xuất PDF Chứng Chỉ xịn. |
| ⏳ Pending | [Phase 10: Testing, Performance & CI/CD Deployment](./phase-10-testing-deploy-ci.md) | Unit Test (Vitest), E2E (Playwright), Server Action Cache phân tán, Github Actions deploy CF Pages. |

---

## Bản đồ đối chiếu Component & Route
Sự tương ứng giữa thư mục backend cũ và cấu trúc Next.js mới:
- `backend/src/routes/(auth|admins|students|teachers).js` ➡️ `src/lib/actions/user.actions.ts` + `src/app/(admin)/users/...`
- `backend/src/routes/(classes|class-schedules|attendance|assignments...).js` ➡️ `src/lib/actions/class.actions.ts` + `.../(admin)/classes/...`
- `backend/src/routes/(exam-schedules|vstep|registrations).js` ➡️ `src/lib/actions/exam.actions.ts` + `.../(student)/exam/...`
- Các luồng Query DB từ `backend/src/db/` ➡️ Chuyển đổi thành Drizzle ORM Queries nằm trong `src/lib/repositories/`.

> File `plan.md` này sẽ làm điểm neo gốc. Agent sẽ đọc các file `phase-XX` tương ứng để Code.
