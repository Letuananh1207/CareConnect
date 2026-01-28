import React, { useState, useEffect } from 'react';
import { ScanEye, ClipboardEdit, UserCircle, ChevronLeft, SendHorizontal, QrCode, Loader2, X } from 'lucide-react';

const CareMenuView = ({ onBack, onOpenRecord, onOpenChart, onOpenHandover }) => {
  const brandColor = "#75a7a4";
  const [showARModal, setShowARModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Logic đếm ngược cho mã QR
  useEffect(() => {
    let timer;
    if (showARModal && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleCloseModal();
    }
    return () => clearInterval(timer);
  }, [showARModal, timeLeft]);

  const handleOpenAR = () => {
    setTimeLeft(60);
    setShowARModal(true);
  };

  const handleCloseModal = () => {
    setShowARModal(false);
  };

  const menuItems = [
    { 
      id: 'ar', 
      title: "食事介助 (AR)", 
      desc: "姿勢サポート鏡", 
      icon: <ScanEye className="w-10 h-10" />,
      action: handleOpenAR 
    },
    { 
      id: 'record', 
      title: "介護記録", 
      desc: "食事・排泄・水分", 
      icon: <ClipboardEdit className="w-10 h-10" />,
      action: onOpenRecord 
    },
    { 
      id: 'profile', 
      title: "利用者情報", 
      desc: "基本情報・グラフ", 
      icon: <UserCircle className="w-10 h-10" />,
      action: onOpenChart 
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans animate-in fade-in duration-500 relative">
      
      {/* ヘッダー (Header) */}
      <div className="px-6 py-2 bg-white flex items-center justify-between border-b-2 border-slate-600 shadow-sm">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 hover:bg-slate-50 active:scale-95 rounded-xl transition-all border border-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div className="text-center">
          <h2 className="text-[17px] font-black text-slate-600 uppercase tracking-tighter">介護業務メニュー</h2>
          <p className="text-[11px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">205B居室 • 廣瀬 海 様</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* メニューグリッド (Grid menu) */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-5">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={item.action}
              className="group flex flex-col items-center justify-center aspect-square rounded-[24px] 
                         bg-white border-2 border-slate-100 hover:border-slate-400 
                         cursor-pointer shadow-lg shadow-slate-200/50
                         active:scale-95 transition-all duration-300"
            >
              <div className="mb-4 text-slate-600 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-black text-[14px] text-slate-600 text-center leading-tight uppercase px-2">
                {item.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-2 font-bold px-3 text-center leading-tight">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* AR QR Code Modal Overlay với hiệu ứng mượt mà */}
      {showARModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center sm:items-center p-4">
          {/* Lớp nền tối mờ fade-in */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={handleCloseModal}
          ></div>
          
          {/* Hộp thoại trượt từ dưới lên và zoom nhẹ */}
          <div className="bg-white w-full max-w-sm rounded-[40px] p-8 flex flex-col items-center shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 ease-out">
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 text-center">
              <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">ARグラス連携</h3>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">AR Glasses Pairing</p>
            </div>

            {/* Giả lập QR Code */}
            <div className="relative p-4 bg-white border-4 border-slate-50 rounded-3xl mb-6 shadow-inner">
              <QrCode className="w-44 h-44 text-slate-800" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-50">
                   <ScanEye className="w-5 h-5" style={{ color: brandColor }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 bg-teal-50/50 px-6 py-2.5 rounded-full border border-teal-100/50">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-500" />
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider">デバイス待機中...</span>
            </div>

            <div className="w-full text-center">
              <p className="text-[9px] text-slate-400 font-black uppercase mb-1">有効期限</p>
              <div className="text-3xl font-black text-slate-800 tabular-nums">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 font-bold text-center leading-relaxed px-4">
              ARグラスでスキャンして、<br/>
              <span style={{ color: brandColor }}>「廣瀬 海 様」</span>の介助を開始
            </p>
          </div>
        </div>
      )}

      {/* 申し送りボタン */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <button 
          onClick={onOpenHandover}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-white shadow-lg active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
          style={{ backgroundColor: brandColor }}
        >
          <SendHorizontal className="w-5 h-5" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[13px] uppercase tracking-widest">業務申し送り</span>
            <span className="text-[9px] font-bold text-teal-100/80 mt-1 uppercase">データを保存して退室する</span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="px-8 pb-4 pt-2 bg-white flex justify-between items-center">
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">CareConnect</span>
        <div className="flex items-center gap-2">
           <div className="h-1 w-1 rounded-full bg-slate-300"></div>
           <span className="text-[9px] font-black text-slate-400 uppercase">スタッフ: 上原 小原</span>
        </div>
      </div>
    </div>
  );
};

export default CareMenuView;