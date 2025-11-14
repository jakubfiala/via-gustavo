import { setTask } from '../task.js';
import { flashStatus } from './utils.js';
import { journalMoment } from '../journal/index.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      setTask('Look for Gustavo along the dirt road to the north');
      context.score.bachPiano3.play();
      context.soundscape.set(context.soundscape.highwayRight);
      context.sfx.setFootsteps('gravel');
      context.score.dirtRoad1.preload = 'auto';
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  {
    duration: 1,
  },
  {
    callback: () => journalMoment('🛣️', "Crossed the Panamericana highway and ended up on a dirt road heading north."),
  },
];

export const outro = [
  { text: "Another one?" },
  { text: "Another observer, coming to 'check us out' from some comfy chair in whatever dimension you're in?" },
  { text: "Well, great." },
  { text: "I assume you're looking for Gustavo, aren't you?" },
  { text: "And I'm meant to guide you on your little journey..." },
  { text: "Of course I will. What else am I supposed to do?" },
  { text: "Gustavo, Gustavo, Gustavo... yes, he did come down here recently." },
  {
    text: "Right through the town center - if you keep going straight, you'll get there in no time.",
    callback: () => setTask('Continue north, straight ahead to the town center'),
  },
];
