import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Youtube,
  BookOpen,
  Clock,
  Link2,
  Check,
  Subtitles,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { RealVideoEpisode } from '../data/realVideoCatalog';

export interface VideoCommandTrigger {
  action: 'play' | 'pause' | 'mute' | 'unmute' | 'restart' | 'forward' | 'backward';
  timestamp: number;
}

interface RealVideoPlayerProps {
  episode: RealVideoEpisode;
  customYoutubeId?: string;
  videoCommand?: VideoCommandTrigger | null;
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
  videoCommand,
  onSaveCustomYoutubeUrl,
  onJumpToGrammarRule
}) => {
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const activeYoutubeId = customYoutubeId || episode.realVideo.youtubeId;
  // enablejsapi=1 allows our TV Voice Controller to Play, Pause, Mute, Unmute, and Restart the YouTube video!
  const embedSrc = `https://www.youtube.com/embed/${activeYoutubeId}?enablejsapi=1&rel=0&cc_load_policy=1&cc_lang_pref=en&hl=en`;
  const directWatchUrl = `https://www.youtube.com/watch?v=${activeYoutubeId}`;

  const sendYoutubeCommand = (func: string, args: any[] = []) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args
      }),
      '*'
    );
  };

  useEffect(() => {
    if (!videoCommand) return;
    switch (videoCommand.action) {
      case 'play':
        sendYoutubeCommand('playVideo');
        break;
      case 'pause':
        sendYoutubeCommand('pauseVideo');
        break;
      case 'mute':
        sendYoutubeCommand('mute');
        break;
      case 'unmute':
        sendYoutubeCommand('unMute');
        break;
      case 'restart':
        sendYoutubeCommand('seekTo', [0, true]);
        sendYoutubeCommand('playVideo');
        break;
      case 'forward':
        sendYoutubeCommand('playVideo');
        break;
      case 'backward':
        sendYoutubeCommand('seekTo', [0, true]);
        break;
    }
  }, [videoCommand]);

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
      {/* Top Info Bar with Single Grammar Lesson */}
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
            {episode.durationFormatted} mins
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-300 font-semibold">
            {episode.realVideo.channelName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onJumpToGrammarRule(episode.grammarRuleId)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            title="Open Grammar Lesson in Grammar Lab"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grammar Lesson: {episode.grammarTopicTitle.split('(')[0].trim()}</span>
          </button>

          <button
            onClick={() => setShowCustomUrlInput((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
            title="Paste or speak a custom YouTube URL for this episode"
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
            Paste or Speak YouTube Link / ID for Episode #{episode.id}:
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

      {/* REAL 16:9 YOUTUBE PLAYER WITH VOICE API & OFFICIAL ENGLISH SUBTITLES [CC] */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          ref={iframeRef}
          key={`${activeYoutubeId}-${episode.id}`}
          src={embedSrc}
          title={`Episode ${episode.id}: ${episode.title}`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Clean Footer Bar: Big TV Remote Buttons + Official YouTube CC Status */}
      <div className="bg-slate-950 px-4 sm:px-5 py-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => sendYoutubeCommand('playVideo')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer focus:ring-2 focus:ring-white"
          >
            <Play className="w-4 h-4" />
            <span>▶️ Play Video (or say "Play")</span>
          </button>

          <button
            onClick={() => sendYoutubeCommand('pauseVideo')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer focus:ring-2 focus:ring-white"
          >
            <Pause className="w-4 h-4" />
            <span>⏸️ Pause (or say "Pause")</span>
          </button>

          <button
            onClick={() => {
              sendYoutubeCommand('seekTo', [0, true]);
              sendYoutubeCommand('playVideo');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mr-2">
            <Subtitles className="w-4 h-4 shrink-0" />
            <span>English [CC] Active · {episode.durationFormatted}m</span>
          </span>

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
        </div>
      </div>
    </div>
  );
};
