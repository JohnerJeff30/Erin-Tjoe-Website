import React, { useState } from 'react';
import { Sparkles, Mic, Disc3, Award, FileText, CheckCircle2, ChevronRight, X, Music, Radio } from 'lucide-react';
import { ArtistProfile } from '../types';

interface AboutSectionProps {
  profile: ArtistProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [riderOpen, setRiderOpen] = useState(false);

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

            {/* Technical Rider Button Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setRiderOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-pink-500/30 text-pink-300 text-xs uppercase tracking-wider font-semibold transition duration-300 shadow-md hover:border-pink-500"
              >
                <FileText className="w-4 h-4" />
                <span>View Technical Rider & Hospitality Notes</span>
                <ChevronRight className="w-4 h-4" />
              </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative text-slate-200 shadow-2xl">
            <button
              onClick={() => setRiderOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <FileText className="w-6 h-6 text-pink-400" />
              <div>
                <h3 className="text-xl font-serif text-white font-bold">
                  Technical Rider & Hospitality Specs
                </h3>
                <p className="text-xs text-slate-400">Erin Tjoe Official Production Requirements</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3">
                  AUDIO & DJ GEAR RIDER
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {(profile.technicalRider || []).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3">
                  HOSPITALITY & SHOW NOTES
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {(profile.hospitalityNotes || []).map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setRiderOpen(false)}
                className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
