import React from 'react';

const ProfileView = ({ onLogout }) => {
  const userInfo = [
    { label: "社員番号", value: "ST-19970101" }, 
    { label: "氏名", value: "上原 小原" },
    { label: "生年月日", value: "1997年01月01日" },
    { label: "性別", value: "女性" },
    { label: "役職", value: "介護職（ケアギバー）" },
    { label: "保有資格", value: "介護職員初任者研修（旧2級）" }, 
    { label: "所属拠点", value: "ケアコネクト介護センター 沖縄支店" },
    { label: "入社日", value: "2023年05月15日" }
  ];

  return (
    <div className="px-5 pt-4 pb-10 animate-in fade-in duration-300 font-sans">
      <h2 className="text-2xl font-black text-slate-800 mb-6 tracking-tighter uppercase">アカウント情報</h2>
      
      {/* スタッフプロフィール概要 */}
      <div className="flex flex-col items-center mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
          <img 
            src="/kangoshi_female.jpg" 
            alt="スタッフアバター" 
            className="w-full h-full object-cover" 
          />
        </div>
        <h3 className="text-xl font-black text-slate-800">上原 小原</h3>
        <p className="text-[10px] text-teal-600 font-black uppercase tracking-[0.2em] mt-1 px-3 py-1 bg-teal-50 rounded-full border border-teal-100">
          正社員
        </p>
      </div>

      {/* 詳細情報リスト */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {userInfo.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 flex justify-between items-start ${index !== userInfo.length - 1 ? 'border-b border-slate-50' : ''}`}
          >
            <div className="w-1/3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</p>
            </div>
            <div className="w-2/3 text-right">
              <p className="text-sm font-bold text-slate-700 leading-tight">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 操作ボタン */}
      <div className="mt-8 space-y-3">
        <button className="w-full py-4 text-xs font-black text-slate-600 bg-slate-100 rounded-xl active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer">
          パスワード変更
        </button>
        
        {/* Nút đăng xuất kết nối với logic hệ thống */}
        <button 
          onClick={onLogout}
          className="w-full py-4 text-xs font-black text-red-500 border border-red-100 bg-red-50 rounded-xl active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default ProfileView;