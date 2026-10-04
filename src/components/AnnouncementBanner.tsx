import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Zap, Shield, Layers } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#0055ff] via-[#0075FD] to-[#3a8bfd] text-white text-xs font-medium py-1.5 px-4 flex items-center justify-between select-none shadow-sm z-40 transition-colors">
        <div className="flex-1 text-center truncate flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] tracking-wide uppercase">
            NovaGen 3.0
          </span>
          <span>4K Neural Video Rendering, 13 Viral Formats & MCP Supercomputer are now live.</span>
          <button 
            onClick={() => setShowModal(true)}
            className="underline underline-offset-2 hover:text-blue-100 font-bold ml-1 cursor-pointer transition-colors"
          >
            Explore features →
          </button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white p-0.5 rounded transition-colors ml-2 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feature Explainer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                  <Sparkles className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Welcome to NovaGen Studio 3.0
                  </h3>
                  <span className="text-xs text-neutral-400">The Next-Gen Creative AI Operating System</span>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              NovaGen Studio unites the world’s most advanced generative video models, viral shorts remix templates, multi-voice actors, and automation tools into one seamless creative workflow.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block">Frontier Video Engines</strong>
                  <span className="text-neutral-500 dark:text-neutral-400">Generate high-fidelity clips with Kling 3.0 Turbo, Seedance 2.5 1080p, and Google Veo 3.1.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block">1-Click Viral Shorts Studio</strong>
                  <span className="text-neutral-500 dark:text-neutral-400">Remix proven formats: Hydraulic Press, AI Court, Zack D, Disney 3D, and CCTV.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block">Claude & GPT MCP Supercomputer</strong>
                  <span className="text-neutral-500 dark:text-neutral-400">Control your studio directly from Claude Desktop or custom AI assistants via MCP protocol.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="everygen-btn-primary w-full py-2.5 rounded-xl text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              Start Creating in NovaGen
            </button>
          </div>
        </div>
      )}
    </>
  );
};
