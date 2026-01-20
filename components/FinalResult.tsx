import React, { useState } from 'react';
import { AppScreen, TvModel } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  selectedSize: number;
  model: TvModel;
  backgroundImage: string | null;
}

const FinalResult: React.FC<Props> = ({ onNavigate, selectedSize, model, backgroundImage }) => {
  const [showShareSheet, setShowShareSheet] = useState(false);
  const currentModel = model;

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-body h-screen w-full relative flex flex-col overflow-hidden">

      {/* Title Header */}
      <div className="pt-14 pb-2 px-6 text-center z-10 bg-background-light dark:bg-background-dark">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">您的客厅方案</h1>
        <p className="text-xs text-slate-500 font-medium">结果已生成，可保存分享</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-48 pt-4 relative">

        {/* Result Card */}
        <div className="w-full bg-white dark:bg-[#1a222f] rounded-[2rem] overflow-hidden shadow-2xl relative mb-6">

          {/* Image Section - Square aspect ratio to crop ceiling and reduce height */}
          <div className="relative aspect-square w-full bg-gray-200">
            {/* Background positioned to show more bottom/center (TV + Floor), cropping top (Ceiling) */}
            <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${backgroundImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7kzg7cHJgUmFgoJvkJcZm5ZjViyOdLaTCTcvyKJ8NNxUEbwIE-2w9cdVHoxJ2AOJQ2Hw0Aj3e-viAE2MHnf6c-K8ungoeGrAZn8qNUN3JckPLQwR83cAO2Tj0aMJJsrRqAosbNmjhmVTViwWitKLhlA1_NDvH3dNVNzIwlQRsNo5mq7Gm0Wvwg9HTRR-e2XycuyS5l8PzFFKxpTtg8W82v-W3p2UOeXAypW0Nu8WIoWbjwUYchoFwqnFeXbU_4TNPh28I1x_zUEo"}')`, backgroundPosition: "center 80%" }}>
              {/* TV Overlay */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] z-20">
                <div className="relative aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <img src={currentModel.image} alt="TV Model" className="w-full h-full object-cover rounded-[2px]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[2px]"></div>
                  {/* Ambilight glow */}
                  <div className="absolute -inset-10 bg-blue-500/20 blur-3xl -z-10 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
            {/* Gradient overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* AR Badge */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-white text-[16px]">view_in_ar</span>
              <span className="text-white text-xs font-semibold tracking-wide">AR 预览</span>
            </div>

            {/* TV Info Overlay */}
            <div className="absolute bottom-[28px] left-6 right-6 z-10">
              <p className="text-white/80 text-xs font-medium mb-1">已选型号</p>
              <h2 className="text-white text-4xl font-bold leading-tight mb-3 tracking-wide">{currentModel.name}</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0052cc] text-white text-xs font-bold shadow-lg shadow-blue-900/50">{selectedSize}英寸</span>
                <span className="text-white/90 text-xs font-medium tracking-wide drop-shadow-sm">{currentModel.subtext}</span>
              </div>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="bg-white dark:bg-surface-dark px-2 pb-6 pt-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex-1 flex flex-col items-center justify-center py-3 relative">
                <span className="material-symbols-outlined text-primary mb-2 text-2xl">crop_free</span>
                <span className="text-slate-900 dark:text-white text-xl font-bold leading-none mb-1">4.2<span className="text-sm font-normal text-slate-500 ml-0.5">m</span></span>
                <span className="text-slate-400 text-[10px] mt-1 font-medium">墙面宽度</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-slate-100 dark:bg-slate-700"></div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-3 relative">
                <span className="material-symbols-outlined text-primary mb-2 text-2xl">visibility</span>
                <span className="text-slate-900 dark:text-white text-xl font-bold leading-none mb-1">3.5<span className="text-sm font-normal text-slate-500 ml-0.5">m</span></span>
                <span className="text-slate-400 text-[10px] mt-1 font-medium">观看距离</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-slate-100 dark:bg-slate-700"></div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-3">
                <span className="material-symbols-outlined text-primary mb-2 text-2xl">tv</span>
                <span className="text-slate-900 dark:text-white text-xl font-bold leading-none mb-1">{selectedSize}<span className="text-sm font-normal text-slate-500 ml-0.5">"</span></span>
                <span className="text-slate-400 text-[10px] mt-1 font-medium">电视尺寸</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Fixed Bottom Area */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full flex flex-col items-center pb-6 pt-12 bg-gradient-to-t from-background-light via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95 px-6">

        {/* Save Button - Adjusted padding for lower position */}
        <button className="w-full max-w-[340px] h-14 bg-[#0052cc] hover:bg-blue-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 transition-transform active:scale-[0.98] mb-3">
          <span className="material-symbols-outlined text-[24px]">download</span>
          <span>保存到相册</span>
        </button>

        {/* New Simulation Link */}
        <button
          onClick={() => onNavigate(AppScreen.HOME)}
          className="text-slate-400 text-sm font-medium hover:text-slate-600 mb-2 py-1 px-4"
        >
          开始新模拟
        </button>

        {/* Share Hint */}
        <p className="text-[10px] text-slate-300 dark:text-slate-600 text-center font-light tracking-wide">
          与家人分享此方案，共同决定最佳尺寸。
        </p>
      </div>

      {/* Top Floating Buttons */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-30 pointer-events-none">
        {/* Back Button */}
        <button onClick={() => onNavigate(AppScreen.TV_SELECTION)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-200/50 dark:bg-white/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md">
          <span className="material-symbols-outlined text-slate-900 dark:text-white text-[20px]">arrow_back</span>
        </button>

        {/* Share Button (Triggers Sheet) */}
        <button onClick={() => setShowShareSheet(true)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-200/50 dark:bg-white/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md">
          <span className="material-symbols-outlined text-slate-900 dark:text-white text-[20px]">ios_share</span>
        </button>
      </div>

      {/* Share Sheet Modal */}
      {showShareSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowShareSheet(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-surface-dark rounded-t-[2rem] p-6 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-8"></div>
            <h3 className="text-center text-slate-900 dark:text-white font-bold text-lg mb-8">分享方案</h3>
            <div className="flex justify-center gap-8 sm:gap-12">
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-14 rounded-full bg-[#07C160] flex items-center justify-center text-white shadow-lg shadow-green-500/30 group-active:scale-95 transition-transform">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M15.4,11.2c-3.6,0-6.6,2.5-6.6,5.6c0,3.1,2.9,5.6,6.6,5.6c0.4,0,0.8,0,1.2-0.1c1.2,0.9,2.7,1.5,2.9,1.5c0.1,0,0.2,0,0.3-0.2c0-0.1,0-0.2,0-0.3c-0.1-0.8-0.4-1.8-0.7-2.6c1.6-1.1,2.5-2.6,2.5-4.2C21.9,13.7,19,11.2,15.4,11.2z M13.6,15.5c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9S14,15.5,13.6,15.5z M17.3,15.5c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9S17.7,15.5,17.3,15.5z M8.5,1.5C3.8,1.5,0,4.8,0,8.8c0,2.4,1.4,4.5,3.5,5.9c-0.5,1.5-1.5,3.4-1.6,3.7c-0.1,0.1,0,0.3,0.1,0.4c0.1,0.1,0.3,0.1,0.4,0c1.8-1.5,3.8-3.2,4.3-3.4c0.6,0.2,1.3,0.3,1.9,0.3c4.7,0,8.5-3.3,8.5-7.3S13.2,1.5,8.5,1.5z M5.7,6.2c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S5.2,6.2,5.7,6.2z M9.7,6.2c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S9.2,6.2,9.7,6.2z" /></svg>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">微信好友</span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-14 rounded-full bg-[#FF2442] flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-active:scale-95 transition-transform">
                  <span className="font-bold text-base tracking-tighter">小红书</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">小红书</span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-white group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">content_copy</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">复制链接</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareSheet(false)}
              className="mt-10 w-full py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FinalResult;