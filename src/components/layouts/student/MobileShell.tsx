import Link from 'next/link';

// [MOBILE PORTAL CỦA HỌC VIÊN] 
// Giao diện Vuốt mượt mà, Bottom Tab to, ưu tiên các hành động Học/Thi
export function MobileStudentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Header xinh xắn gọn gàng */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-card border-b shadow-sm">
        <div className="font-bold text-lg text-primary flex items-center gap-2">
          <span>📚</span> Không Gian Học Tập
        </div>
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
             N
           </div>
        </div>
      </header>

      {/* Vùng Nội Dung Vuốt Được */}
      <main className="flex-1 p-4 space-y-4">
        {children}
      </main>

      {/* Điều Hướng Dưới Đáy Màn Hình - 4 Nút Rõ Ràng */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t flex justify-around items-center px-1 z-50 pb-safe shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.1)]">
        <Link href="/tai-khoan" className="flex flex-col items-center justify-center w-full h-full text-primary gap-1">
          <span className="text-xl">🏠</span> 
          <span className="text-[10px] font-medium">Bàn học</span>
        </Link>
        <Link href="/tai-khoan/lop-hoc" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground gap-1">
          <span className="text-xl">📆</span>
          <span className="text-[10px] font-medium">Lớp của tôi</span>
        </Link>
        <Link href="/tai-khoan/thi-vstep" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground gap-1">
          <span className="text-xl relative">
             📝
             <span className="absolute -top-1 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
             </span>
          </span>
          <span className="text-[10px] font-medium">Thi VSTEP</span>
        </Link>
        <Link href="/tai-khoan/tai-lieu" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground gap-1">
          <span className="text-xl">🎒</span>
          <span className="text-[10px] font-medium">Tài liệu</span>
        </Link>
      </nav>
    </div>
  );
}
