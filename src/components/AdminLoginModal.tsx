import React, { useState } from 'react';
import { Lock, Mail, Shield, X, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onOpenSupabaseModal?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onOpenSupabaseModal,
}) => {
  const [email, setEmail] = useState('teammisshkusa@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await onLogin(email, password);
    setLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Invalid admin password. Default password is admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-zinc-900 border border-purple-500/30 rounded-3xl max-w-md w-full p-8 relative shadow-[0_0_50px_rgba(139,92,246,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-pink-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Admin CMS Portal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Authenticate to manage portfolio content & inquiries
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (default: admin123)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg transition duration-300 disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>

          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
              <span>Default Key:</span>
              <span className="text-pink-400 font-bold">admin123</span>
            </div>

            <button
              type="button"
              onClick={async () => {
                setEmail('teammisshkusa@gmail.com');
                setPassword('admin123');
                setLoading(true);
                const success = await onLogin('teammisshkusa@gmail.com', 'admin123');
                setLoading(false);
                if (success) onClose();
              }}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <span>⚡ 1-Click Instant Admin Access</span>
            </button>

            {onOpenSupabaseModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupabaseModal();
                }}
                className="w-full py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <span>⚡ Need to Connect Supabase Database?</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
