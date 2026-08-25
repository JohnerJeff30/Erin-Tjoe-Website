import React, { useState } from 'react';
import { Play, Pause, Disc, ExternalLink, Music2, Radio, Sparkles } from 'lucide-react';
import { MusicTrack } from '../types';

interface MusicSectionProps {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  onPlayTrack: (track: MusicTrack) => void;
  onTogglePlay: () => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
}) => {
  return (
    <section id="music" className="py-24 bg-black text-white relative border-t border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-pink-400 uppercase">
            ORIGINAL DISCOGRAPHY & REMIXES
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2">
            Celestial Sound & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Live Vocal Anthems</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light">
            Stream original tracks, live vocal mixes, and festival anthems available across all global platforms.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Featured Player Highlight Card */}
        {tracks.length > 0 && (
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-purple-950/40 to-zinc-900 border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
              {/* Cover Art */}
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={currentTrack ? currentTrack.albumCoverUrl : tracks[0].albumCoverUrl}
                  alt={currentTrack ? currentTrack.title : tracks[0].title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    const target = currentTrack || tracks[0];
                    if (currentTrack?.id === target.id) {
                      onTogglePlay();
                    } else {
                      onPlayTrack(target);
                    }
                  }}
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl hover:scale-110 transition">
                    {isPlaying && currentTrack?.id === (currentTrack ? currentTrack.id : tracks[0].id) ? (
                      <Pause className="w-8 h-8 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                  </div>
                </button>
              </div>

              {/* Track Info & Controls */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NOW FEATURING</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-serif text-white">
                  {currentTrack ? currentTrack.title : tracks[0].title}
                </h3>

                <p className="text-xs tracking-widest text-purple-300 uppercase font-semibold">
                  {currentTrack ? currentTrack.artist : tracks[0].artist} • {currentTrack ? currentTrack.genre : tracks[0].genre}
                </p>

                <p className="text-slate-300 text-sm font-light max-w-2xl leading-relaxed">
                  {currentTrack ? currentTrack.description : tracks[0].description}
                </p>

                {/* Streaming Links */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href={(currentTrack || tracks[0]).spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={(currentTrack || tracks[0]).appleMusicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
                  >
                    <span>Apple Music</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={(currentTrack || tracks[0]).soundcloudUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-orange-950/60 hover:bg-orange-900/80 border border-orange-500/30 text-orange-300 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
                  >
                    <span>SoundCloud</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={(currentTrack || tracks[0]).mixcloudUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
                  >
                    <span>Mixcloud</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Music List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(tracks || []).map((track) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-pink-500/30 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-black">
                    <img
                      src={track.albumCoverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <button
                      onClick={() => {
                        if (isThisPlaying) {
                          onTogglePlay();
                        } else {
                          onPlayTrack(track);
                        }
                      }}
                      className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                        {isThisPlaying ? (
                          <Pause className="w-6 h-6 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 fill-current ml-1" />
                        )}
                      </div>
                    </button>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                      {track.duration}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-white mb-1">
                    {track.title}
                  </h4>
                  <p className="text-xs text-amber-300 font-semibold mb-2">
                    {track.genre}
                  </p>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                    {track.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="text-pink-400 hover:text-pink-300 font-semibold tracking-wider uppercase text-[11px] flex items-center gap-1.5"
                  >
                    <Music2 className="w-3.5 h-3.5" />
                    <span>{isThisPlaying ? 'Playing' : 'Play Track'}</span>
                  </button>

                  <div className="flex gap-2">
                    <a href={track.spotifyUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400" title="Spotify">
                      <Disc className="w-4 h-4" />
                    </a>
                    <a href={track.soundcloudUrl} target="_blank" rel="noreferrer" className="hover:text-orange-400" title="SoundCloud">
                      <Radio className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
