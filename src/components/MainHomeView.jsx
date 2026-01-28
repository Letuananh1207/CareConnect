import React from 'react';
import PatientCard from './PatientCard';

const MainHomeView = ({ onStart, isStarted, onDetail }) => {
  // 介護スケジュールのデータ (Dữ liệu lịch trình chăm sóc)
  const roomsToday = [
    { id: '104B', time: '12:00', status: 'done' },
    { id: '203B', time: '14:00', status: 'done' },
    { id: '205B', time: '15:00', status: 'active' }, // 現在の入居者
    { id: '301A', time: '16:00', status: 'pending' },
    { id: '302A', time: '17:00', status: 'pending' },
  ];

  return (
    <div className="h-full flex flex-col px-5 pt-4 animate-in fade-in duration-300 bg-slate-50">
      
      {/* 部屋の選択 (Phần chọn phòng dạng ngang) */}
      <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex gap-3 justify-start min-w-max">
          {roomsToday.map((room) => (
            <div key={room.id} className="flex flex-col items-center gap-1">
              <div 
                className={`
                  w-14 h-14 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all
                  ${room.status === 'active' 
                    ? 'text-white shadow-md scale-105' 
                    : room.status === 'done'
                      ? 'bg-gray-100 border-gray-200 text-gray-400'
                      : 'bg-white border-gray-300 text-gray-600'}
                `}
                style={room.status === 'active' ? { backgroundColor: '#75a7a4', borderColor: '#75a7a4' } : {}}
              >
                {room.id}
              </div>
              <span 
                className={`text-[10px] font-bold ${room.status === 'active' ? '' : 'text-gray-500'}`}
                style={room.status === 'active' ? { color: '#75a7a4' } : {}}
              >
                {room.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center font-sans">
        {/* "Bệnh nhân tiếp theo" chuyển sang thuật ngữ Kaigo chuyên dụng */}
        <p className="text-xl font-black text-gray-900 tracking-tighter">
          次回の訪問対象者
        </p>
      </div>

      <PatientCard 
        isStarted={isStarted} 
        onStart={onStart} 
        onDetail={onDetail} 
      />
      
      <div className='flex-1 mt-15'></div>
    </div>
  );
};

export default MainHomeView;