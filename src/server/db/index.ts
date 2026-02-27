import { drizzle } from 'drizzle-orm/d1';

// Import toàn bộ schema để sử dụng type-safe
import * as users from './schema/users';
import * as classes from './schema/classes';
import * as exams from './schema/exams';

const schema = {
  ...users,
  ...classes,
  ...exams
};

// Khởi tạo connection Drizzle dùng cho Cloudflare Pages/Workers (môi trường Edge)
// Trong Next.js 15, D1 Database Binding sẽ được inject thông qua process.env hoặc getRequestContext()
export function createDb(d1: D1Database) {
  return drizzle(d1, { schema });
}
