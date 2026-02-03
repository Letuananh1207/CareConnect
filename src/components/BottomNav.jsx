import React from 'react';
import { Settings, Home, BookOpen } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => (
  <nav className="bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-8">
    {/* Nút Lịch sử bàn giao mới */}
    <button onClick={() => setActiveTab('settings')} className="p-2 transition-all active:scale-90">
      <Settings
        className={`w-8 h-8 ${activeTab === 'settings' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>

    <button onClick={() => setActiveTab('home')} className="p-2 transition-all active:scale-90">
      <Home 
        className={`w-8 h-8 ${activeTab === 'home' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>

    <button onClick={() => setActiveTab('manual')} className="p-2 transition-all active:scale-90">
      <BookOpen 
        className={`w-8 h-8 ${activeTab === 'manual' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>
  </nav>
);

export default BottomNav;