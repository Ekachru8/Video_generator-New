import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_FORMATS } from '../data/mockData';

export const PromptLibraryView: React.FC = () => {
  const { setCurrentPrompt, setSelectedFormat, setActiveTab } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const curatedPrompts = [
    {
      id: 'p1',
      title: 'Disney 3D Emotional Hero Shot',
      format: 'Disney',
      category: 'Animation',
      prompt: 'A warm 3D animated character with soft rim lighting, expressive eyes glancing into camera, shallow depth of field, 24fps motion blur, Pixar-inspired texture detail.'
    },
    {
      id: 'p2',
      title: 'Viral Hydraulic Press Slow-Mo',
      format: 'Hydraulic press',
      category: 'ASMR',
      prompt: 'Heavy industrial hydraulic press machine slowly descending upon a glossy object, hazard warning stripes, high speed camera 1000fps slow motion crush.'
    },
    {
      id: 'p3',
      title: 'Anime Sakuga Rooftop Duel',
      format: 'Anime',
      category: 'Action',
      prompt: 'High-speed hand-drawn sakuga anime rooftop chase in heavy rain, lightning flashes, timed key poses, dynamic camera tracking.'
    },
    {
      id: 'p4',
      title: 'Found-Footage CCTV Mystery',
      format: 'CCTV',
      category: 'Found Footage',
      prompt: 'Locked-off 1080p security CCTV footage at 3:14 AM with slight sensor noise, high-contrast monochrome infrared lighting, unexpected surreal creature appearance.'
    },
    {
      id: 'p5',
      title: 'Vice City Sunset Convertible Skate',
      format: 'GTA 6',
      category: 'Gaming',
      prompt: 'Third-person trailing action camera behind a vintage convertible speeding across a sun-drenched coastal bridge with palm tree silhouettes.'
    }
  ];

  const handleUsePrompt = (p: typeof curatedPrompts[0]) => {
    setCurrentPrompt(p.prompt);
    const fmt = VIDEO_FORMATS.find(f => f.name.toLowerCase().includes(p.format.toLowerCase())) || VIDEO_FORMATS[1];
    setSelectedFormat(fmt);
    setActiveTab('shorts-studio');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Prompt Engineering Library
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Battle-tested master prompts engineered specifically to bypass model deformities and generate maximum social retention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {curatedPrompts.map((cp) => (
          <div
            key={cp.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {cp.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                  {cp.format}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 font-mono leading-relaxed bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 mt-2">
                "{cp.prompt}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <button
                onClick={() => handleCopy(cp.prompt, cp.id)}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1"
              >
                {copiedId === cp.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === cp.id ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleUsePrompt(cp)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Load in Shorts Studio</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
