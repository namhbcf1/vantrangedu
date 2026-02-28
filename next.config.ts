import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform().catch(console.error);
}

const nextConfig = {
  reactStrictMode: true,
  // Cấu hình CHUNKING BẼ GÃY GIỚI HẠN 3MB CLOUDFLARE
  experimental: {
     serverComponentsExternalPackages: ['drizzle-orm', 'better-sqlite3']
  }
};

export default nextConfig;
