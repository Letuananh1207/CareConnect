import React, { useState } from 'react';
import { 
  UtensilsCrossed, AlertCircle, Glasses, Clock, 
  Save, Volume2, Accessibility, Settings2,
  Droplets, Target, Activity
} from 'lucide-react';

const SettingsView = () => {
  const brandColor = "#75a7a4";
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="px-8 py-6 bg-white flex items-center border-b border-slate-100 shadow-sm">
        <div className="w-10 h-10 bg-[#75a7a4]/10 rounded-xl flex items-center justify-center mr-4">
          <Settings2 className="w-6 h-6 text-[#75a7a4]" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">設定</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Meal Assistance Config</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 hide-scrollbar">
        
        {/* AR Device Status */}
        <div className="mb-8 p-6 bg-white rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50/50 rounded-full -mr-10 -mt-10"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 bg-slate-900 rounded-[20px] flex items-center justify-center shadow-lg">
                <Glasses className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-[14px] font-black text-slate-800">ARグラス Gen-2</p>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">接続中</p>
            </div>
          </div>
          <button className="relative z-10 text-[10px] font-black text-[#75a7a4] bg-teal-50 px-4 py-2 rounded-xl active:scale-95 transition-transform">切替</button>
        </div>

        {/* Section 1: Expert Technique (Tacit Knowledge) */}
        <section className="space-y-4 mb-8">
          <div className="flex items-center gap-2 px-2">
            <Target className="w-4 h-4 text-[#75a7a4]" />
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">専門技術設定</h3>
          </div>
          
          <div className="bg-white rounded-[40px] p-2 border border-slate-100 shadow-sm">
            {/* Spoon Angle - Standard is 15 degrees */}
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

            {/* Hydration Target */}
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

        {/* Sync Button */}
        <div className="px-2">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full py-5 rounded-[26px] font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-teal-100 flex items-center justify-center gap-3 active:scale-95 transition-all text-white"
            style={{ backgroundColor: brandColor }}
          >
            {isSyncing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                ARグラスと同期する
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;