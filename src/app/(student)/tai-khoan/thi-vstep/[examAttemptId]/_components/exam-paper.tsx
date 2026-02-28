'use client';

import { useState, useTransition, useCallback } from 'react';
import { ExamAttemptDetail, saveAnswerAuto } from '../actions';
import { ExamTimer } from './exam-timer';

export function ExamPaperAdaptive({ attemptData, isMobile }: { attemptData: ExamAttemptDetail, isMobile: boolean }) {
  const exam = attemptData.exam;
  const sections = exam.content?.sections || [];
  
  const [activeSection, setActiveSection] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(attemptData.studentAnswers || {});
  const [isPending, startTransition] = useTransition();

  const handleSelectAnswer = useCallback((qId: string, answerStr: string) => {
    setLocalAnswers(prev => ({ ...prev, [qId]: answerStr }));
    
    startTransition(() => {
      saveAnswerAuto(attemptData.id, qId, answerStr).catch(console.error);
    });
  }, [attemptData.id]);

  const currentSec = sections[activeSection];
  if (!currentSec) return <div>Lỗi cấu trúc đề thi.</div>;

  const handleTimeUp = () => {
    alert("⏳ HẾT GIỜ LÀM BÀI! Hệ thống đang thu bài tự động...");
  };

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <header className="sticky top-0 z-20 flex flex-col px-4 py-2 bg-card border-b shadow-sm">
           <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-base truncate pr-2 text-primary">{exam.title}</h1>
              <ExamTimer startTime={attemptData.startedAt} durationMinutes={exam.durationMinutes} onTimeUp={handleTimeUp} />
           </div>
           <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
              {sections.map((sec, idx) => (
                <button key={sec.id} onClick={() => setActiveSection(idx)}
                  className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-full transition-colors ${activeSection === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {sec.title}
                </button>
              ))}
           </div>
        </header>

        <main className="flex-1 p-4 space-y-6">
           {currentSec.groups.map((group) => (
             <div key={group.id} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                {group.passageText && (
                  <div className="p-4 bg-yellow-50/50 dark:bg-yellow-900/10 border-b max-h-[250px] overflow-y-auto text-sm leading-relaxed prose dark:prose-invert">
                    {group.passageText}
                  </div>
                )}
                
                <div className="p-4 space-y-6">
                  {group.questions.map((q, qIdx) => (
                     <div key={q.id} className="space-y-3">
                        <p className="font-medium text-sm"><span className="text-primary mr-1">Q{qIdx+1}.</span> {q.text}</p>
                        {q.type === 'multiple_choice' && q.options && (
                          <div className="grid grid-cols-1 gap-2">
                             {['a', 'b', 'c', 'd'].map((optKey) => {
                               const text = q.options![optKey as keyof typeof q.options];
                               const isSelected = localAnswers[q.id] === optKey;
                               return (
                                 <button key={optKey} onClick={() => handleSelectAnswer(q.id, optKey)}
                                  className={`flex items-start text-left p-3 rounded-lg border text-sm transition-all active:scale-[0.98] ${isSelected ? 'border-primary ring-1 ring-primary bg-primary/10 font-medium' : 'bg-background hover:bg-muted'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-3 text-xs border ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-input font-medium'}`}>
                                      {optKey.toUpperCase()}
                                    </span>
                                    {text}
                                 </button>
                               )
                             })}
                          </div>
                        )}
                     </div>
                  ))}
                </div>
             </div>
           ))}
        </main>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t z-20">
           <button className="w-full h-11 bg-primary text-primary-foreground font-bold rounded-lg shadow-md">
             NỘP BÀI (Auto-saved {isPending && "..."})
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <header className="flex items-center justify-between px-6 h-16 bg-card border-b shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl text-primary flex items-center gap-2"><span>🎓</span> VSTEP Exam</div>
          <div className="w-px h-6 bg-border mx-2"></div>
          <h1 className="font-semibold text-lg text-muted-foreground">{exam.title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-sm font-medium text-muted-foreground">{isPending ? "Đang lưu..." : "Đã lưu tự động ✓"}</div>
           <ExamTimer startTime={attemptData.startedAt} durationMinutes={exam.durationMinutes} onTimeUp={handleTimeUp} />
           <button className="h-10 px-6 bg-primary text-primary-foreground font-bold rounded-md shadow hover:bg-primary/90 transition-colors">
             NỘP BÀI
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
         <aside className="w-64 border-r bg-card p-4 flex flex-col gap-2 shrink-0">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Phần thi</h3>
            {sections.map((sec, idx) => (
              <button key={sec.id} onClick={() => setActiveSection(idx)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${activeSection === idx ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}>
                {sec.title}
                <div className={`w-2 h-2 rounded-full ${activeSection === idx ? 'bg-primary-foreground/50' : 'bg-transparent'}`}></div>
              </button>
            ))}
         </aside>

         <main className="flex-1 flex overflow-hidden">
            {currentSec.groups[0]?.passageText && (
              <div className="w-1/2 border-r bg-white dark:bg-slate-900 p-8 overflow-y-auto">
                 <h2 className="text-xl font-bold mb-6 pb-2 border-b">Reading Passage</h2>
                 <div className="prose dark:prose-invert max-w-none text-base leading-loose text-justify font-serif whitespace-pre-line">
                   {currentSec.groups[0].passageText}
                 </div>
              </div>
            )}

            <div className={`flex-1 bg-slate-50/50 dark:bg-slate-950/50 p-8 overflow-y-auto ${!currentSec.groups[0]?.passageText ? 'w-full' : 'w-1/2'}`}>
               <h2 className="text-xl font-bold mb-6 pl-2 border-l-4 border-primary">Questions</h2>
               
               <div className="space-y-8 max-w-3xl mx-auto">
                 {currentSec.groups.map(group => (
                   <div key={group.id} className="space-y-6">
                     {group.passageText && sections[activeSection].groups.length > 1 && (
                       <div className="p-4 bg-card border rounded-lg text-sm mb-4">
                         {group.passageText}
                       </div>
                     )}

                     {group.questions.map((q, qIdx) => (
                       <div key={q.id} className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                          <p className="font-semibold text-base mb-4"><span className="text-primary mr-2 bg-primary/10 px-2 py-1 rounded">Question {qIdx+1}</span> {q.text}</p>
                          
                          {q.type === 'multiple_choice' && q.options && (
                            <div className="grid grid-cols-1 gap-3">
                               {['a', 'b', 'c', 'd'].map((optKey) => {
                                 const text = q.options![optKey as keyof typeof q.options];
                                 const isSelected = localAnswers[q.id] === optKey;
                                 return (
                                   <label key={optKey} 
                                    className={`flex items-center cursor-pointer p-3 rounded-lg border transition-all ${isSelected ? 'border-primary ring-1 ring-primary bg-primary/5' : 'bg-background hover:bg-muted/50'}`}>
                                      <input type="radio" name={q.id} value={optKey} checked={isSelected} onChange={() => handleSelectAnswer(q.id, optKey)} className="hidden" />
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mr-4 border transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-input bg-background'}`}>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>}
                                      </div>
                                      <span className={isSelected ? 'font-medium' : ''}><span className="font-bold mr-2 uppercase">{optKey}.</span>{text}</span>
                                   </label>
                                 )
                               })}
                            </div>
                          )}
                       </div>
                     ))}
                   </div>
                 ))}
               </div>
            </div>
         </main>
      </div>
    </div>
  );
}
