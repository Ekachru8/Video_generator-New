import React, { useState, useEffect } from 'react';
import {
  FileText,
  X,
  Copy,
  Check,
  Send,
  Trash2,
  Download,
  Sparkles,
  BookOpen,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreativeScratchpadModal: React.FC = () => {
  const {
    isScratchpadOpen,
    setIsScratchpadOpen,
    setCurrentPrompt,
    setActiveTab,
    addNotification
  } = useApp();

  const [activeTabName, setActiveTabName] = useState<'prompt' | 'script' | 'hooks'>('prompt');
  const [scratchContent, setScratchContent] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('novagen_scratchpad_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      prompt: 'A viral 4K scene with dramatic lighting, cinematic shallow depth of field, high-speed camera motion, and volumetric light rays.',
      script: 'Hook (0-2s): Stop scrolling! Did you know this secret about AI videos?\nReveal (3-6s): Here is the exact prompt structure that gets 10M+ views.\nCTA (7-10s): Remix this viral template right now in NovaGen Studio.',
      hooks: '1. "Nobody is talking about this new AI video feature..."\n2. "I tested 100 AI models so you do not have to..."\n3. "This 3D camera effect looks like a $50M movie..."\n4. "POV: You discovered how creators make viral shorts in 10 seconds..."'
    };
  });

  const [copied, setCopied] = useState(false);

  // Persist notes
  useEffect(() => {
    localStorage.setItem('novagen_scratchpad_content', JSON.stringify(scratchContent));
  }, [scratchContent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsScratchpadOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsScratchpadOpen]);

  if (!isScratchpadOpen) return null;

  const currentText = scratchContent[activeTabName] || '';

  const handleTextChange = (val: string) => {
    setScratchContent(prev => ({
      ...prev,
      [activeTabName]: val
    }));
  };

  const handleCopy = () => {
    if (!currentText.trim()) return;
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addNotification('Copied to Clipboard', 'Scratchpad notes copied successfully', 'system');
  };

  const handleSendToStudio = () => {
    if (!currentText.trim()) return;
    setCurrentPrompt(currentText.trim());
    setIsScratchpadOpen(false);
    setActiveTab('shorts-studio');
    addNotification('Draft Loaded', 'Notes transferred directly into Shorts Studio prompt', 'system');
  };

  const handleClear = () => {
    if (confirm('Clear current scratchpad notes?')) {
      handleTextChange('');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `novagen_scratchpad_${activeTabName}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const charCount = currentText.length;

  const quickTemplates = [
    {
      title: 'Cinematic 4K',
      text: 'Ultra-photorealistic 4K cinematic scene, anamorphic lens flare, moody twilight volumetric fog, dynamic slow pan, 60fps'
    },
    {
      title: 'Disney 3D',
      text: 'Adorably cute 3D character with fluffy detailed fur and bright expressive eyes, Pixar-grade studio lighting, joyful animated bounce'
    },
    {
      title: 'Hydraulic Press',
      text: 'Slow-motion macro footage of a massive 500-ton hydraulic press crushing glowing neon objects with explosive sparks and high frame rate'
    },
    {
      title: 'GTA 6 Speed',
      text: 'Hyper-realistic video game chase through a neon-lit vice city boulevard at dusk, wet street asphalt reflections, high-speed camera tracking'
    }
  ];

  return (
    <div 
      onClick={() => setIsScratchpadOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-white/95 dark:bg-[#0f121d]/95 backdrop-blur-2xl border-l border-neutral-200/90 dark:border-neutral-800/90 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 cursor-default"
      >
        {/* Top Header */}
        <div className="p-4 px-6 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>Creative Scratchpad</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Auto-Saved
                </span>
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Brainstorm prompts, draft hooks, and transfer directly to Studio
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsScratchpadOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-1 border-b border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {[
              { id: 'prompt', label: 'Prompt Ideas' },
              { id: 'script', label: 'Script Drafts' },
              { id: 'hooks', label: 'Viral Hooks' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTabName(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTabName === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-neutral-400">
            {wordCount} words • {charCount} chars
          </div>
        </div>

        {/* Quick Insert Inspiration Pills */}
        <div className="px-6 py-2.5 bg-neutral-50/70 dark:bg-neutral-900/30 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Formulas:</span>
          </span>
          {quickTemplates.map(tpl => (
            <button
              key={tpl.title}
              onClick={() => {
                const updated = currentText ? `${currentText}\n\n${tpl.text}` : tpl.text;
                handleTextChange(updated);
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shrink-0 transition-colors shadow-2xs"
            >
              + {tpl.title}
            </button>
          ))}
        </div>

        {/* Scratchpad Textarea Canvas */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          <textarea
            value={currentText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Start drafting your creative ideas, scene descriptions, voiceover scripts, or prompts here... Everything auto-saves automatically."
            className="flex-1 w-full p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 focus:border-blue-500 focus:outline-none resize-none text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed font-sans placeholder:text-neutral-400 selection:bg-blue-500/20"
          />
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 px-6 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
              title="Copy notes to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs transition-colors cursor-pointer"
              title="Download as .txt"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleClear}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 text-neutral-400 text-xs transition-colors cursor-pointer"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary CTA: Send to Studio */}
          <button
            onClick={handleSendToStudio}
            disabled={!currentText.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
              currentText.trim()
                ? 'everygen-btn-primary text-white active:scale-95'
                : 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
