import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@/server/db";

// Better-Auth config cho Cloudflare Edge
export function getAuth(d1: D1Database) {
  const db = createDb(d1);
  
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    
    // Tùy biến bảng User (vì chúng ta đã gộp table thành users custom ở Phase 02)
    user: {
      additionalFields: {
        cccd: { type: "string" },
        phone: { type: "string" },
        role: { type: "string", defaultValue: "student" },
        fullName: { type: "string" }
      }
    },
    
    emailAndPassword: {
      enabled: true, // Cho Admin/Giáo viên
      autoSignIn: false,
    },
    
    // Custom Plugin/Hook đặc thù: Học viên đăng nhập bằng (SĐT + CCCD)
    // Sẽ được chi tiết hóa trong api endpoint
  });
}
