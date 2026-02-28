'use client'; // Client Component vì có touch/scroll events

import { StudentInfo } from '../actions';

// DANH SÁCH VUỐT DÀNH CHO MÀN HÌNH ĐIỆN THOẠI (MOBILE/TABLET NHỎ)
export function MobileStudentList({ data }: { data: StudentInfo[] }) {
  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* Search Bar Mobile bám dính */}
      <div className="sticky top-[56px] z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-2 px-1 -mx-2">
        <input 
          type="text" 
          placeholder="🔍 Tìm tên, SĐT học viên..." 
          className="flex h-10 w-full rounded-full border border-input bg-card px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
        />
      </div>

      <div className="flex justify-between items-center mb-1 mt-2">
        <h2 className="text-sm font-semibold text-muted-foreground">Hồ sơ học viên ({data.length})</h2>
        <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          + Thêm mới
        </button>
      </div>

      {data.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border">
           Không tìm thấy học viên nào.
        </div>
      ) : (
        data.map((student) => (
          <div key={student.id} className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-3 relative overflow-hidden active:scale-[0.98] transition-transform">
            {/* Thanh trạng thái màu nhỏ bên mép trái */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
            
            <div className="flex items-start gap-3 pl-2">
              {/* Avatar giả lập (hoặc lấy từ metadata) */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary font-bold text-lg">
                {student.fullName.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base truncate pr-8">{student.fullName}</h3>
                <p className="text-xs text-muted-foreground truncate">{student.metadata?.schoolOrWorkplace || 'Chưa cập nhật đơn vị'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border font-mono tracking-tighter">
                    {student.cccd || 'NO-CCCD'}
                  </span>
                </div>
              </div>
            </div>

            {/* Khối Action Nút to dễ bấm bằng ngón tay cái */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t">
              <a 
                href={`tel:${student.phone}`}
                className="flex items-center justify-center gap-2 h-9 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-medium text-sm border border-green-200 dark:border-green-900"
              >
                📞 Gọi điện
              </a>
              <button className="flex items-center justify-center gap-2 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 font-medium text-sm border border-blue-200 dark:border-blue-900">
                💬 Nhắn Zalo
              </button>
            </div>
            
            {/* Nút 3 chấm menu ở góc phải trên */}
            <button className="absolute top-4 right-3 text-muted-foreground p-1">
               ⋮
            </button>
          </div>
        ))
      )}
    </div>
  );
}
