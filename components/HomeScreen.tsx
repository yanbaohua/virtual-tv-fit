import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0c131d] dark:text-white overflow-hidden selection:bg-primary selection:text-white">
      <main className="flex-1 flex flex-col items-center justify-between px-0 w-full mx-auto relative pt-0 pb-4">
        {/* Background Gradient Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/10 dark:to-purple-900/10 blur-3xl rounded-full -z-10 pointer-events-none"></div>

        {/* Hero Image - Flexible height with max constraint */}
        <div className="w-full relative group flex-1 min-h-0 shrink basis-auto max-h-[50vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light dark:to-background-dark z-10 pointer-events-none h-full w-full"></div>
          <div className="w-full h-full overflow-hidden">
            <img
              alt="Minimalist abstract 3D composition of a modern living room"
              className="w-full h-full object-cover object-top opacity-90 dark:opacity-80 transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc5jNfn5OsRBUtCwy46v2ehWjIG-Jy_xbncbiVKLfrYdNAwDR_cTbTdiS5se01UqB1M4zvTEiVcGdu3eEEucTMMW8mpnVUPf9whQsTSrIBNTXrIDpedrSsecFnrN00lpcX1Cgu8arlSYyNeKwizn0zrXDaMUtk_5mgi-L4hjpfd3M_AxM1DRzPgbYRJJi_leVn_dp-cOJJQI9Xo31efJ467zdZd6ngogpz39uubUTQa-hwEdJj98QQgNHrF1Nr5O6kW8c4UelByrz9"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mt-3 mb-3 relative z-10 px-6 max-w-md mx-auto shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-1 text-slate-900 dark:text-slate-100">
            <span className="block text-lg font-medium text-slate-500 dark:text-slate-400 mb-0.5">足不出户，</span>
            <span className="whitespace-nowrap">找到适合你家的尺寸</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 px-4 font-normal">
            利用AR和AI技术，在购买前预览真实效果
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mb-4 relative z-10 px-6 max-w-md mx-auto shrink-0">
          <button
            onClick={() => onNavigate(AppScreen.AR_STEP_1)}
            className="group relative flex items-center justify-center w-full max-w-[260px] h-12 bg-primary hover:bg-blue-700 text-white rounded-full shadow-glow transition-all duration-300 transform active:scale-95"
          >
            <span className="material-symbols-outlined mr-2 text-[22px] group-hover:rotate-12 transition-transform">photo_camera</span>
            <span className="text-sm font-bold tracking-wide">开始测量</span>
            <div className="absolute inset-0 rounded-full border border-white/20"></div>
          </button>
        </div>
      </main>

      {/* Footer Steps */}
      <footer className="w-full max-w-md mx-auto px-6 pb-4 pt-2 shrink-0">
        <div className="text-center mb-3">
          <h2 className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">只需三步</h2>
        </div>
        <div className="flex justify-between items-start relative px-2">
          {/* Connector Line */}
          <div className="absolute top-[24px] left-[15%] right-[15%] h-[1px] bg-slate-200 dark:bg-slate-800 -z-0"></div>

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-2 shadow-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">拍照</p>
            <p className="text-[9px] text-slate-400 mt-0.5">扫描环境</p>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-2 shadow-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">straighten</span>
            </div>
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">测距</p>
            <p className="text-[9px] text-slate-400 mt-0.5">智能识别</p>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-2 shadow-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">tv_gen</span>
            </div>
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">虚拟摆放</p>
            <p className="text-[9px] text-slate-400 mt-0.5">实时预览</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;