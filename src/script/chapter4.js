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

export const difunta1 = [
  { text: "Well, I hope you had fun down there." },
  { text: "You probably expect me to share some profound wisdom, or tell some deep-ass story." },
  { text: "You know what? I'll tell you one." },
  { duration: 1 },
  { text: "Picture Deolinda" },
  { text: "walking on parched, rocky ground" },
  { text: "carrying a babe, still a suckling, no more than two months old." },
  { text: "Her hand placed over the child's face, protecting it from the relentless sun." },
  { text: "It has been three days since she left her home, looking for her sick husband." },
  { text: "He was somewhere out there, forced to fight in an unnecessary war," },
  { text: "and abandoned by his comrades to die." },
  { text: "She would not sit idle while he languishes in the wilderness." },
  { text: "She is not afraid of the rugged mountains" },
  { text: "nor the treacherous valleys." },
  { text: "She packed quickly, left her home without turning back." },
  { text: "Now the wind is stinging on her face," },
  { text: "and her strength is starting to wane." },
  { text: "She holds the baby tight and presses on." },
  { duration: 1 },
  { text: "What she's doing is pretty dumb, if you ask me." },
];

export const difunta2 = [
  { text: "She really is scraping the bottom of the barrel." },
  { text: "Her tongue feels like sandpaper, her lips are swollen and cracked." },
  { text: "She squeezes the last drop of water from a small leather pouch." },
  { duration: 1 },
  { text: "The child will not stop wailing, and her beloved one is nowhere to be found." },
  { text: "She prays to the gods - the old and the new ones," },
  { text: "but when her knees falter and she crumbles onto the ground," },
  { text: "none of them are there to hear it." },
  { text: "The little one stays pressed against her chest as silence takes hold on the pampa again." },
];

export const difunta3 = [
  { text: "Days later, a group of gauchos ride across the plains with their cattle." },
  { text: "One of them, a young lad, keen to prove himself," },
  { text: "keeps circling around the herd, avoiding the thorny bushes by millimeters." },
  { text: "Suddenly, he spots vibrant red cloth among the rocks to the side." },
  { text: "He calls to his companions, and they rush to investigate." },
  { text: "They gather around the poor Deolinda, who lays there on the ground," },
  { text: "babe on her chest, the light in her eyes long gone." },
  { text: "Suddenly, the gauchos gasp." },
  { text: "The little child moves, makes a sound," },
  { text: "and presses its lips to the woman's breast." },
  { text: "It has been there for days, sustained from her limp body." },
  { text: "The Mother provides even in death." },
];

export const difunta4 = [
  { text: "I know, I know" },
  { text: "The story's not exactly a box office hit" },
  { text: "But it's kind of a big deal here." },
  { text: "And it befits someone like you and I," },
  { text: "the wanderers, the wayfinders and the vagabonds," },
  { text: "the gauchos, truck drivers and other travellers," },
  { text: "to leave her an offering of water at the roadside." },
  { text: "Come, let's honor the brave Deolinda!" },
  { text: "May she guard us on the voyages to come." },
];

