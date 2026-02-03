import React, { useState } from 'react';
import Header from './components/Header';
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


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [detailSource, setDetailSource] = useState(null); 
  const [isViewingNotifications, setIsViewingNotifications] = useState(false);
  const [isViewingHandover, setIsViewingHandover] = useState(false);

  // Xử lý đăng nhập
  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-white max-w-[430px] mx-auto relative overflow-hidden shadow-2xl">
        <LoginView onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const renderContent = () => {
    // --- 1. CÁC MÀN HÌNH ĐÈ LÊN (OVERLAYS / MODAL VIEWS) ---
    
    if (isViewingHandover) {
      return (
        <HandoverSummaryView 
          onBack={() => setIsViewingHandover(false)} 
          onConfirm={() => {
            setIsViewingHandover(false);
            setIsViewingMenu(false);
            setIsWorking(false);
            setActiveTab('home');
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
          onBack={() => setIsViewingMenu(false)}
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

    // --- 2. CÁC TAB CHÍNH (BOTTOM NAV) ---
    switch(activeTab) {
      case 'history': // Chuyển từ profile sang history
        return <HandoverHistoryView />;
      
      case 'calendar': 
        return <ScheduleView onAppointmentClick={(data) => setSelectedAppt(data)} />;
      
      case 'manual': 
        return <InstructionView />;
      
      case 'settings':
        return <SettingsView />;
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
    <div className="h-screen bg-white max-w-[430px] mx-auto relative overflow-hidden flex flex-col shadow-2xl font-sans text-slate-900">
      <Header onOpenNotifications={() => setIsViewingNotifications(true)} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar">
        {renderContent()}
      </main>
      
      {!isWorking && !detailSource && !selectedAppt && !isViewingMenu && !isViewingNotifications && !isViewingHandover && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;