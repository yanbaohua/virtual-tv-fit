import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { AppScreen, TvModel } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  selectedSize: number;
  model: TvModel;
  backgroundImage: string | null;
}

const FinalResult: React.FC<Props> = ({ onNavigate, selectedSize, model, backgroundImage }) => {
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const currentModel = model;

  const handleSave = async () => {
    if (!resultCardRef.current) return;

    try {
      setIsSaving(true);

      const element = resultCardRef.current;

      // Use html2canvas with a sophisticated cloning hook to fix alignment JUST FOR CAPTURE
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 3, // Even higher scale for sharper text
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // Find the card in the cloned document
          const card = clonedDoc.body.querySelector('.shadow-2xl');
          if (card) {
            (card as HTMLElement).style.borderRadius = '0px';
            (card as HTMLElement).style.boxShadow = 'none';
          }

          // FIX BASELINE SHIFT: Apply surgical CSS to all icons and badges in the clone
          const icons = clonedDoc.querySelectorAll('.material-symbols-outlined');
          icons.forEach(icon => {
            (icon as HTMLElement).style.display = 'inline-flex';
            (icon as HTMLElement).style.alignItems = 'center';
            (icon as HTMLElement).style.justifyContent = 'center';
            (icon as HTMLElement).style.paddingTop = '1px'; // Manual compensation for downward shift
            (icon as HTMLElement).style.lineHeight = '1';
          });

          const badges = clonedDoc.querySelectorAll('.rounded-full');
          badges.forEach(badge => {
            // Ensure text inside pills is perfectly centered
            const span = badge.querySelector('span');
            if (span) {
              (span as HTMLElement).style.display = 'block';
              (span as HTMLElement).style.lineHeight = '1';
              (span as HTMLElement).style.marginTop = '-1px'; // Lift text up slightly in capture
            }
          });

          // Fix metrics labels
          const labels = clonedDoc.querySelectorAll('.text-\\[10px\\]');
          labels.forEach(label => {
            (label as HTMLElement).style.lineHeight = '1';
            (label as HTMLElement).style.marginBottom = '2px';
          });
        }
      });

      // Prefer blob for sharing/performance
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("图片生成失败");
          return;
        }

        const fileName = `virtual-tv-fit-result-${Date.now()}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Try native sharing first (works best on mobile)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: '我的客厅电视方案',
              text: '看看这个电视尺寸放在我家合不合适！',
            });
            setIsSaving(false);
            return;
          } catch (shareError) {
            console.log('Share canceled or failed', shareError);
          }
        }

        // Fallback: Download
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsSaving(false);
      }, 'image/png');

    } catch (err) {
      console.error("Failed to save image:", err);
      alert("保存失败，请重试");
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-body h-screen w-full relative flex flex-col overflow-hidden">

      {/* Title Header */}
      <div className="pt-14 pb-4 px-6 text-center z-10 bg-background-light dark:bg-background-dark">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">您的客厅方案</h1>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold max-w-[280px] mx-auto leading-relaxed flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">diversity_3</span>
          与家人分享此方案，共同决定最佳尺寸
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-52 pt-2 relative">

        {/* Result Card - UI has rounded corners, saved image will be square */}
        <div ref={resultCardRef} className="w-full bg-white dark:bg-[#1a222f] rounded-[2.5rem] overflow-hidden shadow-2xl relative mb-6 border border-slate-100 dark:border-white/5">

          {/* Image Section - Square aspect ratio */}
          <div className="relative aspect-square w-full bg-slate-200">
            {/* Background */}
            <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${backgroundImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7kzg7cHJgUmFgoJvkJcZm5ZjViyOdLaTCTcvyKJ8NNxUEbwIE-2w9cdVHoxJ2AOJQ2Hw0Aj3e-viAE2MHnf6c-K8ungoeGrAZn8qNUN3JckPLQwR83cAO2Tj0aMJJsrRqAosbNmjhmVTViwWitKLhlA1_NDvH3dNVNzIwlQRsNo5mq7Gm0Wvwg9HTRR-e2XycuyS5l8PzFFKxpTtg8W82v-W3p2UOeXAypW0Nu8WIoWbjwUYchoFwqnFeXbU_4TNPh28I1x_zUEo"}')`, backgroundPosition: "center 80%" }}>
              {/* TV Overlay with Appearance (Bezel) - Width synced with selectedSize */}
              <div
                className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500"
                style={{
                  width: selectedSize === 55 ? '35%' :
                    selectedSize === 65 ? '42%' :
                      selectedSize === 75 ? '50%' :
                        selectedSize === 85 ? '60%' :
                          selectedSize === 100 ? '75%' : '42%'
                }}
              >
                <div className="relative aspect-video rounded-[3px] border-[3px] border-[#121212] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
                  <img src={currentModel.image} alt="TV Model" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                </div>
                {/* Ambilight glow */}
                <div className="absolute -inset-10 bg-primary/25 blur-3xl -z-10 rounded-full opacity-60"></div>
              </div>
            </div>
            {/* Gradient overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* TV Info Overlay */}
            <div className="absolute bottom-[28px] left-6 right-6 z-10">
              <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1.5 drop-shadow-md">建议选型</p>
              <h2 className="text-white text-3xl font-bold leading-tight mb-3 tracking-tight drop-shadow-lg">
                {currentModel.name.replace(new RegExp(selectedSize.toString(), 'g'), '').replace(/\s+/g, ' ').trim()}
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-7 px-3.5 rounded-full bg-primary flex items-center justify-center border border-white/20 shadow-lg shadow-blue-900/40">
                  <span className="text-white text-[11px] font-bold leading-none translate-y-[-0.5px]">{selectedSize}英寸</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center">
                  <span className="text-white/90 text-xs font-semibold tracking-wide drop-shadow-md leading-none translate-y-[-0.5px]">
                    {currentModel.subtext.replace(/\d+(英寸|吋)/g, `${selectedSize}$1`)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Panel - Restored Original UI Look */}
          <div className="px-5 pt-8 pb-10 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-white/5">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Wall Width */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-100 dark:border-white/10">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px] leading-none translate-y-[-0.5px]">width</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">墙面宽度</span>
                  <span className="text-sm text-slate-900 dark:text-white font-extrabold leading-none">4.2m</span>
                </div>
              </div>

              {/* Wall Height */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-100 dark:border-white/10">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px] leading-none translate-y-[-0.5px]">height</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">墙面高度</span>
                  <span className="text-sm text-slate-900 dark:text-white font-extrabold leading-none">2.8m</span>
                </div>
              </div>

              {/* Distance */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-100 dark:border-white/10">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px] leading-none translate-y-[-0.5px]">straighten</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">观看距离</span>
                  <span className="text-sm text-slate-900 dark:text-white font-extrabold leading-none">3.5m</span>
                </div>
              </div>

              {/* TV Size */}
              <div className="flex items-center gap-3 bg-primary/5 p-3.5 rounded-2xl border border-primary/10">
                <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px] leading-none translate-y-[-0.5px]">tv</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider leading-none mb-1">电视尺寸</span>
                  <span className="text-sm text-primary font-extrabold leading-none">{selectedSize}英寸</span>
                </div>
              </div>
            </div>

            {/* Price / Recommendation Badge */}
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 leading-none">市场参考价</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary leading-none">
                    {typeof currentModel.price === 'string' && currentModel.price.includes('¥')
                      ? currentModel.price
                      : `¥${Number(currentModel.price || 5999).toLocaleString()}`}
                  </span>
                  <span className="text-xs font-bold text-slate-400 leading-none mb-0.5">起</span>
                </div>
              </div>
              <div className="h-9 px-4 bg-emerald-500 text-white rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20">
                <span className="material-symbols-outlined text-[16px] filled leading-none translate-y-[-0.5px]">verified</span>
                <span className="text-[11px] font-bold tracking-tight leading-none">最佳方案</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Fixed Bottom Area */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full flex flex-col items-center pb-10 pt-20 bg-gradient-to-t from-background-light via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95 px-6">

        {/* Save Button - Size matched to 280px / h-12 */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex w-full max-w-[280px] cursor-pointer items-center justify-center rounded-full h-12 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,82,204,0.4)] border border-white/20 disabled:bg-slate-400 ${isSaving ? 'opacity-70' : ''}`}
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin mr-2">progress_activity</span>
              <span className="text-white text-base font-bold">正在保存...</span>
            </>
          ) : (
            <>
              <span className="text-white text-base font-bold leading-normal tracking-wide mr-2">保存到相册</span>
              <span className="material-symbols-outlined text-white text-[18px]">download</span>
            </>
          )}
        </button>

        {/* New Simulation Link */}
        <button
          onClick={() => onNavigate(AppScreen.HOME)}
          className="mt-4 text-slate-400 dark:text-slate-500 text-xs font-bold hover:text-primary dark:hover:text-primary transition-colors py-2 px-4"
        >
          开始新模拟
        </button>
      </div>

      {/* Top Floating Buttons */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-safe-top mt-4 flex justify-between items-center z-30 pointer-events-none">
        {/* Back Button */}
        <button onClick={() => onNavigate(AppScreen.TV_SELECTION)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors backdrop-blur-md border border-white/10">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        {/* Share Button (Triggers Sheet) */}
        <button onClick={() => setShowShareSheet(true)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors backdrop-blur-md border border-white/10">
          <span className="material-symbols-outlined text-[24px]">ios_share</span>
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