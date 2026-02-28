"use server";

import { getRequestContext } from '@cloudflare/next-on-pages';
import { createDb } from '@/server/db';
import { users } from '@/server/db/schema/users';
import { eq, desc } from 'drizzle-orm';

// Loại bỏ lỗi TypeScript khi truyền data từ Server Component xuống Client Component
// Bằng cách định nghĩa type rõ ràng cho Học Viên
export type StudentInfo = {
  id: string;
  fullName: string;
  cccd: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  createdAt: Date;
  metadata?: {
    avatarUrl?: string;
    ethnicity?: string;
    schoolOrWorkplace?: string;
  } | null;
};

// Hàm Fetch Data chạy 100% trên Server (Cloudflare D1)
export async function getStudents(): Promise<StudentInfo[]> {
  try {
    const ctx = getRequestContext();
    
    // Fallback Mock Data để dev giao diện UI khi chưa deploy thực tế chạy SQL D1
    if (!ctx || !ctx.env || !ctx.env.DB) {
      console.warn("⚠️ Chạy Mock Data vì không có kết nối D1 Local (npm run dev chưa map D1)");
      return [
        {
          id: 'vte-hs-001',
          fullName: 'Nguyễn Văn Nam',
          cccd: '001203001234',
          phone: '0987654321',
          email: 'nam.nv@vantrange.edu.vn',
          status: 'active',
          createdAt: new Date(),
          metadata: { schoolOrWorkplace: 'ĐH Bách Khoa HN' }
        },
        {
          id: 'vte-hs-002',
          fullName: 'Trần Thị Nhã',
          cccd: '088199002233',
          phone: '0912345678',
          email: 'nha.tt@gmail.com',
          status: 'active',
          createdAt: new Date(),
          metadata: { schoolOrWorkplace: 'Học viện Ngân Hàng' }
        }
      ];
    }

    const db = createDb(ctx.env.DB);

    // Truy vấn Drizzle cực đỉnh: Lấy tất cả user có role = 'student', xếp mới nhất lên đầu
    const studentsData = await db
      .select()
      .from(users)
      .where(eq(users.role, 'student'))
      .orderBy(desc(users.createdAt))
      .limit(100); // Pagination sẽ làm sau
      
    return studentsData as StudentInfo[];

  } catch (error) {
    console.error("Lỗi lấy danh sách học viên:", error);
    return []; // Trả về mảng rỗng nếu lỗi để UI không bị sập
  }
}
