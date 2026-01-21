import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onCapture: (imageSrc: string) => void;
}

const ArMeasureStep2: React.FC<Props> = ({ onNavigate, onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [frozenImage, setFrozenImage] = useState<string | null>(null);
  const [animationStage, setAnimationStage] = useState(0); // 0: Init, 1: Width, 2: Height, 3: Done
  const [showHelp, setShowHelp] = useState(false);

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 800);  // Start Width
    const timer2 = setTimeout(() => setAnimationStage(2), 2000); // Start Height
    const timer3 = setTimeout(() => setAnimationStage(3), 3200); // Finish
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleNext = useCallback(() => {
    // If not frozen yet, freeze it first
    if (!frozenImage) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setFrozenImage(imageSrc);
      }
      return;
    }

    // If already frozen, proceed
    onCapture(frozenImage);
    onNavigate(AppScreen.ANALYSIS_RESULT);
  }, [frozenImage, onNavigate, onCapture]);

  const videoConstraints = {
    facingMode: "environment"
  };

  return (
    <div className="font-sans bg-background-light dark:bg-background-dark text-slate-900 h-[100dvh] w-full overflow-hidden relative">
      <div className="relative h-full w-full flex flex-col group/design-root">
        {/* Background - Webcam or Frozen Image */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          {frozenImage ? (
            <img src={frozenImage} alt="Captured" className="h-full w-full object-cover" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="h-full w-full object-cover opacity-90"
              forceScreenshotSourceSize={true}
              mirrored={false}
              disablePictureInPicture={true}
              imageSmoothing={true}
              onUserMediaError={(e) => console.log(e)}
              onUserMedia={() => console.log("Camera loaded")}
              screenshotQuality={0.92}
            />
          )}
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
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">步骤 2 / 2</span>
              <h2 className="text-white text-base font-bold leading-tight tracking-tight text-center drop-shadow-md">墙面尺寸测量</h2>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">help</span>
            </button>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
            <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(0,82,204,0.6)]"></div>
          </div>
        </div>

        {/* Main AR UI */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">

          {/* Hide everything when frozen */}
          {!frozenImage && (
            <>
              {/* Central Measurement Box (Matches Step 1 dimensions: inset-x-12 top-1/4 bottom-1/4) */}
              <div className="absolute inset-x-12 top-1/4 bottom-1/4">

                {/* Corner Brackets (Always visible as reference) */}
                <div className="absolute inset-0 opacity-40 transition-opacity duration-500" style={{ opacity: animationStage === 3 ? 0.8 : 0.4 }}>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>
                </div>

                {/* Horizontal Line Animation (Width) */}
                <div className={`absolute top-1/2 left-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(0,82,204,0.8)] -translate-y-1/2 transition-all duration-1000 ease-out ${animationStage >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                  {/* Width Label - Hide when final stage (3) reached */}
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-primary/90 text-white px-3 py-1.5 rounded-full text-[12px] font-bold border border-white/20 backdrop-blur-sm transition-all duration-500 delay-700 ${animationStage >= 1 && animationStage < 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    宽度: 4.2m
                  </div>
                </div>

                {/* Vertical Line Animation (Height) */}
                <div className={`absolute left-1/2 top-0 w-[2px] bg-primary shadow-[0_0_10px_rgba(0,82,204,0.8)] -translate-x-1/2 transition-all duration-1000 ease-out ${animationStage >= 2 ? 'h-full opacity-100' : 'h-0 opacity-0'}`}>
                  {/* Height Label - Hide when final stage (3) reached. Moved further right for spacing. */}
                  <div className={`absolute top-1/2 -right-24 -translate-y-1/2 bg-primary/90 text-white px-3 py-1.5 rounded-full text-[12px] font-bold border border-white/20 backdrop-blur-sm transition-all duration-500 delay-700 ${animationStage >= 2 && animationStage < 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    高度: 2.8m
                  </div>
                </div>

              </div>

              {/* Central Data Display */}
              <div className={`flex flex-col gap-4 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

                {/* Distance Data */}
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl w-[200px]">
                  <div className="size-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-[18px]">straighten</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-medium">观看距离</span>
                    <span className="text-sm text-white font-bold">3.5m</span>
                  </div>
                </div>

                {/* Width Data */}
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl w-[200px]">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[18px]">width</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-medium">墙面宽度</span>
                    <span className="text-sm text-white font-bold">4.2m</span>
                  </div>
                </div>

                {/* Height Data */}
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl w-[200px]">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[18px]">height</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-medium">墙面高度</span>
                    <span className="text-sm text-white font-bold">2.8m</span>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {/* Bottom Actions - Matched spacing with Step 1 */}
        <div className="absolute bottom-0 w-full z-20 flex flex-col items-center justify-end pb-10 gap-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
          <div className="px-6 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">
            <p className="text-white text-xs font-medium leading-normal text-center flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[16px] animate-pulse">radar</span>
              {frozenImage ? "已锁定数据，可继续" : animationStage < 3 ? "正在扫描墙面尺寸..." : "扫描完成，请确认"}
            </p>
          </div>
          <div className="flex w-full px-6 justify-center">
            <button
              onClick={handleNext}
              className={`flex w-full max-w-[280px] cursor-pointer items-center justify-center rounded-full h-12 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,82,204,0.4)] border border-white/20 ${animationStage < 3 && !frozenImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            >
              <span className="text-white text-base font-bold leading-normal tracking-wide mr-2">
                {frozenImage ? "完成并挑选电视" : "拍摄墙面"}
              </span>
              <span className="material-symbols-outlined text-white text-[18px]">
                {frozenImage ? "check" : "camera_alt"}
              </span>
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
                  <span className="material-symbols-outlined text-[24px]">square_foot</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">墙面测量说明</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-4">
                  当前步骤为<span className="text-primary font-bold">墙面宽度与高度测量</span>。
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 w-full text-left mb-4 flex flex-col gap-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                    <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">info</span>
                    将十字准星对准墙面中心，AR 将自动识别墙面边界。
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                    <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">camera</span>
                    待数据稳定并完成自动扫描后，点击“拍摄墙面”定格画面。
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

export default ArMeasureStep2;