import React, { useState } from 'react';
import { Sparkles, Download, Copy, Check, Image as ImageIcon, Sliders, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImageGeneratorStudio: React.FC = () => {
  const { deductCredits, addCredits, addProject, addNotification, setCurrentPrompt, setActiveTab } = useApp();
  const [prompt, setPrompt] = useState('Photorealistic 4k cinematic shot of a futuristic concept, atmospheric lighting, volumetric depth, photorealistic textures.');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [copiedImgUrl, setCopiedImgUrl] = useState(false);

  const getImageVisualMeta = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('car') || t.includes('vehicle') || t.includes('race') || t.includes('drive')) return { emoji: '🏎️ ⚡', title: 'HIGH-OCTANE VEHICLE', grad: 'from-amber-600 via-rose-700 to-slate-950' };
    if (t.includes('samurai') || t.includes('sword') || t.includes('ninja') || t.includes('warrior')) return { emoji: '⚔️ 🌸', title: 'MASTER BLADE WARRIOR', grad: 'from-red-900 via-stone-900 to-black' };
    if (t.includes('dragon') || t.includes('monster') || t.includes('fantasy') || t.includes('beast')) return { emoji: '🐉 🔮', title: 'MYTHIC BEAST CONCEPT', grad: 'from-purple-900 via-indigo-950 to-black' };
    if (t.includes('space') || t.includes('galaxy') || t.includes('star') || t.includes('planet') || t.includes('nebula')) return { emoji: '🪐 🌌', title: 'DEEP SPACE EXPLORATION', grad: 'from-blue-900 via-indigo-950 to-black' };
    if (t.includes('nature') || t.includes('forest') || t.includes('mountain') || t.includes('ocean') || t.includes('waterfall')) return { emoji: '🏔️ 🌲', title: 'PRISTINE WILDERNESS', grad: 'from-emerald-900 via-teal-950 to-black' };
    if (t.includes('portrait') || t.includes('woman') || t.includes('man') || t.includes('person') || t.includes('face')) return { emoji: '👤 ✨', title: 'STUDIO 4K PORTRAIT', grad: 'from-amber-900 via-stone-900 to-black' };
    if (t.includes('cyber') || t.includes('neon') || t.includes('robot') || t.includes('future') || t.includes('mecha')) return { emoji: '🤖 ⚡', title: 'CYBERNETIC TRANSCENDENCE', grad: 'from-cyan-900 via-purple-950 to-black' };
    return { emoji: '🎨 ✨', title: 'CREATIVE MASTERPIECE', grad: 'from-blue-900 via-indigo-950 to-black' };
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !deductCredits(4)) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio })
      });
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate image');
      }
      if (!data.imageUrl) {
        throw new Error('API did not return a valid image URL');
      }

      setGeneratedImg(data.imageUrl);
      addProject({
        id: 'img_' + Date.now(),
        title: `Image - ${prompt.slice(0, 24)}...`,
        type: 'image',
        format: 'Concept Art',
        model: data.model || 'Imagen 3 / Nano Banana Pro',
        resolution: '4K UHD',
        aspectRatio: aspectRatio === '1:1' ? '1:1' : aspectRatio === '16:9' ? '16:9' : '9:16',
        sizeBytes: 8400000,
        createdAt: Date.now(),
        status: 'ready',
        prompt,
        tags: ['Image', data.provider || 'Imagen 3', '4K'],
        thumbnailColor: '#8B5CF6',
        imageUrl: data.imageUrl
      });
      addNotification('4K Image Generated', 'Your new high-resolution render is ready.', 'render_complete');
    } catch (err: any) {
      addCredits(4); // Refund on failure
      addNotification('Generation Failed', err.message || 'Image generation error', 'system');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          AI Image Generator
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Powered by Nano Banana Pro & Gemini 3.1 Flash Image. Ultra-high fidelity textures, up to 4K.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Prompt & Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Image Prompt Blueprint
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="Describe the image in vivid detail..."
              className="w-full p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 leading-relaxed focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-500">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
              {(['1:1', '16:9', '9:16'] as const).map(ar => (
                <button
                  key={ar}
                  onClick={() => setAspectRatio(ar)}
                  className={`py-2 rounded-xl border transition-all ${
                    aspectRatio === ar
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {ar}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Rendering 4K Canvas...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Image (4 Credits)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Canvas Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center min-h-[360px] relative">
          {isGenerating ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-xs font-mono text-neutral-400">Diffusion steps converging...</div>
              <div className="text-[10px] text-neutral-500">Querying image generation engine</div>
            </div>
          ) : generatedImg && (generatedImg.startsWith('http') || generatedImg.startsWith('data:')) ? (
            <div className="w-full h-full max-w-md flex flex-col items-center space-y-3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 group">
                <img
                  src={generatedImg}
                  alt={prompt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-mono line-clamp-2">{prompt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full justify-center">
                <a
                  href={generatedImg}
                  download={`novagen-${Date.now()}.png`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 4K Image</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedImg);
                    setCopiedImgUrl(true);
                    addNotification('URL Copied', 'Image link copied to clipboard.', 'system');
                    setTimeout(() => setCopiedImgUrl(false), 2000);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedImgUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedImgUrl ? 'Copied!' : 'Copy URL'}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPrompt(`Cinematic high-motion 4K render from image: ${prompt}`);
                    setActiveTab('shorts-studio');
                    addNotification('Transferred to Studio', 'Opening Shorts Studio with concept', 'system');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Animate in Video</span>
                </button>
              </div>
            </div>
          ) : (
            (() => {
              const meta = getImageVisualMeta(prompt);
              return (
                <div className={`w-full h-full max-w-sm aspect-square rounded-2xl bg-gradient-to-tr ${meta.grad} border border-neutral-700 flex flex-col justify-between p-4 text-white shadow-xl relative overflow-hidden group`}>
                  <div className="flex justify-between items-center text-[10px] font-mono opacity-80">
                    <span>NANO BANANA PRO / IMAGEN 3</span>
                    <span>4096 x 4096 px</span>
                  </div>

                  <div className="text-center my-auto">
                    <div className="text-4xl mb-2">{meta.emoji}</div>
                    <div className="text-sm font-bold text-cyan-300 tracking-wider uppercase drop-shadow">{meta.title}</div>
                    <div className="text-[11px] text-neutral-300 mt-2 line-clamp-3 px-4 font-mono leading-relaxed bg-black/40 py-1.5 rounded-lg border border-white/10 backdrop-blur-xs">
                      {prompt || 'Describe your image concept...'}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-2 border-t border-white/20">
                    <span>Loss: 0.008</span>
                    <span className="text-emerald-400 font-semibold">Ready to Render</span>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};
