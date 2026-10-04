export type NavTab = 
  | 'landing'
  | 'home'
  | 'shorts-studio' 
  | 'video-generator' 
  | 'image-generator' 
  | 'audio-studio' 
  | 'prompt-library' 
  | 'my-projects' 
  | 'supercomputer' 
  | 'mcp' 
  | 'calendar' 
  | 'collaboration' 
  | 'api-keys' 
  | 'team-roles' 
  | 'backup-restore';

export interface VideoFormat {
  id: string;
  name: string;
  description: string;
  category: string;
  badge?: string;
  hasAudio?: boolean;
  coverGradient: string;
  iconName: string;
  promptExample: string;
  videoUrl?: string;
  imageUrl?: string;
  previewDuration?: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'video' | 'image' | 'audio';
  tag?: 'Default' | 'New' | 'Popular' | 'Pro' | 'Fast' | string;
  description: string;
  maxResolution: string;
  creditsPerUnit: number;
  submodels?: string[];
}

export interface VideoTemplate {
  id: string;
  title: string;
  format: string;
  category: string;
  duration: string;
  views: string;
  description: string;
  prompt: string;
  accentColor: string;
  soundEnabled?: boolean;
  modelRecommended: string;
  visualTheme: 'disney' | 'anime' | 'cctv' | 'ring' | 'iphone' | 'hydraulic' | 'gta' | 'court' | 'zachd' | 'nursery' | 'car' | 'ranking' | 'nature' | 'ocean' | 'bodycam' | string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface ProjectAsset {
  id: string;
  title: string;
  type: 'video' | 'image' | 'audio' | 'script';
  format: string;
  model: string;
  duration?: string;
  resolution: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  sizeBytes: number;
  createdAt: number;
  status: 'ready' | 'rendering' | 'cached_offline';
  prompt: string;
  tags: string[];
  thumbnailColor: string;
  visualTheme?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatarBg: string;
  plan: 'Starter' | 'Creator Pro' | 'Studio Enterprise';
  credits: number;
  twoFactorEnabled: boolean;
  role: 'Owner' | 'Admin' | 'Creator' | 'Reviewer';
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Creator' | 'Reviewer';
  avatar: string;
  color: string;
  activeNow?: boolean;
  lastActive: string;
}

export interface ProjectComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestampSeconds: number;
  text: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'render_complete' | 'credit_alert' | 'collaboration' | 'milestone' | 'system';
  read: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  platform: 'TikTok' | 'YouTube Shorts' | 'Instagram Reels';
  date: string; // YYYY-MM-DD
  time: string;
  format: string;
  status: 'scheduled' | 'published' | 'draft';
  projectId?: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  createdAt: string;
  lastUsed: string;
  permissions: string[];
}
