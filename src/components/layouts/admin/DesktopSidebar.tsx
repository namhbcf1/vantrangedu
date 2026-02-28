import Link from 'next/link';

export function DesktopSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="w-64 border-r bg-card text-card-foreground p-4 hidden md:flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-2 mb-8 px-2 font-bold text-xl text-primary">
          <span className="text-2xl">🎓</span> Vân Trang Admin
        </div>
        
        <nav className="flex flex-col gap-1 w-full">
          <Link href="/admin" className="px-3 py-2 rounded-md bg-accent text-accent-foreground font-medium">Bảng điều khiển</Link>
          <Link href="/admin/hoc-vien" className="px-3 py-2 rounded-md hover:bg-muted text-muted-foreground transition-colors">Quản lý Học viên</Link>
          <Link href="/admin/lop-hoc" className="px-3 py-2 rounded-md hover:bg-muted text-muted-foreground transition-colors">Lớp học & Lịch</Link>
          <Link href="/admin/vstep" className="px-3 py-2 rounded-md hover:bg-muted text-muted-foreground transition-colors">Đề thi VSTEP</Link>
        </nav>
        
        <div className="mt-auto px-2 py-4 border-t">
          <div className="text-sm font-medium">Nguyễn Admin</div>
          <div className="text-xs text-muted-foreground">Quản trị viên Hệ thống</div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto w-full">
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <h1 className="text-2xl font-semibold tracking-tight">Tổng Quan Hệ Thống</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">28 Tháng 2, 2026</span>
            <button className="h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium shadow hover:bg-primary/90">
              Đăng xuất
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
