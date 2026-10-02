import React, { useState, useEffect } from 'react';
import { Search, X, Video, Sparkles, FolderKanban, ShieldCheck, Calendar, Key, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_FORMATS, AI_MODELS } from '../data/mockData';

export const SearchCommandModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    setActiveTab,
    setSelectedFormat,
    setSelectedModel,
    projects
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredFormats = VIDEO_FORMATS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
  const filteredModels = AI_MODELS.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search formats, models, projects, or commands..."
            autoFocus
            className="flex-1 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Views Navigation */}
          <div>
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 px-2">
              Studio Navigation
            </div>
            <div className="space-y-1">
              {[
                { name: 'Shorts Studio', tab: 'shorts-studio', icon: Video },
                { name: 'Generated Projects', tab: 'my-projects', icon: FolderKanban },
                { name: 'Content Calendar', tab: 'calendar', icon: Calendar },
                { name: 'Roles & 2FA', tab: 'team-roles', icon: ShieldCheck },
                { name: 'API & Webhooks', tab: 'api-keys', icon: Key }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.tab as any);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-neutral-800 dark:text-neutral-200"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span>{item.name}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formats */}
          {filteredFormats.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 px-2">
                Viral Formats
              </div>
              <div className="space-y-1">
                {filteredFormats.slice(0, 4).map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFormat(f);
                      setActiveTab('shorts-studio');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-neutral-800 dark:text-neutral-200"
                  >
                    <div>
                      <div className="font-semibold">{f.name}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{f.description}</div>
                    </div>
                    <span className="text-[10px] text-blue-600 font-mono">Use format</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Models */}
          {filteredModels.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 px-2">
                Models
              </div>
              <div className="space-y-1">
                {filteredModels.slice(0, 3).map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m);
                      setActiveTab('shorts-studio');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="font-semibold">{m.name} ({m.provider})</div>
                    <span className="text-[10px] text-neutral-400 font-mono">{m.maxResolution}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
