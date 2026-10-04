import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HomeDashboard } from './components/HomeDashboard';
import { ShortsStudio } from './components/ShortsStudio';
import { ProjectsDashboard } from './components/ProjectsDashboard';
import { CollaborationRoom } from './components/CollaborationRoom';
import { CalendarSyncView } from './components/CalendarSyncView';
import { TeamRolesView } from './components/TeamRolesView';
import { ApiWebhooksView } from './components/ApiWebhooksView';
import { EncryptedBackupModal } from './components/EncryptedBackupModal';
import { AudioVoiceoverStudio } from './components/AudioVoiceoverStudio';
import { ImageGeneratorStudio } from './components/ImageGeneratorStudio';
import { PromptLibraryView } from './components/PromptLibraryView';
import { SupercomputerView } from './components/SupercomputerView';
import { FormatSelectorModal } from './components/FormatSelectorModal';
import { ModelSelectorModal } from './components/ModelSelectorModal';
import { SettingsModal } from './components/SettingsModal';
import { UpgradeModal } from './components/UpgradeModal';
import { PromptBuilderDrawer } from './components/PromptBuilderDrawer';
import { VideoDetailModal } from './components/VideoDetailModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import { CreativeScratchpadModal } from './components/CreativeScratchpadModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Background3D } from './components/Background3D';
import { LandingPage } from './components/LandingPage';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'shorts-studio':
      case 'video-generator':
        return <ShortsStudio />;
      case 'image-generator':
        return <ImageGeneratorStudio />;
      case 'audio-studio':
        return <AudioVoiceoverStudio />;
      case 'prompt-library':
        return <PromptLibraryView />;
      case 'my-projects':
        return <ProjectsDashboard />;
      case 'calendar':
        return <CalendarSyncView />;
      case 'collaboration':
        return <CollaborationRoom />;
      case 'team-roles':
        return <TeamRolesView />;
      case 'api-keys':
        return <ApiWebhooksView />;
      case 'backup-restore':
        return <EncryptedBackupModal />;
      case 'supercomputer':
      case 'mcp':
        return <SupercomputerView />;
      default:
        return <HomeDashboard />;
    }
  };
  if (activeTab === 'landing') {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--page-base)] dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans relative">
        <Background3D />
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--page-base)] dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans relative">
      {/* 3D Cosmic Aurora & Isometric Perspective Grid */}
      <Background3D />

      {/* Top Banner (Screenshot 1 replica) */}
      <AnnouncementBanner />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar (Screenshot 1, 2, 7, 8, 9 replica) */}
        <Sidebar />

        {/* Center Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
          {/* Top Bar Navigation */}
          <TopHeader />

          {/* Dynamic Main View */}
          <main className="flex-1 flex flex-col overflow-hidden relative pb-14 md:pb-0">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Interactive Modals & Drawers */}
      <FormatSelectorModal />
      <ModelSelectorModal />
      <SettingsModal />
      <UpgradeModal />
      <PromptBuilderDrawer />
      <VideoDetailModal />
      <SearchCommandModal />
      <CreativeScratchpadModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
