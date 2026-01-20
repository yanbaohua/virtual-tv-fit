import React from 'react';
import { AppScreen, TvModel } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  selectedSize: number;
  model: TvModel;
  backgroundImage: string | null;
}

const LandscapeView: React.FC<Props> = ({ onNavigate, selectedSize, model, backgroundImage }) => {
  const currentModel = model;

  return (
    <div className="font-body fixed inset-0 z-50 bg-black">
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuACOsQJHC4Iopwikz21hrCO43WTWJUDEd2zxIo389aeQVofZPuTf0f2U3BfsO0iw5wrzsV7Tob_cCrFGqXEbW55bXWrYics4PmSUP-64ARpXtb5iz7BHqoFhiMZX8VQP1h0P-GKumgEBun7wlcL4lmJzccPeLzO17WykDl7e80we7T0duNgwI6vxghQZd_MUZV53qk1ln3V3DQtdS47SKEx7OfwFwzTFrc45DF761MVTOUgzNAtmdw4m80YqLFlRBDDJ1QKjsMOWC4U"}')` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* TV Container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] aspect-video z-10 flex flex-col items-center">
          <div className="relative w-full h-full bg-black rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-[2px] ring-1 ring-white/10">
            <div
              className="w-full h-full bg-cover bg-center rounded-[1px] relative overflow-hidden"
              style={{ backgroundImage: `url('${currentModel.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-30">
                <span className="text-[6px] text-white tracking-[0.2em] font-light uppercase">Changhong</span>
              </div>
            </div>
            {/* Ambilight effect */}
            <div className="absolute -inset-4 bg-orange-500/10 blur-3xl -z-10 rounded-full"></div>
          </div>

          {/* TV Label */}
          <div className="mt-6">
            <div className="bg-black/60 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 shadow-lg min-w-[200px] text-center">
              <div className="text-white text-[12px] font-medium tracking-wide">{currentModel.name} | {selectedSize}"</div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-50 mt-8">
          <button
            onClick={() => onNavigate(AppScreen.TV_SELECTION)}
            className="flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors active:scale-95 shadow-xl"
          >
            <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
          </button>
        </div>

        {/* Home Indicator line simulation */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50"></div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>
    </div>
  );
};

export default LandscapeView;