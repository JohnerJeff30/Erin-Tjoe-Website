import React, { useState } from 'react';
import { Quote, Star, Plus, CheckCircle2, ChevronLeft, ChevronRight, Send, X } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onSubmitTestimonial: (data: Omit<Testimonial, 'id' | 'approved' | 'created_at'>) => Promise<void>;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onSubmitTestimonial,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    authorName: '',
    authorTitle: '',
    company: '',
    quote: '',
    rating: 5,
  });

  const safeTestimonials = testimonials || [];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % (safeTestimonials.length || 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + (safeTestimonials.length || 1)) % (safeTestimonials.length || 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmitTestimonial(form);
      setSuccess(true);
      setForm({ authorName: '', authorTitle: '', company: '', quote: '', rating: 5 });
      setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
      }, 3000);
    } catch (err) {
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const current = safeTestimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            PRODUCER & EVENT REVIEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Industry Testimonials & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">Endorsements</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Feedback from festival executives, luxury cruise directors, and philanthropic organizers.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Showcase */}
        {safeTestimonials.length > 0 && current && (
          <div className="relative max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
            <Quote className="w-12 h-12 text-pink-500/20 absolute top-8 left-8" />

            <div className="relative z-10 text-center flex flex-col items-center">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-lg sm:text-2xl font-serif text-slate-100 italic leading-relaxed mb-8 max-w-3xl">
                "{current.quote}"
              </blockquote>

              {/* Author Details */}
              <div className="flex items-center gap-4">
                {current.avatarUrl ? (
                  <img
                    src={current.avatarUrl}
                    alt={current.authorName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white">
                    {current.authorName.charAt(0)}
                  </div>
                )}

                <div className="text-left">
                  <h4 className="text-base font-bold font-serif text-white">
                    {current.authorName}
                  </h4>
                  <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                    {current.authorTitle}
                  </p>
                  <p className="text-xs text-slate-400 font-light">
                    {current.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-slate-400">
                {activeIndex + 1} / {testimonials.length}
              </span>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Submit Testimonial CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Submit a Review / Endorsement</span>
          </button>
        </div>
      </div>

      {/* Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative text-slate-200 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white font-bold mb-2">
              Submit Your Testimonial
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Thank you for reviewing your experience working with Erin Tjoe. Submissions are reviewed prior to publishing.
            </p>

            {success ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <p className="font-bold text-base">Thank You!</p>
                <p className="text-xs">Your review has been submitted for admin moderation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.authorName}
                    onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                      Title / Role
                    </label>
                    <input
                      type="text"
                      value={form.authorTitle}
                      onChange={(e) => setForm({ ...form, authorTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
                      placeholder="e.g. Festival Producer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                      Company / Venue
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
                      placeholder="e.g. Coachella VIP"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Your Review / Quote *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none"
                    placeholder="Share details about Erin Tjoe's performance, professionalism, and audience impact..."
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
