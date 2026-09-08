import React, { useState } from 'react';
import {
  Trophy,
  Shield,
  Zap,
  Target,
  Sparkles,
  ExternalLink,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  Maximize2,
  X,
  Award,
} from 'lucide-react';
import { PickleballProfile, WeaponStat, PickleballClinicFormat } from '../types';

interface PickleballSectionProps {
  profile: PickleballProfile;
  onOpenEPK: () => void;
}

export const PickleballSection: React.FC<PickleballSectionProps> = ({ profile, onOpenEPK }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="pickleball" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-amber-500/5 via-transparent to-pink-500/5 blur-3xl pointer-events-none" />

      {/* Decorative Subtle Court Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-amber-950/20">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Dual-Discipline Athlete & Artist</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Pro Pickleball Athlete
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Where musical timing meets court dominance. Sponsored by{' '}
            <span className="text-amber-400 font-semibold">{profile.sponsor || 'DadGum Paddles'}</span>, Erin Tjoe
            brings speed, disguise, and relentless precision to competitive tour events and VIP exhibitions.
          </p>
        </div>

        {/* Core Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Athlete Trading Card Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              {/* Card Holographic Ambient Halo */}
              <div className="absolute -inset-2 bg-gradient-to-b from-amber-500/40 via-yellow-500/20 to-pink-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border-2 border-amber-400/50 shadow-2xl p-3 sm:p-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                      {profile.sponsor || 'DadGum Paddles'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {profile.rankingBadge || '#01 COMPETITIVE'}
                  </span>
                </div>

                {/* Card Portrait Image with Click-to-Expand */}
                <div
                  className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 cursor-pointer group/img"
                  onClick={() => setSelectedImage(profile.cardImageUrl)}
                >
                  <img
                    src={profile.cardImageUrl}
                    alt={`${profile.name} Pro Pickleball Card`}
                    className="w-full h-full object-cover object-top transition duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md text-white/80 hover:text-white border border-white/15 opacity-0 group-hover/img:opacity-100 transition">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Card Corner Accents */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-amber-300/80 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    {profile.hometown || 'California'}
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-white tracking-wide">{profile.name}</h3>
                    <span className="text-xs text-amber-400 font-semibold">Pro Tour</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono tracking-wide">
                    {profile.paddleWeapon || 'DadGum Pro Carbon Elite 16mm'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action under card */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={onOpenEPK}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-950/40 transition transform active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Pickleball Technical Rider & EPK</span>
              </button>
            </div>
          </div>

          {/* Athlete Narrative & Weapons */}
          <div className="lg:col-span-7 space-y-8">
            {/* Athletic Bio Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-md relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Championship Court Presence</h3>
                  <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold">
                    {profile.title || 'Miss Hong Kong USA • Pro Athlete'}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-4">
                {profile.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Official Sponsor:{' '}
                    <strong className="text-white font-semibold">{profile.sponsor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Based in:{' '}
                    <strong className="text-white font-semibold">{profile.hometown}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Tactical Weapons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Signature Court Weapons & Playstyle</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">DINK • DRIVE • RESET</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profile.weapons.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 hover:bg-zinc-900 transition duration-300 space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {w.metric}
                      </span>
                    </div>
                    <h5 className="font-bold text-white text-sm group-hover:text-amber-300 transition">{w.name}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{w.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Formats (Clinics, Exhibitions & Corporate Retreats) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Booking & Event Appearances</span>
                </h4>
                <a
                  href="#booking"
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition"
                >
                  <span>Inquire for Events</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profile.formats.map((fmt) => (
                  <div
                    key={fmt.id}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {fmt.badge || 'Appearance'}
                      </span>
                      {fmt.duration && (
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {fmt.duration}
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-white text-xs">{fmt.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">{fmt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dual Discipline Callout: The Sound & The Serve */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950/30 via-zinc-900 to-purple-950/30 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              Unique Entertainment Experience
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Combine Live Music Sets with Pro Pickleball Clinics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Ideal for luxury brand retreats, celebrity tournaments, festival pop-ups, and country clubs. Offer your
              guests a pro-level clinic or exhibition match during the day, followed by an electrifying sunset DJ + live
              vocal performance at night.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenEPK}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Pickleball Rider</span>
            </button>
            <a
              href="#booking"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 transition transform active:scale-95"
            >
              Book Dual Engagement
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Card Zoom */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded Preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-amber-400/40 shadow-2xl"
            />
            <p className="text-center text-xs text-amber-300 font-mono mt-3">
              Official Athlete Profile Card • Sponsored by DadGum Paddles
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
