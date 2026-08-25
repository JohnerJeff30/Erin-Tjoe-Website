import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { MusicSection } from './components/MusicSection';
import { VideosSection } from './components/VideosSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

import { apiFetch } from './lib/supabase';
import {
  initialHeroContent,
  initialArtistProfile,
  initialExperiences,
  initialMusicTracks,
  initialVideoItems,
  initialGalleryItems,
  initialTestimonials,
  initialBookings,
  initialContactInfo,
  initialSiteSettings,
} from './data/initialData';

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
} from './types';

export default function App() {
  // State
  const [hero, setHero] = useState<HeroContent>(initialHeroContent);
  const [profile, setProfile] = useState<ArtistProfile>(initialArtistProfile);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [music, setMusic] = useState<MusicTrack[]>(initialMusicTracks);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideoItems);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGalleryItems);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [bookings, setBookings] = useState<BookingInquiry[]>(initialBookings);
  const [contact, setContact] = useState<ContactInfo>(initialContactInfo);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(initialMusicTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Admin Auth State
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState<boolean>(false);

  // Load initial server state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const h = await apiFetch<HeroContent>('/hero').catch(() => null);
        if (h && h.title) setHero(h);

        const p = await apiFetch<ArtistProfile>('/artist-profile').catch(() => null);
        if (p && p.name) {
          setProfile({
            ...initialArtistProfile,
            ...p,
            signatureElements: p.signatureElements || initialArtistProfile.signatureElements,
            performanceFormats: p.performanceFormats || initialArtistProfile.performanceFormats,
            technicalRider: p.technicalRider || initialArtistProfile.technicalRider,
            hospitalityNotes: p.hospitalityNotes || initialArtistProfile.hospitalityNotes,
          });
        }

        const exps = await apiFetch<Experience[]>('/experiences').catch(() => null);
        if (exps && Array.isArray(exps) && exps.length > 0) setExperiences(exps);

        const m = await apiFetch<MusicTrack[]>('/music').catch(() => null);
        if (m && Array.isArray(m) && m.length > 0) {
          setMusic(m);
          setCurrentTrack(m[0]);
        }

        const v = await apiFetch<VideoItem[]>('/videos').catch(() => null);
        if (v && Array.isArray(v) && v.length > 0) setVideos(v);

        const g = await apiFetch<GalleryItem[]>('/gallery').catch(() => null);
        if (g && Array.isArray(g) && g.length > 0) setGallery(g);

        const t = await apiFetch<Testimonial[]>('/testimonials?public=true').catch(() => null);
        if (t && Array.isArray(t) && t.length > 0) setTestimonials(t);

        const c = await apiFetch<ContactInfo>('/contacts').catch(() => null);
        if (c && c.email) setContact(c);

        const s = await apiFetch<SiteSettings>('/settings').catch(() => null);
        if (s && s.siteName) setSettings(s);
      } catch {
        // Fallback to initial static data
      }
    };

    fetchData();
  }, []);

  // Sync admin bookings if token present
  useEffect(() => {
    if (adminToken) {
      apiFetch<BookingInquiry[]>('/bookings', {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
        .then((b) => {
          if (Array.isArray(b)) setBookings(b);
        })
        .catch(() => {});
    }
  }, [adminToken]);

  // Handlers
  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await apiFetch<{ success: boolean; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.success && res.token) {
        setAdminToken(res.token);
        localStorage.setItem('admin_token', res.token);
        setAdminDashboardOpen(true);
        return true;
      }
    } catch {
      //
    }
    return false;
  };

  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('admin_token');
    setAdminDashboardOpen(false);
  };

  const handleOpenAdminTrigger = () => {
    if (adminToken) {
      setAdminDashboardOpen(true);
    } else {
      setAdminModalOpen(true);
    }
  };

  // Audio Handlers
  const handlePlayTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Public Form Submissions
  const handleSubmitBooking = async (data: Omit<BookingInquiry, 'id' | 'status' | 'created_at'>) => {
    const created = await apiFetch<BookingInquiry>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setBookings((prev) => [created, ...prev]);

    // Send email via Resend
    apiFetch('/send-email', {
      method: 'POST',
      body: JSON.stringify({
        to: contact.bookingEmail || 'teammisshkusa@gmail.com',
        subject: `New Event Booking Inquiry from ${data.name} (${data.eventType})`,
        body: `Event Booking Request:\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nEvent Type: ${data.eventType}\nDate: ${data.eventDate}\nLocation: ${data.location}\nBudget: ${data.budget}\nGuests: ${data.guestCount}\nMessage: ${data.message}`,
      }),
    }).catch(() => {});
  };

  const handleSubmitTestimonial = async (data: Omit<Testimonial, 'id' | 'approved' | 'created_at'>) => {
    const created = await apiFetch<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Notify admin
    apiFetch('/send-email', {
      method: 'POST',
      body: JSON.stringify({
        to: contact.bookingEmail || 'teammisshkusa@gmail.com',
        subject: `New Testimonial Submitted for Moderation by ${data.authorName}`,
        body: `Name: ${data.authorName}\nTitle: ${data.authorTitle}\nCompany: ${data.company}\nQuote: ${data.quote}`,
      }),
    }).catch(() => {});
  };

  // CMS Mutators
  const handleUpdateHero = async (updated: HeroContent) => {
    const res = await apiFetch<HeroContent>('/hero', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(updated),
    });
    setHero(res);
  };

  const handleUpdateProfile = async (updated: ArtistProfile) => {
    const res = await apiFetch<ArtistProfile>('/artist-profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(updated),
    });
    setProfile(res);
  };

  const handleAddExperience = async (exp: Omit<Experience, 'id'>) => {
    const res = await apiFetch<Experience>('/experiences', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(exp),
    });
    setExperiences((prev) => [...prev, res]);
  };

  const handleDeleteExperience = async (id: string) => {
    await apiFetch(`/experiences/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddMusic = async (track: Omit<MusicTrack, 'id'>) => {
    const res = await apiFetch<MusicTrack>('/music', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(track),
    });
    setMusic((prev) => [...prev, res]);
  };

  const handleDeleteMusic = async (id: string) => {
    await apiFetch(`/music/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setMusic((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddVideo = async (vid: Omit<VideoItem, 'id'>) => {
    const res = await apiFetch<VideoItem>('/videos', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(vid),
    });
    setVideos((prev) => [...prev, res]);
  };

  const handleDeleteVideo = async (id: string) => {
    await apiFetch(`/videos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setVideos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddGallery = async (item: Omit<GalleryItem, 'id'>) => {
    const res = await apiFetch<GalleryItem>('/gallery', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(item),
    });
    setGallery((prev) => [...prev, res]);
  };

  const handleDeleteGallery = async (id: string) => {
    await apiFetch(`/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApproveTestimonial = async (id: string, approved: boolean) => {
    const res = await apiFetch<Testimonial>(`/testimonials/${id}/approve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ approved }),
    });
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: res.approved } : t))
    );
  };

  const handleDeleteTestimonial = async (id: string) => {
    await apiFetch(`/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateBookingStatus = async (id: string, status: BookingInquiry['status']) => {
    const res = await apiFetch<BookingInquiry>(`/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: res.status } : b)));
  };

  const handleDeleteBooking = async (id: string) => {
    await apiFetch(`/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateContact = async (updated: ContactInfo) => {
    const res = await apiFetch<ContactInfo>('/contacts', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(updated),
    });
    setContact(res);
  };

  const handleUpdateSettings = async (updated: SiteSettings) => {
    const res = await apiFetch<SiteSettings>('/settings', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(updated),
    });
    setSettings(res);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenAdmin={handleOpenAdminTrigger}
        isAdminLoggedIn={Boolean(adminToken)}
      />

      {/* Hero Section */}
      <HeroSection content={hero} />

      {/* About & Artist Profile Section */}
      <AboutSection profile={profile} />

      {/* Selected Experience Section */}
      <ExperienceSection experiences={experiences} />

      {/* Discography & Audio Player Section */}
      <MusicSection
        tracks={music}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayTrack={handlePlayTrack}
        onTogglePlay={handleTogglePlay}
      />

      {/* Video Showcase Section */}
      <VideosSection videos={videos} />

      {/* Editorial & Fashion Gallery Section */}
      <GallerySection gallery={gallery} />

      {/* Producer & Industry Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        onSubmitTestimonial={handleSubmitTestimonial}
      />

      {/* Booking Inquiry Section */}
      <BookingSection onSubmitBooking={handleSubmitBooking} />

      {/* Contact & Social Channels Section */}
      <ContactSection contact={contact} />

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdminTrigger} />

      {/* Floating Bottom Audio Player */}
      <AudioPlayerBar
        track={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onClose={() => setIsPlaying(false)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Full CMS Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onLogout={handleLogout}
        hero={hero}
        onUpdateHero={handleUpdateHero}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        experiences={experiences}
        onAddExperience={handleAddExperience}
        onDeleteExperience={handleDeleteExperience}
        music={music}
        onAddMusic={handleAddMusic}
        onDeleteMusic={handleDeleteMusic}
        videos={videos}
        onAddVideo={handleAddVideo}
        onDeleteVideo={handleDeleteVideo}
        gallery={gallery}
        onAddGallery={handleAddGallery}
        onDeleteGallery={handleDeleteGallery}
        testimonials={testimonials}
        onApproveTestimonial={handleApproveTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        contact={contact}
        onUpdateContact={handleUpdateContact}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
