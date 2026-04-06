import React, { useState } from 'react';
import { 
  Save, Settings, Bell, Globe, Layout
} from 'lucide-react';

const SettingsView = () => {
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
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">設定</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">System Configuration</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar flex flex-col">
        
        {/* 2. Content Area - App Settings Only */}
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-2 text-slate-400">
              <Bell className="w-4 h-4" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.15em]">通知と基本設定</h3>
            </div>
            
            <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
              {/* Push Notification */}
              <div className="p-5 flex items-center justify-between">
                <span className="text-[14px] font-black text-slate-700">プッシュ通知</span>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 transition-all shadow-inner">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto shadow-sm" />
                </div>
              </div>
              
              {/* Language Settings */}
              <div className="p-5 flex items-center justify-between">
                <span className="text-[14px] font-black text-slate-700">言語設定</span>
                <div className="flex items-center gap-1 text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <span className="text-[12px] font-bold">日本語</span>
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 3. Static Action Button */}
        <div className="mt-auto pt-10 mb-6">
          <button 
            onClick={handleAction}
            disabled={isProcessing}
            className="w-full py-5 rounded-[26px] bg-slate-800 font-black text-[13px] text-white uppercase tracking-[0.2em] shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                設定を保存する
              </>
            )}
          </button>
          <p className="text-center text-[9px] text-slate-400 font-bold mt-4 tracking-tight">
            ※ アプリ内の基本動作設定を保存します
          </p>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;