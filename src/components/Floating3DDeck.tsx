import React, { useState } from 'react';
import { Sparkles, Play } from 'lucide-react';

interface DeckCard {
  id: string;
  name: string;
  category: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  badge: string;
  imageUrl?: string;
  videoUrl?: string;
  previewPrompt: string;
}

interface Floating3DDeckProps {
  onSelect?: (formatName: string, prompt: string) => void;
  className?: string;
}

export const Floating3DDeck: React.FC<Floating3DDeckProps> = ({
  onSelect,
  className = ''
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards: DeckCard[] = [
    {
      id: 'ai-court',
      name: 'AI Court',
      category: 'Drama',
      bgGradient: 'from-amber-950 via-stone-900 to-amber-900',
      borderColor: 'border-amber-700/60',
      textColor: 'text-amber-200',
      badge: 'VIRAL',
      videoUrl: '/videos/animation-clip.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
      previewPrompt: 'A tiny garden gnome in an orange prison jumpsuit on trial in high-stakes court, photorealistic 4K cinematic lighting'
    },
    {
      id: 'disney',
      name: 'Disney 3D',
      category: 'Animation',
      bgGradient: 'from-sky-950 via-blue-900 to-indigo-950',
      borderColor: 'border-sky-600/70',
      textColor: 'text-sky-200',
      badge: 'TOP 1%',
      videoUrl: '/videos/animation-clip.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
      previewPrompt: 'A Pixar-style baby golden retriever puppy looking adorably at a giant mint chocolate chip ice cream cone, 3D animated octane render'
    },
    {
      id: 'gta',
      name: 'GTA 6',
      category: 'Ultra Real',
      bgGradient: 'from-purple-950 via-fuchsia-900 to-indigo-900',
      borderColor: 'border-fuchsia-500',
      textColor: 'text-white',
      badge: 'TRENDING #1',
      videoUrl: '/videos/urban-car-drive.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80',
      previewPrompt: 'Photorealistic GTA 6 high-speed neon sunset highway pursuit with wet asphalt reflections and dynamic chase cam'
    },
    {
      id: 'anime',
      name: 'Anime',
      category: 'Sakuga',
      bgGradient: 'from-violet-950 via-indigo-950 to-blue-950',
      borderColor: 'border-indigo-600/70',
      textColor: 'text-indigo-200',
      badge: 'EPIC',
      videoUrl: '/videos/cinematic-fantasy.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
      previewPrompt: 'Anime warrior striking an elemental lightning sword through a raging blizzard, 4K Ufotable-level sakuga animation'
    },
    {
      id: 'press',
      name: '500-Ton Press',
      category: 'Satisfying',
      bgGradient: 'from-stone-900 via-neutral-900 to-zinc-950',
      borderColor: 'border-zinc-700/70',
      textColor: 'text-zinc-200',
      badge: 'HIGH CTR',
      videoUrl: '/videos/urban-car-drive.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=400&auto=format&fit=crop&q=80',
      previewPrompt: 'Slow-motion macro shot of an industrial 500-ton hydraulic press crushing a ceramic piggy bank full of gold coins with high-speed sparks'
    }
  ];

  // Calculate fan transforms
  const getCardTransform = (index: number, cardId: string) => {
    const isHovered = hoveredCard === cardId;
    const offset = index - 2; // -2, -1, 0, 1, 2 (center is 0, GTA 6)

    // Base fanned positions
    const baseRotZ = offset * 9; // -18, -9, 0, 9, 18
    const baseRotY = offset * 6; // subtle 3D curve
    const baseTransX = offset * 42; // spread cards horizontally
    const baseTransY = Math.abs(offset) * 6; // curved arc
    const baseTransZ = -Math.abs(offset) * 20; // center card sits on top in 3D

    if (isHovered) {
      return `translate3d(${baseTransX * 1.25}px, -18px, 60px) rotateZ(0deg) rotateY(0deg) scale(1.15)`;
    }

    if (hoveredCard) {
      // Sibling cards fan out a bit more when one card is hovered
      const extraPush = offset < (cards.findIndex(c => c.id === hoveredCard) - 2) ? -16 : 16;
      return `translate3d(${baseTransX + extraPush}px, ${baseTransY + 4}px, ${baseTransZ - 20}px) rotateZ(${baseRotZ * 1.1}deg) rotateY(${baseRotY}deg) scale(0.95)`;
    }

    return `translate3d(${baseTransX}px, ${baseTransY}px, ${baseTransZ}px) rotateZ(${baseRotZ}deg) rotateY(${baseRotY}deg) scale(1)`;
  };

  return (
    <div
      style={{ perspective: '1200px' }}
      className={`relative h-36 w-full max-w-md mx-auto flex items-center justify-center select-none py-2 ${className}`}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg)'
        }}
        className="relative w-28 h-36 flex items-center justify-center animate-deck-float"
      >
        {cards.map((card, idx) => {
          const isCenter = idx === 2;
          const isHovered = hoveredCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onSelect && onSelect(card.name, card.previewPrompt)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: getCardTransform(idx, card.id),
                transformStyle: 'preserve-3d',
                zIndex: isHovered ? 50 : 20 - Math.abs(idx - 2) * 5
              }}
              className={`absolute top-0 w-24 h-36 rounded-2xl p-2 cursor-pointer shadow-xl border transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden bg-gradient-to-b ${card.bgGradient} ${card.borderColor} ${
                isCenter && !hoveredCard ? 'ring-2 ring-purple-500/50 shadow-purple-500/20 shadow-2xl' : ''
              }`}
            >
              {/* Live Looping Video Background */}
              {card.videoUrl ? (
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <video
                    src={card.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-110 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25" />
                </div>
              ) : card.imageUrl ? (
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover object-center scale-110 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
              ) : null}

              {/* 3D Specular Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />

              {/* Top Card Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs shadow-xs">
                  {card.badge}
                </span>
                {isHovered && (
                  <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[8px] animate-pulse">
                    <Play className="w-2.5 h-2.5 fill-black" />
                  </span>
                )}
              </div>

              {/* Bottom Card Title & Format */}
              <div className="z-10 mt-auto">
                <div className="text-[10px] text-white/70 font-semibold leading-none mb-0.5">
                  {card.category}
                </div>
                <div className={`text-xs font-black truncate tracking-tight drop-shadow-md ${card.textColor}`}>
                  {card.name}
                </div>
              </div>

              {/* Interactive Hover Glow Halo */}
              {isHovered && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/60 pointer-events-none animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
