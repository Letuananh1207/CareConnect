import React from 'react';
import { Activity, Radio, ShieldCheck } from 'lucide-react';

const PatientCard = ({ isStarted, onStart }) => {
  const brandColor = "#75a7a4";

  return (
    /* XÓA className "relative" ở đây */
    <div className="mx-8 mt-6"> 
      <button 
        onClick={onStart}
        className={`
          w-full py-4.5 flex items-center justify-center gap-3 
          rounded-[24px] font-[900] text-white shadow-lg
          transition-all duration-500 active:scale-[0.95]
          relative overflow-hidden
          ${isStarted ? 'bg-slate-600' : ''}
        `}
        style={!isStarted ? { backgroundColor: brandColor } : {}}
      >
        <div className="flex items-center gap-3 z-10">
          {isStarted ? (
            <ShieldCheck className="w-5 h-5 text-teal-200 animate-pulse" strokeWidth={2.5} />
          ) : (
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          )}
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-[14px] uppercase tracking-tighter font-black">
              {isStarted ? "ケア実施中" : "ケアセッション開始"}
            </span>
          </div>
        </div>
        <Radio className="absolute right-5 w-4 h-4 opacity-30" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default PatientCard;