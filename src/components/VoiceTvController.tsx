import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Tv,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface VoiceActionHandlers {
  onSelectEpisode: (episodeId: number) => void;
  onNextEpisode: () => void;
  onPrevEpisode: () => void;
  onSwitchTab: (tab: 'videos' | 'calendar' | 'grammar' | 'stack') => void;
  onSearchText: (query: string) => void;
  onFilterLevel: (level: 'ALL' | 'L3' | 'L4') => void;
  onVideoCommand: (action: 'play' | 'pause' | 'mute' | 'unmute' | 'restart' | 'forward' | 'backward') => void;
  onAnswerQuestion: (questionNumber1To10: number, optionIndex0To3: number) => void;
  onSubmitQuiz: () => void;
  onResetQuiz: () => void;
  onReadQuestionAloud: (questionNumber1To10: number) => void;
}

interface VoiceTvControllerProps extends VoiceActionHandlers {
  currentEpisodeId: number;
  currentEpisodeTitle: string;
  activeQuestionNumber: number;
  onChangeActiveQuestionNumber: (qNum: number) => void;
}

const NUMBER_WORDS: Record<string, number> = {
  one: 1, un: 1, une: 1, واحد: 1, '1': 1, first: 1, premier: 1,
  two: 2, deux: 2, جوج: 2, اثنان: 2, '2': 2, second: 2, deuxième: 2,
  three: 3, trois: 3, ثلاثة: 3, تلاتة: 3, '3': 3, third: 3, troisième: 3,
  four: 4, quatre: 4, اربعة: 4, ربعة: 4, '4': 4, fourth: 4, quatrième: 4,
  five: 5, cinq: 5, خمسة: 5, '5': 5, fifth: 5, cinquième: 5,
  six: 6, ستة: 6, '6': 6, sixth: 6, sixième: 6,
  seven: 7, sept: 7, سبعة: 7, '7': 7, seventh: 7, septième: 7,
  eight: 8, huit: 8, ثمانية: 8, تمنية: 8, '8': 8, eighth: 8, huitième: 8,
  nine: 9, neuf: 9, تسعة: 9, تسعود: 9, '9': 9, ninth: 9, neuvième: 9,
  ten: 10, dix: 10, عشرة: 10, '10': 10, tenth: 10, dixième: 10
};

function parseOptionLetter(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  if (/\b(option a|answer a|letter a|choice a|reponse a|réponse a|خيار a|أ|a|1|one|un)\b/.test(s)) return 0;
  if (/\b(option b|answer b|letter b|choice b|reponse b|réponse b|خيار b|ب|b|bee|be|2|two|deux)\b/.test(s)) return 1;
  if (/\b(option c|answer c|letter c|choice c|reponse c|réponse c|خيار c|ج|c|see|sea|3|three|trois)\b/.test(s)) return 2;
  if (/\b(option d|answer d|letter d|choice d|reponse d|réponse d|خيار d|د|d|dee|4|four|quatre)\b/.test(s)) return 3;
  return null;
}

export const VoiceTvController: React.FC<VoiceTvControllerProps> = ({
  currentEpisodeId,
  activeQuestionNumber,
  onChangeActiveQuestionNumber,
  onSelectEpisode,
  onNextEpisode,
  onPrevEpisode,
  onSwitchTab,
  onSearchText,
  onFilterLevel,
  onVideoCommand,
  onAnswerQuestion,
  onSubmitQuiz,
  onResetQuiz,
  onReadQuestionAloud
}) => {
  const [liveDictationText, setLiveDictationText] = useState<string>('');
  const [lastExecutedText, setLastExecutedText] = useState<string>('');
  const [lastFeedback, setLastFeedback] = useState<string>(
    'Ready! Just press your TV Remote Voice Button and speak — no Start/Stop button needed!'
  );
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);

  const hiddenReceiverRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef = useRef<any>(null);

  const speakFeedback = useCallback((text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      }
    } catch {
      // ignore
    }
  }, []);

  const executeSpokenCommand = useCallback(
    (rawTranscript: string) => {
      const text = rawTranscript.toLowerCase().trim();
      if (!text) return;

      setLastExecutedText(rawTranscript);
      setLiveDictationText('');

      // 1. Question + Option in one phrase: e.g. "question 2 option b", "question 1 a", "سؤال 3 ب"
      const qMatch = text.match(
        /(?:question|سؤال|كيسيون|q)\s*(10|[1-9]|one|two|three|four|five|six|seven|eight|nine|ten|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|واحد|جوج|ثلاثة|تلاتة|ربعة|خمسة|ستة|سبعة|تمنية|تسعود|عشرة)/i
      );
      if (qMatch) {
        const token = qMatch[1].toLowerCase();
        const qNum = NUMBER_WORDS[token] || parseInt(token, 10);
        if (qNum >= 1 && qNum <= 10) {
          onChangeActiveQuestionNumber(qNum);
          const afterQ = text.slice((qMatch.index || 0) + qMatch[0].length);
          const optIdx = parseOptionLetter(afterQ);
          if (optIdx !== null) {
            const letter = ['A', 'B', 'C', 'D'][optIdx];
            onAnswerQuestion(qNum, optIdx);
            const msg = `Question ${qNum}: Option ${letter} selected`;
            setLastFeedback(`✓ ${msg}`);
            speakFeedback(msg);
            if (qNum < 10) {
              onChangeActiveQuestionNumber(qNum + 1);
            }
            return;
          } else {
            onReadQuestionAloud(qNum);
            setLastFeedback(`✓ Focused Question ${qNum} (Say "A", "B", "C", or "D")`);
            return;
          }
        }
      }

      // 2. Direct Option selection for active question: "a", "b", "c", "d", "option a", "réponse b", "1", "2", "3", "4"
      const directOpt = parseOptionLetter(text);
      if (
        directOpt !== null &&
        (text.length <= 3 ||
          text.includes('option') ||
          text.includes('answer') ||
          text.includes('choice') ||
          text.includes('letter') ||
          text.includes('reponse') ||
          text.includes('réponse') ||
          text.includes('جواب') ||
          text.includes('خيار'))
      ) {
        const letter = ['A', 'B', 'C', 'D'][directOpt];
        onAnswerQuestion(activeQuestionNumber, directOpt);
        const nextQ = activeQuestionNumber < 10 ? activeQuestionNumber + 1 : 10;
        const msg = `Question ${activeQuestionNumber}: Option ${letter} selected`;
        setLastFeedback(`✓ ${msg}`);
        speakFeedback(msg);
        onChangeActiveQuestionNumber(nextQ);
        return;
      }

      // 3. Read Question Aloud
      if (
        text.includes('read') ||
        text.includes('lire') ||
        text.includes('قرا') ||
        text.includes('اقرأ')
      ) {
        onReadQuestionAloud(activeQuestionNumber);
        setLastFeedback(`🔊 Reading Question ${activeQuestionNumber} aloud...`);
        return;
      }

      // 4. Submit Quiz / Check Answers
      if (
        text.includes('submit') ||
        text.includes('check') ||
        text.includes('show answer') ||
        text.includes('solution') ||
        text.includes('finish') ||
        text.includes('valider') ||
        text.includes('النتيجة') ||
        text.includes('تصحيح')
      ) {
        onSubmitQuiz();
        setLastFeedback('✓ Submitted all 10 answers & revealed solutions!');
        speakFeedback('Checking your ten answers.');
        return;
      }

      // 5. Reset Quiz
      if (text.includes('reset') || text.includes('try again') || text.includes('recommencer')) {
        onResetQuiz();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('✓ Quiz reset to Question 1');
        return;
      }

      // 6. Select Video by number (1 to 100): e.g. "video 5", "episode 12", "فيديو 4"
      const epMatch = text.match(
        /(?:video|vidéo|episode|épisode|lesson|فيديو|حلقة|درس)\s*(100|[1-9][0-9]?|one|two|three|four|five|six|seven|eight|nine|ten|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)/i
      );
      if (epMatch) {
        const token = epMatch[1].toLowerCase();
        const epNum = NUMBER_WORDS[token] || parseInt(token, 10);
        if (epNum >= 1 && epNum <= 100) {
          onSelectEpisode(epNum);
          onChangeActiveQuestionNumber(1);
          const msg = `Playing Video #${epNum}`;
          setLastFeedback(`🎬 ${msg}`);
          speakFeedback(msg);
          return;
        }
      }

      // 7. Next / Previous Video
      if (
        text.includes('next') ||
        text.includes('suivant') ||
        text.includes('التالي') ||
        text.includes('زيد')
      ) {
        onNextEpisode();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('⏭️ Switched to Next Video & Auto-Playing');
        return;
      }

      if (
        text.includes('previous') ||
        text.includes('précédent') ||
        text.includes('precedent') ||
        text.includes('السابق') ||
        text.includes('رجع')
      ) {
        onPrevEpisode();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('⏮️ Switched to Previous Video & Auto-Playing');
        return;
      }

      // 8. Play / Pause / Mute / Unmute / Restart Video
      if (
        text.includes('play') ||
        text.includes('start') ||
        text.includes('youtube') ||
        text.includes('lecture') ||
        text.includes('شغل') ||
        text.includes('خدم')
      ) {
        onVideoCommand('play');
        setLastFeedback('▶️ Playing YouTube Video Now!');
        return;
      }

      if (
        text.includes('pause') ||
        text.includes('stop') ||
        text.includes('arrête') ||
        text.includes('arrete') ||
        text.includes('حبس') ||
        text.includes('وقف')
      ) {
        onVideoCommand('pause');
        setLastFeedback('⏸️ Paused YouTube Video');
        return;
      }

      if (text.includes('unmute') || text.includes('sound on') || text.includes('طلق الصوت')) {
        onVideoCommand('unmute');
        setLastFeedback('🔊 Video Unmuted');
        return;
      }

      if (text.includes('mute') || text.includes('sound off') || text.includes('قطع الصوت')) {
        onVideoCommand('mute');
        setLastFeedback('🔇 Video Muted');
        return;
      }

      if (text.includes('restart') || text.includes('beginning') || text.includes('عاود')) {
        onVideoCommand('restart');
        setLastFeedback('⏪ Restarted Video from 00:00');
        return;
      }

      // 9. Navigation Tabs
      if (
        text.includes('schedule') ||
        text.includes('calendar') ||
        text.includes('planning') ||
        text.includes('جدول')
      ) {
        onSwitchTab('calendar');
        setLastFeedback('📅 Opened 3/Week Schedule');
        return;
      }

      if (text.includes('grammar') || text.includes('grammaire') || text.includes('قواعد')) {
        onSwitchTab('grammar');
        setLastFeedback('📖 Opened Grammar Lab');
        return;
      }

      // 10. Scroll Down / Up
      if (
        text.includes('down') ||
        text.includes('question') ||
        text.includes('quiz') ||
        text.includes('descend') ||
        text.includes('هبط') ||
        text.includes('اسئلة')
      ) {
        window.scrollBy({ top: 600, behavior: 'smooth' });
        setLastFeedback('⬇️ Scrolled Down to Quiz Questions');
        return;
      }

      if (text.includes('up') || text.includes('top') || text.includes('monte') || text.includes('طلع')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLastFeedback('⬆️ Scrolled Up to Video Player');
        return;
      }

      // 11. Search
      if (text.startsWith('search ') || text.startsWith('find ') || text.startsWith('chercher ')) {
        const query = text.replace(/^(search|find|chercher)\s+/i, '').trim();
        onSearchText(query);
        setLastFeedback(`🔍 Searching videos for: "${query}"`);
        return;
      }

      if (text.includes('clear') || text.includes('show all') || text.includes('tous')) {
        onSearchText('');
        onFilterLevel('ALL');
        setLastFeedback('✓ Showing all 100 videos');
        return;
      }

      // Fallback: search by spoken keyword
      if (text.length >= 2) {
        onSearchText(text);
        setLastFeedback(`🔍 Heard "${rawTranscript}" — Filtering videos by "${rawTranscript}"`);
      }
    },
    [
      activeQuestionNumber,
      onAnswerQuestion,
      onChangeActiveQuestionNumber,
      onFilterLevel,
      onNextEpisode,
      onPrevEpisode,
      onReadQuestionAloud,
      onResetQuiz,
      onSearchText,
      onSelectEpisode,
      onSubmitQuiz,
      onSwitchTab,
      onVideoCommand,
      speakFeedback
    ]
  );

  // ALWAYS KEEP THE TV VOICE RECEIVER READY SO THE HARDWARE REMOTE MIC BUTTON WORKS INSTANTLY WITHOUT CLICKING ANY START BUTTON!
  useEffect(() => {
    const keepReceiverFocused = () => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isOtherInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') &&
        activeEl !== hiddenReceiverRef.current;

      if (!isOtherInput && hiddenReceiverRef.current) {
        hiddenReceiverRef.current.focus({ preventScroll: true });
      }
    };

    keepReceiverFocused();
    const interval = setInterval(keepReceiverFocused, 1200);
    return () => clearInterval(interval);
  }, []);

  // Also try background Web Speech API automatically (zero clicks) if supported by the browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    let isMounted = true;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const lastIdx = event.results.length - 1;
      const transcript = event.results[lastIdx]?.[0]?.transcript;
      if (transcript) {
        executeSpokenCommand(transcript);
      }
    };

    recognition.onend = () => {
      if (isMounted) {
        try {
          recognition.start();
        } catch {
          // ignore
        }
      }
    };

    try {
      recognition.start();
    } catch {
      // ignore if browser requires hardware remote input box instead
    }

    return () => {
      isMounted = false;
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };
  }, [executeSpokenCommand]);

  // Global TV Remote Keys (Numbers 1/2/3/4 for Options A/B/C/D, Media Play/Pause, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isOtherInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') &&
        activeEl !== hiddenReceiverRef.current;
      if (isOtherInput) return;

      // If user presses 1, 2, 3, 4 on TV remote while hidden receiver is empty, immediately select Option A, B, C, D!
      if (!liveDictationText) {
        if (e.key === '1') {
          e.preventDefault();
          onAnswerQuestion(activeQuestionNumber, 0);
          const nextQ = activeQuestionNumber < 10 ? activeQuestionNumber + 1 : 10;
          onChangeActiveQuestionNumber(nextQ);
          setLastFeedback(`✓ Remote Button [1]: Question ${activeQuestionNumber} → Option A`);
          return;
        }
        if (e.key === '2') {
          e.preventDefault();
          onAnswerQuestion(activeQuestionNumber, 1);
          const nextQ = activeQuestionNumber < 10 ? activeQuestionNumber + 1 : 10;
          onChangeActiveQuestionNumber(nextQ);
          setLastFeedback(`✓ Remote Button [2]: Question ${activeQuestionNumber} → Option B`);
          return;
        }
        if (e.key === '3') {
          e.preventDefault();
          onAnswerQuestion(activeQuestionNumber, 2);
          const nextQ = activeQuestionNumber < 10 ? activeQuestionNumber + 1 : 10;
          onChangeActiveQuestionNumber(nextQ);
          setLastFeedback(`✓ Remote Button [3]: Question ${activeQuestionNumber} → Option C`);
          return;
        }
        if (e.key === '4') {
          e.preventDefault();
          onAnswerQuestion(activeQuestionNumber, 3);
          const nextQ = activeQuestionNumber < 10 ? activeQuestionNumber + 1 : 10;
          onChangeActiveQuestionNumber(nextQ);
          setLastFeedback(`✓ Remote Button [4]: Question ${activeQuestionNumber} → Option D`);
          return;
        }
        if (e.key === '0') {
          e.preventDefault();
          onSubmitQuiz();
          setLastFeedback('✓ Remote Button [0]: Submitted all 10 answers!');
          return;
        }
      }

      if (e.key === 'MediaPlayPause' || e.key === 'MediaPlay') {
        onVideoCommand('play');
      } else if (e.key === 'MediaPause' || e.key === 'MediaStop') {
        onVideoCommand('pause');
      } else if (e.key === 'ChannelUp' || e.key === 'MediaTrackNext') {
        onNextEpisode();
      } else if (e.key === 'ChannelDown' || e.key === 'MediaTrackPrevious') {
        onPrevEpisode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeQuestionNumber,
    liveDictationText,
    onAnswerQuestion,
    onChangeActiveQuestionNumber,
    onNextEpisode,
    onPrevEpisode,
    onSubmitQuiz,
    onVideoCommand
  ]);

  // Whenever the TV remote's built-in voice button injects text into our always-focused receiver, auto-execute after 650ms!
  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLiveDictationText(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        executeSpokenCommand(val);
      }, 650);
    }
  };

  const handleReceiverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (liveDictationText.trim()) {
      executeSpokenCommand(liveDictationText);
    }
  };

  return (
    <div className="mb-5 rounded-2xl bg-slate-900 text-white border-2 border-amber-400 shadow-lg p-3.5 sm:p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Always-Ready TV Remote Dictation Receiver (NO Start/Stop button!) */}
        <form
          onSubmit={handleReceiverSubmit}
          className="flex items-center gap-2.5 flex-1"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold whitespace-nowrap">
            <Tv className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>TV REMOTE VOICE READY</span>
          </div>

          <div className="relative flex-1">
            <input
              ref={hiddenReceiverRef}
              type="text"
              autoFocus
              value={liveDictationText}
              onChange={handleReceiverChange}
              placeholder='Just press your TV Remote Mic Button & speak ("Play", "Video 3", "Option A", "Submit")...'
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-amber-400 text-xs sm:text-sm font-bold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </form>

        {/* Right: Direct TV Remote Action Buttons + Help */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onVideoCommand('play')}
            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold flex items-center gap-1 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Play</span>
          </button>
          <button
            type="button"
            onClick={() => onVideoCommand('pause')}
            className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>
          <button
            type="button"
            onClick={onPrevEpisode}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={onNextEpisode}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Next</span>
          </button>
          <button
            type="button"
            onClick={() => onReadQuestionAloud(activeQuestionNumber)}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Read Q{activeQuestionNumber}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowHelpGuide((p) => !p)}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guide</span>
            {showHelpGuide ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono-num font-bold">
            Video #{currentEpisodeId} · Active Question #{activeQuestionNumber}/10 (Or press 1, 2, 3, 4 on Remote for A, B, C, D)
          </span>
          {lastExecutedText && (
            <span className="text-emerald-300 font-bold">
              Heard: “{lastExecutedText}”
            </span>
          )}
        </div>

        <div className="text-slate-300 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{lastFeedback}</span>
        </div>
      </div>

      {showHelpGuide && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-amber-400 mb-1">
              🎬 1. Videos (Auto-Plays on TV!):
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Videos start playing automatically when opened!</li>
              <li>• Speak into your TV remote: <b>“Play”</b>, <b>“Pause”</b>, <b>“Video 5”</b>, <b>“Next”</b></li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-emerald-400 mb-1">
              ✅ 2. Answer Questions (Voice or 1-2-3-4 Keys):
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Speak into your remote: <b>“Option A”</b>, <b>“Option B”</b>, <b>“Option C”</b>, <b>“Option D”</b></li>
              <li>• Or press numbers <b>1, 2, 3, 4</b> on your TV remote for A, B, C, D!</li>
              <li>• Say <b>“Submit”</b> (or press <b>0</b>) to check all 10 answers</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-sky-400 mb-1">
              🔍 3. Search & Scroll:
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Say <b>“Down”</b> / <b>“Questions”</b> to scroll to the quiz</li>
              <li>• Say <b>“Up”</b> to scroll back to the video</li>
              <li>• Say any topic (e.g. <b>“Space”</b>, <b>“Dinosaurs”</b>) to filter videos</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
