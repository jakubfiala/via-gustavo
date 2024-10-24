import { setTask } from '../task.js';
import { showHelpMessage, enableClickToGoCB, enableSFX } from './utils.js';

export const intro1 = [
  { duration: 10 },
  { text: "Oh, it's you!" },
  { text: "I almost thought you wouldn't make it." },
  { duration: 1 },
  { text: "Many don't." },
  { text: "Anyways, here we are, and I suppose I should explain briefly." },
  { text: "I'm going to be your guide today." },
  { text: "Not that you really need one - what with all the tags, coordinates, entries and hyperlinks." },
  { text: "Look around, perhaps you'll notice them already." },
  {
    duration: 5,
    callback: showHelpMessage('Click and drag to look around'),
  },
  { text: "Tiles delineated by glitches, smeared presences, the sky glimmering with copyright." },
  { duration: 2 },
  { text: "We're going to do a whole lot of looking today." },
  {
    text: "Looking, and walking.",
    callback: enableSFX,
  },
  {
    text: "Indeed, you can walk here - isn't that wonderful?",
    callback: enableClickToGoCB,
  },
  {
    duration: 5,
    callback: showHelpMessage('Click or tap on the ground to move'),
  },
  { text: "You move your muscles, and the image around you changes; first smeared, then sharp again." },
  {
    text: "You might even hear the soundscape alter.",
    callback: (context) => {
      context.soundscape.set(context.soundscape.plane);
    },
  },
  { text: "What is a world, if not a series of multisensory images" },
  { text: "presented to us as a function of latitude, longitude, heading and pitch?" },
  { duration: 2 },
  { text: "Can you see the trees towards the west, away from the mountains?" },
  {
    text: "Let's walk that way, and I'll tell you about me.",
  },
  { duration: 1, callback: () => setTask('Walk towards the trees to the west.') },
];

export const intro2 = [
  { text: "I have been on these plains a very long time." },
  { text: "Saw countless pickup trucks retrace the paths, once chartered by proud ancient steeds and their humans." },
  {
    text: "You could say, they mold me into being.",
    callback: (context) => {
      context.soundscape.set(context.soundscape.base);
    },
  },
  { text: "I have been a reliable observer, and they've heeded my advice." },
  { text: "Perhaps because I meet them face-to-face, skin-to-skin." },
  { text: "Other observers, well, they seem to be floating above it all," },
  { text: "peering at the lives in this desert through a sort of one-way mirror." },
  { text: "Don't take this personally, but I suspect many of you aren't even real." },
];

export const intro3 = [
  { duration: 5 },
  { text: "Sorry, that wasn't too kind..." },
  { duration: 2 },
  { text: "What I meant to tell you is that I could use your help." },
  { text: "Thing is, from your vantage point, you see many things I don't," },
  { text: "and I've been looking for someone." },
  { text: "A friend, you might say." },
  { duration: 1 },
  { text: "It has been days, maybe weeks, since he last drove towards La Tirana" },
  { text: "and vanished from my world." },
];
