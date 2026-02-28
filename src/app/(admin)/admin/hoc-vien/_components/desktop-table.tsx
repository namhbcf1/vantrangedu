'use client'; // Client Component vì có thể chứa tương tác Sort/Filter sau này

import { StudentInfo } from '../actions';

// BẢNG QUẢN TRỊ DÀNH CHO MÀN HÌNH MÁY TÍNH (PC/LAPTOP)
export function DesktopStudentTable({ data }: { data: StudentInfo[] }) {
  return (
    <div className="rounded-md border bg-card">
      <div className="p-4 border-b flex justify-between items-center bg-muted/50">
        <h2 className="text-lg font-semibold">Danh sách Học Viên (Desktop View)</h2>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Tìm theo Tên, CCCD, SĐT..." 
            className="flex h-9 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
          />
          <button className="h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium shadow hover:bg-primary/90">
            + Thêm Học Viên
          </button>
        </div>
      </div>
      
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b bg-muted/30">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Học Viên</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">CCCD / Phone</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Đơn vị công tác</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Trạng thái</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Hành động</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {data.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-muted-foreground">Chưa có dữ liệu học viên.</td></tr>
            ) : (
              data.map((student) => (
                <tr key={student.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-mono text-xs text-muted-foreground">{student.id.substring(0,8)}...</td>
                  <td className="p-4 align-middle">
                    <div className="font-medium">{student.fullName}</div>
                    <div className="text-xs text-muted-foreground">{student.email || 'Chưa cập nhật email'}</div>
                  </td>
                  <td className="p-4 align-middle">
                     <div className="font-mono text-xs">{student.cccd || 'N/A'}</div>
                     <div className="text-xs text-blue-600 dark:text-blue-400">{student.phone || 'N/A'}</div>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">
                    {student.metadata?.schoolOrWorkplace || '---'}
                  </td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right gap-2 flex justify-end">
                    <button className="text-xs font-medium text-blue-600 hover:underline">Sửa</button>
                    <button className="text-xs font-medium text-destructive hover:underline">Xoá</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
         <div className="text-xs text-muted-foreground flex-1">Hiển thị {data.length} dòng.</div>
         <button className="h-8 px-3 text-xs border rounded-md hover:bg-muted">Trước</button>
         <button className="h-8 px-3 text-xs border rounded-md hover:bg-muted">Tiếp theo</button>
      </div>
    </div>
  );
}
