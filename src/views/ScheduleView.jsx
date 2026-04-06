import React, { useEffect, useState, useRef } from 'react';
import { Eye } from 'lucide-react';

const ScheduleView = ({ onAppointmentClick }) => {
  const hours = Array.from({ length: 17 }, (_, i) => {
    const h = i + 6;
    return `${h < 10 ? '0' + h : h} : 00`;
  });

  const appointments = {
    "08 : 00": "101A",
    "10 : 00": "302C",
    "12 : 00": "104B",
    "14 : 00": "203B",
    "16 : 00": "205B",
    "19 : 00": "401D"
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const timelineRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // 日本語の曜日ラベル (Nhãn thứ trong tuần tiếng Nhật)
  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const formattedDate = `${currentTime.getFullYear()}年${currentTime.getMonth() + 1}月${currentTime.getDate()}日 (${dayLabels[currentTime.getDay()]})`;

  const calculateTimelinePosition = (hourStr) => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const rowHour = parseInt(hourStr.split(":")[0]);
    if (currentHour === rowHour) {
      const topPercentage = (currentMinute / 60) * 100;
      return { top: `${topPercentage}%`, display: 'block' };
    }
    return { display: 'none' };
  };

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="sticky top-0 bg-slate-50 z-30 py-4 px-5 border-b border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-gray-800 text-center tracking-tighter">
          {formattedDate}
        </h3>
      </div>
      
      <div className="px-5 pb-6 mt-4">
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md">
          <table className="w-full border-collapse">
            <tbody>
              {hours.map((hour, index) => {
                const timelineStyle = calculateTimelinePosition(hour);
                const isCurrentHour = timelineStyle.display === 'block';
                return (
                  <tr key={index} className="border-b border-gray-100 h-24 relative">
                    <td className="w-1/4 border-r border-gray-100 text-center font-black text-gray-400 text-xs bg-gray-50/30">
                      {hour}
                    </td>
                    <td className="w-3/4 p-2 relative">
                      {/* 現在時刻のタイムライン (Thanh mốc thời gian hiện tại) */}
                      <div 
                        ref={isCurrentHour ? timelineRef : null}
                        className="absolute left-[-33.33%] right-[-5%] h-[2px] z-20 pointer-events-none flex items-center"
                        style={{ ...timelineStyle, backgroundColor: '#75a7a4' }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full -ml-1.5 shadow-md border-2 border-white"
                          style={{ backgroundColor: '#75a7a4' }}
                        ></div>
                      </div>
                      
                      {appointments[hour] && (
                        <div 
                          onClick={() => onAppointmentClick({ room: appointments[hour], time: hour })}
                          className="rounded-xl px-4 py-3 flex items-center justify-between mx-1 shadow-sm active:scale-95 transition-all cursor-pointer border group"
                          style={{ 
                            backgroundColor: '#f1f7f7', 
                            borderColor: '#75a7a4' 
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="font-black text-sm text-gray-800">{appointments[hour]} 居室</span>
                            <span 
                              className="text-[10px] font-black uppercase mt-0.5 tracking-wider"
                              style={{ color: '#75a7a4' }}
                            >
                              定期ケア (定期巡回)
                            </span>
                          </div>
                          <Eye className="w-5 h-5 text-gray-300 group-hover:text-[#75a7a4] transition-colors" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;