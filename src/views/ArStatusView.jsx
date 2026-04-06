import React, { useState } from 'react';
import { 
  UtensilsCrossed, AlertCircle, Glasses, Clock, 
  Save, Accessibility, Settings2,
  Droplets, Target, Activity, RefreshCw
} from 'lucide-react';

const ArStatusView = () => {
  const brandColor = "#75a7a4";
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    // Giả lập quá trình đồng bộ dữ liệu lên kính
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="px-8 py-6 bg-white flex items-center border-b border-slate-100 shadow-sm shrink-0">
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-4">
          <Settings2 className="w-6 h-6 text-slate-300" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">ウェアラブルデバイス</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Wearable Device Config</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 hide-scrollbar">
        
        {/* NEW: AR Device Status & Integrated Sync Button */}
        <div className="mb-10 bg-white rounded-[40px] shadow-sm border border-slate-100 p-6 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/30 rounded-full -mr-16 -mt-16 z-0"></div>
          
          <div className="relative z-10">
            {/* Top Row: Device Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-slate-900 rounded-[24px] flex items-center justify-center shadow-lg">
                    <Glasses className={`w-7 h-7 text-white ${isSyncing ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-slate-800">ARグラス Gen-2</p>
                  <p className="text-[11px] text-emerald-600 font-black uppercase tracking-[0.1em]">接続中</p>
                </div>
              </div>
              <button className="text-[11px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl active:bg-slate-100 transition-colors">
                切替
              </button>
            </div>

            {/* Bottom Row: The Integrated Sync Button */}
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className={`w-full py-4 rounded-[22px] font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md
                ${isSyncing 
                  ? 'bg-slate-100 text-slate-400 shadow-none' 
                  : 'bg-slate-800 text-white shadow-slate-200'}`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  同期中... [ Syncing ]
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  ARグラスと同期する
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 1: Expert Technique */}
        <section className="space-y-4 mb-8">
          <div className="flex items-center gap-2 px-2">
            <Target className="w-4 h-4 text-[#75a7a4]" />
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">専門技術設定</h3>
          </div>
          <div className="bg-white rounded-[40px] p-2 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-2xl flex items-center justify-center text-[#75a7a4]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-black text-slate-700">スプーン角度</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={15} className="w-10 text-right text-[16px] font-black text-[#75a7a4] bg-transparent focus:outline-none" />
                <span className="text-[11px] font-black text-slate-300 uppercase">度</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-black text-slate-700">水分補給目標</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={200} className="w-12 text-right text-[16px] font-black text-blue-500 bg-transparent focus:outline-none" />
                <span className="text-[11px] font-black text-slate-300 uppercase">ml</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Safety Config */}
        <section className="space-y-4 mb-8">
          <div className="flex items-center gap-2 px-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">嚥下安全管理</h3>
          </div>
          <div className="bg-white rounded-[40px] p-2 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-black text-slate-700">介助ペース</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={5} className="w-10 text-right text-[16px] font-black text-[#75a7a4] bg-transparent focus:outline-none" />
                <span className="text-[11px] font-black text-slate-300 uppercase">秒</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                  <Accessibility className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-black text-slate-700">誤嚥警告角度</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={30} className="w-10 text-right text-[16px] font-black text-orange-500 bg-transparent focus:outline-none" />
                <span className="text-[11px] font-black text-slate-300 uppercase">度</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: AR Feedback Features */}
        <section className="space-y-4 mb-10">
          <div className="flex items-center gap-2 px-2">
            <Activity className="w-4 h-4 text-slate-400" />
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">AR表示・フィードバック</h3>
          </div>
          <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm">
            {[
              { label: '専門家軌跡の表示', active: true },
              { label: '咀嚼ガイド表示', active: true },
              { label: '嚥下検知アラート', active: true },
              { label: 'バイブレーション警告', active: false }
            ].map((item, idx, arr) => (
              <div key={idx} className={`p-5 flex items-center justify-between ${idx !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <span className="text-[14px] font-black text-slate-700">{item.label}</span>
                <div className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-300 ${item.active ? 'bg-[#75a7a4]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ArStatusView;