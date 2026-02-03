import React from 'react';
import { ChevronRight, Clock, User, CheckCircle2 } from 'lucide-react';

const HandoverHistoryView = () => {
  const historyData = [
    { id: 1, time: "2026/02/03 15:30", receiver: "Sato Miho", patientCount: 8, status: "Hoàn thành" },
    { id: 2, time: "2026/02/02 17:00", receiver: "Tanaka Ken", patientCount: 12, status: "Hoàn thành" },
    { id: 3, time: "2026/02/01 08:30", receiver: "Sato Miho", patientCount: 10, status: "Hoàn thành" },
  ];

  return (
    <div className="h-full bg-slate-50 flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-[22px] font-black text-slate-800">Lịch sử bàn giao</h2>
        <p className="text-[12px] text-slate-400 font-bold uppercase tracking-wider">Handover Logs</p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto pb-20">
        {historyData.map((item) => (
          <div 
            key={item.id}
            className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-95 transition-all"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#75a7a4]" />
                <span className="text-[13px] font-black text-slate-700">{item.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500">{item.receiver}</span>
                </div>
                <div className="flex items-center gap-1 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  <CheckCircle2 className="w-3 h-3 text-[#75a7a4]" />
                  <span className="text-[10px] font-black text-[#75a7a4] uppercase">{item.status}</span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#75a7a4] transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandoverHistoryView;