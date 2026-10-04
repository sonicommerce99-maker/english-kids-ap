import { Episode, GRAMMAR_RULES, GrammarRule, QuizQuestion } from './curriculum';
import { ZONES } from './episodeSeedsPart1';

export interface RealYoutubeSource {
  youtubeId: string;
  channelName: string;
  seriesTitle: string;
  topicCategory: string;
  videoUrl: string;
  embedUrl: string;
  searchUrl: string;
  clipStartSeconds: number;
  clipEndSeconds: number;
}

export type RealVideoEpisode = Episode & {
  realVideo: RealYoutubeSource;
  secondaryGrammarRuleId: string;
  secondaryGrammarTopicTitle: string;
  weekNumber: number; // Week 1 to 34 (3 videos per week)
  daySlotIndex: number; // 0, 1, 2
};

interface CuratedVideoTopic {
  id: string;
  channel: string;
  category: string;
  realVideoTitle: string;
  summary: string;
  vocab: [
    { word: string; phonetic: string; definitionEn: string; example: string },
    { word: string; phonetic: string; definitionEn: string; example: string },
    { word: string; phonetic: string; definitionEn: string; example: string }
  ];
  comprehensionFacts: {
    mainSubject: string;
    keyAction: string;
    importantPlaceOrObject: string;
    lessonTakeaway: string;
  };
}

// 30 Verified, Embeddable Real YouTube Educational Videos with Matching Titles, Vocabulary & Comprehension Facts
const CURATED_YOUTUBE_VIDEOS: CuratedVideoTopic[] = [
  {
    id: 'BxtYsX0IxbE',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Moral Fables',
    realVideoTitle: 'Classic Aesop’s Fables — Timeless Moral Stories in English',
    summary: 'Watch classic animated Aesop’s Fables in clear English with subtitles, featuring clever animals, moral lessons, and everyday storytelling verbs.',
    vocab: [
      { word: 'Fable', phonetic: '/ˈfeɪ.bəl/', definitionEn: 'A short story, typically with animals as characters, that teaches a moral lesson.', example: 'The fable of the Tortoise and the Hare teaches patience and effort.' },
      { word: 'Greed', phonetic: '/ɡriːd/', definitionEn: 'A strong and selfish desire to have more of something than you need.', example: 'Because of greed, the farmer lost his golden goose.' },
      { word: 'Clever', phonetic: '/ˈklɛv.ər/', definitionEn: 'Quick to understand, learn, and devise smart ideas.', example: 'The clever fox found a smart way out of the deep well.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Animal characters learning important life morals in Aesop’s Fables',
      keyAction: 'Solving problems through patience, honesty, and clever thinking instead of greed',
      importantPlaceOrObject: 'Villages, forests, and farms where the fables take place',
      lessonTakeaway: 'Kindness, honesty, and steady effort always win over selfishness'
    }
  },
  {
    id: 'DHI_DhxcYqM',
    channel: 'English Singsing',
    category: 'Classic Fairy Tales',
    realVideoTitle: 'English Fairy Tale Stories — Reading & Listening Compilation',
    summary: 'Follow classic English fairy tales with clear spoken dialogue and on-screen English subtitles designed for young learners.',
    vocab: [
      { word: 'Kingdom', phonetic: '/ˈkɪŋ.dəm/', definitionEn: 'A country, state, or territory ruled by a king or queen.', example: 'The brave prince traveled across the entire kingdom.' },
      { word: 'Courage', phonetic: '/ˈkɜːr.ɪdʒ/', definitionEn: 'The ability to do something brave even when it feels frightening.', example: 'It takes courage to speak the truth and help a friend.' },
      { word: 'Journey', phonetic: '/ˈdʒɜːr.ni/', definitionEn: 'An act of traveling from one place to another over a long distance.', example: 'Their journey through the enchanted woods lasted three days.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Classic fairy tale heroes and heroines on magical adventures',
      keyAction: 'Overcoming challenges and helping others during a long journey',
      importantPlaceOrObject: 'Castles, royal kingdoms, and forest paths',
      lessonTakeaway: 'Courage and kindness help characters succeed in every story'
    }
  },
  {
    id: 'xX_-mM6Lx9I',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Science & Evolution',
    realVideoTitle: 'What Is Evolution? — How Living Things Adapt (Dr. Binocs)',
    summary: 'Dr. Binocs explains how animals and plants adapt and evolve over millions of years to survive in changing environments.',
    vocab: [
      { word: 'Adaptation', phonetic: '/ˌæd.æpˈteɪ.ʃən/', definitionEn: 'A special feature or behavior that helps a plant or animal survive in its habitat.', example: 'Thick white fur is an adaptation for polar bears in the Arctic.' },
      { word: 'Species', phonetic: '/ˈspiː.ʃiːz/', definitionEn: 'A group of similar living organisms that can reproduce with one another.', example: 'Scientists discovered a new species of frog in the rainforest.' },
      { word: 'Ancestor', phonetic: '/ˈæn.sɛs.tər/', definitionEn: 'An early type of animal or plant from which modern species evolved.', example: 'Mammoths are ancient relatives and ancestors of modern elephants.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How animals and species change and adapt over time with Dr. Binocs',
      keyAction: 'Adapting to new climates, food sources, and habitats to survive',
      importantPlaceOrObject: 'Oceans, continents, and natural habitats across Earth',
      lessonTakeaway: 'Living things develop special adaptations to survive in their environment'
    }
  },
  {
    id: 'Qd6nLM2QlWw',
    channel: 'FreeSchool — Astronomy & Space',
    category: 'Solar System & Planets',
    realVideoTitle: 'Exploring Our Solar System: Planets and Space for Kids',
    summary: 'Travel from the Sun through Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune to learn real astronomy vocabulary.',
    vocab: [
      { word: 'Orbit', phonetic: '/ˈɔːr.bɪt/', definitionEn: 'The curved path of a planet or moon around a star or planet.', example: 'All eight planets orbit around the Sun.' },
      { word: 'Atmosphere', phonetic: '/ˈæt.mə.sfɪər/', definitionEn: 'The layer of gases surrounding a planet.', example: 'Earth has an oxygen-rich atmosphere that allows us to breathe.' },
      { word: 'Gravity', phonetic: '/ˈɡræv.ɪ.ti/', definitionEn: 'The invisible force that pulls objects toward a planet or star.', example: 'The Sun’s strong gravity keeps the planets in their orbits.' }
    ],
    comprehensionFacts: {
      mainSubject: 'The Sun and the eight planets of our Solar System',
      keyAction: 'Orbiting the Sun and comparing rocky planets with giant gas planets',
      importantPlaceOrObject: 'The Solar System, Saturn’s rings, and Jupiter’s Great Red Spot',
      lessonTakeaway: 'Each planet has a unique size, temperature, atmosphere, and orbit'
    }
  },
  {
    id: 'ca4Pne18klU',
    channel: 'SciShow Kids',
    category: 'Science & Experiments',
    realVideoTitle: 'How Does the World Work? — SciShow Kids Science Special',
    summary: 'Join Jessi and Squeaks the Robot Lab Rat to ask big science questions, test hypotheses, and discover how nature works.',
    vocab: [
      { word: 'Experiment', phonetic: '/ɪkˈspɛr.ə.mənt/', definitionEn: 'A scientific test performed to discover or prove how something works.', example: 'We did a water experiment to see which objects float or sink.' },
      { word: 'Observe', phonetic: '/əbˈzɜːrv/', definitionEn: 'To watch something carefully in order to learn information about it.', example: 'Scientists observe caterpillars turning into butterflies.' },
      { word: 'Hypothesis', phonetic: '/haɪˈpɑː.θə.sɪs/', definitionEn: 'A smart scientific guess that you can test with an experiment.', example: 'Our hypothesis is that plants grow faster in bright sunlight.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Scientific curiosity, experiments, and nature discoveries with SciShow Kids',
      keyAction: 'Observing carefully, asking questions, and testing a hypothesis',
      importantPlaceOrObject: 'The science laboratory and the natural world outside',
      lessonTakeaway: 'Scientists learn by observing carefully and testing their ideas'
    }
  },
  {
    id: 'tsMWYzvsqHk',
    channel: 'FreeSchool — World History',
    category: 'Ancient Egypt & History',
    realVideoTitle: 'Exploring Ancient Egyptian Civilization & Pyramids for Kids',
    summary: 'Discover how Ancient Egyptians built the Great Pyramids along the Nile River, wrote in hieroglyphics, and ruled as pharaohs.',
    vocab: [
      { word: 'Civilization', phonetic: '/ˌsɪv.ə.ləˈzeɪ.ʃən/', definitionEn: 'An organized society with its own cities, writing, art, and government.', example: 'Ancient Egypt was one of the world’s oldest civilizations.' },
      { word: 'Hieroglyphics', phonetic: '/ˌhaɪ.rəˈɡlɪf.ɪks/', definitionEn: 'The ancient Egyptian writing system that used pictures and symbols.', example: 'Scribes carved hieroglyphics onto temple walls and papyrus.' },
      { word: 'Pyramid', phonetic: '/ˈpɪr.ə.mɪd/', definitionEn: 'A monumental stone structure with a square base and four triangular sides.', example: 'The Great Pyramid of Giza was built near the Nile River.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Ancient Egyptian civilization, pharaohs, and pyramids',
      keyAction: 'Farming along the Nile River, building stone pyramids, and writing in hieroglyphics',
      importantPlaceOrObject: 'The Nile River and the Great Pyramids of Giza',
      lessonTakeaway: 'The Nile River made Ancient Egypt a rich and advanced civilization'
    }
  },
  {
    id: 'cPzZfpb4J9A',
    channel: 'Smile and Learn — English',
    category: 'World Tales & Reading',
    realVideoTitle: 'Classic Tales in English — Smile and Learn Storytime',
    summary: 'Listen to illustrated classic tales in clear English to build reading comprehension, past-tense verbs, and descriptive adjectives.',
    vocab: [
      { word: 'Character', phonetic: '/ˈkær.ək.tər/', definitionEn: 'A person or animal who appears in a story, book, or movie.', example: 'Who is your favorite character in this English story?' },
      { word: 'Generous', phonetic: '/ˈdʒɛn.ər.əs/', definitionEn: 'Happy to share time, food, or gifts with other people.', example: 'The generous baker shared warm bread with the hungry travelers.' },
      { word: 'Promise', phonetic: '/ˈprɑː.mɪs/', definitionEn: 'A firm statement that you will definitely do something.', example: 'She kept her promise and returned the golden ring.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Classic story characters learning about promises and generosity',
      keyAction: 'Making wise choices and helping friends in need',
      importantPlaceOrObject: 'Towns, cottages, and enchanted castles in classic stories',
      lessonTakeaway: 'Keeping promises and being generous brings happiness to everyone'
    }
  },
  {
    id: 'GYtJKrbqhiQ',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Human Body & Biology',
    realVideoTitle: 'How Do Your Body Parts Work? — Human Body Science (Dr. Binocs)',
    summary: 'Explore how the human heart, brain, lungs, stomach, and bones work together every second to keep us healthy and active.',
    vocab: [
      { word: 'Organ', phonetic: '/ˈɔːr.ɡən/', definitionEn: 'A part of the body, such as the heart or brain, that performs a specific job.', example: 'The heart is a muscular organ that pumps blood through the body.' },
      { word: 'Oxygen', phonetic: '/ˈɑːk.sɪ.dʒən/', definitionEn: 'A colorless gas in the air that humans and animals breathe to stay alive.', example: 'Our lungs take in fresh oxygen every time we breathe in.' },
      { word: 'Digestion', phonetic: '/daɪˈdʒɛs.tʃən/', definitionEn: 'The process of breaking down food in the stomach so the body gets energy.', example: 'Healthy vegetables and water help our digestion.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How human body organs like the brain, heart, and lungs work',
      keyAction: 'Pumping blood, breathing oxygen, and digesting food for energy',
      importantPlaceOrObject: 'Inside the human body (brain, lungs, heart, and bones)',
      lessonTakeaway: 'Every organ in the human body has a vital job to keep us healthy'
    }
  },
  {
    id: '8adtdg0N2-g',
    channel: 'Learn Bright — Marine Science',
    category: 'Oceans & Sea Creatures',
    realVideoTitle: 'Ocean Animals & Marine Life for Kids — Learn Bright',
    summary: 'Dive beneath the waves to learn about whales, dolphins, sharks, octopuses, sea turtles, and colorful coral reefs.',
    vocab: [
      { word: 'Marine', phonetic: '/məˈriːn/', definitionEn: 'Related to or living in the sea and ocean.', example: 'Marine biologists study whales, dolphins, and coral reefs.' },
      { word: 'Mammal', phonetic: '/ˈmæm.əl/', definitionEn: 'A warm-blooded animal that breathes air and feeds milk to its babies.', example: 'Dolphins and blue whales are ocean mammals, not fish.' },
      { word: 'Camouflage', phonetic: '/ˈkæm.ə.flɑːʒ/', definitionEn: 'Colors or patterns that help an animal blend in with its surroundings.', example: 'An octopus uses camouflage to hide on the rocky ocean floor.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Ocean animals, marine mammals, and underwater plants',
      keyAction: 'Swimming, breathing, and using camouflage to survive in the ocean',
      importantPlaceOrObject: 'Coral reefs and the deep ocean zones',
      lessonTakeaway: 'Oceans are home to diverse marine mammals, fish, and plants'
    }
  },
  {
    id: 'FdlLsxR5AE0',
    channel: 'English Singsing — Kids Dialogues',
    category: 'Everyday English Dialogues',
    realVideoTitle: 'Everyday English Conversations & Dialogues for Kids',
    summary: 'Practice real-life English conversations for school, home, shopping, hobbies, and asking polite questions with friends.',
    vocab: [
      { word: 'Conversation', phonetic: '/ˌkɑːn.vərˈseɪ.ʃən/', definitionEn: 'A friendly talk between two or more people.', example: 'We had an English conversation about our favorite sports.' },
      { word: 'Polite', phonetic: '/pəˈlaɪt/', definitionEn: 'Showing good manners and respect toward other people.', example: 'It is polite to say "please" and "thank you" every day.' },
      { word: 'Schedule', phonetic: '/ˈskɛdʒ.uːl/', definitionEn: 'A plan of times and activities for school or the week.', example: 'Our school schedule includes English, science, and art.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Everyday English dialogues between friends at school and home',
      keyAction: 'Greeting friends, asking polite questions, and talking about daily routines',
      importantPlaceOrObject: 'Classrooms, playgrounds, and family homes',
      lessonTakeaway: 'Clear questions and polite expressions make everyday conversations easy'
    }
  },
  {
    id: '6oa4Ou7_5Tk',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Children’s Literature',
    realVideoTitle: 'Peter Rabbit & Benjamin Bunny — Animated English Story',
    summary: 'Follow mischievous Peter Rabbit and his cousin Benjamin Bunny as they sneak into Mr. McGregor’s vegetable garden.',
    vocab: [
      { word: 'Garden', phonetic: '/ˈɡɑːr.dən/', definitionEn: 'A piece of ground where flowers, fruits, and vegetables are grown.', example: 'Peter Rabbit ate fresh carrots and lettuce in the garden.' },
      { word: 'Mischief', phonetic: '/ˈmɪs.tʃɪf/', definitionEn: 'Playful misbehavior that causes minor trouble.', example: 'The little rabbits got into mischief under the garden fence.' },
      { word: 'Escape', phonetic: '/ɪˈskeɪp/', definitionEn: 'To get away safely from danger or a locked place.', example: 'Peter managed to escape through the wooden gate just in time.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Peter Rabbit and Benjamin Bunny’s adventures in Mr. McGregor’s garden',
      keyAction: 'Sneaking under the fence, losing a blue jacket, and escaping safely home',
      importantPlaceOrObject: 'Mr. McGregor’s vegetable garden and the rabbit burrow',
      lessonTakeaway: 'Listening to parents’ advice keeps young explorers out of danger'
    }
  },
  {
    id: 'L_L13TFPKsw',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Dinosaurs & Fossils',
    realVideoTitle: 'DINOSAURS — Prehistoric Reptiles & Fossils (Dr. Binocs)',
    summary: 'Travel back to the Mesozoic Era with Dr. Binocs to meet herbivores, carnivores, T-Rex, Triceratops, and paleontologists.',
    vocab: [
      { word: 'Fossil', phonetic: '/ˈfɑː.səl/', definitionEn: 'The preserved remains or impression of a prehistoric plant or animal in rock.', example: 'Scientists dug up a giant dinosaur fossil in the desert.' },
      { word: 'Herbivore', phonetic: '/ˈhɜːr.bɪ.vɔːr/', definitionEn: 'An animal that eats only plants, leaves, and fruits.', example: 'Brachiosaurus was a giant herbivore that ate treetop leaves.' },
      { word: 'Extinct', phonetic: '/ɪkˈstɪŋkt/', definitionEn: 'No longer existing anywhere on Earth.', example: 'Dinosaurs became extinct sixty-five million years ago.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Dinosaurs, fossils, herbivores, and carnivores in prehistoric times',
      keyAction: 'Studying dinosaur fossils to learn what dinosaurs ate and how they lived',
      importantPlaceOrObject: 'Prehistoric forests and fossil excavation sites',
      lessonTakeaway: 'Fossils teach us how giant herbivores and carnivores lived millions of years ago'
    }
  },
  {
    id: 'QAGGntBUYFM',
    channel: 'SciShow Kids',
    category: 'Space & Mars Rovers',
    realVideoTitle: 'Journey to Mars! — Space Rovers & Red Planet Science',
    summary: 'Learn why Mars is called the Red Planet and how robotic rovers like Curiosity and Perseverance explore Martian rocks and craters.',
    vocab: [
      { word: 'Rover', phonetic: '/ˈroʊ.vər/', definitionEn: 'A robotic vehicle designed to drive across the surface of another planet.', example: 'The Mars rover takes high-resolution photos of red rocks.' },
      { word: 'Crater', phonetic: '/ˈkreɪ.tər/', definitionEn: 'A large bowl-shaped hole on a planet or moon caused by a meteorite impact.', example: 'The rover explored an ancient lake bed inside a wide crater.' },
      { word: 'Surface', phonetic: '/ˈsɜːr.fɪs/', definitionEn: 'The outside or top layer of a planet, land, or ocean.', example: 'Iron dust on the surface of Mars makes the planet look red.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Exploring the Red Planet Mars with robotic space rovers',
      keyAction: 'Driving across craters and testing Martian rocks and soil',
      importantPlaceOrObject: 'The dusty red surface and craters of planet Mars',
      lessonTakeaway: 'Robotic rovers help scientists study Mars without sending astronauts yet'
    }
  },
  {
    id: 'kkwgPwBKyl4',
    channel: 'Smile and Learn — English',
    category: 'Physics & Light Energy',
    realVideoTitle: 'What Is Light? — Reflection, Refraction & Physics for Kids',
    summary: 'Understand natural and artificial light sources, how light travels in straight lines, and how rainbows form.',
    vocab: [
      { word: 'Reflection', phonetic: '/rɪˈflɛk.ʃən/', definitionEn: 'When light bounces off a smooth surface like a mirror or still water.', example: 'You can see your reflection in a clean bathroom mirror.' },
      { word: 'Transparent', phonetic: '/trænsˈpær.ənt/', definitionEn: 'Allowing light to pass through clearly so objects behind can be seen.', example: 'Clear window glass is transparent, so sunlight shines inside.' },
      { word: 'Shadow', phonetic: '/ˈʃæd.oʊ/', definitionEn: 'A dark shape made on a surface when an opaque object blocks light.', example: 'The tall tree cast a cool shadow on the grass at noon.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How light energy travels, reflects, and creates shadows',
      keyAction: 'Passing through transparent glass and bouncing off mirrors',
      importantPlaceOrObject: 'The Sun, mirrors, lenses, and rainbows',
      lessonTakeaway: 'Light travels fast in straight lines and helps us see the world'
    }
  },
  {
    id: 'OM17-oMD7dU',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic American Literature',
    realVideoTitle: 'The Adventures of Tom Sawyer — Animated Classic Story',
    summary: 'Join clever Tom Sawyer and his friend Huckleberry Finn along the Mississippi River as Tom turns fence-painting into fun.',
    vocab: [
      { word: 'Fence', phonetic: '/fɛns/', definitionEn: 'A barrier made of wood or wire enclosing a yard or garden.', example: 'Tom Sawyer had to paint his Aunt Polly’s long wooden fence.' },
      { word: 'Brush', phonetic: '/brʌʃ/', definitionEn: 'A tool with bristles used for painting, cleaning, or smoothing hair.', example: 'He dipped the brush into the bucket of white paint.' },
      { word: 'Treasure', phonetic: '/ˈtrɛʒ.ər/', definitionEn: 'A collection of valuable gold, silver, coins, or jewels.', example: 'Tom and Huck searched for buried treasure near the river.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Tom Sawyer’s clever adventures with his friends by the river',
      keyAction: 'Convincing his friends that whitewashing the wooden fence is exciting',
      importantPlaceOrObject: 'Aunt Polly’s wooden fence and the Mississippi River town',
      lessonTakeaway: 'Creativity and a positive attitude can turn hard work into fun'
    }
  },
  {
    id: 'HaEmIakO7f4',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Earth Science & Weather',
    realVideoTitle: 'Extreme Weather & Natural Forces — Dr. Binocs Earth Science',
    summary: 'Learn the science behind thunderstorms, hurricanes, tornadoes, tsunamis, and how meteorologists keep communities safe.',
    vocab: [
      { word: 'Hurricane', phonetic: '/ˈhɜːr.ɪ.keɪn/', definitionEn: 'A huge rotating storm with powerful winds and heavy rain formed over warm oceans.', example: 'Satellites track the hurricane before it reaches the coast.' },
      { word: 'Tornado', phonetic: '/tɔːrˈneɪ.doʊ/', definitionEn: 'A rapidly spinning funnel-shaped cloud that touches the ground.', example: 'People stay in a safe shelter when a tornado warning sounds.' },
      { word: 'Forecast', phonetic: '/ˈfɔːr.kæst/', definitionEn: 'A scientific prediction of what the weather will be like in the coming days.', example: 'The weather forecast says it will be sunny and warm tomorrow.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How storms, hurricanes, and weather systems form on Earth',
      keyAction: 'Tracking wind, clouds, and ocean temperatures to forecast weather',
      importantPlaceOrObject: 'Earth’s atmosphere, clouds, and oceans',
      lessonTakeaway: 'Understanding weather science helps people prepare and stay safe'
    }
  },
  {
    id: 'plup3xkpVk8',
    channel: 'Smile and Learn — English',
    category: 'World History Timeline',
    realVideoTitle: 'History for Kids — From Prehistory to the Modern World',
    summary: 'Take a time-machine tour from the Stone Age and Ancient Rome through the Middle Ages to modern inventions.',
    vocab: [
      { word: 'Century', phonetic: '/ˈsɛn.tʃər.i/', definitionEn: 'A period of one hundred years in history.', example: 'Many great inventions appeared during the twentieth century.' },
      { word: 'Empire', phonetic: '/ˈɛm.paɪər/', definitionEn: 'A large group of countries or regions ruled by a single emperor or government.', example: 'The Roman Empire built stone roads and aqueducts across Europe.' },
      { word: 'Invention', phonetic: '/ɪnˈvɛn.ʃən/', definitionEn: 'A useful new machine, tool, or process created for the first time.', example: 'The printing press was an invention that changed education forever.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Major eras of human history from Prehistory to modern times',
      keyAction: 'Discovering fire, building cities, and creating new inventions across centuries',
      importantPlaceOrObject: 'Ancient cities, medieval castles, and modern factories',
      lessonTakeaway: 'Each historical era added new knowledge, tools, and culture to humanity'
    }
  },
  {
    id: 'xedeRyXbWC4',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Adventure Literature',
    realVideoTitle: 'Gulliver’s Travels — Voyage to Lilliput (Animated English)',
    summary: 'Shipwrecked explorer Lemuel Gulliver wakes up on the island of Lilliput, where the citizens are only six inches tall!',
    vocab: [
      { word: 'Voyage', phonetic: '/ˈvɔɪ.ɪdʒ/', definitionEn: 'A long journey involving travel by sea or in space.', example: 'Gulliver set sail on a long ocean voyage aboard a wooden ship.' },
      { word: 'Island', phonetic: '/ˈaɪ.lənd/', definitionEn: 'A piece of land completely surrounded by water.', example: 'After the storm, he swam safely to the shore of an unknown island.' },
      { word: 'Tiny', phonetic: '/ˈtaɪ.ni/', definitionEn: 'Extremely small in size.', example: 'The island of Lilliput was home to tiny people and tiny horses.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Lemuel Gulliver’s ocean voyage and arrival on the island of Lilliput',
      keyAction: 'Making peace with the tiny people of Lilliput and helping their king',
      importantPlaceOrObject: 'The island of Lilliput and the surrounding ocean',
      lessonTakeaway: 'Peaceful communication helps people of all sizes understand each other'
    }
  },
  {
    id: 'NVLv52rE4ug',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'World Geography & Glaciers',
    realVideoTitle: 'Best of World Geography — Continents, Glaciers & Mountains',
    summary: 'Explore Earth’s seven continents, icy glaciers, mountain ranges, and how tectonic plates shape our planet.',
    vocab: [
      { word: 'Continent', phonetic: '/ˈkɑːn.tɪ.nənt/', definitionEn: 'One of the seven main continuous expanses of land on Earth.', example: 'Africa, Asia, and Europe are three of Earth’s seven continents.' },
      { word: 'Glacier', phonetic: '/ˈɡleɪ.ʃər/', definitionEn: 'A huge, slow-moving river or sheet of ice formed from compacted snow.', example: 'Glaciers store a large part of the world’s fresh water.' },
      { word: 'Equator', phonetic: '/ɪˈkweɪ.tər/', definitionEn: 'An imaginary line drawn around the middle of Earth equally distant from both poles.', example: 'Countries near the Equator have a warm tropical climate all year.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Earth’s continents, glaciers, mountains, and geographical features',
      keyAction: 'Shaping land through moving ice glaciers and tectonic plates',
      importantPlaceOrObject: 'The seven continents, polar glaciers, and mountain peaks',
      lessonTakeaway: 'Geography explains how continents, climates, and oceans shape life on Earth'
    }
  },
  {
    id: '6GMAugzV5ls',
    channel: 'English Singsing',
    category: 'Essential English Vocabulary',
    realVideoTitle: 'English Vocabulary Builder — Jobs, Places, Weather & Actions',
    summary: 'Master essential English word themes with clear pronunciation, illustrated examples, and everyday sentences.',
    vocab: [
      { word: 'Neighborhood', phonetic: '/ˈneɪ.bər.hʊd/', definitionEn: 'The area of a town or city that surrounds someone’s home.', example: 'Our neighborhood has a library, a park, and a bakery.' },
      { word: 'Occupation', phonetic: '/ˌɑː.kjəˈpeɪ.ʃən/', definitionEn: 'A person’s regular job or profession.', example: 'Teaching children and healing patients are important occupations.' },
      { word: 'Instrument', phonetic: '/ˈɪn.strə.mənt/', definitionEn: 'A tool or device used for playing music or doing scientific work.', example: 'She plays the piano and the violin in the school music room.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Everyday English vocabulary for places, jobs, weather, and hobbies',
      keyAction: 'Naming places in the neighborhood and describing daily actions in English',
      importantPlaceOrObject: 'Schools, libraries, hospitals, and parks in the community',
      lessonTakeaway: 'Strong vocabulary helps you describe anything in your daily life'
    }
  },
  {
    id: '0QEo4Lr4xUs',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Legends & Adventure',
    realVideoTitle: 'The Adventures of Robin Hood — Sherwood Forest Legend',
    summary: 'Join Robin Hood and Little John in Sherwood Forest as they practice archery and help the poor townspeople of Nottingham.',
    vocab: [
      { word: 'Archery', phonetic: '/ˈɑːr.tʃər.i/', definitionEn: 'The sport or skill of shooting arrows with a bow.', example: 'Robin Hood won the royal archery tournament with a bullseye.' },
      { word: 'Forest', phonetic: '/ˈfɔːr.ɪst/', definitionEn: 'A large area of land covered thickly with trees and woodland wildlife.', example: 'Robin and his merry friends camped under the oak trees in Sherwood Forest.' },
      { word: 'Justice', phonetic: '/ˈdʒʌs.tɪs/', definitionEn: 'Fair treatment and honest behavior for all people.', example: 'The townspeople cheered for fairness and justice in Nottingham.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Robin Hood and his friends helping people in Sherwood Forest',
      keyAction: 'Practicing archery and standing up for fairness in Nottingham',
      importantPlaceOrObject: 'Sherwood Forest and Nottingham Castle',
      lessonTakeaway: 'True heroes use their skills to protect and help their community'
    }
  },
  {
    id: 'bEvTsoDh4bk',
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Technology & Inventions',
    realVideoTitle: 'Best Electronic Inventions That Changed the World (Dr. Binocs)',
    summary: 'Discover the true stories behind the invention of the light bulb, telephone, computer, television, and internet.',
    vocab: [
      { word: 'Electricity', phonetic: '/ɪˌlɛk.trɪˈsɪt.i/', definitionEn: 'A form of energy resulting from charged particles that powers lights and machines.', example: 'Electricity powers our computers, refrigerators, and classroom lights.' },
      { word: 'Communication', phonetic: '/kəˌmjuː.nɪˈkeɪ.ʃən/', definitionEn: 'The sharing or exchanging of information by speaking, writing, or technology.', example: 'The invention of the telephone made long-distance communication fast.' },
      { word: 'Patent', phonetic: '/ˈpæt.ənt/', definitionEn: 'An official document giving an inventor the right to be the only maker of an invention.', example: 'The inventor received a patent for his new electric light bulb.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How electronic inventions like the light bulb and telephone changed daily life',
      keyAction: 'Testing electrical circuits and building machines for faster communication',
      importantPlaceOrObject: 'Workshops and laboratories where inventors built their prototypes',
      lessonTakeaway: 'Inventions solve real problems and connect people around the world'
    }
  },
  {
    id: 'kVCiw-7YBNk',
    channel: 'SciShow Kids',
    category: 'Famous Scientists & Biographies',
    realVideoTitle: 'Amazing Scientists Story Time — Pioneers of Science',
    summary: 'Meet inspiring scientists, astronomers, and biologists who changed our understanding of space, oceans, and medicine.',
    vocab: [
      { word: 'Biography', phonetic: '/baɪˈɑː.ɡrə.fi/', definitionEn: 'The true story of a real person’s life written by someone else.', example: 'We read a biography about the famous scientist Marie Curie.' },
      { word: 'Discovery', phonetic: '/dɪˈskʌv.ər.i/', definitionEn: 'The act of finding or learning something for the very first time.', example: 'Her scientific discovery helped doctors treat sick patients.' },
      { word: 'Curiosity', phonetic: '/ˌkjʊr.iˈɑː.sə.ti/', definitionEn: 'A strong desire to know or learn how things work.', example: 'Curiosity led the young astronomer to build her own telescope.' }
    ],
    comprehensionFacts: {
      mainSubject: 'True stories of famous scientists and their discoveries',
      keyAction: 'Asking questions, studying nature, and never giving up on hard problems',
      importantPlaceOrObject: 'Observatories, oceans, and science laboratories',
      lessonTakeaway: 'Anyone with curiosity and persistence can become a great scientist'
    }
  },
  {
    id: 'PZMEzrylBxI',
    channel: 'Smile and Learn — English',
    category: 'Physics & Renewable Energy',
    realVideoTitle: 'Electricity & Circuits — Science for Kids Compilation',
    summary: 'Learn how electrical circuits work, the difference between conductors and insulators, and how solar and wind energy work.',
    vocab: [
      { word: 'Circuit', phonetic: '/ˈsɜːr.kɪt/', definitionEn: 'A complete circular path that electricity flows through.', example: 'When you flip the switch, the circuit closes and the lamp turns on.' },
      { word: 'Conductor', phonetic: '/kənˈdʌk.tər/', definitionEn: 'A material, such as copper metal, that allows electricity or heat to flow easily.', example: 'Copper wire is a great conductor of electricity.' },
      { word: 'Renewable', phonetic: '/rɪˈnjuː.ə.bəl/', definitionEn: 'Natural energy from sunlight or wind that is never used up.', example: 'Solar panels and wind turbines produce clean renewable energy.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Electrical circuits, conductors, insulators, and renewable energy',
      keyAction: 'Connecting a battery, wire, and bulb to complete an electrical circuit',
      importantPlaceOrObject: 'Power plants, solar panels, and classroom circuit boards',
      lessonTakeaway: 'Electricity flows through closed circuits and can be made from clean solar and wind energy'
    }
  },
  {
    id: 'gj1v-L1bEQc',
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'World Mythology & Quests',
    realVideoTitle: 'Journey to the West — The Monkey King’s Great Adventure',
    summary: 'Follow Sun Wukong, the clever Monkey King, as he learns magical skills and begins an epic quest across mountains and rivers.',
    vocab: [
      { word: 'Mountain', phonetic: '/ˈmaʊn.tən/', definitionEn: 'A very high, steep natural elevation of the Earth’s surface.', example: 'The Monkey King lived on the green Flower Fruit Mountain.' },
      { word: 'Waterfall', phonetic: '/ˈwɔː.tər.fɔːl/', definitionEn: 'A cascade of water falling from a height over a rocky cliff.', example: 'He jumped bravely through the roaring waterfall to find a hidden cave.' },
      { word: 'Companion', phonetic: '/kəmˈpæn.jən/', definitionEn: 'A friend or partner who travels with you on a journey.', example: 'The travelers became loyal companions during their long quest.' }
    ],
    comprehensionFacts: {
      mainSubject: 'The Monkey King (Sun Wukong) and his companions on an epic quest',
      keyAction: 'Jumping through the waterfall cave and traveling across mountains',
      importantPlaceOrObject: 'Flower Fruit Mountain and the Water Curtain Cave',
      lessonTakeaway: 'Bravery and teamwork help companions overcome any obstacle'
    }
  },
  {
    id: '5zo-ca2DGDs',
    channel: 'Learn Bright — STEM',
    category: 'Famous Inventors & Engineering',
    realVideoTitle: 'Inventions & Inventors for Kids — How Ideas Become Reality',
    summary: 'Explore how inventors like Thomas Edison, the Wright Brothers, and Alexander Graham Bell designed, tested, and improved their creations.',
    vocab: [
      { word: 'Inventor', phonetic: '/ɪnˈvɛn.tər/', definitionEn: 'A person who designs and creates a brand-new useful device or process.', example: 'The Wright Brothers were inventors who built the first successful airplane.' },
      { word: 'Prototype', phonetic: '/ˈproʊ.tə.taɪp/', definitionEn: 'The first working model of a new invention used for testing.', example: 'The engineers tested their first prototype before building the final machine.' },
      { word: 'Improve', phonetic: '/ɪmˈpruːv/', definitionEn: 'To make something better, stronger, or more useful than before.', example: 'Every mistake helped the inventor improve the design.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How famous inventors designed, tested, and improved new machines',
      keyAction: 'Building prototypes, learning from mistakes, and improving designs',
      importantPlaceOrObject: 'Engineering workshops and historical test fields',
      lessonTakeaway: 'Inventors succeed because they test their prototypes and never stop improving'
    }
  },
  {
    id: 'AehgK6e_a5Y',
    channel: 'Learn Bright — Geography',
    category: 'Seven Continents & Cultures',
    realVideoTitle: 'Seven Continents of the World — Global Geography for Kids',
    summary: 'Tour Asia, Africa, North America, South America, Antarctica, Europe, and Australia to learn landmarks, animals, and oceans.',
    vocab: [
      { word: 'Hemisphere', phonetic: '/ˈhɛm.ɪ.sfɪər/', definitionEn: 'Half of the Earth, usually divided into Northern and Southern halves.', example: 'Australia and Antarctica are located in the Southern Hemisphere.' },
      { word: 'Population', phonetic: '/ˌpɑː.pjəˈleɪ.ʃən/', definitionEn: 'The total number of people living in a country, city, or continent.', example: 'Asia has the largest population of all seven continents.' },
      { word: 'Landmark', phonetic: '/ˈlænd.mɑːrk/', definitionEn: 'A famous building or natural feature that is easy to recognize.', example: 'The Eiffel Tower and the Pyramids are famous world landmarks.' }
    ],
    comprehensionFacts: {
      mainSubject: 'The seven continents of Earth, their landmarks, and wildlife',
      keyAction: 'Comparing the size, climate, and population of each continent',
      importantPlaceOrObject: 'Asia, Africa, Europe, the Americas, Australia, and Antarctica',
      lessonTakeaway: 'Each of the seven continents has unique geography, wildlife, and cultures'
    }
  },
  {
    id: '3Jxeh-yAXek',
    channel: 'Learn Bright — Earth Science',
    category: 'Volcanoes & Geology',
    realVideoTitle: 'Volcanoes for Kids — Magma, Lava & Earth’s Crust',
    summary: 'Learn the difference between magma and lava, why volcanoes erupt along the Ring of Fire, and how volcanic islands form.',
    vocab: [
      { word: 'Magma', phonetic: '/ˈmæɡ.mə/', definitionEn: 'Extremely hot liquid rock located deep underneath Earth’s surface.', example: 'Deep inside the Earth, melted rock is called magma.' },
      { word: 'Eruption', phonetic: '/ɪˈrʌp.ʃən/', definitionEn: 'A sudden explosion of lava, ash, and steam from a volcano.', example: 'When magma reaches the surface during an eruption, it is called lava.' },
      { word: 'Dormant', phonetic: '/ˈdɔːr.mənt/', definitionEn: 'A volcano that is currently sleeping and inactive but could erupt in the future.', example: 'A dormant volcano has been quiet for many years.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How volcanoes form and erupt, and the difference between magma and lava',
      keyAction: 'Magma rising through Earth’s crust and cooling into new volcanic rock',
      importantPlaceOrObject: 'The Pacific Ring of Fire and volcanic islands',
      lessonTakeaway: 'Magma is melted rock underground, and it becomes lava when a volcano erupts'
    }
  },
  {
    id: 'sEQMEllUyks',
    channel: 'Learn Bright — Nature & Ecology',
    category: 'Rainforests & Biodiversity',
    realVideoTitle: 'Rainforests for Kids — Canopy, Wildlife & Tropical Plants',
    summary: 'Explore temperate and tropical rainforests, the four forest layers (emergent, canopy, understory, forest floor), and amazing jungle wildlife.',
    vocab: [
      { word: 'Canopy', phonetic: '/ˈkæn.ə.pi/', definitionEn: 'The thick high roof of leaves and branches formed by tall rainforest trees.', example: 'Toucans, monkeys, and sloths live high up in the rainforest canopy.' },
      { word: 'Tropical', phonetic: '/ˈtrɑː.pɪ.kəl/', definitionEn: 'Warm, humid, and rainy all year round near the Equator.', example: 'The Amazon is the largest tropical rainforest in the world.' },
      { word: 'Habitat', phonetic: '/ˈhæb.ɪ.tæt/', definitionEn: 'The natural home or environment of an animal, plant, or organism.', example: 'The rainforest provides a rich habitat for thousands of colorful birds.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Tropical and temperate rainforests and their four layers of life',
      keyAction: 'Producing oxygen and providing habitats in the canopy and forest floor',
      importantPlaceOrObject: 'The Amazon Rainforest and its green tree canopy',
      lessonTakeaway: 'Rainforests protect half of Earth’s plant and animal species'
    }
  },
  {
    id: 'stKtE_3MxwI',
    channel: 'Smile and Learn — English',
    category: 'Animal Kingdom & Zoology',
    realVideoTitle: 'Animals for Kids — Vertebrates, Invertebrates & Habitats',
    summary: 'Learn how scientists classify mammals, birds, reptiles, amphibians, fish, and invertebrates in 100% English.',
    vocab: [
      { word: 'Vertebrate', phonetic: '/ˈvɜːr.tə.brət/', definitionEn: 'An animal that has a backbone and a skeleton inside its body.', example: 'Mammals, birds, fish, reptiles, and amphibians are all vertebrates.' },
      { word: 'Amphibian', phonetic: '/æmˈfɪb.i.ən/', definitionEn: 'A cold-blooded animal, like a frog, that lives both in water and on land.', example: 'Frogs are amphibians that start life as swimming tadpoles.' },
      { word: 'Reptile', phonetic: '/ˈrɛp.taɪl/', definitionEn: 'A cold-blooded vertebrate animal covered in dry scales, such as a turtle or lizard.', example: 'Sea turtles and crocodiles are reptiles that lay eggs.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Classifying the animal kingdom into vertebrates and invertebrates',
      keyAction: 'Comparing mammals, birds, reptiles, amphibians, and fish',
      importantPlaceOrObject: 'Land, ocean, and freshwater animal habitats',
      lessonTakeaway: 'Scientists group animals by their backbone, skin, breathing, and how they have babies'
    }
  }
];

function buildMatchedTenQuestions(
  episodeId: number,
  topic: CuratedVideoTopic,
  primaryRule: GrammarRule,
  secondaryRule: GrammarRule
): QuizQuestion[] {
  const [v1, v2, v3] = topic.vocab;
  const r1Q = primaryRule.practiceQuestions[episodeId % primaryRule.practiceQuestions.length];
  const r2Q = secondaryRule.practiceQuestions[episodeId % secondaryRule.practiceQuestions.length];

  return [
    {
      id: `ep-${episodeId}-q1`,
      type: 'comprehension',
      questionEn: `1. [Video Comprehension] What is the main topic of Video #${episodeId} ("${topic.realVideoTitle}")?`,
      questionFr: '',
      options: [
        topic.comprehensionFacts.mainSubject,
        'How to bake a chocolate birthday cake in a restaurant',
        'Repairing broken bicycles in a winter snowstorm',
        'Buying train tickets at a busy city station'
      ],
      correctIndex: 0,
      explanationEn: `Correct! This video from ${topic.channel} focuses on: ${topic.comprehensionFacts.mainSubject}.`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q2`,
      type: 'comprehension',
      questionEn: `2. [Video Comprehension] Which key action or process is explained in this video?`,
      questionFr: '',
      options: [
        'Sleeping all day inside a dark cave without moving',
        topic.comprehensionFacts.keyAction,
        'Painting a submarine bright pink in the desert',
        'Selling winter coats at a beach market'
      ],
      correctIndex: 1,
      explanationEn: `Great job! In the video, we learn about ${topic.comprehensionFacts.keyAction.toLowerCase()}.`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q3`,
      type: 'comprehension',
      questionEn: `3. [Video Comprehension] Which important setting or focus appears in "${topic.realVideoTitle}"?`,
      questionFr: '',
      options: [
        'A noisy supermarket checkout line',
        'An underground parking garage',
        topic.comprehensionFacts.importantPlaceOrObject,
        'A professional football stadium at midnight'
      ],
      correctIndex: 2,
      explanationEn: `Spot on! The video highlights: ${topic.comprehensionFacts.importantPlaceOrObject}.`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q4`,
      type: 'comprehension',
      questionEn: `4. [Video Comprehension] What is the main lesson or takeaway from watching this episode?`,
      questionFr: '',
      options: [
        'Never ask questions or read books about nature',
        'Always skip homework and play video games all night',
        'Only study English words once a year',
        topic.comprehensionFacts.lessonTakeaway
      ],
      correctIndex: 3,
      explanationEn: `Exactly! Key takeaway: ${topic.comprehensionFacts.lessonTakeaway}.`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q5`,
      type: 'vocabulary',
      questionEn: `5. [Vocabulary] What does the English word "${v1.word}" (${v1.phonetic}) mean?`,
      questionFr: '',
      options: [
        v1.definitionEn,
        'A small plastic spoon used for eating ice cream',
        'A heavy winter jacket worn in the snow',
        'A ticket for riding a city bus'
      ],
      correctIndex: 0,
      explanationEn: `"${v1.word}" means: ${v1.definitionEn} Example: "${v1.example}"`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q6`,
      type: 'vocabulary',
      questionEn: `6. [Vocabulary] Which word from this lesson matches this definition: "${v2.definitionEn}"?`,
      questionFr: '',
      options: [
        'Umbrella',
        v2.word,
        'Sandwich',
        'Pillow'
      ],
      correctIndex: 1,
      explanationEn: `Correct! "${v2.word}" (${v2.phonetic}): ${v2.definitionEn}`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q7`,
      type: 'vocabulary',
      questionEn: `7. [Vocabulary in Context] Choose the best word to complete this sentence: "${v3.example.replace(new RegExp(v3.word, 'i'), '_____')}"`,
      questionFr: '',
      options: [
        'Refrigerator',
        'Bicycle',
        v3.word,
        'Pencil'
      ],
      correctIndex: 2,
      explanationEn: `Well done! Complete sentence: "${v3.example}"`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q8`,
      type: 'grammar',
      questionEn: `8. [Grammar Rule #1 — ${primaryRule.titleEn}] ${r1Q.questionEn}`,
      questionFr: '',
      options: r1Q.options,
      correctIndex: r1Q.correctIndex,
      explanationEn: `${r1Q.explanationEn} (Formula: ${primaryRule.formulaPositive})`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q9`,
      type: 'grammar',
      questionEn: `9. [Grammar Rule #2 — ${secondaryRule.titleEn}] ${r2Q.questionEn}`,
      questionFr: '',
      options: r2Q.options,
      correctIndex: r2Q.correctIndex,
      explanationEn: `${r2Q.explanationEn} (Formula: ${secondaryRule.formulaPositive})`,
      explanationFr: ''
    },
    {
      id: `ep-${episodeId}-q10`,
      type: 'grammar',
      questionEn: `10. [Grammar Review] Which sentence correctly uses ${primaryRule.titleEn.split('(')[0].trim()}?`,
      questionFr: '',
      options: [
        primaryRule.characterExamples[0].english,
        primaryRule.commonMistakes[0].wrong,
        'Yesterday we tomorrow going is play.',
        'She are have two books every days.'
      ],
      correctIndex: 0,
      explanationEn: `Correct! "${primaryRule.characterExamples[0].english}" follows ${primaryRule.titleEn} (${primaryRule.formulaPositive}).`,
      explanationFr: ''
    }
  ];
}

export const REAL_VIDEO_EPISODES: RealVideoEpisode[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const level: 'L3' | 'L4' = id <= 50 ? 'L3' : 'L4';

  // Rule #1 and Rule #2 for each video (2 distinct grammar rules per video)
  const primaryRuleIndex = Math.min(9, Math.floor((id - 1) / 10));
  const secondaryRuleIndex = (primaryRuleIndex + 1 + (id % 4)) % GRAMMAR_RULES.length;
  const primaryRule: GrammarRule = GRAMMAR_RULES[primaryRuleIndex];
  const secondaryRule: GrammarRule = GRAMMAR_RULES[secondaryRuleIndex];

  const zoneIndex = Math.min(4, Math.floor(primaryRuleIndex / 2));
  const zoneInfo = ZONES[zoneIndex];

  // Strictly 15 to 20 minutes session window enforced directly on the YouTube player via start=0&end=durationSeconds
  const minutes = 15 + (id % 6); // 15, 16, 17, 18, 19, or 20 mins
  const clipEndSeconds = minutes * 60;
  const durationFormatted = `${minutes}:00`;

  // 3 videos per week schedule (Week 1 to Week 34)
  const weekNumber = Math.floor(index / 3) + 1;
  const daySlotIndex = index % 3;

  const videoTopic = CURATED_YOUTUBE_VIDEOS[index % CURATED_YOUTUBE_VIDEOS.length];
  const partNumber = Math.floor(index / CURATED_YOUTUBE_VIDEOS.length) + 1;
  const displayTitle =
    partNumber === 1
      ? videoTopic.realVideoTitle
      : `${videoTopic.realVideoTitle} (Session ${partNumber})`;

  const searchQuery = encodeURIComponent(
    `${videoTopic.channel} ${videoTopic.category} English kids`
  );

  return {
    id,
    title: displayTitle,
    subtitleFr: '',
    subtitleAr: '',
    level,
    durationMinutes: minutes,
    durationFormatted,
    zone: zoneInfo.id,
    zoneName: `${videoTopic.category} · ${videoTopic.channel}`,
    grammarRuleId: primaryRule.id,
    grammarTopicTitle: primaryRule.titleEn,
    secondaryGrammarRuleId: secondaryRule.id,
    secondaryGrammarTopicTitle: secondaryRule.titleEn,
    weekNumber,
    daySlotIndex,
    summaryEn: `${videoTopic.summary} (Daily Session Duration: ${minutes}:00 mins with built-in YouTube English Closed Captions [CC] enabled. Grammar Focus: 1. ${primaryRule.titleEn} & 2. ${secondaryRule.titleEn}).`,
    summaryFr: '',
    summaryAr: '',
    realVideo: {
      youtubeId: videoTopic.id,
      channelName: videoTopic.channel,
      seriesTitle: displayTitle,
      topicCategory: videoTopic.category,
      videoUrl: `https://www.youtube.com/watch?v=${videoTopic.id}`,
      embedUrl: `https://www.youtube.com/embed/${videoTopic.id}?rel=0&cc_load_policy=1&cc_lang_pref=en&hl=en&start=0&end=${clipEndSeconds}`,
      searchUrl: `https://www.youtube.com/results?search_query=${searchQuery}`,
      clipStartSeconds: 0,
      clipEndSeconds
    },
    keyVocab: videoTopic.vocab.map((w) => ({
      word: w.word,
      phonetic: w.phonetic,
      fr: w.definitionEn,
      ar: '',
      example: w.example
    })),
    script: [],
    quiz: buildMatchedTenQuestions(id, videoTopic, primaryRule, secondaryRule)
  };
});
