import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  Maximize2,
  Paperclip,
  Zap,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Check,
  Share2,
  Copy,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_TEMPLATES, VIDEO_FORMATS } from '../data/mockData';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const ShortsStudio: React.FC = () => {
  const {
    currentPrompt,
    setCurrentPrompt,
    selectedFormat,
    setSelectedFormat,
    selectedModel,
    duration,
    setDuration,
    resolution,
    setResolution,
    setIsFormatModalOpen,
    setIsModelModalOpen,
    setIsSettingsModalOpen,
    setIsPromptBuilderOpen,
    startVideoGeneration,
    isGenerating,
    generationProgress,
    currentUser
  } = useApp();

  const [activeTemplateFilter, setActiveTemplateFilter] = useState('All');
  const [referenceUploaded, setReferenceUploaded] = useState<string | null>(null);

  const filterTabs = [
    'All',
    'Disney',
    'Anime',
    'CCTV',
    'Ring doorbell',
    'Shot on iPhone',
    'Zach D Films',
    'Ranking videos',
    'Nature clips',
    'Nursery rhymes',
    'GTA 6',
    'AI court videos',
    'Bodycam footage',
    'Hydraulic press'
  ];

  const filteredTemplates = activeTemplateFilter === 'All'
    ? VIDEO_TEMPLATES
    : VIDEO_TEMPLATES.filter(t => t.category.toLowerCase().includes(activeTemplateFilter.toLowerCase()) || t.format.toLowerCase().includes(activeTemplateFilter.toLowerCase()));

  const handleApplyTemplate = (tpl: typeof VIDEO_TEMPLATES[0]) => {
    setCurrentPrompt(tpl.prompt);
    const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(tpl.format.toLowerCase())) || VIDEO_FORMATS[1];
    setSelectedFormat(fmt);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSimulateReferenceUpload = () => {
    setReferenceUploaded('ref_sample_frame.png');
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 select-none">
      {/* Top Fanned-out Format Stack & Social Badges (Screenshot 2 replica) */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
        {/* Fanned-out Cards representation */}
        <div className="relative h-28 w-72 flex items-center justify-center">
          <div className="absolute w-16 h-24 rounded-xl bg-amber-950 border border-amber-800 shadow-md rotate-[-22deg] -translate-x-20 flex flex-col justify-end p-1 text-[8px] font-bold text-amber-200">
            <span>AI court</span>
          </div>
          <div className="absolute w-16 h-24 rounded-xl bg-sky-900 border border-sky-700 shadow-md rotate-[-11deg] -translate-x-10 flex flex-col justify-end p-1 text-[8px] font-bold text-sky-200">
            <span>Disney</span>
          </div>
          <div className="absolute w-18 h-26 rounded-xl bg-purple-900 border-2 border-purple-500 shadow-xl z-10 flex flex-col justify-end p-1.5 text-[9px] font-black text-white">
            <span>GTA 6</span>
          </div>
          <div className="absolute w-16 h-24 rounded-xl bg-indigo-950 border border-indigo-700 shadow-md rotate-[11deg] translate-x-10 flex flex-col justify-end p-1 text-[8px] font-bold text-indigo-200">
            <span>Anime</span>
          </div>
          <div className="absolute w-16 h-24 rounded-xl bg-stone-900 border border-stone-700 shadow-md rotate-[22deg] translate-x-20 flex flex-col justify-end p-1 text-[8px] font-bold text-stone-300">
            <span>Press</span>
          </div>
        </div>

        {/* Social Icons row */}
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">▶</span>
          <span className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold">♪</span>
          <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-bold">📷</span>
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">f</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Remix a proven format
        </h2>
      </div>

      {/* Main Studio Input Box (Screenshot 2 replica) */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#14151d] border border-neutral-200 dark:border-neutral-800 shadow-lg p-4 transition-all">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Textarea area */}
          <div className="flex-1 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between text-xs text-neutral-400 pb-2">
              <span className="font-medium text-neutral-600 dark:text-neutral-300">
                Format: <strong className="text-blue-600 dark:text-blue-400">{selectedFormat.name}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSimulateReferenceUpload}
                  className="hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Assets</span>
                </button>
                <button 
                  onClick={() => setIsPromptBuilderOpen(true)}
                  className="hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              placeholder="Choose a format, then describe your version..."
              rows={4}
              className="w-full bg-transparent resize-none focus:outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 leading-relaxed font-sans"
            />

            {referenceUploaded && (
              <div className="mt-2 flex items-center gap-2 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Reference attached: {referenceUploaded}</span>
                <button 
                  onClick={() => setReferenceUploaded(null)}
                  className="text-neutral-400 hover:text-neutral-700 ml-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Bottom Toolbar Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
              {/* + Add reference */}
              <button
                onClick={handleSimulateReferenceUpload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-500" />
                <span>Add reference</span>
              </button>

              {/* Model Picker */}
              <button
                onClick={() => setIsModelModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                <span>{selectedModel.name}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Duration Picker */}
              <button
                onClick={() => {
                  const opts = ['5s', '8s', '10s', '15s'];
                  const next = opts[(opts.indexOf(duration) + 1) % opts.length];
                  setDuration(next);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium font-mono text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>⏱ {duration}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Resolution Picker */}
              <button
                onClick={() => {
                  const opts = ['720p', '1080p', '4K'];
                  const next = opts[(opts.indexOf(resolution) + 1) % opts.length];
                  setResolution(next);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium font-mono text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <span>{resolution}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Settings */}
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                <span>Settings</span>
              </button>

              {/* Prompt builder (sparkles) */}
              <button
                onClick={() => setIsPromptBuilderOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-semibold text-blue-600 dark:text-blue-400 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prompt builder</span>
              </button>
            </div>
          </div>

          {/* Right Format Box & Generate CTA */}
          <div className="w-full md:w-56 flex flex-col justify-between gap-3">
            {/* Format Thumbnail / Select a format trigger */}
            <div
              onClick={() => setIsFormatModalOpen(true)}
              className="flex-1 min-h-[140px] rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/60 dark:bg-neutral-900/50 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 cursor-pointer flex flex-col items-center justify-center p-3 text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-xs border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:scale-110 group-hover:text-blue-600 transition-all mb-2">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                {selectedFormat ? selectedFormat.name : 'Select a format'}
              </div>
              <span className="text-[11px] text-neutral-400 mt-0.5">
                {selectedFormat ? selectedFormat.category : '13 viral formats'}
              </span>
            </div>

            {/* Generate Button with credit badge */}
            <button
              onClick={startVideoGeneration}
              disabled={isGenerating}
              className={`w-full py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isGenerating
                  ? 'bg-neutral-400 dark:bg-neutral-700 text-white cursor-not-allowed'
                  : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-black dark:hover:bg-white active:scale-98'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  <span>Rendering {generationProgress}%</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <div className="flex items-center gap-0.5 opacity-80 font-mono text-[11px]">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>{selectedModel.creditsPerUnit || 21}</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Templates Gallery Section (Screenshot 4 replica) */}
      <div className="space-y-4 max-w-6xl mx-auto">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Video templates
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Pick a video, then change what happens.
          </p>
        </div>

        {/* Filter Pills (Screenshot 4 replica) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTemplateFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTemplateFilter === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Templates Grid with Vertical Players */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {filteredTemplates.map(tpl => (
            <div
              key={tpl.id}
              className="space-y-2 group"
            >
              <VideoVisualPlayer
                theme={tpl.visualTheme}
                title={tpl.title}
                duration={tpl.duration}
                aspectRatio="9:16"
              />

              <div className="space-y-1 px-1">
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {tpl.title}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {tpl.description}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-neutral-400">
                    {tpl.views} views
                  </span>
                  <button
                    onClick={() => handleApplyTemplate(tpl)}
                    className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-[11px] font-semibold transition-colors"
                  >
                    Remix
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
