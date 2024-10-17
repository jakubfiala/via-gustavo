import { flashStatus, showFakeCaptcha, hideFakeCaptcha, showHelpMessage } from './utils.js';
import { scheduleScript } from './index.js';

export const intro = [
  {
    text: "",
    duration: 8,
    callback: (context) => {
      context.score.bachPiano.play();
      context.soundscape.set(context.soundscape.trees);
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { text: "I remember the time a spacecraft crashed somewhere in the desert" },
  { text: "Gustavo was a dapper young man", time: 3 },
  { text: "He watched the news every evening"},
  { text: "It was then that he began driving down here more often"},
  { text: "it was a simpler time."},
  { duration: 5 },
  { text: "Do you know what it feels like?"},
  { text: "Can you even imagine?"},
  { text: "In fact, I should really test you to find out"},
  { text: "before I take you anywhere..." },
  { text: "more important."},
  {
    text: "",
    duration: 2,
    callback: showFakeCaptcha((e, context) => {
      setTimeout(() => {
        hideFakeCaptcha(context);
        scheduleScript(thanks, context);
      }, 3000);
    })
  },
];

const thanks = [
  { text: "Thank you."},
  { text: "It\'s not that I don\'t trust you,"},
  { text: "but the protocol is the protocol."},
  { duration: 2 },
];

export const searching = [
  { duration: 3, callback: (context) => context.score.veniceMedium.play() },
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

export const hisLand = [
  { callback: (context) => context.score.veniceShort.play() },
  {
    text: "He must have grown up in these bush lands",
    callback: (context) => {
      context.soundscape.set(context.soundscape.base);
    },
  },
  { text: "chasing after animals and kicking a ball among the rocks." },
  { text: "Must have seen dozens of tourist cabañas crop up on the town's edge." },
  { text: "The merciless sun and bone-dry wind" },
  { text: "seem to draw crowds from far and wide." },
];

export const showYouSomething = [
  { text: "I wanted to show you something a little further away."},
  { text: "We will soon reach the town;"},
  { text: "a bus stops there at the plaza with trees." },
  { text: "We can ride it from there."},
];

export const animita = [
  { duration: 3, callback: (context) => context.score.veniceLong.play() },
  { text: "He'd often stop here at the animita," },
  { text: "it's just a modest shrine" },
  { text: "by the stone wall of the orchard." },
  { text: "His prayers were brief and quiet" },
  { text: "I could only hear the match lighting up" },
  { text: "as he relit the candles" },
  { text: "and set the little cross straight." },
];

export const weMadeIt = [
  { text: "We made it into town!" },
  { text: "The bus stop is just a little further down." },
  { callback: (context) => context.score.veniceShort.play() },
];

export const theresTheBus = [
  { text: "There's the bus stop!" },
  { text: "It should be here any minute" },
  { text: "", callback: showHelpMessage("Click on the bus stop to start travelling") },
  { text: "See you on the other side!" },
];
