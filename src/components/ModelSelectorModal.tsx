import React, { useState } from 'react';
import { X, Search, Check, ChevronRight, Zap, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AI_MODELS } from '../data/mockData';
import { AIModel } from '../types';

export const ModelSelectorModal: React.FC = () => {
  const {
    isModelModalOpen,
    setIsModelModalOpen,
    selectedModel,
    setSelectedModel
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModelModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsModelModalOpen]);

  if (!isModelModalOpen) return null;

  const filteredModels = AI_MODELS.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectModel = (model: AIModel) => {
    setSelectedModel(model);
    setIsModelModalOpen(false);
  };

  return (
    <div 
      onClick={() => setIsModelModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden cursor-default"
      >
        {/* Search Header (Screenshot 5 replica) */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              autoFocus
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 transition-all"
            />
          </div>
          <button
            onClick={() => setIsModelModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Models List & Sub-selection columns */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Popular & Providers */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1">
              Popular Models
            </div>

            <div className="space-y-1.5">
              {filteredModels.map((m) => {
                const isSelected = selectedModel.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => handleSelectModel(m)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-blue-600 shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1 truncate">
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors truncate">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate">
                          {m.provider} · {m.maxResolution}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {m.tag && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                          {m.tag}
                        </span>
                      )}
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Model Specs & Capabilities */}
          <div className="border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-800/80 md:pl-4 space-y-4">
            <div className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1">
              Active Model Specs
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedModel.name}
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-500">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedModel.creditsPerUnit} credits/gen</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedModel.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Provider</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedModel.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Max Resolution</span>
                  <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{selectedModel.maxResolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Audio Support</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Synchronized Sound</span>
                </div>
              </div>

              <button
                onClick={() => setIsModelModalOpen(false)}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors mt-2"
              >
                Use this model
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
