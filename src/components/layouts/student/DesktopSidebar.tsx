import Link from 'next/link';

// [PC PORTAL CỦA HỌC VIÊN] 
// Không gian Rộng, Học Online trên Website, Thi VSTEP màn to
export function DesktopStudentSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      {/* Sidebar Học Tập */}
      <aside className="w-64 border-r bg-card text-card-foreground p-4 hidden md:flex flex-col gap-2 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2 mb-8 px-2 font-bold text-xl text-primary mt-2">
          <span className="text-2xl">🎓</span> Vân Trang Edu
        </div>
        
        <div className="mb-6 px-3">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                N
              </div>
              <div>
                 <p className="text-sm font-semibold">Nguyễn Văn Nam</p>
                 <p className="text-xs text-muted-foreground">ID: vte-hs-001</p>
              </div>
           </div>
        </div>

        <nav className="flex flex-col gap-1 w-full flex-1">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3 mt-4">Học Tập</h4>
          <Link href="/tai-khoan" className="px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium flex items-center gap-3">
            <span>🏠</span> Bàn Học Tổng Quan
          </Link>
          <Link href="/tai-khoan/lop-hoc" className="px-3 py-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-3">
            <span>📆</span> Lớp & Lịch Học
          </Link>
          <Link href="/tai-khoan/tai-lieu" className="px-3 py-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-3">
            <span>🎒</span> Video & Tài Liệu (R2)
          </Link>
          
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3 mt-6">Khảo Thí</h4>
          <Link href="/tai-khoan/thi-vstep" className="px-3 py-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3"><span>📝</span> Hệ thống VSTEP</div>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">LIVE</span>
          </Link>
          <Link href="/tai-khoan/chung-chi" className="px-3 py-2.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex items-center gap-3">
            <span>🏆</span> Chứng Chỉ
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t">
          <button className="w-full px-3 py-2 flex items-center gap-3 text-destructive hover:bg-destructive/10 rounded-lg text-sm font-medium transition-colors">
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Không Gian Làm Bài/Xem Video */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar PC mỏng manh */}
        <header className="sticky top-0 z-10 hidden md:flex h-14 bg-card/80 backdrop-blur-md border-b items-center justify-end px-8">
           <div className="flex items-center gap-4 text-sm">
             <span className="text-muted-foreground">Hỗ trợ Học vụ: 0987.654.321</span>
             <button className="relative p-2 text-muted-foreground hover:text-foreground">
                🔔
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
             </button>
           </div>
        </header>
        
        <div className="p-8 max-w-6xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
