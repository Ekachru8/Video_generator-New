import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI server-side client with mandatory User-Agent
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory store for jobs, API keys, and demo projects
interface GenerationJob {
  id: string;
  type: 'video' | 'image' | 'audio' | 'script';
  prompt: string;
  model: string;
  format?: string;
  duration?: string;
  resolution?: string;
  status: 'queued' | 'rendering' | 'completed' | 'failed';
  progress: number;
  resultUrl?: string;
  thumbnailUrl?: string;
  createdAt: number;
}

const activeJobs = new Map<string, GenerationJob>();

// 1. Prompt Builder Endpoint (Used by Everygen Prompt Builder drawer)
app.post('/api/gemini/prompt-builder', async (req: Request, res: Response) => {
  const { userMessage, currentModel, format, currentPrompt, settings } = req.body;

  if (!ai) {
    // Elegant fallback if GEMINI_API_KEY is not configured
    return res.json({
      reply: `Here is an optimized prompt crafted for **${currentModel || 'Kling 3.0'}** in **${format || 'Disney'}** format:
      
"A cinematic, high-energy 10-second sequence featuring an expressive animated character with vibrant lighting, dynamic camera push-in, shallow depth of field, 24fps motion blur, Pixar-inspired texture detailing, 4k render."
      
*Tip: You can specify lighting (e.g. golden hour, neon rim lights) or camera movement (e.g. drone orbit, dolly zoom) to push fidelity even higher!*`,
      suggestedPrompt: `A cinematic, ultra-detailed sequence in ${format || 'cinematic'} style with crisp lighting and dynamic action.`,
    });
  }

  try {
    const systemPrompt = `You are the Everygen Prompt Engineering Co-Pilot. You craft viral, production-ready AI video and creative prompts optimized for leading models including Kling 3.0, Seedance 2.5, Google Veo 3.1, MiniMax, and Grok.
Format: ${format || 'Universal'}
Target Model: ${currentModel || 'Kling 3.0'}
Current Prompt Draft: ${currentPrompt || 'None'}
Settings: ${JSON.stringify(settings || {})}

Keep your response punchy, authoritative, and actionable. Provide:
1. An improved, ready-to-copy master prompt with visual hooks, camera angles (e.g., low-angle orbit, handheld jitter, macro close-up), lighting cues, and movement speed.
2. Suggested negative prompt tags if applicable.
3. Why this structure works on social feeds (retention hook, visual payoff).
Format clearly with bold sections.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage || 'Write a complete, ready-to-generate prompt for my current model and settings.',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const replyText = response.text || '';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Prompt builder error:', error);
    res.status(500).json({
      error: 'Prompt builder generation error',
      details: error?.message || 'Unknown error',
      reply: 'Failed to generate prompt from AI. Please try again or refine your query.',
    });
  }
});

// 2. Scriptwriter Endpoint
app.post('/api/gemini/scriptwriter', async (req: Request, res: Response) => {
  const { topic, format, targetDuration, tone } = req.body;

  if (!ai) {
    return res.json({
      title: `${topic || 'Viral Video'} Script`,
      hook: 'Stop scrolling: you won’t believe what happens next.',
      scenes: [
        { time: '0-3s', visual: 'High impact close-up, dramatic quick cut', voiceover: 'What if everything you knew about this was wrong?' },
        { time: '3-7s', visual: 'Fast paced reveal with dynamic sound effects', voiceover: 'Here is the exact method creators use to remix this format.' },
        { time: '7-10s', visual: 'Call to action screen with bold kinetic typography', voiceover: 'Save this template and try it on Everygen Studio.' }
      ]
    });
  }

  try {
    const prompt = `Write a viral short-form video script for TikTok/Shorts/Reels.
Topic: ${topic}
Format: ${format || 'Quick Hook'}
Target Duration: ${targetDuration || '10 seconds'}
Tone: ${tone || 'Engaging & Cinematic'}

Return valid JSON with this structure:
{
  "title": "string",
  "hook": "string",
  "targetNiche": "string",
  "scenes": [
    { "time": "0-3s", "visual": "camera & action description", "voiceover": "spoken line", "sfx": "sound effect" }
  ],
  "callToAction": "string"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Scriptwriter error:', err);
    res.status(500).json({ error: 'Failed to generate script' });
  }
});

// 3. Video Ideation Endpoint
app.post('/api/gemini/ideation', async (req: Request, res: Response) => {
  const { niche, platform } = req.body;

  if (!ai) {
    return res.json({
      ideas: [
        { title: 'The 3-Second Hydraulic Reveal', hook: 'Watch what happens when 500 tons crushes this unexpected item', viralPotential: 98, format: 'Hydraulic press' },
        { title: 'Ring Doorbell Late-Night Visitor', hook: 'At 3:14 AM, the security alert pinged...', viralPotential: 95, format: 'Ring doorbell' },
        { title: 'Anime Sakuga Transformation', hook: 'Ordinary routine transformed into high-octane 60fps sakuga anime', viralPotential: 92, format: 'Anime' },
        { title: 'AI Court Absurdity Case', hook: 'The judge couldn’t keep a straight face after this evidence was shown', viralPotential: 89, format: 'AI court videos' }
      ]
    });
  }

  try {
    const prompt = `Generate 4 high-retention viral video ideas tailored for ${platform || 'TikTok and YouTube Shorts'} in the ${niche || 'General Entertainment'} niche.
Return JSON with this structure:
{
  "ideas": [
    { "title": "string", "hook": "string", "viralPotential": number (80-99), "format": "string", "executionTip": "string" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Ideation error:', err);
    res.status(500).json({ error: 'Failed to generate ideas' });
  }
});

// 4. Voiceover / Text-to-Speech Generation endpoint
app.post('/api/gemini/voiceover', async (req: Request, res: Response) => {
  const { text, voice } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text prompt required' });
  }

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [{ text: text.slice(0, 400) }]
          }
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: (voice || 'Kore') as any }
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({
          audioUrl: `data:audio/wav;base64,${base64Audio}`,
          voice: voice || 'Kore',
          text
        });
      }
    } catch (e: any) {
      console.warn('TTS model fallback:', e?.message);
    }
  }

  // Fallback synthetic audio metadata
  res.json({
    audioUrl: '',
    synthesized: true,
    voice: voice || 'ElevenLabs v3 - Adam',
    text
  });
});

// 5. Video Generation Job Launcher
app.post('/api/generate/video', (req: Request, res: Response) => {
  const { prompt, model, format, duration, resolution, settings } = req.body;
  const jobId = 'job_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

  const newJob: GenerationJob = {
    id: jobId,
    type: 'video',
    prompt: prompt || 'Remix animation sequence',
    model: model || 'Kling 3.0',
    format: format || 'Disney',
    duration: duration || '10s',
    resolution: resolution || '1080p',
    status: 'queued',
    progress: 5,
    createdAt: Date.now()
  };

  activeJobs.set(jobId, newJob);

  // Simulate realistic rendering progression in the background
  let progress = 10;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 15;
    if (progress >= 100) {
      progress = 100;
      newJob.status = 'completed';
      newJob.progress = 100;
      newJob.resultUrl = `/mock_videos/${jobId}.mp4`;
      newJob.thumbnailUrl = `/mock_videos/${jobId}_thumb.jpg`;
      clearInterval(interval);
    } else {
      newJob.status = 'rendering';
      newJob.progress = progress;
    }
  }, 1200);

  res.json({
    success: true,
    jobId,
    job: newJob,
    estimatedSeconds: 6,
    creditsCharged: 21
  });
});

app.get('/api/generate/status/:jobId', (req: Request, res: Response) => {
  const job = activeJobs.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// 6. Third-Party Integration REST API (v1)
app.get('/api/v1/models', (_req: Request, res: Response) => {
  res.json({
    videoModels: [
      { id: 'kling-3.0', name: 'Kling 3.0', provider: 'Kuaishou', maxRes: '4K', costPerSec: 2 },
      { id: 'kling-3.0-turbo', name: 'Kling 3.0 Turbo', provider: 'Kuaishou', maxRes: '1080p', costPerSec: 1 },
      { id: 'seedance-2.5', name: 'Seedance 2.5', provider: 'ByteDance', maxRes: '1080p', costPerSec: 2.1 },
      { id: 'seedance-2', name: 'Seedance 2', provider: 'ByteDance', maxRes: '720p', costPerSec: 1.5 },
      { id: 'veo-3.1', name: 'Google Veo 3.1', provider: 'Google', maxRes: '4K', costPerSec: 3 },
      { id: 'minimax-h3', name: 'MiniMax H3', provider: 'MiniMax', maxRes: '1080p', costPerSec: 1.8 },
      { id: 'grok-imagine-1.5', name: 'Grok Imagine 1.5', provider: 'xAI', maxRes: '1080p', costPerSec: 2 }
    ],
    imageModels: [
      { id: 'nano-banana-pro', name: 'Nano Banana Pro', maxRes: '4K' },
      { id: 'nano-banana-2', name: 'Nano Banana 2', maxRes: '2K' },
      { id: 'gpt-image-2.5-flare', name: 'GPT Image 2.5 Flare', maxRes: '1K' }
    ],
    audioModels: [
      { id: 'elevenlabs-v3', name: 'ElevenLabs v3', types: ['voiceover', 'cloning'] },
      { id: 'seed-audio-1.0', name: 'Seed Audio 1.0', types: ['multispeaker', 'effects'] }
    ]
  });
});

app.post('/api/billing/checkout', (req: Request, res: Response) => {
  const { planId, billingCycle, paymentMethod } = req.body;
  const planCreditsMap: Record<string, number> = {
    starter: 500,
    creator: 2000,
    pro: 5000,
    studio: 15000
  };

  const addedCredits = planCreditsMap[planId] || 2000;
  res.json({
    success: true,
    transactionId: 'tx_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    planId,
    billingCycle: billingCycle || 'monthly',
    addedCredits,
    timestamp: new Date().toISOString(),
    message: `Successfully upgraded to ${planId.toUpperCase()} plan. ${addedCredits} credits added!`
  });
});

// Vite Middleware for Development / Static file serving for Production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Everygen Studio server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
