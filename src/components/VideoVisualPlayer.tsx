import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface Props {
  theme?: string;
  title?: string;
  prompt?: string;
  duration?: string;
  accentColor?: string;
  autoPlay?: boolean;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  className?: string;
  imageUrl?: string;
  videoUrl?: string;
  showTitle?: boolean;
}

export const VideoVisualPlayer: React.FC<Props> = ({
  theme = 'cinematic',
  title = 'NovaGen Video Preview',
  prompt,
  duration = '10s',
  accentColor = '#0075FD',
  autoPlay = true,
  aspectRatio = '9:16',
  className = '',
  imageUrl,
  videoUrl,
  showTitle = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string>(() => videoUrl || '');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync video source whenever input URL changes
  useEffect(() => {
    setActiveVideoSrc(videoUrl || '');
    setVideoError(false);
    setVideoLoaded(false);
  }, [videoUrl]);

  // Handle video play/pause
  const tryPlayVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked, ensure muted and retry once
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Guarantee playback starts
  useEffect(() => {
    tryPlayVideo();
  }, [tryPlayVideo, activeVideoSrc]);

  useEffect(() => {
    if (isPlaying || isHovered) {
      tryPlayVideo();
    } else {
      pauseVideo();
    }
  }, [isPlaying, isHovered, tryPlayVideo, pauseVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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

  // Animated progress for fallback themes (only when no video)
  useEffect(() => {
    if (videoUrl && !videoError) return;
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
  }, [isPlaying, duration, isMuted, theme, videoUrl, videoError]);

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

  const handleVideoError = () => {
    if (activeVideoSrc) {
      setActiveVideoSrc('');
    }
    setVideoError(true);
  };

  const hasVideo = Boolean(activeVideoSrc) && !videoError;

  // Render Theme Graphics
  const renderVisualContent = () => {
    const p = progress / 100;

    // 1. Direct Real Video Playback (MP4 / WebM / Cloud Video)
    if (hasVideo) {
      return (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
          {/* Poster image shown while video loads */}
          {imageUrl && !videoLoaded && (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          )}
          <video
            ref={videoRef}
            src={activeVideoSrc}
            poster={imageUrl}
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={handleVideoError}
            onLoadedData={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onCanPlay={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration && !isNaN(v.duration)) {
                setProgress((v.currentTime / v.duration) * 100);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none z-20" />
        </div>
      );
    }

    // 2. High-Resolution GIF or Still Preview (when explicitly requested without video)
    if (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('data:image') || imageUrl.startsWith('blob:'))) {
      const isGif = imageUrl.endsWith('.gif') || imageUrl.includes('giphy.com') || imageUrl.includes('.webp');
      return (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />
          <div className="absolute top-10 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-300 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{isGif ? 'HD GIF LOOP' : 'STILL IMAGE'}</span>
          </div>
        </div>
      );
    }

    // 3. Fallback when neither video nor image is provided
    return (
      <div className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
        <span className="text-neutral-500 font-medium text-xs">Preview unavailable</span>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-black border border-neutral-200 dark:border-neutral-800 shadow-md transition-all duration-300 ${
        aspectRatio === '9:16' ? 'aspect-[9/16]' : aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square'
      } ${className}`}
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas Render */}
      <div className="absolute inset-0">
        {renderVisualContent()}
      </div>

      {/* Scrim Overlay - subtle gradient so video is crystal clear */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 transition-opacity ${
        hasVideo && (isPlaying || isHovered) ? 'opacity-30' : 'opacity-60'
      }`} />

      {/* Top Controls: Title & Audio Toggle */}
      <div className={`absolute top-3 left-3 right-3 flex items-center ${showTitle ? 'justify-between' : 'justify-end'} z-30`}>
        {showTitle && (
          <span className="text-xs font-semibold text-white/90 drop-shadow truncate max-w-[70%]">
            {title}
          </span>
        )}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
        </button>
      </div>

      {/* Center Play Button Overlay — shown only when paused */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div 
          className={`w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-200 shadow-2xl ${
            (isPlaying || isHovered) ? 'opacity-0 scale-75' : 'opacity-90 scale-100'
          }`}
        >
          <Play className="w-5 h-5 fill-white translate-x-0.5" />
        </div>
      </div>

      {/* Bottom Timeline Bar, Captions & Duration */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-col gap-1.5">
        {/* Real-time Subtitle / Prompt Caption stream (clean: on hover or 9:16 aspect) */}
        {prompt && (aspectRatio === '9:16' || isHovered) && (
          <div className="bg-black/75 backdrop-blur-md rounded-lg px-2.5 py-1 text-center border border-white/15 shadow-xl transition-opacity animate-in fade-in duration-150">
            <p className="text-[11px] text-white/95 font-medium leading-tight line-clamp-1 drop-shadow-sm">
              {progress < 35 
                ? `🎬 ${prompt.slice(0, 48)}...`
                : progress < 70 
                ? `✨ ${prompt.slice(20, 68) || prompt}...` 
                : `🔥 ${prompt.slice(0, 45)} [4K Render]`}
            </p>
          </div>
        )}

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
