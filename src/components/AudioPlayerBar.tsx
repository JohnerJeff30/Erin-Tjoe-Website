import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Disc, Sparkles } from 'lucide-react';
import { MusicTrack } from '../types';

interface AudioPlayerBarProps {
  track: MusicTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track]);

  if (!track) return null;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-purple-500/30 p-3 sm:p-4 shadow-[0_-10px_30px_rgba(139,92,246,0.2)] animate-in slide-in-from-bottom duration-300">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onTogglePlay()}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <img
            src={track.albumCoverUrl}
            alt={track.title}
            className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
          />
          <div className="truncate">
            <h4 className="text-sm font-bold text-white truncate font-serif">
              {track.title}
            </h4>
            <p className="text-xs text-pink-400 truncate">
              {track.artist} • {track.genre}
            </p>
          </div>
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="flex-1 max-w-xl w-full flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-400 hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
