import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Live Sets', 'Editorial', 'Red Carpet', 'Behind the Scenes'];

  const safeGallery = gallery || [];
  const filtered = activeCategory === 'All'
    ? safeGallery
    : safeGallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-black text-white relative border-t border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            EDITORIAL & HIGH-FASHION VISUALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Photo Gallery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Visual Identity</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            High-fashion imagery, live festival stages, red carpet moments, and behind-the-scenes press photos.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                  : 'bg-zinc-900 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-pink-500/40 transition duration-500 shadow-xl"
            >
              <div className="aspect-square sm:aspect-auto sm:h-72 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold font-serif text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-light line-clamp-2">
                  {item.caption}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 p-3 text-slate-300 hover:text-white rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-6 text-center max-w-xl">
              <span className="text-xs uppercase tracking-widest font-bold text-pink-400">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-slate-300 font-light mt-2">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
