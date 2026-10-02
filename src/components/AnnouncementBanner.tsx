import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div className="w-full bg-[#0066FF] text-white text-xs font-medium py-1.5 px-4 flex items-center justify-between select-none shadow-sm z-40 transition-colors">
        <div className="flex-1 text-center truncate">
          <span>Viewmax is now Everygen. Same account, same credits, same work. </span>
          <button 
            onClick={() => setShowModal(true)}
            className="underline underline-offset-2 hover:text-blue-100 font-semibold ml-1 cursor-pointer transition-colors"
          >
            Read why
          </button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white p-0.5 rounded transition-colors ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Migration Explainer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#14151b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  EG
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Welcome to Everygen Studio
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              We evolved from <strong>Viewmax</strong> to <strong>Everygen</strong> to reflect our expanded generative vision: bringing the world’s most powerful video, image, audio, and reasoning models into a unified creative operating system.
            </p>

            <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                All existing projects, renders, and custom formats are fully preserved.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Your credit balance and active subscription tier remain identical.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Introducing next-gen Kling 3.0 Turbo, Seedance 2.5 1080p, and Google Veo 3.1.
              </li>
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md transition-colors"
            >
              Continue to Studio
            </button>
          </div>
        </div>
      )}
    </>
  );
};
