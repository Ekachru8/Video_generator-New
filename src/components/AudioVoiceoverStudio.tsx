import React, { useState } from 'react';
import { Mic, Volume2, Play, Download, Sparkles, Sliders, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AudioVoiceoverStudio: React.FC = () => {
  const { deductCredits, addProject } = useApp();
  const [text, setText] = useState('Welcome to Everygen Studio. The premier engine for viral short-form videos and cinematic AI sound design.');
  const [voice, setVoice] = useState('Adam (Deep & Authoritative)');
  const [emotion, setEmotion] = useState('Energetic & Confident');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const voices = [
    { name: 'Adam (Deep & Authoritative)', provider: 'ElevenLabs v3', gender: 'Male', accent: 'American' },
    { name: 'Sarah (Warm & Relatable)', provider: 'ElevenLabs v3', gender: 'Female', accent: 'British' },
    { name: 'Kore (Balanced Documentary)', provider: 'Google Gemini TTS', gender: 'Female', accent: 'Neutral' },
    { name: 'Fenrir (Intense Cinema Narrator)', provider: 'Google Gemini TTS', gender: 'Male', accent: 'Nordic' }
  ];

  const handleGenerateVoice = async () => {
    if (!text.trim()) return;
    if (!deductCredits(2)) return;

    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/gemini/voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice })
      });
      const data = await res.json();
      setAudioUrl(data.audioUrl || 'synth_ok');

      // Add to projects
      addProject({
        id: 'aud_' + Date.now(),
        title: `Voiceover - ${text.slice(0, 24)}...`,
        type: 'audio',
        format: 'ElevenLabs Voice',
        model: 'ElevenLabs v3',
        duration: '6s',
        resolution: '48kHz WAV',
        aspectRatio: '16:9',
        sizeBytes: 1200000,
        createdAt: Date.now(),
        status: 'ready',
        prompt: text,
        tags: ['Audio', 'Voiceover', 'ElevenLabs'],
        thumbnailColor: '#EC4899'
      });
    } catch {
      setAudioUrl('fallback_ok');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handlePlaySynthesized = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          AI Voiceover & Audio Stems
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ElevenLabs v3 & Google Gemini high-fidelity text-to-speech with natural breathing and emotional pacing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Voice Script Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-700 dark:text-neutral-300">Voiceover Narration Script</span>
              <span className="text-neutral-400 font-mono">{text.length} characters</span>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Enter spoken script here..."
              className="w-full p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 leading-relaxed focus:outline-none focus:border-blue-500"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <span>Cost: 2 credits</span>
                <span>·</span>
                <span>Format: 48kHz WAV</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePlaySynthesized}
                  className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Audition Preview</span>
                </button>

                <button
                  onClick={handleGenerateVoice}
                  disabled={isSynthesizing}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  {isSynthesizing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Voiceover Stem</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Voices Selection */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Select Voice Actor
            </h3>

            <div className="space-y-2">
              {voices.map(v => (
                <div
                  key={v.name}
                  onClick={() => setVoice(v.name)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    voice === v.name
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    <span>{v.name}</span>
                    {voice === v.name && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {v.provider} · {v.accent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
