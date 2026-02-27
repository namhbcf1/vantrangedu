import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { classes } from './classes';

// Gộp Kỳ thi thường và VSTEP. Đề thi VSTEP Cực kỳ phức tạp sẽ được gói làm JSON
export const exams = sqliteTable('exams', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type', { enum: ['vstep', 'toeic', 'ielts', 'midterm', 'final'] }).notNull(),
  
  durationMinutes: integer('duration_minutes').notNull().default(120),
  passScore: integer('pass_score'),

  // "Vũ khí bí mật": Chứa toàn bộ cây cấu trúc Đề thi (Sections -> Groups -> Questions) bằng chuỗi JSON.
  // Dễ dàng trả cho Frontend xử lý thay vì join 5-7 bảng của SQLite rất chậm.
  content: text('content', { mode: 'json' }).$type<{
    sections: Array<{
      id: string;
      title: string; // "Reading", "Listening"
      order: number;
      groups: Array<{
        id: string;
        passageText?: string;
        audioUrl?: string; // Lấy từ R2
        questions: Array<{
          id: string;
          text: string;
          options?: { a: string, b: string, c: string, d: string };
          correctAnswer: string;
          type: 'multiple_choice' | 'essay';
          score: number;
        }>
      }>
    }>
  }>(),

  status: text('status', { enum: ['draft', 'published', 'archived'] }).notNull().default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Bảng Attempts: Lưu bài làm thi của học viên, tính cả auto-save
export const examAttempts = sqliteTable('exam_attempts', {
  id: text('id').primaryKey(),
  examId: text('exam_id').notNull().references(() => exams.id, { onDelete: 'cascade' }),
  studentId: text('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Lưu cục đáp án học sinh làm bài vào JSON auto-save liên tục ở Frontend đẩy lên
  studentAnswers: text('student_answers', { mode: 'json' }).$type<Record<string, string>>(), // VD: { "q_1": "a", "q_2": "c" }
  
  score: integer('score'), // Chấm đểm Server-side
  status: text('status', { enum: ['in_progress', 'submitted', 'graded'] }).notNull().default('in_progress'),

  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
});
