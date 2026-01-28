import React from 'react';
import { ChevronLeft, CheckCircle2, Utensils, Droplets, Info, Send } from 'lucide-react';

const HandoverSummaryView = ({ onBack, onConfirm }) => {
  const brandColor = "#75a7a4";

  // Dữ liệu giả lập tóm tắt từ phiên làm việc hiện tại
  const summaryData = {
    patientName: "廣瀬 海 様",
    room: "205B",
    records: [
      { id: 1, label: "食事形態", value: "軟食", icon: <Utensils className="w-4 h-4" /> },
      { id: 2, label: "摂取量", value: "75% (主食)", icon: <CheckCircle2 className="w-4 h-4" /> },
      { id: 3, label: "水分摂取", value: "200ml", icon: <Droplets className="w-4 h-4" /> },
      { id: 4, label: "食事姿勢", value: "椅子座位 (90°)", icon: <Info className="w-4 h-4" /> },
    ],
    memo: "食事中の傾眠傾向なし。スムーズに摂取されました。"
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-all">
          <ChevronLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">業務申し送り確認</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Đối tượng */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">対象入居者</p>
          <p className="text-xl font-black text-slate-800">{summaryData.patientName}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{summaryData.room} 居室</p>
        </div>

        {/* Danh sách dữ liệu đã ghi */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">実施内容の要約</p>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {summaryData.records.map((item, index) => (
              <div key={item.id} className={`flex items-center justify-between p-4 ${index !== summaryData.records.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                </div>
                <span className="text-sm font-black text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ghi chú tóm tắt */}
        <div className="bg-[#f1f7f7] p-5 rounded-3xl border border-[#75a7a4]/20">
          <p className="text-[10px] font-black text-[#75a7a4] uppercase tracking-widest mb-2">特記事項 (メモ)</p>
          <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
            "{summaryData.memo}"
          </p>
        </div>
      </div>

      {/* Nút xác nhận cuối cùng */}
      <div className="p-6 bg-white border-t border-slate-100">
        <button 
          onClick={onConfirm}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-white shadow-lg active:scale-[0.98] transition-all"
          style={{ backgroundColor: brandColor }}
        >
          <Send className="w-5 h-5" />
          <span className="text-sm uppercase tracking-[0.2em]">申し送りを完了する</span>
        </button>
        <p className="text-center mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          Clicking confirm will save data to system
        </p>
      </div>
    </div>
  );
};

export default HandoverSummaryView;