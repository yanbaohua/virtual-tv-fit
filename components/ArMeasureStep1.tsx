import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const ArMeasureStep1: React.FC<Props> = ({ onNavigate }) => {
  const [showHelp, setShowHelp] = useState(false);

  const videoConstraints = {
    facingMode: "environment"
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 h-screen w-full overflow-hidden relative">
      <div className="relative h-full w-full flex flex-col">
        {/* AR Camera Background */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="h-full w-full object-cover opacity-90"
            forceScreenshotSourceSize={true}
            mirrored={false}
            disablePictureInPicture={true}
            imageSmoothing={true}
            screenshotQuality={0.92}
            onUserMediaError={(e) => console.log(e)}
            onUserMedia={() => console.log("Camera loaded")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none"></div>
          <div className="absolute inset-0 ar-grid opacity-20 pointer-events-none"></div>
        </div>

        {/* Header */}
        <div className="relative z-30 w-full pt-safe-top">
          <div className="flex items-center p-4 pb-2 justify-between text-white mt-4">
            <button onClick={() => onNavigate(AppScreen.HOME)} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <div className="flex flex-col items-center flex-1">
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">步骤 1 / 3</span>
              <h2 className="text-white text-base font-bold leading-tight tracking-tight text-center drop-shadow-md">AR 墙面扫描</h2>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">help</span>
            </button>
          </div>
          {/* Progress Indicator */}
          <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
            <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(0,82,204,0.6)]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* AR Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
          {/* Distance Tag - Simulated "Measuring..." */}
          <div className="absolute top-[35%] animate-bounce [animation-duration:2s]">
            <div className="flex h-10 shrink-0 items-center justify-center gap-x-2.5 rounded-full bg-white/95 backdrop-blur-xl pl-3 pr-5 shadow-lg shadow-black/20 ring-1 ring-white/50">
              <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
              <p className="text-slate-900 text-sm font-bold leading-normal font-display tracking-tight">沙发至墙面距离: <span className="text-primary text-base">3.5m</span></p>
            </div>
          </div>

          {/* Central Target */}
          <div className="relative flex items-center justify-center size-16 mt-12">
            <div className="size-2 bg-primary rounded-full shadow-[0_0_12px_rgba(0,82,204,1)] z-20"></div>
            <div className="absolute inset-0 rounded-full border-[2.5px] border-white shadow-[0_0_10px_rgba(0,0,0,0.3)] opacity-90"></div>
            <div className="absolute w-full h-[1px] bg-white/60"></div>
            <div className="absolute h-full w-[1px] bg-white/60"></div>
          </div>

          {/* Vertical Guide Line to Floor */}
          <div className="relative w-full h-32 flex justify-center items-start overflow-visible">
            <div className="h-full w-[2px] border-l-2 border-dashed border-primary/60"></div>
            <div className="absolute bottom-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-primary/20 bg-primary/5 animate-ping absolute"></div>
              <div className="w-12 h-12 rounded-full border border-primary/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              {/* Floor Plane Grid Hint */}
              <div className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute h-16 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent rotate-90 scale-x-50"></div>
            </div>
          </div>

          {/* Corner Brackets */}
          <div className="absolute inset-x-12 top-1/4 bottom-1/4 opacity-40">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full z-20 flex flex-col items-center justify-end pb-10 gap-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
          <div className="px-6 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-white text-sm font-medium leading-normal text-center flex items-center gap-2">
              <span className="material-symbols-outlined text-white/80 animate-pulse text-[18px]">radar</span>
              缓慢扫描地面以检测边界
            </p>
          </div>
          <div className="flex w-full px-6 justify-center">
            <button
              onClick={() => onNavigate(AppScreen.AR_STEP_2)}
              className="flex w-full max-w-[280px] cursor-pointer items-center justify-center rounded-full h-12 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,82,204,0.4)] border border-white/20"
            >
              <span className="text-white text-base font-bold leading-normal tracking-wide mr-2">下一步</span>
              <span className="material-symbols-outlined text-white text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xs bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-[24px]">straighten</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">距离测量说明</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-4">
                  当前步骤为<span className="text-primary font-bold">沙发至墙面距离测量</span>。
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 w-full text-left mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                    <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">info</span>
                    请站在您平时观看电视的位置（如沙发前），将屏幕中心的十字准星对准墙根（墙面与地面交界处）。
                  </p>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full py-3 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                >
                  知道了
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArMeasureStep1;