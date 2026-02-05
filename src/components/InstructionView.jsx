import React from 'react';
import { 
  ScanEye, QrCode, CheckCircle2, Info,
  Smartphone, Glasses, HelpCircle, Link
} from 'lucide-react';

const InstructionView = () => {
  const brandColor = "#75a7a4";

  const steps = [
    {
      id: 1,
      icon: <QrCode className="w-6 h-6" />,
      title: "手順 1：ARグラスの接続",
      desc: "アプリに表示されたQRコードをARグラスでスキャンし、デバイス間のペアリングを確立します。"
    },
    {
      id: 2,
      icon: <ScanEye className="w-6 h-6" />,
      title: "手順 2：利用者の本人確認",
      desc: "ARグラスを利用者に向けると、AIが自動的に顔認証を行い、電子カルテと照合します。"
    },
    {
      id: 3,
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "手順 3：介助ケアの開始",
      desc: "認証後、嚥下ガイドやリアルタイムの注意点がグラスに表示され、安全な介助をサポートします。"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans animate-in fade-in duration-500">
      
      {/* Header - Phong cách tiêu đề lớn đồng bộ */}
      <div className="px-8 py-6 bg-white flex items-center border-b border-slate-100 shadow-sm">
        <div className="w-10 h-10 bg-[#75a7a4]/10 rounded-xl flex items-center justify-center mr-4">
          <HelpCircle className="w-6 h-6 text-[#75a7a4]" />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tighter">操作マニュアル</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Usage Instructions</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 hide-scrollbar">
        
        {/* Connection Illustration - Card bo góc lớn [40px] */}
        <div className="mb-10 flex justify-center items-center gap-6 py-10 bg-white rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-full -mr-12 -mt-12"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Smartphone className="w-10 h-10 text-slate-400" />
            <span className="text-[8px] font-black mt-1 text-slate-400 uppercase tracking-widest">App</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
             <div className="h-[2px] w-12 bg-slate-100 border-dashed border-t-2"></div>
             <Link className="w-3 h-3 text-[#75a7a4]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <Glasses className="w-14 h-14 text-[#75a7a4] animate-pulse" />
            <span className="text-[8px] font-black mt-1 text-[#75a7a4] uppercase tracking-widest">AR Glass</span>
          </div>
        </div>

        {/* Steps List - Quy trình các bước */}
        <div className="space-y-10 px-2">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm"
                  style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
                >
                  {step.id}
                </div>
                {step.id !== steps.length && (
                  <div className="w-0.5 h-full bg-slate-200/60 my-3"></div>
                )}
              </div>
              <div className="pb-2">
                <div className="flex flex-col mb-2">
                  <h3 className="text-[15px] font-black text-slate-800 tracking-tight">{step.title}</h3>
                </div>
                <p className="text-[12px] text-slate-500 font-bold leading-relaxed mb-4">
                  {step.desc}
                </p>
                {/* Action Tag - Nhãn hành động bo góc đặc trưng */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div style={{ color: brandColor }}>{step.icon}</div>
                  <div className="w-[1px] h-4 bg-slate-100"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">アクション</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip Box - Lưu ý với thiết kế bo tròn [32px] */}
        <div className="mt-12 p-6 bg-[#75a7a4]/5 rounded-[32px] border border-[#75a7a4]/10 flex gap-4">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Info className="w-5 h-5 text-[#75a7a4]" />
            </div>
          </div>
          <div>
            <h4 className="text-[12px] font-black text-[#75a7a4] uppercase mb-1 tracking-widest">留意点</h4>
            <p className="text-[11px] text-slate-500 font-bold leading-normal">
              スムーズな同期のため、ARグラスとスマートフォンが同一のWi-Fiネットワークに接続されていることを確認してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionView;