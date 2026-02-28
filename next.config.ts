import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup local dev environment cho Cloudflare (chạy D1, R2 dưới local được)
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform().catch(console.error);
}

const nextConfig = {
  reactStrictMode: true,
  // Bảo vệ môi trường Edge, tuân thủ Cloudflare
  experimental: {
     // config mở rộng nếu cần
  }
};

export default nextConfig;
