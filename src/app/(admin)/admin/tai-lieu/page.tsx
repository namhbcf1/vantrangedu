'use client';

import { useState } from 'react';
import { uploadDocumentAction } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-2.5 rounded-md font-semibold text-white transition-all ${pending ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-sm'}`}
    >
      {pending ? 'Đang đẩy lên Vệ Tinh R2 🚀...' : '⬆️ Tải tài liệu lên'}
    </button>
  );
}

export default function DocumentManagerPage() {
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleAction(formData: FormData) {
    setMsg(null);
    const res = await uploadDocumentAction(formData);
    if (res.success) {
      setMsg({ type: 'success', text: `Tải lên thành công! ID Băng từ: ${res.key}` });
      // Lệnh reload lại danh sách file sẽ nằm ở đây
    } else {
      setMsg({ type: 'error', text: res.error || 'Thất bại.' });
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Vùng Quản lý Tải Lên (Dropzone) */}
      <div className="w-full md:w-1/3 p-6 bg-card border rounded-xl shadow-sm">
         <h2 className="text-xl font-bold mb-4">Kho Tài Liệu & Video Bài Giảng</h2>
         <p className="text-sm text-muted-foreground mb-6">Tải lên Giáo trình PDF, Video bài chữa VSTEP. Hệ thống Stream thẳng từ Cloudflare Edge.</p>
         
         <form action={handleAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loại thư mục</label>
              <select name="folder" className="w-full h-10 border rounded-md px-3 bg-background">
                 <option value="class-videos">Video Lớp Học</option>
                 <option value="pdf-materials">Tài liệu ôn thi VSTEP</option>
                 <option value="student-cccd">Ảnh CCCD Học Viên</option>
                 <option value="public">Tài nguyên công khai (Logo, Hình ảnh)</option>
              </select>
            </div>
            
            <div className="border-2 border-dashed border-input rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
               <input type="file" name="file" className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 mb-4" required />
               <p className="text-xs text-muted-foreground">Tối đa 50MB. Hỗ trợ MP4, PDF, JPG, PNG.</p>
            </div>

            <SubmitButton />
         </form>

         {msg && (
           <div className={`mt-4 p-3 rounded-md text-sm font-medium ${msg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
             {msg.text}
           </div>
         )}
      </div>

      {/* Vùng File Explorer hiển thị danh sách (Mock UI chờ DB) */}
      <div className="w-full md:w-2/3 p-6 bg-card border rounded-xl shadow-sm">
         <h2 className="text-xl font-bold mb-4">Các Tập Tin Gần Đây (Data Center R2)</h2>
         <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{i===1 ? '🎥' : '📄'}</span>
                   <div>
                     <p className="font-medium text-sm">bai-giang-vstep-writing-task1-0{i}.mp4</p>
                     <p className="text-xs text-muted-foreground">class-videos/ • 24MB • 2 phút trước</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <button className="text-xs px-3 py-1.5 bg-background border rounded hover:bg-muted">Copy Link (Bảo Mật)</button>
                   <button className="text-xs px-3 py-1.5 text-destructive border border-destructive/20 rounded hover:bg-destructive/10">Xóa</button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
