export const runtime = "edge";
import Link from 'next/link';

// TRANG CHỦ BÀN HỌC (DASHBOARD) - Nhẹ mượt, Gọi Action Fetch Database sau
export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Lời Chào Thân Thiện */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Chào buổi sáng, Nam! 👋</h1>
        <p className="text-sm text-muted-foreground">Hôm nay là Thứ Năm, 28/02/2026. Chúc bạn một ngày học tập hiệu quả.</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* --- CỘT TRÁI (HOẶC PHẦN TRÊN MOBILE): LỚP HỌC & LỊCH TRÌNH --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           
           {/* Card Cảnh Báo "ĐANG DIỄN RA" Rất To */}
           <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="flex justify-between items-start mb-4 relative z-10">
               <div>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400 mb-2 border border-red-200 dark:border-red-800/50 blink-effect">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                    Sắp diễn ra (Trong 30 phút)
                  </span>
                  <h2 className="text-xl font-bold text-primary">Lớp Luyện Thi IELTS Cấp Tốc - Ca Tối</h2>
                  <p className="text-sm text-muted-foreground mt-1">Giảng viên: Cô Trần Vân Trang</p>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                <div className="flex items-center gap-2 text-sm bg-background border px-3 py-2 rounded-lg">
                   <span className="text-muted-foreground text-lg">🕒</span>
                   <span className="font-medium">18:00 - 20:30</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-background border px-3 py-2 rounded-lg">
                   <span className="text-muted-foreground text-lg">🎥</span>
                   <span className="font-medium">Online (Google Meet)</span>
                </div>
             </div>
             
             <button className="w-full relative z-10 group flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-all active:scale-[0.98]">
               <span>Tham gia Lớp Học</span>
               <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
           </div>

           {/* Lịch học các ngày tới (Dạng Vuốt Ngang Trên Mobile) */}
           <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <h3 className="font-bold">Lịch trình sắp tới</h3>
                 <Link href="/tai-khoan/lop-hoc" className="text-sm text-primary font-medium hover:underline">Xem tất cả</Link>
              </div>
              
              <div className="flex flex-nowrap md:grid md:grid-cols-2 gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                 {/* Card Nhỏ Lịch 1 */}
                 <div className="min-w-[240px] md:min-w-0 p-4 rounded-xl border bg-card shrink-0 shadow-sm flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg w-14 shrink-0 text-center">
                       <span className="text-xs font-medium text-muted-foreground uppercase">T.6</span>
                       <span className="text-xl font-bold text-foreground">01</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-semibold text-sm truncate">Luyện Đề VSTEP - B2</h4>
                       <p className="text-xs text-muted-foreground mt-1">19:00 - Offline Phòng 302</p>
                    </div>
                 </div>
                 
                 {/* Card Nhỏ Lịch 2 */}
                 <div className="min-w-[240px] md:min-w-0 p-4 rounded-xl border bg-card shrink-0 shadow-sm flex items-start gap-4 opacity-70">
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-lg w-14 shrink-0 text-center">
                       <span className="text-xs font-medium text-muted-foreground uppercase">C.N</span>
                       <span className="text-xl font-bold text-foreground">03</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-semibold text-sm truncate">IELTS Writing Task 1</h4>
                       <p className="text-xs text-muted-foreground mt-1">08:00 - Workshop Zoom</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- CỘT PHẢI (HOẶC PHẦN DƯỚI MOBILE): VSTEP & TÀI LIỆU --- */}
        <div className="flex flex-col gap-6 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
           
           {/* Section VSTEP Resume (Auto-save) */}
           <div className="flex flex-col gap-3">
              <h3 className="font-bold flex items-center gap-2">
                 <span>📝</span> Làm tiếp VSTEP
              </h3>
              <div className="p-4 rounded-xl border bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-background shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500"></div>
                 <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Đề Thi Thử VSTEP Tháng 2/2026</h4>
                 <div className="flex justify-between items-end mt-4">
                    <div className="flex flex-col">
                       <span className="text-xs text-muted-foreground mb-1">Tiến độ (Auto-saved)</span>
                       <span className="text-sm font-semibold">Đã làm: 42/150 câu</span>
                    </div>
                    <button className="h-8 px-4 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                       Làm Tiếp →
                    </button>
                 </div>
                 {/* Thanh Progress */}
                 <div className="w-full bg-indigo-100 dark:bg-indigo-950 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full w-[28%]"></div>
                 </div>
              </div>
           </div>

           {/* Section Bài Giảng Video Gần Đây (R2) */}
           <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <h3 className="font-bold flex items-center gap-2"><span>🎥</span> Video Bài Giảng (R2 Stream)</h3>
              </div>
              
              <div className="space-y-3">
                 {[1, 2].map(i => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                       <div className="w-24 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center border">
                          <span className="text-2xl opacity-50 group-hover:scale-110 transition-transform">▶️</span>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">45:20</div>
                       </div>
                       <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">Giải đề IELTS Reading {i}</h4>
                          <p className="text-xs text-muted-foreground mt-1 truncate">Lớp IELTS Cấp Tốc</p>
                       </div>
                    </div>
                 ))}
                 
                 <Link href="/tai-khoan/tai-lieu" className="w-full py-2 flex items-center justify-center text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors border border-primary/10">
                    Xem toàn bộ 12 Video →
                 </Link>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
