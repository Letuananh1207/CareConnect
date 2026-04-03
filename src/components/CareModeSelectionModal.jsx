import React from 'react';
import { ClipboardEdit, Stethoscope } from 'lucide-react';
import { useAR } from '../context/ARContext';

const CareModeSelectionModal = ({ isOpen, onClose, onSelectMode, setScanOpen }) => {
  const { setStage } = useAR();
  
  if (!isOpen) return null;

  const handleModeConfirmed = (mode) => {
    onSelectMode(mode);
    if (mode === "care") {
      setScanOpen();
      setStage("qr_scan");
      console.log(mode);
    }else if (mode === "record") {
      setStage("not_connecting");
    }
  };

  return (
    <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

      {/* Modal Container */}
      <div className="bg-white w-full max-w-[360px] rounded-[40px] shadow-2xl relative z-20 border border-slate-100 animate-in zoom-in-95 duration-200 overflow-hidden">

        {/* Header */}
        <div className="pt-10 pb-2 px-8 text-center">
          <h3 className="text-[20px] font-black text-slate-800 tracking-tighter">操作モードの選択</h3>
          <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">Select Operation Mode</p>
        </div>

        {/* Mode Buttons - Cấu trúc đồng nhất tuyệt đối */}
        <div className="p-6 flex gap-3">
          
          {/* Chế độ Ghi chép - RECORD */}
          <button 
            onClick={() => handleModeConfirmed('record')}
            className="flex-1 flex flex-col items-center gap-4 py-8 bg-slate-50 rounded-[32px] border-2 border-transparent active:border-slate-200 active:bg-slate-100 transition-all group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-500 group-active:scale-90 transition-transform">
              <ClipboardEdit className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="text-center">
              <span className="block text-[15px] font-black text-slate-700 leading-tight">
                日々の記録
              </span>
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Input Record
              </span>
            </div>
          </button>

          {/* Chế độ Chăm sóc - CARE (Đã đưa về tone trung tính để bình đẳng) */}
          <button 
            onClick={() => handleModeConfirmed('care')}
            className="flex-1 flex flex-col items-center gap-4 py-8 bg-slate-50 rounded-[32px] border-2 border-transparent active:border-slate-200 active:bg-slate-100 transition-all group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-500 group-active:scale-90 transition-transform">
              <Stethoscope className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="text-center">
              <span className="block text-[15px] font-black text-slate-700 leading-tight">
                介助ケア
              </span>
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                AR Support
              </span>
            </div>
          </button>
        </div>

        {/* Footer Close */}
        <button 
          onClick={onClose}
          className="w-full py-5 bg-slate-50 border-t border-slate-100 text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] active:text-slate-600 active:bg-slate-100 transition-all"
        >
          キャンセル [ Back ]
        </button>
      </div>
    </div>
  );
};

export default CareModeSelectionModal;