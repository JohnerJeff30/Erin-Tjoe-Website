import React, { useState } from 'react';
import {
  X,
  Trophy,
  Shield,
  FileText,
  Copy,
  Check,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ExternalLink,
  Target,
  Clock,
  Disc,
} from 'lucide-react';
import { PickleballProfile, RiderPhoto } from '../types';

interface PickleballEPKModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PickleballProfile;
  onSwitchToMusicEPK?: () => void;
}

export const PickleballEPKModal: React.FC<PickleballEPKModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSwitchToMusicEPK,
}) => {
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState<RiderPhoto | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    const lines = [
      `=== ${profile.name} - PRO PICKLEBALL ATHLETE EPK & TOURNAMENT RIDER ===`,
      `Official Sponsor: ${profile.sponsor}`,
      `Title: ${profile.title}`,
      `Paddle: ${profile.paddleWeapon}`,
      `Base: ${profile.hometown}`,
      '',
      '--- TOURNAMENT COURT TECHNICAL REQUIREMENTS ---',
      ...(profile.tournamentRider || []).map((req, i) => `${i + 1}. ${req}`),
      '',
      '--- HOSPITALITY & PLAYER REQUIREMENTS ---',
      ...(profile.hospitalityNotes || []).map((note, i) => `* ${note}`),
      '',
      '--- OFFICIAL PADDLE SPECIFICATIONS ---',
      `Model: ${profile.paddleWeapon}`,
      `Court Playing Footprint: ${profile.courtDimensions || '30 ft x 60 ft clear area'}`,
      `Official Ball: ${profile.ballSpecs || 'Franklin X-40 Yellow Outdoor'}`,
      `Net Specs: ${profile.netSpecs || 'USA Pickleball 36" posts, 34" center strap'}`,
      '',
      'Contact for Bookings: teammisshkusa@gmail.com',
    ].join('\n');

    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const lines = [
      `=== ${profile.name} - PRO PICKLEBALL ATHLETE EPK & TOURNAMENT RIDER ===`,
      `Official Sponsor: ${profile.sponsor}`,
      `Title: ${profile.title}`,
      `Paddle: ${profile.paddleWeapon}`,
      `Base: ${profile.hometown}`,
      '',
      '--- TOURNAMENT COURT TECHNICAL REQUIREMENTS ---',
      ...(profile.tournamentRider || []).map((req, i) => `${i + 1}. ${req}`),
      '',
      '--- HOSPITALITY & PLAYER REQUIREMENTS ---',
      ...(profile.hospitalityNotes || []).map((note, i) => `* ${note}`),
      '',
      '--- CLINIC & EXHIBITION FORMATS ---',
      ...(profile.formats || []).map((f) => `- ${f.title} (${f.duration || 'Flexible'}): ${f.description}`),
      '',
      'Booking & Inquiries: teammisshkusa@gmail.com',
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Pickleball_Rider.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Ribbon Header */}
        <div className="relative bg-gradient-to-r from-amber-950 via-zinc-900 to-black p-6 sm:p-8 border-b border-amber-500/20">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pickleball Athlete EPK</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-slate-300 border border-white/10">
                  {profile.rankingBadge || '#01 COMPETITIVE'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                {profile.name} • Tournament & Exhibition Rider
              </h2>
              <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                Official DadGum Paddles Sponsored Pro Rider • Court Dimensions & Hospitality Specs
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher if onSwitchToMusicEPK provided */}
          {onSwitchToMusicEPK && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={onSwitchToMusicEPK}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <Disc className="w-3.5 h-3.5 text-pink-400" />
                  <span>Music & DJ EPK</span>
                </button>
                <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Pickleball Pro EPK</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copied ? 'Copied' : 'Copy Specs'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          {/* Athlete Fast Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/50 border border-white/5">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Official Sponsor</span>
              <span className="text-xs font-bold text-amber-400">{profile.sponsor}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Paddle Weapon</span>
              <span className="text-xs font-medium text-slate-200 truncate block">{profile.paddleWeapon}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Division / Stance</span>
              <span className="text-xs font-medium text-slate-200">Right Hand / Mixed & Gender</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Home Base</span>
              <span className="text-xs font-medium text-slate-200">{profile.hometown}</span>
            </div>
          </div>

          {/* Section 1: Tournament Court Technical Rider */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg border-b border-white/10 pb-2">
              <Shield className="w-5 h-5" />
              <h3>TOURNAMENT COURT TECHNICAL SPECIFICATIONS</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {(profile.tournamentRider || []).map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Court Layout & Ball Specifications */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Court Dimensions & Official Ball Standards</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Playing Footprint</span>
                <p className="text-slate-200 mt-0.5">{profile.courtDimensions || '30 ft x 60 ft recommended'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Ball Specification</span>
                <p className="text-slate-200 mt-0.5">{profile.ballSpecs || 'Franklin X-40 Yellow Outdoor'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Net Specifications</span>
                <p className="text-slate-200 mt-0.5">{profile.netSpecs || '36" at posts, 34" at center strap'}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Hospitality & Athlete Care */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-400 font-serif font-bold text-lg border-b border-white/10 pb-2">
              <Sparkles className="w-5 h-5" />
              <h3>HOSPITALITY, RECOVERY & EVENT STAGING</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {(profile.hospitalityNotes || []).map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-amber-400 font-bold text-base leading-none">•</span>
                  <span className="leading-relaxed">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Visual Staging & Card Gallery */}
          {profile.riderPhotos && profile.riderPhotos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-white font-serif font-bold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>SETUP & ATHLETE PHOTO REFERENCES</span>
                </h3>
                <span className="text-xs text-slate-400">Click to expand</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.riderPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhoto(photo)}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black cursor-pointer hover:border-amber-400/50 transition duration-300"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                      <img
                        src={photo.url}
                        alt={photo.title || 'Setup reference'}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                        {photo.title}
                      </h4>
                      {photo.caption && (
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{photo.caption}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-6 bg-black/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Official DadGum Paddles Athlete Spec • Updated 2026 Season
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-amber-950/40"
            >
              Inquire to Book Clinic / Exhibition
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold uppercase tracking-wider transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Full Size Photo Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhoto.url}
              alt={activePhoto.title || 'Setup reference'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-amber-400/30 shadow-2xl"
            />
            <div className="mt-3 text-center">
              <h4 className="text-sm font-bold text-white">{activePhoto.title}</h4>
              {activePhoto.caption && <p className="text-xs text-slate-300 mt-1">{activePhoto.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
