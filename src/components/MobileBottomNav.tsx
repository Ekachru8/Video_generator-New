import React from 'react';
import { Home, Video, FolderKanban, Sparkles, Menu, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, toggleMobileSidebar } = useApp();

  const navItems: { tab: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'shorts-studio', label: 'Shorts', icon: Video },
    { tab: 'my-projects', label: 'Projects', icon: FolderKanban },
    { tab: 'audio-studio', label: 'Voice', icon: Mic },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#070913]/95 backdrop-blur-xl border-t border-neutral-200/90 dark:border-neutral-800/90 px-3 py-1.5 flex items-center justify-around shadow-lg select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50 dark:bg-blue-950/60' : ''}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Menu / Drawer Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all cursor-pointer"
        aria-label="Open navigation menu"
      >
        <div className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Menu className="w-4 h-4" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-medium">
          More
        </span>
      </button>
    </nav>
  );
};
