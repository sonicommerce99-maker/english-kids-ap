import React, { useState } from 'react';
import {
  ExternalLink,
  Youtube,
  BookOpen,
  Clock,
  Link2,
  Check,
  Subtitles
} from 'lucide-react';
import { RealVideoEpisode } from '../data/realVideoCatalog';

interface RealVideoPlayerProps {
  episode: RealVideoEpisode;
  customYoutubeId?: string;
  onSaveCustomYoutubeUrl: (episodeId: number, youtubeId: string) => void;
  onJumpToGrammarRule: (ruleId: string) => void;
}

function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export const RealVideoPlayer: React.FC<RealVideoPlayerProps> = ({
  episode,
  customYoutubeId,
  onSaveCustomYoutubeUrl,
  onJumpToGrammarRule
}) => {
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const activeYoutubeId = customYoutubeId || episode.realVideo.youtubeId;
  // Enforces exact 15-20 minute session window via start=0&end=clipEndSeconds and turns on official YouTube English Subtitles (cc_load_policy=1&cc_lang_pref=en)
  const embedSrc = `https://www.youtube.com/embed/${activeYoutubeId}?rel=0&cc_load_policy=1&cc_lang_pref=en&hl=en&start=${episode.realVideo.clipStartSeconds}&end=${episode.realVideo.clipEndSeconds}`;
  const directWatchUrl = `https://www.youtube.com/watch?v=${activeYoutubeId}`;

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = extractYoutubeId(urlInput);
    if (parsedId) {
      onSaveCustomYoutubeUrl(episode.id, parsedId);
      setShowCustomUrlInput(false);
      setUrlInput('');
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
      {/* Top Info Bar with BOTH Grammar Rules */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-num font-bold text-amber-400">
            VIDEO #{episode.id < 10 ? `0${episode.id}` : episode.id} / 100
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-white">Level {episode.level} (Age 9)</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono-num font-semibold">
            <Clock className="w-3.5 h-3.5" />
            {episode.durationFormatted} mins Session
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-300 font-semibold">
            {episode.realVideo.channelName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onJumpToGrammarRule(episode.grammarRuleId)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            title="Open Grammar Rule #1 in Grammar Lab"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rule 1: {episode.grammarTopicTitle.split('(')[0].trim()}</span>
          </button>

          <button
            onClick={() => onJumpToGrammarRule(episode.secondaryGrammarRuleId)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            title="Open Grammar Rule #2 in Grammar Lab"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rule 2: {episode.secondaryGrammarTopicTitle.split('(')[0].trim()}</span>
          </button>

          <button
            onClick={() => setShowCustomUrlInput((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
            title="Paste any custom YouTube URL for this episode"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Change YouTube Link</span>
          </button>

          {customYoutubeId && customYoutubeId !== episode.realVideo.youtubeId && (
            <button
              onClick={() => onSaveCustomYoutubeUrl(episode.id, episode.realVideo.youtubeId)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-bold whitespace-nowrap cursor-pointer"
              title="Reset to verified default video"
            >
              <span>Reset Video</span>
            </button>
          )}
        </div>
      </div>

      {/* Optional Custom YouTube URL Bar */}
      {showCustomUrlInput && (
        <form
          onSubmit={handleApplyCustomUrl}
          className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center gap-2"
        >
          <span className="text-xs font-semibold text-slate-300">
            Paste any YouTube Link or 11-char Video ID for Episode #{episode.id}:
          </span>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... or Video ID"
            className="flex-1 min-w-[220px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Video Link</span>
          </button>
        </form>
      )}

      {/* REAL 16:9 YOUTUBE PLAYER WITH OFFICIAL ENGLISH SUBTITLES [CC] & 15-20M AUTO-STOP */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          key={`${activeYoutubeId}-${episode.id}`}
          src={embedSrc}
          title={`Episode ${episode.id}: ${episode.title}`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Clean Footer Bar: Official YouTube CC Status + Direct YouTube Links */}
      <div className="bg-slate-950 px-4 sm:px-5 py-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
          <Subtitles className="w-4 h-4 shrink-0" />
          <span>
            Official YouTube English Subtitles [CC] Active · Auto-stops at {episode.durationFormatted} mins
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors whitespace-nowrap"
          >
            <Youtube className="w-4 h-4" />
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={episode.realVideo.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <span>More on {episode.realVideo.topicCategory}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
