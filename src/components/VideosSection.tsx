import React, { useState } from 'react';
import { Play, X, Video as VideoIcon, Sparkles } from 'lucide-react';
import { VideoItem } from '../types';

interface VideosSectionProps {
  videos: VideoItem[];
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            CINEMATIC PERFORMANCE GALLERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Watch Erin Tjoe <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">Live in Action</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            High-definition set captures, coronation highlights, festival mainstage sets, and live vocal performances.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(videos || []).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden hover:border-pink-500/40 transition duration-500 flex flex-col hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.2)]"
            >
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(236,72,153,0.6)] group-hover:scale-110 transition duration-300">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                {vid.duration && (
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded text-[10px] font-mono bg-black/80 border border-white/10 text-white">
                    {vid.duration}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-white mb-2 group-hover:text-pink-300 transition">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-zinc-900 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-pink-400" />
                <h3 className="text-sm font-bold font-serif text-white truncate max-w-md">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-zinc-900 text-slate-300 text-xs sm:text-sm font-light">
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
