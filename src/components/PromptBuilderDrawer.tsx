import React, { useState } from 'react';
import { X, Send, Sparkles, Copy, Check, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const PromptBuilderDrawer: React.FC = () => {
  const {
    isPromptBuilderOpen,
    setIsPromptBuilderOpen,
    currentPrompt,
    setCurrentPrompt,
    selectedModel,
    selectedFormat,
    duration,
    resolution
  } = useApp();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPromptBuilderOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsPromptBuilderOpen]);

  // Dynamically initialize drawer when opened
  React.useEffect(() => {
    if (isPromptBuilderOpen && messages.length === 0) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (currentPrompt && currentPrompt.trim()) {
        setMessages([
          {
            id: 'm1',
            sender: 'user',
            text: `Optimize my concept: "${currentPrompt}"`,
            timestamp: now
          },
          {
            id: 'm2',
            sender: 'assistant',
            text: `I've loaded your concept: **"${currentPrompt}"**.

How would you like me to refine it for **${selectedModel.name}** in **${selectedFormat.name}** format?
Tap any quick suggestion above or describe what to add (e.g., camera movements, lighting, slow motion, or negative prompts)!`,
            timestamp: now
          }
        ]);
      } else {
        setMessages([
          {
            id: 'm1',
            sender: 'assistant',
            text: `Welcome to NovaGen Prompt Co-Pilot!

What video would you like to create? Type any subject or action (e.g. *"A high-speed cybernetic drift car in Tokyo rain"* or *"A golden eagle diving through mountain clouds"*), and I will generate an optimized, viral master prompt for **${selectedModel.name}**!`,
            timestamp: now
          }
        ]);
      }
    }
  }, [isPromptBuilderOpen, currentPrompt, selectedModel.name, selectedFormat.name]);

  if (!isPromptBuilderOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/prompt-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: textToSend,
          currentModel: selectedModel.name,
          format: selectedFormat.name,
          currentPrompt: currentPrompt,
          settings: { duration, resolution }
        })
      });

      const data = await res.json();
      const reply = data.reply || 'Here is an optimized prompt for your current video generation settings.';

      const botMsg: Message = {
        id: 'b_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackSubject = currentPrompt || textToSend;
      const fallbackMsg: Message = {
        id: 'b_' + Date.now(),
        sender: 'assistant',
        text: `Here is an enhanced prompt recommendation for **${selectedModel.name}**:

"${fallbackSubject}, dynamic low-angle camera push-in, cinematic volumetric lighting, 24fps filmic realism, 4K render quality, style of ${selectedFormat.name}."`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToStudio = (text: string) => {
    // Extract quoted prompt if exists or use text
    const match = text.match(/"([^"]+)"/);
    const finalPrompt = match ? match[1] : text;
    setCurrentPrompt(finalPrompt);
    setCopiedId('applied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={() => setIsPromptBuilderOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white dark:bg-[#080a12] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header (Screenshot 6 replica) */}
        <div className="h-14 px-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Prompt Builder
            </h3>
          </div>
          <button
            onClick={() => setIsPromptBuilderOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      {/* Active Studio Prompt Context Banner */}
      {currentPrompt && currentPrompt.trim() && (
        <div className="px-4 py-2 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200 flex items-center justify-between">
          <div className="truncate pr-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400 mr-1">Concept:</span>
            <span className="italic truncate opacity-90">"{currentPrompt}"</span>
          </div>
          <span className="text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
            {selectedModel.name}
          </span>
        </div>
      )}

      {/* Quick Prompts Shelf */}
      <div className="p-3 bg-neutral-50 dark:bg-[#181924] border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
        <button
          onClick={() => handleSend(currentPrompt ? `Add dynamic camera movement and cinematic lighting to my concept: "${currentPrompt}"` : 'Add dynamic camera movement & cinematic lighting')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 whitespace-nowrap cursor-pointer transition-colors"
        >
          + Camera & Lighting
        </button>
        <button
          onClick={() => handleSend(currentPrompt ? `Add a high-retention viral twist to my concept: "${currentPrompt}"` : 'Add a high-retention viral twist')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 whitespace-nowrap cursor-pointer transition-colors"
        >
          + Viral Twist
        </button>
        <button
          onClick={() => handleSend(currentPrompt ? `Suggest negative prompts to prevent artifacts for my concept: "${currentPrompt}"` : 'Suggest negative prompts')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 whitespace-nowrap cursor-pointer transition-colors"
        >
          + Negative Prompts
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/60 rounded-bl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>

              {m.sender === 'assistant' && (
                <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <button
                    onClick={() => handleApplyToStudio(m.text)}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'applied' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Applied to Studio!</span>
                      </>
                    ) : (
                      <>
                        <span>Apply to Studio Prompt</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-neutral-400 font-mono">{m.timestamp}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500 w-fit">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Gemini is engineering your prompt...</span>
          </div>
        )}
      </div>

      {/* Input Box (Screenshot 6 replica) */}
      <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#080a12]">
        <div className="relative flex items-center rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/70 p-1.5 focus-within:border-blue-500 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Prompt Builder..."
            className="flex-1 px-3 py-1.5 bg-transparent text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl text-white transition-all ${
              input.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-xs'
                : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
