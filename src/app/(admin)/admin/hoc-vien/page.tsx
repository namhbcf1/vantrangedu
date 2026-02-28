export const runtime = "edge";
import { Suspense } from 'react';
import { isMobileDevice } from '@/lib/device';
import { getStudents } from './actions';
import { DesktopStudentTable } from './_components/desktop-table';
import { MobileStudentList } from './_components/mobile-list';

// TRANG QUẢN LÝ HỌC VIÊN: Trái tim của Server Component kết hợp Adaptive UI
export default async function StudentsPage() {
  // 1. Phân luồng thiết bị ngay trên Server Edge (Chớp mắt)
  const isMobile = await isMobileDevice();
  
  // 2. Lấy dữ liệu 100% Type-Safe từ D1 (Drizzle ORM) qua Server Action
  const students = await getStudents();

  // Khung xương (Skeleton) để Loading ảo mượt mà (Học viên cảm thấy Web ko bị đơ)
  const LoadingSkeleton = () => (
    <div className="w-full h-64 rounded-xl border bg-card animate-pulse flex items-center justify-center text-muted-foreground">
      Đang tải dữ liệu Mạng lưới Vân Trang Edu...
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tiêu đề trang (Desktop thấy to, Mobile thấy gọn gàng) */}
      {!isMobile && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Quản Lý Học Viên</h1>
          <p className="text-sm text-muted-foreground">Hệ thống Tra cứu và Dữ liệu Căn Cước</p>
        </div>
      )}

      {/* 
        3. Phép thuật Adaptive UI xuất hiện tại đây:
        Dữ liệu (students) chỉ được đẩy vào đúng Bảng PC hoặc Thẻ Mobile.
        Môi trường PC tuyệt đối KHÔNG TẢI GÌ của Mobile và ngược lại.
      */}
      <Suspense fallback={<LoadingSkeleton />}>
        {isMobile ? (
          <MobileStudentList data={students} />
        ) : (
          <DesktopStudentTable data={students} />
        )}
      </Suspense>
    </div>
  );
}
