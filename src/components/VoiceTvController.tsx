import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Tv,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  HelpCircle,
  CheckCircle2,
  Sparkles,
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
  one: 1, un: 1, واحد: 1, '1': 1, first: 1,
  two: 2, deux: 2, جوج: 2, اثنان: 2, '2': 2, second: 2,
  three: 3, trois: 3, ثلاثة: 3, تلاتة: 3, '3': 3, third: 3,
  four: 4, quatre: 4, اربعة: 4, ربعة: 4, '4': 4, fourth: 4,
  five: 5, cinq: 5, خمسة: 5, '5': 5, fifth: 5,
  six: 6, ستة: 6, '6': 6, sixth: 6,
  seven: 7, sept: 7, سبعة: 7, '7': 7, seventh: 7,
  eight: 8, huit: 8, ثمانية: 8, تمنية: 8, '8': 8, eighth: 8,
  nine: 9, neuf: 9, تسعة: 9, تسعود: 9, '9': 9, ninth: 9,
  ten: 10, dix: 10, عشرة: 10, '10': 10, tenth: 10
};

function parseOptionLetter(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  if (/\b(option a|answer a|letter a|choice a|reponse a|réponse a|خيار a|أ|a)\b/.test(s)) return 0;
  if (/\b(option b|answer b|letter b|choice b|reponse b|réponse b|خيار b|ب|b|bee|be)\b/.test(s)) return 1;
  if (/\b(option c|answer c|letter c|choice c|reponse c|réponse c|خيار c|ج|c|see|sea)\b/.test(s)) return 2;
  if (/\b(option d|answer d|letter d|choice d|reponse d|réponse d|خيار d|د|d|dee)\b/.test(s)) return 3;
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
  const [isListening, setIsListening] = useState<boolean>(false);
  const [continuousMode, setContinuousMode] = useState<boolean>(true);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  const [lastFeedback, setLastFeedback] = useState<string>(
    'Press MIC or OK on your TV Remote and speak: "Play video", "Video 5", "Question 1 Option A", "Submit"...'
  );
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);
  const [manualCommandInput, setManualCommandInput] = useState<string>('');
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'fr-FR' | 'ar-MA'>('en-US');

  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef<boolean>(false);
  const voiceInputBoxRef = useRef<HTMLInputElement | null>(null);

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
      // ignore speech synthesis errors on some TVs
    }
  }, []);

  const executeSpokenCommand = useCallback(
    (rawTranscript: string) => {
      const text = rawTranscript.toLowerCase().trim();
      if (!text) return;

      setLastTranscript(rawTranscript);

      // 1. Check for Question + Option in one sentence: e.g., "question 3 option b" or "question two a" or "سؤال 1 ب"
      const qMatch = text.match(
        /(?:question|سؤال|كيسيون|q)\s*(10|[1-9]|one|two|three|four|five|six|seven|eight|nine|ten|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|واحد|جوج|ثلاثة|تلاتة|ربعة|خمسة|ستة|سبعة|تمنية|تسعود|عشرة)/i
      );
      if (qMatch) {
        const token = qMatch[1].toLowerCase();
        const qNum = NUMBER_WORDS[token] || parseInt(token, 10);
        if (qNum >= 1 && qNum <= 10) {
          onChangeActiveQuestionNumber(qNum);

          // Check if user also said option A/B/C/D in the same command
          const afterQ = text.slice((qMatch.index || 0) + qMatch[0].length);
          const optIdx = parseOptionLetter(afterQ);
          if (optIdx !== null) {
            const letter = ['A', 'B', 'C', 'D'][optIdx];
            onAnswerQuestion(qNum, optIdx);
            const msg = `Selected Option ${letter} for Question ${qNum}`;
            setLastFeedback(`✓ ${msg}`);
            speakFeedback(msg);
            if (qNum < 10) {
              onChangeActiveQuestionNumber(qNum + 1);
            }
            return;
          } else {
            onReadQuestionAloud(qNum);
            setLastFeedback(`✓ Focused on Question ${qNum} (Say "Option A, B, C, or D")`);
            return;
          }
        }
      }

      // 2. Direct Option selection for the currently active question: e.g., "option A", "answer B", "choice C", "A", "B", "C", "D"
      const directOpt = parseOptionLetter(text);
      if (
        directOpt !== null &&
        (text.length <= 2 ||
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

      // 3. Read Question Aloud: "read question" / "read"
      if (text.includes('read question') || text.includes('read aloud') || text === 'read') {
        onReadQuestionAloud(activeQuestionNumber);
        setLastFeedback(`🔊 Reading Question ${activeQuestionNumber} aloud...`);
        return;
      }

      // 4. Submit Quiz / Check Answers
      if (
        text.includes('submit') ||
        text.includes('check answer') ||
        text.includes('show answer') ||
        text.includes('show solution') ||
        text.includes('finish quiz') ||
        text.includes('valider') ||
        text.includes('النتيجة') ||
        text.includes('تصحيح')
      ) {
        onSubmitQuiz();
        setLastFeedback('✓ Submitted all 10 answers & revealed solutions!');
        speakFeedback('Checking your ten answers now.');
        return;
      }

      // 5. Reset Quiz
      if (text.includes('reset quiz') || text.includes('try again') || text.includes('restart quiz')) {
        onResetQuiz();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('✓ Quiz reset to Question 1');
        speakFeedback('Quiz reset.');
        return;
      }

      // 6. Select specific Video / Episode number (1 to 100): e.g. "video 12", "episode 5", "فيديو 3"
      const epMatch = text.match(
        /(?:video|episode|lesson|number|vidéo|فيديو|حلقة|درس)\s*(100|[1-9][0-9]?|one|two|three|four|five|six|seven|eight|nine|ten)/i
      );
      if (epMatch) {
        const token = epMatch[1].toLowerCase();
        const epNum = NUMBER_WORDS[token] || parseInt(token, 10);
        if (epNum >= 1 && epNum <= 100) {
          onSelectEpisode(epNum);
          onChangeActiveQuestionNumber(1);
          const msg = `Opening Video number ${epNum}`;
          setLastFeedback(`🎬 ${msg}`);
          speakFeedback(msg);
          return;
        }
      }

      // 7. Next / Previous Video
      if (
        text.includes('next video') ||
        text.includes('next episode') ||
        text === 'next' ||
        text.includes('suivant') ||
        text.includes('الفيديو التالي') ||
        text.includes('زيد')
      ) {
        onNextEpisode();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('⏭️ Switched to Next Video');
        speakFeedback('Next video');
        return;
      }

      if (
        text.includes('previous video') ||
        text.includes('previous episode') ||
        text.includes('back video') ||
        text === 'previous' ||
        text.includes('précédent') ||
        text.includes('الفيديو السابق') ||
        text.includes('رجع')
      ) {
        onPrevEpisode();
        onChangeActiveQuestionNumber(1);
        setLastFeedback('⏮️ Switched to Previous Video');
        speakFeedback('Previous video');
        return;
      }

      // 8. Video Player Controls: Play, Pause, Mute, Unmute, Restart, Forward, Backward
      if (
        text === 'play' ||
        text.includes('play video') ||
        text.includes('start video') ||
        text.includes('شغل') ||
        text.includes('خدم الفيديو') ||
        text.includes('lecture')
      ) {
        onVideoCommand('play');
        setLastFeedback('▶️ Playing YouTube Video');
        return;
      }

      if (
        text === 'pause' ||
        text === 'stop' ||
        text.includes('pause video') ||
        text.includes('stop video') ||
        text.includes('حبس') ||
        text.includes('وقف')
      ) {
        onVideoCommand('pause');
        setLastFeedback('⏸️ Paused YouTube Video');
        return;
      }

      if (text.includes('unmute') || text.includes('sound on') || text.includes('طلق الصوت')) {
        onVideoCommand('unmute');
        setLastFeedback('🔊 Video Sound Unmuted');
        return;
      }

      if (text.includes('mute') || text.includes('sound off') || text.includes('قطع الصوت')) {
        onVideoCommand('mute');
        setLastFeedback('🔇 Video Muted');
        return;
      }

      if (text.includes('restart video') || text.includes('from beginning') || text.includes('عاود من الاول')) {
        onVideoCommand('restart');
        setLastFeedback('⏪ Restarted Video from 00:00');
        return;
      }

      if (text.includes('forward') || text.includes('skip ahead')) {
        onVideoCommand('forward');
        setLastFeedback('⏩ Skipped Forward 30s');
        return;
      }

      if (text.includes('backward') || text.includes('rewind')) {
        onVideoCommand('backward');
        setLastFeedback('⏪ Rewound 30s');
        return;
      }

      // 9. Navigation Tabs (Schedule / Calendar, Grammar Lab, Videos)
      if (
        text.includes('schedule') ||
        text.includes('calendar') ||
        text.includes('planning') ||
        text.includes('جدول') ||
        text.includes('كالندري')
      ) {
        onSwitchTab('calendar');
        setLastFeedback('📅 Opened 3/Week Schedule Calendar');
        speakFeedback('Opening schedule calendar');
        return;
      }

      if (text.includes('grammar') || text.includes('غرامار') || text.includes('قواعد')) {
        onSwitchTab('grammar');
        setLastFeedback('📖 Opened Grammar Lab');
        speakFeedback('Opening grammar lab');
        return;
      }

      if (text.includes('all videos') || text.includes('home') || text.includes('100 videos')) {
        onSwitchTab('videos');
        setLastFeedback('🎬 Opened 100 Videos Stage');
        return;
      }

      // 10. Scroll Down / Scroll Up for TV
      if (
        text.includes('scroll down') ||
        text.includes('go down') ||
        text.includes('questions') ||
        text.includes('quiz') ||
        text.includes('هبط') ||
        text.includes('اسئلة')
      ) {
        window.scrollBy({ top: 550, behavior: 'smooth' });
        setLastFeedback('⬇️ Scrolled Down to Questions');
        return;
      }

      if (
        text.includes('scroll up') ||
        text.includes('go up') ||
        text.includes('top') ||
        text.includes('طلع')
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLastFeedback('⬆️ Scrolled Up to Video Player');
        return;
      }

      // 11. Level Filter
      if (text.includes('level 3') || text.includes('level l3')) {
        onFilterLevel('L3');
        setLastFeedback('✓ Filtered to Level L3 (Videos 1–50)');
        return;
      }
      if (text.includes('level 4') || text.includes('level l4')) {
        onFilterLevel('L4');
        setLastFeedback('✓ Filtered to Level L4 (Videos 51–100)');
        return;
      }

      // 12. Voice Search / Dictation into Search Box
      if (text.startsWith('search ') || text.startsWith('find ') || text.startsWith('قلب على ')) {
        const query = text
          .replace(/^(search|find|قلب على)\s+/i, '')
          .trim();
        onSearchText(query);
        setLastFeedback(`🔍 Voice Search: "${query}"`);
        speakFeedback(`Searching for ${query}`);
        return;
      }

      if (text.includes('clear search') || text.includes('show all')) {
        onSearchText('');
        onFilterLevel('ALL');
        setLastFeedback('✓ Cleared search filter (Showing all 100 videos)');
        return;
      }

      // Default: If user dictated a topic name (like "space", "dinosaurs", "animals"), search for it!
      if (text.length >= 3) {
        onSearchText(text);
        setLastFeedback(`🔍 Heard "${rawTranscript}" — Searching videos for "${rawTranscript}"`);
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

  // Setup Web Speech API (SpeechRecognition / webkitSpeechRecognition)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = voiceLang;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const lastResultIdx = event.results.length - 1;
      const transcript = event.results[lastResultIdx][0].transcript;
      if (transcript) {
        executeSpokenCommand(transcript);
      }
    };

    recognition.onerror = () => {
      // On TV browsers, if mic times out, restart if continuousMode is active
    };

    recognition.onend = () => {
      if (shouldKeepListeningRef.current && continuousMode) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldKeepListeningRef.current = false;
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };
  }, [voiceLang, continuousMode, executeSpokenCommand]);

  const toggleVoiceListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      // Fallback for Smart TV remotes whose built-in Mic types into a focused input field:
      voiceInputBoxRef.current?.focus();
      setLastFeedback(
        '🎙️ Focused Voice Box! Press the Microphone button on your TV Remote and speak.'
      );
      return;
    }

    if (isListening) {
      shouldKeepListeningRef.current = false;
      try {
        recognition.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      setLastFeedback('🎙️ Voice Mic Paused. Click or press OK to start listening again.');
    } else {
      shouldKeepListeningRef.current = true;
      try {
        recognition.lang = voiceLang;
        recognition.start();
        setIsListening(true);
        setLastFeedback(
          '🟢 LISTENING LIVE! Speak now: "Play video", "Video 3", "Question 1 Option A", "Submit"...'
        );
      } catch {
        voiceInputBoxRef.current?.focus();
      }
    }
  };

  // Global TV Remote Keyboard & D-Pad Shortcuts (Numbers 1-4 for A/B/C/D, Media Play/Pause, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if typing inside an input other than our TV command bar
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === '1' || e.key.toLowerCase() === 'a') {
        onAnswerQuestion(activeQuestionNumber, 0);
        setLastFeedback(`✓ Remote Key: Question ${activeQuestionNumber} → Option A`);
      } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
        onAnswerQuestion(activeQuestionNumber, 1);
        setLastFeedback(`✓ Remote Key: Question ${activeQuestionNumber} → Option B`);
      } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
        onAnswerQuestion(activeQuestionNumber, 2);
        setLastFeedback(`✓ Remote Key: Question ${activeQuestionNumber} → Option C`);
      } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
        onAnswerQuestion(activeQuestionNumber, 3);
        setLastFeedback(`✓ Remote Key: Question ${activeQuestionNumber} → Option D`);
      } else if (e.key === 'MediaPlayPause' || e.key === 'MediaPlay') {
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
  }, [activeQuestionNumber, onAnswerQuestion, onNextEpisode, onPrevEpisode, onVideoCommand]);

  const handleManualVoiceBoxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCommandInput.trim()) return;
    executeSpokenCommand(manualCommandInput);
    setManualCommandInput('');
  };

  return (
    <div className="mb-5 rounded-2xl bg-slate-900 text-white border-2 border-amber-400 shadow-lg p-3.5 sm:p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Giant TV Remote Voice Mic Button + Live Status */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleVoiceListening}
            className={`px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer shadow-md focus:ring-4 focus:ring-white ${
              isListening
                ? 'bg-emerald-500 text-slate-950 animate-pulse'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-5 h-5" />
                <span>🟢 VOICE MIC ON (SPEAK NOW)</span>
              </>
            ) : (
              <>
                <MicOff className="w-5 h-5" />
                <span>🎙️ START TV VOICE CONTROL</span>
              </>
            )}
          </button>

          {/* Language Selector for Voice Recognition (English / Français / الدارجة) */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            {(
              [
                { code: 'en-US', label: 'EN Voice' },
                { code: 'fr-FR', label: 'FR Voix' },
                { code: 'ar-MA', label: 'صوت عربي/دارجة' }
              ] as const
            ).map((l) => (
              <button
                key={l.code}
                onClick={() => setVoiceLang(l.code)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  voiceLang === l.code
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Quick TV Remote One-Click / OK Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onVideoCommand('play')}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer focus:ring-2 focus:ring-amber-400"
              title="Play Video"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Play</span>
            </button>
            <button
              onClick={() => onVideoCommand('pause')}
              className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer focus:ring-2 focus:ring-amber-400"
              title="Pause Video"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
            <button
              onClick={onPrevEpisode}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer focus:ring-2 focus:ring-amber-400"
              title="Previous Video"
            >
              <SkipBack className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              onClick={onNextEpisode}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer focus:ring-2 focus:ring-amber-400"
              title="Next Video"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>
          </div>
        </div>

        {/* Right: Smart TV Remote Dictation Input Box (Works with ALL Android TV / LG / Samsung Remote Mic Buttons!) */}
        <form
          onSubmit={handleManualVoiceBoxSubmit}
          className="flex items-center gap-2 flex-1 max-w-md"
        >
          <div className="relative flex-1">
            <Tv className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={voiceInputBoxRef}
              type="text"
              value={manualCommandInput}
              onChange={(e) => {
                setManualCommandInput(e.target.value);
                // Auto-execute when TV remote voice dictation pastes a full command
              }}
              placeholder='TV Remote Mic Box: Say "Video 2", "Option A", "Play"...'
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs whitespace-nowrap cursor-pointer"
          >
            Run
          </button>
          <button
            type="button"
            onClick={() => setShowHelpGuide((p) => !p)}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Commands</span>
            {showHelpGuide ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </form>
      </div>

      {/* Live Status Strip: Shows Active Question on TV & What Voice Command Was Heard */}
      <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 font-mono-num font-bold">
            TV Focus: Video #{currentEpisodeId} · Active Question #{activeQuestionNumber}/10
          </span>
          <button
            onClick={() => onReadQuestionAloud(activeQuestionNumber)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Read Q{activeQuestionNumber} Aloud</span>
          </button>
          {lastTranscript && (
            <span className="text-emerald-300 font-semibold">
              You said: “{lastTranscript}”
            </span>
          )}
        </div>

        <div className="text-slate-300 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{lastFeedback}</span>
        </div>
      </div>

      {/* Expandable List of Voice Commands for TV */}
      {showHelpGuide && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-amber-400 mb-1">
              🎬 1. Control Videos by Voice:
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Say <b>“Play video”</b> or <b>“شغل”</b> to start playing</li>
              <li>• Say <b>“Pause video”</b> or <b>“حبس”</b> to pause</li>
              <li>• Say <b>“Video 5”</b> or <b>“فيديو 5”</b> (1 to 100)</li>
              <li>• Say <b>“Next video”</b> / <b>“Previous video”</b></li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-emerald-400 mb-1">
              ✅ 2. Answer Quiz Questions by Voice:
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Say <b>“Option A”</b>, <b>“Option B”</b>, <b>“Option C”</b>, or <b>“Option D”</b></li>
              <li>• Or say <b>“Question 3 Option B”</b></li>
              <li>• Say <b>“Read question”</b> to hear it spoken aloud</li>
              <li>• Say <b>“Submit”</b> or <b>“Check answers”</b> when done</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-sky-400 mb-1">
              🔍 3. Type in Boxes & Navigate by Voice:
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Say <b>“Search dinosaurs”</b> or <b>“Search space”</b></li>
              <li>• Say <b>“Scroll down”</b> / <b>“Scroll up”</b></li>
              <li>• Say <b>“Schedule”</b> or <b>“Grammar”</b> to switch tabs</li>
              <li>• Or press <b>1, 2, 3, 4</b> on your TV remote for A, B, C, D!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
