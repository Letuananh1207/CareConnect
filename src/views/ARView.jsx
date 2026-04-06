import React, { useState, useEffect } from 'react';
import { 
  Scan, UserCheck, Power, Battery, Wifi, Clock, QrCode, Target, ShieldCheck
} from 'lucide-react';
import { useAR } from '../context/ARContext'; 

const ARView = () => {
  const { stage, setStage } = useAR(); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spoonAngle, setSpoonAngle] = useState(0); // Góc thìa mặc định là 0
  const [isHovering, setIsHovering] = useState(false);
  const [time, setTime] = useState(new Date());

  // Cập nhật thời gian hệ thống
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tự động chuyển từ Face ID sang Ready sau 4.5s
  useEffect(() => {
    if (stage === 'face_id') {
      const timer = setTimeout(() => setStage('ready'), 4500);
      return () => clearTimeout(timer);
    }
  }, [stage, setStage]);

  // Xử lý điều chỉnh góc thìa bằng phím lên/xuống
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stage !== 'feeding') return;

      if (e.key === 'ArrowUp') {
        setSpoonAngle(prev => Math.min(prev + 5, 90)); // Tăng góc, tối đa 90 độ
      } else if (e.key === 'ArrowDown') {
        setSpoonAngle(prev => Math.max(prev - 5, 0));  // Giảm góc, tối thiểu 0 độ
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const glowStyle = { filter: 'drop-shadow(0 0 12px #75a7a4) drop-shadow(0 0 2px #75a7a4)' };

  return (
    <div 
      className={`relative w-full h-screen bg-black overflow-hidden font-sans text-white ${stage === 'feeding' ? 'cursor-none' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* === AR SYSTEM STATUS BAR === */}
      <div className="absolute top-0 left-0 w-full z-[100] px-10 py-6 flex justify-between items-start pointer-events-none opacity-80" style={glowStyle}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-[#75a7a4]/20">
            <div className="flex items-center gap-1.5">
              <Battery size={14} className="text-[#75a7a4]" />
              <span className="text-[10px] font-mono font-bold text-[#75a7a4]">88%</span>
            </div>
            <div className="w-[1px] h-3 bg-[#75a7a4]/30" />
            <div className="flex items-center gap-1.5">
              <Wifi size={14} className="text-[#75a7a4]" />
              <span className="text-[10px] font-mono font-bold text-[#75a7a4]">5G</span>
            </div>
          </div>
          <div className="text-[8px] font-mono text-[#75a7a4]/60 ml-4">SYS_VER: 2.0.4_RAYNEO</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md px-5 py-1 rounded-full border border-[#75a7a4]/20 flex items-center gap-2">
          <Clock size={14} className="text-[#75a7a4]" />
          <span className="text-[12px] font-mono font-black text-[#75a7a4]">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* 1. HỆ THỐNG NỀN ĐỘNG */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-[1000ms] ease-in
          ${(stage === 'qr_waiting' || stage === 'qr_scan' || stage === 'not_connecting') 
            ? 'translate-y-0 opacity-40 blur-0' 
            : 'translate-y-full opacity-0 blur-md'}`}>
          <img src="/standby-bg.webp" className="w-full h-full object-cover" alt="待機画面" />
        </div>
        
        <div className={`absolute inset-0 transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1)
          ${(stage === 'qr_waiting' || stage === 'qr_scan' || stage === 'not_connecting') 
            ? 'translate-y-[-30%] opacity-0 scale-110 blur-xl' 
            : 'translate-y-0 opacity-100 scale-100 blur-0'}`}> 
          <img src="/background.webp" className="w-full h-full object-cover" alt="患者ビュー" />
        </div>
      </div>

      {/* 2. HÌNH ẢNH BỆNH NHÂN THỰC TẾ */}
      {(stage === 'face_id' || stage === 'ready' || stage === 'feeding') && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-all duration-[1000ms] opacity-100 translate-y-0 blur-0">
          <div className="w-[85%] h-[85%] flex items-center justify-center animate-in fade-in duration-1000 relative">
            <img 
              src="/patient_sit_man.png" 
              alt="ライブ映像" 
              className="max-w-full max-h-full object-contain opacity-90" 
            />
            
            {stage === 'face_id' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[400px] border-2 border-[#75a7a4] relative overflow-hidden rounded-[100px] animate-[pulse_2s_infinite] shadow-[0_0_30px_rgba(117,167,164,0.3)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(117,167,164,0.15)_1.5px,transparent_1.5px)] bg-[size:25px_25px]" />
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#75a7a4] shadow-[0_0_25px_#75a7a4,0_0_10px_#fff] animate-[scanLine_2.5s_infinite]" />
                </div>
                
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 bg-[#75a7a4] rounded-full animate-ping shadow-[0_0_10px_#75a7a4]"
                    style={{
                      top: `${35 + Math.random() * 30}%`,
                      left: `${42 + Math.random() * 16}%`,
                      animationDelay: `${i * 0.4}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* STAGE: FACE ID - HUD OVERLAY */}
      {stage === 'face_id' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
          
          {/* 1. スキャン枠 */}
          <div className="relative w-[320px] h-[420px]">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#75a7a4] rounded-tl-2xl shadow-[0_0_20px_rgba(117,167,164,0.4)]" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#75a7a4] rounded-tr-2xl shadow-[0_0_20px_rgba(117,167,164,0.4)]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#75a7a4] rounded-bl-2xl shadow-[0_0_20px_rgba(117,167,164,0.4)]" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#75a7a4] rounded-br-2xl shadow-[0_0_20px_rgba(117,167,164,0.4)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#75a7a4]/15 to-transparent animate-[scanLine_3s_infinite]" />
          </div>

          {/* 2. メイン指示 */}
          <div className="mt-14 flex flex-col items-center gap-5">
              <div className="bg-black/70 backdrop-blur-2xl px-12 py-5 rounded-[24px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-5">
                  <div className="w-7 h-7 border-[3px] border-[#75a7a4]/20 border-t-[#75a7a4] rounded-full animate-spin" />
                  <div className="flex flex-col">
                    <span className="text-white font-black text-xl tracking-tight">本人確認中...</span>
                    <span className="text-[#75a7a4] text-[11px] font-bold tracking-wider">顔を枠内に収めてください</span>
                  </div>
                </div>
                <div className="mt-5 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#75a7a4] shadow-[0_0_15px_#75a7a4] animate-[progress_4.5s_linear]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold bg-white/5 px-5 py-1.5 rounded-full border border-white/5 tracking-widest">
                <ShieldCheck size={14} className="opacity-60" />
                <span>システムが自動的に患者様を識別しています</span>
              </div>
          </div>

        </div>
      )}
      {/* STAGE: QR WAITING HOẶC NOT CONNECTING */}
      {(stage === 'qr_waiting' || stage === 'not_connecting') && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/20 pointer-events-none group">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#75a7a4] rounded-tl-3xl opacity-50" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#75a7a4] rounded-tr-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#75a7a4] rounded-bl-3xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#75a7a4] rounded-br-3xl opacity-50" />
            <QrCode size={64} className="text-[#75a7a4] relative z-10 animate-pulse" />
            <div className="text-center absolute -bottom-24 flex flex-col items-center w-full uppercase tracking-[0.2em] text-[11px] font-black text-[#75a7a4]">
              スマートフォンをかざして<br/>
              QRコードをスキャンしてください
            </div>
          </div>
        </div>
      )}

      {stage === 'qr_scan' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative animate-[handEnter_1.2s_ease-out_forwards]">
            <img src="/hand_holdQR.png" alt="QR保持" className="w-[300px] h-auto" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#75a7a4] shadow-[0_0_15px_#75a7a4] animate-[scanLine_2s_infinite_1.2s]" />
          </div>
        </div>
      )}

      {/* STAGE: READY */}
      {stage === 'ready' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 animate-in zoom-in-95 duration-500">
          <div className="bg-zinc-900/95 p-8 rounded-[40px] border border-[#75a7a4]/40 text-center max-w-sm w-full shadow-2xl backdrop-blur-md">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="w-full h-full rounded-full border-2 border-[#75a7a4] overflow-hidden p-1 bg-black">
                <img src="/patient_man.webp" alt="プロフィール" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-2">
                <UserCheck size={12} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter">廣瀬 海 (76歳)</h3>
            <p className="text-[#75a7a4] text-[9px] font-bold mt-1 uppercase tracking-widest">ID認証済み // モード: ケア</p>
            <button onClick={() => setStage('feeding')} className="mt-8 w-full py-4 bg-[#75a7a4] text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all shadow-lg">ケアセッション開始</button>
          </div>
        </div>
      )}

    {/* STAGE: FEEDING */}
    {stage === 'feeding' && isHovering && (
      <div className="absolute inset-0 pointer-events-none animate-in fade-in duration-700">
        
        {/* GÓC TRÁI TRÊN */}
        <div className="absolute top-20 left-10 z-20 space-y-4">
          <div className="bg-black/60 backdrop-blur-md border-l-4 border-emerald-500 pl-4 py-2 w-48">
            <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">姿勢検知 / POSTURE</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">65°</span>
              <span className="text-[10px] text-white/60">良好</span>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-md border-l-4 border-[#75a7a4] pl-4 py-2 w-48">
            <p className="text-[10px] text-[#75a7a4] font-bold tracking-widest uppercase">次回のスプーン / PACE</p>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[#75a7a4] animate-pulse" />
              <span className="text-2xl font-black text-white">12s</span>
            </div>
          </div>
        </div>

        {/* GÓC PHẢI TRÊN */}
        <div className="absolute top-20 right-10 z-20 space-y-4 text-right">
          <div className="bg-rose-500/20 backdrop-blur-md border-r-4 border-rose-500 pr-4 py-2 ml-auto w-40">
            <p className="text-[10px] text-rose-500 font-bold uppercase">発話ガイド</p>
            <p className="text-sm font-black text-white">今は静かに</p>
          </div>
        </div>

        {/* TẠI VỊ TRÍ CON TRỎ (THÌA) */}
        <div className="absolute z-40 transition-all duration-75" style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="absolute -top-16 -left-4 bg-black/80 px-2 py-1 rounded border border-[#75a7a4] flex flex-col items-center">
              <span className="text-[8px] text-[#75a7a4] font-bold">ANGLE</span>
              <span className={`text-sm font-black ${spoonAngle > 45 ? 'text-rose-500' : 'text-white'}`}>
                {spoonAngle}°
              </span>
            </div>

            <div className="absolute -bottom-10 left-10 flex items-center gap-2 bg-emerald-500 px-3 py-1 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">摂取量 適正 (8g)</span>
            </div>

            <img 
              src="/spoon.png" 
              className="absolute z-50 transition-transform duration-150" 
              style={{ 
                width: '180px', 
                left: '-80px', 
                top: '-65px', 
                transformOrigin: 'bottom right', 
                transform: `rotate(${-spoonAngle}deg)` 
              }} 
            />
            <img src="/hand.png" className="w-[200px] h-auto drop-shadow-2xl" style={{ transform: 'rotate(-5deg)' }} />
          </div>
        </div>

      </div>
    )}

      <style jsx>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes handEnter {
          0% { transform: translateY(400px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 84.2%; }
        }
      `}</style>
    </div>
  );
};

export default ARView;