import React, { useState } from 'react';
import { LayoutGrid} from 'lucide-react';
import PatientCard from './PatientCard';
import ArPairingModal from './ArPairingModal';
import PatientScanModal from './PatientScanModal';

const MainHomeView = ({ onStart, isStarted, onDetail }) => {
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState("AR-Glass v2");

  const brandColor = "#75a7a4";

  return (
    <div className="relative h-full flex flex-col px-6 pt-12 animate-in fade-in duration-500 bg-slate-50 overflow-hidden">
      
      {/* 1. TOP STATUS BAR - Hiển thị thiết bị đang kết nối */}
      <div className="flex justify-between items-center mb-10">
        <div 
          onClick={() => setIsPairingOpen(true)}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
            {connectedDevice || "未接続"}
          </span>
        </div>
        <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
          <LayoutGrid className="w-5 h-5" />
        </div>
      </div>



      <div className='flex-1'></div>
      
      {/* 3. PATIENT CARD (Trọng tâm của màn hình) */}
      <div className="relative z-10">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center w-full">
           <p className="text-[10px] font-black text-[#75a7a4] uppercase tracking-[0.3em] mb-2 animate-bounce">
             Ready to Scan
           </p>
        </div>
        <PatientCard 
          isStarted={isStarted} 
          onStart={() => setIsScanOpen(true)} 
          onDetail={onDetail} 
        />
      </div>
      
      <div className='flex-1 mt-10'></div>

      {/* 4. BACKGROUND DECOR - Họa tiết chìm cho sang trọng */}
      <div className="absolute top-[20%] right-[-15%] w-72 h-72 bg-[#75a7a4]/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-56 h-56 bg-orange-50/50 rounded-full blur-2xl -z-0"></div>

      {/* MODAL 1: KẾT NỐI KÍNH */}
      <ArPairingModal 
        isOpen={isPairingOpen} 
        onClose={() => setIsPairingOpen(false)} 
        currentDevice={connectedDevice}
        onDisconnect={() => setConnectedDevice(null)}
        onConfirm={(deviceName) => {
          setConnectedDevice(deviceName);
          setIsPairingOpen(false);
        }}
      />


      {/* MODAL 2: QUÉT BỆNH NHÂN */}
      <PatientScanModal 
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onConfirm={() => {
          setIsScanOpen(false);
          onStart();
        }}
      />
    </div>
  );
};

export default MainHomeView;