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
  Type,
  Search,
  FileText,
  Menu
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
    setIsSearchModalOpen,
    setIsScratchpadOpen,
    activeTab,
    addCredits,
    toggleMobileSidebar
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showTextScaleMenu, setShowTextScaleMenu] = useState(false);

  const getGreeting = () => {
    switch (activeTab) {
      case 'home':
        return 'NovaGen Studio';
      case 'shorts-studio':
      case 'video-generator':
        return 'Shorts Studio';
      case 'image-generator':
        return '4K AI Image Studio';
      case 'audio-studio':
        return 'Voice & Audio Studio';
      case 'prompt-library':
        return 'AI Prompt Library';
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
      case 'supercomputer':
      case 'mcp':
        return 'NovaGen Supercomputer & MCP';
      default:
        return 'NovaGen Studio';
    }
  };

  return (
    <header className="h-14 px-5 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/85 dark:bg-[#040508]/95 backdrop-blur-xl flex items-center justify-between z-20 shrink-0 select-none transition-colors">
      {/* Left: Hamburger & Section Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
          <h1 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight truncate max-w-[150px] sm:max-w-[280px]">
            {getGreeting()}
          </h1>
        </div>

        {/* Live Voice Status Indicator */}
        {isVoiceListening && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span>Listening: {voiceTranscript || 'Say "create short", "dark mode"...'}</span>
          </div>
        )}

        {lastVoiceAction && !isVoiceListening && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-[11px] font-medium">
            <Check className="w-3 h-3" />
            <span className="truncate max-w-[220px]">{lastVoiceAction}</span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Search ⌘K */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Creative Scratchpad Button */}
        <button
          onClick={() => setIsScratchpadOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
          title="Open Creative Scratchpad (Drafts & Notes)"
        >
          <FileText className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[11px] font-semibold">Scratchpad</span>
        </button>

        {/* Voice Command Button */}
        <button
          onClick={toggleVoiceListening}
          className={`hidden lg:flex items-center gap-1.5 p-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isVoiceListening
              ? 'bg-red-500 text-white border-red-600 shadow-md animate-pulse'
              : 'text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70'
          }`}
          title="Voice command: e.g. 'Go to Shorts', 'Toggle dark mode'"
        >
          <Mic className={`w-3.5 h-3.5 ${isVoiceListening ? 'text-white' : 'text-neutral-500'}`} />
          <span className="hidden xl:inline text-[11px] font-medium">Voice</span>
        </button>

        {/* Text Scale / Readability Toggle */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setShowTextScaleMenu(!showTextScaleMenu)}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70 transition-colors flex items-center gap-1 cursor-pointer"
            title="Adjust text scale for readability"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase font-bold">
              {textScale === 'normal' ? '1x' : textScale === 'large' ? '1.1x' : '1.2x'}
            </span>
          </button>

          {showTextScaleMenu && (
            <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-[#0a0b14] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
              {(['normal', 'large', 'xlarge'] as const).map(scale => (
                <button
                  key={scale}
                  onClick={() => {
                    setTextScale(scale);
                    setShowTextScaleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs capitalize flex items-center justify-between transition-colors ${
                    textScale === scale 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{scale} font</span>
                  {textScale === scale && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prominent Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all shadow-2xs cursor-pointer bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline font-semibold text-[11px]">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600/30" />
              <span className="hidden sm:inline font-semibold text-[11px]">Dark</span>
            </>
          )}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200/70 transition-colors relative cursor-pointer"
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
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#0a0b14] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-100">
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

        {/* Credit Counter & Instant +5,000 Top-Up Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono transition-colors cursor-pointer"
            title="Remaining generation credits"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{currentUser.credits.toLocaleString()}</span>
          </button>

          <button
            onClick={() => addCredits(5000)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-[11px] font-bold shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Instantly add +5,000 free generation credits"
          >
            <Sparkles className="w-3 h-3" />
            <span>+5,000</span>
          </button>
        </div>

        {/* Upgrade Button (Signature Everygen Blue Gradient Pill) */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="hidden sm:inline-flex everygen-btn-primary px-3 sm:px-4 py-1.5 rounded-full text-white text-xs font-bold cursor-pointer whitespace-nowrap"
        >
          Upgrade
        </button>

        {/* User Dropdown Pill */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-1.5 pr-1.5 sm:pr-2.5 py-1 rounded-full bg-neutral-100/90 dark:bg-neutral-800/80 hover:bg-neutral-200/70 border border-neutral-200 dark:border-neutral-700/60 text-xs text-neutral-900 dark:text-neutral-100 font-medium transition-colors cursor-pointer"
        >
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-2xs"
            style={{ backgroundColor: currentUser.avatarBg }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:inline text-xs font-bold">{currentUser.name}</span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </button>
      </div>
    </header>
  );
};
