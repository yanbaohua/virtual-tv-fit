import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const AnalysisResult: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="font-sans bg-black text-slate-900 h-screen w-full overflow-hidden selection:bg-primary/30 flex items-center justify-center relative">
      <div className="relative h-full w-full mx-auto bg-slate-900 overflow-hidden flex flex-col group/design-root shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-800">
          <img 
            alt="Modern minimalist living room interior" 
            className="h-full w-full object-cover object-center opacity-70" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5-S2CF2WHpbucoTJ9bA6gvHeDnMq1gWyqCmpgTIzkVUKSClztOjDlEY01qZFY_kpcYgbaKNU9-gGRghuhenv6PoYEzVficMgNlfqVyyBqoTG_iRyxNwAjMDdNTRS0xejyXCYVhXgdCmHQzibZI0AEKZlgs2BkxQI_e-mv5wt0Rjb5AzoVUmdm6HaWkPAMBfH7X1Z-b8VthxL7SStGZb69P7Wb0L69ILeFzF2oa3Oul_w6cLrk_Eo9WVzDm3H2qFnS422Gq5WShdsO"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          <div className="absolute inset-0 ar-grid opacity-20 pointer-events-none"></div>
        </div>

        {/* Measuring Guide Lines in Background */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
          <div className="relative w-4/5 h-2/5 border border-white/40">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/60 -translate-y-1/2"></div>
            <div className="absolute top-0 right-1/4 h-full w-px bg-white/60"></div>
          </div>
        </div>

        {/* Modal Card */}
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <div className="w-full bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-7 flex flex-col items-center shadow-2xl ring-1 ring-white/20">
            
            {/* Success Icon */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-xl"></div>
              <div className="relative size-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[40px] filled">radar</span>
              </div>
              <div className="absolute -bottom-1 -right-1 size-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[14px] font-extrabold">check</span>
              </div>
            </div>

            <h1 className="text-xl font-bold text-slate-900 mb-5 font-display">评估完成</h1>

            <div className="flex flex-col gap-2.5 w-full mb-6">
              {/* Status Item */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="material-symbols-outlined text-slate-400 text-[20px]">aspect_ratio</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 leading-none mb-0.5">空间状态</span>
                  <span className="text-sm font-bold text-slate-900">墙面空间充足</span>
                </div>
              </div>

              {/* Recommendation Item */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-primary/[0.03] border border-primary/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">tv_gen</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 leading-none mb-0.5">智能建议</span>
                    <span className="text-sm font-bold text-primary">推荐 75-85 英寸电视</span>
                  </div>
                </div>
                <div className="mt-1 pt-2 border-t border-primary/5 flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-500 mt-0.5 filled text-[16px]">shield_with_heart</span>
                  <p className="text-[11px] leading-relaxed text-emerald-700">
                    <span className="font-bold">护眼距离提醒：</span><br/>
                    当前观看距离 (3.5m) 为 75-85 英寸电视的黄金护眼区
                  </p>
                </div>
              </div>
            </div>

            {/* Data Grid */}
            <div className="w-full grid grid-cols-3 gap-2 mb-8 py-4 border-y border-slate-100">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">宽度</span>
                <span className="text-base font-bold text-slate-800">4.2m</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">高度</span>
                <span className="text-base font-bold text-slate-800">2.8m</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">距离</span>
                <span className="text-base font-bold text-slate-800">3.5m</span>
              </div>
            </div>

            {/* Actions */}
            <button 
              onClick={() => onNavigate(AppScreen.TV_SELECTION)}
              className="w-full py-4 bg-[#0052CC] hover:bg-[#0045ad] active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <span className="text-white font-bold text-base">去挑选电视</span>
              <span className="material-symbols-outlined text-white text-[18px]">arrow_forward</span>
            </button>
            <button 
              onClick={() => onNavigate(AppScreen.AR_STEP_1)}
              className="mt-4 text-slate-400 text-xs font-medium hover:text-slate-600"
            >
              重新评估
            </button>
          </div>
        </div>

        {/* Background Header Overlay (Visual only) */}
        <div className="relative z-30 w-full pt-safe-top opacity-30">
          <div className="flex items-center p-4 pb-2 justify-between text-white mt-8">
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <div className="flex flex-col items-center flex-1">
              <span className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5">步骤 1 / 3</span>
              <h2 className="text-white text-base font-bold leading-tight tracking-tight text-center">AR 墙面全尺寸测量</h2>
            </div>
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-[24px]">help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;