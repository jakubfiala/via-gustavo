import { setTask } from '../task.js';
import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      setTask('Enter through the town gate');
      context.score.bachPiano5.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
];
