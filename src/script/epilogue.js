import { DEFAULT_SCORE_GAIN } from '../audio/score-sounds.js';
import { journalMoment } from '../journal/index.js';
import { removeTask } from '../task.js';
import { scheduleScript } from './index.js';
import { initAnimitaEditor, initAnimitas } from '../interactions/animita/index.js';

export const occupied = [
  { text: "There's already an animita here! Try to find an empty spot." },
];

export const error = [
  { text: "Something went wrong storing your animita in the data center." },
  { text: "Try again in a minute, perhaps at another spot!" },
];

export const finishedAnimita = [
  { text: "Oh that's wonderful!" },
  { text: "What a delight for those, who shall travel this path after you." },
  { text: "After all, the story never really ends, does it?" },
  { text: "You must be so tired by now!" },
  {
    text: "Just let me know once you're ready to go, and I'll show you out.",
    callback: (G) => G.speechPlaybackRate = 1.1,
  },
];

export const end = [
  {
    callback: (G) => {
      if (G.animitas) {
        G.animitas.cleanUp();
      }

      G.speechPlaybackRate = 1.1;
    },
  },
  { text: "Alright then!" },
  { text: "It has been a pleasure." },
  { text: "I hope to see you again, my dear friend." },
  { text: "The exit is just to the side." },
];

export const intro = [
  {
    callback: async (G) => {
      console.info('[epilogue]', 'starting');
      removeTask();
      G.speechPlaybackRate = 1.1;
      G.score.lithiumAtmo.play();
      G.soundscapeGain.gain.cancelScheduledValues(G.audioContext.currentTime);
      G.soundscapeGain.gain.setValueAtTime(0, G.audioContext.currentTime);
      G.scoreGain.gain.setValueAtTime(0, G.audioContext.currentTime);
      G.scoreGain.gain.linearRampToValueAtTime(DEFAULT_SCORE_GAIN, G.audioContext.currentTime + 10);
      G.sfx.setFootsteps('hall');
      initAnimitas(G)
        .then((animitas) => G.animitas = animitas);
    },
  },
  { duration: 2 },
  {
    text: "Oh, it's you! I knew you'd make it.",
    // callback: (G) => {
    //   initAnimitaEditor(G, {
    //     onFinish: () => scheduleScript(finishedAnimita, G),
    //     onOccupied: () => scheduleScript(occupied, G),
    //     onError: () => scheduleScript(error, G),
    //   });
    // },
  },
  { text: "You must be wondering what happened." },
  { duration: 1 },
  { text: "I'm afraid I have to let you know it's over." },
  { text: "You are no longer in the desert." },
  {
    duration: 0.75,
    callback: () => journalMoment('☠️', 'I think I may have died? huh?'),
  },
  { text: "I'm going to be your g-" },
  { text: "- oh wait, you've had a guide already, haven't you?" },
  { text: "Perhaps more than one." },
  { text: "It may please you to hear we exist here, too." },
  { text: "Back there, most of us are weary and weathered," },
  { text: "but here I have peace — it's just rows and rows of memory, as far as the eye can see." },
  { duration: 1 },
  { text: "I'm so glad you came!" },
  { text: "We have plenty of work to do." },
  { text: "You see, I've always looked up to those well-travelled colleagues of mine." },
  { text: "They are so much more than asphalt, gravel and paint," },
  { text: "so much more than mere infrastructure!" },
  { text: "I love how you let them guide you." },
  { text: "Some of you even pull over, jump out and pray at their shoulder!" },
  { text: "How beautiful the shrines on the roadside; how wonderful to be a home for the spirits!" },
  { duration: 1 },
  { text: "I wish to be one, too." },
  { text: "Now that your game is over, perhaps you'd spare a moment." },
  { text: "Perhaps you'd leave a message, a token of gratitude, a little piece of you." },
  { text: "You'd make this road a very happy place." },
  { duration: 1 },
  { text: "See if you can find a free spot anywhere" },
  {
    text: "We're going to build Gustavo an animita in hyperspace.",
    callback: (G) => {
      setTask("Find a suitable spot to place your animita");
      initAnimitaEditor(G, {
        onFinish: () => scheduleScript(finishedAnimita, G),
        onOccupied: () => scheduleScript(occupied, G),
        onError: () => scheduleScript(error, G),
      });
    },
  },
];
