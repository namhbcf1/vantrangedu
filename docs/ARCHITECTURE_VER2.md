# 📊 BÁO CÁO PHÂN TÍCH & KIẾN TRÚC MỚI (VER 2.0 - 2026): VAN TRANG EDU

> **Triết lý 2.0:** "Đập đi xây lại toàn bộ" - Không kế thừa code thừa mứa, kiến trúc hiện đại, 100% Hosted trên Hệ sinh thái Free Cloudflare (Pages/Workers/D1/R2).

## 1. 🏗️ KIẾN TRÚC HỆ THỐNG MỚI (CHUYỂN ĐỔI SANG 2026)

Hệ thống cũ xài Hono.js (backend riêng) + React (frontend riêng), tốn công maintain 2 chỗ.
Thay vào đó, hệ thống v2 sẽ dùng **Next.js 15 (App Router)** chạy Full-stack trên cùng một chỗ (Cloudflare Pages).

### So Sánh Kiến Trúc:

| Thành Phần | Bản Cũ (Tách rời) | Bản Mới v2.0 (Serverless Full-stack) | Lợi Ích Vượt Trội (2026) |
| :--- | :--- | :--- | :--- |
| **Framework** | React 18 + Hono.js | **Next.js 15 + React 19** | SEO đỉnh cao, Server Components siêu nhanh, 1 repo duy nhất quản lý cả Frontend lẫn Backend (API Routes). |
| **Giao diện** | CSS Modules + Tailwind cũ | **Tailwind CSS v4 + shadcn/ui** | Design System đồng nhất, hiệu năng cao, Dark/Light mode chuẩn, UX/UI xịn xò như các SaaS thế giới. |
| **Database** | Raw SQL (cực khổ, dễ lỗi) | **Drizzle ORM + Cloudflare D1** | Quản lý database bằng TypeScript (bảo vệ lỗi từ lúc gõ code), Migration rõ ràng, vẫn giữ D1 (SQLite) xịn xò của Cloudflare 100% Free. |
| **Deploy** | Script tay + tách biệt Repo | **Cloudflare Pages (Next-on-pages)**| Triển khai tự động (Auto CI/CD từ GitHub). Đẩy code phát là lên web. Edge Network nhanh toàn cầu. Chạy Next.js native. |
| **Xác thực** | JWT tự viết | **Better-Auth (TypeScript)** | Giải pháp xịn nhất 2026, hỗ trợ cả mật khẩu, OTP, Social Login, Session quản lý cực ngon, hỗ trợ phân quyền vai trò (RBAC) sắc bén. |
| **Lưu trữ** | R2 + Cloudflare Images | **Cloudflare R2 (Object Storage)** | Quyết định dẹp "Cloudflare Images" vì có phí ẩn. Hệ thống mới sẽ dùng **R2 100% Free** kết hợp Next/Image để resize ảnh mượt mà, lưu Video thoải mái không tốn tiền. |

## 2. 👥 TÁI CẤU TRÚC 4 CỔNG PHÂN QUYỀN (ROUTE THÔNG MINH)

Chúng ta không chia "App Router" lắt nhắt, mà gom lại thành 4 luồng Route Rõ Ràng. Mỗi luồng có Layout & Bảo mật riêng biệt.

1.  **(Public) `/(storefront)/*`**:
    *   Các trang cho SEO (Trang chủ, Lịch khai giảng, Tra cứu chứng chỉ, Tin tức...).
    *   Sử dụng **100% Static Generation (ISR)** của Next.js để web load < 1 giây, miễn nhiễm DDOS.

2.  **(Học Viên) `/tai-khoan/*`**:
    *   Học viên đăng nhập bằng: **SĐT + Mã OTP** (Gửi qua Zalo/Phone) hoặc CCCD.
    *   Học viên xem: Lịch học, Lịch thi VSTEP, Video Streamming (từ R2 cực bảo mật), Điểm danh, Bài tập.
    *   *Tính năng đinh:* Nền tảng làm đề VSTEP auto-save (Chóng mất mạng, mượt hơn bản cũ).

3.  **(Giảng Viên) `/giao-vien/*`**:
    *   Giáo viên dùng: Màn hình điểm danh nhanh trên Mobile, chấm bài, up tài liệu (lưu lên R2), cấp phép xem video bài giảng.

4.  **(Quản Trị) `/admin/*`**:
    *   Trái tim hệ thống: Quản lý 30+ Bảng (Sinh viên, Lớp, Tài chính, Chứng chỉ).
    *   UI Bảng (Table) sẽ dùng `@tanstack/react-table` v8: Có Filter, Sort, Pagination siêu hạng.
    *   Tính năng: Auto Google Meet/Calendar (Tự sinh link hệt bản cũ nhưng luồng gọn hơn 50%).

## 3. 🗄️ CHIẾN LƯỢC DATABASE (D1 + DRIZZLE ORM)

Để tránh vết xe đổ "schema rỗng", chúng ta sẽ có `packages/db` với Drizzle. Tôi đã nghiên cứu 30+ bảng của Vân Trang Edu và quyết định tái cấu trúc lại Schema "Khôn ngoan" hơn:

**Cắt giảm thừa mứa:**
*   Gom `exam_registrations_platform` và `exam_registrations` thành 1 bảng chung có type flag.
*   Gom hệ thống VSTEP (bảng riêng) nhập chung vào cấu trúc Kỳ thi chuẩn, dùng JSON cột trong D1 để lưu metadata (Đỡ phải sinh 10 bảng).
*   Tính Tồn kho / Số lượng (ví dụ: Số học viên một lớp) sẽ dùng **COUNT động** (Server Components xử lý nhanh), KHÔNG lưu field tĩnh dễ bị lệch data.

## 4. 🚀 LỘ TRÌNH ĐẬP ĐI XÂY LẠI (10 PHASES)

Đây là cách một kỹ sư Senior Architect sẽ thiết kế cho bạn để code không bị rối và vỡ cấu trúc:

*   **Phase 1: Bê tông cốt thép (Infrastructure):** Setup Turborepo (Monorepo), Next.js 15, Config Cloudflare Pages, kết nối Drizzle D1.
*   **Phase 2: Áo giáp Bảo mật (Auth & Security):** Cài đặt Better-Auth, Setup guard cho 4 Role (Public, Student, Teacher, Admin), Token lưu trên Edge.
*   **Phase 3: Giao diện Chuẩn mực (Design System):** Cài đặt Tailwind v4, shadcn/ui. Thiết kế Layout Admin (Sidebar, topbar) và Storefront (SEO pages).
*   **Phase 4: Database Core & Admin Panel (Core CRUD):** Migration Học viên, Lớp học, Phân quyền. Làm UI Dashboard cho Quản trị viên (1/2).
*   **Phase 5: Lớp Học & Tự động hóa (Google Meet):** Tích hợp Google Calendar API để tạo Lớp Online, hệ thống điểm danh, Lịch học.
*   **Phase 6: Vũ Khí Bí Mật (VSTEP Exam Platform):** Setup engine làm bài thi trắc nghiệm, Auto-save (D1 cực nhanh), chấm điểm ngay lập tức.
*   **Phase 7: Cổng Học viên (Student Portal):** Nơi học sinh thao tác từ A-Z.
*   **Phase 8: Tài liệu & R2 Streaming (File System):** Quản lý Upload (Ảnh, Video từ R2), phân quyền xem tài liệu như Google Drive.
*   **Phase 9: Tài Chính & Báo Cáo:** Module thanh toán, cấp chứng chỉ PDF. Thống kê biểu đồ Admin.
*   **Phase 10: Launching & CI/CD:** Tracking lỗi, SEO metadata, Audit hiệu năng, Go live bằng lệnh `npm run deploy`.

---
*Báo cáo được biên soạn để đảm bảo Vân Trang Edu không chỉ lặp lại cái cũ, mà tiến hóa thành chuẩn mực EdTech của năm 2026 chạy 100% Free*Bổ sung chiến lược Adaptive UI vào tài liệu kiến trúc
