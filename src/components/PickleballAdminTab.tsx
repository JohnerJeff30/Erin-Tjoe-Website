import React, { useState } from 'react';
import {
  Trophy,
  Save,
  Eye,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  Zap,
  Crosshair,
  Shield,
  MapPin,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import { PickleballProfile, WeaponStat, PickleballClinicFormat, RiderPhoto } from '../types';

interface PickleballAdminTabProps {
  initialProfile: PickleballProfile;
  onSave: (updated: PickleballProfile) => Promise<void>;
  showToast: (msg: string) => void;
  onPreviewModal: () => void;
}

export const PickleballAdminTab: React.FC<PickleballAdminTabProps> = ({
  initialProfile,
  onSave,
  showToast,
  onPreviewModal,
}) => {
  const [form, setForm] = useState<PickleballProfile>({
    ...initialProfile,
    weapons: initialProfile.weapons || [],
    formats: initialProfile.formats || [],
    tournamentRider: initialProfile.tournamentRider || [],
    hospitalityNotes: initialProfile.hospitalityNotes || [],
    riderPhotos: initialProfile.riderPhotos || [],
  });

  const [newRiderItem, setNewRiderItem] = useState('');
  const [newHospitalityItem, setNewHospitalityItem] = useState('');
  const [newPhoto, setNewPhoto] = useState({ url: '', title: '', caption: '' });
  const [newWeapon, setNewWeapon] = useState<Partial<WeaponStat>>({
    name: '',
    description: '',
    metric: '',
    icon: 'angles',
  });
  const [newFormat, setNewFormat] = useState<Partial<PickleballClinicFormat>>({
    title: '',
    description: '',
    badge: 'Clinic',
    duration: '2 Hours',
  });

  const handleSave = async () => {
    await onSave(form);
    showToast('Pickleball Pro profile & EPK saved successfully');
  };

  // Tournament Rider Handlers
  const handleAddRiderItem = () => {
    if (!newRiderItem.trim()) return;
    setForm({
      ...form,
      tournamentRider: [...(form.tournamentRider || []), newRiderItem.trim()],
    });
    setNewRiderItem('');
    showToast('Court rider requirement added');
  };

  const handleRemoveRiderItem = (index: number) => {
    const updated = (form.tournamentRider || []).filter((_, i) => i !== index);
    setForm({ ...form, tournamentRider: updated });
  };

  const handleUpdateRiderItem = (index: number, val: string) => {
    const updated = [...(form.tournamentRider || [])];
    updated[index] = val;
    setForm({ ...form, tournamentRider: updated });
  };

  // Hospitality Handlers
  const handleAddHospitalityItem = () => {
    if (!newHospitalityItem.trim()) return;
    setForm({
      ...form,
      hospitalityNotes: [...(form.hospitalityNotes || []), newHospitalityItem.trim()],
    });
    setNewHospitalityItem('');
    showToast('Hospitality note added');
  };

  const handleRemoveHospitalityItem = (index: number) => {
    const updated = (form.hospitalityNotes || []).filter((_, i) => i !== index);
    setForm({ ...form, hospitalityNotes: updated });
  };

  const handleUpdateHospitalityItem = (index: number, val: string) => {
    const updated = [...(form.hospitalityNotes || [])];
    updated[index] = val;
    setForm({ ...form, hospitalityNotes: updated });
  };

  // Photo Handlers
  const handleAddPhoto = () => {
    if (!newPhoto.url.trim()) return;
    const photoItem: RiderPhoto = {
      id: `pb-photo-${Date.now()}`,
      url: newPhoto.url.trim(),
      title: newPhoto.title.trim() || 'Court Reference',
      caption: newPhoto.caption.trim() || '',
    };
    setForm({
      ...form,
      riderPhotos: [...(form.riderPhotos || []), photoItem],
    });
    setNewPhoto({ url: '', title: '', caption: '' });
    showToast('Court reference photo added');
  };

  const handleRemovePhoto = (id: string) => {
    setForm({
      ...form,
      riderPhotos: (form.riderPhotos || []).filter((p) => p.id !== id),
    });
  };

  const handleUpdatePhoto = (id: string, updates: Partial<RiderPhoto>) => {
    setForm({
      ...form,
      riderPhotos: (form.riderPhotos || []).map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  // Weapon Handlers
  const handleAddWeapon = () => {
    if (!newWeapon.name?.trim()) return;
    const item: WeaponStat = {
      id: `weapon-${Date.now()}`,
      name: newWeapon.name.trim(),
      description: newWeapon.description?.trim() || '',
      metric: newWeapon.metric?.trim() || '98%',
      icon: (newWeapon.icon as any) || 'angles',
    };
    setForm({
      ...form,
      weapons: [...(form.weapons || []), item],
    });
    setNewWeapon({ name: '', description: '', metric: '', icon: 'angles' });
    showToast(`Weapon "${item.name}" added`);
  };

  const handleRemoveWeapon = (id: string) => {
    setForm({
      ...form,
      weapons: (form.weapons || []).filter((w) => w.id !== id),
    });
  };

  // Format Handlers
  const handleAddFormat = () => {
    if (!newFormat.title?.trim()) return;
    const item: PickleballClinicFormat = {
      id: `pb-format-${Date.now()}`,
      title: newFormat.title.trim(),
      description: newFormat.description?.trim() || '',
      badge: newFormat.badge?.trim() || 'Clinic',
      duration: newFormat.duration?.trim() || '2 Hours',
    };
    setForm({
      ...form,
      formats: [...(form.formats || []), item],
    });
    setNewFormat({ title: '', description: '', badge: 'Clinic', duration: '2 Hours' });
    showToast(`Format "${item.title}" added`);
  };

  const handleRemoveFormat = (id: string) => {
    setForm({
      ...form,
      formats: (form.formats || []).filter((f) => f.id !== id),
    });
  };

  // Preset Image URLs
  const presetPhotos = [
    { url: '/images/erin_pickleball_card.jpg', label: 'Pro Card (DadGum Sponsored)' },
    { url: '/images/erin_pickleball_court_action.jpg', label: 'Court Action & Stadium Net' },
    { url: '/images/hero.jpg', label: 'Hero Stage' },
    { url: '/images/profile.jpg', label: 'Studio Portrait' },
  ];

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">
              Pickleball Athlete EPK & Tournament Rider
            </h2>
          </div>
          <p className="text-xs text-amber-400/90 mt-1">
            Official DadGum Paddles sponsored pro profile, playstyle weapons, tournament rider specs, and event formats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPreviewModal}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Preview EPK</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Pickleball EPK</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ATHLETE & SPONSOR IDENTITY */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Athlete Brand & DadGum Paddles Sponsorship</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Athlete Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Title & Honors
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Official Sponsor Name
            </label>
            <input
              type="text"
              value={form.sponsor}
              onChange={(e) => setForm({ ...form, sponsor: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Ranking / Division Badge
            </label>
            <input
              type="text"
              value={form.rankingBadge}
              onChange={(e) => setForm({ ...form, rankingBadge: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
              placeholder="#01 RIGHT HAND COMPETITIVE"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Hometown & Base Location
            </label>
            <input
              type="text"
              value={form.hometown}
              onChange={(e) => setForm({ ...form, hometown: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
              placeholder="Castro Valley, California"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Primary Paddle Weapon
            </label>
            <input
              type="text"
              value={form.paddleWeapon}
              onChange={(e) => setForm({ ...form, paddleWeapon: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs"
              placeholder="DadGum Pro Carbon Elite 16mm Raw Carbon Face"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
            Athlete Bio & Competitive Philosophy
          </label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-black border border-white/10 text-white text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* SECTION 2: ATHLETE TRADING CARD & COURT ACTION IMAGES */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-5">
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>Athlete Card & Court Action Imagery</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card Image */}
          <div className="space-y-3 p-4 rounded-xl bg-black/60 border border-white/10">
            <span className="text-xs font-bold text-white block">Official Athlete Card Image</span>
            <div className="relative aspect-[3/4] max-w-[200px] mx-auto rounded-xl overflow-hidden bg-zinc-950 border border-amber-400/40 shadow-lg">
              <img
                src={form.cardImageUrl}
                alt="Card Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                Image URL / Path
              </label>
              <input
                type="text"
                value={form.cardImageUrl}
                onChange={(e) => setForm({ ...form, cardImageUrl: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Action Image */}
          <div className="space-y-3 p-4 rounded-xl bg-black/60 border border-white/10">
            <span className="text-xs font-bold text-white block">Tournament Court Action Image</span>
            <div className="relative aspect-video max-w-[280px] mx-auto rounded-xl overflow-hidden bg-zinc-950 border border-white/20 shadow-lg">
              <img
                src={form.actionImageUrl}
                alt="Action Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                Image URL / Path
              </label>
              <input
                type="text"
                value={form.actionImageUrl}
                onChange={(e) => setForm({ ...form, actionImageUrl: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets Picker */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Available Media Presets:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presetPhotos.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setForm({ ...form, cardImageUrl: preset.url });
                  showToast(`Selected: ${preset.label}`);
                }}
                className="p-2 rounded-xl bg-black/40 border border-white/10 hover:border-amber-400/60 transition text-left group"
              >
                <img src={preset.url} alt={preset.label} className="w-full h-16 object-cover rounded-lg mb-1" />
                <span className="text-[10px] text-slate-300 group-hover:text-amber-300 line-clamp-1">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: SIGNATURE WEAPONS */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Signature Play Weapons ({(form.weapons || []).length})</span>
          </h3>
        </div>

        {/* Existing Weapons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(form.weapons || []).map((w, idx) => (
            <div
              key={w.id}
              className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 relative group hover:border-amber-400/40 transition"
            >
              <button
                type="button"
                onClick={() => handleRemoveWeapon(w.id)}
                className="absolute top-2 right-2 p-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
                title="Remove Weapon"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2 pr-6">
                <input
                  type="text"
                  value={w.name}
                  onChange={(e) => {
                    const updated = [...(form.weapons || [])];
                    updated[idx] = { ...w, name: e.target.value };
                    setForm({ ...form, weapons: updated });
                  }}
                  className="font-bold text-white text-xs bg-transparent border-b border-white/10 focus:outline-none w-full"
                  placeholder="Weapon Name"
                />
              </div>
              <input
                type="text"
                value={w.metric || ''}
                onChange={(e) => {
                  const updated = [...(form.weapons || [])];
                  updated[idx] = { ...w, metric: e.target.value };
                  setForm({ ...form, weapons: updated });
                }}
                className="text-[10px] text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-white/10 w-full"
                placeholder="Metric e.g. 98% Precision"
              />
              <textarea
                rows={2}
                value={w.description}
                onChange={(e) => {
                  const updated = [...(form.weapons || [])];
                  updated[idx] = { ...w, description: e.target.value };
                  setForm({ ...form, weapons: updated });
                }}
                className="text-[11px] text-slate-300 bg-transparent border border-white/10 rounded-lg p-1.5 w-full leading-relaxed"
                placeholder="Tactical description"
              />
            </div>
          ))}
        </div>

        {/* Add New Weapon */}
        <div className="p-4 rounded-xl bg-black/40 border border-dashed border-white/15 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Add New Tactical Weapon
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={newWeapon.name || ''}
              onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
              placeholder="Name e.g. ATP Roll Winner"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <input
              type="text"
              value={newWeapon.metric || ''}
              onChange={(e) => setNewWeapon({ ...newWeapon, metric: e.target.value })}
              placeholder="Metric e.g. 99% Velocity"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <button
              type="button"
              onClick={handleAddWeapon}
              className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Weapon</span>
            </button>
          </div>
          <textarea
            rows={2}
            value={newWeapon.description || ''}
            onChange={(e) => setNewWeapon({ ...newWeapon, description: e.target.value })}
            placeholder="Detailed tactical breakdown of weapon execution"
            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
          />
        </div>
      </div>

      {/* SECTION 4: TOURNAMENT & EXHIBITION COURT RIDER */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Tournament & Exhibition Court Technical Rider</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {(form.tournamentRider || []).length} specs
          </span>
        </div>

        {/* Court Spec Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
              Court Dimensions
            </label>
            <input
              type="text"
              value={form.courtDimensions || ''}
              onChange={(e) => setForm({ ...form, courtDimensions: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-mono"
              placeholder="30 ft x 60 ft clear playing footprint"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
              Ball Specifications
            </label>
            <input
              type="text"
              value={form.ballSpecs || ''}
              onChange={(e) => setForm({ ...form, ballSpecs: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-mono"
              placeholder="Franklin X-40 / Dura Fast 40"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
              Net Specifications
            </label>
            <input
              type="text"
              value={form.netSpecs || ''}
              onChange={(e) => setForm({ ...form, netSpecs: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-mono"
              placeholder="USA Pickleball 36' post, 34' center"
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {(form.tournamentRider || []).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 group hover:border-amber-400/30 transition"
            >
              <span className="w-6 text-center text-xs font-mono text-amber-400 font-bold">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdateRiderItem(idx, e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-transparent text-white text-xs focus:bg-zinc-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveRiderItem(idx)}
                className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Item */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={newRiderItem}
            onChange={(e) => setNewRiderItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddRiderItem();
              }
            }}
            placeholder="e.g. 1 x Professional tournament-grade net system (36' sidelines, 34' center strap)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
          />
          <button
            type="button"
            onClick={handleAddRiderItem}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Spec</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Suggested Specs:</span>
          {[
            'Franklin X-40 Yellow Outdoor Tournament Balls (3 new cans)',
            'DadGum Paddles banner on center fence line',
            'Wireless lavalier headset with portable sound system for clinic coaching',
            'Shaded players bench and courtside hydration cooler',
          ].map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setForm({
                  ...form,
                  tournamentRider: [...(form.tournamentRider || []), preset],
                });
                showToast(`Added: ${preset}`);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 border border-white/10 text-[10px] text-slate-300 hover:text-amber-300 transition"
            >
              + {preset}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 5: HOSPITALITY & PLAYER CARE */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Hospitality, Hydration & VIP Staging Rider</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {(form.hospitalityNotes || []).length} notes
          </span>
        </div>

        {/* Notes List */}
        <div className="space-y-2">
          {(form.hospitalityNotes || []).map((note, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 group hover:border-amber-400/30 transition"
            >
              <span className="w-6 text-center text-xs font-mono text-amber-400 font-bold">
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

        {/* Add Note */}
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
            placeholder="e.g. Chilled coconut water, electrolyte powder packets, and fresh fruit"
            className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
          />
          <button
            type="button"
            onClick={handleAddHospitalityItem}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* SECTION 6: EXHIBITION & CLINIC FORMATS */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Exhibition & Clinic Formats ({(form.formats || []).length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(form.formats || []).map((fmt) => (
            <div
              key={fmt.id}
              className="p-4 rounded-xl bg-black/60 border border-white/10 relative group hover:border-amber-400/40 transition"
            >
              <button
                type="button"
                onClick={() => handleRemoveFormat(fmt.id)}
                className="absolute top-2 right-2 p-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
                title="Remove Format"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2 mb-1.5 pr-6">
                <span className="text-xs font-bold text-white">{fmt.title}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {fmt.badge && (
                  <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-semibold">
                    {fmt.badge}
                  </span>
                )}
                {fmt.duration && (
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {fmt.duration}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">{fmt.description}</p>
            </div>
          ))}
        </div>

        {/* Add New Format */}
        <div className="p-4 rounded-xl bg-black/40 border border-dashed border-white/15 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Add New Event Format
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={newFormat.title || ''}
              onChange={(e) => setNewFormat({ ...newFormat, title: e.target.value })}
              placeholder="Format Title e.g. Sunset Doubles Classic"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <input
              type="text"
              value={newFormat.badge || ''}
              onChange={(e) => setNewFormat({ ...newFormat, badge: e.target.value })}
              placeholder="Badge e.g. Exhibition / Pro-Am"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <input
              type="text"
              value={newFormat.duration || ''}
              onChange={(e) => setNewFormat({ ...newFormat, duration: e.target.value })}
              placeholder="Duration e.g. 2 - 3 Hours"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
          </div>
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={newFormat.description || ''}
              onChange={(e) => setNewFormat({ ...newFormat, description: e.target.value })}
              placeholder="Format description and attendee experience"
              className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <button
              type="button"
              onClick={handleAddFormat}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Format</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 7: RIDER REFERENCE PHOTOS */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Court Setup & EPK Reference Photos ({(form.riderPhotos || []).length})</span>
          </h3>
        </div>

        {/* Existing Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(form.riderPhotos || []).map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl bg-black/70 border border-white/10 p-3 space-y-2 flex flex-col justify-between group hover:border-amber-400/40 transition"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white shadow-md transition"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={photo.title || ''}
                  onChange={(e) => handleUpdatePhoto(photo.id, { title: e.target.value })}
                  placeholder="Photo Title"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs font-semibold"
                />
                <textarea
                  rows={2}
                  value={photo.caption || ''}
                  onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                  placeholder="Caption / Notes"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-slate-300 text-[11px]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Photo */}
        <div className="p-4 rounded-xl bg-black/40 border border-dashed border-white/15 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Add Setup Photo Reference
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={newPhoto.url}
              onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              placeholder="Photo URL /path"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-mono"
            />
            <input
              type="text"
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
              placeholder="Title e.g. DadGum Court Net & Post Setup"
              className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
              placeholder="Caption details"
              className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs"
            />
            <button
              type="button"
              onClick={handleAddPhoto}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Save Action Bar */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <button
          type="button"
          onClick={onPreviewModal}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition"
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>Live Preview Pickleball EPK</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition transform active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save All Pickleball Changes</span>
        </button>
      </div>
    </div>
  );
};
