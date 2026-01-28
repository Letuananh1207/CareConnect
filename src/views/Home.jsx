// src/views/Home.jsx
import ScheduleCard from "../components/ScheduleCard";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-100 rounded-full"></div> {/* Placeholder Logo */}
          <h1 className="text-xl font-bold">CareConnect</h1>
        </div>
        <button className="text-xl">🔔</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="px-4 mt-4 font-semibold">Lịch trình sắp tới</h2>
        
        <div className="text-center mt-20 mb-4">
          <p className="font-bold">Sẽ bắt đầu vào : 15h00</p>
        </div>

        <ScheduleCard />
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center border-t py-4">
        <button className="text-2xl">👤</button>
        <button className="text-2xl">🏠</button>
        <button className="text-2xl">📅</button>
      </div>
    </div>
  );
};

export default Home;