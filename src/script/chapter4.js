import { setTask } from '../task.js';
import { flashStatus } from './utils.js';
import { journalMoment } from '../journal/index.js';

export const aboutDrone = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano.play();
      journalMoment('🛣️', "Met a new companion. This one's a bit different.");
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { text: "I saw the little flying monster earlier" },
  { text: "Must feel strange to be watched, when you're the one watching, huh?" },
  { text: "Don't worry though, they're not allowed to come here" },
];

export const doYoKnow = [
  { text: "Allow me to clarify why, in my humble opinion, your search is a little bit ridiculous." },
  { duration: 1 },
  { text: "Do you have any idea how many people drive through here?" },
  { text: "Look at the two lines dividing the asphalt" },
  { text: "Two. Lines. That means it's important, you doof!" },
  { text: "Come on, let's go deeper into town." },
  {
    text: "You'll see how busy it is here - and they call it a desert!",
    callback: () => setTask('Explore the main street towards the north'),
  },
];

export const pozoAlmonteMF = [
  { text: "Pozo Almonte, motherfucker!" },
  { text: "This town has only one thing to thank for its existence -" },
  { text: "salt. That white gold is what we care about here." },
  {
    text: "And so did your guy Gustavo, and his old man, and that guy's old man before him",
    callback: () => journalMoment('🧂', 'Discovered the mighty town of Pozo Almonte'),
  },
];

