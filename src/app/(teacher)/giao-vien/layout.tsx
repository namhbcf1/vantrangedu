// SẼ CODE CỔNG GIÁO VIÊN BẰNG COMPONENTS ADAPTIVE TƯƠNG TỰ SAU KHI XONG STUDENT
import { isMobileDevice } from '@/lib/device';

export default async function TeacherAdaptiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = await isMobileDevice();

  // Route gốc phân trang Giáo viên - Tương tự Logic của Student
  return (
    <div className="flex min-h-screen items-center justify-center bg-accent text-accent-foreground font-bold p-8 text-center text-2xl flex-col gap-4">
      <span className="text-4xl">👨‍🏫</span>
      BẢNG LẬP TRÌNH CỔNG GIÁO VIÊN ONDEMAND
      <p className="text-sm font-normal text-muted-foreground max-w-md mx-auto">
        (Sẽ chia Sidebar PC và Menu Bottom Tab Điểm Danh Mobile tương tự Học viên theo lệnh của Tướng quân)
      </p>
    </div>
  );
}
