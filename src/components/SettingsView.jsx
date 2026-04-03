import React, { useState } from 'react';
import { 
  UtensilsCrossed, AlertCircle, Glasses, Clock, 
  Save, Volume2, Accessibility, Settings2,
  Droplets, Target, Activity, Layout, Bell, Globe, Send
} from 'lucide-react';

const SettingsView = () => {
  const brandColor = "#75a7a4";
  const [activeTab, setActiveTab] = useState('app'); // 'app' hoặc 'ar'
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <div className="px-8 py-6 bg-white flex items-center border-b border-slate-100 shadow-sm shrink-0">
        <div className="w-10 h-10 bg-[#75a7a4]/10 rounded-xl flex items-center justify-center mr-4 text-[#75a7a4]">
          <Settings2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">設定</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">System Configuration</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar flex flex-col">
        
        {/* 2. Segmented Control Tabs - Nằm trên vùng xám */}
        <div className="mb-8 p-1 bg-slate-200/50 rounded-[20px] flex items-center gap-1 shrink-0">
          <button 
            onClick={() => setActiveTab('app')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[12px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'app' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <Layout className="w-4 h-4" />
            アプリ設定
          </button>
          <button 
            onClick={() => setActiveTab('ar')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[12px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'ar' ? 'bg-white text-[#75a7a4] shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <Glasses className="w-4 h-4" />
            ARアシスト
          </button>
        </div>

        {/* 3. Content Area */}
        <div className="flex-1">
          {activeTab === 'app' ? (
            /* ================= TAB 1: APP SETTINGS (Đã lược bỏ bảo mật) ================= */
            <div className="animate-in fade-in slide-in-from-left-2 duration-400 space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2 px-2 text-slate-400">
                  <Bell className="w-4 h-4" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em]">通知と基本設定</h3>
                </div>
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
                  <div className="p-5 flex items-center justify-between">
                    <span className="text-[14px] font-black text-slate-700">プッシュ通知</span>
                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 transition-all">
                      <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <span className="text-[14px] font-black text-slate-700">言語設定</span>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-[12px] font-bold">日本語</span>
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            /* ================= TAB 2: AR SETTINGS ================= */
            <div className="animate-in fade-in slide-in-from-right-2 duration-400 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-2 text-[#75a7a4]">
                  <Target className="w-4 h-4" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em]">介助パラメータ設定</h3>
                </div>
                <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between p-5 border-b border-slate-50 text-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-50 rounded-2xl flex items-center justify-center text-[#75a7a4]"><UtensilsCrossed className="w-5 h-5" /></div>
                      <span className="text-[14px] font-black">スプーン角度</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input type="number" defaultValue={15} className="w-10 text-right text-[16px] font-black text-[#75a7a4] bg-transparent outline-none" />
                      <span className="text-[11px] font-black text-slate-300 uppercase">度</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 text-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><Droplets className="w-5 h-5" /></div>
                      <span className="text-[14px] font-black">水分補給目標</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" defaultValue={200} className="w-12 text-right text-[16px] font-black text-blue-500 bg-transparent outline-none" />
                      <span className="text-[11px] font-black text-slate-300 uppercase">ml</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 px-2 text-[#75a7a4]">
                  <Activity className="w-4 h-4" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em]">AR表示オプション</h3>
                </div>
                <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                  {[
                    { label: '専門家軌跡の表示', active: true, icon: <Target className="w-4 h-4"/> },
                    { label: '咀嚼ガイド表示', active: true, icon: <Activity className="w-4 h-4"/> },
                    { label: '嚥下検知アラート', active: true, icon: <AlertCircle className="w-4 h-4"/> }
                  ].map((item, idx, arr) => (
                    <div key={idx} className={`p-5 flex items-center justify-between ${idx !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className="text-slate-300">{item.icon}</div>
                        <span className="text-[14px] font-black">{item.label}</span>
                      </div>
                      <div className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-300 ${item.active ? 'bg-[#75a7a4]' : 'bg-slate-200'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* 4. Dynamic Action Button */}
        <div className="mt-auto pt-10 mb-6">
          <button 
            onClick={handleAction}
            disabled={isProcessing}
            className={`w-full py-5 rounded-[26px] font-black text-[13px] text-white uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all
              ${activeTab === 'app' ? 'bg-slate-800 shadow-slate-200' : 'bg-[#75a7a4] shadow-teal-100'}`}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {activeTab === 'app' ? <Save className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                {activeTab === 'app' ? "設定を保存する" : "ARグラスと同期する"}
              </>
            )}
          </button>
          <p className="text-center text-[9px] text-slate-400 font-bold mt-4 tracking-tight">
            {activeTab === 'app' 
              ? "※ アプリ内の基本動作設定を保存します" 
              : "※ パラメータを保存し, 即座にARグラスへ反映します"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;