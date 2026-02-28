export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb } from "@/server/db";
import { payments } from "@/server/db/schema/payments";
import { classEnrollments } from "@/server/db/schema/classes";
import { eq } from "drizzle-orm";


// BỘ TRẢM WEBHOOK SEPAY: Bắt tiền rơi tự động vào tài khoản D1
export async function POST(req: NextRequest) {
  try {
    const ctx = getRequestContext();
    if (!ctx || !ctx.env || !ctx.env.DB) {
      return NextResponse.json({ success: false, message: "Missing DB Binding" }, { status: 500 });
    }

    // 1. CHỐT CHẶN BẢO MẬT: Kiểm tra Token do anh thiết lập trên SePay
    const authHeader = req.headers.get("Authorization");
    const SEPAY_WEBHOOK_TOKEN = process.env.SEPAY_WEBHOOK_TOKEN || "VTE_SECRET_123"; 
    
    // Auth Token từ SePay truyền sang header dạng: Apikey [token]
    if (!authHeader || !authHeader.includes(SEPAY_WEBHOOK_TOKEN)) {
      console.warn("⚠️ Báo động: Có kẻ chặn bắt Webhook SePay giả mạo!");
      return NextResponse.json({ success: false, message: "Unauthorized Webhook" }, { status: 401 });
    }

    // 2. PARSE DATA TỪ SEPAY GỬI TỚI
    const body = await req.json() as any;
    
    // Cấu trúc JSON SePay: { gateway: 'MBBank', transferAmount: 2500000, content: 'VTE PAY 0123L5', referenceCode: 'MB123...' }
    const { transferAmount, content, referenceCode } = body;

    // 3. TÌM KIẾM MÃ CHUYỂN KHOẢN (Ví dụ format: VTE PAY [PAYMENT_ID])
    // Quét Text Content để móc ra Payment ID (Do hệ thống sinh ra ở QR Code)
    const paymentIdMatch = content.match(/VTEPAY([a-zA-Z0-9]+)/i);
    
    if (!paymentIdMatch) {
       console.log(`[SePay] Giao dịch ${referenceCode} không đúng cú pháp nhận diện: ${content}`);
       return NextResponse.json({ success: true, message: "Ignored: No Matching Pattern" }, { status: 200 });
    }

    const matchedPaymentId = paymentIdMatch[1]; // Mã lấy được: vd "0123L5"

    const db = createDb(ctx.env.DB);

    // 4. KIỂM TRA ĐƠN HÀNG TRONG HỆ THỐNG
    const paymentRecord = await db.select().from(payments).where(eq(payments.id, matchedPaymentId)).get();

    if (!paymentRecord) {
       return NextResponse.json({ success: true, message: "Payment Not Found in DB" }, { status: 200 });
    }

    if (paymentRecord.status === 'completed') {
       return NextResponse.json({ success: true, message: "Already Processed" }, { status: 200 });
    }

    // 5. KIỂM TRA SỐ TIỀN & CẬP NHẬT TRẠNG THÁI (The Magic)
    // Cho phép học sinh chuyển lố hoặc thiếu 1k (sai số ngân hàng), nhưng thường phải >=
    if (transferAmount >= paymentRecord.amount) {
       
       // A. Đổi trạng thái Payment -> Hoàn thành
       await db.update(payments)
         .set({ 
            status: 'completed', 
            transactionCode: referenceCode,
            sepayData: body,
            updatedAt: new Date()
         })
         .where(eq(payments.id, matchedPaymentId));

       // B. Đổi trạng thái Lớp học/Thi VSTEP của học viên -> Active (Được đi học)
       if (paymentRecord.enrollmentId) {
          await db.update(classEnrollments)
            .set({ status: 'active' })
            .where(eq(classEnrollments.id, paymentRecord.enrollmentId));
       }

       console.log(`✅ [SePay] Đã tự động duyệt học phí cho Payment ${matchedPaymentId}! Số tiền: ${transferAmount}`);
    } else {
       // C. Nếu ck thiều tiền -> Để chế độ Chờ duyệt tay (Waiting Confirm) để kế toán gọi điện báo
       await db.update(payments)
         .set({ 
            status: 'waiting_confirm', 
            sepayData: body,
            updatedAt: new Date()
         })
         .where(eq(payments.id, matchedPaymentId));
         
       console.log(`⚠️ [SePay] Học sinh ck thiếu tiền cho Payment ${matchedPaymentId}! Yêu cầu: ${paymentRecord.amount} - Thực nhận: ${transferAmount}`);
    }

    // Luôn trả 200 OK để SePay biết là Đã Nhận Được (không thôi nó bắn lại liên tục)
    return NextResponse.json({ success: true, message: "Processed Successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Lỗi Webhook SePay:", error);
    return NextResponse.json({ success: false, message: "Internal Error" }, { status: 500 });
  }
}
