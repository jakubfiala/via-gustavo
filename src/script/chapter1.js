import { flashStatus, showFakeCaptcha, hideFakeCaptcha } from './utils.js';
import { scheduleScript } from './index.js';

const Chapter1Outro = [
 { text: 'Thank you.' },
 { text: 'It\'s not that I don\'t trust you,' },
 { text: 'but the protocol is the protocol.' },
 { duration: 2 },
 { text: 'I wanted to show you something a little further away.'},
 { text: 'There is a bus stop just a short walk down' },
 { text: '- we can ride on from there.'}
];

export const Chapter1Intro = [
  {
    text: '',
    duration: 5,
    callback: (context) => {
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { text: 'I remember when the spacecraft fell' },
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
        scheduleScript(Chapter1Outro, context);
      }, 3000);
    })
  },
  // {
  //   text: "In this ephemeral world",
  //   time: 3,
  //   duration: 6
  // },
  // { text: "time is constrained", duration: 3 },
  // { text: "by the two guardian sigils", time: 3, duration: 6 },
  // { text: " - extrema of power;", duration: 3 },
  // { text: "The Request", time: 5, duration: 10, callback: showSigil("request") },
  // { text: "and The Response.", duration: 5, callback: showSigil("response") },
  // { text: "The third sigil is a secret" },
  // { text: "where true power lies." },
  // {
  //   text: "We complete the triad by placing it in the middle,",
  //   time: 5,
  //   duration: 3
  // },
  // { text: "like a bridge:", duration: 2, callback: showSigil("interface") },
  // { text: "The Interface.", duration: 5 },
  // { text: "The first step in a journey is to ask for help - ", duration: 2 },
  // { text: "recognize the state of your being,", duration: 2 },
  // { text: "take Refuge in who you are", duration: 3 },
  // { text: "and who you are not.", duration: 2 },
  // { text: "",
  //   duration: 2,
  //   callback: showFakeCaptcha((e, context) => {
  //     setTimeout(() => {
  //       hideFakeCaptcha(context);
  //       scheduleScript(Checkpoint1EndScript, context);
  //     }, 3000);
  //   }) },
];
