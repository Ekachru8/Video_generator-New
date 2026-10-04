# NovaGen Studio — AI Video & Creative Content OS

[![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_%26_Imagen_3-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)

> **NovaGen Studio** is a state-of-the-art AI video generation and viral shorts creation studio. Inspired by modern video creative suites like [Everygen.ai](https://everygen.ai/), NovaGen Studio enables creators, brands, and agencies to remix proven viral formats, generate high-definition 4K video clips, automate social media short-form content, and collaborate in real-time.

---

## 🌐 Site Links & Access

- 🚀 **Local Web App**: [http://localhost:3000](http://localhost:3000)
- 🔗 **Reference Inspiration Platform**: [https://everygen.ai/](https://everygen.ai/) *(Everygen / Viewmax)*
- 🔑 **Google AI Studio Key (Free Tier)**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- ⚡ **Replicate API Tokens**: [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
- 🎬 **Fal.ai Key (Kling Video)**: [https://fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)

---

## ✨ Key Features

### 🎬 1. Remix Proven Viral Formats
- Instantly remix top-performing formats across TikTok, YouTube Shorts, Reels, and Instagram:
  - **Disney 3D Character Hooks** (e.g. mint ice cream puppy, cute animated animals)
  - **GTA 6 Hyper-Real Gameplay Sequences**
  - **AI Court & Verdict Dramas**
  - **CCTV & Security Surveillance Footage**
  - **Ring Doorbell Neighborhood Mysteries**
  - **500-Ton Hydraulic Press Crushing**
  - **Zach D Films 3D Explainer Simulations**
  - **Anime Sakuga Action Sequences**
  - **Shot on iPhone Natural Disasters & Wildlife Clips**
  - **Ranking & Tier List Countdowns**
- Dynamic template binding: selecting any format automatically populates camera motion, resolution presets, and connects high-fidelity video/image trailers.

### 🌓 2. Dark & Light Mode Theme Toggle
- Dedicated, high-contrast theme toggle pill button in the top header (`Light` / `Dark`) and sidebar footer.
- Automatic system preference detection and smooth transitions.
- Fully persistent via `localStorage` and `document.documentElement.classList`.
- Hands-free voice command support: say *"toggle dark mode"* or *"switch to light mode"*.

### ⚡ 3. Generous Credits & Free Top-Ups
- **6,420 starting credits** for new and returning users.
- Automatic **+5,000 credit boost** for existing local sessions.
- Instant **`+5,000` Refill Button** located directly in the top header next to the credit counter badge.
- Transparent per-generation cost calculation based on model quality (Kling, Seedance, MiniMax, Veo).

### 🤖 4. Multi-Provider AI Architecture
- **Google Gemini Pro & Flash**: Contextual prompt engineering co-pilot, multi-scene viral scriptwriting, and high-retention hook generation.
- **Google Imagen 3 (`imagen-3.0-generate-002`)**: High-resolution image synthesis with zero third-party subscription requirements.
- **Replicate API Integration**: Video synthesis with Minimax Video-01, Wan 2.1, and CogVideoX; image generation with FLUX.1 [schnell].
- **Fal.ai Integration**: Ultra-fast Kling Video (v1.6) and FLUX Pro pipelines.
- **Intelligent Local Fallback**: When API keys are not supplied, the studio runs an intelligent semantic video synthesis engine, ensuring uninterrupted creative workflows.

### 🎥 5. 4K Video Player & Studio Library
- Embedded high-definition video player (`VideoVisualPlayer`) with:
  - Play / Pause toggles & timeline scrubbing
  - Volume control with mute toggle
  - Fullscreen expansion
  - Loop playback
  - 1-Click direct MP4/asset downloading
- Project library with search, filtering, offline caching, and tag management.

### 👥 6. Real-Time Collaboration & Productivity Suite
- **Live Collaboration Rooms**: Add comments, timecode-stamped notes, and see active collaborators.
- **Content Calendar**: Schedule video releases across YouTube Shorts, TikTok, and Instagram Reels.
- **Role-Based Access Control (RBAC)**: Switch between Owner, Admin, Creator, and Reviewer modes with Two-Factor Authentication (2FA) toggles.
- **Encrypted Local Backup**: Export and import complete workspace states, templates, and project metadata as AES-ready JSON packages.

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- `npm` or `pnpm`

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd video_generator_website_new
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root (or copy from `.env.example`):
```bash
cp .env.example .env
```

Configure your preferred API keys in `.env`:
```env
PORT=3000

# Recommended: Google Gemini & Imagen 3 (Free tier available)
GEMINI_API_KEY="your-google-ai-studio-api-key"

# Optional: Universal Video Generation
REPLICATE_API_TOKEN="your-replicate-api-token"
FAL_KEY="your-fal-ai-key"
ELEVENLABS_API_KEY="your-elevenlabs-key"
```

> **Note**: Even with only a Google AI Studio key, NovaGen Studio provides full prompt building, scriptwriting, and high-resolution visual generation.

### 3. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Reference

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/generate/video` | `POST` | Launches video generation job with model, prompt, format, and aspect ratio |
| `/api/generate/status/:jobId` | `GET` | Polls progress and retrieves completed video `resultUrl` |
| `/api/generate/image` | `POST` | Generates 4K images via Google Imagen 3 or FLUX.1 |
| `/api/generate/tts` | `POST` | Synthesizes voiceovers with Google Gemini TTS or ElevenLabs |
| `/api/gemini/prompt-builder` | `POST` | AI prompt co-pilot optimizing for retention, camera angles, and model specs |
| `/api/gemini/scriptwriter` | `POST` | Generates multi-scene structured viral scripts with hooks and voiceover cues |
| `/api/config/keys` | `GET/POST`| Manages and retrieves masked API provider credentials at runtime |

---

## ⌨️ Shortcuts & Voice Commands

- **`⌘K` / `Ctrl+K`**: Open global command & feature search.
- **Voice Commands** (Click the Mic button in the header):
  - *"Go to Shorts"* / *"Open Studio"* ➔ Navigates to Shorts Studio
  - *"Toggle Dark Mode"* / *"Light Mode"* ➔ Switches theme
  - *"Open Projects"* ➔ Opens project library
  - *"Prompt Builder"* ➔ Opens AI Co-Pilot drawer
  - *"Upgrade"* ➔ Opens subscription & credit panel

---

## 📄 License
This project is open-source and intended for creative content generation.
