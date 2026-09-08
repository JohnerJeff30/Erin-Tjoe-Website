import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Save,
  Globe,
  Key,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface ConnectSupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ConnectSupabaseModal: React.FC<ConnectSupabaseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [serviceKey, setServiceKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  const loadStatus = async () => {
    setStatusLoading(true);
    try {
      const res = await fetch('/api/database/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
        if (data.url && data.url !== 'Not Configured' && !data.url.includes('***')) {
          setUrl(data.url);
        }
      }
    } catch {
      // ignore
    } finally {
      setStatusLoading(false);
    }
  };

  const getAdminToken = () => {
    return (
      localStorage.getItem('admin_token') ||
      localStorage.getItem('erintjoe_admin_token') ||
      'admin-secret-session-token-2026'
    );
  };

  const handleTestConnection = async () => {
    if (!url.trim() || !key.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide both your Supabase Project URL and Anon API Key.',
      });
      return;
    }

    setLoading(true);
    setTestResult(null);

    try {
      // First try backend test endpoint
      const res = await fetch('/api/database/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({ url: url.trim(), key: key.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setTestResult(data);
      } else {
        // Fallback: direct browser ping to Supabase REST endpoint
        try {
          const directRes = await fetch(`${url.trim().replace(/\/$/, '')}/rest/v1/`, {
            headers: {
              apikey: key.trim(),
              Authorization: `Bearer ${key.trim()}`,
            },
          });
          if (directRes.ok || directRes.status === 200 || directRes.status === 404) {
            setTestResult({
              success: true,
              message: 'Verified! Connection to Supabase REST API established successfully.',
            });
          } else {
            setTestResult({
              success: false,
              message: `Supabase returned HTTP status ${directRes.status}. Please check your credentials.`,
            });
          }
        } catch (e: any) {
          setTestResult({
            success: false,
            message: `Connection failed: ${e.message || 'Unable to reach URL. Ensure it starts with https://'}`,
          });
        }
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Network test error: ${err.message || 'Unable to verify connection'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!url.trim() || !key.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide both Supabase Project URL and Anon API Key before saving.',
      });
      return;
    }

    setLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/database/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({
          url: url.trim(),
          key: key.trim(),
          serviceKey: serviceKey.trim(),
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTestResult({
          success: true,
          message: 'Supabase credentials saved successfully! Your website is now configured with Supabase.',
        });
        loadStatus();
        if (onSuccess) onSuccess();
      } else {
        const err = await res.json().catch(() => ({}));
        setTestResult({
          success: false,
          message: err.error || 'Failed to save configuration to backend server.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to save Supabase config',
      });
    } finally {
      setLoading(false);
    }
  };

  const sampleSql = `-- Supabase Schema for Erin Tjoe Portfolio
-- Run this in your Supabase Project -> SQL Editor

create table if not exists site_settings (
  id text primary key default 'default',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists music_tracks (
  id text primary key,
  title text not null,
  genre text,
  duration text,
  audio_url text,
  album_cover_url text,
  featured boolean default false,
  release_date text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists video_items (
  id text primary key,
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists testimonials (
  id text primary key,
  author_name text not null,
  author_title text,
  company text,
  quote text not null,
  rating integer default 5,
  approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists bookings (
  id text primary key,
  client_name text not null,
  client_email text not null,
  event_type text,
  event_date text,
  location text,
  budget text,
  notes text,
  status text default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Public Read on approved testimonials
alter table testimonials enable row level security;
create policy "Allow public read of approved testimonials" on testimonials
  for select using (approved = true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-zinc-950 border border-emerald-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative text-slate-100 shadow-[0_0_60px_rgba(16,185,129,0.25)] max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/50">
            <Zap className="w-6 h-6 fill-emerald-400 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                Cloud Database Integration
              </span>
              <span className="text-[10px] font-mono text-slate-400">PostgreSQL</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              Connect Website to Supabase
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect your live Supabase project to persist music tracks, videos, EPK riders, testimonials, and bookings.
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="p-4 rounded-2xl bg-black border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                status?.connected
                  ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]'
                  : 'bg-amber-400 shadow-[0_0_12px_#f59e0b]'
              }`}
            />
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-2">
                <span>Current Mode:</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                    status?.connected
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {status?.connected ? 'Connected to Supabase' : 'Local Disk JSON Storage (Active)'}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {status?.connected
                  ? `Supabase Endpoint: ${status.url}`
                  : 'Your data is auto-persisted locally. Connect Supabase below to sync to the cloud.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadStatus}
            disabled={statusLoading}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 self-start sm:self-center transition"
          >
            <RefreshCw className={`w-3 h-3 ${statusLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Connection Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Project URL</span>
                <span className="text-rose-400">*</span>
              </span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 normal-case font-normal"
              >
                <span>Find in Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="url"
              required
              placeholder="https://your-project-id.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Found in: <strong>Project Settings → API → Project URL</strong>
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase Public / Anon Key</span>
              <span className="text-rose-400">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Found in: <strong>Project Settings → API → Project API Keys → anon public</strong>
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Service Role Secret Key (Optional)</span>
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={serviceKey}
              onChange={(e) => setServiceKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Used strictly server-side for administrative bypassing of Row Level Security.
            </p>
          </div>

          {/* Test or Save Result feedback */}
          {testResult && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in ${
                testResult.success
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{testResult.success ? 'Success' : 'Connection Notice'}</p>
                <p className="text-[11px] opacity-90 mt-0.5">{testResult.message}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>

            <button
              type="button"
              onClick={handleSaveConfig}
              disabled={loading}
              className="w-full sm:flex-1 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveSuccess ? 'Saved & Connected!' : 'Save & Connect Supabase'}</span>
            </button>
          </div>
        </div>

        {/* Optional SQL Schema Drawer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition font-semibold"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>{showSqlGuide ? 'Hide Supabase SQL Schema' : 'View Recommended Supabase SQL Tables'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySql}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] flex items-center gap-1.5 transition"
            >
              {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>

          {showSqlGuide && (
            <div className="mt-3 p-3 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto leading-relaxed animate-in fade-in">
              <pre>{sampleSql}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
