import { SignJWT, jwtVerify } from 'jose';

// BỘ MÁY XÁC THỰC LÕI EDGE SIÊU NHẸ (DƯỚI 50KB)
// Thay thế hoàn toàn better-auth béo phì 14MB

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'vantrangedu-super-secret-key-2026-edge');

export async function createSession(userId: string, role: string, payload: any = {}) {
  const token = await new SignJWT({ sub: userId, role, ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // 30 ngày
    .sign(SECRET);
    
  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
