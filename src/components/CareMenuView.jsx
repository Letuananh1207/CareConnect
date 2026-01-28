import React from 'react';
import { ScanEye, ClipboardEdit, UserCircle, ChevronLeft, SendHorizontal } from 'lucide-react';

const CareMenuView = ({ onBack, onOpenRecord, onOpenChart, onOpenHandover }) => {
  const brandColor = "#75a7a4";

  // 介護業務メニュー (Danh sách nghiệp vụ hộ lý)
  const menuItems = [
    { 
      id: 'ar', 
      title: "食事介助 (AR)", 
      desc: "姿勢サポート鏡", 
      icon: <ScanEye className="w-10 h-10" />,
      action: () => alert("AR接続中...") 
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
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans animate-in fade-in duration-300">
      
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

      {/* 申し送りボタン (Nút bàn giao nằm ngoài lưới) */}
      <div className="px-6 py-4 bg-white border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button 
          onClick={onOpenHandover}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-white shadow-lg active:scale-[0.98] transition-all cursor-pointer overflow-hidden relative group"
          style={{ backgroundColor: brandColor }}
        >
          <SendHorizontal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[13px] uppercase tracking-widest">業務申し送り</span>
            <span className="text-[9px] font-bold text-teal-100/80 mt-1 uppercase">データを保存して退室する</span>
          </div>
        </button>
      </div>

      {/* フッター (Footer) */}
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