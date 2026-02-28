'use client'; 

export function DashboardRevenueChart() {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col relative p-4">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-foreground">Doanh Thu Học Phí Qua SePay (2026)</h3>
          <select className="bg-background border rounded px-3 py-1 text-sm text-muted-foreground shadow-sm">
             <option>Tháng này</option>
             <option>Năm 2026</option>
          </select>
       </div>
       
       <div className="flex-1 flex items-end gap-2 sm:gap-6 px-2 md:px-8 border-b pb-4 relative mt-10">
          <div className="absolute inset-x-0 bottom-[20%] border-t border-dashed border-border/50"></div>
          <div className="absolute inset-x-0 bottom-[50%] border-t border-dashed border-border/50"></div>
          <div className="absolute inset-x-0 bottom-[80%] border-t border-dashed border-border/50"></div>
          
          <div className="flex-1 flex flex-col justify-end items-center group cursor-pointer z-10">
             <div className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary/40 rounded-t-md transition-colors relative" style={{ height: '40%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">12M</span>
             </div>
             <span className="text-xs text-muted-foreground mt-2 font-medium">T.1</span>
          </div>
          <div className="flex-1 flex flex-col justify-end items-center group cursor-pointer z-10">
             <div className="w-full max-w-[40px] bg-primary/60 group-hover:bg-primary/80 rounded-t-md transition-colors relative" style={{ height: '80%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-primary">48.5M</span>
             </div>
             <span className="text-xs text-foreground font-bold mt-2">T.2</span>
          </div>
          <div className="flex-1 flex flex-col justify-end items-center group cursor-pointer z-10">
             <div className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary/40 rounded-t-md transition-colors relative" style={{ height: '10%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">5M</span>
             </div>
             <span className="text-xs text-muted-foreground mt-2 font-medium">T.3</span>
          </div>
          <div className="flex-1 flex flex-col justify-end items-center group cursor-pointer z-10">
             <div className="w-full max-w-[40px] bg-primary/10 group-hover:bg-primary/30 rounded-t-md transition-colors relative border border-dashed border-primary" style={{ height: '55%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Est.</span>
             </div>
             <span className="text-xs text-muted-foreground mt-2 font-medium">T.4</span>
          </div>
       </div>

       <div className="mt-6 flex justify-between items-center bg-muted/30 p-4 rounded-xl border">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">💰</div>
             <div>
               <p className="text-sm font-semibold text-foreground">Tổng thu qua SePay</p>
               <p className="text-xs text-muted-foreground">Tự động đối soát D1 Database</p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-lg font-bold text-foreground">65,500,000 đ</p>
             <p className="text-xs text-green-500 font-medium">+20.5% M/m</p>
          </div>
       </div>
    </div>
  );
}
