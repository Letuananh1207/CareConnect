// src/components/ScheduleCard.jsx
const ScheduleCard = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mx-4 my-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">205B</span>
        <div className="flex-1 px-4 border-l-2 border-black ml-4">
          <p><strong>Tên :</strong> Umi Hirose</p>
          <p><strong>Tuổi :</strong> 76</p>
          <button className="text-xs underline block mt-1">Chi tiết</button>
        </div>
        <img 
          src="https://via.placeholder.com/60" 
          alt="Patient" 
          className="rounded-md w-16 h-16 object-cover"
        />
      </div>

      <div className="mt-4 pt-4 border-t border-dashed">
        <p className="text-gray-500 font-semibold text-sm">Cảnh báo :</p>
        <div className="flex justify-between items-center">
          <p className="text-red-500">Số lượng ăn đang giảm đột ngột</p>
          <button className="text-xs underline">Chi tiết</button>
        </div>
      </div>

      <button className="w-full bg-gray-300 py-3 mt-6 font-bold rounded">
        Tôi đã đến nơi hãy bắt đầu
      </button>
    </div>
  );
};

export default ScheduleCard;