import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano2.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
]
