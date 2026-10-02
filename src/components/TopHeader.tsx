import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Mic,
  MicOff,
  Bell,
  Zap,
  Sparkles,
  Check,
  ChevronDown,
  Layers,
  ShieldCheck,
  Type
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC = () => {
  const {
    currentUser,
    isDarkMode,
    toggleDarkMode,
    textScale,
    setTextScale,
    setIsUpgradeModalOpen,
    isVoiceListening,
    toggleVoiceListening,
    voiceTranscript,
    lastVoiceAction,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    activeTab
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showTextScaleMenu, setShowTextScaleMenu] = useState(false);

  const getGreeting = () => {
    switch (activeTab) {
      case 'shorts-studio':
        return 'Shorts Studio';
      case 'my-projects':
        return 'Project Library';
      case 'calendar':
        return 'Content Calendar & Sync';
      case 'collaboration':
        return 'Live Studio Collaboration';
      case 'team-roles':
        return 'Roles, Access & 2FA';
      case 'api-keys':
        return 'API & Developer Webhooks';
      case 'backup-restore':
        return 'Encrypted Backup & Storage';
      default:
        return `Hey ${currentUser.name}!`;
    }
  };

  return (
    <header className="h-14 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#0f1016]/90 backdrop-blur-md flex items-center justify-between z-20 shrink-0 select-none">
      {/* Left: Greeting / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {getGreeting()}
        </h1>

        {/* Live Voice Status Indicator */}
        {isVoiceListening && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span>Voice command: {voiceTranscript || 'Speak now...'}</span>
          </div>
        )}

        {lastVoiceAction && !isVoiceListening && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-[11px]">
            <Check className="w-3 h-3" />
            <span className="truncate max-w-[200px]">{lastVoiceAction}</span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Voice Command Button */}
        <button
          onClick={toggleVoiceListening}
          className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
            isVoiceListening
              ? 'bg-red-500 text-white border-red-600 shadow-md animate-pulse'
              : 'text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70'
          }`}
          title="Voice command: e.g. 'Go to Shorts', 'Toggle dark mode', 'Create prompt'"
        >
          {isVoiceListening ? <Mic className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-neutral-500" />}
          <span className="hidden md:inline text-[11px]">Voice</span>
        </button>

        {/* Text Scale / Readability Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowTextScaleMenu(!showTextScaleMenu)}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70 transition-colors flex items-center gap-1"
            title="Adjust text scale for readability"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase font-semibold">
              {textScale === 'normal' ? '1x' : textScale === 'large' ? '1.1x' : '1.2x'}
            </span>
          </button>

          {showTextScaleMenu && (
            <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-1.5 z-50">
              {(['normal', 'large', 'xlarge'] as const).map(scale => (
                <button
                  key={scale}
                  onClick={() => {
                    setTextScale(scale);
                    setShowTextScaleMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs capitalize flex items-center justify-between ${
                    textScale === scale 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{scale} font</span>
                  {textScale === scale && <Check className="w-3 h-3 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70 transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Notifications & Milestones
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {notifications.length} alerts
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      n.read
                        ? 'bg-neutral-50/60 dark:bg-neutral-900/40 border-neutral-200/40 dark:border-neutral-800 text-neutral-500'
                        : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[11px] flex items-center gap-1.5">
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />}
                        {n.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">{n.timeAgo}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Credit Counter Pill */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold font-mono transition-colors"
          title="Remaining generation credits"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{currentUser.credits.toLocaleString()}</span>
        </button>

        {/* Upgrade Button (Exact electric blue pill from screenshots) */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="px-4 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0055DD] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          Upgrade
        </button>

        {/* User Dropdown Pill */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/80 hover:bg-neutral-200/70 border border-neutral-200 dark:border-neutral-700/60 text-xs text-neutral-900 dark:text-neutral-100 font-medium transition-colors"
        >
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ backgroundColor: currentUser.avatarBg }}
          >
            {currentUser.name.charAt(0).toLowerCase()}
          </div>
          <span className="hidden sm:inline text-xs font-semibold">{currentUser.name}</span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </button>
      </div>
    </header>
  );
};
