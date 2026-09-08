import React from 'react';
import { Sparkles, Shield, ArrowUp, Zap } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenSupabaseModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-slate-400 border-t border-purple-900/30 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold tracking-[0.3em] text-amber-300 uppercase">
                MISS HONG KONG USA
              </span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-white tracking-wider">
              ERIN TJOE
            </h2>
            <p className="text-xs tracking-[0.25em] text-pink-400 uppercase mt-1">
              GRACE • PURPOSE • IMPACT
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-slate-300 font-semibold">
            <a href="#about" className="hover:text-pink-400 transition">About</a>
            <a href="#epk-riders" className="hover:text-pink-400 transition">EPK Riders</a>
            <a href="#pickleball" className="hover:text-pink-400 transition">Pickleball</a>
            <a href="#experience" className="hover:text-pink-400 transition">Experience</a>
            <a href="#music" className="hover:text-pink-400 transition">Music</a>
            <a href="#videos" className="hover:text-pink-400 transition">Videos</a>
            <a href="#gallery" className="hover:text-pink-400 transition">Gallery</a>
            <a href="#booking" className="hover:text-pink-400 transition">Booking</a>
          </nav>

          {/* Scroll Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-zinc-900 border border-white/10 text-slate-300 hover:text-white hover:border-pink-500 transition shadow-lg"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Credits & Admin trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
          <p>© {new Date().getFullYear()} Erin Tjoe Official. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>California • Available Worldwide</span>
            {onOpenSupabaseModal && (
              <button
                onClick={onOpenSupabaseModal}
                className="hover:text-emerald-400 text-emerald-500/80 flex items-center gap-1 transition"
              >
                <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>Connect Supabase</span>
              </button>
            )}
            <button
              onClick={onOpenAdmin}
              className="hover:text-purple-400 flex items-center gap-1 transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
