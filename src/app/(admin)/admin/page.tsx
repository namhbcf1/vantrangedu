export const runtime = "edge";
import { DashboardRevenueChart } from './_components/recharts-dashboard';

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Tổng Học Viên</h3>
        <p className="text-2xl font-bold mt-2">1,248</p>
        <p className="text-xs text-green-500 mt-1">+12% so với tháng trước</p>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Lớp Đang Mở</h3>
        <p className="text-2xl font-bold mt-2">34</p>
        <p className="text-xs text-muted-foreground mt-1">4 lớp Online Google Meet</p>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Đang Thi VSTEP</h3>
        <p className="text-2xl font-bold mt-2">156</p>
        <p className="text-xs text-red-500 mt-1">Hệ thống Auto-save đang hoạt động</p>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Doanh Thu Học Phí</h3>
        <p className="text-2xl font-bold mt-2">65.5M</p>
        <p className="text-xs text-green-500 mt-1">Hệ thống VietQR Live</p>
      </div>
      
      <div className="md:col-span-2 lg:col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm pt-4 mt-4 h-[420px] flex flex-col">
         <DashboardRevenueChart />
      </div>
    </div>
  );
}
