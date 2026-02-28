import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('vte_session')?.value;
  
  const payload = token ? await verifySession(token) : null;

  // 1. Nếu vô Public Page (Trang chủ) -> Đi qua tự do
  if (!path.startsWith("/admin") && !path.startsWith("/giao-vien") && !path.startsWith("/tai-khoan")) {
     return NextResponse.next();
  }

  // 2. Chưa đăng nhập mà đòi vào 3 Cổng Mật -> Quăng ra ngoài
  if (!payload) {
    return NextResponse.redirect(new URL("/", request.url)); 
  }

  // 3. Phân Quyền (RBAC) Cực Gắt
  const role = payload.role as string;

  if (path.startsWith("/admin") && role !== "super_admin" && role !== "admin") {
    return NextResponse.redirect(new URL("/tai-khoan", request.url));
  }
  
  if (path.startsWith("/giao-vien") && role !== "teacher" && role !== "admin" && role !== "super_admin") {
     return NextResponse.redirect(new URL("/tai-khoan", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/giao-vien/:path*', '/tai-khoan/:path*'],
};
