export default function Dashboard({ onOpenModal }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="💧" val="1.2L" label="Nước uống" color="blue" />
        <StatCard icon="🍚" val="75%" label="Lượng ăn" color="emerald" />
        <StatCard icon="⚠️" val="2" label="Cảnh báo" color="orange" />
        <StatCard icon="😷" val="3" label="Sặc/ho" color="red" />
      </div>

      {/* Alerts */}
      <section>
        <h3 className="font-bold mb-3 flex items-center gap-2">🚨 Cảnh báo hệ thống</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-2">
          <p className="text-red-800 font-bold text-sm leading-tight">Lượng nước uống ít</p>
          <p className="text-red-700 text-xs mt-1">Chỉ uống 1.2L (Mục tiêu 1.5L)</p>
        </div>
      </section>

      {/* Patient Card */}
      <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">NM</div>
          <div>
            <h4 className="font-bold">Nguyễn Văn Minh</h4>
            <p className="text-xs text-slate-500">73 tuổi • Nam • Phòng 302</p>
          </div>
        </div>
        <button 
          onClick={onOpenModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-md flex justify-center gap-2"
        >
          <span>➕</span> Ghi nhận bữa ăn
        </button>
      </section>
    </div>
  );
}

function StatCard({ icon, val, label, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
      <div className={`text-xl mb-1`}>{icon}</div>
      <div className="text-xl font-black text-slate-800">{val}</div>
      <div className="text-[11px] text-slate-500 font-medium uppercase tracking-tighter">{label}</div>
    </div>
  );
}