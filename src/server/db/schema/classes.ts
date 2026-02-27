import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

// Quản lý Lớp học chung (Cả Online lẫn Offline)
export const classes = sqliteTable('classes', {
  id: text('id').primaryKey(),
  
  code: text('code').unique().notNull(), // VD: VTE-IELTS-01
  name: text('name').notNull(),
  type: text('type', { enum: ['hoc', 'thi', 'tin_chi'] }).notNull(),
  
  // Offline hoặc Online được quyết định bằng cột isOnline
  isOnline: integer('is_online', { mode: 'boolean' }).notNull().default(false),
  status: text('status', { enum: ['open', 'in_progress', 'completed', 'cancelled'] }).notNull().default('open'),
  
  maxStudents: integer('max_students').notNull().default(30),
  tuitionFee: integer('tuition_fee'), // Học phí
  
  // Dates
  startDate: text('start_date'),
  endDate: text('end_date'),
  
  // Meta JSON cực kỳ quan trọng cho Google Meet, Zoom link, Lịch học, không cần đẻ thêm bảng
  settingMeta: text('setting_meta', { mode: 'json' }).$type<{
    meetLink?: string;
    calendarEventId?: string;
    scheduleRules?: string[]; // ["Monday 18:00-20:00", "Wednesday 18:00-20:00"]
    zoomMeetingId?: string;
    zoomPasscode?: string;
  }>(),

  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Quan hệ n-n Học viên đăng ký vào Lớp (Lớp Online hay Offline chung hết)
export const classEnrollments = sqliteTable('class_enrollments', {
  id: text('id').primaryKey(),
  classId: text('class_id').notNull().references(() => classes.id, { onDelete: 'cascade' }),
  studentId: text('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  status: text('status', { enum: ['pending', 'active', 'completed', 'cancelled', 'rejected'] }).notNull().default('pending'),
  
  enrolledAt: integer('enrolled_at', { mode: 'timestamp' }).notNull(),
});

// Define Quan hệ cho Drizzle queries (ví dụ: lấy mọi học viên của 1 lớp rất dễ dàng)
export const classesRelations = relations(classes, ({ many }) => ({
	enrollments: many(classEnrollments),
}));

export const usersRelations = relations(users, ({ many }) => ({
	enrollments: many(classEnrollments),
}));

export const enrollmentsRelations = relations(classEnrollments, ({ one }) => ({
	class: one(classes, {
		fields: [classEnrollments.classId],
		references: [classes.id],
	}),
	student: one(users, {
		fields: [classEnrollments.studentId],
		references: [users.id],
	}),
}));
