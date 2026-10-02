import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  Download,
  Trash2,
  Share2,
  HardDrive,
  CheckCircle2,
  Clock,
  ExternalLink,
  Tag,
  Film,
  FileText,
  Volume2,
  Image as ImageIcon,
  WifiOff,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectAsset } from '../types';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const ProjectsDashboard: React.FC = () => {
  const { projects, deleteProject, toggleOfflineCache, setActivePreviewProject, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'title'>('date');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredProjects = projects
    .filter(p => {
      if (filterType !== 'all' && p.type !== filterType) return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.format.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.createdAt - a.createdAt;
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return a.title.localeCompare(b.title);
    });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProjects.map(p => p.id));
    }
  };

  const handleBatchDelete = () => {
    selectedIds.forEach(id => deleteProject(id));
    setSelectedIds([]);
  };

  const handleBatchDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects.filter(p => selectedIds.includes(p.id))));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `everygen_batch_export_${Date.now()}.json`);
    dlAnchor.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes > 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000).toFixed(0)} KB`;
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      {/* Top Controls & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Generated Projects
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Manage your AI videos, scripts, audio tracks, and cached assets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
                {selectedIds.length} selected
              </span>
              <button
                onClick={handleBatchDownload}
                className="text-neutral-700 dark:text-neutral-300 hover:text-blue-600 p-1 rounded"
                title="Download selected"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleBatchDelete}
                className="text-red-500 hover:text-red-700 p-1 rounded"
                title="Delete selected"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() => setActiveTab('shorts-studio')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Video Generation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'video', label: 'Videos' },
            { id: 'image', label: 'Images' },
            { id: 'audio', label: 'Audio Stems' },
            { id: 'script', label: 'Scripts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title or format..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700"
            />
          </div>

          <button
            onClick={() => setSortBy(sortBy === 'date' ? 'size' : sortBy === 'size' ? 'title' : 'date')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
            title="Sort projects"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span className="capitalize">{sortBy}</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl bg-neutral-50 dark:bg-[#14151e] border border-dashed border-neutral-200 dark:border-neutral-800 space-y-3">
          <FolderKanban className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            No projects found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Generate your first video in Shorts Studio or adjust your filters.
          </p>
          <button
            onClick={() => setActiveTab('shorts-studio')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-colors mt-2"
          >
            Create in Shorts Studio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className={`group rounded-2xl bg-white dark:bg-[#14151e] border p-3 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                {/* Media Preview Thumbnail */}
                <div className="relative mb-3 rounded-xl overflow-hidden cursor-pointer">
                  {p.type === 'video' ? (
                    <VideoVisualPlayer
                      theme={p.visualTheme || 'disney'}
                      title={p.title}
                      duration={p.duration || '10s'}
                      aspectRatio={p.aspectRatio}
                    />
                  ) : p.type === 'script' ? (
                    <div 
                      onClick={() => setActivePreviewProject(p)}
                      className="aspect-video bg-gradient-to-br from-amber-500/10 to-orange-500/20 border border-amber-300/30 rounded-xl p-4 flex flex-col justify-between text-amber-900 dark:text-amber-200"
                    >
                      <FileText className="w-8 h-8 text-amber-500" />
                      <div className="text-[11px] font-mono line-clamp-3 leading-relaxed">
                        {p.prompt}
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setActivePreviewProject(p)}
                      className="aspect-square bg-gradient-to-br from-purple-900 to-indigo-950 rounded-xl p-4 flex flex-col justify-between text-white"
                    >
                      <ImageIcon className="w-8 h-8 text-purple-400" />
                      <div className="text-xs font-bold truncate">{p.title}</div>
                    </div>
                  )}

                  {/* Checkbox selector */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(p.id);
                    }}
                    className={`absolute top-2 left-2 z-20 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-black/50 border-white/50 text-transparent hover:border-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Offline Cache Status Badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOfflineCache(p.id);
                    }}
                    className="absolute top-2 right-2 z-20 p-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] flex items-center gap-1 hover:bg-black/80"
                    title={p.status === 'cached_offline' ? 'Saved for offline use' : 'Save offline'}
                  >
                    {p.status === 'cached_offline' ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <HardDrive className="w-3 h-3" />
                        <span>Cached</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-neutral-300">
                        <WifiOff className="w-3 h-3" />
                        <span>Online</span>
                      </span>
                    )}
                  </button>
                </div>

                {/* Meta details */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 
                      onClick={() => setActivePreviewProject(p)}
                      className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate flex-1"
                    >
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      {formatSize(p.sizeBytes)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                    <span>{p.model}</span>
                    <span>·</span>
                    <span>{p.resolution}</span>
                    {p.duration && (
                      <>
                        <span>·</span>
                        <span>{p.duration}</span>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-neutral-500">
                    <button
                      onClick={() => setActivePreviewProject(p)}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${p.id}_metadata.json`;
                          a.click();
                        }}
                        className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700"
                        title="Download JSON/Asset"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-neutral-400 hover:text-red-600"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
