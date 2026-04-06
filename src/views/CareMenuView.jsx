import React, { useState, useEffect } from 'react';
import { 
  ScanEye, UserCircle, ChevronLeft, SendHorizontal, 
  QrCode, Loader2, X, HeartPulse, Fingerprint, ClipboardCheck,
  Clock, Activity, AlertTriangle, ShieldCheck
} from 'lucide-react';
// 1. Import hook từ context
import { useAR } from '../context/ARContext'; 

const CareMenuView = ({ onBack, onOpenRecord, onOpenChart, onOpenHandover }) => {
  const brandColor = "#75a7a4";
  const { stage } = useAR(); 
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [careMinutes, setCareMinutes] = useState(0);

  // Kiểm tra xem đã qua bước xác thực chưa
  const isAuthorized = stage === 'ready' || stage === 'feeding' || stage === 'not_connecting';

  useEffect(() => {
    const careTimer = setInterval(() => {
      setCareMinutes(prev => prev + 1);
    }, 60000);
    return () => clearInterval(careTimer);
  }, []);

  const handleBackRequest = () => setShowBackConfirm(true);

  const menuItems = [
    { 
      id: 'profile', 
      title: "利用者情報", 
      desc: "基本情報・グラフ", 
      icon: <UserCircle className="w-9 h-9" />,
      action: onOpenChart 
    },
    { 
      id: 'record', 
      title: "ケア記録", 
      desc: "バイタル・食事", 
      icon: <ClipboardCheck className="w-9 h-9" />,
      action: onOpenRecord 
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FBFDFF] font-sans animate-in fade-in duration-500 relative overflow-hidden">
      
      {/* Header */}
      <div className="py-6 px-6 pb-5 bg-white flex items-center justify-between border-b border-slate-50 shadow-sm relative z-20">
        <button 
          onClick={handleBackRequest} 
          className="p-2.5 -ml-2 hover:bg-slate-50 active:scale-90 rounded-[18px] transition-all border border-slate-100 text-slate-400"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-[15px] font-[900] text-slate-800 uppercase tracking-tighter">介助ヘルプメニュー</h2>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAuthorized ? 'bg-teal-400' : 'bg-amber-400'}`}></div>
            <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${isAuthorized ? 'text-teal-500' : 'text-amber-500'}`}>
              {isAuthorized ? 'Care in Progress' : 'System Authenticating'}
            </p>
          </div>
        </div>
        <div className="w-11"></div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto hide-scrollbar">
        {!isAuthorized ? (
          /* LOADING STATE: Khi đang quét QR hoặc Face ID */
          <div className="h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#75a7a4]/10 animate-ping"></div>
              <div className="relative w-24 h-24 rounded-full border-4 border-slate-100 border-t-[#75a7a4] animate-spin flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-[#75a7a4]/40 animate-pulse" />
              </div>
            </div>
            <h3 className="text-[18px] font-black text-slate-700 tracking-tighter mb-2">利用者認証中</h3>
            <p className="text-[12px] text-slate-400 font-bold text-center leading-relaxed max-w-[200px]">
              ARデバイスで患者を<br/>確認しています...
            </p>
          </div>
        ) : (
          /* MAIN CONTENT: Hiện khi stage là 'ready' HOẶC 'feeding' */
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* PATIENT PROFILE CARD */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-[#75a7a4]" />
                  <h3 className="text-[11px] font-[900] text-slate-400 uppercase tracking-[0.2em]">Patient Profile</h3>
                </div>
                <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded-md">
                    <span className="w-1 h-1 bg-teal-500 rounded-full"></span>
                    <span className="text-[8px] font-black text-teal-600 uppercase">
                        {stage === 'feeding' ? 'Active Session' : 'Verified'}
                    </span>
                </div>
              </div>
              
              <div className="bg-white rounded-[40px] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/40 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10 flex items-center gap-5">
                  <div className="w-[72px] h-[72px] p-1 bg-white rounded-[24px] shadow-sm border border-slate-100 shrink-0">
                    <div className="w-full h-full rounded-[20px] overflow-hidden bg-slate-50 relative">
                      <img src="/patient_man.webp" alt="Patient" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-[22px] font-[900] text-slate-800 tracking-tight">廣瀬 海</h4>
                      <span className="text-[13px] font-bold text-slate-400">様</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-500 border border-slate-100">76歳 / 男性</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-50">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                      <HeartPulse className={`w-4 h-4 text-rose-400 ${stage === 'feeding' ? 'animate-[pulse_0.5s_infinite]' : 'animate-pulse'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">既往歴 / 基礎疾患</p>
                      <p className="text-[12px] font-bold text-slate-600 leading-[1.6]">
                        高血圧症、軽度認知症、嚥下障害あり。<br/>
                        左側に軽い麻痺があるため介助が必要です。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-5 mb-10">
              {menuItems.map((item, index) => (
                <button 
                  key={item.id}
                  onClick={item.action}
                  className="group flex flex-col items-center justify-center aspect-square rounded-[35px] bg-white border border-slate-100 hover:border-[#75a7a4]/50 hover:scale-[1.05] transition-all duration-300 shadow-sm"
                >
                  <div className="mb-4 p-4 rounded-[24px] bg-slate-50 text-slate-400 group-hover:text-[#75a7a4] group-hover:bg-teal-50 transition-all">
                    {React.cloneElement(item.icon, { strokeWidth: 1.5 })}
                  </div>
                  <h3 className="font-black text-[14px] text-slate-700 text-center leading-tight group-hover:text-[#75a7a4]">
                    {item.title}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-1.5 font-bold uppercase tracking-tighter">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer - Hiện cho cả ready và feeding */}
      {isAuthorized && (
        <div className="px-6 py-5 bg-white border-t border-slate-50 animate-in slide-in-from-bottom-full duration-500">
          <button 
            onClick={onOpenHandover}
            className="w-full flex items-center justify-center gap-4 py-5 rounded-[26px] font-[900] text-white shadow-xl active:scale-[0.97] transition-all"
            style={{ backgroundColor: brandColor }}
          >
            <SendHorizontal className="w-5 h-5" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[14px] uppercase tracking-widest">業務申し送り</span>
              <span className="text-[9px] font-bold text-teal-50/70 mt-1 uppercase">Save Data & Room Out</span>
            </div>
          </button>
        </div>
      )}

      {/* BACK CONFIRMATION MODAL */}
      {showBackConfirm && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"></div>
          <div className="bg-white w-full max-w-[320px] rounded-[40px] p-8 flex flex-col items-center shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-[900] text-slate-800 mb-2 text-center tracking-tighter">終了しますか？</h3>
            <p className="text-[12px] text-slate-400 font-bold mb-8 text-center leading-relaxed">
              記録が完了していません。<br/>メニューを閉じてもよろしいですか？
            </p>
            <div className="flex flex-col w-full gap-3">
              <button onClick={onBack} className="w-full py-4 rounded-2xl bg-rose-500 text-white text-[14px] font-black uppercase tracking-widest">終了する</button>
              <button onClick={() => setShowBackConfirm(false)} className="w-full py-4 rounded-2xl bg-slate-100 text-slate-500 text-[14px] font-black uppercase tracking-widest">キャンセル</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CareMenuView;