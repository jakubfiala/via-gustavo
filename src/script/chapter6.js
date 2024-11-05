import { journalMoment } from '../journal/index.js';
import { flashStatus } from './utils';

export const intro = [
  {
    duration: 11,
    callback: (context) => {
      context.soundscape.set(context.soundscape.trees);
      context.sfx.setFootsteps('normal');
    },
  },
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano6.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { duration: 2 },
  { callback: () => journalMoment('🚗', "Hitched a ride to the Pampa de Tamarugal") },
];
