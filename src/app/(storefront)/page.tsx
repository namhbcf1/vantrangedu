export const runtime = 'edge';
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-background">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl text-center md:text-6xl font-bold tracking-tight text-primary">
          Vân Trang Edu <span className="text-blue-600">v2.0</span>
        </h1>
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
          Hệ thống đào tạo và thi trực tuyến thế hệ mới. Đang bảo trì và nâng cấp kiến trúc Cloudflare.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mt-12">
          {/* Card cho Học viên */}
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🎓 Cổng Học Viên</h2>
            <p className="text-muted-foreground mb-4">Tra cứu lịch học, làm bài tập, thi VSTEP trực tuyến.</p>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer w-full">
              Đăng nhập (OTP / CCCD)
            </div>
          </div>
          
          {/* Card cho Giáo viên/Admin */}
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">👨‍🏫 Quản Trị Hệ Thống</h2>
            <p className="text-muted-foreground mb-4">Quản lý lớp học, điểm danh, phát chứng chỉ, báo cáo.</p>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer w-full">
              Khu vực Nội bộ
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
