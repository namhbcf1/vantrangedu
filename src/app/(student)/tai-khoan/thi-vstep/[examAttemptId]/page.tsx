export const runtime = "edge";
import { Suspense } from 'react';
import { isMobileDevice } from '@/lib/device';
import { getExamAttemptDetails } from './actions';
import { ExamPaperAdaptive } from './_components/exam-paper';

export default async function VStepExamHallPage({ params }: { params: Promise<{ examAttemptId: string }> }) {
  const { examAttemptId } = await params;
  const isMobile = await isMobileDevice();
  const attemptData = await getExamAttemptDetails(examAttemptId);

  if (!attemptData || !attemptData.exam.content) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 flex-col gap-4">
        <h1 className="text-2xl font-bold text-destructive">Lỗi tải đề thi</h1>
        <p className="text-muted-foreground">Không tìm thấy bài thi hoặc đề thi bị hỏng cấu trúc.</p>
      </div>
    );
  }

  const LoadingExam = () => (
    <div className="flex h-screen w-full items-center justify-center bg-background flex-col gap-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="font-medium text-muted-foreground animate-pulse mt-4">Đang bung mã đề thi VSTEP...</p>
    </div>
  );

  return (
    <Suspense fallback={<LoadingExam />}>
       <ExamPaperAdaptive attemptData={attemptData} isMobile={isMobile} />
    </Suspense>
  );
}
