export const runtime = 'edge';
import { isMobileDevice } from '@/lib/device';
import { DesktopSidebar } from '@/components/layouts/admin/DesktopSidebar';
import { MobileAdminShell } from '@/components/layouts/admin/MobileShell';

export default async function AdminAdaptiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = await isMobileDevice();

  return isMobile ? (
    <MobileAdminShell>{children}</MobileAdminShell>
  ) : (
    <DesktopSidebar>{children}</DesktopSidebar>
  );
}
