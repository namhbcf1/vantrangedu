import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { classes, classEnrollments } from './classes';
import { relations } from 'drizzle-orm';

// Quản lý Dòng tiền Học phí / Lệ phí thi
export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  studentId: text('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  enrollmentId: text('enrollment_id').references(() => classEnrollments.id), // Link tới Lớp học / Đăng ký thi
  
  amount: integer('amount').notNull(), // Số tiền (VNĐ)
  
  // method: VietQR, Chuyển khoản Tay, Tiền mặt
  method: text('method', { enum: ['sepay_qr', 'manual_transfer', 'cash', 'other'] }).notNull().default('sepay_qr'),
  
  transactionCode: text('transaction_code').unique(), // Mã giao dịch SePay / Ngân hàng thực tế
  receiptUrl: text('receipt_url'), // Link ảnh biên lai R2 (nếu đóng tay)
  
  // Trạng thái thanh toán (pending -> waiting_confirm -> completed -> refunded)
  status: text('status', { enum: ['pending', 'waiting_confirm', 'completed', 'failed', 'refunded'] }).notNull().default('pending'),
  
  // Metadata đặc thù cho Webhook SePay (Lưu cục JSON phản hồi từ SePay phòng đối soát mâu thuẫn lúc audit)
  sepayData: text('sepay_data', { mode: 'json' }).$type<{
    transferContent?: string;
    subAccount?: string;
    bankName?: string;
    webhookTime?: string;
  }>(),

  confirmedBy: text('confirmed_by').references(() => users.id), // ID Admin duyệt (nếu duyệt tay)
  
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  student: one(users, {
    fields: [payments.studentId],
    references: [users.id],
  }),
  enrollment: one(classEnrollments, {
    fields: [payments.enrollmentId],
    references: [classEnrollments.id],
  }),
}));
