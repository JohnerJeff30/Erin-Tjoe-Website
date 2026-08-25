import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Resort & Cruise', 'Festival', 'Private & Luxury', 'Charity & Community'];

  const safeExperiences = experiences || [];
  const filtered = filter === 'All'
    ? safeExperiences
    : safeExperiences.filter((exp) => exp.category === filter);

  return (
    <section id="experience" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            SELECTED EXPERIENCE & HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Global Stages & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">Curated Venues</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Performing across world-renowned festivals, luxury ocean sailings, private desert retreats, and philanthropic galas.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                  : 'bg-zinc-900 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden hover:border-purple-500/40 transition-all duration-500 flex flex-col hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]"
            >
              {/* Card Image */}
              <div className="relative h-52 w-full overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md border border-white/10 text-pink-300">
                  {item.category}
                </span>

                {item.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-serif text-white mb-2 group-hover:text-pink-300 transition">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                    <div className="flex items-center gap-1 text-purple-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                    {item.date && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
