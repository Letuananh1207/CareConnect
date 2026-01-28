import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MainHomeView from './components/MainHomeView';
import ProfileView from './components/ProfileView';
import ScheduleView from './components/ScheduleView';
import CareRecordView from './components/CareRecordView';
import PatientDetailView from './components/PatientDetailView';
import AppointmentSummaryView from './components/AppointmentSummaryView';
import CareMenuView from './components/CareMenuView';
import NotificationView from './components/NotificationView';
import LoginView from './components/LoginView'; 
import HandoverSummaryView from './components/HandoverSummaryView'; // Import mới

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [detailSource, setDetailSource] = useState(null); 
  const [isViewingNotifications, setIsViewingNotifications] = useState(false);
  
  // MỚI: Trạng thái xem màn hình tóm tắt bàn giao
  const [isViewingHandover, setIsViewingHandover] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-white max-w-[430px] border mx-auto relative overflow-hidden shadow-2xl">
        <LoginView onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const renderContent = () => {
    // 1. Màn hình xác nhận bàn giao (Ưu tiên hiển thị khi nhấn bàn giao nghiệp vụ)
    if (isViewingHandover) {
      return (
        <HandoverSummaryView 
          onBack={() => setIsViewingHandover(false)} 
          onConfirm={() => {
            setIsViewingHandover(false);
            setIsViewingMenu(false);
            setIsWorking(false); // Kết thúc trạng thái đang làm việc
            setActiveTab('home'); // Quay về trang chủ
          }} 
        />
      );
    }

    // 2. Màn hình Thông báo
    if (isViewingNotifications) {
      return <NotificationView onBack={() => setIsViewingNotifications(false)} />;
    }

    // 3. Tóm tắt công việc
    if (selectedAppt) {
      return <AppointmentSummaryView appointment={selectedAppt} onBack={() => setSelectedAppt(null)} />;
    }

    // 4. Màn hình Biểu đồ chi tiết
    if (detailSource) {
      return (
        <PatientDetailView 
          onBack={() => {
            if (detailSource === 'menu') {
              setIsViewingMenu(true);
            }
            setDetailSource(null);
          }} 
        />
      );
    }

    // 5. Menu chức năng Nghiệp vụ
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
          // CẬP NHẬT: Mở màn hình tóm tắt bàn giao thay vì alert
          onOpenHandover={() => setIsViewingHandover(true)}
        />
      );
    }

    // 6. Màn hình điền phiếu chăm sóc
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

    // 7. Các Tab điều hướng chính
    switch(activeTab) {
      case 'profile': 
        return <ProfileView onLogout={() => setIsLoggedIn(false)} />;
      case 'calendar': 
        return <ScheduleView onAppointmentClick={(data) => setSelectedAppt(data)} />;
      default: return (
        <MainHomeView 
          isStarted={isWorking} 
          onStart={() => setIsViewingMenu(true)}
          onDetail={() => setDetailSource('home')}
        />
      );
    }
  };

  return (
    <div className="h-screen bg-white max-w-[430px] border mx-auto relative overflow-hidden flex flex-col shadow-2xl font-sans text-slate-900">
      <Header onOpenNotifications={() => setIsViewingNotifications(true)} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar">
        {renderContent()}
      </main>
      
      {/* Ẩn BottomNav nếu đang ở các màn hình chi tiết hoặc bàn giao */}
      {!isWorking && !detailSource && !selectedAppt && !isViewingMenu && !isViewingNotifications && !isViewingHandover && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;