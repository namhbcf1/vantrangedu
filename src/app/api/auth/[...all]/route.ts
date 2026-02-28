import { getAuth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Chạy 100% trên Cloudflare Edge !

export async function GET(req: NextRequest) {
  // Trích xuất D1 Database binding từ context của Cloudflare
  const ctx = getRequestContext();
  const auth = getAuth(ctx.env.DB);
  return auth.handler(req);
}

export async function POST(req: NextRequest) {
  const ctx = getRequestContext();
  const auth = getAuth(ctx.env.DB);
  return auth.handler(req);
}
