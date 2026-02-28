import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "./lib/auth";

// Quay lại chuẩn middleware.ts cũ an toàn trên Cloudflare Pages thay vì proxy.ts (Báo lỗi config segment)

export async function middleware(request: NextRequest) {
  const ctx = getRequestContext();
   if (!ctx || !ctx.env || !ctx.env.DB) {
    return NextResponse.next();
  }

  const auth = getAuth(ctx.env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  
  const path = request.nextUrl.pathname;

  if (!session) {
    if (path.startsWith("/admin") || path.startsWith("/giao-vien") || path.startsWith("/tai-khoan")) {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
    return NextResponse.next();
  }

  const role = session.user.role || 'student';

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
