import React, { useState, useRef } from 'react';
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
import { Floating3DDeck } from './Floating3DDeck';
import { Card3D } from './Card3D';

export const ShortsStudio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentPrompt,
    setCurrentPrompt,
    selectedTemplate,
    setSelectedTemplate,
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
    setSelectedTemplate(tpl);
    const isCustom = currentPrompt.trim().length > 0 && 
                     (!selectedTemplate || currentPrompt !== selectedTemplate.prompt) &&
                     (!selectedFormat || currentPrompt !== selectedFormat.promptExample);
    if (!isCustom) {
      setCurrentPrompt(tpl.prompt);
    }
    const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(tpl.format.toLowerCase())) || VIDEO_FORMATS[1];
    setSelectedFormat(fmt);
    containerRef.current?.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleApplyDeckCard = (formatName: string, prompt: string) => {
    const matchingTpl = VIDEO_TEMPLATES.find(t => t.format.toLowerCase().includes(formatName.toLowerCase()) || t.title.toLowerCase().includes(formatName.toLowerCase()));
    if (matchingTpl) {
      setSelectedTemplate(matchingTpl);
    }
    const isCustom = currentPrompt.trim().length > 0 && 
                     (!selectedTemplate || currentPrompt !== selectedTemplate.prompt) &&
                     (!selectedFormat || currentPrompt !== selectedFormat.promptExample);
    if (!isCustom) {
      setCurrentPrompt(prompt);
    }
    const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(formatName.toLowerCase())) || VIDEO_FORMATS[1];
    setSelectedFormat(fmt);
    containerRef.current?.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSimulateReferenceUpload = () => {
    setReferenceUploaded('ref_sample_frame.png');
  };

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
      {/* Top 3D Fanned-out Format Stack & Social Badges */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
        {/* Interactive 3D Fanned Deck */}
        <Floating3DDeck onSelect={handleApplyDeckCard} />

        {/* Social Icons row */}
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">▶</span>
          <span className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold shadow-xs">♪</span>
          <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">📷</span>
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">f</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Remix a proven format
        </h2>
      </div>

      {/* Main Studio Input Box with 3D Depth & Glare */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_12px_36px_-6px_rgba(0,117,253,0.12),0_2px_8px_rgba(0,0,0,0.04)] sheen-3d-border p-4 transition-all">
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

            {selectedTemplate && (
              <div className="mt-2 flex items-center justify-between p-2 px-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400 truncate">
                    Template: {selectedTemplate.title}
                  </span>
                  <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 shrink-0">
                    {selectedTemplate.format}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-xs font-semibold px-2 py-0.5 rounded hover:bg-neutral-200/50 dark:hover:bg-neutral-800 shrink-0 ml-2"
                  title="Clear selected template"
                >
                  Clear ✕
                </button>
              </div>
            )}

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
            <button
              type="button"
              onClick={() => setIsFormatModalOpen(true)}
              className="relative overflow-hidden flex-1 min-h-[140px] w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/60 dark:bg-neutral-900/50 cursor-pointer flex flex-col items-center justify-center p-0 text-center transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedTemplate || (selectedFormat && selectedFormat.id !== 'no-format') ? (
                <div className="relative w-full h-full min-h-[140px] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                  <video
                    src={selectedTemplate?.videoUrl || selectedFormat?.videoUrl || '/videos/nature-blooming.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PREVIEW</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left z-10">
                    <div className="text-[11px] font-bold text-white truncate drop-shadow">
                      {selectedTemplate?.title || selectedFormat?.name}
                    </div>
                    <div className="text-[9px] text-blue-300 font-semibold truncate drop-shadow">
                      {selectedTemplate?.format || selectedFormat?.badge} • Click to change
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-xs border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:scale-110 group-hover:text-blue-600 transition-all mb-2">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Choose a format
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-0.5">
                    Freeform prompt (Custom)
                  </span>
                </div>
              )}
            </button>

            {/* Generate Button with credit badge */}
            <button
              onClick={() => startVideoGeneration(referenceUploaded)}
              disabled={isGenerating}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isGenerating
                  ? 'bg-neutral-400 dark:bg-neutral-700 text-white cursor-not-allowed'
                  : 'everygen-btn-primary text-white active:scale-98'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                  <span>Rendering {generationProgress}%</span>
                </>
              ) : (
                <>
                  <span>Generate Video</span>
                  <div className="flex items-center gap-0.5 opacity-90 font-mono text-[11px]">
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

        {/* Templates Grid with 3D Tilt Players */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {filteredTemplates.map(tpl => (
            <Card3D
              key={tpl.id}
              maxTilt={6}
              scale={1.02}
              className="space-y-2 group p-2 rounded-2xl bg-white/90 dark:bg-[#060810]/90 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 shadow-xs hover:shadow-xl transition-all"
            >
              <VideoVisualPlayer
                theme={tpl.visualTheme}
                title={tpl.title}
                prompt={tpl.prompt}
                duration={tpl.duration}
                imageUrl={tpl.imageUrl}
                videoUrl={tpl.videoUrl}
                aspectRatio="9:16"
              />

              <div className="space-y-1.5 px-1">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">
                    {tpl.format}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    HD VIDEO
                  </span>
                </div>

                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate" title={tpl.title}>
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
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Remix
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};
