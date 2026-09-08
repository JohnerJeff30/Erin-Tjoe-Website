import React, { useState, useEffect } from 'react';
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
  FileText,
  Sliders,
  Zap,
  Disc3,
  Radio,
  Mic,
  Maximize2,
  Copy,
  ChevronRight,
  Layers,
  Trophy,
  Database,
  RefreshCw,
  HardDrive,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

import {
  HeroContent,
  ArtistProfile,
  PickleballProfile,
  Experience,
  MusicTrack,
  VideoItem,
  GalleryItem,
  Testimonial,
  BookingInquiry,
  ContactInfo,
  SiteSettings,
  RiderPhoto,
} from '../types';

import { PickleballAdminTab } from './PickleballAdminTab';
import { PickleballEPKModal } from './PickleballEPKModal';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  // State objects & mutators
  hero: HeroContent;
  onUpdateHero: (updated: HeroContent) => Promise<void>;
  profile: ArtistProfile;
  onUpdateProfile: (updated: ArtistProfile) => Promise<void>;
  pickleballProfile: PickleballProfile;
  onUpdatePickleballProfile: (updated: PickleballProfile) => Promise<void>;
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
  pickleballProfile,
  onUpdatePickleballProfile,
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
    | 'hero'
    | 'profile'
    | 'rider'
    | 'pickleball_epk'
    | 'experiences'
    | 'music'
    | 'videos'
    | 'gallery'
    | 'testimonials'
    | 'database'
    | 'bookings'
    | 'contact'
    | 'settings'
  >('bookings');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Database Management State
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbUrl, setDbUrl] = useState('');
  const [dbKey, setDbKey] = useState('');
  const [dbTestResult, setDbTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'pending' | 'approved'>('all');

  // Form states for local edits
  const [heroForm, setHeroForm] = useState<HeroContent>(hero);
  const [profileForm, setProfileForm] = useState<ArtistProfile>({
    ...profile,
    technicalRider: profile.technicalRider || [],
    hospitalityNotes: profile.hospitalityNotes || [],
    riderPhotos: profile.riderPhotos || [],
  });
  const [pickleballForm, setPickleballForm] = useState<PickleballProfile>(pickleballProfile);
  const [contactForm, setContactForm] = useState<ContactInfo>(contact);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [previewPickleballModal, setPreviewPickleballModal] = useState(false);

  // Sync profileForm if profile updates
  useEffect(() => {
    if (profile) {
      setProfileForm((prev) => ({
        ...profile,
        technicalRider: profile.technicalRider || prev.technicalRider || [],
        hospitalityNotes: profile.hospitalityNotes || prev.hospitalityNotes || [],
        riderPhotos: profile.riderPhotos || prev.riderPhotos || [],
      }));
    }
  }, [profile]);

  // Sync pickleballForm if pickleballProfile updates
  useEffect(() => {
    if (pickleballProfile) {
      setPickleballForm(pickleballProfile);
    }
  }, [pickleballProfile]);

  // EPK Rider helper states
  const [newTechRiderItem, setNewTechRiderItem] = useState('');
  const [newHospitalityItem, setNewHospitalityItem] = useState('');
  const [newRiderPhoto, setNewRiderPhoto] = useState({
    url: '',
    title: '',
    caption: '',
  });
  const [previewRiderModal, setPreviewRiderModal] = useState(false);

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

  const [newTestimonial, setNewTestimonial] = useState({
    authorName: '',
    authorTitle: 'Event Producer',
    company: 'Groove Cruise / VIP Events',
    quote: '',
    rating: 5,
    approved: true,
  });

  useEffect(() => {
    if (activeTab === 'database') {
      setDbLoading(true);
      fetch('/api/database/status')
        .then((res) => res.json())
        .then((data) => {
          setDbStatus(data);
        })
        .catch(() => {})
        .finally(() => setDbLoading(false));
    }
  }, [activeTab]);

  const getAdminAuthToken = () => {
    return (
      localStorage.getItem('admin_token') ||
      localStorage.getItem('erintjoe_admin_token') ||
      'admin-secret-session-token-2026'
    );
  };

  const handleTestDatabase = async () => {
    setDbLoading(true);
    setDbTestResult(null);
    try {
      const res = await fetch('/api/database/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
        body: JSON.stringify({ url: dbUrl, key: dbKey }),
      });
      const data = await res.json();
      setDbTestResult(data);
      if (data.success) {
        showToast('Database connection successful!');
      } else {
        showToast(data.message || 'Connection test failed');
      }
    } catch (err: any) {
      setDbTestResult({ success: false, message: err.message });
      showToast('Network error testing database');
    } finally {
      setDbLoading(false);
    }
  };

  const handleSaveDatabaseConfig = async () => {
    setDbLoading(true);
    try {
      const res = await fetch('/api/database/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
        body: JSON.stringify({ url: dbUrl, key: dbKey }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Database credentials saved securely!');
        const statusRes = await fetch('/api/database/status');
        const statusData = await statusRes.json();
        setDbStatus(statusData);
      } else {
        showToast(data.error || 'Failed to save configuration');
      }
    } catch (err: any) {
      showToast('Error saving credentials: ' + err.message);
    } finally {
      setDbLoading(false);
    }
  };

  const handleExportBackup = () => {
    window.location.href = '/api/database/export';
    showToast('Exporting complete site backup JSON...');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        const res = await fetch('/api/database/import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAdminAuthToken()}`,
          },
          body: JSON.stringify({ data: json }),
        });
        const result = await res.json();
        if (result.success) {
          showToast('Database backup successfully restored! Reloading...');
          setTimeout(() => window.location.reload(), 1200);
        } else {
          showToast(result.error || 'Import failed');
        }
      } catch (err: any) {
        showToast('Invalid backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

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

  // Technical Rider & EPK Management Handlers
  const handleSaveRider = async () => {
    await onUpdateProfile(profileForm);
    showToast('EPK & Technical Rider updated successfully!');
  };

  const handleAddTechRiderItem = () => {
    if (!newTechRiderItem.trim()) return;
    setProfileForm({
      ...profileForm,
      technicalRider: [...(profileForm.technicalRider || []), newTechRiderItem.trim()],
    });
    setNewTechRiderItem('');
    showToast('Technical Rider requirement added');
  };

  const handleRemoveTechRiderItem = (index: number) => {
    const updated = (profileForm.technicalRider || []).filter((_, idx) => idx !== index);
    setProfileForm({ ...profileForm, technicalRider: updated });
  };

  const handleUpdateTechRiderItem = (index: number, val: string) => {
    const updated = [...(profileForm.technicalRider || [])];
    updated[index] = val;
    setProfileForm({ ...profileForm, technicalRider: updated });
  };

  const handleAddHospitalityItem = () => {
    if (!newHospitalityItem.trim()) return;
    setProfileForm({
      ...profileForm,
      hospitalityNotes: [...(profileForm.hospitalityNotes || []), newHospitalityItem.trim()],
    });
    setNewHospitalityItem('');
    showToast('Hospitality requirement added');
  };

  const handleRemoveHospitalityItem = (index: number) => {
    const updated = (profileForm.hospitalityNotes || []).filter((_, idx) => idx !== index);
    setProfileForm({ ...profileForm, hospitalityNotes: updated });
  };

  const handleUpdateHospitalityItem = (index: number, val: string) => {
    const updated = [...(profileForm.hospitalityNotes || [])];
    updated[index] = val;
    setProfileForm({ ...profileForm, hospitalityNotes: updated });
  };

  const handleAddRiderPhoto = () => {
    if (!newRiderPhoto.url) {
      showToast('Please select, enter or upload an image first');
      return;
    }
    const photo: RiderPhoto = {
      id: `rider-p-${Date.now()}`,
      url: newRiderPhoto.url,
      title: newRiderPhoto.title.trim() || 'Stage Setup & Audio Layout',
      caption: newRiderPhoto.caption.trim() || '',
    };
    setProfileForm({
      ...profileForm,
      riderPhotos: [...(profileForm.riderPhotos || []), photo],
    });
    setNewRiderPhoto({ url: '', title: '', caption: '' });
    showToast('Rider setup photo added to EPK!');
  };

  const handleRemoveRiderPhoto = (id: string) => {
    const updated = (profileForm.riderPhotos || []).filter((p) => p.id !== id);
    setProfileForm({ ...profileForm, riderPhotos: updated });
    showToast('Rider photo removed');
  };

  const handleUpdateRiderPhoto = (id: string, updates: Partial<RiderPhoto>) => {
    const updated = (profileForm.riderPhotos || []).map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    setProfileForm({ ...profileForm, riderPhotos: updated });
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
              { id: 'rider', label: 'Music EPK & Rider', icon: FileText },
              { id: 'pickleball_epk', label: 'Pickleball EPK & Rider', icon: Trophy },
              { id: 'experiences', label: 'Experiences', icon: Sparkles },
              { id: 'music', label: 'Discography', icon: Music },
              { id: 'videos', label: 'Video Gallery', icon: Video },
              { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
              { id: 'testimonials', label: 'Feedback & Reviews', icon: MessageSquare, badge: testimonials.filter((t) => !t.approved).length },
              { id: 'database', label: '⚡ Connect Supabase', icon: Zap, highlight: true, statusText: dbStatus?.connected ? 'LIVE' : 'SETUP' },
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
                      ? item.highlight
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                      : item.highlight
                      ? 'text-emerald-300 hover:text-emerald-200 bg-emerald-950/30 border border-emerald-500/20 hover:bg-emerald-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.highlight ? 'text-emerald-400' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.statusText ? (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                      item.statusText === 'LIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {item.statusText}
                    </span>
                  ) : item.badge && item.badge > 0 ? (
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

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('rider')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider transition"
                >
                  <FileText className="w-4 h-4 text-pink-400" />
                  <span>Edit EPK & Technical Rider Specs →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3.5: EPK & TECHNICAL RIDER */}
        {activeTab === 'rider' && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-pink-400" />
                  <h2 className="text-2xl font-serif font-bold text-white">
                    EPK & Technical Rider Management
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Configure audio equipment specifications, hospitality notes, stage footprints, and setup photos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewRiderModal(true)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <Eye className="w-4 h-4 text-pink-400" />
                  <span>Preview Modal</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveRider}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Rider</span>
                </button>
              </div>
            </div>

            {/* General Rider Title & Intro */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Rider Overview & Staging Parameters</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Rider Section Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.riderTitle || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, riderTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                    placeholder="Technical Rider & Hospitality Specs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Subtitle / Production Intention
                  </label>
                  <input
                    type="text"
                    value={profileForm.riderIntro || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, riderIntro: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                    placeholder="Erin Tjoe Official Production & Staging Requirements"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Stage Dimensions / Booth Footprint
                  </label>
                  <input
                    type="text"
                    value={profileForm.stageDimensions || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, stageDimensions: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                    placeholder="6 ft (W) x 6 ft (D) minimum dedicated DJ performance footprint"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Power & Electricity Drops
                  </label>
                  <input
                    type="text"
                    value={profileForm.powerRequirements || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, powerRequirements: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm"
                    placeholder="2 x standard isolated 120V / 240V AC power drops at DJ booth"
                  />
                </div>
              </div>
            </div>

            {/* EPK Rider Photos Management */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-pink-400" />
                    <span>EPK Rider Photos & Staging References</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add visual setup references, gear layout photos, and stage diagrams for event organizers.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  {profileForm.riderPhotos?.length || 0} Photos Added
                </span>
              </div>

              {/* Add New Rider Photo Box */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Add New Rider Photo Reference
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Preview & Upload */}
                  <div className="space-y-2 flex flex-col justify-between">
                    <div className="aspect-video sm:aspect-4/3 w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 relative flex items-center justify-center">
                      {newRiderPhoto.url ? (
                        <img
                          src={newRiderPhoto.url}
                          alt="New rider preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-3 text-slate-500">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span className="text-[11px] block">No image chosen yet</span>
                        </div>
                      )}
                    </div>

                    <label className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-semibold uppercase tracking-wider transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, (url) => setNewRiderPhoto({ ...newRiderPhoto, url }))}
                      />
                    </label>
                  </div>

                  {/* Photo Title & Caption */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                        Photo Title / Section
                      </label>
                      <input
                        type="text"
                        value={newRiderPhoto.title}
                        onChange={(e) => setNewRiderPhoto({ ...newRiderPhoto, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
                        placeholder="e.g. Pioneer CDJ & DJM Booth Layout"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                        Caption / Setup Notes
                      </label>
                      <textarea
                        rows={2}
                        value={newRiderPhoto.caption}
                        onChange={(e) => setNewRiderPhoto({ ...newRiderPhoto, caption: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
                        placeholder="e.g. Dual CDJ-3000 setup angled towards artist with booth monitor on left."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                        Or Image URL
                      </label>
                      <input
                        type="text"
                        value={newRiderPhoto.url}
                        onChange={(e) => setNewRiderPhoto({ ...newRiderPhoto, url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                        placeholder="/images/... or https://..."
                      />
                    </div>

                    {/* Presets for quick selection */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Quick Presets:</span>
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setNewRiderPhoto({ ...newRiderPhoto, url: img.url, title: img.label })}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white transition"
                        >
                          {img.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleAddRiderPhoto}
                        className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Photo to EPK Rider</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing Rider Photos Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Current EPK Rider Photos ({profileForm.riderPhotos?.length || 0})
                </span>

                {(!profileForm.riderPhotos || profileForm.riderPhotos.length === 0) ? (
                  <div className="p-6 rounded-2xl bg-black/40 border border-dashed border-white/10 text-center text-slate-500 text-xs">
                    No rider photos added yet. Upload or select one above to showcase your stage setup.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {profileForm.riderPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="rounded-2xl bg-black/70 border border-white/10 p-3 space-y-2 flex flex-col justify-between group hover:border-pink-500/40 transition"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveRiderPhoto(photo.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white shadow-md transition"
                            title="Delete this photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={photo.title || ''}
                            onChange={(e) => handleUpdateRiderPhoto(photo.id, { title: e.target.value })}
                            placeholder="Photo Title"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            value={photo.caption || ''}
                            onChange={(e) => handleUpdateRiderPhoto(photo.id, { caption: e.target.value })}
                            placeholder="Caption / Notes"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-slate-300 text-[11px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Audio & DJ Gear Technical Rider List */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
                  <Disc3 className="w-4 h-4 text-pink-400" />
                  <span>Audio & DJ Gear Specifications</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {(profileForm.technicalRider || []).length} requirements
                </span>
              </div>

              {/* Item List */}
              <div className="space-y-2">
                {(profileForm.technicalRider || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 group hover:border-white/20 transition"
                  >
                    <span className="w-6 text-center text-xs font-mono text-pink-400 font-bold">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdateTechRiderItem(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-transparent text-white text-xs focus:bg-zinc-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTechRiderItem(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Item */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newTechRiderItem}
                  onChange={(e) => setNewTechRiderItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTechRiderItem();
                    }
                  }}
                  placeholder="e.g. 2 x Pioneer CDJ-3000 Players with Pro DJ Link"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddTechRiderItem}
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Spec</span>
                </button>
              </div>

              {/* Quick Spec Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Suggested Specs:</span>
                {[
                  '2x Pioneer CDJ-3000 / CDJ-2000NXS2',
                  '1x Pioneer DJM-A9 or DJM-900NXS2 Mixer',
                  '1x Shure Beta 58A Wireless Vocal Microphone',
                  '2x High-Output Active Stereo Booth Monitors',
                  'Sturdy 40" height DJ performance table / facade',
                ].map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setProfileForm({
                        ...profileForm,
                        technicalRider: [...(profileForm.technicalRider || []), preset],
                      });
                      showToast(`Added: ${preset}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 text-[10px] text-slate-300 hover:text-pink-300 transition"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospitality & Show Notes List */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Hospitality & Green Room Notes</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {(profileForm.hospitalityNotes || []).length} notes
                </span>
              </div>

              {/* Notes List */}
              <div className="space-y-2">
                {(profileForm.hospitalityNotes || []).map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 group hover:border-white/20 transition"
                  >
                    <span className="w-6 text-center text-xs font-mono text-purple-400 font-bold">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => handleUpdateHospitalityItem(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-transparent text-white text-xs focus:bg-zinc-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveHospitalityItem(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition"
                      title="Remove Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Note */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newHospitalityItem}
                  onChange={(e) => setNewHospitalityItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddHospitalityItem();
                    }
                  }}
                  placeholder="e.g. 4x chilled bottles of non-sparkling mineral water and fresh coconut water"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddHospitalityItem}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
              </div>

              {/* Quick Hospitality Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Suggested Notes:</span>
                {[
                  '4x Bottles chilled still mineral water & coconut water',
                  '2x Clean black stage hand towels at DJ booth',
                  'Secure green room / dressing area with full-length mirror',
                  'Dedicated production / sound engineer liaison on-site',
                ].map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setProfileForm({
                        ...profileForm,
                        hospitalityNotes: [...(profileForm.hospitalityNotes || []), preset],
                      });
                      showToast(`Added: ${preset}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 text-[10px] text-slate-300 hover:text-purple-300 transition"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Formats Overview */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-4 h-4 text-pink-400" />
                <span>Performance Formats Configured</span>
              </h3>
              <p className="text-xs text-slate-400">
                These format badges appear dynamically in the EPK overview section.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(profileForm.performanceFormats || []).map((fmt) => (
                  <div key={fmt.id} className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{fmt.title}</span>
                      {fmt.badge && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-500/30">
                          {fmt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{fmt.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Action Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                type="button"
                onClick={() => setPreviewRiderModal(true)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
              >
                <Eye className="w-4 h-4 text-pink-400" />
                <span>Live Preview Rider Modal</span>
              </button>

              <button
                type="button"
                onClick={handleSaveRider}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save All Rider Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3B: PICKLEBALL EPK & TOURNAMENT RIDER */}
        {activeTab === 'pickleball_epk' && (
          <PickleballAdminTab
            initialProfile={pickleballForm}
            onSave={async (updated) => {
              setPickleballForm(updated);
              await onUpdatePickleballProfile(updated);
            }}
            showToast={showToast}
            onPreviewModal={() => setPreviewPickleballModal(true)}
          />
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

        {/* TAB 8: TESTIMONIALS & FEEDBACK REVIEW */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                  <span>Feedback & Reviews</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-500/30 font-sans font-semibold">
                    {testimonials.filter((t) => !t.approved).length} Pending Review
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Approve, moderate, or publish reviews submitted by luxury festival organizers, corporate sponsors, and club directors.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 p-1 bg-black rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setTestimonialFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    testimonialFilter === 'all' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({testimonials.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    testimonialFilter === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pending ({testimonials.filter((t) => !t.approved).length})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    testimonialFilter === 'approved' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Approved ({testimonials.filter((t) => t.approved).length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-pink-950/40"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Feedback</span>
              </button>
            </div>

            <div className="space-y-4">
              {testimonials
                .filter((t) => {
                  if (testimonialFilter === 'pending') return !t.approved;
                  if (testimonialFilter === 'approved') return t.approved;
                  return true;
                })
                .map((t) => (
                  <div
                    key={t.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      t.approved
                        ? 'bg-zinc-950/80 border-white/10'
                        : 'bg-amber-950/20 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    } flex flex-col sm:flex-row sm:items-start justify-between gap-4`}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-base font-serif">{t.authorName}</span>
                        <span className="text-xs text-amber-300 font-medium">
                          • {t.authorTitle} ({t.company})
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            t.approved
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {t.approved ? '✓ Approved & Live' : '⏳ Pending Review'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {'★'.repeat(5)}
                        <span className="text-[11px] text-slate-500 ml-1.5">5.0 Star Promoter Rating</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        type="button"
                        onClick={async () => {
                          await onApproveTestimonial(t.id, !t.approved);
                          showToast(t.approved ? 'Review moved to pending' : 'Feedback approved & live on site!');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                          t.approved
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-slate-300'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        }`}
                      >
                        {t.approved ? (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Unapprove</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Publish</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm('Delete this feedback?')) {
                            await onDeleteTestimonial(t.id);
                            showToast('Feedback deleted');
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-950/50 hover:bg-rose-900 border border-rose-500/30 text-rose-300 transition"
                        title="Delete Feedback"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

              {testimonials.length === 0 && (
                <div className="p-8 text-center rounded-2xl bg-zinc-950 border border-white/10 text-slate-400 text-xs">
                  No feedback reviews yet.
                </div>
              )}
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

        {/* TAB 11: DATABASE & CLOUD SYNC */}
        {activeTab === 'database' && (
          <div className="space-y-8 max-w-4xl">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <Database className="w-6 h-6 text-pink-400" />
                <span>Database Connection & Cloud Persistence</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your cloud database (Supabase, PostgreSQL, or Firebase) and manage full site data backups.
              </p>
            </div>

            {/* Live Database Status Card */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${dbStatus?.connected ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-amber-400 shadow-[0_0_12px_#f59e0b]'}`} />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{dbStatus?.connected ? 'Cloud Database Connected' : 'Local JSON Disk Persistence (Active)'}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                        {dbStatus?.type || 'local_json'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Endpoint: {dbStatus?.url || 'server/data-store.json (Real-time auto-saved)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDbLoading(true);
                      fetch('/api/database/status')
                        .then((r) => r.json())
                        .then(setDbStatus)
                        .finally(() => setDbLoading(false));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh Status</span>
                  </button>
                </div>
              </div>

              {/* Records Counter Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Experiences</span>
                  <p className="text-base font-bold text-pink-400 mt-0.5">{dbStatus?.recordsCount?.experiences ?? experiences.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Music Tracks</span>
                  <p className="text-base font-bold text-purple-400 mt-0.5">{dbStatus?.recordsCount?.music ?? music.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Videos</span>
                  <p className="text-base font-bold text-cyan-400 mt-0.5">{dbStatus?.recordsCount?.videos ?? videos.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Photos</span>
                  <p className="text-base font-bold text-amber-400 mt-0.5">{dbStatus?.recordsCount?.gallery ?? gallery.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Reviews</span>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{dbStatus?.recordsCount?.testimonials ?? testimonials.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Bookings</span>
                  <p className="text-base font-bold text-rose-400 mt-0.5">{dbStatus?.recordsCount?.bookings ?? bookings.length}</p>
                </div>
              </div>
            </div>

            {/* Database Credentials Form */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Supabase / Cloud SQL Credentials</span>
              </h3>
              <p className="text-xs text-slate-400">
                Connect a Supabase project by providing your Project URL and Anon API key. All site updates will instantly sync with your remote cloud tables.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://xyzabcdefghijklmnop.supabase.co"
                    value={dbUrl}
                    onChange={(e) => setDbUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Supabase Public / Anon API Key
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={dbKey}
                    onChange={(e) => setDbKey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                {dbTestResult && (
                  <div
                    className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                      dbTestResult.success
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                    }`}
                  >
                    {dbTestResult.success ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    <span>{dbTestResult.message || (dbTestResult.success ? 'Database connection verified!' : 'Connection error')}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleTestDatabase}
                    disabled={dbLoading}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                    <span>Test Connection</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDatabaseConfig}
                    disabled={dbLoading}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Credentials</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Backup, Export & Restore Card */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <span>Site Backup & Restore</span>
              </h3>
              <p className="text-xs text-slate-400">
                Download a complete JSON snapshot of all EPK specifications, music releases, tournament riders, video galleries, and bookings. You can restore this backup at any time.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full JSON Backup</span>
                </button>

                <label className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition">
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span>Restore from JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
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

            {activeTab === 'testimonials' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Marcus Vance"
                    value={newTestimonial.authorName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, authorName: e.target.value })}
                    className="w-full p-2.5 bg-black border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Role & Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Festival Director / Tournament Chair"
                    value={newTestimonial.authorTitle}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, authorTitle: e.target.value })}
                    className="w-full p-2.5 bg-black border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Groove Cruise / VIP Pickleball Tour"
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                    className="w-full p-2.5 bg-black border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Client Review / Testimonial</label>
                  <textarea
                    placeholder="Enter the promoter or client feedback..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    className="w-full p-2.5 bg-black border border-white/10 rounded-xl text-white h-24"
                  />
                </div>
                <button
                  onClick={async () => {
                    if (!newTestimonial.authorName || !newTestimonial.quote) {
                      showToast('Please enter both author name and feedback quote');
                      return;
                    }
                    try {
                      const res = await fetch('/api/testimonials', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${getAdminAuthToken()}`,
                        },
                        body: JSON.stringify(newTestimonial),
                      });
                      if (res.ok) {
                        setShowAddModal(false);
                        showToast('New feedback published!');
                        setTimeout(() => window.location.reload(), 1000);
                      } else {
                        showToast('Failed to save feedback');
                      }
                    } catch {
                      showToast('Error saving feedback');
                    }
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl uppercase shadow-lg"
                >
                  Save & Publish Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EPK Rider Live Preview Modal */}
      {previewRiderModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-slate-200 shadow-2xl space-y-6">
            <button
              onClick={() => setPreviewRiderModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4 pr-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                      {profileForm.riderTitle || 'Technical Rider & Hospitality Specs'}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      Live Preview
                    </span>
                  </div>
                  <p className="text-xs text-pink-300 font-medium mt-0.5">
                    {profileForm.riderIntro || `${profileForm.name} Official Production & Staging Requirements`}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage & Power Highlights */}
            {(profileForm.stageDimensions || profileForm.powerRequirements) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-xs">
                {profileForm.stageDimensions && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Sliders className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong className="text-white">Footprint:</strong> {profileForm.stageDimensions}</span>
                  </div>
                )}
                {profileForm.powerRequirements && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong className="text-white">Power:</strong> {profileForm.powerRequirements}</span>
                  </div>
                )}
              </div>
            )}

            {/* Rider Photos & Staging References */}
            {profileForm.riderPhotos && profileForm.riderPhotos.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>STAGE & SETUP PHOTO REFERENCES</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {profileForm.riderPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="rounded-xl overflow-hidden bg-black border border-white/10 flex flex-col"
                    >
                      <div className="aspect-video sm:aspect-4/3 overflow-hidden bg-zinc-950">
                        <img
                          src={photo.url}
                          alt={photo.title || 'Rider setup reference'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5 bg-zinc-950/90 text-left">
                        <p className="text-xs font-bold text-white truncate">
                          {photo.title || 'Stage Setup'}
                        </p>
                        {photo.caption && (
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio & DJ Gear Rider */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Disc3 className="w-4 h-4 text-pink-400" />
                  <span>AUDIO & DJ GEAR RIDER</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {(profileForm.technicalRider || []).map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hospitality & Show Notes */}
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>HOSPITALITY & GREEN ROOM NOTES</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {(profileForm.hospitalityNotes || []).map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setPreviewRiderModal(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pickleball EPK Live Preview Modal */}
      {previewPickleballModal && (
        <PickleballEPKModal
          isOpen={previewPickleballModal}
          onClose={() => setPreviewPickleballModal(false)}
          profile={pickleballForm}
        />
      )}
    </div>
  );
};
