import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Check, Info, Smartphone } from 'lucide-react';

const PatientFaceAuthModal = ({ isOpen, onClose, onSuccess, patientData }) => {
  const [authStatus, setAuthStatus] = useState('scanning'); 
  const [scanProgress, setScanProgress] = useState(0);
  const brandColor = "#75a7a4";

  const mockCameraUrl = 'patient_sit_man.webp'; 
  const patientAvatarUrl = 'patient_man.webp';

  useEffect(() => {
    if (isOpen && authStatus === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setAuthStatus('verifying');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isOpen, authStatus]);

  useEffect(() => {
    if (authStatus === 'verifying') {
      const timer = setTimeout(() => {
        setAuthStatus('success');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authStatus]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSuccess();
    setAuthStatus('scanning');
    setScanProgress(0);
  };

  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />

      <div className="bg-white w-full max-w-[340px] rounded-[44px] overflow-hidden shadow-2xl relative z-20 border border-white/20 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="pt-7 pb-3 px-8 text-center border-b border-slate-50">
          <div className="flex items-center justify-center gap-2 mb-0.5 text-[#75a7a4]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-[16px] font-black text-slate-800 tracking-tighter">本人確認</h3>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Authentication</p>
        </div>

        {/* MINIMAL HINT AREA - Phần chỉ dẫn tối thiểu */}
        <div className="bg-orange-50/50 py-2.5 px-6 flex items-center gap-3 border-b border-orange-100/30">
          <div className="shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Info className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <p className="text-[10px] font-bold text-orange-700 leading-tight">
            {authStatus === 'success' 
              ? "本人と一致しました。記録を開始してください。" 
              : "端末を正面に持ち、患者の顔を枠内に収めてください。"}
          </p>
        </div>

        <div className="p-7 flex flex-col items-center">
          
          {/* CAMERA / AVATAR VIEWPORT */}
          <div className="relative w-48 h-48 mb-6">
            <div className="absolute inset-0 border-2 border-slate-100 rounded-[52px] overflow-hidden bg-slate-50 shadow-inner">
              <img 
                src={mockCameraUrl} 
                alt="Camera" 
                className={`w-full h-full object-cover transition-all duration-700 
                  ${authStatus !== 'scanning' ? 'blur-md grayscale opacity-40' : ''}`}
              />

              {authStatus === 'success' && (
                <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-500 p-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-[36px] overflow-hidden border-4 border-white shadow-2xl">
                      <img src={patientAvatarUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-1 w-9 h-9 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white animate-in bounce-in duration-700">
                      <Check className="w-5 h-5 stroke-[4px]" />
                    </div>
                  </div>
                </div>
              )}

              {authStatus === 'verifying' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                  <RefreshCw className="w-9 h-9 text-[#75a7a4] animate-spin" />
                </div>
              )}
            </div>

            {/* Scan Line */}
            {authStatus === 'scanning' && (
              <div 
                className="absolute left-6 right-6 h-1 bg-[#75a7a4] shadow-[0_0_15px_#75a7a4] z-10 animate-scan"
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* Frame Corners */}
            <div className={`absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 rounded-tl-[28px] transition-colors duration-500 ${authStatus === 'success' ? 'border-emerald-500' : 'border-[#75a7a4]'}`} />
            <div className={`absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 rounded-tr-[28px] transition-colors duration-500 ${authStatus === 'success' ? 'border-emerald-500' : 'border-[#75a7a4]'}`} />
            <div className={`absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 rounded-bl-[28px] transition-colors duration-500 ${authStatus === 'success' ? 'border-emerald-500' : 'border-[#75a7a4]'}`} />
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 rounded-br-[28px] transition-colors duration-500 ${authStatus === 'success' ? 'border-emerald-500' : 'border-[#75a7a4]'}`} />
          </div>

          {/* Text Status */}
          <div className="text-center min-h-[56px] flex flex-col justify-center">
            {authStatus === 'scanning' && (
              <div className="animate-pulse">
                <span className="text-[14px] font-black text-slate-700 block">照合中... {scanProgress}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Biometric Scanning</span>
              </div>
            )}
            {authStatus === 'verifying' && (
              <span className="text-[14px] font-black text-[#75a7a4] block">カルテ照合中</span>
            )}
            {authStatus === 'success' && (
              <div className="animate-in slide-in-from-bottom-2">
                <span className="text-[17px] font-black text-emerald-600 block leading-none mb-1">照合成功</span>
                <span className="text-[13px] font-bold text-slate-600">
                   {patientData?.name || "佐藤"} 様
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex gap-3">
          {authStatus !== 'success' && (
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-[20px] font-black text-[12px] text-slate-400 bg-white border border-slate-200 uppercase tracking-widest active:scale-95 transition-all"
            >
              中断
            </button>
          )}
          <button 
            onClick={handleConfirm}
            disabled={authStatus !== 'success'}
            className={`flex-[2] py-4 rounded-[20px] font-black text-[12px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-md
              ${authStatus === 'success' 
                ? 'bg-[#75a7a4] text-white shadow-teal-100/50' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {authStatus === 'success' ? "記録開始" : "待機中"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan { 0% { top: 15%; } 100% { top: 85%; } }
        .animate-scan { animation: scan 2s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
};

export default PatientFaceAuthModal;