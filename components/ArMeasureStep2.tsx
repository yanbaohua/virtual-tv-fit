import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const ArMeasureStep2: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="font-sans bg-background-light dark:bg-background-dark text-slate-900 h-screen w-full overflow-hidden selection:bg-primary/30 relative">
      <div className="relative h-full w-full flex flex-col group/design-root">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            alt="Modern minimalist living room interior with white walls" 
            className="h-full w-full object-cover object-center opacity-90" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5-S2CF2WHpbucoTJ9bA6gvHeDnMq1gWyqCmpgTIzkVUKSClztOjDlEY01qZFY_kpcYgbaKNU9-gGRghuhenv6PoYEzVficMgNlfqVyyBqoTG_iRyxNwAjMDdNTRS0xejyXCYVhXgdCmHQzibZI0AEKZlgs2BkxQI_e-mv5wt0Rjb5AzoVUmdm6HaWkPAMBfH7X1Z-b8VthxL7SStGZb69P7Wb0L69ILeFzF2oa3Oul_w6cLrk_Eo9WVzDm3H2qFnS422Gq5WShdsO"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none"></div>
          <div className="absolute inset-0 ar-grid opacity-20 pointer-events-none"></div>
        </div>

        {/* Top UI */}
        <div className="relative z-30 w-full pt-safe-top">
          <div className="flex items-center p-4 pb-2 justify-between text-white mt-8">
            <button onClick={() => onNavigate(AppScreen.HOME)} className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
            <div className="flex flex-col items-center flex-1">
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">步骤 1 / 3</span>
              <h2 className="text-white text-lg font-bold leading-tight tracking-tight text-center drop-shadow-md">墙面尺寸测量</h2>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[28px]">help</span>
            </button>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-3 py-2">
            <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(0,82,204,0.6)]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Main AR UI */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
          
          {/* Top Width Indicator */}
          <div className="absolute top-[45%] w-full flex flex-col items-center">
            <div className="relative w-4/5 h-px bg-primary/80 shadow-[0_0_8px_rgba(0,82,204,0.8)] flex justify-between items-center">
              <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full mt-1"></div>
              </div>
              <div className="absolute right-0 translate-x-1/2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full mt-1"></div>
              </div>
              <div className="absolute top-[-34px] left-1/2 -translate-x-1/2 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-[14px]">width</span>
                电视墙宽度: 4.2m
              </div>
            </div>
          </div>

          {/* Distance Info (Background) */}
          <div className="absolute top-[32%]">
            <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white/95 backdrop-blur-xl pl-3 pr-4 shadow-lg ring-1 ring-white/50">
              <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
              <p className="text-slate-900 text-xs font-bold leading-normal tracking-tight">沙发至墙面距离: <span className="text-primary text-sm">3.5m</span></p>
            </div>
          </div>

          {/* Center Reticle */}
          <div className="relative flex items-center justify-center size-14">
            <div className="size-2 bg-primary rounded-full shadow-[0_0_12px_rgba(0,82,204,1)] z-20"></div>
            <div className="absolute inset-0 rounded-full border-[2px] border-white/80 shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
            <div className="absolute w-full h-[1px] bg-white/40"></div>
            <div className="absolute h-full w-[1px] bg-white/40"></div>
          </div>

          {/* Line to bottom */}
          <div className="relative w-full h-24 flex justify-center items-start">
            <div className="h-full w-[1px] border-l border-dashed border-primary/40"></div>
            <div className="absolute bottom-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Brackets */}
          <div className="absolute inset-x-14 top-1/4 bottom-1/4 opacity-30">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white rounded-br"></div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full z-20 flex flex-col items-center justify-end pb-10 gap-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
          <div className="px-6 py-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl">
            <p className="text-white text-sm font-medium leading-normal text-center flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary animate-pulse text-[18px]">radar</span>
              请横向扫描以确认电视墙尺寸
            </p>
          </div>
          <div className="flex w-full px-8 justify-center">
            <button 
              onClick={() => onNavigate(AppScreen.AR_STEP_3)}
              className="flex w-full max-w-[320px] cursor-pointer items-center justify-center rounded-full h-14 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,82,204,0.4)] border border-white/20"
            >
              <span className="text-white text-lg font-bold leading-normal tracking-wide mr-2">完成</span>
              <span className="material-symbols-outlined text-white text-[20px]">check</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArMeasureStep2;