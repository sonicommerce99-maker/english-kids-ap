import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  HelpCircle,
  Lock,
  Send,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { RealVideoEpisode } from '../data/realVideoCatalog';
import { GRAMMAR_RULES } from '../data/curriculum';

interface EpisodeQuizProps {
  episode: RealVideoEpisode;
  savedScore?: number;
  onSaveScore: (episodeId: number, score: number) => void;
  onJumpToGrammarRule: (ruleId: string) => void;
}

export const EpisodeQuiz: React.FC<EpisodeQuizProps> = ({
  episode,
  savedScore,
  onSaveScore,
  onJumpToGrammarRule
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Reset selections and lock answers when switching episodes
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  }, [episode.id]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const allTenAnswered = answeredCount === episode.questions.length;

  const finalScore = episode.questions.reduce((acc, q) => {
    if (selectedAnswers[q.id] === q.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const grammarLesson =
    GRAMMAR_RULES.find((r) => r.id === episode.grammarRuleId) || GRAMMAR_RULES[0];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return; // Lock choices once submitted until Retry
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitAllTen = () => {
    if (!allTenAnswered) return;
    setIsSubmitted(true);
    onSaveScore(episode.id, finalScore);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8">
      {/* Header with the 1 Focused Grammar Lesson for This Video */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-medium text-slate-500">
            <span>Video #{episode.id} Mixed Quiz</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>10 Mixed Questions (Video Comprehension, Vocabulary & 1 Grammar Rule)</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>Level {episode.level}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            10 Mixed Questions — Answer All 10 First to Reveal Solutions!
          </h3>

          {/* Single Grammar Lesson Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              onClick={() => onJumpToGrammarRule(episode.grammarRuleId)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Grammar Focus: {episode.grammarTopicTitle}</span>
            </button>
          </div>
        </div>

        {/* Progress / Score Box */}
        <div className="flex flex-wrap items-center gap-3">
          {!isSubmitted ? (
            <div className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-mono-num text-xs sm:text-sm font-bold flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>
                Progress: {answeredCount} / 10 Answered (Answers Hidden Until You Finish)
              </span>
            </div>
          ) : (
            <div className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-mono-num text-sm font-bold flex items-center gap-2 shadow-xs">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Final Score: {finalScore} / 10 ★</span>
            </div>
          )}

          {savedScore !== undefined && (
            <span className="text-xs font-mono-num font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              Best Saved: {savedScore}/10
            </span>
          )}

          {answeredCount > 0 && (
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* 10 Mixed Questions List */}
      <div className="mt-6 space-y-5">
        {episode.questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isPicked = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          let cardStyle = 'bg-slate-50/70 border-slate-200';
          if (isSubmitted) {
            cardStyle = isCorrect
              ? 'bg-emerald-50/50 border-emerald-300'
              : 'bg-rose-50/50 border-rose-300';
          } else if (isPicked) {
            cardStyle = 'bg-amber-50/30 border-amber-300';
          }

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-colors ${cardStyle}`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-num font-bold text-slate-800">
                    Question {idx + 1} of 10
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-amber-800">{q.category}</span>
                </div>

                {!isSubmitted ? (
                  <span className="font-mono-num text-xs font-semibold text-slate-500">
                    {isPicked ? '✓ Option Selected' : 'Select 1 option'}
                  </span>
                ) : (
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>● CORRECT (+1 Point)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>▲ INCORRECT</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {q.questionEn}
              </h4>

              {/* 4 Multiple-Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let btnStyle =
                    'bg-white border-slate-200 text-slate-800 hover:border-amber-400';

                  if (!isSubmitted) {
                    if (isThisSelected) {
                      btnStyle =
                        'bg-slate-900 border-slate-900 text-white font-bold shadow-xs';
                    }
                  } else {
                    if (isThisCorrect) {
                      btnStyle =
                        'bg-emerald-600 border-emerald-700 text-white font-bold';
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle =
                        'bg-rose-600 border-rose-700 text-white font-bold';
                    } else {
                      btnStyle = 'bg-white/60 border-slate-200 text-slate-500';
                    }
                  }

                  const letter = ['A', 'B', 'C', 'D'][optIdx];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-colors ${
                        isSubmitted ? 'cursor-default' : 'cursor-pointer'
                      } ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-num text-xs font-bold opacity-80">
                          {letter}.
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      )}
                      {isSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation ONLY Revealed AFTER All 10 Are Submitted */}
              {isSubmitted && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 font-semibold text-slate-900">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Correct Answer ({['A', 'B', 'C', 'D'][q.correctIndex]}): {q.explanationEn}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action Bar — Must Finish All 10 Questions First */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm font-semibold text-slate-700">
          {!isSubmitted ? (
            allTenAnswered ? (
              <span className="text-emerald-700 font-bold">
                ✓ All 10 questions answered! Click the button to reveal all correct answers and your score.
              </span>
            ) : (
              <span>
                Please answer all 10 questions first ({10 - answeredCount} remaining) before revealing the answers.
              </span>
            )
          ) : (
            <span className="text-slate-900 font-bold">
              Quiz Completed! You scored {finalScore} / 10 on Video #{episode.id}.
            </span>
          )}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmitAllTen}
            disabled={!allTenAnswered}
            className={`px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${
              allTenAnswered
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>
              {allTenAnswered
                ? 'Check My 10 Answers & Show Solutions'
                : `Answer All 10 Questions First (${answeredCount}/10)`}
            </span>
          </button>
        ) : (
          <button
            onClick={handleResetQuiz}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try All 10 Questions Again</span>
          </button>
        )}
      </div>

      {/* ONE COMPLETE GRAMMAR LESSON DIRECTLY BELOW THE QUIZ ANSWERS */}
      <div className="mt-8 pt-8 border-t-2 border-slate-200">
        <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-num text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
              GRAMMAR LESSON FOR VIDEO #{episode.id} · {grammarLesson.code}
            </span>
            <button
              onClick={() => onJumpToGrammarRule(grammarLesson.id)}
              className="text-xs font-bold text-amber-900 underline hover:text-amber-700 cursor-pointer"
            >
              Open Full Grammar Lab →
            </button>
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
            {grammarLesson.titleEn}
          </h4>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">
            {grammarLesson.whenToUseEn}
          </p>

          {/* Positive / Negative / Question Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
              <div className="text-[11px] font-bold text-emerald-700">
                ● POSITIVE (+)
              </div>
              <div className="font-mono-num text-xs font-bold text-slate-900 mt-1">
                {grammarLesson.formulaPositive}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-rose-200">
              <div className="text-[11px] font-bold text-rose-700">
                ▲ NEGATIVE (-)
              </div>
              <div className="font-mono-num text-xs font-bold text-slate-900 mt-1">
                {grammarLesson.formulaNegative}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-sky-200">
              <div className="text-[11px] font-bold text-sky-700">
                ? QUESTION (?)
              </div>
              <div className="font-mono-num text-xs font-bold text-slate-900 mt-1">
                {grammarLesson.formulaQuestion}
              </div>
            </div>
          </div>

          {/* Clear English Examples */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              Examples in English:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {grammarLesson.storyExamples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900"
                >
                  “{ex.english}”
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistake Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-white border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-rose-700 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Wrong: “{grammarLesson.commonMistake.wrong}”</span>
            </div>
            <div className="text-emerald-700 font-bold">
              ✓ Right: “{grammarLesson.commonMistake.right}”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
