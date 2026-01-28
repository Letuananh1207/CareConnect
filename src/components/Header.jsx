import React from 'react';
import { Bell } from 'lucide-react';
import logo from '../assets/logo.png'; 

const Header = ({ onOpenNotifications }) => {
  return (
    <header className="flex justify-between items-center p-5 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
          <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">CareConnect</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Nút chuông thông báo */}
        <button 
          onClick={onOpenNotifications} 
          className="relative cursor-pointer p-1 hover:bg-slate-50 rounded-full transition-colors active:scale-90"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm cursor-pointer">
          <img src="/kangoshi_female.jpg" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;