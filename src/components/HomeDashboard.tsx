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
  ArrowUp,
  ArrowUpRight,
  Paperclip,
  CheckCircle2,
  Play,
  Share2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_TEMPLATES, AI_MODELS, VIDEO_FORMATS } from '../data/mockData';
import { VideoVisualPlayer } from './VideoVisualPlayer';
import { Card3D } from './Card3D';

export const HomeDashboard: React.FC = () => {
  const {
    setActiveTab,
    setSelectedFormat,
    setCurrentPrompt,
    selectedModel,
    setSelectedModel,
    setIsPromptBuilderOpen,
    setIsModelModalOpen,
    startVideoGeneration,
    setSelectedTemplate
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [heroPrompt, setHeroPrompt] = useState('');
  const [isSubmittingHero, setIsSubmittingHero] = useState(false);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});

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
    { name: 'Auto Captions', icon: Subtitles, color: 'from-blue-500 to-indigo-600', tab: 'shorts-studio' },
    { name: 'Caption Remover', icon: Scissors, color: 'from-emerald-500 to-teal-600', tab: 'shorts-studio' },
    { name: 'Prompt Library', icon: Sparkles, color: 'from-pink-500 to-rose-600', tab: 'prompt-library' },
    { name: 'AI Voiceover', icon: Mic, color: 'from-rose-500 to-red-600', tab: 'audio-studio' },
    { name: 'Scriptwriter', icon: FileText, color: 'from-blue-600 to-cyan-600', tab: 'shorts-studio' },
    { name: 'AI Clone', icon: Copy, color: 'from-purple-500 to-violet-600', tab: 'shorts-studio' },
    { name: 'Downloader', icon: Download, color: 'from-teal-500 to-emerald-600', tab: 'my-projects' },
    { name: 'Voice Changer', icon: Sliders, color: 'from-amber-500 to-orange-600', tab: 'audio-studio' },
    { name: 'Video Editor', icon: Maximize2, color: 'from-blue-600 to-indigo-700', tab: 'shorts-studio' },
    { name: 'Video Ideation', icon: Lightbulb, color: 'from-yellow-500 to-amber-600', tab: 'shorts-studio' },
    { name: 'AI Story Video', icon: Film, color: 'from-indigo-600 to-blue-600', tab: 'shorts-studio' },
    { name: 'Story Template', icon: Layers, color: 'from-fuchsia-600 to-pink-600', tab: 'shorts-studio' }
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim()) return;
    setIsSubmittingHero(true);
    setCurrentPrompt(heroPrompt);
    setTimeout(() => {
      setIsSubmittingHero(false);
      setActiveTab('shorts-studio');
    }, 350);
  };

  const handleRemixFormat = (tpl: typeof VIDEO_TEMPLATES[0]) => {
    setSelectedTemplate(tpl);
    setCurrentPrompt(tpl.prompt);
    const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(tpl.format.toLowerCase())) || VIDEO_FORMATS[0];
    setSelectedFormat(fmt);
    setActiveTab('shorts-studio');
  };

  const handleQuickTemplate = (cardId: string, templateName: string) => {
    const matchingTpl = VIDEO_TEMPLATES.find(t => t.format.toLowerCase().includes(templateName.toLowerCase()) || t.title.toLowerCase().includes(templateName.toLowerCase()));
    if (matchingTpl) {
      setSelectedTemplate(matchingTpl);
    }
    if (cardId === 'shorts-studio') {
      const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(templateName.toLowerCase())) || VIDEO_FORMATS[0];
      setSelectedFormat(fmt);
      setCurrentPrompt(`A viral 4K ${templateName} short with ultra-detailed textures, dynamic lighting, and cinematic motion`);
      setActiveTab('shorts-studio');
    } else if (cardId === 'ai-video') {
      setCurrentPrompt(`Cinematic 4K scene with ${templateName}, high quality motion blur, photorealistic depth of field`);
      setActiveTab('shorts-studio');
    } else if (cardId === 'marketing-studio') {
      setCurrentPrompt(`High-conversion UGC video ad: ${templateName}, high CTR hook, captivating visual storytelling`);
      setActiveTab('shorts-studio');
    } else {
      setCurrentPrompt(`4K production for ${templateName}`);
      setActiveTab('shorts-studio');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-12 relative scroll-smooth focus:outline-none">
      {/* Background Ambient Glow */}
      <div className="testhero-hero-gradient absolute top-0 left-0 right-0 h-[520px] pointer-events-none -z-0" />

      {/* 1. HERO SECTION: "What will you create?" */}
      <section className="relative z-10 pt-4 pb-2 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
          What will you create?
        </h1>
        <p className="mt-3.5 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-normal max-w-xl">
          Social Media Content, UGC, Ads, Images, and viral shorts in seconds.
        </p>

        {/* HERO PROMPT COMPOSER (Signature Everygen Prompt Box with 3D Tilt) */}
        <Card3D maxTilt={3} scale={1.01} className="w-full mt-7 max-w-2xl text-left">
          <form 
            onSubmit={handleHeroSubmit}
            className="relative rounded-3xl bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-700/80 shadow-[0_12px_36px_-6px_rgba(0,117,253,0.14),0_2px_6px_rgba(0,0,0,0.06)] sheen-3d-border p-3.5 sm:p-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15"
          >
            <div className="relative">
              <textarea
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder="Describe what you want to create (e.g. 10s viral hydraulic press crushing glowing ruby in 4k)..."
                rows={2}
                className="w-full bg-transparent resize-none border-0 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm sm:text-base outline-none pr-10 focus:ring-0 leading-relaxed"
              />
            </div>

            {/* Bottom Controls inside composer */}
            <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 mt-1">
              <div className="flex items-center gap-2">
                {/* Attachment Button */}
                <button
                  type="button"
                  onClick={() => setIsPromptBuilderOpen(true)}
                  className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Enhance prompt with AI Co-pilot"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                </button>

                {/* Model Selector Pill */}
                <button
                  type="button"
                  onClick={() => setIsModelModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold">{selectedModel.name}</span>
                  <span className="text-[10px] text-neutral-400">({selectedModel.maxResolution})</span>
                </button>
              </div>

              {/* Submit Blue Gradient Pill Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPrompt('Hydraulic press crushing rare anime figurine with neon sparks, slow motion 4k');
                    setHeroPrompt('Hydraulic press crushing rare anime figurine with neon sparks, slow motion 4k');
                  }}
                  className="hidden sm:inline-block text-[11px] text-neutral-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Try example
                </button>

                <button
                  type="submit"
                  disabled={!heroPrompt.trim()}
                  className={`size-9 rounded-full flex items-center justify-center text-white transition-all shadow-sm ${
                    heroPrompt.trim()
                      ? 'everygen-btn-primary cursor-pointer'
                      : 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed opacity-60'
                  }`}
                  aria-label="Generate Video"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </form>
        </Card3D>

        {/* Creator Avatars & Social Proof */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {[
              { name: 'Alex Rivera', bg: 'from-blue-500 to-indigo-600', text: 'AR' },
              { name: 'Sophia Chen', bg: 'from-purple-500 to-pink-500', text: 'SC' },
              { name: 'Marcus Brody', bg: 'from-amber-500 to-rose-500', text: 'MB' },
              { name: 'Elena Rostova', bg: 'from-emerald-500 to-teal-600', text: 'ER' },
            ].map((c, i) => (
              <div 
                key={i} 
                title={c.name}
                className={`inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white dark:ring-neutral-900 bg-gradient-to-tr ${c.bg} text-[9px] font-bold text-white shadow-xs select-none`}
              >
                {c.text}
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Trusted by creators with over <strong className="text-neutral-800 dark:text-neutral-200 font-semibold">2.4 billion views</strong>
          </span>
        </div>
      </section>

      {/* 2. "Every AI tool you need, in one place" — 3 SHOWCASE CARDS */}
      <section className="space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Every AI tool you need, <span className="text-blue-600 dark:text-blue-400 font-normal">in one place</span>
          </h2>
          <div className="flex items-center gap-1.5 max-w-full overflow-hidden">
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-full overflow-x-auto max-w-full scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white dark:bg-[#0a0b14] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(() => {
            const showcaseCards = [
              {
                id: 'ai-video',
                name: 'AI Video Generator',
                description: 'Generate AI videos without watermarks, ready to post.',
                badge: 'KLING & MINIMAX',
                highlightTitle: 'KLING 3.0 & SEEDANCE',
                subtitle: 'Physical simulation & cinematic motion blur',
                videoSrc: '/videos/animation-clip.mp4',
                poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Make a video',
                categories: ['All', 'Video'],
                tab: 'shorts-studio',
                glowColor: 'from-blue-600/35 via-indigo-600/15 to-transparent',
                accentColor: 'text-cyan-400',
                templates: ['Liquid Simulation', 'Cinematic Motion Blur', 'Drone 4K']
              },
              {
                id: 'marketing-studio',
                name: 'Marketing Studio',
                description: 'The all-in-one studio for creating and cloning winning ads.',
                badge: 'UGC & AD CLONER',
                highlightTitle: 'MARKETING STUDIO',
                subtitle: 'Remix proven winners with high CTR hooks',
                videoSrc: '',
                poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Launch a campaign',
                categories: ['All', 'Video', 'Shorts & Reels'],
                tab: 'shorts-studio',
                glowColor: 'from-rose-600/35 via-purple-600/15 to-transparent',
                accentColor: 'text-pink-400',
                templates: ['Viral UGC Ad', 'Beverage Splash', 'High CTR Hook']
              },
              {
                id: 'shorts-studio',
                name: 'Shorts Studio',
                description: 'Turn a proven short-form format into your own video.',
                isNew: true,
                badge: '13 VIRAL FORMATS',
                highlightTitle: 'SHORTS STUDIO',
                subtitle: 'Hydraulic press, AI court, Zach D, Anime',
                videoSrc: '/videos/cinematic-fantasy.mp4',
                poster: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Make a short',
                categories: ['All', 'Video', 'Shorts & Reels'],
                tab: 'shorts-studio',
                glowColor: 'from-emerald-600/35 via-teal-600/15 to-transparent',
                accentColor: 'text-emerald-400',
                templates: ['Hydraulic Press', 'AI Courtroom', 'Zach D 3D', 'Anime Action']
              },
              {
                id: 'image-generator',
                name: 'AI Image Generator',
                description: 'Generate high-resolution 4K concept art, thumbnails, and textures.',
                badge: 'IMAGEN 3 & FLUX',
                highlightTitle: '4K IMAGE STUDIO',
                subtitle: 'Photorealistic textures, depth of field & cinematic art',
                videoSrc: '',
                poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Create 4K image',
                categories: ['Images'],
                tab: 'image-generator',
                glowColor: 'from-amber-600/35 via-orange-600/15 to-transparent',
                accentColor: 'text-amber-400',
                templates: ['4K Concept Art', 'Photorealistic Textures', 'Cinematic Poster']
              },
              {
                id: 'voiceover-studio',
                name: 'AI Voiceover & Audio',
                description: 'High-fidelity speech synthesis, natural breathing, and emotion.',
                badge: 'NATURAL SPEECH',
                highlightTitle: 'VOICEOVER STUDIO',
                subtitle: 'Emotional pacing, natural breathing & 32+ voices',
                videoSrc: '',
                poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Record voiceover',
                categories: ['Audio & Voice'],
                tab: 'audio-studio',
                glowColor: 'from-violet-600/35 via-indigo-600/15 to-transparent',
                accentColor: 'text-indigo-400',
                templates: ['Natural Speech', '32+ Voices', 'Emotional Tone']
              },
              {
                id: 'scriptwriter',
                name: 'AI Scriptwriter',
                description: 'Turn ideas into high-retention viral scripts with visual hooks.',
                badge: 'GEMINI 2.5 PRO',
                highlightTitle: 'VIRAL HOOK ENGINE',
                subtitle: 'Generate scene-by-scene scripts in 3 seconds',
                videoSrc: '/videos/city-street.mp4',
                poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80',
                actionText: 'Write script',
                categories: ['Scripts & Copy', 'Utilities'],
                tab: 'shorts-studio',
                glowColor: 'from-cyan-600/35 via-blue-600/15 to-transparent',
                accentColor: 'text-cyan-400',
                templates: ['Viral Hook (3s)', 'Scene Breakdown', 'Shorts Retention']
              }
            ];

            const filtered = showcaseCards.filter(c =>
              activeCategory === 'All'
                ? ['ai-video', 'marketing-studio', 'shorts-studio'].includes(c.id)
                : c.categories.includes(activeCategory)
            );

            const displayCards = filtered.length > 0 ? filtered : showcaseCards.slice(0, 3);

            return displayCards.map((card) => {
              return (
                <Card3D
                  key={card.id}
                  maxTilt={6}
                  scale={1.02}
                  className="h-full"
                >
                  <div
                    onClick={() => setActiveTab(card.tab as any)}
                    className="group relative rounded-3xl p-3 bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-500/50 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                  >
                  {/* Aspect Video Preview Screen with Looping Video & Visual Motion */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200/40 dark:border-neutral-800 flex items-center justify-center">
                    {/* Live HTML5 Looping Video */}
                    {card.videoSrc && (
                      <video
                        src={card.videoSrc}
                        poster={card.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0 pointer-events-none"
                      />
                    )}

                    {/* High-Res Fallback Poster Image — behind video */}
                    <img
                      src={card.poster}
                      alt={card.name}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover z-[-1] pointer-events-none"
                    />

                    {/* Ambient Color Glow Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.glowColor} mix-blend-screen opacity-70 pointer-events-none z-10`} />

                    {/* Cinematic Vignette Overlay to ensure razor-sharp text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 group-hover:from-black/75 group-hover:via-black/30 transition-all duration-300 pointer-events-none z-10" />

                    {/* Top Left: Badges ("New" pill + Live Status Badge) */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                      {card.isNew && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md shadow-blue-600/40 tracking-wide">
                          New
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>{card.badge}</span>
                      </div>
                    </div>

                    {/* Top Right: Quality & Motion Tag */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-neutral-200 border border-white/15 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        4K 60FPS
                      </span>
                    </div>

                    {/* Centered Typography & Details from user reference */}
                    <div className="relative z-20 flex flex-col items-center text-center p-4 select-none pointer-events-none">
                      <span className="text-xl font-black text-white tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                        {card.highlightTitle}
                      </span>
                      <span className="text-xs text-neutral-200 mt-1 max-w-[240px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] leading-relaxed font-medium">
                        {card.subtitle}
                      </span>
                    </div>

                    {/* Hover Floating Pill CTA */}
                    <div className="absolute inset-0 z-30 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-900 text-xs font-bold shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                        <span>{card.actionText}</span>
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </span>
                    </div>

                    {/* Live Progress Scrubber Animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-20">
                      <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 animate-pulse w-full" />
                    </div>
                  </div>

                  {/* Bottom Info & Interactive Template Chips */}
                  <div className="p-3 pt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                        {card.name}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {card.description}
                      </p>
                    </div>

                    {/* Quick Template Chips */}
                    {card.templates && card.templates.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/60">
                        <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mr-0.5">Templates:</span>
                        {card.templates.map((tplName) => (
                          <button
                            key={tplName}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickTemplate(card.id, tplName);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                            title={`Load ${tplName} template`}
                          >
                            {tplName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card3D>
            );
          });
          })()}
        </div>
      </section>

      {/* 3. MCP INTEGRATION & TOP MODELS GRID */}
      <section className="space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              State-of-the-Art AI Models
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Access the frontier generation engines with zero API configuration hassle.
            </p>
          </div>
          <button 
            onClick={() => setIsModelModalOpen(true)}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore all models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fan-out MCP Card (Everygen for Claude & GPT) */}
          <Card3D
            maxTilt={6}
            scale={1.02}
            className="sm:col-span-2 lg:col-span-1 h-full"
          >
            <div
              onClick={() => setActiveTab('supercomputer')}
              className="group relative h-full rounded-3xl p-5 bg-gradient-to-b from-[#0a1838] to-[#071126] border border-blue-500/30 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
            {/* Fan Graphic */}
            <div className="relative h-28 flex items-center justify-center py-2">
              {/* ChatGPT Icon */}
              <div className="vm-mcp-fan-left absolute w-14 h-14 rounded-2xl bg-white shadow-lg border border-neutral-200 flex items-center justify-center p-2 z-10">
                <span className="text-xs font-black text-emerald-600">GPT</span>
              </div>
              {/* Everygen Center Icon */}
              <div className="vm-mcp-fan-center absolute w-16 h-16 rounded-2xl bg-blue-600 shadow-xl border-2 border-white flex items-center justify-center p-2 z-20">
                <Video className="w-7 h-7 text-white fill-white" />
              </div>
              {/* Claude Icon */}
              <div className="vm-mcp-fan-right absolute w-14 h-14 rounded-2xl bg-white shadow-lg border border-neutral-200 flex items-center justify-center p-2 z-10">
                <span className="text-xs font-black text-amber-700">Claude</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  MCP Protocol
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Fable & Astra</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                NovaGen for Claude & GPT
              </h3>
              <p className="text-xs text-blue-200/70 mt-0.5 line-clamp-2">
                Generate and edit viral short-form videos directly from Claude desktop or custom GPTs.
              </p>
            </div>
          </div>
        </Card3D>

          {/* Model Card 1: Seedance 2.5 */}
          <Card3D maxTilt={6} scale={1.02}>
            <div
              onClick={() => {
                const m = AI_MODELS.find(x => x.id === 'seedance-2.5');
                if (m) setSelectedModel(m);
                setActiveTab('shorts-studio');
              }}
              className="group h-full rounded-3xl p-3 bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-md border border-blue-500/40 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 mb-3 border border-neutral-200/40 dark:border-neutral-800">
                <video
                  src="/videos/urban-car-drive.mp4"
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-blue-500/80 backdrop-blur-sm flex items-center justify-center font-black text-white text-xs z-10">
                  S2.5
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold z-10">
                  1080P
                </div>
              </div>
              <div className="px-1 mt-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                  Seedance 2.5
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Up to 30s clips with unmatched camera momentum & fluid human anatomy.
                </p>
                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">ByteDance</span>
                  <span className="text-blue-600 font-medium">Use Model →</span>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Model Card 2: Kling 3.0 Turbo */}
          <Card3D maxTilt={6} scale={1.02}>
            <div
              onClick={() => {
                const m = AI_MODELS.find(x => x.id === 'kling-3.0-turbo');
                if (m) setSelectedModel(m);
                setActiveTab('shorts-studio');
              }}
              className="group h-full rounded-3xl p-3 bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 mb-3 border border-neutral-200/40 dark:border-neutral-800">
                <video
                  src="/videos/playful-pet.mp4"
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-amber-500/80 backdrop-blur-sm flex items-center justify-center font-black text-white text-xs z-10">
                  K3
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-amber-400 text-[9px] font-bold z-10 border border-amber-500/30">
                  New
                </div>
              </div>
              <div className="px-1 mt-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                  Kling 3.0 Turbo
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Lightning fast prompt-to-video with synchronized native sound effects.
                </p>
                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Kuaishou</span>
                  <span className="text-blue-600 font-medium">Use Model →</span>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Model Card 3: Google Veo 3.1 */}
          <Card3D maxTilt={6} scale={1.02}>
            <div
              onClick={() => {
                const m = AI_MODELS.find(x => x.id === 'veo-3.1');
                if (m) setSelectedModel(m);
                setActiveTab('shorts-studio');
              }}
              className="group h-full rounded-3xl p-3 bg-white/95 dark:bg-[#080a12]/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 mb-3 border border-neutral-200/40 dark:border-neutral-800">
                <video
                  src="/videos/nature-blooming.mp4"
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-indigo-500/80 backdrop-blur-sm flex items-center justify-center font-black text-white text-xs z-10">
                  V3
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-indigo-400 text-[9px] font-bold z-10 border border-indigo-500/30">
                  4K Cinema
                </div>
              </div>
              <div className="px-1 mt-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                  Google Veo 3.1
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  The premier 4K generative model with photorealistic physics and lighting.
                </p>
                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Google DeepMind</span>
                  <span className="text-blue-600 font-medium">Use Model →</span>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* 4. UTILITY TOOLBAR */}
      <section className="space-y-3.5 max-w-7xl mx-auto">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Creative Utility Suite
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {utilityTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.name}
                onClick={() => {
                  if (tool.name === 'Prompt Library') {
                    setActiveTab('prompt-library');
                  } else {
                    setActiveTab(tool.tab as any);
                  }
                }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-[#080a12] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. TRENDING COMMUNITY REMIXES (Viral Shorts Showcase) */}
      <section className="space-y-4 max-w-7xl mx-auto pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Trending community formats
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              1-click remix proven formats with automated hooks, SFX, and pacing.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('shorts-studio')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Browse all formats</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {VIDEO_TEMPLATES.slice(0, 5).map(tpl => (
            <div 
              key={tpl.id} 
              className="group rounded-2xl p-2.5 bg-white dark:bg-[#080a12] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-2">
                <VideoVisualPlayer
                  theme={tpl.visualTheme}
                  title={tpl.title}
                  prompt={tpl.prompt}
                  duration={tpl.duration}
                  imageUrl={tpl.imageUrl}
                  videoUrl={tpl.videoUrl}
                  aspectRatio="9:16"
                />
              </div>

              <div className="space-y-1.5 px-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[130px]">
                    {tpl.title}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {tpl.duration}
                  </span>
                </div>
                
                <button
                  onClick={() => handleRemixFormat(tpl)}
                  className="w-full py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Remix format</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
