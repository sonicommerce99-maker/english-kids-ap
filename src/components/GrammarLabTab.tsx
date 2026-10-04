import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Play,
  HelpCircle,
  Send,
  RotateCcw
} from 'lucide-react';
import { GRAMMAR_RULES, CHARACTERS, GrammarRule } from '../data/curriculum';
import { REAL_VIDEO_EPISODES } from '../data/realVideoCatalog';
import { BlockyCharacterSVG } from './BlockyCharacterSVG';

interface GrammarLabTabProps {
  initialRuleId?: string | null;
  onSelectEpisodeFromRule: (episodeId: number) => void;
}

export const GrammarLabTab: React.FC<GrammarLabTabProps> = ({
  initialRuleId,
  onSelectEpisodeFromRule
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'L3' | 'L4'>('ALL');
  const [selectedRuleId, setSelectedRuleId] = useState<string>(
    initialRuleId || GRAMMAR_RULES[0].id
  );
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [submittedRules, setSubmittedRules] = useState<Record<string, boolean>>({});

  const filteredRules = GRAMMAR_RULES.filter(
    (r) => levelFilter === 'ALL' || r.level === levelFilter
  );

  const activeRule: GrammarRule =
    GRAMMAR_RULES.find((r) => r.id === selectedRuleId) || GRAMMAR_RULES[0];

  const relatedEpisodes = REAL_VIDEO_EPISODES.filter(
    (ep) =>
      ep.grammarRuleId === activeRule.id ||
      ep.secondaryGrammarRuleId === activeRule.id
  );

  const isRuleQuizSubmitted = !!submittedRules[activeRule.id];
  const answeredPracticeCount = activeRule.practiceQuestions.filter(
    (_, idx) => practiceAnswers[`${activeRule.id}-${idx}`] !== undefined
  ).length;
  const allPracticeAnswered =
    answeredPracticeCount === activeRule.practiceQuestions.length;

  return (
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono-num text-amber-400 font-semibold">
            10 CORE GRAMMAR RULES · LEVELS L3 & L4 (AGE 9) · 100% ENGLISH
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
            English Grammar Lab (Levels L3 & L4)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Every video in our 100-video library practices 2 grammar rules from this lab. Study the positive, negative, and question formulas in clear English, review common mistakes, and test yourself!
          </p>
        </div>

        {/* Level Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-xl border border-slate-700 shrink-0">
          {(['ALL', 'L3', 'L4'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {lvl === 'ALL'
                ? 'All Rules (10)'
                : lvl === 'L3'
                ? 'Level L3 (Rules 1–5)'
                : 'Level L4 (Rules 6–10)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split View: Left Rule Selector + Right Interactive Rule Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 10 Rules Navigation List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
          <div className="px-2 py-1.5 text-xs font-bold text-slate-500 border-b border-slate-100">
            Select a Grammar Rule ({filteredRules.length})
          </div>
          {filteredRules.map((rule) => {
            const isSelected = rule.id === activeRule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200/80 text-slate-800 hover:border-amber-400 hover:bg-amber-50/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-num">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-amber-700 font-semibold'}>
                    {rule.code}
                  </span>
                  <span className={isSelected ? 'text-slate-300' : 'text-slate-400'}>
                    Level {rule.level}
                  </span>
                </div>
                <div className="font-bold text-sm mt-1">{rule.titleEn}</div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Interactive Grammar Lesson (100% English) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Rule Explanation & Formulas */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-mono-num font-bold text-amber-700">{activeRule.code}</span>
              <span aria-hidden="true">·</span>
              <span>Level {activeRule.level} Curriculum</span>
              <span aria-hidden="true">·</span>
              <span>Practiced in {relatedEpisodes.length} Videos</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">{activeRule.titleEn}</h2>

            {/* When to use box */}
            <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>WHEN & HOW TO USE THIS RULE</span>
              </div>
              <p className="text-sm sm:text-base text-slate-900 font-medium">
                {activeRule.whenToUseEn}
              </p>
            </div>

            {/* Magic Formulas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-900">1. Positive (+)</div>
                <div className="font-mono-num text-xs sm:text-sm font-semibold text-emerald-950 mt-1">
                  {activeRule.formulaPositive}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="text-xs font-bold text-rose-900">2. Negative (-)</div>
                <div className="font-mono-num text-xs sm:text-sm font-semibold text-rose-950 mt-1">
                  {activeRule.formulaNegative}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
                <div className="text-xs font-bold text-sky-900">3. Question (?)</div>
                <div className="font-mono-num text-xs sm:text-sm font-semibold text-sky-950 mt-1">
                  {activeRule.formulaQuestion}
                </div>
              </div>
            </div>

            {/* Character Examples (100% English) */}
            <div className="mt-8">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Model English Sentences in Context
              </h3>
              <div className="space-y-3">
                {activeRule.storyExamples.map((ex, idx) => {
                  const char = CHARACTERS[ex.speaker];
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-3.5">
                        <BlockyCharacterSVG character={ex.speaker} size="sm" />
                        <div>
                          <div className="text-xs font-bold text-slate-500">
                            {char.name} · Grammar Pattern: <span className="text-amber-700">“{ex.highlight}”</span>
                          </div>
                          <p className="text-base font-bold text-slate-900 mt-0.5">
                            “{ex.english}”
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          `English grammar for kids ${activeRule.titleEn}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
                        title="Watch Grammar Video on YouTube"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Watch Out! Common Mistake Box */}
            <div className="mt-8 p-5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>COMMON MISTAKE TO AVOID</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-lg bg-white border border-rose-200 text-sm">
                  <span className="font-bold text-rose-700">✗ Wrong: </span>
                  <span className="line-through text-slate-600">{activeRule.commonMistake.wrong}</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-emerald-200 text-sm">
                  <span className="font-bold text-emerald-700">✓ Correct: </span>
                  <span className="font-bold text-slate-900">{activeRule.commonMistake.right}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mini Grammar Q&A Practice (Answer All First Before Revealing) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>Quick Grammar Check — Answer Both Questions to Reveal Solutions</span>
            </h3>
            <div className="mt-4 space-y-5">
              {activeRule.practiceQuestions.map((pq, qIndex) => {
                const key = `${activeRule.id}-${qIndex}`;
                const chosen = practiceAnswers[key];

                return (
                  <div key={key} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      {qIndex + 1}. {pq.prompt}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {pq.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === pq.correctIndex;
                        const isPicked = chosen === oIdx;
                        let cls = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400';

                        if (!isRuleQuizSubmitted) {
                          if (isPicked) {
                            cls = 'bg-slate-900 border-slate-900 text-white font-bold';
                          }
                        } else {
                          if (isCorrect) cls = 'bg-emerald-600 border-emerald-700 text-white font-bold';
                          else if (isPicked) cls = 'bg-rose-600 border-rose-700 text-white font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isRuleQuizSubmitted}
                            onClick={() =>
                              setPracticeAnswers((prev) => ({ ...prev, [key]: oIdx }))
                            }
                            className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer ${cls}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isRuleQuizSubmitted && (
                      <div className="mt-3 text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          Correct Answer: “{pq.options[pq.correctIndex]}” (Formula: {activeRule.formulaPositive})
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              {!isRuleQuizSubmitted ? (
                <button
                  disabled={!allPracticeAnswered}
                  onClick={() =>
                    setSubmittedRules((prev) => ({ ...prev, [activeRule.id]: true }))
                  }
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    allPracticeAnswered
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Check My Grammar Answers</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSubmittedRules((prev) => ({ ...prev, [activeRule.id]: false }));
                    setPracticeAnswers((prev) => {
                      const next = { ...prev };
                      delete next[`${activeRule.id}-0`];
                      delete next[`${activeRule.id}-1`];
                      return next;
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Practice</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 3: Videos Practicing This Grammar Rule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900">
              Videos Practicing “{activeRule.titleEn}”
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any video below to watch the lesson and answer its 10 questions!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {relatedEpisodes.slice(0, 12).map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => onSelectEpisodeFromRule(ep.id)}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-mono-num text-amber-700 font-bold">
                      Video #{ep.id} · {ep.durationFormatted} mins
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {ep.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {ep.realVideo.channelName}
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-slate-700 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
