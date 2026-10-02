import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface Props {
  theme: string;
  title?: string;
  duration?: string;
  accentColor?: string;
  autoPlay?: boolean;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  className?: string;
}

export const VideoVisualPlayer: React.FC<Props> = ({
  theme,
  title = 'Everygen Video Preview',
  duration = '10s',
  accentColor = '#0066FF',
  autoPlay = false,
  aspectRatio = '9:16',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play sound effect using Web Audio API when unmuted
  const playAmbientSound = (type: string) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type.includes('hydraulic')) {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } else if (type.includes('disney')) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    let anim: number;
    let lastTime = performance.now();
    const durSec = parseInt(duration) || 10;

    const loop = (time: number) => {
      if (isPlaying) {
        const delta = (time - lastTime) / 1000;
        setProgress((prev) => {
          const next = prev + (delta / durSec) * 100;
          if (next >= 100) {
            playAmbientSound(theme);
            return 0;
          }
          return next;
        });
      }
      lastTime = time;
      anim = requestAnimationFrame(loop);
    };

    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [isPlaying, duration, isMuted, theme]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (!isPlaying) playAmbientSound(theme);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (isMuted) playAmbientSound(theme);
  };

  // Render Theme Graphics
  const renderVisualContent = () => {
    const p = progress / 100;

    switch (theme) {
      case 'disney':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-amber-100 to-emerald-200 overflow-hidden flex flex-col items-center justify-center select-none">
            {/* Soft fluffy clouds */}
            <div 
              className="absolute top-8 left-4 w-28 h-10 bg-white/90 rounded-full blur-[1px] transition-transform duration-300"
              style={{ transform: `translateX(${Math.sin(p * Math.PI * 2) * 15}px)` }}
            />
            <div className="absolute top-14 right-6 w-20 h-8 bg-white/80 rounded-full blur-[1px]" />

            {/* Glowing friendly sun */}
            <div className="absolute top-6 right-8 w-14 h-14 rounded-full bg-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.8)] flex items-center justify-center">
              <span className="text-xs font-bold text-amber-900">☀️</span>
            </div>

            {/* 3D animated character representation */}
            <div 
              className="relative z-10 flex flex-col items-center transition-transform duration-150"
              style={{ transform: `scale(${1 + Math.sin(p * Math.PI * 4) * 0.05}) translateY(${Math.sin(p * Math.PI * 2) * 8}px)` }}
            >
              {/* Cute puppy / character head */}
              <div className="w-24 h-24 rounded-full bg-amber-700 relative shadow-2xl border-4 border-amber-600 flex items-center justify-center">
                {/* Ears */}
                <div className="absolute -top-4 -left-3 w-8 h-14 bg-amber-900 rounded-full rotate-[-25deg]" />
                <div className="absolute -top-4 -right-3 w-8 h-14 bg-amber-900 rounded-full rotate-[25deg]" />
                {/* Expressive cartoon eyes */}
                <div className="flex gap-4">
                  <div className="w-5 h-7 bg-white rounded-full relative overflow-hidden shadow-inner">
                    <div className="w-3.5 h-4 bg-slate-900 rounded-full absolute top-1 right-0.5" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1.5 left-1" />
                  </div>
                  <div className="w-5 h-7 bg-white rounded-full relative overflow-hidden shadow-inner">
                    <div className="w-3.5 h-4 bg-slate-900 rounded-full absolute top-1 left-0.5" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1.5 left-1" />
                  </div>
                </div>
                {/* Cute snout with mint green ice cream smudge */}
                <div className="absolute -bottom-2 w-12 h-9 bg-amber-100 rounded-full flex flex-col items-center justify-center shadow-md">
                  <div className="w-3 h-2 bg-slate-900 rounded-full mb-0.5" />
                  <div className="w-4 h-3 bg-emerald-400 rounded-full opacity-90 shadow-sm" />
                </div>
              </div>

              {/* Mint ice cream cup */}
              <div className="mt-4 bg-white/90 px-3 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-inner" />
                <span className="text-[11px] font-bold text-slate-800 tracking-wide">MINT DELIGHT</span>
              </div>
            </div>

            {/* Rolling green grass hills */}
            <div className="absolute -bottom-6 w-[120%] h-24 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-[100%] shadow-2xl" />
          </div>
        );

      case 'hydraulic':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-stone-900 via-zinc-900 to-neutral-950 overflow-hidden flex flex-col items-center justify-between p-4 select-none">
            {/* Warning Hazard Header */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-yellow-400 tracking-wider">
              <span>HYDRAULIC PRESS 500-TON</span>
              <span className="animate-pulse">PRESSURE: {(p * 490 + 10).toFixed(0)} PSI</span>
            </div>

            {/* Descending Yellow Ram */}
            <div 
              className="w-48 bg-gradient-to-b from-yellow-500 via-amber-400 to-yellow-600 rounded-b-xl border-4 border-yellow-700 shadow-2xl flex flex-col items-center justify-end pb-2 transition-all duration-75"
              style={{
                height: `${80 + p * 90}px`,
                transform: `translateY(${p * 20}px)`
              }}
            >
              {/* Hazard Stripes */}
              <div className="w-full h-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fbbf24_10px,#fbbf24_20px)] border-t border-b border-black/40" />
              <div className="text-[10px] font-mono font-bold text-black mt-1">DANGER 500T</div>
            </div>

            {/* Target Item: Piggy Bank cracking */}
            <div className="relative flex flex-col items-center mb-6">
              <div 
                className="w-24 h-20 bg-pink-400 rounded-full border-2 border-pink-500 relative shadow-2xl flex items-center justify-center transition-all duration-75"
                style={{
                  transform: `scaleY(${Math.max(0.25, 1 - p * 0.75)}) scaleX(${1 + p * 0.4})`,
                  filter: p > 0.6 ? 'contrast(130%)' : 'none'
                }}
              >
                {/* Pig snout & eyes */}
                <div className="w-6 h-5 bg-pink-300 rounded-full border border-pink-600 flex gap-1 items-center justify-center">
                  <div className="w-1 h-1.5 bg-pink-700 rounded-full" />
                  <div className="w-1 h-1.5 bg-pink-700 rounded-full" />
                </div>
                <div className="absolute top-3 left-4 w-2 h-2 bg-slate-900 rounded-full" />
                <div className="absolute top-3 right-4 w-2 h-2 bg-slate-900 rounded-full" />
              </div>

              {/* Spark particles when pressure peaks */}
              {p > 0.5 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping shadow-[0_0_12px_#fef08a]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse -translate-x-6" />
                  <div className="w-1.5 h-1.5 bg-pink-200 rounded-full animate-bounce translate-x-6" />
                </div>
              )}

              {/* Industrial Steel Anvil Base */}
              <div className="w-56 h-10 bg-gradient-to-t from-stone-800 to-zinc-600 rounded-t-lg border-t-2 border-zinc-400 shadow-2xl mt-1 flex items-center justify-center">
                <span className="text-[9px] font-mono text-zinc-300 tracking-widest">SOLID STEEL ANVIL</span>
              </div>
            </div>
          </div>
        );

      case 'cctv':
        return (
          <div className="relative w-full h-full bg-emerald-950/90 text-emerald-400 font-mono overflow-hidden flex flex-col justify-between p-3 select-none">
            {/* Scanlines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-70" />

            {/* CCTV HUD */}
            <div className="relative z-20 flex justify-between items-center text-[10px] tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
                REC CAM-04 (BACKYARD)
              </span>
              <span>03:22:14 AM</span>
            </div>

            {/* Night vision subject */}
            <div className="relative z-20 flex flex-col items-center justify-center my-auto">
              <div 
                className="w-28 h-20 bg-emerald-800/80 rounded-2xl border border-emerald-400/60 shadow-[0_0_30px_rgba(52,211,153,0.3)] flex flex-col items-center justify-center transition-transform duration-200"
                style={{ transform: `translateX(${Math.sin(p * Math.PI * 4) * 20}px)` }}
              >
                <div className="flex gap-6 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-200 shadow-[0_0_8px_#a7f3d0]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-200 shadow-[0_0_8px_#a7f3d0]" />
                </div>
                <span className="text-[10px] tracking-widest text-emerald-200">RACCOON TARGET</span>
              </div>
            </div>

            {/* Bottom HUD */}
            <div className="relative z-20 flex justify-between items-center text-[9px] text-emerald-500/80">
              <span>IR ILLUMINATION: 100%</span>
              <span>FPS: 29.97</span>
              <span>SENSOR 4K UHD</span>
            </div>
          </div>
        );

      case 'ring':
        return (
          <div className="relative w-full h-full bg-stone-900 text-white overflow-hidden flex flex-col justify-between p-4 select-none">
            {/* Fisheye lens vignette */}
            <div className="absolute inset-0 rounded-[28px] border-[12px] border-black/80 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />

            <div className="relative z-20 flex justify-between items-center text-[11px] font-sans font-medium">
              <span className="bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Front Porch Doorbell
              </span>
              <span className="bg-black/60 px-2 py-1 rounded-md text-[10px] font-mono">1080p HDR</span>
            </div>

            {/* Deer approaching porch */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div 
                className="w-32 h-36 bg-amber-800/90 rounded-3xl border border-amber-600/50 shadow-2xl flex flex-col items-center justify-center transition-all duration-200"
                style={{ transform: `scale(${0.9 + p * 0.3})` }}
              >
                {/* Antlers */}
                <div className="flex justify-between w-24 -mt-6 mb-2 text-amber-400 font-bold text-lg">
                  <span>ψ</span>
                  <span>ψ</span>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className="w-3 h-4 bg-black rounded-full" />
                  <div className="w-3 h-4 bg-black rounded-full" />
                </div>
                <span className="text-[10px] font-semibold bg-amber-950/80 px-2 py-0.5 rounded text-amber-200">DEER VISITOR</span>
              </div>
            </div>

            <div className="relative z-20 flex items-center justify-between text-[10px] text-stone-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
              <span>RING MOTION SENSOR</span>
              <span>2.4 GHz CONNECTED</span>
            </div>
          </div>
        );

      case 'gta':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-purple-900 via-pink-600 to-amber-500 overflow-hidden flex flex-col justify-between p-4 select-none">
            {/* Sun flare & palm trees */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-amber-300 blur-xl opacity-60" />

            {/* Header branding */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="font-extrabold italic text-sm tracking-wider text-white drop-shadow-md">
                VICE CITY 2026
              </span>
              <span className="bg-black/50 text-[10px] px-2 py-0.5 rounded font-mono text-amber-300">
                4K 60FPS
              </span>
            </div>

            {/* Fast moving convertible silhouette */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div 
                className="w-40 h-16 bg-slate-950 rounded-2xl border-t-2 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center transition-transform duration-100"
                style={{ transform: `translateX(${Math.sin(p * Math.PI * 2) * 15}px)` }}
              >
                <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_10px_#fde047] mr-auto ml-2" />
                <span className="text-[11px] font-bold tracking-widest text-pink-400">HYDRATE SPEED</span>
                <div className="w-2 h-2 bg-red-500 rounded-full ml-auto mr-2" />
              </div>
            </div>

            {/* Bottom coastal highway lines */}
            <div className="relative z-10 w-full h-6 bg-slate-900/80 rounded flex items-center justify-center border-t border-white/20">
              <div 
                className="w-full flex justify-around text-amber-300 font-mono text-xs tracking-widest"
                style={{ transform: `translateX(-${(p * 50) % 25}px)` }}
              >
                <span>——</span>
                <span>——</span>
                <span>——</span>
                <span>——</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl bg-black border border-neutral-200 dark:border-neutral-800 shadow-md transition-all duration-300 ${
        aspectRatio === '9:16' ? 'aspect-[9/16]' : aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square'
      } ${className}`}
      onClick={togglePlay}
    >
      {/* Visual Canvas Render */}
      <div className="absolute inset-0">
        {renderVisualContent()}
      </div>

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 transition-opacity" />

      {/* Top Controls: Title & Audio Toggle */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30">
        <span className="text-xs font-semibold text-white/90 drop-shadow truncate max-w-[70%]">
          {title}
        </span>
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
        </button>
      </div>

      {/* Center Play Button Overlay on Hover/Paused */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div 
          className={`w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 ${
            isPlaying ? 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
        </div>
      </div>

      {/* Bottom Timeline Bar & Duration */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] text-white/80 font-mono tabular-nums">
          <span>{((progress / 100) * (parseInt(duration) || 10)).toFixed(1)}s</span>
          <span>{duration}</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
