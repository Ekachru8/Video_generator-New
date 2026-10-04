import React, { useState, useRef, useCallback } from 'react';
import {
  X,
  Check,
  Sparkles,
  Zap,
  Play,
  Volume2,
  VolumeX,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Film
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_FORMATS } from '../data/mockData';
import { VideoFormat } from '../types';

// Individual format card with its own video ref for hover-to-play
const FormatCard: React.FC<{
  fmt: VideoFormat;
  isSelected: boolean;
  onSelect: (fmt: VideoFormat, overwrite: boolean) => void;
}> = ({ fmt, isSelected, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // If play fails, try muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={() => onSelect(fmt, false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(fmt, false);
        }
      }}
      className={`group relative rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        isSelected
          ? 'border-blue-600 dark:border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 ring-2 ring-blue-500/30'
          : 'border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#0c0f1c] hover:bg-neutral-50/80 dark:hover:bg-[#101426]'
      }`}
    >
      {/* Full Visual Video / GIF Preview Banner */}
      <div className="relative w-full h-44 sm:h-48 bg-neutral-950 overflow-hidden shrink-0">
        {/* Real Live Looping Video Element */}
        {fmt.videoUrl && (
          <video
            ref={videoRef}
            src={fmt.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
          />
        )}

        {/* Fallback image shown only if video is loading, absent, or errored */}
        {(!fmt.videoUrl || !videoReady || videoError) && fmt.imageUrl && (
          <img
            src={fmt.imageUrl}
            alt={fmt.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {/* Gradient fallback when no image or video or both errored */}
        {(!fmt.imageUrl && (!fmt.videoUrl || videoError)) && (
          <div className={`w-full h-full bg-gradient-to-tr ${fmt.coverGradient} flex flex-col items-center justify-center gap-2`}>
            <Film className="w-8 h-8 text-white/30" />
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Preview unavailable</span>
          </div>
        )}

        {/* Top Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20">
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wide uppercase">
            {fmt.badge || fmt.category}
          </span>

          {fmt.previewDuration && (
            <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/90">
              {fmt.previewDuration}
            </span>
          )}
        </div>

        {/* Selected Indicator Checkmark */}
        {isSelected && (
          <div className="absolute top-2.5 right-2.5 z-30 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-neutral-900">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        {/* Gradient shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none z-20" />
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {fmt.name}
            </h4>
            <span className="text-[10px] font-mono text-neutral-400 uppercase">
              {fmt.category}
            </span>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {fmt.description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
          {fmt.id !== 'no-format' ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(fmt, true);
              }}
              className="text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[11px] underline underline-offset-2 transition-colors cursor-pointer"
              title="Load this format's example prompt into your composer"
            >
              Try Sample Prompt
            </button>
          ) : (
            <span className="text-[11px] text-neutral-400 italic">Freeform Prompting</span>
          )}

          <button
            type="button"
            onClick={() => onSelect(fmt, false)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isSelected
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600'
            }`}
          >
            <span>{isSelected ? 'Selected' : 'Use Format'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FormatSelectorModal: React.FC = () => {
  const {
    isFormatModalOpen,
    setIsFormatModalOpen,
    selectedFormat,
    setSelectedFormat,
    currentPrompt,
    setCurrentPrompt
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFormatModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsFormatModalOpen]);

  if (!isFormatModalOpen) return null;

  const categories = [
    'All',
    '3D Animation',
    'Realism & UGC',
    'Found Footage',
    'Gaming & Action',
    'ASMR & Science',
    'Humor & Story',
    'Freeform'
  ];

  const filteredFormats = VIDEO_FORMATS.filter(fmt => {
    const matchesCategory = activeCategory === 'All' || 
      fmt.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === 'Humor & Story' && (fmt.category.includes('Humor') || fmt.category.includes('Retention')));
    const matchesSearch = !searchQuery.trim() || 
      fmt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fmt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fmt.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (fmt: VideoFormat, overwriteWithExample: boolean = false) => {
    setSelectedFormat(fmt);
    if (overwriteWithExample) {
      setCurrentPrompt(fmt.promptExample);
    } else if (!currentPrompt || !currentPrompt.trim()) {
      if (fmt.id !== 'no-format') {
        setCurrentPrompt(fmt.promptExample);
      }
    }
    setIsFormatModalOpen(false);
  };

  return (
    <div 
      onClick={() => setIsFormatModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#040508] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors cursor-default"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/50 dark:bg-[#040508]/50 backdrop-blur-md">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Film className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                Select a Video Format
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {VIDEO_FORMATS.length} styles
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Pick a proven viral topic format. Hover over any card to preview full-motion video.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search formats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0f121f] text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 w-36 sm:w-48 transition-all"
              />
            </div>

            <button
              onClick={() => setIsFormatModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              aria-label="Close format selector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Custom Prompt Protection Indicator */}
        {currentPrompt && currentPrompt.trim() && (
          <div className="px-6 py-2 bg-blue-50/80 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate pr-4 text-blue-900 dark:text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-semibold shrink-0">Preserving Your Custom Prompt:</span>
              <span className="truncate italic opacity-85">"{currentPrompt}"</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold shrink-0">
              Protected
            </span>
          </div>
        )}

        {/* Filter Pills */}
        <div className="px-6 py-2.5 border-b border-neutral-100 dark:border-neutral-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-neutral-50/50 dark:bg-[#060810]/50">
          <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Full-Cards Grid with Rich Video / GIF Previews */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFormats.map((fmt) => (
              <FormatCard
                key={fmt.id}
                fmt={fmt}
                isSelected={selectedFormat.id === fmt.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-[#040508]/80 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Format styles automatically preserve your custom instructions and character continuity.</span>
          </div>
          <button
            onClick={() => setIsFormatModalOpen(false)}
            className="px-4 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
