import React, { useState } from 'react';
import { Calendar, Send, CheckCircle2, DollarSign, MapPin, Users, Mail, Phone, Building, MessageSquare, Sparkles } from 'lucide-react';
import { BookingInquiry } from '../types';

interface BookingSectionProps {
  onSubmitBooking: (booking: Omit<BookingInquiry, 'id' | 'status' | 'created_at'>) => Promise<void>;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onSubmitBooking }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventType: 'Festival / Mainstage',
    eventDate: '',
    location: '',
    budget: '$10,000 - $20,000',
    guestCount: '500 - 2,000',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmitBooking(form);
      setSuccess(true);
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        eventType: 'Festival / Mainstage',
        eventDate: '',
        location: '',
        budget: '$10,000 - $20,000',
        guestCount: '500 - 2,000',
        message: '',
      });
    } catch (err) {
      alert('Booking submission failed. Please check network connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-black text-white relative border-t border-purple-900/20">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-900/10 via-purple-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOBAL INQUIRIES & BOOKING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300">Erin Tjoe</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Available for festivals, luxury resorts, cruise sailings, corporate galas, and high-fashion activations worldwide.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-purple-500/30 shadow-[0_0_50px_rgba(236,72,153,0.15)] backdrop-blur-xl">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Booking Inquiry Received
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you for your interest in Erin Tjoe. Our management team will review your event details and respond within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Aura Luxury Events"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="v.sterling@auraluxury.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (310) 555-0192"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Row 3: Event Type & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Performance Format / Event Type
                  </label>
                  <select
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                  >
                    <option value="DJ + Live Vocals (Signature)">DJ + Live Vocals (Signature)</option>
                    <option value="High-Energy DJ Set">High-Energy DJ Set</option>
                    <option value="Host / Featured Artist">Host / Featured Artist</option>
                    <option value="Festival / Mainstage">Festival / Mainstage</option>
                    <option value="Cruise / Ocean Resort">Cruise / Ocean Resort</option>
                    <option value="Charity & Gala Event">Charity & Gala Event</option>
                    <option value="Private VIP Luxury Event">Private VIP Luxury Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Event Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Row 4: Location, Budget, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    City / Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Cabo San Lucas"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                      <option value="$20,000 - $35,000">$20,000 - $35,000</option>
                      <option value="$35,000+">$35,000+</option>
                    </select>
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                    Estimated Guests
                  </label>
                  <div className="relative">
                    <select
                      value={form.guestCount}
                      onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                    >
                      <option value="Under 250">Under 250</option>
                      <option value="250 - 500">250 - 500</option>
                      <option value="500 - 2,000">500 - 2,000</option>
                      <option value="2,000+">2,000+</option>
                    </select>
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
                  Event Details & Production Notes *
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your venue, production stage setup, set length, and desired format..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none transition"
                  />
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition duration-300 flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Inquiry...' : 'Send Booking Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
