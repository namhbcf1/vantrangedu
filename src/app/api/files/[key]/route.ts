export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";
import { getFileFromR2 } from "@/server/storage/r2";
import { getAuth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);

  const ctx = getRequestContext();
  if (ctx && ctx.env && ctx.env.DB) {
     const auth = getAuth(ctx.env.DB);
     const session = await auth.api.getSession({ headers: request.headers });
     
     if (!session && !decodedKey.startsWith("public/")) {
        return new NextResponse("Unauthorized. Cần đăng nhập để xem tài liệu.", { status: 401 });
     }
  }

  const object = await getFileFromR2(decodedKey);

  if (object === null) {
    return new NextResponse("File không tồn tại (404)", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers as any);
  headers.set("etag", object.httpEtag);

  const range = request.headers.get("Range");
  if (range && object.size > 0) {
     return new NextResponse(object.body as any, {
       status: 206,
       headers,
     });
  }

  return new NextResponse(object.body as any, {
    status: 200,
    headers,
  });
}
