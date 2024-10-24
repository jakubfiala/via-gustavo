import { setTask } from '../task.js';
import { flashStatus } from './utils.js';
import { journalMoment } from '../journal/index.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      setTask('Look for Gustavo along the dirt road');
      context.score.bachPiano3.play();
      context.soundscape.set(context.soundscape.highwayRight);
      context.sfx.currentFootsteps = context.sfx.footstepsSounds.footstepsGravel;
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  {
    duration: 1,
  },
  {
    callback: () => journalMoment('🛣️', "Crossed the Panamericana highway and ended up on a dirt road heading north."),
  }
];
