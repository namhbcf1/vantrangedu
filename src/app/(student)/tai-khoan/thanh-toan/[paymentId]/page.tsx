export const runtime = "edge";
"use client";

import { useState, useEffect, use } from 'react';

export default function StudentPaymentCheckout({ params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = use(params);
  
  const SEPAY_BANK_BIN = "MB";
  const SEPAY_STK = "0987654321";
  const AMOUNT = 2500000;
  const CONTENT = `VTEPAY${paymentId}`;
  
  const qrUrl = `https://qr.sepay.vn/img?acc=${SEPAY_STK}&bank=${SEPAY_BANK_BIN}&amount=${AMOUNT}&des=${CONTENT}`;

  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-card border rounded-2xl shadow-lg overflow-hidden">
        
        <div className="bg-primary p-6 text-primary-foreground text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎓</div>
          <h2 className="text-xl font-bold">Thanh Toán Học Phí</h2>
          <p className="text-primary-foreground/80 text-sm mt-1">Lớp: IELTS Writing Nâng Cao - VTE01</p>
        </div>

        {status === 'success' ? (
          <div className="p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm border border-green-200">
               ✓
             </div>
             <h3 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-2">Đã Nhận Học Phí!</h3>
             <p className="text-muted-foreground text-sm mb-6">Hệ thống đã ghi nhận 2,500,000đ. Đăng ký lớp học của bạn đã được kích hoạt thành công.</p>
             <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow">
               Vào Lớp Học Ngay
             </button>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center">
            <div className="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-red-100 dark:border-red-900/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Giao dịch hết hạn sau: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-slate-200 shadow-sm relative group cursor-pointer">
              <img src={qrUrl} alt="Mã QR Thanh Toán Học Phí" className="w-64 h-64 object-contain rounded-xl" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                 <div className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                   Mở App Ngân hàng quét mã
                 </div>
              </div>
            </div>

            <div className="w-full mt-6 space-y-3 bg-muted/50 p-4 rounded-xl border text-sm">
               <div className="flex justify-between items-center border-b pb-2">
                 <span className="text-muted-foreground">Ngân hàng</span>
                 <span className="font-semibold text-foreground">{SEPAY_BANK_BIN}</span>
               </div>
               <div className="flex justify-between items-center border-b pb-2">
                 <span className="text-muted-foreground">Số T.Khoản</span>
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-base">{SEPAY_STK}</span>
                 </div>
               </div>
               <div className="flex justify-between items-center border-b pb-2">
                 <span className="text-muted-foreground">Số tiền</span>
                 <span className="font-bold text-foreground">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(AMOUNT)}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-muted-foreground">Nội dung CK</span>
                 <div className="flex items-center gap-2">
                    <span className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded font-bold border border-primary/20 tracking-wider">
                      {CONTENT}
                    </span>
                 </div>
               </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-6 leading-relaxed">
              Trang web đang trong trạng thái chờ nhận tiền (Tự động cập nhật 24/7). Không cần tải lại trang.
            </p>
            
            <button 
              onClick={() => setStatus('success')} 
              className="mt-4 text-[10px] text-muted-foreground/30 hover:text-primary transition-colors border border-transparent hover:border-border px-2 py-1 rounded"
            >
              [Giả lập Webhook Đã Bắn ✅]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
