import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import PatientCard from './PatientCard';
import ArPairingModal from './ArPairingModal';
import PatientScanModal from './PatientScanModal';
import CareModeSelectionModal from './CareModeSelectionModal';
import PatientFaceAuthModal from './PatientFaceAuthModal'; // Import modal xác thực khuôn mặt

const MainHomeView = ({ onStart, isStarted, onDetail }) => {
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [isModeSelectOpen, setIsModeSelectOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isFaceAuthOpen, setIsFaceAuthOpen] = useState(false); // Quản lý modal xác thực mặt
  
  const [connectedDevice, setConnectedDevice] = useState("AR-Glass v2");
  const [selectedMode, setSelectedMode] = useState(null);

  const brandColor = "#75a7a4";

  // Thông tin bệnh nhân giả lập để đối soát trong FaceID
  const currentPatient = { name: "佐藤", id: "P-1024" };

  // 1. Khởi động quy trình từ PatientCard
  const handleInitiateProcess = () => {
    setIsModeSelectOpen(true);
  };

  // 2. Xử lý sau khi chọn Mode
  const handleModeConfirmed = (mode) => {
    setSelectedMode(mode);
    setIsModeSelectOpen(false);
    
    // Phân luồng: Nếu là Care thì quét QR, nếu là Record thì FaceID
    if (mode === 'care') {
      setIsScanOpen(true);
    } else if (mode === 'record') {
      setIsFaceAuthOpen(true);
    }
  };

  // 3. Xử lý khi hoàn tất xác thực (Dùng chung cho cả 2 modal)
  const handleAuthSuccess = () => {
    setIsScanOpen(false);
    setIsFaceAuthOpen(false);
    // Chuyển màn hình và truyền mode để render UI tương ứng
    onStart(selectedMode);
  };

  return (
    <div className="relative h-full flex flex-col px-6 pt-12 animate-in fade-in duration-500 bg-slate-50 overflow-hidden">
      
      {/* 1. TOP STATUS BAR */}
      <div className="flex justify-between items-center mb-10 relative z-20">
        <div 
          onClick={() => setIsPairingOpen(true)}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-all cursor-pointer"
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${connectedDevice ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
            {connectedDevice || "未接続"}
          </span>
        </div>
        <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 active:bg-slate-50 transition-colors">
          <LayoutGrid className="w-5 h-5" />
        </div>
      </div>

      <div className='flex-1'></div>
      
      {/* 2. PATIENT CARD (Target chính) */}
      <div className="relative z-10">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center w-full">
           <p className="text-[10px] font-black text-[#75a7a4] uppercase tracking-[0.3em] mb-2 animate-bounce">
             Ready to Proceed
           </p>
        </div>
        <PatientCard 
          isStarted={isStarted} 
          onStart={handleInitiateProcess} 
          onDetail={onDetail} 
        />
      </div>
      
      <div className='flex-1 mt-10'></div>

      {/* 3. BACKGROUND DECOR */}
      <div className="absolute top-[20%] right-[-15%] w-72 h-72 bg-[#75a7a4]/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-56 h-56 bg-orange-50/50 rounded-full blur-2xl -z-0"></div>

      {/* MODAL LỰA CHỌN CHẾ ĐỘ */}
      <CareModeSelectionModal 
        isOpen={isModeSelectOpen}
        onClose={() => setIsModeSelectOpen(false)}
        onSelectMode={handleModeConfirmed}
        // Truyền thêm prop nếu logic modal cũ yêu cầu để kích hoạt QR ngay
        setScanOpen={() => setIsScanOpen(true)} 
      />

      {/* MODAL XÁC THỰC KHUÔN MẶT (Dành cho ghi chép) */}
      <PatientFaceAuthModal
        isOpen={isFaceAuthOpen}
        onClose={() => setIsFaceAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        patientData={currentPatient}
      />

      {/* MODAL KẾT NỐI KÍNH */}
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

      {/* MODAL QUÉT BỆNH NHÂN QR (Dành cho AR Care) */}
      <PatientScanModal 
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onConfirm={handleAuthSuccess}
      />
    </div>
  );
};

export default MainHomeView;