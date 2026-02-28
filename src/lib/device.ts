import { headers } from 'next/headers';

/**
 * Trạm Dò Thiết Bị (Device Detection Server-Side)
 * - Đọc User-Agent trực tiếp từ request trước khi render HTML
 * - Chạy SIÊU NHANH trên Cloudflare Edge
 * - Không gây giật hình (FOUC - Flash of Unstyled Content) như JS Client (window.innerWidth)
 */
export async function isMobileDevice() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';

  // Nhận diện Điện thoại & Tablet một cách mạnh mẽ (Bao gồm rác mác thiết bị phổ thông)
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  return mobileRegex.test(userAgent);
}
