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
import NotificationView from './components/NotificationView'; // Import mới

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);
  const [isViewingMenu, setIsViewingMenu] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [detailSource, setDetailSource] = useState(null); 
  
  // MỚI: Trạng thái xem thông báo
  const [isViewingNotifications, setIsViewingNotifications] = useState(false);

  const renderContent = () => {
    // 1. Màn hình Thông báo (Khi click vào Bell ở Header)
    if (isViewingNotifications) {
      return <NotificationView onBack={() => setIsViewingNotifications(false)} />;
    }

    // 2. Tóm tắt công việc (từ tab Lịch trình)
    if (selectedAppt) {
      return <AppointmentSummaryView appointment={selectedAppt} onBack={() => setSelectedAppt(null)} />;
    }

    // 3. Màn hình Biểu đồ chi tiết (PatientDetailView)
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

    // 4. Menu chức năng AR/Phiếu chăm sóc
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
        />
      );
    }

    // 5. Màn hình điền phiếu chăm sóc
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

    // 6. Các Tab điều hướng chính
    switch(activeTab) {
      case 'profile': return <ProfileView />;
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
      {/* Truyền hàm mở thông báo vào Header */}
      <Header onOpenNotifications={() => setIsViewingNotifications(true)} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar">
        {renderContent()}
      </main>
      
      {/* Ẩn BottomNav nếu đang ở màn hình phụ hoặc thông báo */}
      {!isWorking && !detailSource && !selectedAppt && !isViewingMenu && !isViewingNotifications && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;