-- ERIN TJOE PORTFOLIO & CMS - SUPABASE INITIAL MIGRATION
-- Enables RLS, Indexes, Buckets, and Row Level Security Policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HERO CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'MISS HONG KONG USA',
  subtitle TEXT NOT NULL DEFAULT 'ERIN TJOE',
  tagline TEXT NOT NULL DEFAULT 'GRACE • PURPOSE • IMPACT',
  hero_image_url TEXT NOT NULL,
  cta_text_primary TEXT DEFAULT 'Book Erin',
  cta_url_primary TEXT DEFAULT '#booking',
  cta_text_secondary TEXT DEFAULT 'Listen Now',
  cta_url_secondary TEXT DEFAULT '#music',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ARTIST PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.artist_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Erin Tjoe',
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  portrait_image_url TEXT NOT NULL,
  quote TEXT,
  base_location TEXT DEFAULT 'California • Available Worldwide',
  signature_elements JSONB DEFAULT '[]'::jsonb,
  performance_formats JSONB DEFAULT '[]'::jsonb,
  technical_rider JSONB DEFAULT '[]'::jsonb,
  hospitality_notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  date TEXT,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MUSIC TABLE
CREATE TABLE IF NOT EXISTS public.music (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist TEXT DEFAULT 'Erin Tjoe',
  album_cover_url TEXT NOT NULL,
  duration TEXT,
  audio_url TEXT NOT NULL,
  description TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  soundcloud_url TEXT,
  mixcloud_url TEXT,
  release_date TEXT,
  genre TEXT,
  featured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  video_type TEXT DEFAULT 'youtube',
  embed_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  featured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Live Sets',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_title TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  approved BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  budget TEXT,
  guest_count TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACTS & SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT DEFAULT 'teammisshkusa@gmail.com',
  booking_email TEXT DEFAULT 'teammisshkusa@gmail.com',
  instagram TEXT DEFAULT 'https://instagram.com/MissHongKongUS',
  facebook TEXT DEFAULT 'https://facebook.com/MissHongKongUS',
  tiktok TEXT DEFAULT 'https://tiktok.com/@MissHongKongUS',
  spotify TEXT DEFAULT 'https://open.spotify.com',
  apple_music TEXT DEFAULT 'https://music.apple.com',
  youtube TEXT DEFAULT 'https://youtube.com',
  base_location TEXT DEFAULT 'California • Available Worldwide',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT DEFAULT 'Erin Tjoe | Miss Hong Kong USA',
  brand_tagline TEXT DEFAULT 'Grace • Purpose • Impact',
  enable_booking_notifications BOOLEAN DEFAULT true,
  admin_notification_email TEXT DEFAULT 'teammisshkusa@gmail.com',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_experiences_category ON public.experiences(category);
CREATE INDEX IF NOT EXISTS idx_music_featured ON public.music(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Hero" ON public.hero FOR SELECT USING (true);
CREATE POLICY "Public Read Artist Profile" ON public.artist_profile FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Music" ON public.music FOR SELECT USING (true);
CREATE POLICY "Public Read Videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Testimonials" ON public.testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Public Read Contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);

-- Public Insert Policies for Visitors
CREATE POLICY "Public Submit Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Testimonial" ON public.testimonials FOR INSERT WITH CHECK (approved = false);

-- Admin Full Access Policies
CREATE POLICY "Admin Full Access Hero" ON public.hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Artist Profile" ON public.artist_profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Music" ON public.music FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Videos" ON public.videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Bookings" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Contacts" ON public.contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public) VALUES
  ('hero', 'hero', true),
  ('artist', 'artist', true),
  ('gallery', 'gallery', true),
  ('music', 'music', true),
  ('videos', 'videos', true),
  ('documents', 'documents', true),
  ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id IN ('hero', 'artist', 'gallery', 'music', 'videos', 'documents', 'thumbnails'));
CREATE POLICY "Admin Write Storage" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
