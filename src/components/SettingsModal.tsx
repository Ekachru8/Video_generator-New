import React from 'react';
import { X, SlidersHorizontal, Check, Camera, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    aspectRatio,
    setAspectRatio,
    motionStrength,
    setMotionStrength,
    cameraMovement,
    setCameraMovement
  } = useApp();

  if (!isSettingsModalOpen) return null;

  const cameraOptions = [
    'Pan & Push In',
    'Static Locked-off (CCTV)',
    'Handheld UGC Jitter (iPhone)',
    'Low-Angle Dramatic Tilt',
    '360° Circular Orbit',
    'High-Speed Drone Skim'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Advanced Generation Settings
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            Aspect Ratio Target
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
            {(['9:16', '16:9', '1:1'] as const).map(ar => (
              <button
                key={ar}
                onClick={() => setAspectRatio(ar)}
                className={`py-2.5 rounded-xl border transition-all ${
                  aspectRatio === ar
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <div>{ar}</div>
                <div className="text-[10px] text-neutral-400 font-sans mt-0.5">
                  {ar === '9:16' ? 'TikTok / Shorts' : ar === '16:9' ? 'YouTube / Cinema' : 'Square Feed'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Motion Strength */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-neutral-600 dark:text-neutral-300">Physical Motion Intensity</span>
            <span className="font-mono text-blue-600 font-bold">{motionStrength} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={motionStrength}
            onChange={(e) => setMotionStrength(parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>Subtle Pacing (1)</span>
            <span>Balanced (5)</span>
            <span>High-Octane Sakuga (10)</span>
          </div>
        </div>

        {/* Camera Movement */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            Cinematographic Camera Direction
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {cameraOptions.map(cam => (
              <button
                key={cam}
                onClick={() => setCameraMovement(cam)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  cameraMovement === cam
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {cam}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsSettingsModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
        >
          Save & Apply
        </button>
      </div>
    </div>
  );
};
