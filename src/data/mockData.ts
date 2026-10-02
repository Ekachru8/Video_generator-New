import { VideoFormat, AIModel, VideoTemplate, ProjectAsset, Collaborator, CalendarEvent, NotificationItem, ApiKeyItem } from '../types';

export const VIDEO_FORMATS: VideoFormat[] = [
  {
    id: 'no-format',
    name: 'No format',
    description: 'Create a short using only your own prompt.',
    category: 'Freeform',
    coverGradient: 'from-slate-800 to-slate-900',
    iconName: 'video',
    promptExample: 'A cinematic high angle sequence of a futuristic cyber city at dusk.'
  },
  {
    id: 'disney',
    name: 'Disney',
    description: 'Feature-animation warmth: expressive eyes, soft lighting, and Pixar-grade 3D character renders.',
    category: '3D Animation',
    coverGradient: 'from-sky-400 via-amber-200 to-rose-300',
    iconName: 'sparkles',
    promptExample: 'A cute clumsy baby hedgehog tries to carry an oversized golden sunflower across a whimsical blooming meadow, expressive animated eyes, warm golden rim light.'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Hand-drawn sakuga with timed key poses, dynamic speedlines, and cinematic camera tracking.',
    category: 'Animation',
    coverGradient: 'from-indigo-900 via-purple-800 to-slate-900',
    iconName: 'zap',
    promptExample: 'High-speed sakuga anime duel on a rainy rooftop, intense camera tracking, lightning flash illumination, 60fps hand-drawn energy.'
  },
  {
    id: 'cctv',
    name: 'CCTV',
    description: 'A locked-off security feed, a mundane setup, and an unexpected surreal twist.',
    category: 'Found Footage',
    coverGradient: 'from-emerald-950 via-zinc-900 to-stone-900',
    iconName: 'camera',
    promptExample: 'Night-vision CCTV locked on an empty suburban backyard at 2:40 AM when suddenly a miniature robotic raccoon scurries across the patio.'
  },
  {
    id: 'ring-doorbell',
    name: 'Ring doorbell',
    description: 'Fisheye lens distortion on the porch, motion alert triggered, surreal visitor approaching.',
    category: 'Realism',
    coverGradient: 'from-amber-900 via-stone-800 to-zinc-900',
    iconName: 'doorbell',
    promptExample: 'High-definition 180° fisheye porch doorbell view: a polite deer rings the bell with its nose, waits patiently holding a parcel.'
  },
  {
    id: 'shot-on-iphone',
    name: 'Shot on iPhone',
    description: 'Handheld phone footage with natural exposure jitter, authentic microphone ambience, and spontaneous action.',
    category: 'UGC & Viral',
    coverGradient: 'from-stone-700 via-zinc-800 to-neutral-900',
    iconName: 'smartphone',
    promptExample: 'Casual vertical handheld iPhone 16 Pro video showing a seagull triumphantly sprinting away on a beach boardwalk clutching a whole burrito.'
  },
  {
    id: 'hydraulic-press',
    name: 'Hydraulic press',
    description: 'High-tonnage industrial steel ram crushing everyday objects in hyper-satisfying slow motion.',
    category: 'ASMR & Science',
    coverGradient: 'from-yellow-600 via-zinc-800 to-slate-900',
    iconName: 'gauge',
    promptExample: 'A glossy pink ceramic piggy bank placed under a 500-ton yellow hydraulic steel press, slow satisfying crush into colorful coin confetti.'
  },
  {
    id: 'gta-6',
    name: 'GTA 6',
    description: 'Vibrant Vice City sunset hues, high-octane vehicular chases, stylized satire realism.',
    category: 'Gaming & Action',
    coverGradient: 'from-pink-600 via-purple-700 to-amber-500',
    iconName: 'gamepad',
    promptExample: 'Over-the-shoulder third-person camera following a vintage convertible speeding across a sun-drenched coastal bridge with ocean reflection.'
  },
  {
    id: 'ai-court',
    name: 'AI court videos',
    description: 'Sober legal courtroom drama disrupted by absurd witnesses, unusual evidence, and animated defendants.',
    category: 'Humor',
    coverGradient: 'from-amber-950 via-stone-900 to-amber-900',
    iconName: 'scale',
    promptExample: 'A stately federal courtroom where an animated garden gnome stands on the witness stand accused of stealing lawn clippings, serious judge looking baffled.'
  },
  {
    id: 'zach-d-films',
    name: 'Zach D Films',
    description: 'Intriguing 3D anatomical, biological, or physics simulation answering wild curious questions.',
    category: 'Educational 3D',
    coverGradient: 'from-blue-600 via-indigo-900 to-slate-900',
    iconName: 'activity',
    promptExample: 'Close-up 3D medical animation showing what happens when a drop of concentrated hot sauce enters the tongue tastebud receptors.'
  },
  {
    id: 'ranking-videos',
    name: 'Ranking videos',
    description: 'Split-screen tiered countdowns comparing levels, items, or scenarios with escalating intensity.',
    category: 'Retention',
    coverGradient: 'from-red-600 via-neutral-900 to-black',
    iconName: 'list-ordered',
    promptExample: 'Vertical split-screen ranking strongest fantasy materials with tier cards from E-Tier to SSS-Tier, fast transitions.'
  },
  {
    id: 'nursery-rhymes',
    name: 'Nursery rhymes',
    description: 'Vibrant 3D playful cartoon animals singing bouncy rhymes with soft pillowy textures.',
    category: 'Kids & Family',
    coverGradient: 'from-teal-400 via-sky-300 to-pink-300',
    iconName: 'music',
    promptExample: 'A cheerful baby blue elephant playing tiny drums with a toucan in a sunny cartoon jungle, bright friendly colors.'
  },
  {
    id: 'bodycam-footage',
    name: 'Bodycam footage',
    description: 'Tactical fisheye lens, audio hum, high-stakes POV walkup to bizarre unexplained events.',
    category: 'Found Footage',
    coverGradient: 'from-neutral-950 via-zinc-800 to-slate-900',
    iconName: 'shield',
    promptExample: 'Police chest bodycam footage responding to a mysterious call in a misty forest at midnight, flashlight illuminating a glowing artifact.'
  }
];

export const AI_MODELS: AIModel[] = [
  {
    id: 'kling-3.0',
    name: 'Kling 3.0',
    provider: 'Kuaishou',
    category: 'video',
    tag: 'Default',
    description: 'Flagship model with exceptional physical motion realism and prompt obedience.',
    maxResolution: '4K',
    creditsPerUnit: 21,
    submodels: ['Kling 3.0', 'Kling 3.0 Turbo', 'Kling 3.0 Pro', 'Kling 3.0 Omni', 'Kling 2.5 Turbo']
  },
  {
    id: 'kling-3.0-turbo',
    name: 'Kling 3.0 Turbo',
    provider: 'Kuaishou',
    category: 'video',
    tag: 'Fast',
    description: 'Stunning video generated in seconds for high-frequency iteration.',
    maxResolution: '1080p',
    creditsPerUnit: 14
  },
  {
    id: 'seedance-2.5',
    name: 'Seedance 2.5',
    provider: 'ByteDance',
    category: 'video',
    tag: 'Popular',
    description: 'The most advanced video model with 1080p native rendering and fluid character dynamics.',
    maxResolution: '1080p',
    creditsPerUnit: 25,
    submodels: ['Seedance 2.5', 'Seedance 2', 'Seedance 2 Mini', 'Seedance 2 Fast']
  },
  {
    id: 'seedance-2',
    name: 'Seedance 2',
    provider: 'ByteDance',
    category: 'video',
    description: 'High-quality video generation directly from reference images.',
    maxResolution: '720p',
    creditsPerUnit: 18
  },
  {
    id: 'veo-3.1',
    name: 'Veo 3.1',
    provider: 'Google DeepMind',
    category: 'video',
    tag: 'Pro',
    description: 'Cinematic shots with synchronized native environmental audio and 4K precision.',
    maxResolution: '4K',
    creditsPerUnit: 30,
    submodels: ['Veo 3.1', 'Veo 3.1 Fast', 'Veo 3.1 Lite']
  },
  {
    id: 'minimax-h3',
    name: 'MiniMax H3',
    provider: 'MiniMax',
    category: 'video',
    description: 'Hyper-responsive movement control and complex character hand interaction.',
    maxResolution: '1080p',
    creditsPerUnit: 18
  },
  {
    id: 'gemini-omni-1.1-flash',
    name: 'Gemini Omni 1.1 Flash',
    provider: 'Google',
    category: 'video',
    tag: 'New',
    description: 'Generate, edit, and extend multi-clip sequences with contextual memory.',
    maxResolution: '1080p',
    creditsPerUnit: 20
  },
  {
    id: 'grok-imagine-1.5',
    name: 'Grok Imagine 1.5',
    provider: 'xAI',
    category: 'video',
    description: 'Fast, highly stylized video synthesis with bold aesthetic flair.',
    maxResolution: '1080p',
    creditsPerUnit: 19
  },
  // Image Models
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    provider: 'Gemini',
    category: 'image',
    tag: 'Pro',
    description: 'Photoreal images from text prompts, supporting ultra-fine 4K detail.',
    maxResolution: '4K',
    creditsPerUnit: 5
  },
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    provider: 'Gemini',
    category: 'image',
    description: 'Fast, high-fidelity image generations for concept art.',
    maxResolution: '2K',
    creditsPerUnit: 3
  },
  {
    id: 'gpt-image-2.5-flare',
    name: 'GPT Image 2.5 Flare',
    provider: 'OpenAI',
    category: 'image',
    description: 'Lightning-fast generation with strict adherence to complex text overlays.',
    maxResolution: '1080p',
    creditsPerUnit: 4
  },
  // Audio Models
  {
    id: 'elevenlabs-v3',
    name: 'ElevenLabs v3',
    provider: 'ElevenLabs',
    category: 'audio',
    tag: 'Popular',
    description: 'Natural speech with emotional range, breath control, and multi-speaker dubbing.',
    maxResolution: '48kHz',
    creditsPerUnit: 2
  },
  {
    id: 'seed-audio-1.0',
    name: 'Seed Audio 1.0',
    provider: 'Seedance',
    category: 'audio',
    description: 'Multi-speaker scenes, cinematic ambient score, and synchronized SFX.',
    maxResolution: '48kHz',
    creditsPerUnit: 3
  }
];

export const VIDEO_TEMPLATES: VideoTemplate[] = [
  {
    id: 'tpl_hydrate',
    title: 'Hydrate Energy Drink Commercial',
    format: 'Commercial Ad',
    category: 'Shot on iPhone',
    duration: '8s',
    views: '2.4M',
    description: 'High energy cinematic macro shot of a chilled blue aluminium can with water droplets in sunlight.',
    prompt: 'Ultra-crisp macro tracking shot around a frost-covered bright blue energy can with electric lightning bolt logo reading HYDRATE, water mist spray, sun rays, 4k commercial style.',
    accentColor: '#0066FF',
    soundEnabled: true,
    modelRecommended: 'Seedance 2.5',
    visualTheme: 'car'
  },
  {
    id: 'tpl_sunflower_cartoon',
    title: 'Sunflowers & Hedgehog Tale',
    format: 'Disney',
    category: 'Disney',
    duration: '10s',
    views: '5.1M',
    description: 'Whimsical animated meadow with singing smiling sunflowers and a curious baby hedgehog.',
    prompt: 'Charming 3D Disney Pixar animation of two smiling giant sunflowers swaying under puffy clouds while a friendly baby hedgehog scampers across golden grass, soft pastel lighting, emotive eyes.',
    accentColor: '#F59E0B',
    soundEnabled: true,
    modelRecommended: 'Kling 3.0',
    visualTheme: 'disney'
  },
  {
    id: 'tpl_hydraulic_piggy',
    title: 'Hydraulic Press vs Piggy Bank',
    format: 'Hydraulic press',
    category: 'Hydraulic press',
    duration: '12s',
    views: '8.9M',
    description: 'Industrial 500-ton yellow press crushing a ceramic pink piggy bank into coin sparkles.',
    prompt: 'Heavy industrial hydraulic press machine with hazard yellow stripes slowly descending upon a glossy ceramic pink piggy bank on an oily steel anvil, slow motion 1000fps crush.',
    accentColor: '#EC4899',
    soundEnabled: true,
    modelRecommended: 'Veo 3.1',
    visualTheme: 'hydraulic'
  },
  {
    id: 'tpl_puppy_mint',
    title: 'Puppy Discovers Mint Ice Cream',
    format: 'Disney',
    category: 'Disney',
    duration: '10s',
    views: '12.3M',
    description: 'Fluffy puppy with a mint green ice cream nose smudge looking surprised in a cozy bedroom.',
    prompt: 'Cute fluffy animated brown and white spaniel puppy sitting in a warm bedroom with a green scoop of ice cream on its snout, blinking in adoration, Pixar quality fur texture.',
    accentColor: '#10B981',
    soundEnabled: true,
    modelRecommended: 'Seedance 2.5',
    visualTheme: 'disney'
  },
  {
    id: 'tpl_highway_suitcase',
    title: 'Runaway Suitcase Highway Drone',
    format: 'GTA 6',
    category: 'GTA 6',
    duration: '9s',
    views: '3.7M',
    description: 'High-speed drone tracking a motorized pink luggage container cruising down a Florida coastal highway.',
    prompt: 'Drone chase shot skimming over traffic on a sunny coastal highway following a motorized pink suitcase weaving between vintage sports cars during golden hour sunset.',
    accentColor: '#8B5CF6',
    soundEnabled: true,
    modelRecommended: 'Kling 3.0 Turbo',
    visualTheme: 'gta'
  },
  {
    id: 'tpl_cctv_raccoon',
    title: 'Late Night CCTV Patrol',
    format: 'CCTV',
    category: 'CCTV',
    duration: '10s',
    views: '1.9M',
    description: 'Night vision backyard camera capturing a nocturnal raccoon feasting in a metal bowl.',
    prompt: 'Locked off infrared monochrome CCTV video feed, timestamp 03:22:14 in top left corner, a mischievous raccoon eating food from a stainless steel dog bowl then staring directly into lens.',
    accentColor: '#059669',
    soundEnabled: false,
    modelRecommended: 'MiniMax H3',
    visualTheme: 'cctv'
  },
  {
    id: 'tpl_court_gnome',
    title: 'The Great Lawn Gnome Trial',
    format: 'AI court videos',
    category: 'AI court videos',
    duration: '15s',
    views: '4.6M',
    description: 'Humorous courtroom trial where a man gestures passionately at a giant painted ceramic garden gnome.',
    prompt: 'Dramatic wooden courtroom interior, a distressed defendant in a denim jacket points at a silent colorful garden gnome sitting on a mahogany chair, bailiff watching with arms crossed, sunbeams through windows.',
    accentColor: '#D97706',
    soundEnabled: true,
    modelRecommended: 'Kling 3.0',
    visualTheme: 'court'
  },
  {
    id: 'tpl_ring_deer',
    title: 'Porch Visitor Ring Alert',
    format: 'Ring doorbell',
    category: 'Ring doorbell',
    duration: '8s',
    views: '6.2M',
    description: 'Fisheye doorbell cam on a lakeside cabin porch capturing a majestic stag approaching the camera.',
    prompt: '1080p fisheye doorbell lens looking out at a wooden deck and calm mountain lake, a graceful deer gently steps up to the lens and inspects the camera with big brown eyes.',
    accentColor: '#3B82F6',
    soundEnabled: true,
    modelRecommended: 'Seedance 2.5',
    visualTheme: 'ring'
  }
];

export const INITIAL_PROJECTS: ProjectAsset[] = [
  {
    id: 'proj_01',
    title: 'Hydrate Commercial Remix 4K',
    type: 'video',
    format: 'Shot on iPhone',
    model: 'Seedance 2.5',
    duration: '8s',
    resolution: '1080p',
    aspectRatio: '9:16',
    sizeBytes: 18450000,
    createdAt: Date.now() - 3600000 * 2,
    status: 'ready',
    prompt: 'Macro camera spin around chilled blue aluminum energy drink can with water droplets.',
    tags: ['Ad', 'Beverage', 'Macro', 'Seedance'],
    thumbnailColor: '#0066FF',
    visualTheme: 'car'
  },
  {
    id: 'proj_02',
    title: 'Puppy Ice Cream Morning Scene',
    type: 'video',
    format: 'Disney',
    model: 'Kling 3.0',
    duration: '10s',
    resolution: '1080p',
    aspectRatio: '9:16',
    sizeBytes: 24100000,
    createdAt: Date.now() - 3600000 * 18,
    status: 'cached_offline',
    prompt: 'Cute fluffy animated puppy with mint ice cream on snout blinking happily.',
    tags: ['Disney', 'Puppy', 'Cute', 'Viral'],
    thumbnailColor: '#10B981',
    visualTheme: 'disney'
  },
  {
    id: 'proj_03',
    title: 'Hydraulic Press Coin Explosion',
    type: 'video',
    format: 'Hydraulic press',
    model: 'Veo 3.1',
    duration: '12s',
    resolution: '4K',
    aspectRatio: '9:16',
    sizeBytes: 42300000,
    createdAt: Date.now() - 86400000 * 2,
    status: 'ready',
    prompt: '500-ton hydraulic press crushing pink piggy bank into golden glitter and coins.',
    tags: ['ASMR', 'Hydraulic', 'SlowMo'],
    thumbnailColor: '#EC4899',
    visualTheme: 'hydraulic'
  },
  {
    id: 'proj_04',
    title: 'Gnome Courtroom Defense Script',
    type: 'script',
    format: 'AI court videos',
    model: 'Gemini 3.8 Flash',
    resolution: 'Text',
    aspectRatio: '16:9',
    sizeBytes: 4200,
    createdAt: Date.now() - 86400000 * 3,
    status: 'ready',
    prompt: '3-act script with courtroom objection sound effects and judge reaction lines.',
    tags: ['Script', 'Courtroom', 'Humor'],
    thumbnailColor: '#D97706'
  },
  {
    id: 'proj_05',
    title: 'Cyberpunk Vice City Poster',
    type: 'image',
    format: 'GTA 6',
    model: 'Nano Banana Pro',
    resolution: '4K',
    aspectRatio: '1:1',
    sizeBytes: 8900000,
    createdAt: Date.now() - 86400000 * 5,
    status: 'ready',
    prompt: 'Vice City neon sunset skyline with vintage sports car parked on coastal bridge.',
    tags: ['Poster', 'GTA6', '4K'],
    thumbnailColor: '#8B5CF6'
  }
];

export const INITIAL_COLLABORATORS: Collaborator[] = [
  {
    id: 'collab_1',
    name: 'Sarah Chen',
    email: 'sarah.chen@creatorstudio.ai',
    role: 'Admin',
    avatar: 'SC',
    color: '#3B82F6',
    activeNow: true,
    lastActive: 'Just now'
  },
  {
    id: 'collab_2',
    name: 'Marcus Vance',
    email: 'marcus@viralflow.co',
    role: 'Creator',
    avatar: 'MV',
    color: '#10B981',
    activeNow: true,
    lastActive: '3m ago'
  },
  {
    id: 'collab_3',
    name: 'Elena Rostova',
    email: 'elena@creativehub.io',
    role: 'Reviewer',
    avatar: 'ER',
    color: '#EC4899',
    activeNow: false,
    lastActive: '2h ago'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt_1',
    title: 'Drop: Hydrate Ad Remix on Shorts',
    platform: 'YouTube Shorts',
    date: '2026-10-03',
    time: '14:00',
    format: 'Shot on iPhone',
    status: 'scheduled',
    projectId: 'proj_01'
  },
  {
    id: 'evt_2',
    title: 'TikTok Viral Peak: Puppy Ice Cream',
    platform: 'TikTok',
    date: '2026-10-04',
    time: '18:30',
    format: 'Disney',
    status: 'scheduled',
    projectId: 'proj_02'
  },
  {
    id: 'evt_3',
    title: 'Hydraulic Press ASMR Reel',
    platform: 'Instagram Reels',
    date: '2026-10-06',
    time: '11:15',
    format: 'Hydraulic press',
    status: 'draft',
    projectId: 'proj_03'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Render Complete',
    message: 'Your 4K "Hydrate Commercial Remix" is ready for download.',
    timeAgo: '12m ago',
    type: 'render_complete',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Team Milestone Unlocked',
    message: 'Your team surpassed 100,000 monthly video views across TikTok & Shorts!',
    timeAgo: '2h ago',
    type: 'milestone',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Credits Auto-Refill',
    message: 'Creator Pro tier refilled 2,000 monthly generation credits.',
    timeAgo: '1d ago',
    type: 'credit_alert',
    read: true
  },
  {
    id: 'notif_4',
    title: 'Sarah commented on your project',
    message: '"Love the camera motion in second 4! Let\'s boost the audio saturation."',
    timeAgo: '2d ago',
    type: 'collaboration',
    read: true
  }
];

export const INITIAL_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_1',
    name: 'Production Workflow Bot',
    keyMasked: 'evg_live_9f82••••••••••••••4a91',
    createdAt: '2026-08-14',
    lastUsed: '4 minutes ago',
    permissions: ['generate:video', 'projects:read', 'webhooks:listen']
  },
  {
    id: 'key_2',
    name: 'Zapier & Make Automation',
    keyMasked: 'evg_live_3c21••••••••••••••88e2',
    createdAt: '2026-09-02',
    lastUsed: 'Yesterday',
    permissions: ['generate:script', 'projects:read']
  }
];
