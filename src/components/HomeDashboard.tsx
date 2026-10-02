import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Zap,
  Mic,
  FileText,
  Copy,
  Download,
  Sliders,
  Maximize2,
  Lightbulb,
  Layers,
  Film,
  Subtitles,
  Scissors,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_TEMPLATES } from '../data/mockData';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const HomeDashboard: React.FC = () => {
  const { setActiveTab, setSelectedFormat, setIsPromptBuilderOpen, projects, setActivePreviewProject } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Video',
    'Images',
    'Audio & Voice',
    'Utilities',
    'Shorts & Reels',
    'Scripts & Copy'
  ];

  const utilityTools = [
    { name: 'Auto Captions', icon: Subtitles, color: 'bg-blue-500', tab: 'shorts-studio' },
    { name: 'Caption Remover', icon: Scissors, color: 'bg-emerald-500', tab: 'shorts-studio' },
    { name: 'Prompt Library', icon: Sparkles, color: 'bg-pink-500', tab: 'prompt-library' },
    { name: 'AI Voiceover', icon: Mic, color: 'bg-rose-500', tab: 'audio-studio' },
    { name: 'Scriptwriter', icon: FileText, color: 'bg-blue-600', tab: 'shorts-studio' },
    { name: 'AI Clone', icon: Copy, color: 'bg-pink-600', tab: 'shorts-studio' },
    { name: 'Downloader', icon: Download, color: 'bg-emerald-600', tab: 'my-projects' },
    { name: 'Voice Changer', icon: Sliders, color: 'bg-teal-500', tab: 'audio-studio' },
    { name: 'Video Editor', icon: Maximize2, color: 'bg-blue-500', tab: 'shorts-studio' },
    { name: 'Video Ideation', icon: Lightbulb, color: 'bg-amber-500', tab: 'shorts-studio' },
    { name: 'AI Story Video', icon: Film, color: 'bg-blue-600', tab: 'shorts-studio' },
    { name: 'Story Template', icon: Layers, color: 'bg-amber-600', tab: 'shorts-studio' }
  ];

  const topModels = [
    { name: 'Seedance 2.5', tag: '1080p', type: 'Video', provider: 'ByteDance', desc: 'State-of-the-art motion realism' },
    { name: 'Kling 3.0 Turbo', tag: 'New', type: 'Video', provider: 'Kuaishou', desc: 'Stunning prompt-to-video in seconds' },
    { name: 'ElevenLabs v3', tag: 'New', type: 'Voice', provider: 'ElevenLabs', desc: 'Hyper-natural expressive voiceover' },
    { name: 'Google Veo 3.1', tag: 'Pro', type: 'Video', provider: 'Google', desc: 'Cinematic 4K with environmental audio' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 select-none">
      {/* Category Pills Header with Arrows */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Creative tools
          </h2>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-full">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-white dark:bg-[#1a1b24] text-neutral-900 dark:text-neutral-100 shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 pl-2">
              <button className="p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Large Hero Cards Grid (Screenshot 1 replica) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: AI Video Generator */}
          <div
            onClick={() => setActiveTab('shorts-studio')}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Visual Canvas Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-red-950 to-neutral-900 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-red-600/30 blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute flex flex-col items-center">
                <div className="text-xl font-black italic tracking-wider text-white drop-shadow">
                  SEEDANCE 2.5
                </div>
                <div className="px-2 py-0.5 mt-1 rounded bg-blue-600 text-[10px] font-bold text-white tracking-widest">
                  1080P
                </div>
                <div className="text-[10px] text-neutral-300 mt-1 uppercase tracking-widest font-mono">
                  NOW ON EVERYGEN
                </div>
              </div>
            </div>
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            {/* Bottom Meta */}
            <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col">
              <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                <span>AI Video Generator</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs text-neutral-300 mt-0.5">Every model, up to 4K</span>
            </div>
          </div>

          {/* Card 2: Shorts Studio */}
          <div
            onClick={() => setActiveTab('shorts-studio')}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-900 via-amber-900 to-emerald-950 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-amber-500/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute flex flex-col items-center">
                <div className="text-[10px] tracking-widest font-mono text-amber-300 uppercase">
                  EVERYGEN
                </div>
                <div className="text-xl font-black tracking-tight text-white drop-shadow">
                  SHORTS STUDIO
                </div>
                <span className="text-xs mt-1">🦀 🏖️</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col">
              <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                <span>Shorts Studio</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs text-neutral-300 mt-0.5">13 viral formats</span>
            </div>
          </div>

          {/* Card 3: AI Image Generator */}
          <div
            onClick={() => setActiveTab('image-generator')}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-950 via-cyan-900 to-emerald-900 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-cyan-500/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute flex flex-col items-center">
                <div className="text-[10px] tracking-widest font-mono text-cyan-300 uppercase">
                  EVERYGEN
                </div>
                <div className="text-xl font-black tracking-tight text-white drop-shadow">
                  IMAGE GENERATOR
                </div>
                <div className="text-[11px] text-cyan-200 mt-1">NANO BANANA PRO</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col">
              <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                <span>AI Image Generator</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs text-neutral-300 mt-0.5">Create anything, in 4K</span>
            </div>
          </div>

          {/* Card 4: Marketing Studio */}
          <div
            onClick={() => setActiveTab('shorts-studio')}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-slate-900 to-pink-950 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-purple-500/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute flex flex-col items-center">
                <div className="text-[10px] tracking-widest font-mono text-pink-300 uppercase">
                  EVERYGEN
                </div>
                <div className="text-xl font-black tracking-tight text-white drop-shadow">
                  MARKETING STUDIO
                </div>
                <div className="text-[11px] text-pink-200 mt-1">AD CLONER & HOOKS</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col">
              <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-pink-400 transition-colors">
                <span>Marketing Studio</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs text-neutral-300 mt-0.5">Create and clone winning ads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Utility Section (Screenshot 1 replica) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Utility
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {utilityTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.name}
                onClick={() => {
                  if (tool.name === 'Prompt Library') {
                    setIsPromptBuilderOpen(true);
                  } else {
                    setActiveTab(tool.tab as any);
                  }
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#15161f] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-sm transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-xl ${tool.color} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Models Shelf (Screenshot 1 replica) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Top models
          </h3>
          <button 
            onClick={() => setActiveTab('shorts-studio')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <span>Explore all 14 models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topModels.map(m => (
            <div
              key={m.name}
              onClick={() => setActiveTab('shorts-studio')}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#15161f] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer shadow-xs hover:shadow transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-blue-600">
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                    {m.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {m.type}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Video Templates Quick Reel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Trending community remixes
          </h3>
          <button 
            onClick={() => setActiveTab('shorts-studio')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <span>Browse all formats</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {VIDEO_TEMPLATES.slice(0, 5).map(tpl => (
            <div key={tpl.id} className="space-y-2">
              <VideoVisualPlayer
                theme={tpl.visualTheme}
                title={tpl.title}
                duration={tpl.duration}
                aspectRatio="9:16"
              />
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[120px]">
                  {tpl.title}
                </span>
                <button
                  onClick={() => {
                    setSelectedFormat({
                      id: tpl.category.toLowerCase().replace(/\s+/g, '-'),
                      name: tpl.format,
                      description: tpl.description,
                      category: tpl.category,
                      coverGradient: 'from-blue-600 to-indigo-900',
                      iconName: 'video',
                      promptExample: tpl.prompt
                    });
                    setActiveTab('shorts-studio');
                  }}
                  className="text-[11px] text-blue-600 hover:underline font-medium"
                >
                  Remix
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
