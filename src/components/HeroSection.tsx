import React from 'react';
import { Play, Calendar, Disc, Video, Sparkles, ChevronDown } from 'lucide-react';
import { HeroContent } from '../types';

interface HeroSectionProps {
  content: HeroContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] overflow-hidden bg-black flex flex-col items-center justify-center pt-28 pb-16"
    >
      {/* Background Gradient & Glow Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Dark Overlays & Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />
        <div className="absolute inset-0 bg-radial-gradient from-purple-900/15 via-transparent to-black" />
      </div>

      {/* Decorative Light Rays / Glowing Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/15 to-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-400/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-semibold tracking-[0.3em] text-amber-300 uppercase">
            {content.title || 'MISS HONG KONG USA'}
          </span>
        </div>

        {/* Artist Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-serif mb-4 uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-r from-white via-slate-100 to-pink-200 bg-clip-text text-transparent">
            {content.subtitle || 'ERIN TJOE'}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base lg:text-lg font-light tracking-[0.35em] text-pink-300 uppercase mb-8 max-w-2xl font-sans drop-shadow-md">
          {content.tagline || 'GRACE • PURPOSE • IMPACT'}
        </p>

        {/* Description / EPK Pitch */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-10 hidden sm:block">
          A luminous live experience where electronic music meets elegance, joy and purpose. Available for festivals, luxury destinations, corporate events and global stages.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href={content.ctaUrlPrimary || '#booking'}
            className="px-8 py-3.5 text-xs sm:text-sm tracking-widest uppercase font-bold rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>{content.ctaTextPrimary || 'Book Erin'}</span>
          </a>

          <a
            href={content.ctaUrlSecondary || '#music'}
            className="px-7 py-3.5 text-xs sm:text-sm tracking-widest uppercase font-semibold rounded-full bg-black/60 hover:bg-white/10 text-white border border-white/20 hover:border-pink-400 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <Disc className="w-4 h-4 text-pink-400" />
            <span>{content.ctaTextSecondary || 'Listen Now'}</span>
          </a>

          <a
            href="#videos"
            className="px-7 py-3.5 text-xs sm:text-sm tracking-widest uppercase font-semibold rounded-full bg-black/60 hover:bg-white/10 text-white border border-white/20 hover:border-purple-400 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span>Watch Videos</span>
          </a>
        </div>

        {/* Featured Image Under Hero Banner */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative group rounded-3xl overflow-hidden bg-zinc-900/80 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={content.heroImageUrl || '/images/erin_tjoe_live_1785811107295.jpg'}
                alt="Erin Tjoe Live DJ Performance"
                className="w-full h-auto max-h-[540px] object-cover object-center rounded-2xl transition duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase text-left">
                    Live Performance at CRUISE
                  </span>
                </div>
                <span className="text-xs text-pink-300 tracking-widest uppercase font-semibold hidden sm:inline-block">
                  Global Stage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        className="mt-12 text-slate-400 hover:text-white transition-colors duration-300 animate-bounce flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest uppercase opacity-60">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </a>
    </section>
  );
};
