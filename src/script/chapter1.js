import { flashStatus, showFakeCaptcha, hideFakeCaptcha } from './utils.js';
import { scheduleScript } from './index.js';

export const Chapter1Intro = [
  {
    text: '',
    duration: 8,
    callback: (context) => {
      context.score.bachPiano.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { text: 'I remember the time a spacecraft crashed somewhere in the desert' },
  { text: 'Gustavo was a dapper young man', time: 3 },
  { text: 'He watched the news every evening' },
  { text: 'It was then that he began driving down here more often' },
  { text: 'it was a simpler time.' },
  { duration: 5 },
  { text: 'Do you know what it feels like?' },
  { text: 'Can you even imagine?' },
  { text: 'In fact, I should really test you to find out' },
  { text: 'before I take you anywhere...'},
  { text: 'more important.' },
  {
    text: '',
    duration: 2,
    callback: showFakeCaptcha((e, context) => {
      setTimeout(() => {
        hideFakeCaptcha(context);
        scheduleScript(Chapter1Thanks, context);
      }, 3000);
    })
  },
];

const Chapter1Thanks = [
  { text: 'Thank you.' },
  { text: 'It\'s not that I don\'t trust you,' },
  { text: 'but the protocol is the protocol.' },
  { duration: 2 },
];

export const Chapter1Searching = [
  { text: "I'd see him come down from Matilla," },
  { text: "pull over, and disappear among the trees." },
  { text: "He really believed he'd find a heap of" },
  { text: "some Soviet electronics" },
  { text: "or precious metals." },
  { text: "I always thought it was silly," },
  { text: "most of it was probably on the ocean floor." },
  { duration: 2 },
  { text: "Alas, it was not my role to talk him out of it." },
  { text: "Best I could do is to keep him company" },
  { text: "until he stepped out of the truck." },
];

export const Chapter1HisLand = [
  { text: "He must have grown up in these bush lands" },
  { text: "chasing after animals and kicking a ball among the rocks." },
  { text: "Must have seen dozens of tourist cabañas crop up on the town's edge." },
  { text: "The merciless sun and bone-dry wind" },
  { text: "seem to draw crowds from far and wide." },
];

const Chapter1Outro = [
  { text: 'I wanted to show you something a little further away.'},
  { text: 'There is a bus stop just a short walk down' },
  { text: '- we can ride on from there.'},
];
