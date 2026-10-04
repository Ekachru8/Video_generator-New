import React from 'react';

export const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* 1. Luminous 3D Aurora Glow Spheres (Theme-adaptive) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[100px] animate-aurora-slow" />
      <div className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-purple-500/10 dark:bg-purple-600/18 blur-[120px] animate-aurora-delayed" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-700/15 blur-[130px] animate-aurora-reverse" />
      <div className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-emerald-500/8 dark:bg-teal-500/12 blur-[90px] animate-aurora-slow" />

      {/* 2. 3D Isometric Horizon Grid in Perspective */}
      <div 
        style={{
          perspective: '800px',
          perspectiveOrigin: '50% 0%'
        }}
        className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none"
      >
        <div
          style={{
            transform: 'rotateX(75deg) translateZ(0)',
            transformOrigin: '50% 100%'
          }}
          className="absolute inset-0 w-full h-[200%] bg-3d-grid"
        />
        {/* Soft fade out to horizon */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[var(--page-base)]" />
      </div>

      {/* 3. Subtle ambient light beam from top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-radial from-blue-500/12 via-blue-500/3 to-transparent blur-2xl" />
    </div>
  );
};
