import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

// Bảng Session dùng cho Better-Auth để quản lý phiên đăng nhập tại Edge
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' })
});

// Bảng Account nếu gắn kết với OAuth (Google/Facebook) sau này
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(), // VD: "google", "credentials"
  userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  password: text("password") // Lưu password hash của user từ bảng user cũ chuyển sang Better-Auth convention
});

// Bảng Verification dùng cho OTP (Học sinh) và Reset Password (Admin)
export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(), // Số điện thoại / Email
    value: text("value").notNull(), // Mã OTP
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
