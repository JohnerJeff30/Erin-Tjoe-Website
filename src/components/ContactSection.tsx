import React from 'react';
import { Mail, Instagram, Facebook, Youtube, Music, Disc, Globe, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactSectionProps {
  contact: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            REPRESENTATION & OFFICIAL CHANNELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Direct management inquiries, social media channels, and music streaming hubs.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Direct Email & Management */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-pink-400 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white mb-2">
                Management & Inquiries
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
                For booking availability, press kits, brand partnerships, and event hosting:
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${contact.bookingEmail}`}
                className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-pink-300 hover:text-white flex items-center justify-between hover:border-pink-500/50 transition"
              >
                <span>{contact.bookingEmail}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold px-1">
                <MapPin className="w-4 h-4" />
                <span>{contact.baseLocation}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Social Media Hub */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-950/60 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white mb-2">
                Official Socials
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
                Follow Erin Tjoe for backstage footage, tournament appearances, and upcoming tour dates:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-pink-500/50 text-xs text-slate-200 hover:text-white flex items-center gap-2 transition"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-blue-500/50 text-xs text-slate-200 hover:text-white flex items-center gap-2 transition"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>
              <a
                href={contact.tiktok}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-white flex items-center gap-2 transition"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>TikTok</span>
              </a>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 text-xs text-slate-200 hover:text-white flex items-center gap-2 transition"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Card 3: Music Streaming Channels */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-6">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white mb-2">
                Streaming Platforms
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
                Stream original tracks, live mixes, and radio broadcasts on all major DSPs:
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={contact.spotify}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-white flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-emerald-400" />
                  <span>Spotify Artist Profile</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={contact.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-rose-500/50 text-xs text-slate-200 hover:text-white flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-rose-400" />
                  <span>Apple Music</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
