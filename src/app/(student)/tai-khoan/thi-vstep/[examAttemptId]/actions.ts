'use server';

import { getRequestContext } from '@cloudflare/next-on-pages';
import { createDb } from '@/server/db';
import { examAttempts, exams } from '@/server/db/schema/exams';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Type chuẩn cho Đề thi JSON (Vũ khí bí mật)
export type QuestionType = { id: string; text: string; options?: { a: string, b: string, c: string, d: string }; type: 'multiple_choice' | 'essay'; score: number; };
export type GroupType = { id: string; passageText?: string; audioUrl?: string; questions: QuestionType[] };
export type SectionType = { id: string; title: string; order: number; groups: GroupType[] };
export type ExamContent = { sections: SectionType[] };

export type ExamAttemptDetail = {
  id: string;
  examId: string;
  studentId: string;
  studentAnswers: Record<string, string> | null;
  status: string;
  startedAt: Date;
  submittedAt: Date | null;
  exam: {
    title: string;
    durationMinutes: number;
    content: ExamContent | null;
  };
};

export async function getExamAttemptDetails(attemptId: string): Promise<ExamAttemptDetail | null> {
  const ctx = getRequestContext();
  
  if (!ctx || !ctx.env || !ctx.env.DB) {
     // Mock Data cho UI Development (VSTEP B1-B2-C1 Reading)
     return {
       id: attemptId,
       examId: 'exam-001',
       studentId: 'hs-001',
       studentAnswers: { 'q1': 'b' }, // Học sinh đã làm dở câu 1 chọn B
       status: 'in_progress',
       startedAt: new Date(Date.now() - 15 * 60000), // Đã bắt đầu 15 phút trước
       submittedAt: null,
       exam: {
         title: 'Đề thi thử VSTEP Tháng 3/2026',
         durationMinutes: 60,
         content: {
            sections: [
              {
                id: 'sec-read-1', title: 'Part 1: Reading Comprehension', order: 1,
                groups: [
                  {
                    id: 'grp-1', 
                    passageText: "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere. The term is frequently used interchangeably with the term climate change...",
                    questions: [
                      { id: 'q1', text: 'What is the primary cause of global warming mentioned in the text?', options: { a: 'Volcanic eruptions', b: 'Fossil fuel burning', c: 'Solar radiation', d: 'Deforestation' }, type: 'multiple_choice', score: 10 },
                      { id: 'q2', text: 'When was the pre-industrial period?', options: { a: '1750-1800', b: '1850-1900', c: '1900-1950', d: '2000-2020' }, type: 'multiple_choice', score: 10 }
                    ]
                  }
                ]
              }
            ]
         }
       }
     };
  }

  const db = createDb(ctx.env.DB);

  // Join DB thần tốc: Lấy Lần làm bài + Đề thi gốc
  const attemptData = await db
    .select({
      id: examAttempts.id,
      examId: examAttempts.examId,
      studentId: examAttempts.studentId,
      studentAnswers: examAttempts.studentAnswers,
      status: examAttempts.status,
      startedAt: examAttempts.startedAt,
      submittedAt: examAttempts.submittedAt,
      exam: {
        title: exams.title,
        durationMinutes: exams.durationMinutes,
        content: exams.content
      }
    })
    .from(examAttempts)
    .innerJoin(exams, eq(examAttempts.examId, exams.id))
    .where(eq(examAttempts.id, attemptId))
    .get();

  return attemptData as ExamAttemptDetail | null;
}

// 🚀 AUTO-SAVE ACTION: Bắn ngầm từ Client lên mỗi khi học sinh click A,B,C,D
export async function saveAnswerAuto(attemptId: string, questionId: string, answer: string) {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) {
     console.log(`[Mock Auto-Save] Đã lưu câu ${questionId}: Chọn ${answer}`);
     return { success: true };
  }

  const db = createDb(ctx.env.DB);
  
  // 1. Kéo mảng JSON đáp án cũ ra
  const currentAttempt = await db.select({ studentAnswers: examAttempts.studentAnswers })
    .from(examAttempts)
    .where(eq(examAttempts.id, attemptId))
    .get();
    
  // 2. Trộn đáp án mới vào
  const newAnswers = { ...(currentAttempt?.studentAnswers || {}), [questionId]: answer };
  
  // 3. Update đè lại mảng JSON (Cực kì nhanh với D1)
  await db.update(examAttempts)
    .set({ studentAnswers: newAnswers })
    .where(eq(examAttempts.id, attemptId));
    
  return { success: true };
}
