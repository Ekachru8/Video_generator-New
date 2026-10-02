import React, { useState } from 'react';
import { Sparkles, Download, Copy, Check, Image as ImageIcon, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImageGeneratorStudio: React.FC = () => {
  const { deductCredits, addProject } = useApp();
  const [prompt, setPrompt] = useState('Photorealistic 4k cinematic poster of a sleek sports car in Miami Vice City during purple neon twilight, reflections on wet asphalt, volumetric lens flare.');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !deductCredits(4)) return;
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedImg('img_generated_ok');
      addProject({
        id: 'img_' + Date.now(),
        title: `Image - ${prompt.slice(0, 20)}...`,
        type: 'image',
        format: 'Concept Art',
        model: 'Nano Banana Pro',
        resolution: '4K UHD',
        aspectRatio: aspectRatio === '1:1' ? '1:1' : aspectRatio === '16:9' ? '16:9' : '9:16',
        sizeBytes: 8400000,
        createdAt: Date.now(),
        status: 'ready',
        prompt,
        tags: ['Image', 'Nano Banana', '4K'],
        thumbnailColor: '#8B5CF6'
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
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
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
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
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
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
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center min-h-[360px]">
          {isGenerating ? (
            <div className="text-center space-y-2">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-xs font-mono text-neutral-400">Diffusion steps converging...</div>
            </div>
          ) : (
            <div className="w-full h-full max-w-sm aspect-square rounded-2xl bg-gradient-to-tr from-purple-900 via-indigo-950 to-neutral-950 border border-neutral-700 flex flex-col justify-between p-4 text-white shadow-xl relative overflow-hidden group">
              <div className="flex justify-between items-center text-[10px] font-mono opacity-80">
                <span>NANO BANANA PRO</span>
                <span>4096 x 4096 px</span>
              </div>

              <div className="text-center my-auto">
                <div className="text-4xl mb-2">🏎️ 🌆</div>
                <div className="text-sm font-bold text-pink-400">MIAMI TWILIGHT</div>
                <div className="text-[11px] text-neutral-300 mt-1 line-clamp-2 px-4 font-mono">
                  {prompt}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-2 border-t border-white/20">
                <span>Loss: 0.012</span>
                <span className="text-emerald-400 font-semibold">Render Ready</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
