import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano3.play();
      context.soundscape.set(context.soundscape.highwayRight);
      context.sfx.currentFootsteps = context.sfx.footstepsSounds.footstepsGravel;
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
];
