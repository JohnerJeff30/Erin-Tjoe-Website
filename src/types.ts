export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  heroImageUrl: string;
  ctaTextPrimary: string;
  ctaUrlPrimary: string;
  ctaTextSecondary: string;
  ctaUrlSecondary: string;
  updated_at?: string;
}

export interface PerformanceFormat {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export interface RiderPhoto {
  id: string;
  url: string;
  caption?: string;
  title?: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  portraitImageUrl: string;
  quote: string;
  baseLocation: string;
  signatureElements: string[];
  performanceFormats: PerformanceFormat[];
  technicalRider: string[];
  hospitalityNotes: string[];
  riderPhotos?: RiderPhoto[];
  riderTitle?: string;
  riderIntro?: string;
  stageDimensions?: string;
  powerRequirements?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  title: string;
  category: 'Festival' | 'Resort & Cruise' | 'Private & Luxury' | 'Charity & Community' | 'Cultural';
  location: string;
  date: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  order_index?: number;
  created_at?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  albumCoverUrl: string;
  duration: string;
  audioUrl: string;
  description: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  soundcloudUrl: string;
  mixcloudUrl: string;
  releaseDate: string;
  genre: string;
  featured: boolean;
  created_at?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  videoType: 'youtube' | 'vimeo' | 'mp4';
  embedUrl: string;
  thumbnailUrl: string;
  description: string;
  duration: string;
  featured: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Live Sets' | 'Editorial' | 'Red Carpet' | 'Behind the Scenes';
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  company: string;
  quote: string;
  rating: number;
  approved: boolean;
  avatarUrl?: string;
  created_at?: string;
}

export interface BookingInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  guestCount: string;
  message: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Closed';
  created_at: string;
}

export interface ContactInfo {
  id?: string;
  email: string;
  bookingEmail: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  spotify: string;
  appleMusic: string;
  youtube: string;
  baseLocation: string;
}

export interface SiteSettings {
  siteName: string;
  brandTagline: string;
  primaryColor: string;
  accentColor: string;
  enableBookingNotifications: boolean;
  adminNotificationEmail: string;
}

export interface WeaponStat {
  id: string;
  name: string;
  description: string;
  metric: string;
  icon?: 'angles' | 'power' | 'dink' | 'speed' | 'defense';
}

export interface PickleballClinicFormat {
  id: string;
  title: string;
  description: string;
  duration?: string;
  badge?: string;
}

export interface PickleballProfile {
  id: string;
  name: string;
  title: string;
  tagline: string;
  sponsor: string;
  rankingBadge: string;
  hometown: string;
  paddleWeapon: string;
  bio: string;
  cardImageUrl: string;
  actionImageUrl: string;
  weapons: WeaponStat[];
  formats: PickleballClinicFormat[];
  tournamentRider: string[];
  hospitalityNotes: string[];
  riderPhotos?: RiderPhoto[];
  courtDimensions?: string;
  ballSpecs?: string;
  netSpecs?: string;
  updated_at?: string;
}

