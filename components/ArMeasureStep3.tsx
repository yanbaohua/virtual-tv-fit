import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onCapture: (imageSrc: string) => void;
}

const ArMeasureStep3: React.FC<Props> = ({ onNavigate, onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [frozenImage, setFrozenImage] = useState<string | null>(null);

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
    <div className="font-sans bg-black text-slate-900 h-[100dvh] w-full overflow-hidden flex items-center justify-center relative">
      <div className="relative h-full w-full mx-auto bg-slate-900 overflow-hidden flex flex-col group/design-root">
        {/* Background - Webcam or Frozen Image */}
        <div className="absolute inset-0 z-0 bg-slate-800">
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
              screenshotQuality={0.92}
              onUserMediaError={(e) => console.log(e)}
              onUserMedia={() => console.log("Camera loaded")}
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
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">步骤 3 / 3</span>
              <h2 className="text-white text-base font-bold leading-tight tracking-tight text-center drop-shadow-md">AR 墙面全尺寸测量</h2>
            </div>
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[24px]">help</span>
            </button>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
            <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(0,82,204,0.6)]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Main AR UI */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">

          {/* Distance Info Top */}
          <div className="absolute top-[28%]">
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-white/95 backdrop-blur-xl pl-2.5 pr-3 shadow-lg ring-1 ring-white/50">
              <span className="material-symbols-outlined text-primary text-[16px]">straighten</span>
              <p className="text-slate-900 text-[10px] font-bold leading-normal tracking-tight">沙发至墙面距离: <span className="text-primary text-xs">3.5m</span></p>
            </div>
          </div>

          {/* Measuring Box */}
          <div className="relative w-4/5 h-2/5 border border-white/20">
            {/* Horizontal Line */}
            <div className="absolute top-0 left-1/2 h-full w-px bg-primary shadow-[0_0_8px_rgba(0,82,204,0.8)] -translate-x-1/2">
              <div className="absolute top-0 -translate-y-1/2 -translate-x-1/2 flex items-center">
                <div className="w-6 h-1.5 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full ml-1"></div>
              </div>
              <div className="absolute bottom-0 translate-y-1/2 -translate-x-1/2 flex items-center">
                <div className="w-6 h-1.5 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full ml-1"></div>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary shadow-[0_0_8px_rgba(0,82,204,0.8)] -translate-y-1/2">
              <div className="absolute left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full mt-1"></div>
              </div>
              <div className="absolute right-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-white border-2 border-primary rounded-full mt-1"></div>
              </div>
            </div>

            {/* Labels Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
              <div className="bg-primary/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <span className="material-symbols-outlined text-[12px]">width</span>
                电视墙宽度: 4.2m
              </div>
              <div className="bg-primary/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <span className="material-symbols-outlined text-[12px]">height</span>
                墙面高度: 2.8m
              </div>
            </div>

            {/* Corners */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br"></div>
            </div>
          </div>

          {!frozenImage && (
            <>
              {/* Reticle & Lines (Only show when not frozen for cleaner look) */}
              <div className="relative flex items-center justify-center size-14 mt-4">
                <div className="size-2 bg-primary rounded-full shadow-[0_0_12px_rgba(0,82,204,1)] z-20"></div>
                <div className="absolute inset-0 rounded-full border-[2px] border-white/80 shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
                <div className="absolute w-full h-[1px] bg-white/40"></div>
                <div className="absolute h-full w-[1px] bg-white/40"></div>
              </div>

              <div className="relative w-full h-16 flex justify-center items-start">
                <div className="h-full w-[1px] border-l border-dashed border-primary/40"></div>
                <div className="absolute bottom-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full z-20 flex flex-col items-center justify-end pb-8 gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16">
          <div className="px-5 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">
            <p className="text-white text-xs font-medium leading-normal text-center flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[16px]">screen_search_desktop</span>
              {frozenImage ? "已锁定墙面，点击完成以继续" : "请上下左右扫描以确认墙面完整尺寸"}
            </p>
          </div>
          <div className="flex w-full px-6 justify-center">
            <button
              onClick={handleNext}
              className="flex w-full max-w-[280px] cursor-pointer items-center justify-center rounded-full h-12 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,82,204,0.4)] border border-white/20"
            >
              <span className="text-white text-base font-bold leading-normal tracking-wide mr-2">
                {frozenImage ? "完成并预览" : "拍摄墙面"}
              </span>
              <span className="material-symbols-outlined text-white text-[18px]">
                {frozenImage ? "check" : "camera_alt"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArMeasureStep3;