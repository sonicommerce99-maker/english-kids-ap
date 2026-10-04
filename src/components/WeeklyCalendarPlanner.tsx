import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Play,
  ExternalLink
} from 'lucide-react';
import { REAL_VIDEO_EPISODES, RealVideoEpisode } from '../data/realVideoCatalog';

interface WeeklyCalendarPlannerProps {
  startDate: string; // YYYY-MM-DD
  studyDaysPattern: string; // 'Mon-Wed-Fri' | 'Tue-Thu-Sat' | 'Wed-Sat-Sun'
  onUpdateScheduleSettings: (newStartDate: string, newPattern: string) => void;
  episodeScores: Record<number, number>;
  onSelectEpisodeToWatch: (episodeId: number) => void;
}

const DAY_OFFSETS: Record<string, [number, number, number]> = {
  'Mon-Wed-Fri': [0, 2, 4],
  'Tue-Thu-Sat': [1, 3, 5],
  'Wed-Sat-Sun': [2, 5, 6]
};

const DAY_LABELS: Record<string, [string, string, string]> = {
  'Mon-Wed-Fri': ['Monday', 'Wednesday', 'Friday'],
  'Tue-Thu-Sat': ['Tuesday', 'Thursday', 'Saturday'],
  'Wed-Sat-Sun': ['Wednesday', 'Saturday', 'Sunday']
};

function addDaysToIsoDate(baseIso: string, daysToAdd: number): string {
  const parts = baseIso.split('-').map(Number);
  const dt = new Date(parts[0] || 2026, (parts[1] || 10) - 1, parts[2] || 5);
  dt.setDate(dt.getDate() + daysToAdd);
  return dt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export const WeeklyCalendarPlanner: React.FC<WeeklyCalendarPlannerProps> = ({
  startDate,
  studyDaysPattern,
  onUpdateScheduleSettings,
  episodeScores,
  onSelectEpisodeToWatch
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'week' | 'all34'>('all34');

  const offsets = DAY_OFFSETS[studyDaysPattern] || DAY_OFFSETS['Mon-Wed-Fri'];
  const dayNames = DAY_LABELS[studyDaysPattern] || DAY_LABELS['Mon-Wed-Fri'];

  // Group 100 episodes into 34 weeks (3 videos per week; Week 34 has Episode #100)
  const weeksList = useMemo(() => {
    const map = new Map<number, RealVideoEpisode[]>();
    for (let w = 1; w <= 34; w++) {
      map.set(w, []);
    }
    REAL_VIDEO_EPISODES.forEach((ep) => {
      const list = map.get(ep.weekNumber) || [];
      list.push(ep);
      map.set(ep.weekNumber, list);
    });
    return Array.from(map.entries());
  }, []);

  const displayedWeeks =
    viewMode === 'all34'
      ? weeksList
      : weeksList.filter(([w]) => w === selectedWeek);

  return (
    <div className="space-y-8">
      {/* Top Schedule Header & Controls */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono-num text-amber-400 font-bold">
              3 VIDEOS PER WEEK CALENDAR · 34 WEEKS TOTAL · 100 VIDEOS (15–20 MINS EACH)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              3-Videos-Per-Week Interactive Study Calendar
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Follow a structured 3-videos-per-week rhythm (~45–60 minutes of English per week). Weeks 1 to 17 cover **Level L3 (Episodes 1–50)**, and Weeks 18 to 34 cover **Level L4 (Episodes 51–100)**.
            </p>
          </div>

          {/* Schedule Date & Days Customization */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                START DATE (WEEK 1)
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  onUpdateScheduleSettings(e.target.value, studyDaysPattern)
                }
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-num text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                3 DAYS / WEEK RHYTHM
              </label>
              <select
                value={studyDaysPattern}
                onChange={(e) =>
                  onUpdateScheduleSettings(startDate, e.target.value)
                }
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Mon-Wed-Fri">Mon · Wed · Fri (Lun / Mer / Ven)</option>
                <option value="Tue-Thu-Sat">Tue · Thu · Sat (Mar / Jeu / Sam)</option>
                <option value="Wed-Sat-Sun">Wed · Sat · Sun (Mer / Sam / Dim)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Bar: All 34 Weeks vs Single Week Selector */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('all34')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'all34'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Show Full 34-Week Calendar (100 Videos)
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Focus on Single Week (Week #{selectedWeek})
            </button>
          </div>

          {viewMode === 'week' && (
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {Array.from({ length: 34 }, (_, i) => i + 1).map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-num font-bold cursor-pointer ${
                    selectedWeek === w
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  W{w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Calendar Weeks Grid (3 Video Cards per Week) */}
      <div className="space-y-6">
        {displayedWeeks.map(([weekNum, episodes]) => {
          const weekCompletedCount = episodes.filter(
            (e) => episodeScores[e.id] !== undefined
          ).length;

          return (
            <div
              key={weekNum}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Week {weekNum} of 34 · Level {episodes[0]?.level}
                  </h2>
                  <span className="text-xs text-slate-500">
                    · Grammar Focus: {episodes[0]?.grammarTopicTitle}
                  </span>
                </div>

                <div className="text-xs font-mono-num font-bold text-emerald-700">
                  {weekCompletedCount} / {episodes.length} Videos Completed
                </div>
              </div>

              {/* 3 Video Slots for This Week */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {episodes.map((ep, slotIdx) => {
                  const totalDaysOffset = (weekNum - 1) * 7 + offsets[slotIdx];
                  const formattedDate = addDaysToIsoDate(startDate, totalDaysOffset);
                  const score = episodeScores[ep.id];
                  const isDone = score !== undefined;

                  return (
                    <div
                      key={ep.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-colors ${
                        isDone
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : 'bg-slate-50/70 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <div>
                        {/* Calendar Date & Day Header */}
                        <div className="flex items-center justify-between text-xs font-mono-num text-slate-600 pb-2 border-b border-slate-200/70">
                          <span className="font-bold text-slate-900">
                            {dayNames[slotIdx].split('(')[0].trim()}
                          </span>
                          <span className="text-amber-800 font-bold">{formattedDate}</span>
                        </div>

                        {/* Episode Meta */}
                        <div className="flex items-center justify-between text-xs font-mono-num mt-2.5">
                          <span className="font-bold text-amber-700">
                            Video #{ep.id < 10 ? `0${ep.id}` : ep.id} · Level {ep.level}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            {ep.durationFormatted}m
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {ep.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {ep.realVideo.channelName}
                        </p>
                        <p className="text-[11px] font-semibold text-amber-800 mt-1">
                          Rule 1: {ep.grammarTopicTitle.split('(')[0].trim()} · Rule 2: {ep.secondaryGrammarTopicTitle.split('(')[0].trim()}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectEpisodeToWatch(ep.id)}
                          className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-amber-400" />
                          <span>Watch & Answer 10 Qs</span>
                        </button>

                        <a
                          href={ep.realVideo.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors"
                          title="Open Direct YouTube Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {isDone && (
                          <span className="px-2 py-1 rounded bg-emerald-600 text-white font-mono-num text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {score}/10
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
