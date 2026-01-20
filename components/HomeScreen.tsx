import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0c131d] dark:text-white overflow-x-hidden selection:bg-primary selection:text-white pb-10">
      <main className="flex-1 flex flex-col items-center justify-start px-0 w-full mx-auto relative pt-0">
        {/* Background Gradient Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/10 dark:to-purple-900/10 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        
        {/* Hero Image */}
        <div className="w-full relative group aspect-square mb-8">
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
        <div className="text-center mb-10 relative z-10 px-6 max-w-md mx-auto">
          <h1 className="text-4xl md:text-[40px] font-bold leading-[1.25] tracking-tight mb-3 text-slate-900 dark:text-slate-100">
            <span className="block text-2xl font-medium text-slate-500 dark:text-slate-400 mb-2">足不出户，</span>
            <span className="whitespace-nowrap text-3xl sm:text-4xl">找到最适合你家的电视尺寸</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 px-4 font-normal">
            利用AR和AI技术，在购买前预览真实效果
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mb-12 relative z-10 px-6 max-w-md mx-auto">
          <button 
            onClick={() => onNavigate(AppScreen.AR_STEP_1)}
            className="group relative flex items-center justify-center w-full max-w-[280px] h-16 bg-primary hover:bg-blue-700 text-white rounded-full shadow-glow transition-all duration-300 transform active:scale-95"
          >
            <span className="material-symbols-outlined mr-3 text-[28px] group-hover:rotate-12 transition-transform">photo_camera</span>
            <span className="text-lg font-bold tracking-wide">开始测量</span>
            <div className="absolute inset-0 rounded-full border border-white/20"></div>
          </button>
        </div>
      </main>

      {/* Footer Steps */}
      <footer className="w-full max-w-md mx-auto px-6 pb-6 pt-4">
        <div className="text-center mb-6">
          <h2 className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">只需三步</h2>
        </div>
        <div className="flex justify-between items-start relative px-2">
          {/* Connector Line */}
          <div className="absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-0"></div>

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-3 shadow-sm text-primary">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">拍照</p>
            <p className="text-[10px] text-slate-400 mt-0.5">扫描环境</p>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-3 shadow-sm text-primary">
              <span className="material-symbols-outlined">straighten</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">测距</p>
            <p className="text-[10px] text-slate-400 mt-0.5">智能识别</p>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-3 shadow-sm text-primary">
              <span className="material-symbols-outlined">tv_gen</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">虚拟摆放</p>
            <p className="text-[10px] text-slate-400 mt-0.5">实时预览</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;