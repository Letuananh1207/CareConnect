import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import logo from '../assets/logo.png'; 

const LoginView = ({ onLogin }) => {
  const brandColor = "#75a7a4";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ staffId: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic đã sửa: Nhấn là thành công, không check input
    onLogin();
  };

  return (
    <div className="h-full flex flex-col bg-white font-sans animate-in fade-in duration-300">
      {/* Phần Logo & Chào mừng */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 mb-6 animate-in zoom-in duration-700">
          <img src={logo} alt="CareConnect Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter mb-2">
          CareConnect
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
          介護支援システム
        </p>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Nhập mã nhân viên */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              社員番号
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#75a7a4] transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="例：ST-19970101"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#75a7a4]/30 focus:bg-white transition-all shadow-inner"
                value={formData.staffId}
                onChange={(e) => setFormData({...formData, staffId: e.target.value})}
              />
            </div>
          </div>

          {/* Nhập mật khẩu */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              パスワード
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#75a7a4] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold outline-none focus:border-[#75a7a4]/30 focus:bg-white transition-all shadow-inner"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button type="button" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#75a7a4]">
              パスワードをお忘れですか？
            </button>
          </div>

          {/* Nút Đăng nhập */}
          <button 
            type="submit"
            className="w-full py-4 mt-6 rounded-2xl font-black text-white shadow-xl shadow-slate-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3"
            style={{ backgroundColor: brandColor }}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-sm uppercase tracking-[0.2em]">ログイン</span>
          </button>
        </form>
      </div>

      {/* Footer nhỏ */}
      <div className="py-8 text-center">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
          © 2026 CareConnect Okinawa Branch
        </p>
      </div>
    </div>
  );
};

export default LoginView;