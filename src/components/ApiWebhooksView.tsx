import React, { useState } from 'react';
import { Key, Copy, Check, Plus, Trash2, Terminal, Code2, Webhook, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ApiWebhooksView: React.FC = () => {
  const { apiKeys, createApiKey, revokeApiKey } = useApp();
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'ts' | 'python'>('curl');
  const [webhookUrl, setWebhookUrl] = useState('https://my-app.com/webhooks/everygen');
  const [webhookTestStatus, setWebhookTestStatus] = useState<string | null>(null);

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
    curl: `curl -X POST "https://everygen.ai/api/v1/generate" \\
  -H "Authorization: Bearer evg_live_9f82..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "seedance-2.5",
    "prompt": "Ultra-crisp macro tracking shot of an energy drink can",
    "format": "commercial-ad",
    "duration": "10s",
    "resolution": "1080p"
  }'`,
    ts: `import { EverygenClient } from '@everygen/sdk';

const client = new EverygenClient({
  apiKey: process.env.EVERYGEN_API_KEY
});

const videoJob = await client.videos.generate({
  model: 'seedance-2.5',
  prompt: 'Ultra-crisp macro tracking shot of an energy drink can',
  format: 'commercial-ad',
  duration: 10,
  resolution: '1080p'
});

console.log('Video Job Created:', videoJob.id);`,
    python: `import everygen

client = everygen.Client(api_key="evg_live_9f82...")

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
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          API Keys & Webhook Integrations
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Automate video generation programmatically with REST endpoints, SDKs, and event webhooks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Keys Management */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
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
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition-colors"
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
                      className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                      title="Copy key"
                    >
                      {copiedKeyId === key.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="p-1 rounded-md text-neutral-400 hover:text-red-600"
                      title="Revoke key"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="font-mono text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
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

        {/* Webhook Endpoints */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
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
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
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

            <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Subscribed Events:
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
  );
};
