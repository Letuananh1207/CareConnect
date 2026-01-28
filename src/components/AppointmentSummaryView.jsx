import React from 'react';
import { Clock, MapPin, CalendarDays, X } from 'lucide-react';

const AppointmentSummaryView = ({ appointment, onBack }) => {
  const brandColor = "#75a7a4";

  // コンテキスト情報 (Thông tin bối cảnh)
  const contextInfo = {
    patientName: "廣瀬 海",
    nickname: "海さん",
    age: 76,
    gender: "男性",
    avatarUrl: "/patient_man.jpg", 
    roomType: "個室 (スタンダード)",
  };

  return (
    <div className="px-6 pt-8 pb-10 animate-in slide-in-from-bottom duration-500 bg-white min-h-full font-sans flex flex-col">
      
      {/* ヘッダー (Header) */}
      <div className="flex items-center justify-between mb-10">
        <div className="p-2 bg-slate-50 rounded-lg">
          <CalendarDays className="w-5 h-5 text-slate-400" />
        </div>
        <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">
          スケジュールの詳細
        </h2>
        <button 
          onClick={onBack} 
          className="p-2 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* メイン情報: 写真と名前 (Thông tin trọng tâm) */}
      <div className="flex-1 space-y-12">
        
        {/* セクション 1: 入居者プロフィール */}
        <section className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-slate-200 mx-auto">
              <img 
                src={contextInfo.avatarUrl} 
                alt={contextInfo.patientName} 
                className="w-full h-full object-cover grayscale-[0.1]"
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              ケア対象者
            </p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {contextInfo.patientName} 様
            </h3>
            <p className="text-sm font-bold text-slate-400 italic">
              「{contextInfo.nickname}」 • {contextInfo.age}歳
            </p>
          </div>
        </section>

        {/* セクション 2: 場所と時間 */}
        <section className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl border border-slate-50 bg-slate-50/50">
            <MapPin className="w-4 h-4 mb-3" style={{ color: brandColor }} />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
              場所
            </p>
            <p className="text-lg font-black text-slate-800">
              {appointment.room} 居室
            </p>
            <p className="text-[10px] font-bold text-slate-400">
              {contextInfo.roomType}
            </p>
          </div>
          
          <div className="p-5 rounded-3xl border border-slate-50 bg-slate-50/50">
            <Clock className="w-4 h-4 mb-3" style={{ color: brandColor }} />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
              訪問時間
            </p>
            <p className="text-lg font-black text-slate-800">
              {appointment.time}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              早番 / 午前
            </p>
          </div>
        </section>
      </div>

      {/* フッターボタン (Footer Button) */}
      <div className="mt-10 pt-6 border-t border-slate-50">
        <button 
          onClick={onBack}
          className="w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] text-white shadow-lg shadow-slate-200 active:scale-[0.98] transition-all cursor-pointer"
          style={{ backgroundColor: brandColor }}
        >
          情報を確認しました
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummaryView;