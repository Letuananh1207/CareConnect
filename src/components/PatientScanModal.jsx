import React, { useState, useEffect } from 'react';
import { QrCode, X, CheckCircle2, Timer, RefreshCw, Smartphone, ArrowRightLeft } from 'lucide-react';

const PatientScanModal = ({ isOpen, onClose, onConfirm }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState('active'); // active -> success
  const brandColor = "#75a7a4";

  useEffect(() => {
    let timer;
    if (isOpen && timeLeft > 0 && status === 'active') {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, timeLeft, status]);

  // Giả lập kết nối thành công sau 4 giây
  useEffect(() => {
    if (isOpen && status === 'active') {
      const mockScanSuccess = setTimeout(() => setStatus('success'), 4000); 
      return () => clearTimeout(mockScanSuccess);
    }
  }, [isOpen, status]);

  const handleClose = () => {
    setTimeLeft(60);
    setStatus('active');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-8 animate-in fade-in duration-500">
      {/* Nền mờ phía sau */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={handleClose} />

      <div className="bg-white w-full max-w-[300px] rounded-[40px] p-8 shadow-2xl relative z-20 border border-white/50 animate-in zoom-in-95 duration-300">
        <button onClick={handleClose} className="absolute top-6 right-6 text-slate-300 active:text-slate-500 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          /* MÀN HÌNH XÁC NHẬN KẾT NỐI - 接続確認画面 */
          <div className="flex flex-col items-center py-4 animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center border border-slate-100 shadow-sm">
                <Smartphone className="w-7 h-7 text-slate-400" />
              </div>
              <ArrowRightLeft className="w-5 h-5 text-[#75a7a4] animate-pulse" />
              <div className="w-14 h-14 bg-[#75a7a4]/10 rounded-[20px] flex items-center justify-center border border-[#75a7a4]/20 shadow-sm">
                <CheckCircle2 className="w-7 h-7 text-[#75a7a4]" />
              </div>
            </div>

            <h3 className="text-[15px] font-black text-slate-800 uppercase tracking-widest mb-2">認証が完了しました</h3>
            <p className="text-[11px] text-slate-500 font-bold text-center mb-10 leading-relaxed px-2">
              デバイスの同期が完了しました。<br/>ケアを開始できます。
            </p>
            
            <button 
              onClick={() => { onConfirm(); setStatus('active'); }}
              className="w-full py-4 text-white rounded-[22px] font-black text-[12px] uppercase tracking-[0.15em] active:scale-95 transition-all shadow-lg shadow-teal-100"
              style={{ backgroundColor: brandColor }}
            >
              ケアを開始する
            </button>
          </div>
        ) : (
          /* MÀN HÌNH HIỂN THỊ MÃ QR - QRコード表示画面 */
          <>
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-[#75a7a4]" />
              </div>
              <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">セッション有効化</h3>
              <p className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-[0.1em]">New Care Session QR</p>
            </div>

            <div className="relative aspect-square w-full bg-slate-50 rounded-[35px] p-6 border border-slate-100 flex items-center justify-center shadow-inner group overflow-hidden">
              <QrCode className={`w-full h-full text-slate-800 transition-all duration-700 ${timeLeft === 0 ? 'opacity-5 scale-90' : 'opacity-100'}`} strokeWidth={1} />
              
              {/* Animation tia quét đặc trưng */}
              {timeLeft > 0 && (
                <div className="absolute inset-x-0 h-[2px] bg-[#75a7a4]/40 shadow-[0_0_15px_#75a7a4] animate-scan-slow opacity-60" />
              )}

              {timeLeft === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm">
                  <RefreshCw className="w-10 h-10 text-slate-400 animate-spin-slow" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">有効期限切れ</span>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                <Timer className={`w-4 h-4 ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                <span className={`text-[13px] font-mono font-black ${timeLeft < 10 ? 'text-rose-500' : 'text-slate-700'}`}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight text-center leading-relaxed">
                ARグラスでQRコードをスキャンし<br/>ペアリングを開始してください
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scan-slow {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-slow {
          animation: scan-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PatientScanModal;