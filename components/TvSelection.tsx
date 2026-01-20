import React from 'react';
import { AppScreen, TvModel } from '../types';
import { TV_SIZES } from '../constants';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  selectedSize: number;
  setSelectedSize: (size: number) => void;
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
  tvModels: TvModel[]; // Added prop
}

const TvSelection: React.FC<Props> = ({
  onNavigate,
  selectedSize,
  setSelectedSize,
  selectedModelId,
  setSelectedModelId,
  tvModels
}) => {

  const currentModel = tvModels.find(m => m.id === selectedModelId) || tvModels[0];

  // Logic to determine visual width percentage based on selected size
  const getWidthPercentage = (size: number) => {
    switch (size) {
      case 55: return 35;
      case 65: return 42;
      case 75: return 50;
      case 85: return 60;
      case 100: return 75;
      default: return 42;
    }
  };

  const getDimensionText = (size: number) => {
    const widthCm = Math.round(size * 2.21); // Width approx
    return `宽度：${widthCm}厘米 (约 ${size}吋)`;
  };

  if (!currentModel) {
    return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-body text-slate-900 dark:text-white h-screen flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 pt-4 mt-8 bg-transparent">
        <button onClick={() => onNavigate(AppScreen.ANALYSIS_RESULT)} className="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors border border-white/10">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-white text-base font-bold tracking-wide drop-shadow-md opacity-0">AR 预览</h2>
        <button onClick={() => onNavigate(AppScreen.LANDSCAPE_PREVIEW)} className="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors border border-white/10">
          <span className="material-symbols-outlined text-[24px]">center_focus_strong</span>
        </button>
      </div>

      {/* Main AR View */}
      <div className="relative w-full flex-grow bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACOsQJHC4Iopwikz21hrCO43WTWJUDEd2zxIo389aeQVofZPuTf0f2U3BfsO0iw5wrzsV7Tob_cCrFGqXEbW55bXWrYics4PmSUP-64ARpXtb5iz7BHqoFhiMZX8VQP1h0P-GKumgEBun7wlcL4lmJzccPeLzO17WykDl7e80we7T0duNgwI6vxghQZd_MUZV53qk1ln3V3DQtdS47SKEx7OfwFwzTFrc45DF761MVTOUgzNAtmdw4m80YqLFlRBDDJ1QKjsMOWC4U')" }}>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

        {/* TV Render */}
        <div
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl aspect-video transition-all duration-500 ease-out z-0"
          style={{ width: `${getWidthPercentage(selectedSize)}%` }}
        >
          <div className="absolute inset-2 bg-black/60 blur-2xl -z-10 rounded-lg"></div>
          <div className="w-full h-full rounded-[2px] border-[2px] border-[#0a0a0a] bg-black relative overflow-hidden flex items-center justify-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 bg-cover bg-center brightness-[1.05]" style={{ backgroundImage: `url('${currentModel.image}')` }}></div>
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
            <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>

            {/* Dimension Tag on TV */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-300">
              <div className="h-4 w-px bg-white/40"></div>
              <div className="bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-4 py-1.5 rounded-full whitespace-nowrap border border-white/20 flex items-center gap-2 shadow-xl">
                <span className="material-symbols-outlined text-[14px]">straighten</span>
                {getDimensionText(selectedSize)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="relative z-10 bg-background-light dark:bg-background-dark shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col max-h-[48vh] shrink-0 border-t border-white/5 pb-8">
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Size Selector */}
        <div className="pt-2 pb-2 w-full">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-3">
            {/* Sticky Label */}
            <div className="sticky left-0 z-20 shrink-0 flex items-center pl-6 pr-1 bg-background-light dark:bg-background-dark">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">尺寸</span>
            </div>

            {/* Buttons */}
            {TV_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all duration-300 ${selectedSize === size
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-gray-400'
                  }`}
              >
                <p className={`text-sm ${selectedSize === size ? 'font-bold' : 'font-medium'}`}>{size}吋</p>
              </button>
            ))}
            {/* Spacer */}
            <div className="w-6 shrink-0 h-1"></div>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 gap-4 pb-4 pt-3">

            {tvModels.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`snap-center shrink-0 w-[85%] max-w-[320px] flex flex-col rounded-3xl bg-white dark:bg-surface-dark transition-all duration-300 relative overflow-visible cursor-pointer ${selectedModelId === model.id
                  ? 'shadow-[0_8px_30px_rgba(0,82,204,0.12)] ring-2 ring-primary scale-100 z-10'
                  : 'shadow-sm border border-gray-100 dark:border-gray-800 opacity-90 scale-95 z-0'
                  }`}
              >
                <div className="h-32 w-full bg-gray-50 dark:bg-gray-800/50 relative flex items-center justify-center p-4 rounded-t-3xl overflow-hidden">
                  <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-2 py-1 rounded-md shadow-sm flex items-center gap-1 whitespace-nowrap text-[10px] font-bold ${model.tagColor}`}>
                    {model.tag === '80% 用户选择此款' && <span className="material-symbols-outlined text-[12px]">trending_up</span>}
                    {model.tag}
                  </div>
                  <div className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-500 hover:scale-105" style={{ backgroundImage: `url('${model.image}')` }}></div>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{model.name}</h3>
                      <p className="text-slate-500 dark:text-gray-400 text-xs font-medium mt-0.5">{model.subtext} • {selectedSize}吋</p>
                    </div>
                    {selectedModelId === model.id && (
                      <div className="flex size-6 rounded-full bg-primary text-white items-center justify-center animate-in zoom-in duration-300">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-primary font-bold text-xl">{model.price}</p>
                    <span className="text-[10px] text-gray-400 font-medium">最佳视距 {model.bestDist}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 px-6 pb-8 z-20">
          <button onClick={() => onNavigate(AppScreen.SIMULATION_RESULT)} className="w-full flex items-center justify-center gap-2 rounded-full h-14 bg-primary text-white text-base font-bold tracking-wide shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
            <span>查看详情</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TvSelection;