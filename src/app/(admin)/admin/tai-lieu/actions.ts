'use server';

import { uploadFileToR2 } from "@/server/storage/r2";
import { revalidatePath } from "next/cache";

// Server action xử lý form multipart/form-data từ giao diện
export async function uploadDocumentAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'documents';
    
    if (!file || file.size === 0) {
      return { success: false, error: "Hồ sơ rỗng." };
    }

    // Giới hạn 50MB per request (Theo luật cũ của anh)
    if (file.size > 50 * 1024 * 1024) {
      return { success: false, error: "Dung lượng vượt quá 50MB." };
    }

    // Đẩy phịch lên R2
    const result = await uploadFileToR2(file, folder);

    if (result.success) {
      // Mọi thứ hoàn hảo -> Clear cache UI File Explorer
      revalidatePath('/admin/tai-lieu');
      return { success: true, key: result.key };
    }

    return { success: false, error: result.error };

  } catch (error: any) {
    return { success: false, error: "Lỗi Server: " + error.message };
  }
}
