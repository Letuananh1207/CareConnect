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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [detailSource, setDetailSource] = useState(null); 
  const [isViewingNotifications, setIsViewingNotifications] = useState(false);

  // 1. Nếu chưa đăng nhập, chỉ render màn hình Login
  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-white max-w-[430px] border mx-auto relative overflow-hidden shadow-2xl">
        <LoginView onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const renderContent = () => {
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

    // 5. Menu chức năng Nghiệp vụ (CareMenuView)
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
          // Thêm prop này nếu bạn muốn xử lý bàn giao ca tại đây
          onOpenHandover={() => {
            alert("申し送り画面へ (Chuyển sang màn hình bàn giao)");
            // setIsViewingHandover(true); 
          }}
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
      // CẬP NHẬT: Truyền onLogout vào ProfileView
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
      
      {!isWorking && !detailSource && !selectedAppt && !isViewingMenu && !isViewingNotifications && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;