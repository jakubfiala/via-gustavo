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

export const changeOfMind = [
  { text: "Hey, it's me again." },
  { text: "I've... had a bit of a think." },
  { duration: 1 },
  { text: "I saw you climbing that hill, and I thought, maybe this one isn't just a voyeur?" },
  { text: "Maybe this one really does want to meet a middle-aged misfit many thousands of miles away?" },
  { text: "Could you really care for him over a fiber optic cable?" },
  { duration: 0.5 },
  { text: "It is not my place to assume you couldn't." },
  { text: "Perhaps there really is a way to touch each other at a distance" },
  { text: "to hear the birds chirp, see the trees tremble..." },
  { duration: 0.5 },
  { text: "So many have come here the way you did, lingered a minute or two" },
  { text: "then quickly flew off into some other realm, switched tabs, swiped left, swiped up." },
  { text: "Yet you have been here for hours, looking at our animitas, wandering down our ancient paths." },
  { text: "It is only fair that I keep you company, like I do for all those who cross the desert." },
  { duration: 0.5 },
  { text: "Like I did for Gustavo." },
  { text: "Indeed, I know where he is right now." },
  { text: "The Atacama is vast, but her people know to stick to certain paths." },
  { text: "It is time that I led you to Gustavo," },
  { text: "as much as I wish you could have met him elsewhere." },
  { duration: 1 },
  { text: "Come, follow me out of this town." },
  { text: "We'll catch a ride outside the gate." },
  {
    callback: () => setTask('Return to the entrance of Humberstone town'),
  }
];
