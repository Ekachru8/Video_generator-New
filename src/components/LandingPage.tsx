import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Play, Star, CheckCircle2, Video, FileText, Zap, ChevronRight, Menu, X, ArrowUpRight } from 'lucide-react';
import { Background3D } from './Background3D';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigateToApp = () => setActiveTab('home');

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#f8f9fc] dark:bg-[#060810] text-neutral-900 dark:text-neutral-100 font-sans relative selection:bg-blue-500/30">
      
      {/* Background Graphic (Subtle mesh) */}
      <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-blue-400/5 to-transparent dark:from-blue-600/20 dark:via-blue-900/10 blur-3xl opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Everygen</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Features</a>
          <a href="#models" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Models</a>
          <a href="#pricing" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={navigateToApp} className="px-4 py-2 text-sm font-semibold hover:text-blue-600 transition-colors">
            Log in
          </button>
          <button onClick={navigateToApp} className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
            Get started
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-[#060810] pt-20 px-6 flex flex-col gap-6 md:hidden">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold">Features</a>
          <a href="#models" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold">Models</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold">Pricing</a>
          <hr className="border-neutral-200 dark:border-neutral-800" />
          <button onClick={navigateToApp} className="w-full py-4 rounded-xl bg-blue-600 text-white text-lg font-bold">Get started</button>
        </div>
      )}

      <main className="relative z-10 pt-16 md:pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/50 dark:border-blue-800/50">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Seedance 2.5 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.1]">
            Turn a quick idea into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">scroll-stopping post</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-balance">
            Create stunning AI videos for YouTube Shorts, UGC, and ads. The only studio you need to prompt, generate, and publish—all in one place.
          </p>

          <div className="pt-6">
            <button 
              onClick={navigateToApp}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              Start creating for free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-10 flex items-center justify-center gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-neutral-900" />
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
              <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-white dark:border-neutral-900" />
            </div>
            Trusted by creators with 2.4B+ views
          </div>
        </section>

        {/* DEMO / CREATION PREVIEW */}
        <section className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800 p-2 shadow-2xl overflow-hidden">
            <div className="aspect-video bg-neutral-100 dark:bg-black rounded-2xl relative overflow-hidden group">
              <video 
                src="/videos/cyberpunk-city.mp4" 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              {/* Fake UI Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl max-w-sm">
                  <p className="text-white text-sm font-medium line-clamp-2">"A cinematic high angle sequence of a futuristic cyber city at dusk, flying cars, neon lights, 4k volumetric lighting"</p>
                </div>
                <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Generating...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVERY AI TOOL YOU NEED (FEATURES) */}
        <section id="features" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Every AI tool you need, <br/><span className="text-blue-600">in one place</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Video Generator",
                desc: "Generate AI videos without watermarks, ready to post using Kling, Seedance, and Minimax.",
                icon: <Video className="w-6 h-6 text-blue-600" />,
                bg: "bg-blue-50 dark:bg-blue-900/20"
              },
              {
                title: "Marketing Studio",
                desc: "The all-in-one studio for creating and cloning winning ads. Remix proven winners with high CTR hooks.",
                icon: <Zap className="w-6 h-6 text-pink-600" />,
                bg: "bg-pink-50 dark:bg-pink-900/20"
              },
              {
                title: "Shorts Studio",
                desc: "Turn a proven short-form format into your own video. Featuring 13+ viral formats ready to use.",
                icon: <Play className="w-6 h-6 text-emerald-600" />,
                bg: "bg-emerald-50 dark:bg-emerald-900/20"
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">{f.desc}</p>
                <button onClick={navigateToApp} className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try it out <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white dark:bg-[#0a0b14] rounded-[3rem] p-8 md:p-16 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">From an idea to a fully rendered post in three simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
            {[
              { step: 1, title: "Choose a format", desc: "Select a viral template, format, or start entirely from scratch." },
              { step: 2, title: "Write your prompt", desc: "Use our AI prompt enhancer to add cinematic details and camera movements automatically." },
              { step: 3, title: "Render & Download", desc: "Everygen routes your prompt to the best available model (Kling, Seedance, Runway) in seconds." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white dark:bg-[#0a0b14] border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SUPPORTED MODELS */}
        <section id="models" className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Access the world's best <br/>video models.</h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                No need to manage multiple subscriptions. Everygen integrates directly with your API keys to bring you the cutting edge of AI generation.
              </p>
            </div>
            <button onClick={navigateToApp} className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold transition-colors">
              View all models
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Seedance 2.5", desc: "Cinematic motion", badge: "NEW" },
              { name: "Kling 3.0", desc: "Physical accuracy", badge: "POPULAR" },
              { name: "Runway Gen-3", desc: "High fidelity", badge: "PRO" },
              { name: "Minimax H3", desc: "Fluid dynamics", badge: "" }
            ].map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  {m.badge && <span className="text-[9px] font-bold tracking-widest px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded uppercase">{m.badge}</span>}
                </div>
                <h4 className="font-bold text-lg mb-1">{m.name}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        
        {/* PRICING */}
        <section id="pricing" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="text-neutral-500 dark:text-neutral-400">Join thousands of creators upgrading their content.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$19',
                desc: 'Ideal for casual creators exploring AI viral shorts.',
                features: ['500 monthly credits', 'Access to Kling 3.0 & Seedance 2', '1080p export resolution', 'Standard generation queue'],
                popular: false
              },
              {
                name: 'Creator Pro',
                price: '$49',
                desc: 'For active creators generating weekly viral content.',
                features: ['2,000 monthly credits', 'All models including Veo 3.1', 'Ultra HD 4K rendering', 'Priority supercomputer queue'],
                popular: true
              },
              {
                name: 'Pro Team',
                price: '$99',
                desc: 'Built for agencies and production teams.',
                features: ['5,000 monthly credits', 'Multi-user collaboration', 'Custom format creation', 'Automated calendar sync'],
                popular: false
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl bg-white dark:bg-neutral-900 border ${plan.popular ? 'border-blue-500 shadow-xl' : 'border-neutral-200 dark:border-neutral-800'} flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Most Popular</span>}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 min-h-[40px]">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={navigateToApp} className={`w-full py-3 rounded-full font-bold transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do the API keys work?', a: 'Everygen integrates directly with your existing API keys for providers like Replicate, Fal.ai, Runway, and ElevenLabs. This means you only pay the base API cost per generation without any markup.' },
              { q: 'Are the videos watermarked?', a: 'No, all videos generated through Everygen on paid tiers are 100% watermark-free and cleared for commercial use on YouTube Shorts, TikTok, and Instagram Reels.' },
              { q: 'What is the maximum resolution?', a: 'Depending on the model you select, you can generate up to Ultra HD 4K (using Pro models) or standard 1080p for faster generation.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-neutral-500 dark:text-neutral-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden rounded-[3rem] bg-blue-600 text-white p-12 md:p-20 text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-70" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-70" />
          
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to create?</h2>
            <p className="text-blue-100 text-lg md:text-xl">Join thousands of creators building the next generation of social media content.</p>
            <button 
              onClick={navigateToApp}
              className="px-8 py-4 rounded-full bg-white text-blue-600 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
            >
              Open Everygen Studio
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#060810] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <Video className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold">Everygen</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              The AI video studio for creators and marketers. Turn ideas into engaging content instantly.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Product</h5>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><button onClick={navigateToApp} className="hover:text-neutral-900 dark:hover:text-white">Studio</button></li>
              <li><a href="#models" className="hover:text-neutral-900 dark:hover:text-white">AI Models</a></li>
              <li><a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">Prompt Guide</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">API Reference</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Company</h5>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} Everygen (formerly Viewmax). All rights reserved.
        </div>
      </footer>
    </div>
  );
};
