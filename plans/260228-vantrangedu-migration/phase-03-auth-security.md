# Phase 3: Core Security, Authentication & Guard System

**Mục tiêu:** Xây dựng hệ thống đăng nhập, bảo mật đường dẫn nội bộ thay thế `auth.js` cũ. Tận dụng Edge Middleware.

## Công Việc Coding

1. **Bcrypt & Mật khẩu:**
   - Vì Serverless/Edge chạy V8 khó dùng C++ pure bcrypt, cài đặt `bcryptjs` hoặc dùng Web Crypto API. Viết service `src/lib/services/hash.service.ts`.

2. **JWT Generation & Verification (Jose):**
   - Cài đặt thư viện `jose` (siêu tương thích Edge runtime của CF Workers).
   - `src/lib/services/jwt.service.ts`: Hàm `signToken` và `verifyToken`.
   - Tokens sẽ được ném vào Cookie (Set-Cookie: HttpOnly, Secure). Không ném về JSON body để ngăn chặn XSS.

3. **Route Đăng Nhập / Đăng ký:**
   - Server Action: `login(formData: FormData)` và `register(...)` trong `src/lib/actions/auth.actions.ts`.
   - UI: Tạo `/login` với Shadcn Form (Zod Validation) với giao diện VantrangEdu xịn xò.

4. **Middleware Bảo vệ mạnh (RBAC):**
   - Viết `src/middleware.ts` bắt buộc:
     - Chặn các paths `/admin/*` nếu cookie chưa có token hoặc role < `admin`.
     - Chặn các paths `/tai-khoan/*` nếu chưa login (dành cho `student` / `teacher`).
     - Tự động check hết hạn token chặn về `/login`.

5. **Server Context Fetcher:**
   - Utility `getAuthSession()`: Helper chuyên dùng cho React Server Components để get nhanh User ID (Từ Drizzle) mà không cần viết lại logic lấy cookie. 

## Tiêu chí Nghiệm Thu
- Cố tình vào link `/admin/classes` lúc ẩn danh sẽ bị văng ra `/login` trong 1 mili-giây.
- Đăng nhập bằng phone + password sinh ra cookie. Dữ liệu session hiển thị trọn vẹn ở Navbar.
