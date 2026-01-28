import React from 'react';
import { Activity, AlertTriangle, ChevronLeft, Info, Heart, ShieldAlert, Calendar, MapPin } from 'lucide-react';

const PatientDetailView = ({ onBack }) => {
  const brandColor = "#75a7a4";

  const chartData = [
    { date: "22/01", value: 90, x: 50, y: 50 },
    { date: "23/01", value: 85, x: 100, y: 55 },
    { date: "24/01", value: 80, x: 150, y: 60 },
    { date: "25/01", value: 40, x: 200, y: 110 }, 
    { date: "26/01", value: 65, x: 250, y: 80 },
    { date: "27/01", value: 75, x: 300, y: 70 },
    { date: "28/01", value: 80, x: 350, y: 65 },
  ];

  const patientInfo = {
    name: "廣瀬 海",
    nickname: "海さん",
    dob: "1950年12月05日",
    age: 76,
    gender: "男性",
    hometown: "日本、沖縄県",
    kaigodo: "要介護 2", 
    bloodType: "O型",
    conditions: ["高血圧", "軽度認知症"],
    interests: ["演歌鑑賞", "園芸"],
    dietaryNote: "軟食、細刻み。嚥下困難のため、水分摂取時のむせに注意が必要。",
    behaviorNote: "夕暮れ症候群による夕方の見当識障害あり。",
    allergies: ["えび", "花粉"],
    mobility: "杖 / 車椅子併用",
    history: "元小学校教師",
  };

  return (
    <div className="px-5 pb-10 animate-in fade-in zoom-in-95 duration-300 bg-[#FDFDFD] min-h-full font-sans text-slate-800">
      {/* ヘッダー (Header) */}
      <div className="flex items-center gap-4 mb-6 pt-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-700">利用者詳細情報</h2>
      </div>

      {/* 安全警告 (Cảnh báo an toàn) */}
      <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
        <div>
          <p className="text-[10px] font-black text-red-700 uppercase tracking-widest">リスク警告</p>
          <p className="text-xs font-bold text-red-600">嚥下介助：誤嚥リスク高（嚥下障害）</p>
        </div>
      </div>

      {/* 基本情報カード (Thẻ thông tin cơ bản) */}
      <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex gap-4 items-start relative overflow-hidden">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">入居者氏名</p>
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-black text-slate-800 leading-none">{patientInfo.name}</p>
              <p className="text-xs italic text-slate-400 font-bold">（{patientInfo.nickname}）</p>
            </div>
            <div className="flex items-center gap-3 mt-2 text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span className="text-[11px] font-bold">{patientInfo.dob}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="text-[11px] font-bold">{patientInfo.hometown}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">年齢 / 性別</p>
              <p className="text-[12px] font-black text-slate-700">{patientInfo.age}歳 / {patientInfo.gender}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">要介護度 / 血液型</p>
              <p className="text-[12px] font-black" style={{ color: brandColor }}>{patientInfo.kaigodo} - {patientInfo.bloodType}</p>
            </div>
          </div>
        </div>
        <img src="/patient_man.jpg" alt="Patient" className="w-20 h-20 rounded-xl object-cover border-2 border-slate-50 shadow-md grayscale-[0.1]" />
      </div>

      {/* アレルギー・趣味 (Dị ứng & Sở thích) */}
      <div className="mt-6 grid grid-cols-1 gap-3">
        <div className="flex gap-3">
          <div className="flex-1 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="w-3 h-3 text-red-400" />
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">アレルギー</p>
            </div>
            <p className="text-xs font-bold text-slate-700">{patientInfo.allergies.join("、 ")}</p>
          </div>
          <div className="flex-1 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-3 h-3 text-pink-400" />
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">趣味・嗜好</p>
            </div>
            <p className="text-xs font-bold text-slate-700">{patientInfo.interests.join("、 ")}</p>
          </div>
        </div>
      </div>

      {/* 食事摂取量トレンド (Biểu đồ xu hướng lượng ăn) */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5" style={{ color: brandColor }} />
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">食事摂取量推移</h2>
        </div>
        <div className="border border-slate-100 rounded-3xl p-4 bg-white shadow-sm overflow-hidden">
          <svg viewBox="0 0 400 180" className="w-full h-full font-bold">
            <g className="text-[10px] fill-slate-300">
              <text x="35" y="45" textAnchor="end">100%</text>
              <text x="35" y="85" textAnchor="end">50%</text>
              <text x="35" y="125" textAnchor="end">0%</text>
            </g>
            <line x1="45" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="45" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="45" y1="120" x2="380" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <path d={`M ${chartData.map(d => `${d.x},${d.y}`).join(' L ')}`} fill="none" stroke={brandColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {chartData.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="4" fill={d.value < 50 ? "#ef4444" : brandColor} />
                <text x={d.x} y="150" textAnchor="middle" className="text-[9px] fill-slate-400 uppercase tracking-tighter">{d.date.split('/')[0]}日</text>
                { (i === 3 || i === 6) && <text x={d.x} y={d.y - 10} textAnchor="middle" className={`text-[10px] font-black ${d.value < 50 ? "fill-red-500" : "fill-slate-600"}`}>{d.value}%</text> }
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* 食事介助の指示 (Chỉ dẫn dinh dưỡng) */}
      <div className="mt-6 p-4 rounded-2xl border" style={{ backgroundColor: '#f1f7f7', borderColor: brandColor }}>
        <p className="text-[10px] font-black uppercase mb-1" style={{ color: brandColor }}>食事介助の注意事項</p>
        <p className="text-xs leading-relaxed text-slate-700 font-bold">{patientInfo.dietaryNote}</p>
      </div>

      <button onClick={onBack} className="w-full mt-4 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all cursor-pointer" style={{ backgroundColor: brandColor }}>
        戻る
      </button>
    </div>
  );
};

export default PatientDetailView;