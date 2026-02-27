import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Gộp Admin, Teacher, Student làm 1 bảng duy nhất tối ưu hóa
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  
  // Thông tin chung
  cccd: text('cccd').unique(),
  phone: text('phone').unique(),
  email: text('email').unique(),
  
  fullName: text('full_name').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  
  // D1 Text cho Date
  dob: text('dob'), 
  gender: text('gender'),
  
  role: text('role', { enum: ['super_admin', 'admin', 'staff', 'teacher', 'student'] }).notNull().default('student'),
  
  // Security
  passwordHash: text('password_hash'), // Chỉ dùng nếu đăng nhập mật khẩu, student có thể null nếu dùng OTP
  status: text('status', { enum: ['active', 'inactive', 'banned'] }).notNull().default('active'),
  
  // Thông tin Metadata linh hoạt chứa các trường ít dùng (như avatar URL, CCCD Ảnh mạch trước sau, dân tộc, quốc tịch...) dạng JSON
  metadata: text('metadata', { mode: 'json' }).$type<{
    avatarUrl?: string;
    cccdFrontUrl?: string;
    cccdBackUrl?: string;
    ethnicity?: string;
    schoolOrWorkplace?: string;
    teacherPosition?: string; // Ví dụ: "Trưởng phòng đào tạo"
  }>(),
  
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
