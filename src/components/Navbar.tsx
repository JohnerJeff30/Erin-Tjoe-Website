import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Calendar, Disc, Sparkles, Trophy, FileText, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onOpenMusicEPK?: () => void;
  onOpenPickleballEPK?: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isAdminLoggedIn,
  onOpenMusicEPK,
  onOpenPickleballEPK,
  onOpenSupabaseModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'EPK & Riders', href: '#epk-riders', badge: 'RIDER' },
    { name: 'Pickleball Pro', href: '#pickleball', badge: 'PRO' },
    { name: 'Experience', href: '#experience' },
    { name: 'Music', href: '#music' },
    { name: 'Videos', href: '#videos' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-purple-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.15)] py-3'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-300 p-[1.5px] transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.25em] text-amber-400 uppercase font-semibold">
              MISS HONG KONG USA
            </span>
            <span className="text-xl font-bold tracking-wider text-white font-serif">
              ERIN TJOE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-pink-400 transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dual EPK Quick Access */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
            {onOpenMusicEPK && (
              <button
                type="button"
                onClick={onOpenMusicEPK}
                className="px-3 py-1 rounded-full text-[11px] font-semibold text-pink-300 hover:text-white hover:bg-pink-950/60 transition flex items-center gap-1"
                title="Open Music Technical Rider & EPK"
              >
                <FileText className="w-3 h-3 text-pink-400" />
                <span>Music EPK</span>
              </button>
            )}
            {onOpenPickleballEPK && (
              <button
                type="button"
                onClick={onOpenPickleballEPK}
                className="px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 hover:text-white hover:bg-amber-950/60 transition flex items-center gap-1"
                title="Open Pickleball Athlete Rider & EPK"
              >
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>Pickleball EPK</span>
              </button>
            )}
          </div>

          {onOpenSupabaseModal && (
            <button
              type="button"
              onClick={onOpenSupabaseModal}
              className="px-3 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-950/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              title="Connect Website to Supabase Database"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Supabase</span>
            </button>
          )}

          <a
            href="#booking"
            className="px-5 py-2.5 text-xs tracking-wider uppercase font-semibold rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300 flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Erin</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className={`px-3 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
              isAdminLoggedIn
                ? 'bg-purple-950/80 border-purple-400 text-pink-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'border-white/10 text-slate-300 hover:text-white hover:border-white/30 bg-white/5'
            }`}
            title={isAdminLoggedIn ? 'Open Admin CMS' : 'Admin Login'}
          >
            <Shield className="w-3.5 h-3.5 text-pink-400" />
            <span>{isAdminLoggedIn ? 'CMS Active' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="#booking"
            className="px-3.5 py-1.5 text-[10px] tracking-wider uppercase font-semibold rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md flex items-center gap-1.5"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-purple-500/20 px-6 pt-4 pb-8 space-y-4 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-slate-200 hover:text-pink-400 py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              {onOpenMusicEPK && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMusicEPK();
                  }}
                  className="px-3 py-2 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Music EPK</span>
                </button>
              )}
              {onOpenPickleballEPK && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPickleballEPK();
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Pickleball EPK</span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {onOpenSupabaseModal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSupabaseModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>Connect Supabase Database</span>
                </button>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-purple-400 hover:text-purple-300"
                >
                  <Shield className="w-4 h-4" />
                  <span>{isAdminLoggedIn ? 'CMS Dashboard' : 'Admin Portal'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
