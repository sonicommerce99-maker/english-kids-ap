/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Youtube,
  LogIn,
  LogOut
} from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType
} from './lib/firebase';
import { WorldZoneId } from './data/curriculum';
import { REAL_VIDEO_EPISODES } from './data/realVideoCatalog';
import { ZONES } from './data/episodeSeedsPart1';
import { RealVideoPlayer, VideoCommandTrigger } from './components/RealVideoPlayer';
import { EpisodeQuiz, VoiceQuizCommand } from './components/EpisodeQuiz';
import { GrammarLabTab } from './components/GrammarLabTab';
import { WeeklyCalendarPlanner } from './components/WeeklyCalendarPlanner';
import { StackSetupHub } from './components/StackSetupHub';
import { VoiceTvController } from './components/VoiceTvController';

type ActiveTab = 'videos' | 'calendar' | 'grammar' | 'stack';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('videos');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number>(1);
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'L3' | 'L4'>('ALL');
  const [zoneFilter, setZoneFilter] = useState<'ALL' | WorldZoneId>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [grammarTargetRuleId, setGrammarTargetRuleId] = useState<string | null>(null);

  // Smart TV Voice & Remote Control State
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(1);
  const [videoCommand, setVideoCommand] = useState<VideoCommandTrigger | null>(null);
  const [voiceQuizCommand, setVoiceQuizCommand] = useState<VoiceQuizCommand | null>(null);

  // Schedule & Scores State (Synced with Cloud Firestore + Local fallback)
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('2026-10-05');
  const [studyDaysPattern, setStudyDaysPattern] = useState<string>('Mon-Wed-Fri');
  const [episodeScores, setEpisodeScores] = useState<Record<number, number>>(() => {
    try {
      const raw = localStorage.getItem('real_english_video_scores_v2');
      return raw ? JSON.parse(raw) : { 1: 10 };
    } catch {
      return { 1: 10 };
    }
  });
  const [customYoutubeIds, setCustomYoutubeIds] = useState<Record<number, string>>(() => {
    try {
      const raw = localStorage.getItem('real_english_custom_yt_v2');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Track Firebase Auth State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Real-time Firestore listener when signed in
  useEffect(() => {
    if (!authReady || !user) return;
    const docRef = doc(db, 'userProgress', user.uid);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.startDate) setStartDate(data.startDate);
          if (data.studyDays) setStudyDaysPattern(data.studyDays);
          if (data.scoresMap) setEpisodeScores(data.scoresMap);
          if (data.customYoutubeIds) setCustomYoutubeIds(data.customYoutubeIds);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `userProgress/${user.uid}`);
      }
    );
    return () => unsub();
  }, [authReady, user]);

  // Save helper (saves both to localStorage and Cloud Firestore if signed in)
  const persistUserProgress = async (
    nextScores: Record<number, number>,
    nextCustomYt: Record<number, string>,
    nextStartDate: string,
    nextStudyDays: string
  ) => {
    try {
      localStorage.setItem('real_english_video_scores_v2', JSON.stringify(nextScores));
      localStorage.setItem('real_english_custom_yt_v2', JSON.stringify(nextCustomYt));
    } catch {
      // ignore local storage errors
    }

    if (user) {
      const path = `userProgress/${user.uid}`;
      const completedCount = Math.min(100, Object.keys(nextScores).length);
      const totalStars = Math.min(
        1000,
        Object.values(nextScores).reduce((sum, v) => sum + v, 0)
      );

      try {
        await setDoc(doc(db, 'userProgress', user.uid), {
          userId: user.uid,
          startDate: nextStartDate.slice(0, 30),
          studyDays: nextStudyDays.slice(0, 40),
          completedEpisodesCount: completedCount,
          totalStars,
          scoresMap: nextScores,
          customYoutubeIds: nextCustomYt,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    }
  };

  const handleSaveScore = (episodeId: number, score: number) => {
    const existing = episodeScores[episodeId] ?? 0;
    const updatedScores = {
      ...episodeScores,
      [episodeId]: Math.max(existing, score)
    };
    setEpisodeScores(updatedScores);
    persistUserProgress(updatedScores, customYoutubeIds, startDate, studyDaysPattern);
  };

  const handleSaveCustomYoutubeUrl = (episodeId: number, youtubeId: string) => {
    const updatedYt = {
      ...customYoutubeIds,
      [episodeId]: youtubeId
    };
    setCustomYoutubeIds(updatedYt);
    persistUserProgress(episodeScores, updatedYt, startDate, studyDaysPattern);
  };

  const handleUpdateScheduleSettings = (newStartDate: string, newPattern: string) => {
    setStartDate(newStartDate);
    setStudyDaysPattern(newPattern);
    persistUserProgress(episodeScores, customYoutubeIds, newStartDate, newPattern);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign-In error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-Out error:', err);
    }
  };

  const currentEpisode = useMemo(
    () =>
      REAL_VIDEO_EPISODES.find((ep) => ep.id === selectedEpisodeId) ||
      REAL_VIDEO_EPISODES[0],
    [selectedEpisodeId]
  );

  const filteredEpisodes = useMemo(() => {
    return REAL_VIDEO_EPISODES.filter((ep) => {
      if (levelFilter !== 'ALL' && ep.level !== levelFilter) return false;
      if (zoneFilter !== 'ALL' && ep.zone !== zoneFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchId = ep.id.toString() === q || `#${ep.id}` === q;
        const matchTitle =
          ep.title.toLowerCase().includes(q) ||
          ep.grammarTopicTitle.toLowerCase().includes(q) ||
          ep.realVideo.topicCategory.toLowerCase().includes(q);
        return matchId || matchTitle;
      }
      return true;
    });
  }, [levelFilter, zoneFilter, searchQuery]);

  const totalStarsEarned = useMemo(
    () => Object.values(episodeScores).reduce((sum, val) => sum + val, 0),
    [episodeScores]
  );

  const handleJumpToGrammarRule = (ruleId: string) => {
    setGrammarTargetRuleId(ruleId);
    setActiveTab('grammar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEpisodeToWatch = (episodeId: number) => {
    setSelectedEpisodeId(episodeId);
    setActiveQuestionNumber(1);
    setActiveTab('videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Mobile + Desktop + Smart TV Responsive Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Top Row on Mobile: Brand Title + Schedule Button + Cloud Sync */}
        <div className="flex items-center justify-between gap-2">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('videos');
            }}
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap font-display"
          >
            Super Bear English
          </a>

          {/* Primary Actions (Always visible on Mobile Phone!) */}
          <div className="flex items-center gap-2 shrink-0 sm:hidden">
            <button
              onClick={() => setActiveTab('calendar')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>{totalStarsEarned} ★ · Schedule</span>
            </button>

            {user ? (
              <button
                onClick={handleSignOut}
                className="px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
                title={`Signed in as ${user.email}`}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="px-2.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links (Visible & Full-Width Pill Tabs on Mobile Phone, Clean Links on Desktop) */}
        <nav className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-7 text-xs sm:text-sm font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 sm:py-1 px-2 sm:px-0 rounded-lg sm:rounded-none text-center transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-slate-900 text-white sm:bg-transparent sm:text-slate-900 sm:underline sm:decoration-amber-500 sm:decoration-2 sm:underline-offset-8 font-bold'
                : 'bg-slate-100 text-slate-700 sm:bg-transparent hover:text-slate-900'
            }`}
          >
            100 Videos
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-2 sm:py-1 px-2 sm:px-0 rounded-lg sm:rounded-none text-center transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-amber-400 text-slate-950 sm:bg-transparent sm:text-slate-900 sm:underline sm:decoration-amber-500 sm:decoration-2 sm:underline-offset-8 font-bold'
                : 'bg-slate-100 text-slate-700 sm:bg-transparent hover:text-slate-900'
            }`}
          >
            📅 Schedule (3/Wk)
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-2 sm:py-1 px-2 sm:px-0 rounded-lg sm:rounded-none text-center transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-slate-900 text-white sm:bg-transparent sm:text-slate-900 sm:underline sm:decoration-amber-500 sm:decoration-2 sm:underline-offset-8 font-bold'
                : 'bg-slate-100 text-slate-700 sm:bg-transparent hover:text-slate-900'
            }`}
          >
            Grammar Lab
          </button>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('calendar')}
            className="inline-flex px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {totalStarsEarned} ★ · Schedule
          </button>

          {user ? (
            <button
              onClick={handleSignOut}
              className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title={`Signed in as ${user.email}`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Cloud Sync</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Container (1440px max-w) */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* HANDS-FREE SMART TV VOICE & REMOTE CONTROLLER BAR */}
        <VoiceTvController
          currentEpisodeId={currentEpisode.id}
          currentEpisodeTitle={currentEpisode.title}
          activeQuestionNumber={activeQuestionNumber}
          onChangeActiveQuestionNumber={setActiveQuestionNumber}
          onSelectEpisode={handleSelectEpisodeToWatch}
          onNextEpisode={() =>
            handleSelectEpisodeToWatch(
              currentEpisode.id < 100 ? currentEpisode.id + 1 : 1
            )
          }
          onPrevEpisode={() =>
            handleSelectEpisodeToWatch(
              currentEpisode.id > 1 ? currentEpisode.id - 1 : 100
            )
          }
          onSwitchTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSearchText={(q) => {
            setSearchQuery(q);
            setActiveTab('videos');
          }}
          onFilterLevel={(lvl) => {
            setLevelFilter(lvl);
            setActiveTab('videos');
          }}
          onVideoCommand={(action) => {
            setActiveTab('videos');
            setVideoCommand({ action, timestamp: Date.now() });
          }}
          onAnswerQuestion={(qNum, optIdx) => {
            setActiveTab('videos');
            setVoiceQuizCommand({
              type: 'select_answer',
              questionNumber: qNum,
              optionIndex: optIdx,
              timestamp: Date.now()
            });
          }}
          onSubmitQuiz={() => {
            setActiveTab('videos');
            setVoiceQuizCommand({
              type: 'submit',
              timestamp: Date.now()
            });
          }}
          onResetQuiz={() => {
            setActiveTab('videos');
            setVoiceQuizCommand({
              type: 'reset',
              timestamp: Date.now()
            });
          }}
          onReadQuestionAloud={(qNum) => {
            setActiveTab('videos');
            setVoiceQuizCommand({
              type: 'read_question',
              questionNumber: qNum,
              timestamp: Date.now()
            });
          }}
        />

        {/* TAB 1: 100 REAL YOUTUBE VIDEOS + SUBTITLES + 10 MIXED Q&A + 1 GRAMMAR LESSON */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left / Center Stage (8 Columns on Desktop) */}
            <div className="lg:col-span-8">
              <RealVideoPlayer
                episode={currentEpisode}
                customYoutubeId={customYoutubeIds[currentEpisode.id]}
                videoCommand={videoCommand}
                onSaveCustomYoutubeUrl={handleSaveCustomYoutubeUrl}
                onJumpToGrammarRule={handleJumpToGrammarRule}
              />

              {/* Episode Summary & English Vocabulary Definitions */}
              <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>Real Video #{currentEpisode.id} of 100</span>
                  <span aria-hidden="true">·</span>
                  <span>Duration: {currentEpisode.durationFormatted} mins (15–35m)</span>
                  <span aria-hidden="true">·</span>
                  <span>Level {currentEpisode.level} (Age 9)</span>
                  <span aria-hidden="true">·</span>
                  <span>Week {currentEpisode.weekNumber} of 34</span>
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4 mt-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {currentEpisode.title}
                    </h2>
                    <p className="text-xs font-semibold text-amber-800 mt-1">
                      Channel: {currentEpisode.realVideo.channelName} · Topic: {currentEpisode.realVideo.topicCategory}
                    </p>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${
                      customYoutubeIds[currentEpisode.id] ||
                      currentEpisode.realVideo.youtubeId
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors whitespace-nowrap"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Open YouTube Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {currentEpisode.summaryEn}
                </p>

                {/* 3 Key Vocabulary Cards in 100% English */}
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>KEY ENGLISH VOCABULARY IN VIDEO #{currentEpisode.id} ({currentEpisode.realVideo.topicCategory.toUpperCase()})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentEpisode.keyVocab.map((v, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">
                            {v.word}
                          </span>
                          <span className="font-mono-num text-[11px] text-slate-500">
                            {v.phonetic}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 font-medium mt-1">
                          Meaning: {v.fr}
                        </div>
                        <div className="text-xs text-amber-900 mt-1.5 italic">
                          “{v.example}”
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 10 Mixed Questions + 1 Grammar Lesson Below Answers */}
              <EpisodeQuiz
                episode={currentEpisode}
                savedScore={episodeScores[currentEpisode.id]}
                activeQuestionNumber={activeQuestionNumber}
                voiceQuizCommand={voiceQuizCommand}
                onChangeActiveQuestionNumber={setActiveQuestionNumber}
                onSaveScore={handleSaveScore}
                onJumpToGrammarRule={handleJumpToGrammarRule}
              />
            </div>

            {/* Right Sidebar: 100 Real Videos Playlist & Filter Deck (4 Columns) */}
            <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    100 Real Videos (15–35m)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Voice Search · Subtitles · 10 Q&A per video
                  </p>
                </div>
                <span className="font-mono-num text-xs font-bold text-amber-700">
                  {filteredEpisodes.length} / 100
                </span>
              </div>

              {/* Search Input (Also populated automatically by Voice Search!) */}
              <div className="relative mt-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search or say "Search space"...'
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Level L3 / L4 Segmented Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl mt-3">
                {(
                  [
                    { id: 'ALL', label: 'All (100)' },
                    { id: 'L3', label: 'Level L3 (1–50)' },
                    { id: 'L4', label: 'Level L4 (51–100)' }
                  ] as const
                ).map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevelFilter(lvl.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      levelFilter === lvl.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* World Zone Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 mt-1">
                <button
                  onClick={() => setZoneFilter('ALL')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer ${
                    zoneFilter === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Themes
                </button>
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setZoneFilter(z.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer ${
                      zoneFilter === z.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {z.name.split('&')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Scrollable List of All 100 Real Videos */}
              <div className="mt-2 max-h-[680px] overflow-y-auto space-y-2 pr-1">
                {filteredEpisodes.map((ep) => {
                  const isCurrent = ep.id === selectedEpisodeId;
                  const score = episodeScores[ep.id];

                  return (
                    <div
                      key={ep.id}
                      onClick={() => handleSelectEpisodeToWatch(ep.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200/80 text-slate-800 hover:border-amber-400 hover:bg-amber-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-num">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-bold ${
                              isCurrent ? 'text-amber-400' : 'text-amber-700'
                            }`}
                          >
                            #{ep.id < 10 ? `0${ep.id}` : ep.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className={isCurrent ? 'text-sky-300' : 'text-slate-500'}>
                            {ep.level} · W{ep.weekNumber}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {score !== undefined && (
                            <span
                              className={`flex items-center gap-0.5 font-bold ${
                                isCurrent ? 'text-emerald-300' : 'text-emerald-700'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {score}/10
                            </span>
                          )}
                          <span
                            className={`flex items-center gap-1 ${
                              isCurrent ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {ep.durationFormatted}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm font-bold mt-1 leading-snug">
                        {ep.title}
                      </div>
                      <div
                        className={`text-xs mt-0.5 truncate ${
                          isCurrent ? 'text-amber-300' : 'text-slate-500'
                        }`}
                      >
                        {ep.realVideo.channelName}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 truncate ${
                          isCurrent ? 'text-sky-200' : 'text-amber-800'
                        }`}
                      >
                        Grammar: {ep.grammarTopicTitle.split('(')[0].trim()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        )}

        {/* TAB 2: 3 VIDEOS PER WEEK CALENDAR PLANNER (34 WEEKS = 100 VIDEOS) */}
        {activeTab === 'calendar' && (
          <WeeklyCalendarPlanner
            startDate={startDate}
            studyDaysPattern={studyDaysPattern}
            episodeScores={episodeScores}
            onUpdateScheduleSettings={handleUpdateScheduleSettings}
            onSelectEpisodeToWatch={handleSelectEpisodeToWatch}
          />
        )}

        {/* TAB 3: GRAMMAR LAB */}
        {activeTab === 'grammar' && (
          <GrammarLabTab
            initialRuleId={grammarTargetRuleId}
            onSelectEpisodeFromRule={handleSelectEpisodeToWatch}
          />
        )}

        {/* TAB 4: STACK SETUP HUB */}
        {activeTab === 'stack' && (
          <StackSetupHub
            userEmail={user?.email}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </main>
    </div>
  );
}
