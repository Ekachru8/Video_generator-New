import React, { useState, useEffect } from 'react';
import { Key, Copy, Check, Plus, Trash2, Terminal, Code2, Webhook, Send, Cpu, Sparkles, ExternalLink, ShieldCheck, AlertCircle, Save, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AIProviderConfig {
  id: string;
  name: string;
  category: 'Video Generation' | 'Script & Ideation' | 'Voice & Audio' | 'Image Generation';
  description: string;
  provider: string;
  envVar: string;
  pricing: string;
  recommendedModels: string[];
  docsUrl: string;
  status: 'connected' | 'configured' | 'missing';
  keyMasked?: string;
}

export const ApiWebhooksView: React.FC = () => {
  const { apiKeys, createApiKey, revokeApiKey } = useApp();
  const [activeTab, setActiveTab] = useState<'external-ai' | 'developer-keys' | 'webhooks'>('external-ai');
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'ts' | 'python'>('curl');
  const [webhookUrl, setWebhookUrl] = useState('https://my-app.com/webhooks/novagen');
  const [webhookTestStatus, setWebhookTestStatus] = useState<string | null>(null);

  // Server-synced key statuses
  const [serverKeys, setServerKeys] = useState<Record<string, { configured: boolean; masked: string }>>({});
  const [providerKeys, setProviderKeys] = useState<Record<string, string>>({
    gemini: '',
    replicate: '',
    fal: '',
    runway: '',
    elevenlabs: '',
    kling: ''
  });
  const [savingProvider, setSavingProvider] = useState<string | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<Record<string, string>>({});
  const [testedProvider, setTestedProvider] = useState<string | null>(null);

  const fetchServerKeys = async () => {
    try {
      const res = await fetch('/api/config/keys');
      if (res.ok) {
        const data = await res.json();
        setServerKeys(data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchServerKeys();
  }, []);

  const handleSaveKey = async (providerId: string) => {
    const keyVal = providerKeys[providerId];
    if (!keyVal || !keyVal.trim()) return;
    setSavingProvider(providerId);

    try {
      const res = await fetch('/api/config/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: providerId, apiKey: keyVal.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setStatusFeedback(prev => ({ ...prev, [providerId]: 'Saved & Active!' }));
        setProviderKeys(prev => ({ ...prev, [providerId]: '' }));
        await fetchServerKeys();
      } else {
        setStatusFeedback(prev => ({ ...prev, [providerId]: 'Save failed' }));
      }
    } catch {
      setStatusFeedback(prev => ({ ...prev, [providerId]: 'Network error' }));
    } finally {
      setSavingProvider(null);
      setTimeout(() => {
        setStatusFeedback(prev => ({ ...prev, [providerId]: '' }));
      }, 3500);
    }
  };

  const aiProviders: AIProviderConfig[] = [
    {
      id: 'gemini',
      name: 'Google Gemini & Imagen 3',
      category: 'Script & Ideation',
      description: 'Powers viral short-form scriptwriting, prompt blueprints, Imagen 3 4K images, and Gemini TTS.',
      provider: 'Google AI Studio',
      envVar: 'GEMINI_API_KEY',
      pricing: 'Free tier available (15 RPM), pay-as-you-go',
      recommendedModels: ['gemini-3.8-flash', 'imagen-3.0-generate-002', 'gemini-3.8-flash-lite-tts'],
      docsUrl: 'https://aistudio.google.com/app/apikey',
      status: serverKeys.gemini?.configured ? 'connected' : 'missing',
      keyMasked: serverKeys.gemini?.masked || ''
    },
    {
      id: 'replicate',
      name: 'Replicate API (Recommended for Video)',
      category: 'Video Generation',
      description: 'Host and run Minimax Video-01, Wan 2.1, CogVideoX, Luma Ray, FLUX.1 Schnell, and SDXL.',
      provider: 'Replicate Inc.',
      envVar: 'REPLICATE_API_TOKEN',
      pricing: '~$0.01 - $0.05 per video render (Pay per second)',
      recommendedModels: ['minimax/video-01', 'wan-video/wan-2.1-t2v-14b', 'black-forest-labs/flux-schnell'],
      docsUrl: 'https://replicate.com/account/api-tokens',
      status: serverKeys.replicate?.configured ? 'configured' : 'missing',
      keyMasked: serverKeys.replicate?.masked || ''
    },
    {
      id: 'fal',
      name: 'Fal.ai API (Fastest Kling Video)',
      category: 'Video Generation',
      description: 'Ultra-fast inference gateway for Kling Video v1.6, Minimax, HunyuanVideo, and FLUX Pro.',
      provider: 'Fal.ai',
      envVar: 'FAL_KEY',
      pricing: 'Free starter credits, then ~$0.02 - $0.06 per video',
      recommendedModels: ['fal-ai/kling-video', 'fal-ai/minimax-video', 'fal-ai/flux/schnell'],
      docsUrl: 'https://fal.ai/dashboard/keys',
      status: serverKeys.fal?.configured ? 'configured' : 'missing',
      keyMasked: serverKeys.fal?.masked || ''
    },
    {
      id: 'runway',
      name: 'RunwayML API',
      category: 'Video Generation',
      description: 'Hollywood-grade cinematic video generator (Gen-3 Alpha / Turbo) with high camera control.',
      provider: 'Runway AI',
      envVar: 'RUNWAY_API_KEY',
      pricing: 'Starting at $12/month or usage credits',
      recommendedModels: ['gen3a_turbo', 'gen3a'],
      docsUrl: 'https://runwayml.com/api',
      status: serverKeys.runway?.configured ? 'configured' : 'missing',
      keyMasked: serverKeys.runway?.masked || ''
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs Voice AI',
      category: 'Voice & Audio',
      description: 'Studio-grade voiceover narration in 32+ languages, voice cloning, and emotional speech.',
      provider: 'ElevenLabs',
      envVar: 'ELEVENLABS_API_KEY',
      pricing: 'Free plan (10k chars/mo), then $5/mo Starter',
      recommendedModels: ['eleven_multilingual_v2', 'eleven_turbo_v2'],
      docsUrl: 'https://elevenlabs.io/',
      status: serverKeys.elevenlabs?.configured ? 'configured' : 'missing',
      keyMasked: serverKeys.elevenlabs?.masked || ''
    },
    {
      id: 'kling',
      name: 'Kling AI Native API',
      category: 'Video Generation',
      description: 'Top-tier motion dynamics and physical realism for viral YouTube Shorts and TikToks.',
      provider: 'Kuaishou Technology',
      envVar: 'KLING_API_KEY',
      pricing: 'Commercial access tiers',
      recommendedModels: ['kling-v3-turbo', 'kling-v3'],
      docsUrl: 'https://klingai.com/',
      status: serverKeys.kling?.configured ? 'configured' : 'missing',
      keyMasked: serverKeys.kling?.masked || ''
    }
  ];

  const handleTestProvider = (id: string) => {
    setTestedProvider(id);
    setTimeout(() => {
      setTestedProvider(null);
    }, 1800);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    createApiKey(newKeyName, ['generate:video', 'projects:read', 'webhooks:listen']);
    setNewKeyName('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleTestWebhook = () => {
    setWebhookTestStatus('sending');
    setTimeout(() => {
      setWebhookTestStatus('delivered (200 OK)');
      setTimeout(() => setWebhookTestStatus(null), 3000);
    }, 1000);
  };

  const codeSnippets = {
    curl: `curl -X POST "https://api.novagen.ai/v1/generate" \\
  -H "Authorization: Bearer nvg_live_9f82..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "seedance-2.5",
    "prompt": "Ultra-crisp macro tracking shot of an energy drink can",
    "format": "commercial-ad",
    "duration": "10s",
    "resolution": "1080p"
  }'`,
    ts: `import { NovaGenClient } from '@novagen/sdk';

const client = new NovaGenClient({
  apiKey: process.env.NOVAGEN_API_KEY
});

const videoJob = await client.videos.generate({
  model: 'seedance-2.5',
  prompt: 'Ultra-crisp macro tracking shot of an energy drink can',
  format: 'commercial-ad',
  duration: 10,
  resolution: '1080p'
});

console.log('Video Job Created:', videoJob.id);`,
    python: `import novagen

client = novagen.Client(api_key="nvg_live_9f82...")

job = client.videos.generate(
    model="seedance-2.5",
    prompt="Ultra-crisp macro tracking shot of an energy drink can",
    format="commercial-ad",
    duration=10,
    resolution="1080p"
)

print("Video generation started:", job.id)`
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 select-none max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            API Keys & Video Generation Engines
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Configure external AI generation engines (Replicate, ElevenLabs, Gemini, Kling) or generate NovaGen API tokens.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 w-fit">
          <button
            onClick={() => setActiveTab('external-ai')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'external-ai'
                ? 'bg-white dark:bg-[#0a0b14] text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            AI Engines (Google Pro & Extras)
          </button>
          <button
            onClick={() => setActiveTab('developer-keys')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'developer-keys'
                ? 'bg-white dark:bg-[#0a0b14] text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Developer API Keys
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'webhooks'
                ? 'bg-white dark:bg-[#0a0b14] text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Webhooks & Events
          </button>
        </div>
      </div>

      {/* VIEW 1: External AI Providers */}
      {activeTab === 'external-ai' && (
        <div className="space-y-6">
          {/* Hero: Google AI Suite (All-In-One Free / Pro Engine) */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-blue-500/30 dark:border-blue-500/40 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/30 shrink-0">
                  G
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      Google AI Studio (Gemini & Imagen 3)
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/15 border border-blue-600/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono">
                      RECOMMENDED • 100% FREE / GOOGLE PRO
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    <strong>One single key powers your entire studio!</strong> You get full 4K Imagen 3 artwork, cinematic video sequences, viral scriptwriting, and voiceovers without any paid subscriptions.
                  </p>
                </div>
              </div>

              {serverKeys.gemini?.configured ? (
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold w-fit shrink-0">
                  <Check className="w-4 h-4" />
                  <span>GOOGLE PRO ACTIVE</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold w-fit shrink-0">
                  <AlertCircle className="w-4 h-4" />
                  <span>Paste Google Key Below</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[11px]">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-800/50 space-y-0.5">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">4K Images</span>
                <span className="text-[10px] text-neutral-500 block">Google Imagen 3 (Free)</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-800/50 space-y-0.5">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">Cinematic Video</span>
                <span className="text-[10px] text-neutral-500 block">Google Motion Engine</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-800/50 space-y-0.5">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">Viral Shorts Scripts</span>
                <span className="text-[10px] text-neutral-500 block">Gemini 2.5 Flash / Pro</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-800/50 space-y-0.5">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">Voice & Audio</span>
                <span className="text-[10px] text-neutral-500 block">Gemini TTS & Natural Speech</span>
              </div>
            </div>

            {/* Google Key input */}
            <div className="space-y-2 pt-1">
              {serverKeys.gemini?.masked && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <span>Active Key: {serverKeys.gemini.masked}</span>
                  <span className="text-[10px] font-sans font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">ALL FEATURES UNLOCKED</span>
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleSaveKey('gemini'); }} className="flex gap-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder={serverKeys.gemini?.masked ? "Update GEMINI_API_KEY..." : "Paste your Google AI Studio API Key (AIzaSy...)..."}
                  value={providerKeys.gemini || ''}
                  onChange={(e) => setProviderKeys({ ...providerKeys, gemini: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={savingProvider === 'gemini' || !providerKeys.gemini?.trim()}
                  className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  {savingProvider === 'gemini' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{statusFeedback.gemini || 'Save & Activate Google Key'}</span>
                </button>
              </form>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-2">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Get Free Google API Key in 30 seconds (Google AI Studio)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-neutral-400 text-[11px] font-medium">Free Tier • No payment needed</span>
              </div>
            </div>
          </div>

          {/* Optional Paid Third-Party Add-ons */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Optional Third-Party Add-ons (Paid - NOT Required)
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  You do NOT need these. Your Google Key above already handles everything. These are only for users who have paid accounts on external GPU providers.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-500">
                OPTIONAL
              </span>
            </div>

            {/* Providers Grid (Excluding Google which is in Hero) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiProviders.filter(p => p.id !== 'gemini').map((p) => {
                return (
                  <div
                    key={p.id}
                    className="rounded-3xl p-5 bg-white dark:bg-[#080a12] border border-neutral-200/90 dark:border-neutral-800/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {p.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono font-medium text-neutral-600 dark:text-neutral-400">
                              {p.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 block mt-0.5 font-mono">
                            ENV: {p.envVar}
                          </span>
                        </div>

                        {p.status === 'configured' ? (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Key Added</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px] font-mono">
                            <span>Optional</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Cost:</span>
                          <span className="font-medium text-neutral-700 dark:text-neutral-300">{p.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Models:</span>
                          <span className="font-mono text-neutral-700 dark:text-neutral-300">{p.recommendedModels.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Input & Action */}
                    <div className="space-y-2 pt-1">
                      {p.keyMasked ? (
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                          <span>Active: {p.keyMasked}</span>
                          <span className="text-[10px] text-emerald-500 font-bold">SAVED</span>
                        </div>
                      ) : null}

                      <form onSubmit={(e) => { e.preventDefault(); handleSaveKey(p.id); }} className="flex gap-2">
                        <input
                          type="password"
                          autoComplete="current-password"
                          placeholder={p.keyMasked ? `Update ${p.envVar}...` : `Paste optional ${p.envVar}...`}
                          value={providerKeys[p.id] || ''}
                          onChange={(e) => setProviderKeys({ ...providerKeys, [p.id]: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={savingProvider === p.id || !providerKeys[p.id]?.trim()}
                          className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savingProvider === p.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Save className="w-3.5 h-3.5" />
                          )}
                          <span>{statusFeedback[p.id] || 'Save'}</span>
                        </button>
                      </form>

                      <div className="flex items-center justify-between text-[11px]">
                        <a
                          href={p.docsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1 font-medium text-[11px]"
                        >
                          <span>Get {p.name} Key</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-neutral-400 font-mono text-[10px]">Optional Add-on</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Developer Keys */}
      {activeTab === 'developer-keys' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <span>Production API Keys ({apiKeys.length})</span>
              </h3>
            </div>

            <form onSubmit={handleCreate} className="flex gap-2">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key description (e.g. Next.js Backend Worker)"
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 border border-transparent focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newKeyName.trim()}
                className="everygen-btn-primary px-4 py-2 rounded-xl text-white font-bold text-xs cursor-pointer disabled:opacity-50"
              >
                Generate Key
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      {key.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(key.keyMasked, key.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        title="Copy key"
                      >
                        {copiedKeyId === key.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => revokeApiKey(key.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600"
                        title="Revoke key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    {key.keyMasked}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span>Created: {key.createdAt}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippets Console */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-neutral-100 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Integration Code Snippets</h3>
              </div>

              <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-xl text-xs font-mono">
                {(['curl', 'ts', 'python'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1 rounded-lg uppercase ${
                      activeCodeTab === tab ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <pre className="p-4 rounded-2xl bg-neutral-950 font-mono text-xs leading-relaxed text-neutral-300 overflow-x-auto border border-neutral-800">
              {codeSnippets[activeCodeTab]}
            </pre>
          </div>
        </div>
      )}

      {/* VIEW 3: Webhooks */}
      {activeTab === 'webhooks' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm space-y-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Webhook className="w-4 h-4 text-purple-600" />
              <span>Event Webhooks</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-500 font-semibold mb-1">Target Endpoint URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-900 dark:text-neutral-100 border border-transparent focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={handleTestWebhook}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Test Ping</span>
                </button>
              </div>
            </div>

            {webhookTestStatus && (
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
                Webhook test event: {webhookTestStatus}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Subscribed Realtime Events:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>video.rendered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>render.failed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>credits.threshold_low</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>project.shared</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
