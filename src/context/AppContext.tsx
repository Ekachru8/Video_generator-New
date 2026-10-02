import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavTab,
  VideoFormat,
  AIModel,
  VideoTemplate,
  ProjectAsset,
  UserProfile,
  Collaborator,
  ProjectComment,
  NotificationItem,
  CalendarEvent,
  ApiKeyItem
} from '../types';
import {
  VIDEO_FORMATS,
  AI_MODELS,
  VIDEO_TEMPLATES,
  INITIAL_PROJECTS,
  INITIAL_COLLABORATORS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_API_KEYS
} from '../data/mockData';

interface AppContextType {
  // Navigation & View
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;

  // Accessibility & Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textScale: 'normal' | 'large' | 'xlarge';
  setTextScale: (scale: 'normal' | 'large' | 'xlarge') => void;

  // User & Auth
  currentUser: UserProfile;
  switchRole: (role: 'Owner' | 'Admin' | 'Creator' | 'Reviewer') => void;
  toggle2FA: () => void;
  deductCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;

  // Studio Generator State
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  selectedFormat: VideoFormat;
  setSelectedFormat: (fmt: VideoFormat) => void;
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;
  duration: string;
  setDuration: (dur: string) => void;
  resolution: string;
  setResolution: (res: string) => void;
  aspectRatio: '9:16' | '16:9' | '1:1';
  setAspectRatio: (ar: '9:16' | '16:9' | '1:1') => void;
  motionStrength: number;
  setMotionStrength: (val: number) => void;
  cameraMovement: string;
  setCameraMovement: (val: string) => void;

  // Modals & Panels
  isFormatModalOpen: boolean;
  setIsFormatModalOpen: (v: boolean) => void;
  isModelModalOpen: boolean;
  setIsModelModalOpen: (v: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (v: boolean) => void;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (v: boolean) => void;
  isPromptBuilderOpen: boolean;
  setIsPromptBuilderOpen: (v: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (v: boolean) => void;
  isBackupModalOpen: boolean;
  setIsBackupModalOpen: (v: boolean) => void;

  // Video Preview Modal
  activePreviewProject: ProjectAsset | null;
  setActivePreviewProject: (p: ProjectAsset | null) => void;

  // Generation & Projects
  isGenerating: boolean;
  generationProgress: number;
  startVideoGeneration: () => Promise<void>;
  projects: ProjectAsset[];
  deleteProject: (id: string) => void;
  addProject: (p: ProjectAsset) => void;
  toggleOfflineCache: (id: string) => void;

  // Real-time Collaboration
  collaborators: Collaborator[];
  comments: ProjectComment[];
  addComment: (text: string, timestamp?: number) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (evt: CalendarEvent) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type: NotificationItem['type']) => void;

  // API Keys
  apiKeys: ApiKeyItem[];
  createApiKey: (name: string, permissions: string[]) => void;
  revokeApiKey: (id: string) => void;

  // Voice Command Engine
  isVoiceListening: boolean;
  toggleVoiceListening: () => void;
  voiceTranscript: string;
  lastVoiceAction: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Theme & Accessibility
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('everygen_theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [textScale, setTextScale] = useState<'normal' | 'large' | 'xlarge'>(() => {
    return (localStorage.getItem('everygen_text_scale') as any) || 'normal';
  });

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('everygen_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      id: 'usr_sikiblue',
      name: 'sikiblue',
      handle: '@sikiblue',
      email: 'eshaanbindroo@gmail.com',
      avatarBg: '#9333EA',
      plan: 'Creator Pro',
      credits: 1420,
      twoFactorEnabled: true,
      role: 'Owner'
    };
  });

  // Studio Generator
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>(VIDEO_FORMATS[1]); // Disney
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]); // Kling 3.0
  const [duration, setDuration] = useState('10s');
  const [resolution, setResolution] = useState('1080p');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [motionStrength, setMotionStrength] = useState(6);
  const [cameraMovement, setCameraMovement] = useState('Pan & Push In');

  // Modals
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isPromptBuilderOpen, setIsPromptBuilderOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [activePreviewProject, setActivePreviewProject] = useState<ProjectAsset | null>(null);

  // Projects store with localStorage
  const [projects, setProjects] = useState<ProjectAsset[]>(() => {
    const saved = localStorage.getItem('everygen_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PROJECTS;
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Collaboration
  const [collaborators] = useState<Collaborator[]>(INITIAL_COLLABORATORS);
  const [comments, setComments] = useState<ProjectComment[]>([
    {
      id: 'cmt_1',
      userId: 'collab_1',
      userName: 'Sarah Chen',
      userAvatar: 'SC',
      timestampSeconds: 3.2,
      text: 'The rim lighting here is pristine! Perfect pacing for the hook.',
      createdAt: '12m ago'
    },
    {
      id: 'cmt_2',
      userId: 'collab_2',
      userName: 'Marcus Vance',
      userAvatar: 'MV',
      timestampSeconds: 6.8,
      text: 'Let us speed up the ending by 0.5s to fit TikTok sound requirements.',
      createdAt: '4m ago'
    }
  ]);

  // Calendar
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // API Keys
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(INITIAL_API_KEYS);

  // Voice Command Engine
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [lastVoiceAction, setLastVoiceAction] = useState('');

  // Persist Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('everygen_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('everygen_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist Text Scale
  useEffect(() => {
    document.documentElement.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
    document.documentElement.classList.add(`text-scale-${textScale}`);
    localStorage.setItem('everygen_text_scale', textScale);
  }, [textScale]);

  // Persist User & Projects
  useEffect(() => {
    localStorage.setItem('everygen_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('everygen_projects', JSON.stringify(projects));
  }, [projects]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const switchRole = (role: 'Owner' | 'Admin' | 'Creator' | 'Reviewer') => {
    setCurrentUser(prev => ({ ...prev, role }));
    addNotification('Role Changed', `Switched active role to ${role}`, 'system');
  };

  const toggle2FA = () => {
    setCurrentUser(prev => {
      const next = !prev.twoFactorEnabled;
      addNotification(
        next ? '2FA Enabled' : '2FA Disabled',
        next ? 'Two-Factor Authentication is now active on your account.' : 'Two-Factor Authentication has been turned off.',
        'system'
      );
      return { ...prev, twoFactorEnabled: next };
    });
  };

  const deductCredits = (amount: number): boolean => {
    if (currentUser.credits < amount) {
      setIsUpgradeModalOpen(true);
      return false;
    }
    setCurrentUser(prev => ({ ...prev, credits: prev.credits - amount }));
    return true;
  };

  const addCredits = (amount: number) => {
    setCurrentUser(prev => ({ ...prev, credits: prev.credits + amount }));
    addNotification('Credits Added', `+${amount} Everygen credits successfully loaded into your balance.`, 'credit_alert');
  };

  const addProject = (p: ProjectAsset) => {
    setProjects(prev => [p, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addNotification('Project Removed', 'Asset deleted from library', 'system');
  };

  const toggleOfflineCache = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'cached_offline' ? 'ready' : 'cached_offline';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const addComment = (text: string, timestamp: number = 2.0) => {
    const newComment: ProjectComment = {
      id: 'cmt_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.name.slice(0, 2).toUpperCase(),
      timestampSeconds: timestamp,
      text,
      createdAt: 'Just now'
    };
    setComments(prev => [...prev, newComment]);
  };

  const addCalendarEvent = (evt: CalendarEvent) => {
    setCalendarEvents(prev => [...prev, evt]);
    addNotification('Release Scheduled', `Scheduled "${evt.title}" for ${evt.platform} on ${evt.date}`, 'milestone');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newItem: NotificationItem = {
      id: 'notif_' + Date.now(),
      title,
      message,
      timeAgo: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  const createApiKey = (name: string, permissions: string[]) => {
    const newKey: ApiKeyItem = {
      id: 'key_' + Date.now(),
      name,
      keyMasked: `evg_live_${Math.random().toString(36).substring(2, 6)}••••••••••••••${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions
    };
    setApiKeys(prev => [newKey, ...prev]);
    addNotification('API Key Created', `Generated production key "${name}"`, 'system');
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    addNotification('API Key Revoked', 'API key was invalidated', 'system');
  };

  // Video Generation Workflow
  const startVideoGeneration = async () => {
    const cost = selectedModel.creditsPerUnit || 21;
    if (!deductCredits(cost)) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(5);

    try {
      // Call backend to log job
      fetch('/api/generate/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentPrompt || selectedFormat.promptExample,
          model: selectedModel.name,
          format: selectedFormat.name,
          duration,
          resolution,
          settings: {
            aspectRatio,
            motionStrength,
            cameraMovement
          }
        })
      }).catch(() => {});

      // Simulate progressive render
      for (let i = 10; i <= 100; i += 15) {
        await new Promise(r => setTimeout(r, 650));
        setGenerationProgress(i);
      }

      // Add new project
      const newProj: ProjectAsset = {
        id: 'proj_' + Date.now(),
        title: `${selectedFormat.name} - ${currentPrompt.slice(0, 30) || 'Viral Concept'}`,
        type: 'video',
        format: selectedFormat.name,
        model: selectedModel.name,
        duration,
        resolution,
        aspectRatio,
        sizeBytes: 24500000,
        createdAt: Date.now(),
        status: 'ready',
        prompt: currentPrompt || selectedFormat.promptExample,
        tags: [selectedFormat.name, selectedModel.name, resolution],
        thumbnailColor: selectedFormat.id === 'disney' ? '#10B981' : selectedFormat.id === 'hydraulic-press' ? '#EC4899' : '#0066FF',
        visualTheme: selectedFormat.id === 'disney' ? 'disney' : selectedFormat.id === 'hydraulic-press' ? 'hydraulic' : selectedFormat.id === 'cctv' ? 'cctv' : selectedFormat.id === 'ring-doorbell' ? 'ring' : 'gta'
      };

      addProject(newProj);
      setActivePreviewProject(newProj);
      addNotification(
        'Video Generated Successfully',
        `"${newProj.title}" rendered in ${resolution} with ${selectedModel.name}.`,
        'render_complete'
      );
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Voice Command Engine (Web Speech API)
  const toggleVoiceListening = () => {
    if (isVoiceListening) {
      setIsVoiceListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsVoiceListening(true);
        setVoiceTranscript('Listening for commands...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setVoiceTranscript(`"${transcript}"`);

        // Voice Command Routing
        if (transcript.includes('shorts') || transcript.includes('studio') || transcript.includes('remix')) {
          setActiveTab('shorts-studio');
          setLastVoiceAction('Navigated to Shorts Studio');
          speakFeedback('Opening Shorts Studio');
        } else if (transcript.includes('projects') || transcript.includes('my project') || transcript.includes('library')) {
          setActiveTab('my-projects');
          setLastVoiceAction('Opened My Projects');
          speakFeedback('Opening your projects library');
        } else if (transcript.includes('home') || transcript.includes('dashboard')) {
          setActiveTab('home');
          setLastVoiceAction('Navigated to Home');
          speakFeedback('Navigating to Home');
        } else if (transcript.includes('dark') || transcript.includes('light') || transcript.includes('theme')) {
          toggleDarkMode();
          setLastVoiceAction('Toggled Dark Mode');
          speakFeedback('Toggled theme');
        } else if (transcript.includes('prompt builder') || transcript.includes('assistant')) {
          setIsPromptBuilderOpen(true);
          setLastVoiceAction('Opened Prompt Builder Drawer');
          speakFeedback('Opening Prompt Builder');
        } else if (transcript.includes('upgrade') || transcript.includes('credits') || transcript.includes('billing')) {
          setIsUpgradeModalOpen(true);
          setLastVoiceAction('Opened Upgrade Modal');
          speakFeedback('Opening Subscription & Credits');
        } else if (transcript.includes('calendar') || transcript.includes('schedule')) {
          setActiveTab('calendar');
          setLastVoiceAction('Opened Content Calendar');
          speakFeedback('Opening Content Calendar');
        } else if (transcript.includes('disney')) {
          setSelectedFormat(VIDEO_FORMATS[1]);
          setLastVoiceAction('Selected Disney Format');
          speakFeedback('Selected Disney format');
        } else if (transcript.includes('hydraulic')) {
          setSelectedFormat(VIDEO_FORMATS[6]);
          setLastVoiceAction('Selected Hydraulic Press Format');
          speakFeedback('Selected Hydraulic Press format');
        } else {
          setLastVoiceAction(`Recognized: "${transcript}". Say "Go to shorts" or "Toggle dark mode"`);
          speakFeedback('Command processed');
        }

        setIsVoiceListening(false);
      };

      recognition.onerror = () => {
        setIsVoiceListening(false);
        setVoiceTranscript('');
      };

      recognition.onend = () => {
        setIsVoiceListening(false);
      };

      recognition.start();
    } catch {
      setIsVoiceListening(false);
    }
  };

  const speakFeedback = (text: string) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.1;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isDarkMode,
        toggleDarkMode,
        textScale,
        setTextScale,
        currentUser,
        switchRole,
        toggle2FA,
        deductCredits,
        addCredits,
        currentPrompt,
        setCurrentPrompt,
        selectedFormat,
        setSelectedFormat,
        selectedModel,
        setSelectedModel,
        duration,
        setDuration,
        resolution,
        setResolution,
        aspectRatio,
        setAspectRatio,
        motionStrength,
        setMotionStrength,
        cameraMovement,
        setCameraMovement,
        isFormatModalOpen,
        setIsFormatModalOpen,
        isModelModalOpen,
        setIsModelModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isPromptBuilderOpen,
        setIsPromptBuilderOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isBackupModalOpen,
        setIsBackupModalOpen,
        activePreviewProject,
        setActivePreviewProject,
        isGenerating,
        generationProgress,
        startVideoGeneration,
        projects,
        deleteProject,
        addProject,
        toggleOfflineCache,
        collaborators,
        comments,
        addComment,
        calendarEvents,
        addCalendarEvent,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        addNotification,
        apiKeys,
        createApiKey,
        revokeApiKey,
        isVoiceListening,
        toggleVoiceListening,
        voiceTranscript,
        lastVoiceAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
