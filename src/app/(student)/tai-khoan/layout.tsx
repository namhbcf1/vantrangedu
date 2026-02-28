export const runtime = 'edge';
import { isMobileDevice } from '@/lib/device';
import { DesktopStudentSidebar } from '@/components/layouts/student/DesktopSidebar';
import { MobileStudentShell } from '@/components/layouts/student/MobileShell';

// CỔNG ADAPTIVE DÀNH CHO HỌC VIÊN
// Phân tách Giao diện Màn To vs Màn Nhỏ ngay trên Edge Cloudflare
export default async function StudentAdaptiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = await isMobileDevice();

  return isMobile ? (
    <MobileStudentShell>{children}</MobileStudentShell>
  ) : (
    <DesktopStudentSidebar>{children}</DesktopStudentSidebar>
  );
}
