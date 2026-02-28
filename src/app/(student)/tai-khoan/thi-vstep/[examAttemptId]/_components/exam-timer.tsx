'use client';

import { useState, useEffect } from 'react';

// Đồng hồ Đếm ngược (Nối thẳng với DB Date để chống rớt mạng/F5 ăn gian giờ)
export function ExamTimer({ startTime, durationMinutes, onTimeUp }: { startTime: Date, durationMinutes: number, onTimeUp: () => void }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Tính toán thời gian kết thúc dựa vào DB, bỏ qua mốc thời gian ảo của PC
    const endTime = new Date(startTime).getTime() + durationMinutes * 60000;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;
      
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        onTimeUp(); // Hết giờ -> Bắn hàm Submit bài tự động
      } else {
        setTimeLeft(Math.floor(distance / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, durationMinutes, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Nếu còn < 5 phút -> Chớp đỏ
  const isDanger = timeLeft > 0 && timeLeft < 300;

  return (
    <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg border shadow-sm transition-colors ${isDanger ? 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse' : 'bg-card text-card-foreground'}`}>
      <span>⏱</span>
      <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}
