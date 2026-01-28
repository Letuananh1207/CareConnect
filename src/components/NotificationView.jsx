import React from 'react';
import { ChevronLeft, MessageSquare, AlertTriangle, BellRing, Utensils, Info } from 'lucide-react';

const NotificationView = ({ onBack }) => {
  const brandColor = "#75a7a4";

  // 通知リスト（日本語版）
  const notifications = [
    { 
      id: 1, 
      type: 'critical', 
      title: '食事・栄養アラート', 
      time: 'たった今', 
      desc: '205B居室（廣瀬 海 様）：直近2回の食事摂取量が50%未満に急減しています。要確認。', 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      icon: <Utensils className="w-4 h-4" />
    },
    { 
      id: 2, 
      type: 'alert', 
      title: '安全アラート', 
      time: '15分前', 
      desc: '302A居室：離床センサーが作動しました。スタッフの対応が必要です。', 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    { 
      id: 3, 
      type: 'message', 
      title: '業務申し送り', 
      time: '1時間前', 
      desc: '夜勤スタッフより：廣瀬様の服薬時、座位姿勢の保持に注意してください。', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      icon: <MessageSquare className="w-4 h-4" />
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300 font-sans">
      {/* ヘッダー (Header) */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <h2 className="text-xl font-black uppercase text-slate-800 tracking-tight">通知一覧</h2>
        </div>
        <BellRing className="w-5 h-5 text-slate-300" />
      </div>

      {/* 通知リスト (Danh sách thông báo) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`p-5 rounded-2xl border ${n.type === 'critical' ? 'border-red-100' : 'border-transparent'} ${n.bg} transition-all active:scale-[0.98] shadow-sm`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`flex items-center gap-2 font-black text-[11px] uppercase tracking-wider ${n.color}`}>
                {n.icon}
                {n.title}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{n.time}</span>
            </div>
            <p className="text-sm text-slate-700 font-bold leading-relaxed tracking-tight">
              {n.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 閉じるボタン (Nút đóng) */}
      <div className="p-6 bg-white border-t border-slate-50">
        <button 
          onClick={onBack}
          className="w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] text-white shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          style={{ backgroundColor: brandColor }}
        >
          確認して閉じる
        </button>
      </div>
    </div>
  );
};

export default NotificationView;