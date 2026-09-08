import React, { useState } from 'react';
import {
  FileText,
  Trophy,
  Check,
  Copy,
  ChevronRight,
  ExternalLink,
  Shield,
  Sparkles,
  Zap,
  Clock,
  MapPin,
  Volume2,
  Calendar,
  Maximize2,
  X,
  Radio,
  Disc3,
  Award,
} from 'lucide-react';
import { ArtistProfile, PickleballProfile, RiderPhoto } from '../types';

interface DualEPKRidersSectionProps {
  artistProfile: ArtistProfile;
  pickleballProfile: PickleballProfile;
  onOpenMusicEPK: () => void;
  onOpenPickleballEPK: () => void;
}

export const DualEPKRidersSection: React.FC<DualEPKRidersSectionProps> = ({
  artistProfile,
  pickleballProfile,
  onOpenMusicEPK,
  onOpenPickleballEPK,
}) => {
  const [activeTab, setActiveTab] = useState<'music' | 'pickleball'>('music');
  const [copiedMusic, setCopiedMusic] = useState(false);
  const [copiedPickleball, setCopiedPickleball] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<RiderPhoto | null>(null);

  const handleCopyMusicRider = () => {
    const text = [
      `=== ${artistProfile.name} - Official Technical Rider & Hospitality Specs ===`,
      artistProfile.riderIntro || 'Production specifications and staging requirements.',
      '',
      '--- AUDIO & DJ EQUIPMENT SPECIFICATIONS ---',
      ...(artistProfile.technicalRider || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      '--- GREEN ROOM & ARTIST HOSPITALITY ---',
      ...(artistProfile.hospitalityNotes || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      artistProfile.stageDimensions ? `STAGE FOOTPRINT: ${artistProfile.stageDimensions}` : '',
      artistProfile.powerRequirements ? `POWER REQUIREMENTS: ${artistProfile.powerRequirements}` : '',
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedMusic(true);
      setTimeout(() => setCopiedMusic(false), 2500);
    });
  };

  const handleCopyPickleballRider = () => {
    const text = [
      `=== ${pickleballProfile.name} - Pro Pickleball Athlete & Tournament Rider ===`,
      pickleballProfile.bio || 'Official tournament and clinic requirements.',
      '',
      '--- TOURNAMENT COURT & FACILITY CONDITIONS ---',
      ...(pickleballProfile.tournamentRider || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      '--- PLAYER HOSPITALITY & ATHLETE REST LOUNGE ---',
      ...(pickleballProfile.hospitalityNotes || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      `PADDLE: ${pickleballProfile.paddleWeapon || 'DadGum Pro Carbon Elite 16mm'}`,
      `COURT DIMENSIONS: ${pickleballProfile.courtDimensions || '30 ft x 60 ft minimum'}`,
      `APPROVED BALLS: ${pickleballProfile.ballSpecs || 'Franklin X-40 Yellow Outdoor'}`,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedPickleball(true);
      setTimeout(() => setCopiedPickleball(false), 2500);
    });
  };

  return (
    <section id="epk-riders" className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black text-slate-100 overflow-hidden border-t border-purple-900/30">
      {/* Dynamic Background Atmospheric Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-pink-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-300 mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Dual-Discipline Production & Athlete Riders</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Official EPK & Riders
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Verified production staging specifications for music festival promoters, and official tournament conditions for professional pickleball events & VIP clinics.
          </p>
        </div>

        {/* Master Tab Bar Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'music'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-pink-300" />
              <span>Music EPK & Tech Rider</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-pink-950/60 text-pink-200 border border-pink-500/30 text-[10px]">
                DJ & Vocals
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pickleball')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'pickleball'
                  ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Pickleball EPK & Rider</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-200 border border-amber-500/30 text-[10px]">
                DadGum Pro
              </span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: MUSIC EPK & TECHNICAL RIDER ================= */}
        {activeTab === 'music' && (
          <div className="bg-zinc-900/70 border border-pink-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-10 animate-in fade-in">
            {/* Header & Quick Action Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-mono font-semibold">
                    MUSIC PRODUCTION SPECIFICATIONS
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{artistProfile.baseLocation || 'California • Worldwide'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {artistProfile.riderTitle || 'Live Vocal & DJ Technical Rider'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  {artistProfile.riderIntro || 'Stage engineering requirements for headline festivals, private luxury events, and cruise mainstages.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyMusicRider}
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-200 transition flex items-center gap-2"
                >
                  {copiedMusic ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copiedMusic ? 'Copied to Clipboard' : 'Copy Specs'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenMusicEPK}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-950/40 transition flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Full Screen EPK</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-pink-400 uppercase font-mono font-bold">STAGE FOOTPRINT</span>
                <p className="text-sm font-semibold text-white mt-1">{artistProfile.stageDimensions || '8 ft x 6 ft minimum riser'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-purple-400 uppercase font-mono font-bold">POWER DROPS</span>
                <p className="text-sm font-semibold text-white mt-1">{artistProfile.powerRequirements || '2 x 20A dedicated circuits'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold">VOCAL SYSTEM</span>
                <p className="text-sm font-semibold text-white mt-1">Shure Axient / Beta 58A Wireless</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold">DJ CONSOLE</span>
                <p className="text-sm font-semibold text-white mt-1">Pioneer CDJ-3000 (x2) + DJM-A9</p>
              </div>
            </div>

            {/* Rider Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Gear Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-pink-500/20">
                  <Volume2 className="w-4 h-4 text-pink-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-pink-300">
                    Audio, DJ & Staging Specifications
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {(artistProfile.technicalRider || []).map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-pink-500/30 text-xs sm:text-sm text-slate-300 flex items-start gap-3 transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hospitality & Green Room */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-purple-500/20">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                    Hospitality & Green Room Requirements
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {(artistProfile.hospitalityNotes || []).map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 text-xs sm:text-sm text-slate-300 flex items-start gap-3 transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rider Visual Stage Photos */}
            {artistProfile.riderPhotos && artistProfile.riderPhotos.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Production Reference Photos
                  </h4>
                  <span className="text-[11px] text-slate-500">Click to expand</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {artistProfile.riderPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setPreviewPhoto(photo)}
                      className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 aspect-[4/3] cursor-pointer hover:border-pink-500/50 transition duration-300"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-bold text-white truncate">{photo.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">{photo.caption}</p>
                      </div>
                      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: PICKLEBALL PRO EPK & TOURNAMENT RIDER ================= */}
        {activeTab === 'pickleball' && (
          <div className="bg-zinc-900/70 border border-amber-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-10 animate-in fade-in">
            {/* Header & Quick Action Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold">
                    TOURNAMENT ATHLETE SPECIFICATIONS
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-amber-400 font-bold">{pickleballProfile.sponsor || 'DadGum Paddles'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Pro Athlete & Tournament Rider
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Official tournament court specs, player hospitality, exhibition match formats, and VIP clinic parameters.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyPickleballRider}
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-200 transition flex items-center gap-2"
                >
                  {copiedPickleball ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copiedPickleball ? 'Copied to Clipboard' : 'Copy Rider'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenPickleballEPK}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-950/40 transition flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Full Screen Athlete EPK</span>
                </button>
              </div>
            </div>

            {/* Quick Athlete Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold">OFFICIAL SPONSOR</span>
                <p className="text-sm font-semibold text-white mt-1">{pickleballProfile.sponsor || 'DadGum Paddles'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-yellow-400 uppercase font-mono font-bold">PADDLE WEAPON</span>
                <p className="text-sm font-semibold text-white mt-1 truncate">{pickleballProfile.paddleWeapon || 'DadGum Pro Carbon Elite 16mm'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold">APPROVED BALL</span>
                <p className="text-sm font-semibold text-white mt-1 truncate">{pickleballProfile.ballSpecs || 'Franklin X-40 Yellow Outdoor'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold">COMPETITIVE RANK</span>
                <p className="text-sm font-semibold text-white mt-1">{pickleballProfile.rankingBadge || '#01 Right Hand Competitive'}</p>
              </div>
            </div>

            {/* Rider Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tournament Court Requirements */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-500/20">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                    Tournament Court & Facility Specs
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {(pickleballProfile.tournamentRider || []).map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-amber-500/30 text-xs sm:text-sm text-slate-300 flex items-start gap-3 transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Hospitality & Lounge */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-yellow-500/20">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                    Player Hospitality & Amenities
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {(pickleballProfile.hospitalityNotes || []).map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-yellow-500/30 text-xs sm:text-sm text-slate-300 flex items-start gap-3 transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinic & Exhibition Formats */}
            {pickleballProfile.formats && pickleballProfile.formats.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exhibition & Clinic Formats
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pickleballProfile.formats.map((fmt) => (
                    <div
                      key={fmt.id}
                      className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/40 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold uppercase">
                            {fmt.badge || 'Format'}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">{fmt.duration}</span>
                        </div>
                        <h5 className="text-base font-bold text-white mb-2">{fmt.title}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">{fmt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox / Expanded Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white border border-white/10 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={previewPhoto.url}
                alt={previewPhoto.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="pt-4">
              <h4 className="text-lg font-bold text-white">{previewPhoto.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{previewPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
