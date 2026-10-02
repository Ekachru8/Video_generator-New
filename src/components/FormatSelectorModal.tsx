import React from 'react';
import { X, Check, Video, Sparkles, Zap, Camera, Smartphone, Gauge, Gamepad2, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VIDEO_FORMATS } from '../data/mockData';
import { VideoFormat } from '../types';

export const FormatSelectorModal: React.FC = () => {
  const {
    isFormatModalOpen,
    setIsFormatModalOpen,
    selectedFormat,
    setSelectedFormat,
    setCurrentPrompt
  } = useApp();

  if (!isFormatModalOpen) return null;

  const handleSelect = (fmt: VideoFormat) => {
    setSelectedFormat(fmt);
    if (fmt.id !== 'no-format') {
      setCurrentPrompt(fmt.promptExample);
    }
    setIsFormatModalOpen(false);
  };

  const getFormatIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'disney':
        return '🏰';
      case 'anime':
        return '⚡';
      case 'cctv':
        return '📹';
      case 'ring doorbell':
        return '🔔';
      case 'shot on iphone':
        return '📱';
      case 'hydraulic press':
        return '💥';
      case 'gta 6':
        return '🌴';
      case 'ai court videos':
        return '⚖️';
      case 'zach d films':
        return '🔬';
      default:
        return '🎬';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header (Screenshot 3 replica) */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Select a format
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Choose a style, or start with your own prompt.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              {VIDEO_FORMATS.length} formats
            </span>
            <button
              onClick={() => setIsFormatModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formats Grid (Screenshot 3 replica) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEO_FORMATS.map((fmt) => {
            const isSelected = selectedFormat.id === fmt.id;
            return (
              <div
                key={fmt.id}
                onClick={() => handleSelect(fmt)}
                className={`group relative rounded-2xl border p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-[#181924]/60 hover:bg-white dark:hover:bg-[#1c1d29]'
                }`}
              >
                {/* Visual Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
                    {getFormatIcon(fmt.name)}
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {fmt.name}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {fmt.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>{fmt.category}</span>
                  <span className="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform">Select format →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
