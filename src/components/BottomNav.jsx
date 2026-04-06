import React from 'react';
import { Settings, Home, BookOpen, Glasses } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => (
  <nav className="bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-8">
    
    {/* 1. Home Tab */}
    <button onClick={() => setActiveTab('home')} className="p-2 transition-all active:scale-90">
      <Home 
        className={`w-8 h-8 ${activeTab === 'home' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>


    {/* 2. AR Glass Tab (Mới) */}
    <button onClick={() => setActiveTab('ar_status')} className="p-2 transition-all active:scale-90">
      <Glasses 
        className={`w-8 h-8 ${activeTab === 'ar_status' ? 'text-[#75a7a4]' : 'text-slate-300'}`} 
      />
    </button>

    {/* 3. Manual Tab */}
    <button onClick={() => setActiveTab('manual')} className="p-2 transition-all active:scale-90">
      <BookOpen 
        className={`w-8 h-8 ${activeTab === 'manual' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>

    {/* 4. Settings Tab */}
    <button onClick={() => setActiveTab('settings')} className="p-2 transition-all active:scale-90">
      <Settings
        className={`w-8 h-8 ${activeTab === 'settings' ? 'text-slate-800' : 'text-slate-300'}`} 
      />
    </button>
  </nav>
);

export default BottomNav;