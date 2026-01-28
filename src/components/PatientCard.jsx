import React from 'react';
import { Search } from 'lucide-react'; 

const PatientCard = ({ isStarted, onStart, onDetail }) => {
  return (
    <div className="mx-4 mt-8 bg-white border border-gray-200 rounded-xs p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* 居室番号 (Số phòng) */}
        <div className="text-2xl font-black pt-2 text-gray-800">205B</div>
        
        {/* 区切り線 (Đường kẻ) */}
        <div className="w-[1px] h-16 bg-gray-400"></div>

        {/* 入居者情報 (Thông tin người cư trú) */}
        <div className="flex-1 text-gray-800">
          <p className="text-sm"><span className="font-bold">氏名 :</span> 廣瀬 海</p>
          <p className="text-sm mt-0.5 italic text-slate-500 font-medium">
            <span className="font-bold not-italic text-gray-800">呼称 :</span> 海さん
          </p>
          <p className="text-sm mt-0.5"><span className="font-bold">年齢 :</span> 76歳</p>
        </div>

        {/* プロフィール写真 (Ảnh đại diện) */}
        <img 
          src="/patient_man.jpg" 
          alt="Avatar" 
          className="w-20 h-20 rounded-lg object-cover border border-gray-300 shadow-sm"
        />
      </div>

      {/* 警告セクション (Phần cảnh báo) */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-300 font-sans">
        <p className="text-red-500 font-bold text-[10px] uppercase tracking-wider">重要通知 :</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-red-600 font-medium text-sm text-justify">食事摂取量が急激に減少しています</p>
          
          {/* 詳細ボタン (Nút chi tiết) */}
          <button 
            onClick={onDetail}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all active:scale-90 cursor-pointer shadow-sm border border-slate-200"
            title="詳細を見る"
          >
            <Search className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* アクションボタン (Nút hành động) */}
      <button 
        onClick={onStart}
        className={`w-full py-4 mt-8 font-bold rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer ${
          isStarted 
          ? 'bg-gray-800 text-white hover:bg-black' 
          : 'text-white shadow-sm'
        }`}
        style={!isStarted ? { 
          backgroundColor: '#75a7a4',
        } : {}}
        onMouseOver={(e) => !isStarted && (e.currentTarget.style.backgroundColor = '#5f8d8a')}
        onMouseOut={(e) => !isStarted && (e.currentTarget.style.backgroundColor = '#75a7a4')}
      >
        {isStarted ? "ケア実施中..." : "到着しました。ケアを開始する"}
      </button>
    </div>
  );
};

export default PatientCard;