import Link from 'next/link';

export function MobileAdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-card border-b shadow-sm">
        <div className="font-bold text-lg text-primary flex items-center gap-2">
          <span>🎓</span> VT Admin
        </div>
        <button className="text-sm font-medium text-destructive">Thoát</button>
      </header>

      <main className="flex-1 p-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t flex justify-around items-center px-2 z-50 pb-safe">
        <Link href="/admin" className="flex flex-col items-center justify-center w-full h-full text-primary gap-1">
          <span className="text-xl">📊</span> 
          <span className="text-[10px] font-medium">Tổng quan</span>
        </Link>
        <Link href="/admin/hoc-vien" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground gap-1">
          <span className="text-xl">👥</span>
          <span className="text-[10px] font-medium">Học viên</span>
        </Link>
        <Link href="/admin/diem-danh" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground gap-1">
          <span className="text-xl">✅</span>
          <span className="text-[10px] font-medium">Điểm danh</span>
        </Link>
      </nav>
    </div>
  );
}
