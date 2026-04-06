import React, { useState } from 'react';
import { 
  ScanEye, QrCode, CheckCircle2, Info,
  Smartphone, Glasses, HelpCircle, Link, ChevronDown,
  ClipboardEdit, // Icon cho ghi chép nhật ký
  Stethoscope,   // Icon cho thực hiện chuyên môn/chăm sóc
} from 'lucide-react';

const InstructionView = () => {
  const brandColor = "#75a7a4";
  const [openSection, setOpenSection] = useState(null);

  const steps = [
    {
      id: 1,
      icon: <QrCode className="w-6 h-6" />,
      title: "手順 1：ARグラスの接続",
      desc: "アプリに表示されたQRコード Core ARグラスでスキャンし, デバイス間のペアリングを確立します。"
    },
    {
      id: 2,
      icon: <ScanEye className="w-6 h-6" />,
      title: "手順 2：利用者の本人確認",
      desc: "ARグラスを利用者に向けると, AIが自動的に顔認証を行い, 電子カルテと照合します。"
    },
    {
      id: 3,
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "手順 3：介助ケアの開始",
      desc: "認証後, 嚥下ガイドやリアルタイムの注意点がグラスに表示され, 安全な介助をサポートします。"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="px-8 py-6 bg-white flex items-center border-b border-slate-100 shadow-sm shrink-0">
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mr-4">
          <HelpCircle className="w-6 h-6 text-slate-300" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">操作マニュアル</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Usage Instructions</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar">
        
        <div className="space-y-4">
          {/* SECTION 1: 日々の記録 (Q1) */}
          <div className="group">
            <button 
              onClick={() => setOpenSection(openSection === 1 ? null : 1)}
              className={`w-full flex items-center justify-between p-5 bg-white border rounded-xl shadow-sm transition-all ${openSection === 1 ? 'border-[#75a7a4]' : 'border-slate-200 hover:border-[#75a7a4]/30'}`}
            >
              <div className="flex items-center gap-3">
                {/* Số thứ tự Q1 */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${openSection === 1 ? 'bg-[#75a7a4] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  01
                </div>
                <div className="w-[1px] h-4 bg-slate-200" />
                <div className={`${openSection === 1 ? 'text-[#75a7a4]' : 'text-slate-400'}`}>
                  <ClipboardEdit className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-slate-700 text-left">日々の記録はどのように行いますか？</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${openSection === 1 ? 'rotate-180 text-[#75a7a4]' : ''}`} />
            </button>
            
            {openSection === 1 && (
              <div className="p-6 mt-2 bg-white rounded-2xl border border-slate-100 text-slate-500 text-[13px] leading-relaxed animate-in slide-in-from-top-2 duration-300 shadow-sm font-medium">
                ここに日々の記録に関する詳細な手順が表示されます。
              </div>
            )}
          </div>

          {/* SECTION 2: ARケア (Q2) */}
          <div className="group">
            <button 
              onClick={() => setOpenSection(openSection === 2 ? null : 2)}
              className={`w-full flex items-center justify-between p-5 bg-white border rounded-xl shadow-sm transition-all ${openSection === 2 ? 'border-[#75a7a4]' : 'border-slate-200 hover:border-[#75a7a4]/30'}`}
            >
              <div className="flex items-center gap-3">
                {/* Số thứ tự Q2 */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${openSection === 2 ? 'bg-[#75a7a4] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  02
                </div>
                <div className="w-[1px] h-4 bg-slate-200" />
                <div className={`${openSection === 2 ? 'text-[#75a7a4]' : 'text-slate-400'}`}>
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-slate-700 text-left">ARを用いたケアはどのように実施しますか？</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${openSection === 2 ? 'rotate-180 text-[#75a7a4]' : ''}`} />
            </button>

            {openSection === 2 && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-3 duration-500">
                
                {/* Connection Illustration */}
                <div className="mb-8 flex justify-center items-center gap-8 py-10 bg-white rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/40 rounded-full -mr-12 -mt-12"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <Smartphone className="w-10 h-10 text-slate-300" />
                    <span className="text-[8px] font-black mt-1 text-slate-400 uppercase tracking-widest">App</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                     <div className="h-[2px] w-12 border-dashed border-t-2 border-slate-200"></div>
                     <Link className="w-4 h-4 text-[#75a7a4] -rotate-45" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <Glasses className="w-14 h-14 text-[#75a7a4]" />
                    <span className="text-[8px] font-black mt-1 text-[#75a7a4] uppercase tracking-widest">AR Glass</span>
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-10 px-2 pb-6">
                  {steps.map((step) => (
                    <div key={step.id} className="flex gap-6 group/step">
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-sm transition-colors group-hover/step:bg-slate-200"
                          style={{ backgroundColor: `#f1f5f9`, color: '#94a3b8' }}
                        >
                          {step.id}
                        </div>
                        {step.id !== steps.length && (
                          <div className="w-0.5 h-full bg-slate-100 my-3"></div>
                        )}
                      </div>
                      <div className="pb-2 flex-1">
                        <h3 className="text-[15px] font-black text-slate-800 tracking-tight mb-2">{step.title}</h3>
                        <p className="text-[12px] text-slate-500 font-bold leading-relaxed mb-4">
                          {step.desc}
                        </p>
                        
                        {/* Action Tag */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm group-hover/step:border-[#75a7a4]/40 transition-colors">
                          <div style={{ color: brandColor }}>{step.icon}</div>
                          <div className="w-[1px] h-4 bg-slate-100"></div>
                          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">アクション</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tip Box */}
                <div className="mb-6 p-6 bg-[#75a7a4]/5 rounded-[32px] border border-[#75a7a4]/10 flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Info className="w-5 h-5 text-[#75a7a4]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-black text-[#75a7a4] uppercase mb-1 tracking-widest">留意点</h4>
                    <p className="text-[11px] text-slate-500 font-bold leading-normal">
                      スムーズな同期のため, ARグラスとスマートフォンが同一のWi-Fiネットワークに接続されていることを確認してください。
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionView;