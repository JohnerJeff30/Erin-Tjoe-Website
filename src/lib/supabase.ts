/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback API client for seamless operation inside sandbox & standalone mode
export const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({ error: 'API Error' }));
    throw new Error(errData.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
};
