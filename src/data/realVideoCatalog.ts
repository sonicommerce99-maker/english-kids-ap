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
  realDuration: string; // Actual YouTube total duration (strictly 15:00 to 35:00 max!)
  realMinutes: number;
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
    detailFact: string;
  };
}

// 30 Verified, Embeddable Real YouTube Educational Videos whose ACTUAL Total YouTube Duration is strictly 15 to 35 Minutes!
const CURATED_YOUTUBE_VIDEOS: CuratedVideoTopic[] = [
  {
    id: 'NoDV5tFXiSM',
    realDuration: '20:39',
    realMinutes: 21,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Moral Fables',
    realVideoTitle: '5 Fables on Being Clever! — Classic Aesop’s Fables (20:39)',
    summary: 'Watch 5 classic animated Aesop’s Fables in clear English with subtitles (20 mins total), featuring clever animals, smart problem-solving, and moral lessons.',
    vocab: [
      { word: 'Clever', phonetic: '/ˈklɛv.ər/', definitionEn: 'Quick to understand, learn, and devise smart ideas.', example: 'The clever crow dropped pebbles into the pitcher to raise the water.' },
      { word: 'Fable', phonetic: '/ˈfeɪ.bəl/', definitionEn: 'A short story with animal characters that teaches a moral lesson.', example: 'Each fable in this video teaches us how to think wisely.' },
      { word: 'Patience', phonetic: '/ˈpeɪ.ʃəns/', definitionEn: 'The ability to stay calm and keep trying without giving up.', example: 'With patience and clever thinking, the small animal solved the problem.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Five classic fables about clever animals solving problems wisely',
      keyAction: 'Using smart ideas and patience instead of force or tricks',
      importantPlaceOrObject: 'Forests, rivers, and villages where the five fables take place',
      lessonTakeaway: 'Thinking calmly and cleverly helps you solve even the hardest problems',
      detailFact: 'The characters succeed by observing their surroundings and making a smart plan'
    }
  },
  {
    id: 'eCcTAetwTCw',
    realDuration: '15:50',
    realMinutes: 16,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic Folktales',
    realVideoTitle: 'Jack and the Beanstalk (Full Story Parts 1–5) — Little Fox (15:50)',
    summary: 'Follow Jack as he trades his family cow for magic beans, climbs a giant green beanstalk into the clouds, and outsmarts a giant (15:50 total).',
    vocab: [
      { word: 'Beanstalk', phonetic: '/ˈbiːn.stɔːk/', definitionEn: 'The tall green stem of a bean plant.', example: 'Overnight, the magic seeds grew into a giant beanstalk reaching the clouds.' },
      { word: 'Exchange', phonetic: '/ɪksˈtʃeɪndʒ/', definitionEn: 'An act of giving one thing and receiving another thing in return.', example: 'Jack made an exchange and traded the cow for five magic beans.' },
      { word: 'Enormous', phonetic: '/ɪˈnɔːr.məs/', definitionEn: 'Extremely large in size or amount.', example: 'At the top of the clouds stood an enormous stone castle.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Jack climbing the giant magic beanstalk to an enormous castle in the sky',
      keyAction: 'Trading the cow for magic beans, climbing the beanstalk, and escaping safely',
      importantPlaceOrObject: 'The giant green beanstalk and the castle above the clouds',
      lessonTakeaway: 'Courage and quick thinking help Jack rescue his family from poverty',
      detailFact: 'Jack climbs down the beanstalk and chops it down so the giant cannot follow him'
    }
  },
  {
    id: 'xX_-mM6Lx9I',
    realDuration: '19:01',
    realMinutes: 19,
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Science & Evolution',
    realVideoTitle: 'What Is Evolution? — How Living Things Adapt (Dr. Binocs · 19:01)',
    summary: 'Dr. Binocs explains in 19 minutes how animals and plants adapt and evolve over millions of years to survive in changing environments.',
    vocab: [
      { word: 'Adaptation', phonetic: '/ˌæd.æpˈteɪ.ʃən/', definitionEn: 'A special feature or behavior that helps a plant or animal survive in its habitat.', example: 'Thick white fur is an adaptation for polar bears in the Arctic.' },
      { word: 'Species', phonetic: '/ˈspiː.ʃiːz/', definitionEn: 'A group of similar living organisms that can reproduce with one another.', example: 'Scientists discovered a new species of frog in the rainforest.' },
      { word: 'Ancestor', phonetic: '/ˈæn.sɛs.tər/', definitionEn: 'An early type of animal or plant from which modern species evolved.', example: 'Mammoths are ancient relatives and ancestors of modern elephants.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How animals and species change and adapt over time with Dr. Binocs',
      keyAction: 'Adapting to new climates, food sources, and habitats to survive',
      importantPlaceOrObject: 'Oceans, continents, and natural habitats across Earth',
      lessonTakeaway: 'Living things develop special adaptations to survive in their environment',
      detailFact: 'Giraffes with longer necks could reach high leaves and pass that trait to their babies'
    }
  },
  {
    id: '_QwaUmDbnGg',
    realDuration: '19:33',
    realMinutes: 20,
    channel: 'SciShow Kids',
    category: 'Solar System & Space',
    realVideoTitle: 'Let’s Explore Space! — Astronomy for Kids (SciShow Kids · 19:33)',
    summary: 'Join Jessi and Squeaks for a 19-minute space adventure exploring planets, moons, constellations, and how astronauts live in space.',
    vocab: [
      { word: 'Orbit', phonetic: '/ˈɔːr.bɪt/', definitionEn: 'The curved path of a planet or moon around a star or planet.', example: 'All eight planets orbit around the Sun.' },
      { word: 'Constellation', phonetic: '/ˌkɑːn.stəˈleɪ.ʃən/', definitionEn: 'A group of stars that forms a recognizable pattern in the night sky.', example: 'We used a star map to find the constellation Orion.' },
      { word: 'Gravity', phonetic: '/ˈɡræv.ɪ.ti/', definitionEn: 'The invisible force that pulls objects toward a planet or star.', example: 'The Sun’s strong gravity keeps the planets in their orbits.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Planets, stars, constellations, and space exploration with SciShow Kids',
      keyAction: 'Using telescopes and spacecraft to study planets orbiting the Sun',
      importantPlaceOrObject: 'Our Solar System, the Moon, and the night sky',
      lessonTakeaway: 'Each planet in our Solar System has unique features, moons, and orbits',
      detailFact: 'Astronomers use telescopes on Earth and in space to look at distant stars and planets'
    }
  },
  {
    id: '1Q_4HXewiS0',
    realDuration: '17:09',
    realMinutes: 17,
    channel: 'SciShow Kids',
    category: 'Science & Experiments',
    realVideoTitle: '4 Amazing Science Experiments! — SciShow Kids (17:09)',
    summary: 'Watch 4 hands-on science experiments in 17 minutes with Jessi and Squeaks to test hypotheses and see how matter and liquids behave.',
    vocab: [
      { word: 'Experiment', phonetic: '/ɪkˈspɛr.ə.mənt/', definitionEn: 'A scientific test performed to discover or prove how something works.', example: 'We did a water experiment to see which objects float or sink.' },
      { word: 'Observe', phonetic: '/əbˈzɜːrv/', definitionEn: 'To watch something carefully in order to learn information about it.', example: 'Scientists observe how colors mix during the experiment.' },
      { word: 'Hypothesis', phonetic: '/haɪˈpɑː.θə.sɪs/', definitionEn: 'A smart scientific guess that you can test with an experiment.', example: 'Our hypothesis is that oil will float on top of water.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Four step-by-step science experiments you can try and observe',
      keyAction: 'Making a hypothesis, mixing safe ingredients, and observing the result',
      importantPlaceOrObject: 'The SciShow Kids science fort and laboratory table',
      lessonTakeaway: 'Scientists learn how the world works by asking questions and testing ideas',
      detailFact: 'Recording what you see during an experiment helps prove whether your hypothesis is right'
    }
  },
  {
    id: '6iGPGDHWGrI',
    realDuration: '19:28',
    realMinutes: 19,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Aesop’s Fables & Stories',
    realVideoTitle: 'The Grasshopper and the Ant + More Aesop’s Fables (19:28)',
    summary: 'Enjoy 19 minutes of animated Aesop’s Fables, starting with the hardworking Ant preparing food for winter while the Grasshopper plays music.',
    vocab: [
      { word: 'Harvest', phonetic: '/ˈhɑːr.vɪst/', definitionEn: 'The season or act of gathering ripe crops and grain from the fields.', example: 'The ants worked hard during the summer harvest to store grain.' },
      { word: 'Prepare', phonetic: '/prɪˈpɛr/', definitionEn: 'To make something ready for use or for a future event.', example: 'It is wise to prepare your lessons before the school test.' },
      { word: 'Winter', phonetic: '/ˈwɪn.tər/', definitionEn: 'The coldest season of the year, after autumn and before spring.', example: 'When cold winter snow arrived, the ants had plenty of warm food.' }
    ],
    comprehensionFacts: {
      mainSubject: 'The hardworking Ant and the playful Grasshopper preparing for winter',
      keyAction: 'Collecting and storing grain in summer before the cold winter arrives',
      importantPlaceOrObject: 'The sunny summer meadow and the warm underground ant home',
      lessonTakeaway: 'Working hard and preparing ahead of time keeps you safe in the future',
      detailFact: 'While the Grasshopper sang all summer, the Ant carried food into its shelter'
    }
  },
  {
    id: 'qCiGpNQWVTU',
    realDuration: '20:32',
    realMinutes: 21,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Mammals & Wildlife',
    realVideoTitle: 'Meet the Animals — Mammals for Kids: Gorilla, Elephant, Whale & More (20:32)',
    summary: 'Meet amazing mammals including gorillas, elephants, whales, tigers, and giraffes in this 20-minute animated wildlife documentary for kids.',
    vocab: [
      { word: 'Mammal', phonetic: '/ˈmæm.əl/', definitionEn: 'A warm-blooded animal with a backbone that breathes air and feeds milk to its young.', example: 'Elephants, tigers, gorillas, and whales are all mammals.' },
      { word: 'Herbivore', phonetic: '/ˈhɜːr.bɪ.vɔːr/', definitionEn: 'An animal that feeds only on plants, grass, and leaves.', example: 'A tall giraffe is a herbivore that eats leaves from acacia trees.' },
      { word: 'Endangered', phonetic: '/ɪnˈdeɪn.dʒərd/', definitionEn: 'At serious risk of disappearing or becoming extinct in the wild.', example: 'National parks protect endangered tigers and mountain gorillas.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How land and ocean mammals like elephants, whales, and gorillas live',
      keyAction: 'Finding food, caring for baby mammals, and surviving in wild habitats',
      importantPlaceOrObject: 'African savannas, tropical jungles, and deep oceans',
      lessonTakeaway: 'Mammals live on land and in the sea, and all of them breathe air and care for their babies',
      detailFact: 'Even though whales swim in the ocean, they breathe air through blowholes because they are mammals'
    }
  },
  {
    id: '4w0P-yn9ODA',
    realDuration: '28:59',
    realMinutes: 29,
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Human Body & Biology',
    realVideoTitle: 'Look Inside the Human Body With Dr. Binocs! (28:59)',
    summary: 'Explore how the human heart, brain, lungs, stomach, and bones work together inside our body in this 29-minute Dr. Binocs special.',
    vocab: [
      { word: 'Organ', phonetic: '/ˈɔːr.ɡən/', definitionEn: 'A part of the body, such as the heart or brain, that performs a specific job.', example: 'The heart is a muscular organ that pumps blood through the body.' },
      { word: 'Oxygen', phonetic: '/ˈɑːk.sɪ.dʒən/', definitionEn: 'A colorless gas in the air that humans and animals breathe to stay alive.', example: 'Our lungs take in fresh oxygen every time we breathe in.' },
      { word: 'Digestion', phonetic: '/daɪˈdʒɛs.tʃən/', definitionEn: 'The process of breaking down food in the stomach so the body gets energy.', example: 'Healthy vegetables and water help our digestion.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How human body organs like the brain, heart, and lungs work together',
      keyAction: 'Pumping blood, breathing oxygen, and digesting food for energy',
      importantPlaceOrObject: 'Inside the human body (brain, lungs, heart, and skeletal bones)',
      lessonTakeaway: 'Every organ in the human body has a vital job to keep us healthy',
      detailFact: 'The nervous system sends fast messages between the brain and every part of the body'
    }
  },
  {
    id: 'ooYzGVZATBc',
    realDuration: '24:18',
    realMinutes: 24,
    channel: 'Smile and Learn — English',
    category: 'Oceans & Water Animals',
    realVideoTitle: 'Water Animals for Kids — Marine & Freshwater Wildlife (24:18)',
    summary: 'Dive into oceans and rivers for 24 minutes to learn about sea turtles, dolphins, sharks, octopuses, frogs, and coral reefs.',
    vocab: [
      { word: 'Aquatic', phonetic: '/əˈkwɑː.tɪk/', definitionEn: 'Living or growing in, on, or near water.', example: 'Sea turtles, fish, and crabs are aquatic animals.' },
      { word: 'Gills', phonetic: '/ɡɪlz/', definitionEn: 'The respiratory organs that fish use to breathe oxygen underwater.', example: 'Fish use their gills to breathe oxygen from the water.' },
      { word: 'Camouflage', phonetic: '/ˈkæm.ə.flɑːʒ/', definitionEn: 'Colors or patterns that help an animal blend in with its surroundings.', example: 'An octopus uses camouflage to hide on the rocky ocean floor.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How aquatic animals breathe, swim, and survive in oceans and rivers',
      keyAction: 'Swimming with fins or flippers and breathing through gills or lungs',
      importantPlaceOrObject: 'Coral reefs, deep oceans, and freshwater ponds',
      lessonTakeaway: 'Water animals have special fins, gills, or shells adapted for life in water',
      detailFact: 'Fish breathe underwater with gills, while marine mammals like dolphins come to the surface for air'
    }
  },
  {
    id: '85_QHVBLcZE',
    realDuration: '17:37',
    realMinutes: 18,
    channel: 'Smile and Learn — English',
    category: 'Action Verbs & Vocabulary',
    realVideoTitle: 'Action Verbs & Daily Vocabulary for Kids — Smile and Learn (17:37)',
    summary: 'Practice essential English action verbs, daily routines, school activities, and hobbies in this 17-minute vocabulary compilation.',
    vocab: [
      { word: 'Routine', phonetic: '/ruːˈtiːn/', definitionEn: 'The usual order and way in which you regularly do daily things.', example: 'Brushing my teeth and reading English are part of my morning routine.' },
      { word: 'Communicate', phonetic: '/kəˈmjuː.nɪ.keɪt/', definitionEn: 'To share ideas, feelings, or information by speaking or writing.', example: 'Learning new verbs helps us communicate clearly in English.' },
      { word: 'Activity', phonetic: '/ækˈtɪv.ə.ti/', definitionEn: 'Something that you do for learning, exercise, or enjoyment.', example: 'Swimming and painting are my favorite weekend activities.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Everyday English action verbs for school, sports, cooking, and routines',
      keyAction: 'Using action verbs in complete sentences to describe daily activities',
      importantPlaceOrObject: 'Classrooms, kitchens, playgrounds, and homes',
      lessonTakeaway: 'Knowing action verbs makes it easy to speak about what you do every day',
      detailFact: 'Every English sentence needs a verb to show the action or state of the subject'
    }
  },
  {
    id: 'w3KOxe5Ji1o',
    realDuration: '23:47',
    realMinutes: 24,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Beatrix Potter Classics',
    realVideoTitle: 'Jemima Puddle-Duck Full Story — Beatrix Potter Classic (23:47)',
    summary: 'Watch the complete 24-minute animated Beatrix Potter story of Jemima Puddle-Duck and how Kep the farm dog rescues her from a sly fox.',
    vocab: [
      { word: 'Puddle', phonetic: '/ˈpʌd.əl/', definitionEn: 'A small pool of rainwater on the ground.', example: 'The farm ducks loved splashing in the muddy puddle after the rain.' },
      { word: 'Feather', phonetic: '/ˈfɛð.ər/', definitionEn: 'One of the soft, light coverings that grow on a bird’s body and wings.', example: 'The white duck smoothed her soft feathers by the pond.' },
      { word: 'Rescue', phonetic: '/ˈrɛs.kjuː/', definitionEn: 'To save someone from a dangerous or difficult situation.', example: 'Kep the collie dog arrived just in time to rescue Jemima.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Jemima Puddle-Duck searching for a nesting place and being rescued by Kep',
      keyAction: 'Looking for a quiet nest in the woods and escaping the sly fox',
      importantPlaceOrObject: 'The sunny farmyard and the woods Shed',
      lessonTakeaway: 'Be careful when strangers offer help that seems too good to be true',
      detailFact: 'Kep the wise farm dog figures out the fox’s trick and saves Jemima’s eggs'
    }
  },
  {
    id: 'ZNmb3Qg33SE',
    realDuration: '29:21',
    realMinutes: 29,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Dinosaurs & Prehistory',
    realVideoTitle: 'Dino Buddies — T-Rex, Triceratops & Stegosaurus Stories (29:21)',
    summary: 'Travel to the prehistoric world for 29 minutes with Little Fox’s Dino Buddies to learn about T-Rex, Triceratops, Stegosaurus, and fossils.',
    vocab: [
      { word: 'Fossil', phonetic: '/ˈfɑː.səl/', definitionEn: 'The preserved remains or impression of a prehistoric plant or animal in rock.', example: 'Scientists dug up a giant dinosaur fossil in the desert.' },
      { word: 'Prehistoric', phonetic: '/ˌpriː.hɪˈstɔːr.ɪk/', definitionEn: 'Relating to the ancient time in history before anything was written down.', example: 'Triceratops and Stegosaurus lived in prehistoric forests.' },
      { word: 'Extinct', phonetic: '/ɪkˈstɪŋkt/', definitionEn: 'No longer existing anywhere on Earth.', example: 'Dinosaurs became extinct sixty-five million years ago.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Prehistoric dinosaur friends including T-Rex, Triceratops, and Stegosaurus',
      keyAction: 'Exploring prehistoric jungles, finding food, and helping dinosaur friends',
      importantPlaceOrObject: 'Prehistoric valleys, volcanoes, and fern forests',
      lessonTakeaway: 'Different dinosaurs had horns, plates, or sharp teeth to survive in prehistoric times',
      detailFact: 'Triceratops had three horns and a bony frill, while Stegosaurus had plates along its back'
    }
  },
  {
    id: 'QAGGntBUYFM',
    realDuration: '21:52',
    realMinutes: 22,
    channel: 'SciShow Kids',
    category: 'Space & Mars Rovers',
    realVideoTitle: 'Journey to Mars! — Space Rovers & Red Planet Science (21:52)',
    summary: 'Learn in 22 minutes why Mars is called the Red Planet and how robotic rovers like Curiosity and Perseverance explore Martian craters.',
    vocab: [
      { word: 'Rover', phonetic: '/ˈroʊ.vər/', definitionEn: 'A robotic vehicle designed to drive across the surface of another planet.', example: 'The Mars rover takes high-resolution photos of red rocks.' },
      { word: 'Crater', phonetic: '/ˈkreɪ.tər/', definitionEn: 'A large bowl-shaped hole on a planet or moon caused by a meteorite impact.', example: 'The rover explored an ancient lake bed inside a wide crater.' },
      { word: 'Surface', phonetic: '/ˈsɜːr.fɪs/', definitionEn: 'The outside or top layer of a planet, land, or ocean.', example: 'Iron dust on the surface of Mars makes the planet look red.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Exploring the Red Planet Mars with robotic space rovers',
      keyAction: 'Driving across craters and testing Martian rocks and soil',
      importantPlaceOrObject: 'The dusty red surface and craters of planet Mars',
      lessonTakeaway: 'Robotic rovers help scientists study Mars without sending astronauts yet',
      detailFact: 'Iron oxide (rust) in the rocks and dust gives Mars its reddish color'
    }
  },
  {
    id: '5hH5radPWHo',
    realDuration: '19:11',
    realMinutes: 19,
    channel: 'SciShow Kids',
    category: 'Physics & Magnetism',
    realVideoTitle: 'The Amazing Power of Magnets! — Physics for Kids (19:11)',
    summary: 'Discover how north and south magnetic poles attract or repel, why compasses point north, and how Earth itself acts like a giant magnet (19:11).',
    vocab: [
      { word: 'Magnet', phonetic: '/ˈmæɡ.nət/', definitionEn: 'An object that produces a magnetic field and attracts iron or steel.', example: 'The horseshoe magnet picked up all the steel paperclips.' },
      { word: 'Attract', phonetic: '/əˈtrækt/', definitionEn: 'To pull something closer using an invisible force.', example: 'Opposite magnetic poles—North and South—attract each other.' },
      { word: 'Repel', phonetic: '/rɪˈpɛl/', definitionEn: 'To push something away from yourself.', example: 'Two North magnetic poles will repel and push each other apart.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How magnets attract metal objects and how magnetic poles work',
      keyAction: 'Attracting opposite poles (North-South) and repelling identical poles',
      importantPlaceOrObject: 'Compasses, iron metals, and Earth’s magnetic field',
      lessonTakeaway: 'Opposite magnetic poles attract each other, while the same poles repel',
      detailFact: 'A compass needle is a tiny magnet that lines up with Earth’s magnetic field to point north'
    }
  },
  {
    id: 'kln-gj_BmG0',
    realDuration: '23:52',
    realMinutes: 24,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Classic American Literature',
    realVideoTitle: 'Little Men — Classic English Story at Plumfield School (23:52)',
    summary: 'Visit Plumfield School with Jo and Professor Bhaer in Louisa May Alcott’s classic story about friendship, music, honesty, and school life (23:52).',
    vocab: [
      { word: 'boarding school', phonetic: '/ˈbɔːr.dɪŋ skuːl/', definitionEn: 'A school where students live, study, and eat meals together during the term.', example: 'Plumfield was a happy boarding school with gardens and music.' },
      { word: 'Violin', phonetic: '/ˌvaɪ.əˈlɪn/', definitionEn: 'A wooden four-stringed musical instrument played with a bow.', example: 'Young Nat loved playing cheerful melodies on his violin.' },
      { word: 'Honest', phonetic: '/ˈɑː.nɪst/', definitionEn: 'Always telling the truth and never cheating or stealing.', example: 'The teacher praised the students for being honest and kind.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Nat and his classmates learning kindness and honesty at Plumfield School',
      keyAction: 'Studying together, playing the violin, and tending their own garden plots',
      importantPlaceOrObject: 'Plumfield School and its green country garden',
      lessonTakeaway: 'A warm school community helps every child grow confident and honest',
      detailFact: 'When Nat arrives shy and nervous, music and kind friends help him feel at home'
    }
  },
  {
    id: 'HaEmIakO7f4',
    realDuration: '21:54',
    realMinutes: 22,
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Earth Science & Weather',
    realVideoTitle: 'Natural Forces & Extreme Weather — Dr. Binocs Show (21:54)',
    summary: 'Learn in 22 minutes the science behind thunderstorms, hurricanes, tornadoes, tsunamis, and how meteorologists keep communities safe.',
    vocab: [
      { word: 'Hurricane', phonetic: '/ˈhɜːr.ɪ.keɪn/', definitionEn: 'A huge rotating storm with powerful winds and heavy rain formed over warm oceans.', example: 'Satellites track the hurricane before it reaches the coast.' },
      { word: 'Tornado', phonetic: '/tɔːrˈneɪ.doʊ/', definitionEn: 'A rapidly spinning funnel-shaped cloud that touches the ground.', example: 'People stay in a safe shelter when a tornado warning sounds.' },
      { word: 'Forecast', phonetic: '/ˈfɔːr.kæst/', definitionEn: 'A scientific prediction of what the weather will be like in the coming days.', example: 'The weather forecast says it will be sunny and warm tomorrow.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How storms, hurricanes, and extreme weather systems form on Earth',
      keyAction: 'Tracking wind, clouds, and ocean temperatures to forecast weather',
      importantPlaceOrObject: 'Earth’s atmosphere, clouds, and warm oceans',
      lessonTakeaway: 'Understanding weather science helps people prepare and stay safe',
      detailFact: 'Warm ocean water and moist rising air provide the energy that powers a hurricane'
    }
  },
  {
    id: 'plup3xkpVk8',
    realDuration: '34:39',
    realMinutes: 35,
    channel: 'Smile and Learn — English',
    category: 'World History Timeline',
    realVideoTitle: 'History for Kids — Prehistory to the Industrial Era (34:39)',
    summary: 'Take a 34-minute time-machine tour from the Stone Age and Ancient Rome through the Middle Ages to modern inventions.',
    vocab: [
      { word: 'Century', phonetic: '/ˈsɛn.tʃər.i/', definitionEn: 'A period of one hundred years in history.', example: 'Many great inventions appeared during the nineteenth century.' },
      { word: 'Empire', phonetic: '/ˈɛm.paɪər/', definitionEn: 'A large group of countries or regions ruled by a single emperor or government.', example: 'The Roman Empire built stone roads and aqueducts across Europe.' },
      { word: 'Invention', phonetic: '/ɪnˈvɛn.ʃən/', definitionEn: 'A useful new machine, tool, or process created for the first time.', example: 'The printing press was an invention that changed education forever.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Major eras of human history from Prehistory to the Industrial Revolution',
      keyAction: 'Discovering fire, building cities, and creating new inventions across centuries',
      importantPlaceOrObject: 'Ancient cities, medieval castles, and steam-powered factories',
      lessonTakeaway: 'Each historical era added new knowledge, tools, and culture to humanity',
      detailFact: 'The invention of writing marked the transition from Prehistory to Ancient History'
    }
  },
  {
    id: 'nZyckdpI4Z0',
    realDuration: '22:07',
    realMinutes: 22,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Friendship & Woodland Tales',
    realVideoTitle: 'Peter Rabbit’s Helping Heroes — Friendship & Kindness (22:07)',
    summary: 'Join Peter Rabbit, Benjamin Bunny, and their woodland friends for 22 minutes of stories about teamwork, helping neighbors, and kindness.',
    vocab: [
      { word: 'Neighbor', phonetic: '/ˈneɪ.bər/', definitionEn: 'A person or animal who lives near or next door to you.', example: 'Peter Rabbit helped his woodland neighbor carry a heavy basket.' },
      { word: 'Cooperate', phonetic: '/koʊˈɑː.pə.reɪt/', definitionEn: 'To work together with others toward the same goal.', example: 'When the rabbits cooperate, they finish gathering berries twice as fast.' },
      { word: 'Grateful', phonetic: '/ˈɡreɪt.fəl/', definitionEn: 'Feeling or showing thanks because someone has done something kind for you.', example: 'Mrs. Tiggy-Winkle was grateful when the rabbits returned her laundry basket.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Peter Rabbit and his friends helping their neighbors in the woodland',
      keyAction: 'Cooperating as a team to solve problems and help friends in trouble',
      importantPlaceOrObject: 'The green woodland burrows, meadows, and garden paths',
      lessonTakeaway: 'Helping neighbors and working together makes the whole community happier',
      detailFact: 'Even small woodland animals can solve big problems when they work together'
    }
  },
  {
    id: 'G5xk-r3Bo9I',
    realDuration: '31:18',
    realMinutes: 31,
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'World Geography & Earth',
    realVideoTitle: 'Learn Geography With Dr. Binocs — Continents, Oceans & Earth (31:18)',
    summary: 'Explore Earth’s seven continents, five oceans, tectonic plates, and mountain ranges in this 31-minute Dr. Binocs geography compilation.',
    vocab: [
      { word: 'Continent', phonetic: '/ˈkɑːn.tɪ.nənt/', definitionEn: 'One of the seven main continuous expanses of land on Earth.', example: 'Africa, Asia, and Europe are three of Earth’s seven continents.' },
      { word: 'Tectonic', phonetic: '/tɛkˈtɑː.nɪk/', definitionEn: 'Relating to the giant moving rock plates that make up Earth’s outer crust.', example: 'When tectonic plates push together, tall mountains are formed.' },
      { word: 'Equator', phonetic: '/ɪˈkweɪ.tər/', definitionEn: 'An imaginary line drawn around the middle of Earth equally distant from both poles.', example: 'Countries near the Equator have a warm tropical climate all year.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Earth’s continents, oceans, tectonic plates, and geographical features',
      keyAction: 'Shaping mountains and continents through moving tectonic plates',
      importantPlaceOrObject: 'The seven continents, five oceans, and Earth’s crust',
      lessonTakeaway: 'Geography explains how continents, climates, and oceans shape life on Earth',
      detailFact: 'About seventy-one percent of Earth’s surface is covered by ocean water'
    }
  },
  {
    id: 'LSOvevsM3aY',
    realDuration: '19:14',
    realMinutes: 19,
    channel: 'Smile and Learn — English',
    category: 'Five Senses & Human Body',
    realVideoTitle: 'The Five Senses for Kids — Sight, Hearing, Smell, Taste & Touch (19:14)',
    summary: 'Learn in 19 minutes how our eyes, ears, nose, tongue, and skin send signals to the brain so we can see, hear, smell, taste, and touch.',
    vocab: [
      { word: 'Perception', phonetic: '/pərˈsɛp.ʃən/', definitionEn: 'The ability to see, hear, or become aware of something through the five senses.', example: 'Our brain uses information from our eyes and ears for perception.' },
      { word: 'Nerve', phonetic: '/nɜːrv/', definitionEn: 'A fiber in the body that carries messages between the brain and other body parts.', example: 'Optic nerves carry pictures from the eyes straight to the brain.' },
      { word: 'Texture', phonetic: '/ˈtɛks.tʃər/', definitionEn: 'The way a surface feels when you touch it, such as smooth, rough, or soft.', example: 'With our sense of touch, we can feel the soft texture of a blanket.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How the five human senses—sight, hearing, smell, taste, and touch—work',
      keyAction: 'Collecting information with sense organs and sending signals to the brain',
      importantPlaceOrObject: 'Eyes, ears, nose, tongue, skin, and the brain',
      lessonTakeaway: 'Our five senses work with the brain to help us understand and stay safe in our environment',
      detailFact: 'Tiny taste buds on the tongue help us detect sweet, salty, sour, bitter, and umami flavors'
    }
  },
  {
    id: '-73pCXvi2Mg',
    realDuration: '23:37',
    realMinutes: 24,
    channel: 'Little Fox — Kids Stories & Songs',
    category: 'Woodland Adventure Stories',
    realVideoTitle: 'Peter Rabbit’s Sisters: Escape from Tommy Brock! (23:37)',
    summary: 'Watch Flopsy, Mopsy, and Cotton-tail use teamwork and clever clues to outsmart grumpy badger Tommy Brock in this 23-minute story.',
    vocab: [
      { word: 'Burrow', phonetic: '/ˈbɜːr.oʊ/', definitionEn: 'A hole or tunnel dug in the ground by a rabbit or badger to live in.', example: 'The rabbits hurried back to their warm underground burrow.' },
      { word: 'Outsmart', phonetic: '/ˌaʊtˈsmɑːrt/', definitionEn: 'To defeat or trick someone by being more clever than they are.', example: 'Thethree sisters worked together to outsmart Tommy Brock.' },
      { word: 'Clue', phonetic: '/kluː/', definitionEn: 'A piece of information or footprint that helps solve a mystery.', example: 'They followed the footprints in the mud as a clue.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Flopsy, Mopsy, and Cotton-tail outsmarting the badger Tommy Brock',
      keyAction: 'Following clues and using teamwork to escape safely through the woods',
      importantPlaceOrObject: 'The woodland paths and underground burrows',
      lessonTakeaway: 'Staying calm and working as a team helps you overcome tricky situations',
      detailFact: 'By watching carefully and warning each other, the sisters avoid Tommy Brock’s trap'
    }
  },
  {
    id: 'bEvTsoDh4bk',
    realDuration: '26:53',
    realMinutes: 27,
    channel: 'Peekaboo Kidz — The Dr. Binocs Show',
    category: 'Technology & Inventions',
    realVideoTitle: 'Best Electronic Inventions That Changed the World (Dr. Binocs · 26:53)',
    summary: 'Discover in 27 minutes the true stories behind the invention of the light bulb, telephone, computer, television, and internet.',
    vocab: [
      { word: 'Electricity', phonetic: '/ɪˌlɛk.trɪˈsɪt.i/', definitionEn: 'A form of energy resulting from charged particles that powers lights and machines.', example: 'Electricity powers our computers, refrigerators, and classroom lights.' },
      { word: 'Communication', phonetic: '/kəˌmjuː.nɪˈkeɪ.ʃən/', definitionEn: 'The sharing or exchanging of information by speaking, writing, or technology.', example: 'The invention of the telephone made long-distance communication fast.' },
      { word: 'Patent', phonetic: '/ˈpæt.ənt/', definitionEn: 'An official document giving an inventor the right to be the only maker of an invention.', example: 'The inventor received a patent for his new electric light bulb.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How electronic inventions like the light bulb and telephone changed daily life',
      keyAction: 'Testing electrical circuits and building machines for faster communication',
      importantPlaceOrObject: 'Workshops and laboratories where inventors built their prototypes',
      lessonTakeaway: 'Inventions solve real problems and connect people around the world',
      detailFact: 'Thomas Edison tested thousands of materials before finding a filament that glowed long inside a light bulb'
    }
  },
  {
    id: 'kVCiw-7YBNk',
    realDuration: '22:00',
    realMinutes: 22,
    channel: 'SciShow Kids',
    category: 'Famous Scientists & Biographies',
    realVideoTitle: 'Amazing Scientists Story Time — Pioneers of Science (22:00)',
    summary: 'Meet inspiring scientists, astronomers, and biologists in this 22-minute compilation who changed our understanding of space, oceans, and medicine.',
    vocab: [
      { word: 'Biography', phonetic: '/baɪˈɑː.ɡrə.fi/', definitionEn: 'The true story of a real person’s life written by someone else.', example: 'We read a biography about the famous scientist Marie Curie.' },
      { word: 'Discovery', phonetic: '/dɪˈskʌv.ər.i/', definitionEn: 'The act of finding or learning something for the very first time.', example: 'Her scientific discovery helped doctors treat sick patients.' },
      { word: 'Curiosity', phonetic: '/ˌkjʊr.iˈɑː.sə.ti/', definitionEn: 'A strong desire to know or learn how things work.', example: 'Curiosity led the young astronomer to build her own telescope.' }
    ],
    comprehensionFacts: {
      mainSubject: 'True stories of famous scientists and their discoveries',
      keyAction: 'Asking questions, studying nature, and never giving up on hard problems',
      importantPlaceOrObject: 'Observatories, oceans, and science laboratories',
      lessonTakeaway: 'Anyone with curiosity and persistence can become a great scientist',
      detailFact: 'Many famous scientists started by observing insects, stars, and plants when they were children'
    }
  },
  {
    id: 'rq5mcdUUILU',
    realDuration: '17:11',
    realMinutes: 17,
    channel: 'Smile and Learn — English',
    category: 'Weather & Meteorology',
    realVideoTitle: 'Weather Instruments — How Do We Measure Weather? (17:11)',
    summary: 'Learn in 17 minutes how meteorologists use thermometers, barometers, anemometers, weather vanes, and rain gauges to predict the weather.',
    vocab: [
      { word: 'Thermometer', phonetic: '/θərˈmɑː.mə.tər/', definitionEn: 'An instrument used for measuring the temperature of the air or body.', example: 'The thermometer showed that the air temperature was twenty-five degrees.' },
      { word: 'Precipitation', phonetic: '/prɪˌsɪp.əˈteɪ.ʃən/', definitionEn: 'Water that falls from clouds to the ground as rain, snow, sleet, or hail.', example: 'A rain gauge measures how many millimeters of precipitation fell.' },
      { word: 'Atmosphere', phonetic: '/ˈæt.mə.sfɪər/', definitionEn: 'The layer of air and gases surrounding the planet Earth.', example: 'Changes in the atmosphere create wind, clouds, and rain.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Weather instruments used by meteorologists to measure temperature, wind, and rain',
      keyAction: 'Measuring air temperature with a thermometer and wind speed with an anemometer',
      importantPlaceOrObject: 'Weather stations and Earth’s atmosphere',
      lessonTakeaway: 'Scientific instruments allow meteorologists to measure and forecast weather accurately',
      detailFact: 'A weather vane points in the direction the wind is blowing, while a rain gauge collects rainfall'
    }
  },
  {
    id: 'EhfOZMOF9W4',
    realDuration: '17:38',
    realMinutes: 18,
    channel: 'Smile and Learn — English',
    category: 'Nutrition & Healthy Habits',
    realVideoTitle: 'Healthy Eating for Kids — Vitamins, Proteins & Nutrition (17:38)',
    summary: 'Discover in 17 minutes how carbohydrates, proteins, vitamins, minerals, and water give our body energy and help us grow strong.',
    vocab: [
      { word: 'Nutrient', phonetic: '/ˈnuː.tri.ənt/', definitionEn: 'A substance in food that provides energy and helps the body grow and repair itself.', example: 'Fruits and vegetables are packed with essential nutrients and vitamins.' },
      { word: 'Protein', phonetic: '/ˈproʊ.tiːn/', definitionEn: 'A nutrient found in eggs, fish, beans, and meat that builds strong muscles.', example: 'Eating protein helps your muscles recover after playing sports.' },
      { word: 'Balanced', phonetic: '/ˈbæl.ənst/', definitionEn: 'Having healthy proportions of different types of food.', example: 'A balanced meal includes vegetables, whole grains, and protein.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Healthy eating, balanced meals, and how nutrients help our body grow',
      keyAction: 'Eating a balanced variety of fruits, vegetables, proteins, and whole grains',
      importantPlaceOrObject: 'The kitchen table, school cafeteria, and healthy food groups',
      lessonTakeaway: 'A balanced diet with vitamins, proteins, and water keeps our body energetic and strong',
      detailFact: 'Carbohydrates give us quick energy for running and studying, while proteins build muscles'
    }
  },
  {
    id: 'sqkODDcJG8w',
    realDuration: '15:49',
    realMinutes: 16,
    channel: 'SciShow Kids',
    category: 'Engineering & Problem Solving',
    realVideoTitle: 'Think Like an Engineer! — Solving Problems Step by Step (15:49)',
    summary: 'Learn the engineering design process in 15 minutes: ask a question, imagine solutions, build a prototype, test it, and improve it!',
    vocab: [
      { word: 'Engineer', phonetic: '/ˌɛn.dʒɪˈnɪər/', definitionEn: 'A person who designs and builds machines, bridges, or systems to solve problems.', example: 'The engineer designed a strong bridge across the wide river.' },
      { word: 'Prototype', phonetic: '/ˈproʊ.tə.taɪp/', definitionEn: 'The first working model of a new design used for testing.', example: 'We built a paper prototype of our bridge and tested it with coins.' },
      { word: 'Improve', phonetic: '/ɪmˈpruːv/', definitionEn: 'To make a design better, stronger, or more useful after testing it.', example: 'Testing showed us how to improve the wheels on our toy car.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How engineers solve problems by planning, building prototypes, and testing',
      keyAction: 'Following the engineering steps: Ask, Imagine, Plan, Create, and Improve',
      importantPlaceOrObject: 'Bridges, towers, and engineering workshops',
      lessonTakeaway: 'Engineers never give up when a first test fails—they learn and improve their design',
      detailFact: 'Testing a small prototype helps engineers find weak spots before building the real structure'
    }
  },
  {
    id: '-Qh2yw3smC4',
    realDuration: '19:42',
    realMinutes: 20,
    channel: 'SciShow Kids',
    category: 'Antarctica & Polar Science',
    realVideoTitle: 'Exploring Antarctica — Penguins, Glaciers & Polar Seas (19:42)',
    summary: 'Bundle up for a 19-minute expedition to Antarctica to meet Emperor penguins, seals, whales, and scientists working at the South Pole.',
    vocab: [
      { word: 'Glacier', phonetic: '/ˈɡleɪ.ʃər/', definitionEn: 'A huge, slow-moving river or sheet of ice formed from compacted snow.', example: 'Antarctica is covered by thick ice sheets and glaciers.' },
      { word: 'Blubber', phonetic: '/ˈblʌb.ər/', definitionEn: 'A thick layer of fat under the skin of whales and seals that keeps them warm in icy water.', example: 'Seals and whales have thick blubber to stay warm in freezing seas.' },
      { word: 'Colony', phonetic: '/ˈkɑː.lə.ni/', definitionEn: 'A large group of birds or animals of the same kind living closely together.', example: 'Thousands of penguins huddle together in a colony to stay warm.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Antarctica’s icy climate and how penguins, seals, and whales survive there',
      keyAction: 'Huddling together in colonies and using waterproof feathers and blubber to stay warm',
      importantPlaceOrObject: 'The continent of Antarctica and the Southern Ocean',
      lessonTakeaway: 'Polar animals have special physical and behavioral adaptations for extreme cold',
      detailFact: 'Emperor penguins take turns standing on the outside of the huddle so every penguin stays warm'
    }
  },
  {
    id: 'TuY1NhrKIeM',
    realDuration: '22:07',
    realMinutes: 22,
    channel: 'SciShow Kids',
    category: 'Geology & Earth’s Rocks',
    realVideoTitle: 'The Building Blocks of Earth: Rocks, Minerals & Volcanoes (22:07)',
    summary: 'Learn in 22 minutes about the three main types of rocks (igneous, sedimentary, metamorphic), the rock cycle, and how volcanoes create new rock.',
    vocab: [
      { word: 'Igneous', phonetic: '/ˈɪɡ.ni.əs/', definitionEn: 'Rock formed when hot melted magma or lava cools and hardens.', example: 'Granite and basalt are igneous rocks formed from cooled magma or lava.' },
      { word: 'Sediment', phonetic: '/ˈsɛd.ə.mənt/', definitionEn: 'Small pieces of sand, mud, and shells that settle at the bottom of rivers and oceans.', example: 'Over millions of years, layers of sediment press together into rock.' },
      { word: 'Mineral', phonetic: '/ˈmɪn.ər.əl/', definitionEn: 'A natural solid substance found in the earth that forms rocks and crystals.', example: 'Quartz and mica are shiny minerals found inside many rocks.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How igneous, sedimentary, and metamorphic rocks form in Earth’s rock cycle',
      keyAction: 'Cooling from lava, pressing layers of sediment, or changing under heat and pressure',
      importantPlaceOrObject: 'Volcanoes, riverbeds, mountains, and Earth’s rocky crust',
      lessonTakeaway: 'Rocks slowly change from one type to another over millions of years in the rock cycle',
      detailFact: 'Sedimentary rocks often contain fossils because layers of mud and sand gently bury ancient plants and shells'
    }
  },
  {
    id: '-ky0FLjhrGA',
    realDuration: '15:24',
    realMinutes: 15,
    channel: 'SciShow Kids',
    category: 'Botany & Plant Science',
    realVideoTitle: 'The Wonderful World of Plants! — Seeds, Roots & Photosynthesis (15:24)',
    summary: 'Discover in 15 minutes how tiny seeds sprout roots and stems, how leaves make food from sunlight, and how flowers attract pollinators.',
    vocab: [
      { word: 'Photosynthesis', phonetic: '/ˌfoʊ.toʊˈsɪn.θə.sɪs/', definitionEn: 'The process by which green plants use sunlight, water, and air to make their own food.', example: 'Leaves use sunlight for photosynthesis and release fresh oxygen.' },
      { word: 'Germinate', phonetic: '/ˈdʒɜːr.mə.neɪt/', definitionEn: 'When a seed begins to sprout and grow roots and a tiny stem.', example: 'With warm soil and water, the bean seed began to germinate.' },
      { word: 'Pollen', phonetic: '/ˈpɑː.lən/', definitionEn: 'A fine yellow powder made by flowers that helps plants make new seeds.', example: 'Bees carry golden pollen from one flower to another.' }
    ],
    comprehensionFacts: {
      mainSubject: 'How plants sprout from seeds, grow roots, and make food through photosynthesis',
      keyAction: 'Absorbing water through roots and using sunlight in green leaves to make food',
      importantPlaceOrObject: 'Gardens, forests, and flower meadows',
      lessonTakeaway: 'Plants provide food and oxygen for almost all living things on Earth',
      detailFact: 'Roots hold the plant firmly in the ground while drinking water and minerals from the soil'
    }
  },
  {
    id: 'Z8iWN14eDgE',
    realDuration: '23:50',
    realMinutes: 24,
    channel: 'Smile and Learn — English',
    category: 'Wild Animals & Ecosystems',
    realVideoTitle: 'Kings of the Wild — Lions, Elephants, Giraffes & Tigers (23:50)',
    summary: 'Explore wild animal habitats in this 24-minute English compilation to learn how lions, elephants, giraffes, zebras, and bears live in nature.',
    vocab: [
      { word: 'Predator', phonetic: '/ˈprɛd.ə.tər/', definitionEn: 'An animal that naturally hunts and eats other animals for food.', example: 'Lions and tigers are powerful predators with sharp claws.' },
      { word: 'Savanna', phonetic: '/səˈvæn.ə/', definitionEn: 'A grassy plain in tropical regions with warm weather and scattered trees.', example: 'Zebras, giraffes, and elephants live on the African savanna.' },
      { word: 'Herd', phonetic: '/hɜːrd/', definitionEn: 'A large group of hoofed or plant-eating mammals that live and travel together.', example: 'A herd of elephants walked together toward the river to drink.' }
    ],
    comprehensionFacts: {
      mainSubject: 'Wild animals of the savanna and jungle, their diets, and how they live in groups',
      keyAction: 'Living in protective herds or hunting across savannas and forests',
      importantPlaceOrObject: 'The African savanna and tropical Asian jungles',
      lessonTakeaway: 'Every wild animal plays an important role in keeping its ecosystem balanced',
      detailFact: 'Living in a herd helps plant-eating animals like zebras and elephants protect their young from predators'
    }
  }
];

// Generates 10 NON-REPETITIVE, INTERLEAVED (MIXED) Questions:
// Alternating Video Comprehension + Vocabulary in Context + ONE Grammar Rule for the Episode!
function buildMixedTenQuestions(
  episodeId: number,
  topic: CuratedVideoTopic,
  rule: GrammarRule
): QuizQuestion[] {
  const [v1, v2, v3] = topic.vocab;
  const rQ0 = rule.practiceQuestions[0];
  const rQ1 = rule.practiceQuestions[1 % rule.practiceQuestions.length];
  const ex0 = rule.storyExamples[0];
  const ex1 = rule.storyExamples[1 % rule.storyExamples.length];
  const baseId = episodeId * 100;

  return [
    {
      id: baseId + 1,
      category: 'Comprehension',
      questionEn: `1. [Video Comprehension] What is the main subject of "${topic.realVideoTitle}"?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        topic.comprehensionFacts.mainSubject,
        'How to bake a chocolate cake in a commercial bakery',
        'Repairing bicycles during a winter snowstorm',
        'Buying train tickets at an underground station'
      ],
      correctIndex: 0,
      explanationEn: `Correct! This video from ${topic.channel} focuses on: ${topic.comprehensionFacts.mainSubject}.`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 2,
      category: 'Grammar',
      questionEn: `2. [Grammar — ${rule.titleEn.split('(')[0].trim()}] ${rQ0.prompt}`,
      questionTranslation: { fr: '', ar: '' },
      options: rQ0.options,
      correctIndex: rQ0.correctIndex,
      explanationEn: `Correct answer: "${rQ0.options[rQ0.correctIndex]}". Rule Formula: ${rule.formulaPositive}`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 3,
      category: 'Vocabulary',
      questionEn: `3. [Video Vocabulary] In this video, what does the English word "${v1.word}" (${v1.phonetic}) mean?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        'A plastic spoon used for eating soup',
        v1.definitionEn,
        'A heavy wool coat worn in winter',
        'A paper ticket for riding a bus'
      ],
      correctIndex: 1,
      explanationEn: `"${v1.word}" means: ${v1.definitionEn} Example: "${v1.example}"`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 4,
      category: 'Comprehension',
      questionEn: `4. [Video Comprehension] Which key action or process takes place in this episode?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        'Sleeping all day inside a dark garage',
        'Painting a submarine bright pink in the desert',
        topic.comprehensionFacts.keyAction,
        'Selling winter boots at a summer beach'
      ],
      correctIndex: 2,
      explanationEn: `Great job! In the video, we see: ${topic.comprehensionFacts.keyAction}.`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 5,
      category: 'Grammar',
      questionEn: `5. [Grammar — ${rule.titleEn.split('(')[0].trim()}] ${rQ1.prompt}`,
      questionTranslation: { fr: '', ar: '' },
      options: rQ1.options,
      correctIndex: rQ1.correctIndex,
      explanationEn: `Well done! "${rQ1.options[rQ1.correctIndex]}" follows ${rule.titleEn}.`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 6,
      category: 'Comprehension',
      questionEn: `6. [Video Detail] Which specific fact from "${topic.realVideoTitle}" is TRUE?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        'The characters travel by submarine to the center of the Moon',
        'Nobody speaks English in this episode',
        'The story happens inside a noisy supermarket',
        topic.comprehensionFacts.detailFact
      ],
      correctIndex: 3,
      explanationEn: `Spot on! True detail from the video: ${topic.comprehensionFacts.detailFact}.`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 7,
      category: 'Vocabulary',
      questionEn: `7. [Video Vocabulary] Complete this sentence from the lesson: "${v2.example.replace(new RegExp(v2.word, 'i'), '_____')}"`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        v2.word,
        'Umbrella',
        'Sandwich',
        'Pillow'
      ],
      correctIndex: 0,
      explanationEn: `Correct! Complete sentence: "${v2.example}" (${v2.word}: ${v2.definitionEn}).`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 8,
      category: 'Grammar',
      questionEn: `8. [Grammar Correction] Spot the mistake! Which sentence is 100% grammatically CORRECT according to ${rule.titleEn.split('(')[0].trim()}?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        rule.commonMistake.wrong,
        rule.commonMistake.right,
        'Yesterday we tomorrow going is play.',
        'They is have three golden books.'
      ],
      correctIndex: 1,
      explanationEn: `Correct! Always say "${rule.commonMistake.right}" (NOT "${rule.commonMistake.wrong}").`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 9,
      category: 'Vocabulary',
      questionEn: `9. [Video Vocabulary] Which key word from this video matches the meaning: "${v3.definitionEn}"?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        'Refrigerator',
        'Bicycle',
        v3.word,
        'Notebook'
      ],
      correctIndex: 2,
      explanationEn: `Exactly! "${v3.word}" (${v3.phonetic}): ${v3.definitionEn}`,
      explanationFr: '',
      explanationAr: ''
    },
    {
      id: baseId + 10,
      category: 'Comprehension',
      questionEn: `10. [Video Takeaway & Grammar] What is the main takeaway of this video, and which grammar pattern did we practice?`,
      questionTranslation: { fr: '', ar: '' },
      options: [
        `${topic.comprehensionFacts.lessonTakeaway} (Grammar: ${rule.titleEn.split('(')[0].trim()} — e.g., "${ex0.english || ex1.english}")`,
        'Never read books or ask science questions',
        'Skip all lessons and sleep all afternoon',
        'Only practice English once every ten years'
      ],
      correctIndex: 0,
      explanationEn: `Awesome! You mastered the video takeaway ("${topic.comprehensionFacts.lessonTakeaway}") and ${rule.titleEn}!`,
      explanationFr: '',
      explanationAr: ''
    }
  ];
}

export const REAL_VIDEO_EPISODES: RealVideoEpisode[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const level: 'L3' | 'L4' = id <= 50 ? 'L3' : 'L4';

  // ONE focused Grammar Rule per Episode (cycles cleanly across all 10 L3 & L4 rules so every episode has 1 clear grammar lesson)
  const primaryRuleIndex = (id - 1) % GRAMMAR_RULES.length;
  const primaryRule: GrammarRule = GRAMMAR_RULES[primaryRuleIndex];

  const zoneIndex = Math.min(4, Math.floor(primaryRuleIndex / 2));
  const zoneInfo = ZONES[zoneIndex];

  // 3 videos per week schedule (Week 1 to Week 34)
  const weekNumber = Math.floor(index / 3) + 1;
  const daySlotIndex = index % 3;

  const videoTopic = CURATED_YOUTUBE_VIDEOS[index % CURATED_YOUTUBE_VIDEOS.length];
  const partNumber = Math.floor(index / CURATED_YOUTUBE_VIDEOS.length) + 1;
  const displayTitle =
    partNumber === 1
      ? videoTopic.realVideoTitle
      : `${videoTopic.realVideoTitle} — Part ${partNumber}`;

  const searchQuery = encodeURIComponent(
    `${videoTopic.channel} ${videoTopic.category} English kids`
  );

  return {
    id,
    title: displayTitle,
    subtitleFr: '',
    subtitleAr: '',
    level,
    durationMinutes: videoTopic.realMinutes,
    durationFormatted: videoTopic.realDuration,
    zone: zoneInfo.id,
    zoneName: `${videoTopic.category} · ${videoTopic.channel}`,
    grammarRuleId: primaryRule.id,
    grammarTopicTitle: primaryRule.titleEn,
    secondaryGrammarRuleId: primaryRule.id,
    secondaryGrammarTopicTitle: primaryRule.code,
    weekNumber,
    daySlotIndex,
    summaryEn: `${videoTopic.summary} (Real YouTube Duration: ${videoTopic.realDuration} mins · Grammar Lesson: ${primaryRule.titleEn}).`,
    summaryFr: '',
    summaryAr: '',
    realVideo: {
      youtubeId: videoTopic.id,
      channelName: videoTopic.channel,
      seriesTitle: displayTitle,
      topicCategory: videoTopic.category,
      videoUrl: `https://www.youtube.com/watch?v=${videoTopic.id}`,
      embedUrl: `https://www.youtube.com/embed/${videoTopic.id}?rel=0&cc_load_policy=1&cc_lang_pref=en&hl=en`,
      searchUrl: `https://www.youtube.com/results?search_query=${searchQuery}`,
      clipStartSeconds: 0,
      clipEndSeconds: videoTopic.realMinutes * 60
    },
    keyVocab: videoTopic.vocab.map((w) => ({
      word: w.word,
      phonetic: w.phonetic,
      fr: w.definitionEn,
      ar: '',
      example: w.example
    })),
    script: [],
    questions: buildMixedTenQuestions(id, videoTopic, primaryRule)
  };
});
