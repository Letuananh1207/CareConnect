import React from 'react';
import { QrCode, X, Scan, Glasses, Link2Off, Power } from 'lucide-react';

const ArPairingModal = ({ isOpen, onClose, onConfirm, currentDevice, onDisconnect }) => {
  if (!isOpen) return null;

  const brandColor = "#75a7a4";

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-8 animate-in fade-in duration-500">
      
      {/* NỀN MỜ */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* BOX NỘI DUNG */}
      <div className="bg-white w-full max-w-[280px] rounded-[35px] p-8 shadow-2xl relative z-20 border border-white animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-300 hover:text-slate-500 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {currentDevice ? (
          /* TRẠNG THÁI: ĐÃ KẾT NỐI - HIỆN THÔNG TIN & HỦY */
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#75a7a4]/10 rounded-[24px] flex items-center justify-center mb-4 relative">
              <Glasses className="w-8 h-8 text-[#75a7a4]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 border-2 border-white rounded-full"></div>
            </div>
            
            <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-1">Thiết bị hiện tại</h3>
            <p className="text-[12px] font-bold text-slate-500 mb-8">{currentDevice}</p>

            <div className="w-full space-y-3">
              <button 
                onClick={onClose}
                className="w-full py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all border border-slate-100"
              >
                Đóng
              </button>
              
              <button 
                onClick={() => {
                  onDisconnect();
                  onClose();
                }}
                className="w-full py-3.5 bg-rose-50 text-rose-500 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 border border-rose-100"
              >
                <Link2Off className="w-4 h-4" />
                Hủy kết nối
              </button>
            </div>
          </div>
        ) : (
          /* TRẠNG THÁI: CHƯA KẾT NỐI - HIỆN QR ĐỂ QUÉT */
          <div className="animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-3">
                <Scan className="w-6 h-6 text-[#75a7a4]" />
              </div>
              <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest">デバイス接続</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kết nối kính AR</p>
            </div>

            <div className="relative p-3 bg-slate-50 rounded-[28px] border border-slate-100 flex justify-center overflow-hidden shadow-inner cursor-pointer" 
                 onClick={() => onConfirm("AR-Glass v2")}>
              <QrCode className="w-36 h-36 text-slate-800 opacity-90" strokeWidth={1.5} />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#75a7a4] shadow-[0_0_10px_#75a7a4] animate-[scan_2s_linear_infinite]" />
            </div>
            
            <p className="text-[10px] text-center text-slate-400 font-bold mt-6 leading-relaxed">
              Dùng kính AR quét mã QR này<br/>để bắt đầu đồng bộ
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ArPairingModal;