import { getRequestContext } from "@cloudflare/next-on-pages";

// API KẾT NỐI CLOUDFLARE R2 SIÊU TỐC - KHÔNG DÙNG THƯ VIỆN AWS NẶNG NỀ
// Sử dụng thẳng R2 Bucket Binding của Cloudflare Workers

/**
 * Tải file lên R2 Bucket
 */
export async function uploadFileToR2(
  file: File, 
  prefix: string = 'general'
): Promise<{ success: boolean; key?: string; error?: string }> {
  try {
    const ctx = getRequestContext();
    if (!ctx || !ctx.env || !ctx.env.R2) {
      console.warn("⚠️ Mock Upload R2: Môi trường Local chưa bind R2");
      return { success: true, key: `${prefix}/mock-${Date.now()}-${file.name}` };
    }

    // Chuyển File object thành mảng Byte thô để giã thẳng lên Edge
    const arrayBuffer = await file.arrayBuffer();
    
    // Tạo path lưu trữ chống trùng lặp: folder/timestamp-filename.ext
    const extension = file.name.split('.').pop();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${prefix}/${Date.now()}-${safeName}`;

    // Put Object lên R2 (Siêu nhanh, Native Binding)
    await ctx.env.R2.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
      // Lưu thêm metadata tùy chọn (ví dụ: Ai là người up)
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      }
    });

    return { success: true, key };
  } catch (error: any) {
    console.error("Lỗi Upload R2:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Lấy File (R2 Object) để trả về cho User
 */
export async function getFileFromR2(key: string) {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.R2) return null;
  return await ctx.env.R2.get(key);
}

/**
 * Xóa File khỏi R2
 */
export async function deleteFileFromR2(key: string) {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.R2) return true;
  await ctx.env.R2.delete(key);
  return true;
}
