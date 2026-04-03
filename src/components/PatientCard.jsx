import React from 'react';
import { Activity, Radio, ShieldCheck } from 'lucide-react';
// 1. Import hook useAR
import { useAR } from '../context/ARContext'; 

const PatientCard = ({ isStarted, onStart }) => {
  const brandColor = "#75a7a4";
  
  // 2. Lấy hàm setStage từ context
  const { setStage } = useAR();

  // 3. Tạo hàm handler để xử lý cùng lúc nhiều hành động
  const handleStartClick = () => {
    // Gọi hàm onStart gốc (để mở CareMenuView hoặc Modal trên Mobile)
    onStart();
  };

  return (
    <div className="mx-8 mt-6"> 
      <button 
        onClick={handleStartClick} // Sử dụng hàm handler mới
        className={`
          w-full py-5 flex items-center justify-center gap-3 
          rounded-[26px] font-[900] text-white shadow-xl
          transition-all duration-500 active:scale-[0.95]
          relative overflow-hidden group
          cursor-pointer
          ${isStarted ? 'bg-slate-700' : ''}
        `}
        style={!isStarted ? { backgroundColor: brandColor } : {}}
      >
        {/* EFFECT 1: SHINE SWEEP */}
        {!isStarted && (
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shine" />
          </div>
        )}

        {/* EFFECT 2: RIPPLE PULSE */}
        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 rounded-full animate-ping opacity-20" />
          </div>
        )}

        <div className="flex items-center gap-3 z-10">
          {isStarted ? (
            <ShieldCheck className="w-5 h-5 text-teal-300 animate-pulse" strokeWidth={3} />
          ) : (
            <div className="relative">
               <Activity className="w-5 h-5 text-white" strokeWidth={3} />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-300 rounded-full border-2 border-[#75a7a4] animate-bounce" />
            </div>
          )}
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-[15px] uppercase tracking-[0.05em] font-black">
              {isStarted ? "ケア実施中" : "ケアセッション開始"}
            </span>
            <span className="text-[8px] opacity-60 font-bold uppercase tracking-widest mt-0.5">
               {isStarted ? "Care in progress" : "Start Care Session"}
            </span>
          </div>
        </div>

        <Radio 
          className={`absolute right-5 w-4 h-4 transition-all duration-700 ${isStarted ? 'opacity-100 text-teal-400 animate-spin-slow' : 'opacity-30 text-white'}`} 
          strokeWidth={3} 
        />

        <style jsx>{`
          @keyframes shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
          }
          .animate-shine {
            animation: shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
        `}</style>
      </button>
    </div>
  );
};

export default PatientCard;