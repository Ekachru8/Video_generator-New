import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Download,
  Trash2,
  HardDrive,
  CheckCircle2,
  ExternalLink,
  Film,
  FileText,
  Volume2,
  Image as ImageIcon,
  WifiOff,
  Sparkles,
  ArrowUpDown,
  LayoutGrid,
  List,
  X,
  Play,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectAsset } from '../types';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const ProjectsDashboard: React.FC = () => {
  const { projects, deleteProject, toggleOfflineCache, setActivePreviewProject, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'title'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Calculate high-level metrics
  const totalSizeBytes = projects.reduce((acc, p) => acc + (p.sizeBytes || 0), 0);
  const cachedCount = projects.filter(p => p.status === 'cached_offline').length;

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
    dlAnchor.setAttribute("download", `novagen_assets_${Date.now()}.json`);
    dlAnchor.click();
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    if (bytes > 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000).toFixed(0)} KB`;
  };

  const formatDate = (timestamp: number) => {
    const diffHours = (Date.now() - timestamp) / 3600000;
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
    const days = Math.floor(diffHours / 24);
    return `${days}d ago`;
  };

  const getAssetCounts = (type: string) => {
    if (type === 'all') return projects.length;
    return projects.filter(p => p.type === type).length;
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Minimalist Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Files & Projects
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
              <span>{projects.length} files</span>
              <span>·</span>
              <span>{formatSize(totalSizeBytes)}</span>
              {cachedCount > 0 && (
                <>
                  <span>·</span>
                  <span className="text-emerald-500">{cachedCount} cached</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Generated video renders, prompts, audio stems, and offline caches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('shorts-studio')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
            <span>New Generation</span>
          </button>
        </div>
      </div>

      {/* Clean Minimalist Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Segmented Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100/80 dark:bg-neutral-900/80 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All', icon: FolderKanban },
            { id: 'video', label: 'Videos', icon: Film },
            { id: 'image', label: 'Images', icon: ImageIcon },
            { id: 'audio', label: 'Audio', icon: Volume2 },
            { id: 'script', label: 'Scripts', icon: FileText }
          ].map(tab => {
            const count = getAssetCounts(tab.id);
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
                    : 'bg-neutral-200/50 dark:bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort & View Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Minimal Search Input */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 border border-neutral-200/40 dark:border-neutral-800/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortBy(sortBy === 'date' ? 'size' : sortBy === 'size' ? 'title' : 'date')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/40 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Sort files"
          >
            <ArrowUpDown className="w-3 h-3 text-neutral-400" />
            <span className="capitalize">{sortBy}</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-neutral-100/80 dark:bg-neutral-900/80 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
              }`}
              title="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-200/60 dark:border-neutral-800/60 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            No files found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {searchQuery ? `No files match "${searchQuery}". Try clearing your search.` : 'Generate your first video in Shorts Studio to see files here.'}
          </p>
          <button
            onClick={() => setActiveTab('shorts-studio')}
            className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-xs shadow-xs transition-colors mt-2 cursor-pointer"
          >
            Create in Shorts Studio
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Minimalist Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProjects.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className={`group relative rounded-2xl bg-white dark:bg-[#07090e] border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Media Thumbnail with Real Video Playback */}
                <div 
                  onClick={() => setActivePreviewProject(p)}
                  className="relative aspect-video w-full bg-neutral-950 overflow-hidden cursor-pointer"
                >
                  {p.type === 'video' ? (
                    <VideoVisualPlayer
                      theme={p.visualTheme || 'cinematic'}
                      title={p.title}
                      prompt={p.prompt}
                      duration={p.duration || '10s'}
                      aspectRatio="16:9"
                      imageUrl={p.imageUrl}
                      videoUrl={p.videoUrl}
                      showTitle={false}
                      autoPlay={true}
                    />
                  ) : p.type === 'image' ? (
                    <div className="w-full h-full relative">
                      <img
                        src={p.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&auto=format&fit=crop&q=80'}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90">
                        {p.resolution}
                      </div>
                    </div>
                  ) : p.type === 'script' ? (
                    <div className="w-full h-full p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/15 border-b border-amber-300/20 flex flex-col justify-between text-amber-900 dark:text-amber-200">
                      <FileText className="w-6 h-6 text-amber-500" />
                      <div className="text-[11px] font-mono line-clamp-2 leading-relaxed opacity-90">
                        {p.prompt}
                      </div>
                      <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                        Script Document
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/15 border-b border-indigo-300/20 flex flex-col justify-between text-indigo-900 dark:text-indigo-200">
                      <Volume2 className="w-6 h-6 text-indigo-500" />
                      <div className="text-xs font-semibold truncate">{p.title}</div>
                      <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">Audio Stem</div>
                    </div>
                  )}

                  {/* Clean Selection Checkbox (always visible if selected, shows on hover otherwise) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(p.id);
                    }}
                    className={`absolute top-2.5 left-2.5 z-30 w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-black/40 border-white/40 text-transparent opacity-0 group-hover:opacity-100 hover:border-white hover:bg-black/60'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  {/* Clean Duration / Type Badge in Bottom Right (only for non-video assets) */}
                  {p.duration && p.type !== 'video' && (
                    <div className="absolute bottom-2.5 right-2.5 z-20 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90">
                      {p.duration}
                    </div>
                  )}
                </div>

                {/* Minimalist Card Details */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => setActivePreviewProject(p)}
                      className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate flex-1"
                      title={p.title}
                    >
                      {p.title}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      {formatSize(p.sizeBytes)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                    <span className="truncate">{p.model}</span>
                    <span>·</span>
                    <span>{p.resolution.replace(/\s*\([^)]*\)/, '')}</span>
                    <span>·</span>
                    <span>{formatDate(p.createdAt)}</span>
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 dark:border-neutral-800/60">
                    <button
                      onClick={() => setActivePreviewProject(p)}
                      className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>

                    <div className="flex items-center gap-1 text-neutral-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOfflineCache(p.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          p.status === 'cached_offline'
                            ? 'text-emerald-500 hover:text-emerald-600 bg-emerald-500/10'
                            : 'hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                        title={p.status === 'cached_offline' ? 'Saved offline' : 'Save offline'}
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActivePreviewProject(p)}
                        className="p-1.5 rounded-lg hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        title="Download / Export"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1.5 rounded-lg hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                        title="Delete"
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
      ) : (
        /* Minimalist List / Table View */
        <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 overflow-hidden bg-white dark:bg-[#07090e] shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/70 dark:bg-neutral-900/40 text-neutral-500 dark:text-neutral-400 font-medium">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredProjects.length && filteredProjects.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-2 font-medium">File Name</th>
                <th className="py-3 px-3 font-medium hidden sm:table-cell">Type</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Model</th>
                <th className="py-3 px-3 font-medium hidden lg:table-cell">Resolution</th>
                <th className="py-3 px-3 font-medium text-right">Size</th>
                <th className="py-3 px-3 font-medium text-right hidden sm:table-cell">Created</th>
                <th className="py-3 px-3 font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              {filteredProjects.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    onClick={() => setActivePreviewProject(p)}
                    className={`group hover:bg-neutral-50/80 dark:hover:bg-neutral-900/40 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td 
                      className="p-3 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(p.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(p.id)}
                        className="rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded-md overflow-hidden bg-neutral-900 shrink-0 relative flex items-center justify-center">
                          {p.type === 'video' ? (
                            <Film className="w-3.5 h-3.5 text-neutral-400" />
                          ) : p.type === 'image' ? (
                            <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-neutral-400 truncate max-w-md font-mono hidden sm:block">
                            {p.format}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 capitalize text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">
                      {p.type}
                    </td>
                    <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300 font-mono text-[11px] hidden md:table-cell">
                      {p.model}
                    </td>
                    <td className="py-3 px-3 text-neutral-500 dark:text-neutral-400 font-mono text-[11px] hidden lg:table-cell">
                      {p.resolution}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-neutral-600 dark:text-neutral-300">
                      {formatSize(p.sizeBytes)}
                    </td>
                    <td className="py-3 px-3 text-right text-neutral-400 font-mono text-[11px] hidden sm:table-cell">
                      {formatDate(p.createdAt)}
                    </td>
                    <td 
                      className="py-3 px-3 text-right pr-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1 text-neutral-400">
                        <button
                          onClick={() => setActivePreviewProject(p)}
                          className="p-1.5 rounded-md hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                          title="Inspect / Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleOfflineCache(p.id)}
                          className={`p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer ${
                            p.status === 'cached_offline' ? 'text-emerald-500' : 'hover:text-neutral-700 dark:hover:text-neutral-200'
                          }`}
                          title="Save offline"
                        >
                          <HardDrive className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setActivePreviewProject(p)}
                          className="p-1.5 rounded-md hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="p-1.5 rounded-md hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modern Floating Batch Actions Bar (Linear / Apple style) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-neutral-100/90 text-white dark:text-neutral-900 backdrop-blur-md shadow-2xl border border-white/10 dark:border-black/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2 pr-2 border-r border-neutral-700 dark:border-neutral-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold font-mono">
              {selectedIds.length} {selectedIds.length === 1 ? 'file' : 'files'} selected
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleBatchDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium hover:bg-white/15 dark:hover:bg-black/10 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={handleBatchDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-red-400 dark:text-red-600 hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="p-1 rounded-full hover:bg-white/15 dark:hover:bg-black/10 text-neutral-400 hover:text-white dark:hover:text-black transition-colors cursor-pointer ml-1"
              title="Deselect all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
