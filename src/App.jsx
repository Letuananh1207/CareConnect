import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import MainHomeView from './components/MainHomeView';
import ScheduleView from './components/ScheduleView';
import CareRecordView from './components/CareRecordView';
import PatientDetailView from './components/PatientDetailView';
import AppointmentSummaryView from './components/AppointmentSummaryView';
import CareMenuView from './components/CareMenuView';
import NotificationView from './components/NotificationView';
import LoginView from './components/LoginView'; 
import HandoverSummaryView from './components/HandoverSummaryView';
import InstructionView from './components/InstructionView';
import HandoverHistoryView from './components/HandoverHistoryView'; 
import SettingsView from './components/SettingsView'; 
import ARView from './components/ARView';
// Import context
import { ARProvider, useAR } from './context/ARContext';

// Tạo một component trung gian để có thể sử dụng useAR hook
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [detailSource, setDetailSource] = useState(null); 
  const [isViewingNotifications, setIsViewingNotifications] = useState(false);
  const [isViewingHandover, setIsViewingHandover] = useState(false);

  // Lấy setStage từ ARContext
  const { setStage } = useAR();

  const handleBackFromMenu = () => {
    setIsViewingMenu(false);
    // CẬP NHẬT: Đưa stage về trạng thái chờ ban đầu của kính AR
    setStage('qr_waiting');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginView onLogin={() => setIsLoggedIn(true)} />;
    }

    if (isViewingHandover) {
      return (
        <HandoverSummaryView 
          onBack={() => setIsViewingHandover(false)} 
          onConfirm={() => {
            setIsViewingHandover(false);
            setIsViewingMenu(false);
            setIsWorking(false);
            setActiveTab('home');
            // CẬP NHẬT: Sau khi bàn giao xong cũng reset AR
            setStage('qr_waiting');
          }} 
        />
      );
    }

    if (isViewingNotifications) {
      return <NotificationView onBack={() => setIsViewingNotifications(false)} />;
    }

    if (selectedAppt) {
      return <AppointmentSummaryView appointment={selectedAppt} onBack={() => setSelectedAppt(null)} />;
    }

    if (detailSource) {
      return (
        <PatientDetailView 
          onBack={() => {
            if (detailSource === 'menu') setIsViewingMenu(true);
            setDetailSource(null);
          }} 
        />
      );
    }

    if (isViewingMenu) {
      return (
        <CareMenuView 
          onBack={handleBackFromMenu} // Sử dụng hàm handle mới
          onOpenRecord={() => { 
            setIsWorking(true); 
            setIsViewingMenu(false); 
          }}
          onOpenChart={() => { 
            setDetailSource('menu');
            setIsViewingMenu(false); 
          }}
          onOpenHandover={() => setIsViewingHandover(true)}
        />
      );
    }

    if (isWorking) {
      return (
        <CareRecordView 
          onBack={() => {
            setIsWorking(false);      
            setIsViewingMenu(true);   
          }} 
        />
      );
    }

    switch(activeTab) {
      case 'history': return <HandoverHistoryView />;
      case 'calendar': return <ScheduleView onAppointmentClick={(data) => setSelectedAppt(data)} />;
      case 'manual': return <InstructionView />;
      case 'settings': return <SettingsView />;
      default: 
        return (
          <MainHomeView 
            isStarted={isWorking} 
            onStart={() => setIsViewingMenu(true)}
            onDetail={() => setDetailSource('home')}
          />
        );
    }
  };

  return (
    <div className='flex w-full h-screen bg-zinc-950 overflow-hidden'>
      {/* MOBILE APP SIMULATOR */}
      <div className="h-screen bg-white w-[430px] min-w-[430px] relative overflow-hidden flex flex-col shadow-2xl font-sans text-slate-900 border-r border-zinc-800">
        <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar">
          {renderContent()}
        </main>
        
        {isLoggedIn && !isWorking && !detailSource && !selectedAppt && !isViewingMenu && !isViewingNotifications && !isViewingHandover && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>

      {/* AR VIEW SIMULATOR */}
      <div className='flex-1 relative h-full bg-black'>
        <ARView />
      </div>
    </div>
  );
}

// Component App chính bao bọc bởi Provider
function App() {
  return (
    <ARProvider>
      <AppContent />
    </ARProvider>
  );
}

export default App;