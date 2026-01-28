import { User, Home, Calendar } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => (
  <nav className=" bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-8">
    <button onClick={() => setActiveTab('profile')} className="p-2">
      <User className={`w-8 h-8 ${activeTab === 'profile' ? 'text-gray-800' : 'text-gray-300'}`} />
    </button>
    <button onClick={() => setActiveTab('home')} className="p-2">
      <Home className={`w-8 h-8 ${activeTab === 'home' ? 'text-gray-800' : 'text-gray-300'}`} />
    </button>
    <button onClick={() => setActiveTab('calendar')} className="p-2">
      <Calendar className={`w-8 h-8 ${activeTab === 'calendar' ? 'text-gray-800' : 'text-gray-300'}`} />
    </button>
  </nav>
);


export default BottomNav;