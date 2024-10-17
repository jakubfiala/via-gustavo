import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano3.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
];
