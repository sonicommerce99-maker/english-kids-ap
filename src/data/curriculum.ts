export type CharacterId = 'baaren' | 'tito' | 'spike' | 'buzz' | 'gloom';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  role: string;
  species: string;
  color: string;
  voicePitch: number;
  voiceRate: number;
  catchphrase: string;
  bio: string;
}

export interface DialogueLine {
  id: string;
  speaker: CharacterId;
  english: string;
  french: string;
  arabic: string;
  darija: string;
  vocabWord?: {
    word: string;
    meaningEn: string;
    meaningFr: string;
    meaningAr: string;
  };
  actionType: 'walk' | 'jump' | 'celebrate' | 'alert' | 'think';
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionTranslation: {
    fr: string;
    ar: string;
  };
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationFr: string;
  explanationAr: string;
  category: 'Comprehension' | 'Grammar' | 'Vocabulary';
}

export type WorldZoneId = 'meadow' | 'desert' | 'snow' | 'hive' | 'castle';

export interface Episode {
  id: number; // 1 to 100
  title: string;
  subtitleFr: string;
  subtitleAr: string;
  level: 'L3' | 'L4';
  durationMinutes: number; // 15 to 20
  durationFormatted: string; // e.g., "17:45"
  zone: WorldZoneId;
  zoneName: string;
  grammarRuleId: string;
  grammarTopicTitle: string;
  summaryEn: string;
  summaryFr: string;
  summaryAr: string;
  keyVocab: {
    word: string;
    phonetic: string;
    fr: string;
    ar: string;
    example: string;
  }[];
  script: DialogueLine[];
  questions: QuizQuestion[]; // Strictly 10 questions per episode
}

export interface GrammarRule {
  id: string;
  level: 'L3' | 'L4';
  code: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  whenToUseEn: string;
  whenToUseFr: string;
  whenToUseAr: string;
  formulaPositive: string;
  formulaNegative: string;
  formulaQuestion: string;
  storyExamples: {
    speaker: CharacterId;
    english: string;
    french: string;
    arabic: string;
    highlight: string;
  }[];
  commonMistake: {
    wrong: string;
    right: string;
    tipFr: string;
    tipAr: string;
  };
  practiceQuestions: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanationFr: string;
    explanationAr: string;
  }[];
}

export const CHARACTERS: Record<CharacterId, CharacterInfo> = {
  baaren: {
    id: 'baaren',
    name: 'Baaren the Bear',
    role: 'Brave Explorer & Team Leader',
    species: 'Brown Blocky Bear',
    color: '#B45309',
    voicePitch: 1.0,
    voiceRate: 0.92,
    catchphrase: 'Let us explore together and never give up!',
    bio: 'Baaren loves honey, climbing green hills, and rescuing his blocky friends from purple honey traps.'
  },
  tito: {
    id: 'tito',
    name: 'Tito the Turtle',
    role: 'Clever Navigator & Puzzle Solver',
    species: 'Friendly Green Turtle',
    color: '#15803D',
    voicePitch: 1.22,
    voiceRate: 0.95,
    catchphrase: 'Wait a second! Look at the map first!',
    bio: 'Tito is Baaren’s best friend. He reads ancient maps, counts golden coins, and solves tricky riddles.'
  },
  spike: {
    id: 'spike',
    name: 'Spike the Shell',
    role: 'Strong Guardian & Bridge Builder',
    species: 'Blue Spiky Turtle',
    color: '#1D4ED8',
    voicePitch: 0.82,
    voiceRate: 0.88,
    catchphrase: 'My spiky shell can break any rock!',
    bio: 'Spike looks tough with his blue spikes, but he is very kind and always protects the team from falling boulders.'
  },
  buzz: {
    id: 'buzz',
    name: 'Queen Buzz & Scout Bees',
    role: 'Sky Guides & Honey Makers',
    species: 'Royal Golden Bees',
    color: '#CA8A04',
    voicePitch: 1.35,
    voiceRate: 1.0,
    catchphrase: 'Bzzz! Follow the golden flowers to the hive!',
    bio: 'Queen Buzz watches over the Giant Beehive Kingdom and shares magical golden honey with polite adventurers.'
  },
  gloom: {
    id: 'gloom',
    name: 'Gloom the Purple Bear',
    role: 'Mischievous Trickster',
    species: 'Purple Blocky Bear',
    color: '#7E22CE',
    voicePitch: 0.78,
    voiceRate: 0.9,
    catchphrase: 'Hehehe! All the golden cages are locked!',
    bio: 'Gloom is a grumpy purple bear who hides keys and builds mazes, though he secretly wants to play with Baaren.'
  }
};

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'l3-present-simple',
    level: 'L3',
    code: 'L3 · Rule 01',
    titleEn: 'Present Simple (Habits & Daily Routines)',
    titleFr: 'Le Présent Simple (Habitudes et Vérités)',
    titleAr: 'المضارع البسيط (العادات والروتين اليومي)',
    whenToUseEn: 'Use the Present Simple to talk about things we do every day, facts, and habits in the Bear Kingdom.',
    whenToUseFr: 'On utilise le Present Simple pour parler des habitudes de tous les jours et des vérités générales. Attention au "-s" avec He / She / It !',
    whenToUseAr: 'نستخدم المضارع البسيط للتحدث عن العادات اليومية والحقائق. لا تنسَ إضافة حرف (s) للفعل مع He و She و It!',
    formulaPositive: 'I/You/We/They + Verb  |  He/She/It + Verb + s/es',
    formulaNegative: 'I/You/We/They + do not (don’t) + Verb  |  He/She/It + does not (doesn’t) + Verb',
    formulaQuestion: 'Do + I/you/we/they + Verb?  |  Does + he/she/it + Verb?',
    storyExamples: [
      {
        speaker: 'baaren',
        english: 'Baaren collects golden honey every morning.',
        french: 'Baaren récolte du miel doré chaque matin.',
        arabic: 'يجمع بارين العسل الذهبي كل صباح.',
        highlight: 'collects'
      },
      {
        speaker: 'tito',
        english: 'Tito and Spike do not like grumpy purple traps.',
        french: 'Tito et Spike n’aiment pas les pièges violets.',
        arabic: 'تيتو وسبايك لا يحبان الفخاخ البنفسجية.',
        highlight: 'do not like'
      },
      {
        speaker: 'buzz',
        english: 'Does Queen Buzz live inside the giant beehive?',
        french: 'Est-ce que la Reine Buzz habite dans la ruche géante ?',
        arabic: 'هل تعيش الملكة باز داخل خلية النحل العملاقة؟',
        highlight: 'Does ... live'
      }
    ],
    commonMistake: {
      wrong: 'He collect golden coins every day.',
      right: 'He collects golden coins every day.',
      tipFr: 'Avec "He" (Baaren/Tito), on ajoute toujours un "s" au verbe au présent !',
      tipAr: 'مع الضمير المفرد (He/She/It) نضيف دائماً حرف s للفعل في المضارع البسيط.'
    },
    practiceQuestions: [
      {
        prompt: 'Every morning, Baaren _____ across the green meadow.',
        options: ['run', 'runs', 'running', 'is run'],
        correctIndex: 1,
        explanationFr: 'Baaren = He (singulier), donc le verbe prend "-s" -> runs.',
        explanationAr: 'لأن Baaren مفرد (He)، نضيف s للفعل فيصبح runs.'
      },
      {
        prompt: '_____ Tito have the secret map in his backpack?',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 1,
        explanationFr: 'Pour poser une question avec "Tito" (He), on utilise "Does".',
        explanationAr: 'للسؤال عن المفرد (Tito = He) نستخدم الفعل المساعد Does.'
      }
    ]
  },
  {
    id: 'l3-present-continuous',
    level: 'L3',
    code: 'L3 · Rule 02',
    titleEn: 'Present Continuous (Actions Happening Right Now)',
    titleFr: 'Le Présent Continu (Action en train de se passer)',
    titleAr: 'المضارع المستمر (أفعال تحدث الآن)',
    whenToUseEn: 'Use Present Continuous for actions happening right now in front of our eyes (Look! Listen! Now!).',
    whenToUseFr: 'On l’utilise pour une action qui se déroule exactement maintenant (Now, Look!, Listen!). On met "am / is / are" + verbe en "-ing".',
    whenToUseAr: 'نستخدمه للتعبير عن شيء يحدث في هذه اللحظة الآن (Now / Look!). نضع (am / is / are) ثم نضيف (ing) للفعل.',
    formulaPositive: 'Subject + am / is / are + Verb-ing',
    formulaNegative: 'Subject + am not / isn’t / aren’t + Verb-ing',
    formulaQuestion: 'Am / Is / Are + Subject + Verb-ing?',
    storyExamples: [
      {
        speaker: 'tito',
        english: 'Look! Baaren is climbing the tall yellow beehive right now!',
        french: 'Regarde ! Baaren est en train d’escalader la grande ruche jaune maintenant !',
        arabic: 'انظر! بارين يتسلق خلية النحل الصفراء الطويلة الآن!',
        highlight: 'is climbing'
      },
      {
        speaker: 'buzz',
        english: 'The scout bees are flying above the green hills.',
        french: 'Les abeilles éclaireuses volent au-dessus des collines vertes.',
        arabic: 'النحلات الكشافة تطير فوق التلال الخضراء.',
        highlight: 'are flying'
      }
    ],
    commonMistake: {
      wrong: 'Look! Gloom running away with the key!',
      right: 'Look! Gloom is running away with the key!',
      tipFr: 'N’oublie jamais le petit verbe "is" ou "are" avant le verbe en -ing !',
      tipAr: 'لا تنسَ وضع فعل الكينونة (is أو are) قبل الفعل المنتهي بـ ing.'
    },
    practiceQuestions: [
      {
        prompt: 'Listen! The bees _____ a happy song near the flowers.',
        options: ['sing', 'sings', 'are singing', 'is singing'],
        correctIndex: 2,
        explanationFr: '"The bees" est pluriel (They), et "Listen!" indique que c’est maintenant -> are singing.',
        explanationAr: 'كلمة Listen تدل على المضارع المستمر، و The bees جمع فنختار are singing.'
      },
      {
        prompt: 'What _____ Spike doing next to the bridge right now?',
        options: ['do', 'does', 'is', 'are'],
        correctIndex: 2,
        explanationFr: 'Spike est singulier (He) et il y a "doing" (-ing) -> is.',
        explanationAr: 'Spike مفرد وبعده فعل فيه ing لذلك نستخدم is.'
      }
    ]
  },
  {
    id: 'l3-modals-can-must',
    level: 'L3',
    code: 'L3 · Rule 03',
    titleEn: 'Can / Can’t (Ability) & Must / Mustn’t (Rules)',
    titleFr: 'Can / Can’t (Capacité) et Must / Mustn’t (Obligation)',
    titleAr: 'أفعال القدرة والواجب (Can / Can’t و Must / Mustn’t)',
    whenToUseEn: 'Use "can" to say what a character is able to do, and "must" for important adventure rules and safety.',
    whenToUseFr: '"Can" exprime ce qu’on est capable de faire (pouvoir). "Must" exprime une règle importante ou une obligation (devoir). Le verbe après ne change jamais !',
    whenToUseAr: 'نستخدم Can للتعبير عن القدرة والاستطاعة، ونستخدم Must للقواعد والواجب. الفعل بعدهما يأتي دائماً في صورته الأصلية بدون أي إضافات!',
    formulaPositive: 'Subject + can / must + Base Verb (no "to", no "-s")',
    formulaNegative: 'Subject + cannot (can’t) / must not (mustn’t) + Base Verb',
    formulaQuestion: 'Can + Subject + Base Verb?',
    storyExamples: [
      {
        speaker: 'spike',
        english: 'I can swim fast in the river, and my shell can block rocks!',
        french: 'Je sais nager vite dans la rivière, et ma carapace peut bloquer les rochers !',
        arabic: 'أستطيع السباحة بسرعة في النهر، وصدفتي تستطيع صد الصخور!',
        highlight: 'can swim / can block'
      },
      {
        speaker: 'baaren',
        english: 'We must find the three golden keys, and we mustn’t touch the purple slime!',
        french: 'Nous devons trouver les trois clés d’or, et nous ne devons pas toucher la boue violette !',
        arabic: 'يجب أن نجد المفاتيح الذهبية الثلاثة، ويجب ألا نلمس الوحل البنفسجي!',
        highlight: 'must find / mustn’t touch'
      }
    ],
    commonMistake: {
      wrong: 'Baaren can jumps very high.',
      right: 'Baaren can jump very high.',
      tipFr: 'Après "can" ou "must", le verbe ne prend JAMAIS de "s" ni de "to" !',
      tipAr: 'بعد can أو must يأتي الفعل مجرداً تماماً بدون s وبدون to.'
    },
    practiceQuestions: [
      {
        prompt: 'Tito is a turtle, so he _____ fly like Queen Buzz.',
        options: ['can', 'can’t', 'must', 'is'],
        correctIndex: 1,
        explanationFr: 'Une tortue ne peut pas voler -> can’t (cannot).',
        explanationAr: 'السلحفاة لا تستطيع الطيران، لذلك نختار can’t.'
      },
      {
        prompt: 'You _____ be careful on the icy snow bridge!',
        options: ['must', 'must to', 'cans', 'are'],
        correctIndex: 0,
        explanationFr: 'C’est une règle de sécurité -> must + be (sans "to").',
        explanationAr: 'هذه قاعدة للسلامة فنستخدم must بدون to.'
      }
    ]
  },
  {
    id: 'l3-prepositions-thereis',
    level: 'L3',
    code: 'L3 · Rule 04',
    titleEn: 'There is / There are & Prepositions of Place',
    titleFr: 'Il y a (There is / There are) et Prépositions de Lieu',
    titleAr: 'يوجد للمفرد والجمع (There is / There are) وحروف جر المكان',
    whenToUseEn: 'Use "There is" for one thing, "There are" for two or more things, and prepositions (in, on, under, behind, between, next to) to describe where treasures hide.',
    whenToUseFr: '"There is" = il y a (1 seule chose). "There are" = il y a (plusieurs choses). Les prépositions indiquent où se cache l’objet (under = sous, behind = derrière, between = entre).',
    whenToUseAr: 'نستخدم There is للمفرد (شيء واحد) و There are للجمع (أكثر من شيء)، مع كلمات المكان مثل under (تحت) و behind (خلف) و between (بين).',
    formulaPositive: 'There is + 1 item  |  There are + 2+ items',
    formulaNegative: 'There isn’t + 1 item  |  There aren’t + any items',
    formulaQuestion: 'Is there a ...?  |  Are there any ...?',
    storyExamples: [
      {
        speaker: 'tito',
        english: 'There is a shiny golden key hidden behind the waterfall!',
        french: 'Il y a une clé dorée brillante cachée derrière la cascade !',
        arabic: 'يوجد مفتاح ذهبي لامع مخبأ خلف الشلال!',
        highlight: 'There is ... behind'
      },
      {
        speaker: 'baaren',
        english: 'There are four guard bees flying between the two yellow towers.',
        french: 'Il y a quatre abeilles gardiennes qui volent entre les deux tours jaunes.',
        arabic: 'توجد أربع نحلات حارسات يطرن بين البرجين الأصفرين.',
        highlight: 'There are ... between'
      }
    ],
    commonMistake: {
      wrong: 'There is three golden boxes on the hill.',
      right: 'There are three golden boxes on the hill.',
      tipFr: 'Trois boîtes = pluriel, donc on utilise "There are" !',
      tipAr: 'ثلاثة صناديق جمع، لذلك يجب استخدام There are وليس There is.'
    },
    practiceQuestions: [
      {
        prompt: 'Look! _____ five delicious honey jars on the table.',
        options: ['There is', 'There are', 'It is', 'They is'],
        correctIndex: 1,
        explanationFr: 'Cinq pots de miel (pluriel) -> There are.',
        explanationAr: 'خمس جرار عسل جمع، فنختار There are.'
      },
      {
        prompt: 'Gloom is hiding _____ the big purple rock so nobody can see him.',
        options: ['behind', 'between', 'into', 'from'],
        correctIndex: 0,
        explanationFr: '"Behind" veut dire "derrière" le gros rocher.',
        explanationAr: 'كلمة behind تعني "خلف" الصخرة الكبيرة.'
      }
    ]
  },
  {
    id: 'l3-past-simple-be-regular',
    level: 'L3',
    code: 'L3 · Rule 05',
    titleEn: 'Past Simple: Was / Were & Regular Verbs (-ed)',
    titleFr: 'Le Passé Simple : Was / Were et Verbes Réguliers (-ed)',
    titleAr: 'الماضي البسيط: (Was / Were) والأفعال المنتظمة (-ed)',
    whenToUseEn: 'Use the Past Simple to talk about yesterday’s adventures! Use was/were for "be", and add "-ed" to regular action verbs.',
    whenToUseFr: 'Pour raconter une aventure terminée (yesterday = hier, last night = hier soir). On utilise "was" (singulier), "were" (pluriel), ou on ajoute "-ed" à la fin des verbes réguliers.',
    whenToUseAr: 'نستخدم الماضي البسيط للتحدث عن مغامرات حدثت وانتهت (مثل أمس yesterday). نستخدم was للمفرد، were للجمع، ونضيف ed للأفعال المنتظمة.',
    formulaPositive: 'I/He/She/It was | We/You/They were | Subject + Verb-ed (played, jumped, opened)',
    formulaNegative: 'wasn’t / weren’t  |  Subject + didn’t + Base Verb (didn’t jump)',
    formulaQuestion: 'Was/Were + Subject...?  |  Did + Subject + Base Verb?',
    storyExamples: [
      {
        speaker: 'baaren',
        english: 'Yesterday, we walked across the desert and opened the ancient door.',
        french: 'Hier, nous avons marché à travers le désert et avons ouvert la porte ancienne.',
        arabic: 'أمس، مشينا عبر الصحراء وفتحنا الباب القديم.',
        highlight: 'walked / opened'
      },
      {
        speaker: 'spike',
        english: 'The sandstorm was loud, but we weren’t afraid at all!',
        french: 'La tempête de sable était bruyante, mais nous n’avions pas peur du tout !',
        arabic: 'كانت العاصفة الرملية عالية الصوت، لكننا لم نكن خائفين أبداً!',
        highlight: 'was / weren’t'
      }
    ],
    commonMistake: {
      wrong: 'Did you opened the treasure chest?',
      right: 'Did you open the treasure chest?',
      tipFr: 'Quand il y a "Did" ou "didn’t", il prend déjà la marque du passé : le verbe revient à la forme normale (open) sans -ed !',
      tipAr: 'عند وجود Did أو didn’t في الجملة، يعود الفعل إلى أصله بدون إضافة ed!'
    },
    practiceQuestions: [
      {
        prompt: 'Yesterday afternoon, Baaren _____ over the wooden fence.',
        options: ['jump', 'jumps', 'jumped', 'jumping'],
        correctIndex: 2,
        explanationFr: '"Yesterday" indique le passé -> jumped (-ed).',
        explanationAr: 'كلمة Yesterday تدل على الماضي، فنختار jumped.'
      },
      {
        prompt: '_____ Tito and Spike inside the snow cave last night?',
        options: ['Was', 'Were', 'Did', 'Are'],
        correctIndex: 1,
        explanationFr: 'Tito et Spike sont deux (They = pluriel) -> Were.',
        explanationAr: 'تيتو وسبايك جمع (اثنان) في الماضي، لذلك نستخدم Were.'
      }
    ]
  },
  {
    id: 'l4-past-simple-irregular',
    level: 'L4',
    code: 'L4 · Rule 06',
    titleEn: 'Past Simple: Irregular Adventure Verbs',
    titleFr: 'Le Passé Simple : Les Verbes Irréguliers d’Aventure',
    titleAr: 'الماضي البسيط: الأفعال غير المنتظمة في المغامرات',
    whenToUseEn: 'Some important English verbs change completely in the past instead of taking "-ed": go -> went, see -> saw, find -> found, take -> took, give -> gave, make -> made.',
    whenToUseFr: 'En niveau L4, on maîtrise les verbes irréguliers qui changent de forme au passé : go -> went (aller), see -> saw (voir), find -> found (trouver), have -> had (avoir), fly -> flew (voler).',
    whenToUseAr: 'في المستوى الرابع L4 نتعلم الأفعال غير المنتظمة التي يتغير شكلها في الماضي بدلاً من إضافة ed، مثل: go تصبح went، و find تصبح found، و see تصبح saw.',
    formulaPositive: 'Subject + Irregular Past Form (went, saw, found, took, built, spoke)',
    formulaNegative: 'Subject + didn’t + Base Verb (didn’t go, didn’t see, didn’t find)',
    formulaQuestion: 'Did + Subject + Base Verb? (Where did you go? What did you find?)',
    storyExamples: [
      {
        speaker: 'tito',
        english: 'We went inside the crystal cave and found a glowing compass!',
        french: 'Nous sommes allés dans la grotte de cristal et avons trouvé une boussole lumineuse !',
        arabic: 'ذهبنا إلى داخل كهف الكريستال ووجدنا بوصلة مضيئة!',
        highlight: 'went / found'
      },
      {
        speaker: 'buzz',
        english: 'Queen Buzz flew high in the sky and saw Gloom’s secret boat.',
        french: 'La Reine Buzz a volé haut dans le ciel et a vu le bateau secret de Gloom.',
        arabic: 'طارت الملكة باز عالياً في السماء ورأت قارب غلوم السري.',
        highlight: 'flew / saw'
      }
    ],
    commonMistake: {
      wrong: 'We didn’t went to the castle yesterday.',
      right: 'We didn’t go to the castle yesterday.',
      tipFr: 'Après "didn’t", on remet toujours le verbe à l’infinitif (go, see, find) !',
      tipAr: 'بعد didn’t أو Did نعيد الفعل دائماً إلى أصله (go وليس went).'
    },
    practiceQuestions: [
      {
        prompt: 'Last week, Baaren _____ a secret tunnel under the beehive.',
        options: ['finded', 'found', 'find', 'finding'],
        correctIndex: 1,
        explanationFr: 'Le passé irrégulier du verbe "find" (trouver) est "found".',
        explanationAr: 'الماضي من الفعل غير المنتظم find هو found.'
      },
      {
        prompt: 'Where did Gloom _____ the golden crown?',
        options: ['took', 'take', 'taked', 'taking'],
        correctIndex: 1,
        explanationFr: 'Il y a déjà "did" dans la question, donc on garde "take".',
        explanationAr: 'بسبب وجود did في السؤال، نختار الفعل الأصلي take.'
      }
    ]
  },
  {
    id: 'l4-comparatives-superlatives',
    level: 'L4',
    code: 'L4 · Rule 07',
    titleEn: 'Comparatives (-er than) & Superlatives (the -est)',
    titleFr: 'Comparatifs (plus... que) et Superlatifs (le plus...)',
    titleAr: 'المقارنة (أكثر من -er than) والتفضيل (الأعلى the -est)',
    whenToUseEn: 'Use Comparatives to compare two characters or places (bigger than, more dangerous than). Use Superlatives to say who is #1 in the whole kingdom (the fastest, the most exciting).',
    whenToUseFr: 'Pour comparer 2 éléments : adjectif court + "-er than" (faster than) ou "more + adjectif long + than". Pour désigner le numéro 1 : "the + -est" (the tallest) ou "the most + adjectif long".',
    whenToUseAr: 'للمقارنة بين شيئين نضيف er للصفة القصيرة مع than (مثل faster than) أو نضع more قبل الصفة الطويلة. وللتفضيل نضع the ونضيف est (مثل the biggest).',
    formulaPositive: 'Short Adj: taller than / the tallest  |  Long Adj: more careful than / the most careful',
    formulaNegative: 'Irregulars: good -> better than -> the best  |  bad -> worse than -> the worst',
    formulaQuestion: 'Who is faster, Baaren or Tito?  |  Which mountain is the highest?',
    storyExamples: [
      {
        speaker: 'spike',
        english: 'My blue shell is stronger than wood, and Snow Peak is the coldest mountain in the world!',
        french: 'Ma carapace bleue est plus solide que le bois, et le Pic Enneigé est la montagne la plus froide du monde !',
        arabic: 'صدفتي الزرقاء أقوى من الخشب، وقمة الثلج هي أبرد جبل في العالم!',
        highlight: 'stronger than / the coldest'
      },
      {
        speaker: 'baaren',
        english: 'Teamwork is better than working alone, and this is the most exciting adventure!',
        french: 'Le travail d’équipe est meilleur que travailler seul, et c’est l’aventure la plus passionnante !',
        arabic: 'العمل الجماعي أفضل من العمل وحيداً، وهذه هي المغامرة الأكثر إثارة!',
        highlight: 'better than / the most exciting'
      }
    ],
    commonMistake: {
      wrong: 'This puzzle is more easy than the first one.',
      right: 'This puzzle is easier than the first one.',
      tipFr: 'Pour les adjectifs qui finissent par "-y" (easy, happy, heavy), le "y" devient "-ier" (easier, happier) !',
      tipAr: 'الصفات المنتهية بحرف y مثل easy تقلب فيها الـ y إلى ier عند المقارنة فتصبح easier.'
    },
    practiceQuestions: [
      {
        prompt: 'The Giant Beehive is _____ building in the whole meadow.',
        options: ['taller', 'the tallest', 'most tall', 'tallest than'],
        correctIndex: 1,
        explanationFr: 'On compare avec toute la prairie ("in the whole meadow"), c’est le superlatif : "the tallest".',
        explanationAr: 'لأننا نفضل المبنى على كل المباني في المرج، نستخدم صيغة التفضيل the tallest.'
      },
      {
        prompt: 'Crossing the lava bridge is _____ than walking on the grass.',
        options: ['dangerous', 'more dangerous', 'dangerouser', 'the most dangerous'],
        correctIndex: 1,
        explanationFr: '"Dangerous" est un adjectif long et il y a "than" -> more dangerous.',
        explanationAr: 'صفة dangerous طويلة وبعدها than لذلك نختار more dangerous.'
      }
    ]
  },
  {
    id: 'l4-future-going-to-will',
    level: 'L4',
    code: 'L4 · Rule 08',
    titleEn: 'Future Plans (Be Going To) & Promises (Will)',
    titleFr: 'Le Futur : Projets (Going to) et Promesses (Will)',
    titleAr: 'المستقبل: الخطط (Going to) والوعود والتوقعات (Will)',
    whenToUseEn: 'Use "am/is/are going to + verb" when you already have a plan. Use "will + verb" for quick promises, offers to help, or predictions.',
    whenToUseFr: 'On utilise "be going to" quand on a déjà prévu un plan d’aventure. On utilise "will" pour faire une promesse immédiate ("I will help you!") ou une prédiction.',
    whenToUseAr: 'نستخدم (am/is/are going to) عندما نتحدث عن خطة قررناها مسبقاً، ونستخدم (will) للوعود السريعة وعرض المساعدة أو التوقعات.',
    formulaPositive: 'Plan: am/is/are + going to + Verb  |  Promise: Subject + will + Verb',
    formulaNegative: 'am not / isn’t / aren’t going to + Verb  |  Subject + won’t (will not) + Verb',
    formulaQuestion: 'Are you going to + Verb?  |  Will you + Verb?',
    storyExamples: [
      {
        speaker: 'tito',
        english: 'Look at our map! Tomorrow morning, we are going to sail to Turtle Island.',
        french: 'Regarde notre carte ! Demain matin, nous allons naviguer vers l’Île des Tortues.',
        arabic: 'انظر إلى خريطتنا! غداً صباحاً سوف نبحر إلى جزيرة السلاحف.',
        highlight: 'are going to sail'
      },
      {
        speaker: 'baaren',
        english: 'Don’t worry, little bee! I will rescue your sister right away!',
        french: 'Ne t’inquiète pas, petite abeille ! Je vais secourir ta sœur tout de suite !',
        arabic: 'لا تقلقي أيتها النحلة الصغيرة! سأنقذ أختك فوراً!',
        highlight: 'will rescue'
      }
    ],
    commonMistake: {
      wrong: 'We going to build a raft tomorrow.',
      right: 'We are going to build a raft tomorrow.',
      tipFr: 'N’oublie jamais "am / is / are" devant "going to" !',
      tipAr: 'لا تنسَ وضع (am / is / are) قبل عبارة going to.'
    },
    practiceQuestions: [
      {
        prompt: 'I promise I _____ share my golden honey with everyone!',
        options: ['will', 'going to', 'am going', 'wills'],
        correctIndex: 0,
        explanationFr: 'Avec "I promise" (une promesse), on utilise toujours "will".',
        explanationAr: 'مع الوعود (I promise) نستخدم دائماً will.'
      },
      {
        prompt: 'Next Saturday, Baaren and Tito _____ explore the Sky Temple.',
        options: ['is going to', 'are going to', 'going to', 'will to'],
        correctIndex: 1,
        explanationFr: 'Baaren et Tito (pluriel) ont un projet prévu -> are going to.',
        explanationAr: 'بارين وتيتو جمع ولديهم خطة للأسبوع القادم، فنختار are going to.'
      }
    ]
  },
  {
    id: 'l4-past-continuous-when',
    level: 'L4',
    code: 'L4 · Rule 09',
    titleEn: 'Past Continuous (Was/Were + -ing) with "When"',
    titleFr: 'Le Passé Continu (Action longue interrompue par "When")',
    titleAr: 'الماضي المستمر (Was/Were + ing) مع أداة الربط (When)',
    whenToUseEn: 'Use Past Continuous (was/were + verb-ing) for a long action in progress in the past, and Past Simple after "when" for a short action that interrupted it!',
    whenToUseFr: 'Très utile pour raconter une histoire ! L’action longue qui était en cours utilise "was/were + -ing", et l’événement soudain après "when" utilise le Past Simple.',
    whenToUseAr: 'مهم جداً في سرد القصص! الحدث الطويل الذي كان مستمراً في الماضي يأخذ (was/were + ing)، والحدث المفاجئ القصير بعد (when) يأخذ الماضي البسيط.',
    formulaPositive: 'Subject + was / were + Verb-ing ... WHEN + Subject + Past Simple',
    formulaNegative: 'Subject + wasn’t / weren’t + Verb-ing',
    formulaQuestion: 'What were you doing when the bell rang?',
    storyExamples: [
      {
        speaker: 'baaren',
        english: 'We were crossing the wooden bridge when Gloom jumped out of the bush!',
        french: 'Nous étions en train de traverser le pont en bois quand Gloom a bondi hors du buisson !',
        arabic: 'كنا نعبر الجسر الخشبي عندما قفز غلوم فجأة من الشجيرة!',
        highlight: 'were crossing ... when ... jumped'
      },
      {
        speaker: 'spike',
        english: 'Tito was reading the ancient scroll when a golden key fell from the ceiling.',
        french: 'Tito lisait le parchemin ancien quand une clé d’or est tombée du plafond.',
        arabic: 'كان تيتو يقرأ اللفافة القديمة عندما سقط مفتاح ذهبي من السقف.',
        highlight: 'was reading ... when ... fell'
      }
    ],
    commonMistake: {
      wrong: 'They was sleeping when the storm started.',
      right: 'They were sleeping when the storm started.',
      tipFr: 'Avec "We / You / They", on utilise toujours "were" (et non "was") !',
      tipAr: 'مع الضمائر (We / You / They) نستخدم دائماً were وليس was.'
    },
    practiceQuestions: [
      {
        prompt: 'Baaren _____ honey when he heard a strange noise.',
        options: ['ate', 'was eating', 'were eating', 'is eating'],
        correctIndex: 1,
        explanationFr: 'Action longue en cours dans le passé avec Baaren (singulier) -> was eating.',
        explanationAr: 'حدث كان مستمراً في الماضي مع مفرد (Baaren) فنختار was eating.'
      },
      {
        prompt: 'The bees were dancing when the rain suddenly _____.',
        options: ['start', 'was starting', 'started', 'starts'],
        correctIndex: 2,
        explanationFr: 'Après "when", l’action courte et soudaine se met au Past Simple -> started.',
        explanationAr: 'بعد when يأتي الحدث المفاجئ القصير في الماضي البسيط started.'
      }
    ]
  },
  {
    id: 'l4-first-conditional-connectors',
    level: 'L4',
    code: 'L4 · Rule 10',
    titleEn: 'First Conditional (If + Present, Will + Verb) & Connectors (Because / So)',
    titleFr: 'Conditionnel Réel (Si... alors) et Connecteurs (Parce que / Donc)',
    titleAr: 'الشرط الأول (إذا If... سوف Will) وأدوات الربط (لأن Because / لذلك So)',
    whenToUseEn: 'Use "If + Present Simple, ... will + verb" to talk about real possibilities in the adventure. Use "because" to give a reason and "so" to show the result!',
    whenToUseFr: 'Après "If" (si), on met le présent simple, et dans la deuxième partie on met "will" ! "Because" explique la cause (parce que), et "so" indique la conséquence (donc).',
    whenToUseAr: 'بعد أداة الشرط (If) نضع المضارع البسيط، وفي جواب الشرط نضع (will + الفعل). ونستخدم because لبيان السبب، و so لبيان النتيجة!',
    formulaPositive: 'If + Subject + Present Simple, Subject + will + Base Verb',
    formulaNegative: 'Reason: ... because + cause  |  Result: ... , so + result',
    formulaQuestion: 'What will happen if we pull this golden lever?',
    storyExamples: [
      {
        speaker: 'tito',
        english: 'If we solve the three riddles, the giant gate will open!',
        french: 'Si nous résolvons les trois énigmes, la porte géante s’ouvrira !',
        arabic: 'إذا حللنا الألغاز الثلاثة، سوف تفتح البوابة العملاقة!',
        highlight: 'If we solve ... will open'
      },
      {
        speaker: 'gloom',
        english: 'I hid the key because I wanted to play a game with you, so let’s race together!',
        french: 'J’ai caché la clé parce que je voulais jouer avec vous, alors faisons la course ensemble !',
        arabic: 'خبأت المفتاح لأنني أردت اللعب معكم، لذلك دعونا نتسابق معاً!',
        highlight: 'because ... so'
      }
    ],
    commonMistake: {
      wrong: 'If it will rain, we will stay in the cave.',
      right: 'If it rains, we will stay in the cave.',
      tipFr: 'Jamais de "will" juste après "If" ! Après "If", on utilise le présent simple (If it rains).',
      tipAr: 'لا نضع will مباشرة في جملة If! بعد If نستخدم المضارع البسيط (rains).'
    },
    practiceQuestions: [
      {
        prompt: 'If Baaren _____ the red button, the secret elevator will come down.',
        options: ['press', 'presses', 'will press', 'pressed'],
        correctIndex: 1,
        explanationFr: 'Après "If", on utilise le Present Simple. Avec Baaren (He), cela donne "presses".',
        explanationAr: 'بعد If نستخدم المضارع البسيط، ومع المفرد (Baaren) نختار presses.'
      },
      {
        prompt: 'Spike carried the heavy stone _____ he is the strongest guardian in the team.',
        options: ['so', 'because', 'if', 'but'],
        correctIndex: 1,
        explanationFr: 'C’est la raison / l’explication -> because (parce que).',
        explanationAr: 'هنا نذكر السبب، لذلك نستخدم because (لأنه).'
      }
    ]
  }
];
