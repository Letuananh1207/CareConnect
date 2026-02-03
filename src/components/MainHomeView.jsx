import React, { useState } from 'react';
import { Glasses, Plus, RefreshCw } from 'lucide-react';
import PatientCard from './PatientCard';
import ArPairingModal from './ArPairingModal';
import PatientScanModal from './PatientScanModal';

const MainHomeView = ({ onStart, isStarted, onDetail }) => {
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  
  // MẶC ĐỊNH: Giả lập đã kết nối với thiết bị "AR-Glass v2"
  const [connectedDevice, setConnectedDevice] = useState("AR-Glass v2");

  return (
    <div className="relative h-full flex flex-col px-5 pt-4 animate-in fade-in duration-300 bg-slate-50 overflow-hidden">

      <div className='flex-1'></div>
      
      {/* 2. PATIENT CARD (Kích hoạt quét QR bệnh nhân) */}
      <PatientCard 
        isStarted={isStarted} 
        onStart={() => setIsScanOpen(true)} 
        onDetail={onDetail} 
      />
      
      <div className='flex-1 mt-15'></div>

      {/* MODAL 1: KẾT NỐI KÍNH (Dùng khi muốn đổi thiết bị) */}
      <ArPairingModal 
        isOpen={isPairingOpen} 
        onClose={() => setIsPairingOpen(false)} 
        currentDevice={connectedDevice} // Truyền tên thiết bị đang kết nối vào đây
        onDisconnect={() => setConnectedDevice(null)} // Khi nhấn hủy sẽ set về null
        onConfirm={(deviceName) => {
          setConnectedDevice(deviceName);
          setIsPairingOpen(false);
        }}
      />

      {/* MODAL 2: QUÉT BỆNH NHÂN (Tự động quét khi mở) */}
      <PatientScanModal 
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onConfirm={() => {
          setIsScanOpen(false);
          onStart(); // Chuyển sang CareMenuView
        }}
      />
    </div>
  );
};

export default MainHomeView;