import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Music,
  Video,
  Image as ImageIcon,
  MessageSquare,
  Calendar,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Download,
  Search,
  Filter,
  Save,
  Upload,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

import {
  HeroContent,
  ArtistProfile,
  Experience,
  MusicTrack,
  VideoItem,
  GalleryItem,
  Testimonial,
  BookingInquiry,
  ContactInfo,
  SiteSettings,
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  // State objects & mutators
  hero: HeroContent;
  onUpdateHero: (updated: HeroContent) => Promise<void>;
  profile: ArtistProfile;
  onUpdateProfile: (updated: ArtistProfile) => Promise<void>;
  experiences: Experience[];
  onAddExperience: (exp: Omit<Experience, 'id'>) => Promise<void>;
  onDeleteExperience: (id: string) => Promise<void>;
  music: MusicTrack[];
  onAddMusic: (track: Omit<MusicTrack, 'id'>) => Promise<void>;
  onDeleteMusic: (id: string) => Promise<void>;
  videos: VideoItem[];
  onAddVideo: (vid: Omit<VideoItem, 'id'>) => Promise<void>;
  onDeleteVideo: (id: string) => Promise<void>;
  gallery: GalleryItem[];
  onAddGallery: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  onDeleteGallery: (id: string) => Promise<void>;
  testimonials: Testimonial[];
  onApproveTestimonial: (id: string, approved: boolean) => Promise<void>;
  onDeleteTestimonial: (id: string) => Promise<void>;
  bookings: BookingInquiry[];
  onUpdateBookingStatus: (id: string, status: BookingInquiry['status']) => Promise<void>;
  onDeleteBooking: (id: string) => Promise<void>;
  contact: ContactInfo;
  onUpdateContact: (updated: ContactInfo) => Promise<void>;
  settings: SiteSettings;
  onUpdateSettings: (updated: SiteSettings) => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  hero,
  onUpdateHero,
  profile,
  onUpdateProfile,
  experiences,
  onAddExperience,
  onDeleteExperience,
  music,
  onAddMusic,
  onDeleteMusic,
  videos,
  onAddVideo,
  onDeleteVideo,
  gallery,
  onAddGallery,
  onDeleteGallery,
  testimonials,
  onApproveTestimonial,
  onDeleteTestimonial,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  contact,
  onUpdateContact,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<
    'hero' | 'profile' | 'experiences' | 'music' | 'videos' | 'gallery' | 'testimonials' | 'bookings' | 'contact' | 'settings'
  >('bookings');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for local edits
  const [heroForm, setHeroForm] = useState<HeroContent>(hero);
  const [profileForm, setProfileForm] = useState<ArtistProfile>(profile);
  const [contactForm, setContactForm] = useState<ContactInfo>(contact);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  // Booking filters & search
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');

  // Modal forms for adding items
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item states
  const [newExperience, setNewExperience] = useState({
    title: '',
    category: 'Festival' as Experience['category'],
    location: '',
    date: '',
    description: '',
    imageUrl: '',
    featured: true,
  });

  const [newMusic, setNewMusic] = useState({
    title: '',
    artist: 'Erin Tjoe',
    albumCoverUrl: '',
    duration: '3:30',
    audioUrl: '',
    description: '',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    soundcloudUrl: 'https://soundcloud.com',
    mixcloudUrl: 'https://mixcloud.com',
    releaseDate: '2026',
    genre: 'Progressive House',
    featured: true,
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    videoType: 'youtube' as VideoItem['videoType'],
    embedUrl: '',
    thumbnailUrl: '',
    description: '',
    duration: '10:00',
    featured: true,
  });

  const [newGallery, setNewGallery] = useState({
    title: '',
    caption: '',
    imageUrl: '',
    category: 'Live Sets' as GalleryItem['category'],
  });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const PRESET_IMAGES = [
    {
      id: 'live',
      label: 'Live DJ Performance (Cruise)',
      url: '/images/erin_tjoe_live_1785811107295.jpg',
    },
    {
      id: 'profile',
      label: 'Official Circular Headshot',
      url: '/images/profile.jpg',
    },
    {
      id: 'cover',
      label: 'Stage / Performance Cover',
      url: '/images/erin_tjoe_cover_1785811124987.jpg',
    },
    {
      id: 'editorial',
      label: 'Editorial Portrait',
      url: '/images/erin_tjoe_hero_1785811060284.jpg',
    },
  ];

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onSuccess(uploadEvent.target.result as string);
          showToast('Image uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = async () => {
    await onUpdateHero(heroForm);
    showToast('Hero section updated successfully');
  };

  const handleSaveProfile = async () => {
    await onUpdateProfile(profileForm);
    showToast('Artist Profile updated successfully');
  };

  const handleSaveContact = async () => {
    await onUpdateContact(contactForm);
    showToast('Contact information saved');
  };

  const handleSaveSettings = async () => {
    await onUpdateSettings(settingsForm);
    showToast('Site settings updated');
  };

  const handleExportCSV = () => {
    window.open('/api/bookings/export-csv', '_blank');
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.company.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.location.toLowerCase().includes(bookingSearch.toLowerCase());

    const matchesStatus =
      bookingStatusFilter === 'All' ? true : b.status === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex bg-black text-slate-100 overflow-hidden font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-xs shadow-2xl animate-in slide-in-from-top flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* Header Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-serif text-white">ERIN TJOE</h2>
              <p className="text-[10px] text-pink-400 uppercase tracking-widest">CMS Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'bookings', label: 'Bookings', icon: Calendar, badge: bookings.filter((b) => b.status === 'New').length },
              { id: 'hero', label: 'Hero Banner', icon: LayoutDashboard },
              { id: 'profile', label: 'Artist Profile', icon: User },
              { id: 'experiences', label: 'Experiences', icon: Sparkles },
              { id: 'music', label: 'Discography', icon: Music },
              { id: 'videos', label: 'Video Gallery', icon: Video },
              { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, badge: testimonials.filter((t) => !t.approved).length },
              { id: 'contact', label: 'Contact Info', icon: Mail },
              { id: 'settings', label: 'Site Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                    active
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider transition"
          >
            <Eye className="w-4 h-4" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold uppercase tracking-wider transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-zinc-900 overflow-y-auto p-8 sm:p-12">
        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Booking Inquiries</h2>
                <p className="text-xs text-slate-400">Manage global event booking requests & export reports</p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search by name, company, location or email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                {['All', 'New', 'Contacted', 'Confirmed', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition ${
                      bookingStatusFilter === st
                        ? 'bg-pink-600 text-white'
                        : 'bg-black text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 text-slate-400 uppercase font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Event Type</th>
                    <th className="p-4">Date & Location</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(filteredBookings || []).map((b) => (
                    <tr key={b.id} className="hover:bg-zinc-900/50 transition">
                      <td className="p-4">
                        <p className="font-bold text-white text-sm">{b.name}</p>
                        <p className="text-slate-400">{b.company}</p>
                        <p className="text-pink-400">{b.email} • {b.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 font-semibold">
                          {b.eventType}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-200">{b.eventDate}</p>
                        <p className="text-slate-400">{b.location}</p>
                      </td>
                      <td className="p-4 text-amber-300 font-bold">{b.budget}</td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                            b.status === 'New'
                              ? 'bg-pink-950 text-pink-300 border-pink-500/50'
                              : b.status === 'Contacted'
                              ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                              : b.status === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                              : 'bg-zinc-800 text-slate-400 border-white/10'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/50 transition"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No booking inquiries matching current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: HERO BANNER MANAGEMENT */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">
              Edit Hero Banner
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Crown Title
                </label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Artist Subtitle / Name
                </label>
                <input
                  type="text"
                  value={heroForm.subtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={heroForm.tagline}
                  onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              {/* Hero Banner Image Management */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-semibold text-slate-300">
                    Hero Banner Picture
                  </label>
                  <span className="text-xs text-pink-400 font-medium">Live Preview</span>
                </div>

                {/* Preview Box */}
                <div className="relative rounded-xl overflow-hidden bg-black border border-white/10 aspect-video max-h-56 flex items-center justify-center">
                  <img
                    src={heroForm.heroImageUrl || '/images/erin_tjoe_live_1785811107295.jpg'}
                    alt="Hero Banner Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 text-[11px] font-semibold text-white/90 bg-black/60 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Hero Banner Picture</span>
                  </div>
                </div>

                {/* Upload & Instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-semibold tracking-wider uppercase transition group">
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Upload Hero Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, (url) => setHeroForm({ ...heroForm, heroImageUrl: url }))}
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 flex items-center">
                    Select any photo file from your device to instantly update the Hero banner image.
                  </p>
                </div>

                {/* Preset Selector */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Or Select from Official Photos:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setHeroForm({ ...heroForm, heroImageUrl: img.url })}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all text-left p-1 ${
                          heroForm.heroImageUrl === img.url
                            ? 'border-pink-500 ring-2 ring-pink-500/40 scale-[1.02]'
                            : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-16 object-cover rounded-lg" />
                        <span className="text-[10px] font-medium text-slate-200 block truncate mt-1 px-1">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual URL Input */}
                <div className="pt-2">
                  <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                    Direct Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={heroForm.heroImageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                    placeholder="/images/... or https://..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveHero}
                  className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARTIST PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">
              Edit Artist Profile & EPK Section
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Titles & Roles
                </label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Biography
                </label>
                <textarea
                  rows={5}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Featured Quote
                </label>
                <input
                  type="text"
                  value={profileForm.quote}
                  onChange={(e) => setProfileForm({ ...profileForm, quote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              {/* Artist Profile & EPK Image Management */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-semibold text-slate-300">
                    Artist Profile & EPK Photo
                  </label>
                  <span className="text-xs text-pink-400 font-medium">Live Preview</span>
                </div>

                {/* Previews: Circular & Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-black/60 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500 p-1 shadow-lg bg-zinc-950">
                      <img
                        src={profileForm.portraitImageUrl || '/images/profile.jpg'}
                        alt="EPK Badge Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Circular EPK Badge</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-24 rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                      <img
                        src={profileForm.portraitImageUrl || '/images/profile.jpg'}
                        alt="Profile Card Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Card Preview</span>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-semibold tracking-wider uppercase transition group">
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Upload EPK / Profile Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, (url) => setProfileForm({ ...profileForm, portraitImageUrl: url }))}
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 flex items-center">
                    Upload an image file from your device for the Artist Profile and EPK section.
                  </p>
                </div>

                {/* Presets */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Or Select from Official Photos:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, portraitImageUrl: img.url })}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all text-left p-1 ${
                          profileForm.portraitImageUrl === img.url
                            ? 'border-pink-500 ring-2 ring-pink-500/40 scale-[1.02]'
                            : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-16 object-cover rounded-lg" />
                        <span className="text-[10px] font-medium text-slate-200 block truncate mt-1 px-1">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct URL Input */}
                <div className="pt-2">
                  <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                    Direct Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={profileForm.portraitImageUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, portraitImageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                    placeholder="/images/... or https://..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-bold text-white">Experience Cards</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(experiences || []).map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-black border border-white/10 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{exp.title}</h4>
                    <p className="text-xs text-pink-400">{exp.category} • {exp.location}</p>
                    <p className="text-xs text-slate-400 mt-1">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => onDeleteExperience(exp.id)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DISCOGRAPHY / MUSIC */}
        {activeTab === 'music' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-bold text-white">Music Discography</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Track</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(music || []).map((track) => (
                <div key={track.id} className="p-4 rounded-xl bg-black border border-white/10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={track.albumCoverUrl} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{track.title}</h4>
                      <p className="text-xs text-purple-300">{track.genre} • {track.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMusic(track.id)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-bold text-white">Video Gallery</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(videos || []).map((vid) => (
                <div key={vid.id} className="p-4 rounded-xl bg-black border border-white/10 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{vid.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{vid.description}</p>
                  </div>
                  <button
                    onClick={() => onDeleteVideo(vid.id)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-bold text-white">Photo Gallery</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(gallery || []).map((img) => (
                <div key={img.id} className="relative rounded-xl overflow-hidden bg-black border border-white/10 group">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-36 object-cover" />
                  <button
                    onClick={() => onDeleteGallery(img.id)}
                    className="absolute top-2 right-2 p-1.5 bg-rose-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: TESTIMONIALS MODERATION */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">
              Testimonials & Moderation
            </h2>

            <div className="space-y-4">
              {(testimonials || []).map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-black border border-white/10 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{t.authorName}</span>
                      <span className="text-xs text-amber-300">({t.authorTitle} - {t.company})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${t.approved ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                        {t.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{t.quote}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApproveTestimonial(t.id, !t.approved)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase ${
                        t.approved ? 'bg-zinc-800 text-slate-300' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {t.approved ? 'Unapprove' : 'Approve'}
                    </button>
                    <button
                      onClick={() => onDeleteTestimonial(t.id)}
                      className="p-2 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CONTACT INFO */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Booking Email
                </label>
                <input
                  type="email"
                  value={contactForm.bookingEmail}
                  onChange={(e) => setContactForm({ ...contactForm, bookingEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={contactForm.instagram}
                  onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <button
                onClick={handleSaveContact}
                className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 10: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">
              Site Settings & Resend Notifications
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settingsForm.siteName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                  Notification Email Address
                </label>
                <input
                  type="email"
                  value={settingsForm.adminNotificationEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminNotificationEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-2xl max-w-md w-full p-6 text-slate-200">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h3 className="font-bold font-serif text-white uppercase">Add New Item</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
            </div>

            {activeTab === 'experiences' && (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Title (e.g. Groove Cruise Mainstage)"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Miami, FL)"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <textarea
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <button
                  onClick={async () => {
                    await onAddExperience({ ...newExperience, imageUrl: newExperience.imageUrl || profile.portraitImageUrl });
                    setShowAddModal(false);
                    showToast('Experience added');
                  }}
                  className="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl uppercase"
                >
                  Save Experience
                </button>
              </div>
            )}

            {activeTab === 'music' && (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Song Title"
                  value={newMusic.title}
                  onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Audio URL (.mp3)"
                  value={newMusic.audioUrl}
                  onChange={(e) => setNewMusic({ ...newMusic, audioUrl: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <button
                  onClick={async () => {
                    await onAddMusic({ ...newMusic, albumCoverUrl: newMusic.albumCoverUrl || profile.portraitImageUrl });
                    setShowAddModal(false);
                    showToast('Track added');
                  }}
                  className="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl uppercase"
                >
                  Save Music Track
                </button>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Video Title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Embed URL (https://www.youtube.com/embed/...)"
                  value={newVideo.embedUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, embedUrl: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <button
                  onClick={async () => {
                    await onAddVideo({ ...newVideo, thumbnailUrl: newVideo.thumbnailUrl || hero.heroImageUrl });
                    setShowAddModal(false);
                    showToast('Video added');
                  }}
                  className="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl uppercase"
                >
                  Save Video
                </button>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Photo Title"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newGallery.imageUrl}
                  onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-black border border-white/10 rounded-xl"
                />
                <button
                  onClick={async () => {
                    await onAddGallery({ ...newGallery, imageUrl: newGallery.imageUrl || hero.heroImageUrl });
                    setShowAddModal(false);
                    showToast('Photo added');
                  }}
                  className="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl uppercase"
                >
                  Save Photo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
