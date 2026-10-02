import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Home,
  Video,
  Image as ImageIcon,
  Mic,
  Cpu,
  Terminal,
  Zap,
  BookOpen,
  FolderKanban,
  HelpCircle,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Calendar,
  Key,
  ShieldCheck,
  HardDriveDownload,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsSearchModalOpen,
    currentUser,
    switchRole,
    setIsUpgradeModalOpen
  } = useApp();

  const [activeFlyout, setActiveFlyout] = useState<'video' | 'image' | 'audio' | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterFlyout = (menu: 'video' | 'image' | 'audio') => {
    if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    setActiveFlyout(menu);
  };

  const handleMouseLeaveFlyout = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveFlyout(null);
    }, 250);
  };

  return (
    <aside 
      className={`relative z-30 shrink-0 h-full border-r border-neutral-200 dark:border-neutral-800 bg-[#fdfdfd] dark:bg-[#0e0f15] flex flex-col justify-between transition-all duration-200 select-none ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="flex flex-col">
        <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/60">
          {!isSidebarCollapsed && (
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Video className="w-4 h-4 fill-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">
                  Everygen
                </span>
                <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                  Studio
                </span>
              </div>
            </div>
          )}

          {isSidebarCollapsed && (
            <div 
              onClick={() => setActiveTab('home')}
              className="w-8 h-8 mx-auto rounded-lg bg-blue-600 flex items-center justify-center text-white cursor-pointer shadow-sm"
            >
              <Video className="w-4 h-4 fill-white" />
            </div>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700/60 transition-all ${
              isSidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <Search className="w-4 h-4 text-neutral-400" />
            {!isSidebarCollapsed && (
              <>
                <span className="flex-1 text-left">Search</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  ⌘K
                </kbd>
              </>
            )}
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="px-2 pt-3 space-y-0.5">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
            } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          >
            <Home className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Home</span>}
          </button>

          {/* Video (With Flyout) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnterFlyout('video')}
            onMouseLeave={handleMouseLeaveFlyout}
          >
            <button
              onClick={() => setActiveTab('shorts-studio')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'shorts-studio' || activeTab === 'video-generator'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Video</span>}
              </div>
              {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
            </button>

            {/* Video Flyout Mega Menu (Screenshot 7 replica) */}
            {activeFlyout === 'video' && (
              <div className="absolute left-full top-0 ml-1.5 w-[520px] bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-4 z-50 animate-in fade-in duration-100">
                {/* Column 1: Features */}
                <div>
                  <h4 className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2 px-2">
                    Features
                  </h4>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setActiveTab('shorts-studio'); setActiveFlyout(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Video className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600">
                          AI Video Generator
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Generate video from a prompt
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => { setActiveTab('shorts-studio'); setActiveFlyout(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-rose-600">
                          Shorts Studio
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          13 proven formats for social video
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => { setActiveTab('shorts-studio'); setActiveFlyout(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Share2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600">
                          AI Ad Generator
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          A finished ad from product link
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Column 2: Top Models */}
                <div className="border-l border-neutral-100 dark:border-neutral-800 pl-4">
                  <h4 className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2 px-2">
                    Models
                  </h4>
                  <div className="space-y-1 max-h-[340px] overflow-y-auto pr-1">
                    {[
                      { name: 'Seedance 2.5', desc: 'The most advanced video model, in 1080p' },
                      { name: 'Seedance 2', desc: 'High-quality video from your images' },
                      { name: 'Kling 3.0 Turbo', desc: 'Stunning video in seconds' },
                      { name: 'Kling 3.0', desc: "Kling's flagship, full quality" },
                      { name: 'Google Veo 3.1', desc: 'Cinematic shots with native audio' },
                      { name: 'Gemini Omni 1.1', desc: 'Generate, edit, and extend video' },
                      { name: 'Grok Imagine 1.5', desc: 'Fast, stylized video from xAI' }
                    ].map(m => (
                      <div 
                        key={m.name}
                        onClick={() => { setActiveTab('shorts-studio'); setActiveFlyout(null); }}
                        className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {m.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate pl-3">
                          {m.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Image (With Flyout - Screenshot 8 replica) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnterFlyout('image')}
            onMouseLeave={handleMouseLeaveFlyout}
          >
            <button
              onClick={() => setActiveTab('image-generator')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'image-generator'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Image</span>}
              </div>
              {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
            </button>

            {activeFlyout === 'image' && (
              <div className="absolute left-full top-0 ml-1.5 w-[420px] bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-3 z-50 animate-in fade-in duration-100">
                <div>
                  <h4 className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                    Features
                  </h4>
                  <div className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200/50 dark:border-pink-900/30">
                    <div className="text-xs font-bold text-pink-600">AI Image Generator</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Generate images from text prompts up to 4K</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                    Models
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">Nano Banana Pro</div>
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">Nano Banana 2</div>
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">GPT Image 2.5 Flare</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Audio (With Flyout - Screenshot 9 replica) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnterFlyout('audio')}
            onMouseLeave={handleMouseLeaveFlyout}
          >
            <button
              onClick={() => setActiveTab('audio-studio')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'audio-studio'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Audio</span>}
              </div>
              {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
            </button>

            {activeFlyout === 'audio' && (
              <div className="absolute left-full top-0 ml-1.5 w-[380px] bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-in fade-in duration-100">
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/20">
                    <div className="text-xs font-bold text-purple-600">ElevenLabs v3 Natural Voiceover</div>
                    <div className="text-[11px] text-neutral-500">Natural speech with emotion & breath control</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
                    <div className="text-xs font-bold text-emerald-600">Seed Audio 1.0</div>
                    <div className="text-[11px] text-neutral-500">Multi-speaker dubbing and audio stems</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Supercomputer */}
          <button
            onClick={() => setActiveTab('supercomputer')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'supercomputer'
                ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
            } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          >
            <Cpu className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Supercomputer</span>}
          </button>

          {/* MCP */}
          <button
            onClick={() => setActiveTab('mcp')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'mcp'
                ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
            } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          >
            <Terminal className="w-4 h-4" />
            {!isSidebarCollapsed && <span>MCP</span>}
          </button>
        </nav>

        {/* Section: Library */}
        <div className="px-2 pt-4">
          {!isSidebarCollapsed && (
            <div className="px-3 pb-1.5 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wide">
              Library
            </div>
          )}

          <div className="space-y-0.5">
            <button
              onClick={() => setActiveTab('shorts-studio')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-all ${
                isSidebarCollapsed ? 'justify-center px-0' : ''
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              {!isSidebarCollapsed && <span>Viral Presets</span>}
            </button>

            <button
              onClick={() => setActiveTab('prompt-library')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'prompt-library'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <BookOpen className="w-4 h-4 text-pink-500" />
              {!isSidebarCollapsed && <span>Prompt Library</span>}
            </button>

            <button
              onClick={() => setActiveTab('my-projects')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'my-projects'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <FolderKanban className="w-4 h-4 text-blue-500" />
              {!isSidebarCollapsed && <span>My projects</span>}
            </button>
          </div>
        </div>

        {/* Section: Workflow & Tools */}
        <div className="px-2 pt-4">
          {!isSidebarCollapsed && (
            <div className="px-3 pb-1.5 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wide">
              Workflow
            </div>
          )}

          <div className="space-y-0.5">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'calendar'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              {!isSidebarCollapsed && <span>Content Calendar</span>}
            </button>

            <button
              onClick={() => setActiveTab('collaboration')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'collaboration'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Users className="w-4 h-4 text-emerald-500" />
              {!isSidebarCollapsed && <span>Live Collaboration</span>}
            </button>

            <button
              onClick={() => setActiveTab('team-roles')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'team-roles'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              {!isSidebarCollapsed && <span>Roles & 2FA</span>}
            </button>

            <button
              onClick={() => setActiveTab('api-keys')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'api-keys'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Key className="w-4 h-4 text-amber-500" />
              {!isSidebarCollapsed && <span>API & Webhooks</span>}
            </button>

            <button
              onClick={() => setActiveTab('backup-restore')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === 'backup-restore'
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <HardDriveDownload className="w-4 h-4 text-violet-500" />
              {!isSidebarCollapsed && <span>Encrypted Backup</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className={`w-full flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors ${
              isSidebarCollapsed ? 'justify-center p-1' : ''
            }`}
          >
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs"
              style={{ backgroundColor: currentUser.avatarBg }}
            >
              {currentUser.name.charAt(0).toLowerCase()}
            </div>

            {!isSidebarCollapsed && (
              <>
                <div className="flex-1 text-left truncate">
                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {currentUser.credits.toLocaleString()} credits · {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </>
            )}
          </button>

          {/* User Popover Dropdown */}
          {showUserDropdown && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-[#161720] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in duration-100">
              <div className="pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-neutral-400 truncate">
                  {currentUser.email}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-[10px] uppercase font-semibold text-neutral-400 mb-1 px-1">
                  Switch Active Role
                </div>
                {(['Owner', 'Admin', 'Creator', 'Reviewer'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded-lg flex items-center justify-between ${
                      currentUser.role === role 
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-semibold' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsUpgradeModalOpen(true);
                  setShowUserDropdown(false);
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors mb-1"
              >
                Top up credits
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
