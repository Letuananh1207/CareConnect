import React, { useState } from 'react';
import { ChevronDown, Save, Droplets, ChevronLeft } from 'lucide-react';

const CareRecordView = ({ onBack }) => {
  const brandColor = "#75a7a4";
  
  // 介護専門用語のデータ
  const foodTypes = ["常食", "軟食", "キザミ食", "ミキサー食"];
  const postures = ["椅子座位 (90°)", "リクライニング (45°)", "側臥位", "ベッド座位 (30°)"];
  const consumptionLevels = ["完食", "75% 摂取", "50% 摂取", "25% 摂取", "全残"];

  const [selectedFood, setSelectedFood] = useState("");
  const [selectedPosture, setSelectedPosture] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  return (
    <div className="px-5 pt-4 pb-10 animate-in slide-in-from-right duration-300 bg-white min-h-full font-sans text-slate-800">
      
      {/* ヘッダー: 戻るボタンとタイトル */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:scale-90"
        >
          <ChevronLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
          介護実施記録 (食事)
        </h2>
      </div>

      <div className="mb-8 space-y-8">
        {/* セクション 1: 食事・水分 */}
        <div className="space-y-3">
          <span className="bg-slate-100 text-slate-500 px-3 py-1 text-[10px] font-black rounded-sm inline-block uppercase tracking-widest border border-slate-200">
            1. 食事内容・摂取量
          </span>
          <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="font-bold text-sm text-slate-700">食事形態:</label>
              <div className="relative w-40">
                <select 
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm appearance-none bg-slate-50 outline-none"
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                >
                  <option value="">-- 選択 --</option>
                  {foodTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-bold text-sm text-slate-700">主食摂取量:</label>
              <div className="relative w-40">
                <select 
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm appearance-none bg-slate-50 outline-none"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="">-- 選択 --</option>
                  {consumptionLevels.map((lvl, i) => <option key={i} value={lvl}>{lvl}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-slate-50 pt-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <label className="font-bold text-sm text-slate-700">水分摂取 (ml):</label>
              </div>
              <input 
                type="number" 
                placeholder="例: 200"
                className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-right outline-none"
              />
            </div>
          </div>
        </div>

        {/* セクション 2: 姿勢・安全 */}
        <div className="space-y-3">
          <span className="bg-slate-100 text-slate-500 px-3 py-1 text-[10px] font-black rounded-sm inline-block uppercase tracking-widest border border-slate-200">
            2. 食事姿勢・安全性
          </span>
          <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="font-bold text-sm text-slate-700">食事姿勢:</label>
              <div className="relative w-40">
                <select 
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm appearance-none bg-slate-50 outline-none"
                  value={selectedPosture}
                  onChange={(e) => setSelectedPosture(e.target.value)}
                >
                  <option value="">-- 選択 --</option>
                  {postures.map((p, i) => <option key={i} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-50 pt-3">
              <label className="font-bold text-sm text-slate-700">とろみ使用:</label>
              <input type="checkbox" className="w-6 h-6 rounded border-slate-300" style={{ accentColor: brandColor }} />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-bold text-sm text-red-600 italic">むせ・咳き込みあり:</label>
              <input type="checkbox" className="w-6 h-6 accent-red-600 rounded border-slate-300" />
            </div>
          </div>
        </div>

        {/* セクション 3: 特記事項 */}
        <div className="space-y-2 px-1">
          <label className="font-black text-[10px] text-slate-400 uppercase tracking-widest">
            特記事項・観察メモ
          </label>
          <textarea 
            placeholder="例：食事中の傾眠傾向あり、声掛けを頻繁に行った..."
            className="w-full border border-slate-200 rounded-xl h-24 p-3 text-sm focus:bg-white focus:outline-none transition-all resize-none bg-slate-50"
          ></textarea>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="px-10">
        <button 
          onClick={onBack}
          className="w-full text-white py-3 rounded-lg font-black text-[12px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          style={{ backgroundColor: brandColor }}
        >
          <Save className="w-4 h-4" />
          記録を保存する
        </button>
      </div>
    </div>
  );
};

export default CareRecordView;