import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  Disc3,
  FileText,
  CheckCircle2,
  ChevronRight,
  X,
  Radio,
  Image as ImageIcon,
  Zap,
  Copy,
  Check,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { ArtistProfile, RiderPhoto } from '../types';
import { Trophy } from 'lucide-react';

interface AboutSectionProps {
  profile: ArtistProfile;
  isRiderOpen?: boolean;
  onOpenRider?: () => void;
  onCloseRider?: () => void;
  onOpenPickleballEPK?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  isRiderOpen,
  onOpenRider,
  onCloseRider,
  onOpenPickleballEPK,
}) => {
  const [internalRiderOpen, setInternalRiderOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<RiderPhoto | null>(null);
  const [copied, setCopied] = useState(false);

  const riderOpen = isRiderOpen !== undefined ? isRiderOpen : internalRiderOpen;
  const setRiderOpen = (open: boolean) => {
    if (!open && onCloseRider) {
      onCloseRider();
    } else if (open && onOpenRider) {
      onOpenRider();
    } else {
      setInternalRiderOpen(open);
    }
  };

  const handleCopyRider = () => {
    const lines = [
      `=== ${profile.name} - ${profile.riderTitle || 'Technical Rider & Hospitality Specs'} ===`,
      profile.riderIntro || 'Official production specs and staging requirements.',
      '',
      '--- AUDIO & DJ GEAR RIDER ---',
      ...(profile.technicalRider || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      '--- HOSPITALITY & SHOW NOTES ---',
      ...(profile.hospitalityNotes || []).map((item, i) => `${i + 1}. ${item}`),
      '',
      profile.stageDimensions ? `STAGE FOOTPRINT: ${profile.stageDimensions}` : '',
      profile.powerRequirements ? `POWER: ${profile.powerRequirements}` : '',
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="about" className="relative py-24 bg-black text-slate-100 overflow-hidden border-t border-purple-900/20">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-pink-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            ARTIST PROFILE & EPK
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white mt-2">
            Grace, Elegance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Electronic Soul</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Biography & Sound Intention */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Featured Artist Photo */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-full max-w-sm sm:max-w-xs lg:max-w-full">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-400 opacity-40 blur-xl group-hover:opacity-70 transition duration-500" />
              <div className="relative rounded-full overflow-hidden bg-zinc-950 border-2 border-white/20 p-2 shadow-2xl aspect-square">
                <img
                  src={profile.portraitImageUrl || '/images/profile.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

          {/* Artist Profile Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-2 flex flex-wrap items-center gap-3">
                  <span>{profile.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 font-sans font-normal">
                    {profile.baseLocation}
                  </span>
                </h3>
                <p className="text-xs tracking-[0.25em] text-amber-400 font-semibold uppercase">
                  {profile.title}
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold">TITLEHOLDER</p>
                  <p className="text-xs font-bold text-white">Miss Hong Kong USA</p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {profile.bio}
            </p>

            {/* Featured Quote */}
            <blockquote className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-pink-950/20 to-zinc-900 border-l-4 border-pink-500 text-pink-200 italic font-serif text-base shadow-inner">
              "{profile.quote || 'Entertainment with heart, elegance and light.'}"
            </blockquote>

            {/* Signature Elements */}
            <div>
              <h4 className="text-xs tracking-widest text-slate-400 uppercase font-semibold mb-3">
                Signature Performance Elements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(profile.signatureElements || []).map((elem, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{elem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual EPK Technical Rider Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setRiderOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-pink-500/40 text-pink-300 text-xs uppercase tracking-wider font-semibold transition duration-300 shadow-md hover:border-pink-400"
              >
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Music EPK & Technical Rider</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {onOpenPickleballEPK && (
                <button
                  type="button"
                  onClick={onOpenPickleballEPK}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs uppercase tracking-wider font-semibold transition duration-300 shadow-md hover:border-amber-400"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Pickleball Athlete EPK</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Performance Formats Cards */}
        <div className="mt-20">
          <h3 className="text-xl font-serif text-white font-bold mb-8 text-center uppercase tracking-widest">
            Performance Formats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(profile.performanceFormats || []).map((fmt) => (
              <div
                key={fmt.id}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-purple-500/40 transition duration-300 flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition">
                      {fmt.title.includes('VOCALS') ? <Mic className="w-5 h-5" /> : fmt.title.includes('HOST') ? <Radio className="w-5 h-5" /> : <Disc3 className="w-5 h-5" />}
                    </div>
                    {fmt.badge && (
                      <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-pink-950/50 border border-pink-500/30 text-pink-300 font-semibold">
                        {fmt.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 tracking-wide font-serif">
                    {fmt.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {fmt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Rider Modal */}
      {riderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-slate-200 shadow-2xl space-y-6">
            <button
              onClick={() => setRiderOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4 pr-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                    {profile.riderTitle || 'Technical Rider & Hospitality Specs'}
                  </h3>
                  <p className="text-xs text-pink-300 font-medium">
                    {profile.riderIntro || `${profile.name} Official Production & Staging Requirements`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyRider}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition"
                  title="Copy Technical Specs to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied Specs!' : 'Copy Rider Text'}</span>
                </button>
              </div>
            </div>

            {/* EPK Switcher Bar */}
            {onOpenPickleballEPK && (
              <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-xl border border-white/10">
                <span className="px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Music & Vocal EPK</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRiderOpen(false);
                    onOpenPickleballEPK();
                  }}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition hover:bg-white/5"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch to Pickleball EPK</span>
                </button>
              </div>
            )}

            {/* Stage & Power Highlights */}
            {(profile.stageDimensions || profile.powerRequirements) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-xs">
                {profile.stageDimensions && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Sliders className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong className="text-white">Footprint:</strong> {profile.stageDimensions}</span>
                  </div>
                )}
                {profile.powerRequirements && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong className="text-white">Power:</strong> {profile.powerRequirements}</span>
                  </div>
                )}
              </div>
            )}

            {/* Rider Photos & Staging References */}
            {profile.riderPhotos && profile.riderPhotos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>STAGE & SETUP PHOTO REFERENCES</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">Click photo to enlarge</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {profile.riderPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setActivePhoto(photo)}
                      className="group relative cursor-pointer rounded-xl overflow-hidden bg-black border border-white/10 hover:border-pink-500/50 transition duration-300 shadow-md flex flex-col"
                    >
                      <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-zinc-950">
                        <img
                          src={photo.url}
                          alt={photo.title || 'Rider setup reference'}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <div className="p-2 rounded-full bg-black/70 text-white backdrop-blur-sm">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950/90 text-left">
                        <p className="text-xs font-bold text-white truncate">
                          {photo.title || 'Stage Setup'}
                        </p>
                        {photo.caption && (
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio & DJ Gear Rider */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Disc3 className="w-4 h-4 text-pink-400" />
                  <span>AUDIO & DJ GEAR RIDER</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {(profile.technicalRider || []).map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hospitality & Show Notes */}
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>HOSPITALITY & GREEN ROOM NOTES</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {(profile.hospitalityNotes || []).map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <p className="text-[11px] text-slate-400">
                All production requirements can be adapted upon agreement with production team.
              </p>
              <button
                onClick={() => setRiderOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shrink-0"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Photo Zoom Viewer */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-200 hover:text-white rounded-full bg-black/60 backdrop-blur-md border border-white/20"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.title || 'Rider preview'}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-zinc-900 border-t border-white/10">
              <h4 className="text-base font-bold text-white">
                {activePhoto.title || 'Stage & Equipment Setup'}
              </h4>
              {activePhoto.caption && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
