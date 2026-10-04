import React, { useState } from 'react';
import { X, Download, Share2, Copy, Check, HardDrive, Sparkles, Tag, Film, Clock, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const VideoDetailModal: React.FC = () => {
  const { activePreviewProject, setActivePreviewProject, toggleOfflineCache, addNotification } = useApp();
  const [exportFormat, setExportFormat] = useState<'mp4' | 'gif' | 'webm' | 'srt'>('mp4');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePreviewProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePreviewProject]);

  if (!activePreviewProject) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activePreviewProject.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownload = async () => {
    setIsExporting(true);
    const cleanTitle = (activePreviewProject.title || 'novagen_render').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${cleanTitle}_${activePreviewProject.id}.${exportFormat}`;

    try {
      if (exportFormat === 'srt') {
        const srtContent = `1\n00:00:00,000 --> 00:00:02,800\n${activePreviewProject.title}\n\n2\n00:00:02,800 --> 00:00:07,500\n${activePreviewProject.prompt}\n\n3\n00:00:07,500 --> 00:00:10,000\nRendered with NovaGen Studio (${activePreviewProject.model})\n`;
        const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        addNotification('Subtitles Downloaded', `Exported ${filename}`, 'system');
        setIsExporting(false);
        return;
      }

      const mediaUrl = activePreviewProject.videoUrl || activePreviewProject.imageUrl;

      if (mediaUrl) {
        if (mediaUrl.startsWith('data:') || mediaUrl.startsWith('blob:')) {
          const a = document.createElement('a');
          a.href = mediaUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          addNotification('Export Complete', `Downloaded ${filename}`, 'render_complete');
          setIsExporting(false);
          return;
        }

        // Remote URL - attempt to fetch blob so user gets actual download prompt
        try {
          const res = await fetch(mediaUrl, { mode: 'cors' });
          if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            addNotification('Export Complete', `Downloaded ${filename}`, 'render_complete');
            setIsExporting(false);
            return;
          }
        } catch {
          // If CORS prevents fetch, trigger standard anchor download
          const a = document.createElement('a');
          a.href = mediaUrl;
          a.target = '_blank';
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          addNotification('Media Opened for Download', `Saving ${filename}`, 'render_complete');
          setIsExporting(false);
          return;
        }
      }

      // If no media url exists (e.g. script only)
      const content = `NovaGen Studio Export\nTitle: ${activePreviewProject.title}\nModel: ${activePreviewProject.model}\nResolution: ${activePreviewProject.resolution}\nPrompt:\n${activePreviewProject.prompt}\n`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cleanTitle}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addNotification('Details Exported', 'Project metadata exported', 'system');
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div 
      onClick={() => setActivePreviewProject(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="truncate pr-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
              {activePreviewProject.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mt-0.5">
              <span>{activePreviewProject.model}</span>
              <span>·</span>
              <span>{activePreviewProject.resolution}</span>
              <span>·</span>
              <span>{activePreviewProject.duration || '10s'}</span>
            </div>
          </div>

          <button
            onClick={() => setActivePreviewProject(null)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Player */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px]">
              <VideoVisualPlayer
                theme={activePreviewProject.visualTheme || 'cinematic-studio'}
                title={activePreviewProject.title}
                prompt={activePreviewProject.prompt}
                duration={activePreviewProject.duration || '10s'}
                aspectRatio={activePreviewProject.aspectRatio}
                imageUrl={activePreviewProject.imageUrl}
                videoUrl={activePreviewProject.videoUrl}
              />
            </div>
          </div>

          {/* Right Details & Export Formats */}
          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-neutral-500 font-semibold">
                <span>Prompt Blueprint</span>
                <button
                  onClick={handleCopyPrompt}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 font-mono text-[11px] leading-relaxed text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60 max-h-36 overflow-y-auto">
                {activePreviewProject.prompt}
              </div>
            </div>

            {/* Offline cache switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Offline Cache Available
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Play and export without internet connection
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleOfflineCache(activePreviewProject.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                  activePreviewProject.status === 'cached_offline'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600'
                }`}
              >
                {activePreviewProject.status === 'cached_offline' ? 'Cached' : 'Cache Now'}
              </button>
            </div>

            {/* Export Format Selector */}
            <div className="space-y-2 pt-2">
              <label className="block text-neutral-500 font-semibold">Select Export Format</label>
              <div className="grid grid-cols-4 gap-2 font-mono text-center">
                {(['mp4', 'webm', 'gif', 'srt'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`py-2 rounded-xl uppercase text-[11px] font-bold border transition-all ${
                      exportFormat === fmt
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600'
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    .{fmt}
                  </button>
                ))}
              </div>

              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full mt-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Packaging .{exportFormat}...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Render (.{exportFormat.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
