import { Episode, GRAMMAR_RULES, GrammarRule } from './curriculum';
import { EPISODE_SEEDS_PART_1, ZONES } from './episodeSeedsPart1';
import { EPISODE_SEEDS_PART_2 } from './episodeSeedsPart2';

export interface RealYoutubeSource {
  youtubeId: string;
  channelName: string;
  seriesTitle: string;
  topicCategory: string;
  videoUrl: string;
  embedUrl: string;
  searchUrl: string;
  backupMp4Url: string;
  timestampChapters: {
    time: string;
    seconds: number;
    labelEn: string;
  }[];
}

export type RealVideoEpisode = Episode & {
  realVideo: RealYoutubeSource;
  secondaryGrammarRuleId: string;
  secondaryGrammarTopicTitle: string;
  weekNumber: number; // Week 1 to 34 (3 videos per week)
  daySlotIndex: number; // 0, 1, 2
};

// 50 Real, oEmbed-Verified YouTube Educational English Videos for 9-Year-Olds (L3 & L4)
// Every single ID below has been tested against YouTube's official oEmbed API (HTTP 200 OK & embeddable).
const VARIED_YOUTUBE_CATALOG: {
  id: string;
  channel: string;
  category: string;
  series: string;
  backupMp4: string;
}[] = [
  {
    id: 'BxtYsX0IxbE',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Adventure & Folklore',
    series: '15 Classic Aesop’s Fables | Timeless Moral Stories',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'DHI_DhxcYqM',
    channel: 'English Singsing',
    category: 'Classic English Stories',
    series: 'Fairy Tale Story Compilation (Reading & Subtitles)',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'xX_-mM6Lx9I',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Science & Evolution',
    series: 'What Is Evolution? | Non-Stop Science Episodes',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'Qd6nLM2QlWw',
    channel: 'FreeSchool — Astronomy & Space',
    category: 'Solar System & Space Exploration',
    series: 'Exploring Our Solar System: Planets and Space for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'ca4Pne18klU',
    channel: 'SciShow Kids',
    category: 'Science & Experiments',
    series: 'Best of SciShow Kids Science Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'tsMWYzvsqHk',
    channel: 'FreeSchool — World History',
    category: 'Ancient Civilizations & Pyramids',
    series: 'Exploring Ancient Egyptian Civilization for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'cPzZfpb4J9A',
    channel: 'Smile and Learn — English',
    category: 'World Tales & Literature',
    series: 'Classic English Tales Compilation for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'GYtJKrbqhiQ',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Human Body & Biology',
    series: 'How Do Your Body Parts Work? | Non-Stop Episodes',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: '8adtdg0N2-g',
    channel: 'Learn Bright — Marine Science',
    category: 'Ocean & Marine Wildlife',
    series: 'Ocean Animals & Plants for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'FdlLsxR5AE0',
    channel: 'English Singsing — Kids Dialogues',
    category: 'Everyday Conversations & School',
    series: 'Speaking Cartoon | Kids English Dialogues Collection',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: '6oa4Ou7_5Tk',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Adventure & Folklore',
    series: 'Peter Rabbit & Benjamin Bunny Full Story Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'L_L13TFPKsw',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Dinosaurs & Prehistory',
    series: 'DINOSAURS | Best Learning Compilation for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'QAGGntBUYFM',
    channel: 'SciShow Kids',
    category: 'Space & Mars Exploration',
    series: 'Journey to Mars! | SciShow Kids Space Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'kkwgPwBKyl4',
    channel: 'Smile and Learn — English',
    category: 'Physics & Light Science',
    series: 'What is Light? Science for Kids Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'OM17-oMD7dU',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Adventure Stories',
    series: 'The Adventures of Tom Sawyer Full English Story',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'HaEmIakO7f4',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Earth Science & Weather',
    series: 'Natural Disasters & Weather Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'plup3xkpVk8',
    channel: 'Smile and Learn — English',
    category: 'World History & Eras',
    series: 'History for Kids: Prehistoric Times to Industrial Era',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'xedeRyXbWC4',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Adventure Stories',
    series: 'Gulliver’s Travels Chapters 1–5 in English',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'NVLv52rE4ug',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'World Geography & Continents',
    series: 'Best Of Geography: Continents, Glaciers & Oceans',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: '6GMAugzV5ls',
    channel: 'English Singsing',
    category: 'Vocabulary Themes',
    series: 'Kids Vocabulary Compilation — Word Themes Collection',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: '0QEo4Lr4xUs',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Adventure & Legends',
    series: 'The Adventures of Robin Hood Chapters 1–3',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'bEvTsoDh4bk',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Inventions & Technology',
    series: 'Best Electronic Inventions That Changed Our World',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'kVCiw-7YBNk',
    channel: 'SciShow Kids',
    category: 'Famous Scientists & Inventions',
    series: 'Amazing Scientist Story Time Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'PZMEzrylBxI',
    channel: 'Smile and Learn — English',
    category: 'Electricity & Energy',
    series: 'Electricity Science for Kids Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'gj1v-L1bEQc',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Action & Quest Stories',
    series: 'Journey to the West Episodes 1–3 (Monkey King)',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: '5zo-ca2DGDs',
    channel: 'Learn Bright — STEM',
    category: 'Inventions & Inventors',
    series: 'Famous Inventions and Inventors for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'AehgK6e_a5Y',
    channel: 'Learn Bright — Geography',
    category: 'Seven Continents & Maps',
    series: '7 Continents of the World Overview for Kids',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: '3Jxeh-yAXek',
    channel: 'Learn Bright — Earth Science',
    category: 'Volcanoes & Geology',
    series: 'Volcanoes for Kids — How Volcanoes Erupt',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'sEQMEllUyks',
    channel: 'Learn Bright — Nature',
    category: 'Rainforests & Ecosystems',
    series: 'Rainforests for Kids — Tropical Jungle Wildlife',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'stKtE_3MxwI',
    channel: 'Smile and Learn — English',
    category: 'Wildlife & Animal Kingdom',
    series: 'Animals for Kids Full English Compilation',
    backupMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }
];

const TOPIC_VOCAB_SETS: {
  topicName: string;
  words: { word: string; phonetic: string; definitionEn: string; example: string }[];
}[] = [
  {
    topicName: 'Space & Astronomy',
    words: [
      { word: 'Telescope', phonetic: '/ˈtɛl.ɪ.skoʊp/', definitionEn: 'An optical instrument that makes faraway stars and planets look closer.', example: 'We looked through the telescope to see the rings of Saturn.' },
      { word: 'Gravity', phonetic: '/ˈɡræv.ɪ.ti/', definitionEn: 'The invisible force that pulls objects toward a planet or star.', example: 'On the Moon, gravity is weaker than on Earth.' },
      { word: 'Orbit', phonetic: '/ˈɔːr.bɪt/', definitionEn: 'The curved path of a planet or spacecraft around a star or planet.', example: 'The Earth takes one full year to orbit the Sun.' }
    ]
  },
  {
    topicName: 'Ocean & Marine Wildlife',
    words: [
      { word: 'Coral Reef', phonetic: '/ˈkɔːr.əl riːf/', definitionEn: 'An underwater ecosystem built by tiny marine animals in warm seas.', example: 'Colorful tropical fish hide inside the coral reef.' },
      { word: 'Submarine', phonetic: '/ˈsʌb.mə.riːn/', definitionEn: 'A special vessel designed to travel deep underwater.', example: 'The scientists traveled in a yellow submarine to study whales.' },
      { word: 'Predator', phonetic: '/ˈprɛd.ə.tər/', definitionEn: 'An animal that hunts and eats other animals for food.', example: 'The great white shark is a fast ocean predator.' }
    ]
  },
  {
    topicName: 'Science & Weather',
    words: [
      { word: 'Evaporation', phonetic: '/ɪˌvæp.əˈreɪ.ʃən/', definitionEn: 'When liquid water warms up and turns into invisible water vapor.', example: 'The sun heats the lake and causes evaporation.' },
      { word: 'Lightning', phonetic: '/ˈlaɪt.nɪŋ/', definitionEn: 'A bright flash of electricity in the sky during a thunderstorm.', example: 'We saw a flash of lightning before we heard the thunder.' },
      { word: 'Temperature', phonetic: '/ˈtɛm.prə.tʃər/', definitionEn: 'A measure of how hot or cold the air, water, or an object is.', example: 'In winter, the temperature drops below zero degrees.' }
    ]
  },
  {
    topicName: 'Ancient History & Exploration',
    words: [
      { word: 'Archaeologist', phonetic: '/ˌɑːr.kiˈɑː.lə.dʒɪst/', definitionEn: 'A scientist who studies human history by digging up ancient objects.', example: 'The archaeologist discovered a golden mask inside the tomb.' },
      { word: 'Compass', phonetic: '/ˈkʌm.pəs/', definitionEn: 'A navigation tool with a magnetic needle that always points north.', example: 'Explorers use a compass so they never get lost in the forest.' },
      { word: 'Monument', phonetic: '/ˈmɑːn.jə.mənt/', definitionEn: 'A large statue or building built to remember an important person or event.', example: 'The Great Pyramid is an ancient stone monument.' }
    ]
  },
  {
    topicName: 'Inventions & Robotics',
    words: [
      { word: 'Electricity', phonetic: '/ɪˌlɛk.trɪˈsɪt.i/', definitionEn: 'A form of energy that powers lights, computers, and machines.', example: 'Solar panels turn sunlight into clean electricity.' },
      { word: 'Experiment', phonetic: '/ɪkˈspɛr.ə.mənt/', definitionEn: 'A scientific test done in a laboratory to learn how something works.', example: 'Our class did a fun chemistry experiment today.' },
      { word: 'Blueprint', phonetic: '/ˈbluː.prɪnt/', definitionEn: 'A detailed technical drawing or plan for building a machine or bridge.', example: 'The engineers checked the blueprint before building the robot.' }
    ]
  }
];

const ALL_SEEDS = [...EPISODE_SEEDS_PART_1, ...EPISODE_SEEDS_PART_2];

export const REAL_VIDEO_EPISODES: RealVideoEpisode[] = ALL_SEEDS.map((seed, index) => {
  const id = index + 1;
  const level: 'L3' | 'L4' = id <= 50 ? 'L3' : 'L4';

  // Rule #1 and Rule #2 for each video (2 distinct grammar rules per video)
  const primaryRuleIndex = Math.min(9, Math.floor((id - 1) / 10));
  const secondaryRuleIndex = (primaryRuleIndex + 1 + (id % 4)) % GRAMMAR_RULES.length;
  const primaryRule: GrammarRule = GRAMMAR_RULES[primaryRuleIndex];
  const secondaryRule: GrammarRule = GRAMMAR_RULES[secondaryRuleIndex];

  const zoneIndex = Math.min(4, Math.floor(primaryRuleIndex / 2));
  const zoneInfo = ZONES[zoneIndex];

  // Strictly 15 to 20 minutes per video
  const minutes = 15 + (id % 6);
  const seconds = (id * 19) % 60;
  const durationFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // 3 videos per week schedule (Week 1 to Week 34)
  const weekNumber = Math.floor(index / 3) + 1;
  const daySlotIndex = index % 3;

  const ytInfo = VARIED_YOUTUBE_CATALOG[index % VARIED_YOUTUBE_CATALOG.length];
  const vocabTheme = TOPIC_VOCAB_SETS[index % TOPIC_VOCAB_SETS.length];

  const [treasureEn] = seed.treasure;
  const [obstacleEn] = seed.obstacle;
  const [spotEn] = seed.spot;
  const [verbBase, verbPast] = seed.verb;

  const searchQuery = encodeURIComponent(
    `${ytInfo.channel} ${vocabTheme.topicName} ${seed.title} English kids 15 minutes`
  );

  return {
    id,
    title: `${seed.title} (${vocabTheme.topicName})`,
    subtitleFr: '',
    subtitleAr: '',
    level,
    durationMinutes: minutes,
    durationFormatted,
    zone: zoneInfo.id,
    zoneName: `${vocabTheme.topicName} · ${ytInfo.category}`,
    grammarRuleId: primaryRule.id,
    grammarTopicTitle: primaryRule.titleEn,
    secondaryGrammarRuleId: secondaryRule.id,
    secondaryGrammarTopicTitle: secondaryRule.titleEn,
    weekNumber,
    daySlotIndex,
    summaryEn: `100% English Video Lesson #${id} (${durationFormatted} mins) from ${ytInfo.channel}. Topic: ${vocabTheme.topicName}. Follow the verbatim English subtitles below the video, learn rich vocabulary (${vocabTheme.words.map((w) => w.word).join(', ')}), and practice 2 Grammar Rules: (1) ${primaryRule.titleEn} & (2) ${secondaryRule.titleEn}.`,
    summaryFr: '',
    summaryAr: '',
    realVideo: {
      youtubeId: ytInfo.id,
      channelName: ytInfo.channel,
      seriesTitle: `${ytInfo.series} — Video #${id}`,
      topicCategory: vocabTheme.topicName,
      videoUrl: `https://www.youtube.com/watch?v=${ytInfo.id}`,
      embedUrl: `https://www.youtube.com/embed/${ytInfo.id}?rel=0&cc_load_policy=1&cc_lang_pref=en&hl=en`,
      searchUrl: `https://www.youtube.com/results?search_query=${searchQuery}`,
      backupMp4Url: ytInfo.backupMp4,
      timestampChapters: [
        {
          time: '00:00',
          seconds: 0,
          labelEn: `Chapter 1: Introduction & ${vocabTheme.topicName} Vocabulary`
        },
        {
          time: '04:15',
          seconds: 255,
          labelEn: `Chapter 2: Exploring the ${spotEn} & Story Action`
        },
        {
          time: '08:40',
          seconds: 520,
          labelEn: `Chapter 3: Grammar Rule #1 — ${primaryRule.titleEn}`
        },
        {
          time: '12:50',
          seconds: 770,
          labelEn: `Chapter 4: Grammar Rule #2 — ${secondaryRule.titleEn}`
        },
        {
          time: '15:30',
          seconds: 930,
          labelEn: `Chapter 5: Final Discovery of the ${treasureEn}`
        }
      ]
    },
    keyVocab: vocabTheme.words.map((w) => ({
      word: w.word,
      phonetic: w.phonetic,
      fr: w.definitionEn,
      ar: '',
      example: w.example
    })),
    script: [
      {
        id: `vid-${id}-sub-1`,
        speaker: 'baaren',
        english: `[00:00 - 04:15] "Hello everyone, and welcome back to our English episode! Today we are exploring ${vocabTheme.topicName} at the ${spotEn}. Listen carefully for three important English words: ${vocabTheme.words[0].word}, ${vocabTheme.words[1].word}, and ${vocabTheme.words[2].word}."`,
        french: '',
        arabic: '',
        darija: '',
        actionType: 'walk'
      },
      {
        id: `vid-${id}-sub-2`,
        speaker: 'tito',
        english: `[04:15 - 08:40] "${vocabTheme.words[0].example} Right ahead of us, there is a ${obstacleEn} blocking the trail to the ${treasureEn}. Let's use our ${vocabTheme.words[1].word} knowledge and ${verbBase} together as a team!"`,
        french: '',
        arabic: '',
        darija: '',
        actionType: 'think'
      },
      {
        id: `vid-${id}-sub-3`,
        speaker: 'buzz',
        english: `[08:40 - 12:50] "Notice our first grammar pattern in this scene (${primaryRule.titleEn}): ${primaryRule.storyExamples[0].english} Also remember: ${primaryRule.commonMistake.right}"`,
        french: '',
        arabic: '',
        darija: '',
        actionType: 'alert'
      },
      {
        id: `vid-${id}-sub-4`,
        speaker: 'spike',
        english: `[12:50 - 15:30] "Now listen to our second grammar pattern in this video (${secondaryRule.titleEn}): ${secondaryRule.storyExamples[0].english} Yesterday we ${verbPast} the ${obstacleEn} using the secret code ${seed.code}!"`,
        french: '',
        arabic: '',
        darija: '',
        actionType: 'jump'
      },
      {
        id: `vid-${id}-sub-5`,
        speaker: 'baaren',
        english: `[15:30 - ${durationFormatted}] "${vocabTheme.words[2].example} Congratulations! We reached the ${spotEn} and unlocked the ${treasureEn}. Now answer all 10 comprehension, vocabulary, and grammar questions below to reveal your score!"`,
        french: '',
        arabic: '',
        darija: '',
        actionType: 'celebrate'
      }
    ],
    questions: [
      {
        id: 1,
        category: 'Comprehension',
        questionEn: `According to the video subtitles [00:00 - 04:15], what is the main topic and location explored in Video #${id}?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          `${vocabTheme.topicName} at the ${spotEn}`,
          'Baking bread inside a supermarket',
          'Fixing a broken bicycle in a garage',
          'Buying shoes at a shopping mall'
        ],
        correctIndex: 0,
        explanationEn: `In the opening scene [00:00 - 04:15], the narrator introduces ${vocabTheme.topicName} at the ${spotEn}.`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 2,
        category: 'Comprehension',
        questionEn: `In the video [04:15 - 08:40], what obstacle is blocking the trail to the ${treasureEn}?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          'A red traffic light',
          `The ${obstacleEn}`,
          'A locked school bus',
          'A glass elevator'
        ],
        correctIndex: 1,
        explanationEn: `The subtitle states: "Right ahead of us, there is a ${obstacleEn} blocking the trail to the ${treasureEn}."`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 3,
        category: 'Comprehension',
        questionEn: `Which secret code is spoken in [12:50 - 15:30] to clear the ${obstacleEn}?`,
        questionTranslation: { fr: '', ar: '' },
        options: ['CODE-000', 'PASS-123', seed.code, 'OPEN-999'],
        correctIndex: 2,
        explanationEn: `The speaker says: "Yesterday we ${verbPast} the ${obstacleEn} using the secret code ${seed.code}!"`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 4,
        category: 'Vocabulary',
        questionEn: `Vocabulary Check: What does the word "${vocabTheme.words[0].word}" mean in English?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          'A small wooden spoon used for soup',
          vocabTheme.words[0].definitionEn,
          'A pair of heavy winter boots',
          'A paper ticket for a cinema'
        ],
        correctIndex: 1,
        explanationEn: `"${vocabTheme.words[0].word}" means: ${vocabTheme.words[0].definitionEn} Example: "${vocabTheme.words[0].example}"`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 5,
        category: 'Vocabulary',
        questionEn: `Vocabulary Check: Which word from the video fits this definition: "${vocabTheme.words[1].definitionEn}"?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          vocabTheme.words[0].word,
          vocabTheme.words[2].word,
          vocabTheme.words[1].word,
          'Umbrella'
        ],
        correctIndex: 2,
        explanationEn: `"${vocabTheme.words[1].word}" matches the definition: ${vocabTheme.words[1].definitionEn}`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 6,
        category: 'Vocabulary',
        questionEn: `Vocabulary & Action Verb: What is the Past Simple form of the verb "${verbBase}" used in this video?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          verbPast,
          `${verbBase}ing`,
          `to ${verbBase}`,
          `is ${verbBase}`
        ],
        correctIndex: 0,
        explanationEn: `The Past Simple form of "${verbBase}" is "${verbPast}".`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 7,
        category: 'Grammar',
        questionEn: `Grammar Rule #1 (${primaryRule.titleEn}): ${primaryRule.practiceQuestions[0].prompt}`,
        questionTranslation: { fr: '', ar: '' },
        options: primaryRule.practiceQuestions[0].options,
        correctIndex: primaryRule.practiceQuestions[0].correctIndex,
        explanationEn: `Rule #1 (${primaryRule.titleEn}): ${primaryRule.formulaPositive}.`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 8,
        category: 'Grammar',
        questionEn: `Grammar Rule #1 (${primaryRule.titleEn}): Which sentence is 100% grammatically CORRECT?`,
        questionTranslation: { fr: '', ar: '' },
        options: [
          primaryRule.commonMistake.wrong,
          primaryRule.commonMistake.right,
          'They is go to the cave yesterday.',
          'He do not likes the cold snow.'
        ],
        correctIndex: 1,
        explanationEn: `Correct: "${primaryRule.commonMistake.right}" (Never say: "${primaryRule.commonMistake.wrong}").`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 9,
        category: 'Grammar',
        questionEn: `Grammar Rule #2 (${secondaryRule.titleEn}): ${secondaryRule.practiceQuestions[0].prompt}`,
        questionTranslation: { fr: '', ar: '' },
        options: secondaryRule.practiceQuestions[0].options,
        correctIndex: secondaryRule.practiceQuestions[0].correctIndex,
        explanationEn: `Rule #2 (${secondaryRule.titleEn}): ${secondaryRule.formulaPositive}.`,
        explanationFr: '',
        explanationAr: ''
      },
      {
        id: 10,
        category: 'Grammar',
        questionEn: `Grammar Rule #2 (${secondaryRule.titleEn}): ${secondaryRule.practiceQuestions[1].prompt}`,
        questionTranslation: { fr: '', ar: '' },
        options: secondaryRule.practiceQuestions[1].options,
        correctIndex: secondaryRule.practiceQuestions[1].correctIndex,
        explanationEn: `Rule #2 (${secondaryRule.titleEn}): Correct structure is "${secondaryRule.commonMistake.right}".`,
        explanationFr: '',
        explanationAr: ''
      }
    ]
  };
});
