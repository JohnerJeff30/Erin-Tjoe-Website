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
import { PickleballSection } from './components/PickleballSection';
import { PickleballEPKModal } from './components/PickleballEPKModal';
import { DualEPKRidersSection } from './components/DualEPKRidersSection';

import { apiFetch } from './lib/supabase';
import {
  initialHeroContent,
  initialArtistProfile,
  initialPickleballProfile,
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
  PickleballProfile,
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
  const [pickleballProfile, setPickleballProfile] = useState<PickleballProfile>(initialPickleballProfile);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [music, setMusic] = useState<MusicTrack[]>(initialMusicTracks);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideoItems);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGalleryItems);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [bookings, setBookings] = useState<BookingInquiry[]>(initialBookings);
  const [contact, setContact] = useState<ContactInfo>(initialContactInfo);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);

  // EPK Modals State
  const [musicEPKOpen, setMusicEPKOpen] = useState<boolean>(false);
  const [pickleballEPKOpen, setPickleballEPKOpen] = useState<boolean>(false);

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
            riderPhotos: p.riderPhotos || initialArtistProfile.riderPhotos,
            riderTitle: p.riderTitle || initialArtistProfile.riderTitle,
            riderIntro: p.riderIntro || initialArtistProfile.riderIntro,
            stageDimensions: p.stageDimensions || initialArtistProfile.stageDimensions,
            powerRequirements: p.powerRequirements || initialArtistProfile.powerRequirements,
          });
        }

        const pb = await apiFetch<PickleballProfile>('/pickleball-profile').catch(() => null);
        if (pb && pb.name) {
          setPickleballProfile({
            ...initialPickleballProfile,
            ...pb,
            weapons: pb.weapons || initialPickleballProfile.weapons,
            formats: pb.formats || initialPickleballProfile.formats,
            tournamentRider: pb.tournamentRider || initialPickleballProfile.tournamentRider,
            hospitalityNotes: pb.hospitalityNotes || initialPickleballProfile.hospitalityNotes,
            riderPhotos: pb.riderPhotos || initialPickleballProfile.riderPhotos,
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

  const handleUpdatePickleballProfile = async (updated: PickleballProfile) => {
    const res = await apiFetch<PickleballProfile>('/pickleball-profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(updated),
    });
    setPickleballProfile(res);
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
        onOpenMusicEPK={() => setMusicEPKOpen(true)}
        onOpenPickleballEPK={() => setPickleballEPKOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection content={hero} />

      {/* About & Artist Profile Section */}
      <AboutSection
        profile={profile}
        isRiderOpen={musicEPKOpen}
        onOpenRider={() => setMusicEPKOpen(true)}
        onCloseRider={() => setMusicEPKOpen(false)}
        onOpenPickleballEPK={() => {
          setMusicEPKOpen(false);
          setPickleballEPKOpen(true);
        }}
      />

      {/* Pro Pickleball Athlete & DadGum Paddle Section */}
      <PickleballSection
        profile={pickleballProfile}
        onOpenEPK={() => setPickleballEPKOpen(true)}
      />

      {/* Official Dual EPK Technical & Tournament Riders Section */}
      <DualEPKRidersSection
        artistProfile={profile}
        pickleballProfile={pickleballProfile}
        onOpenMusicEPK={() => setMusicEPKOpen(true)}
        onOpenPickleballEPK={() => setPickleballEPKOpen(true)}
      />

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

      {/* Pickleball Athlete EPK & Tournament Rider Modal */}
      <PickleballEPKModal
        isOpen={pickleballEPKOpen}
        onClose={() => setPickleballEPKOpen(false)}
        profile={pickleballProfile}
        onSwitchToMusicEPK={() => {
          setPickleballEPKOpen(false);
          setMusicEPKOpen(true);
        }}
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
        pickleballProfile={pickleballProfile}
        onUpdatePickleballProfile={handleUpdatePickleballProfile}
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

      {/* Floating Quick-Access Admin Portal Button */}
      <button
        type="button"
        onClick={handleOpenAdminTrigger}
        className="fixed bottom-24 right-4 z-40 px-3.5 py-2 rounded-full bg-black/90 hover:bg-zinc-900 border border-purple-500/40 hover:border-pink-500/60 text-slate-200 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 transition hover:scale-105 group"
        title={adminToken ? "Admin CMS Active" : "Admin Login (Default key: admin123)"}
      >
        <div className={`w-2 h-2 rounded-full ${adminToken ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-pink-500 animate-pulse'}`} />
        <span className="text-[11px] font-mono tracking-tight">{adminToken ? 'CMS Active' : 'Admin CMS'}</span>
      </button>
    </div>
  );
}
