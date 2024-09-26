import { showHelpMessage, enableClickToGoCB } from './utils.js';

export default [
  { duration: 10 },
  { text: "Oh, it's you!" },
  { text: "I almost thought you wouldn't make it." },
  { duration: 1 },
  { text: "Many don't." },
  { text: "Anyways, here we are, and I suppose I should explain briefly.", time: 3, duration: 3 },
  { text: "I'm going to be your guide today." },
  { text: "Not that you really need one - what with all the tags, coordinates, entries and hyperlinks.", time: 3, duration: 6 },
  {
    text: "Look around, perhaps you'll notice them already.",
  },
  {
    duration: 5,
    callback: showHelpMessage('Click and drag to look around'),
  },
  { text: "Tiles delineated by glitches, smeared presences, the sky glimmering with copyright.", time: 3, duration: 6 },
  { duration: 2 },
  { text: "We're going to do a whole lot of looking today." },
  { text: "Looking, and walking." },
  {
    text: "Indeed, you can walk here - ",
    callback: enableClickToGoCB,
  },
  {
    duration: 5,
    callback: showHelpMessage('Use the mouse, gamepad or keyboard to move', ['W', 'A', 'S', 'D']),
  },
  { text: "Isn't that wonderful?" },
  { text: "You move your muscles, and the image around you changes:" },
  { text: "First smeared, then sharp again" },
  { text: "You might even hear the soundscape alter" },
  { text: "What is a world, if not a series of multisensory images" },
  { text: "presented to us as a function" },
  { text: "of latitude, longitude, heading and pitch." },
  { duration: 2 },
  { text: "Come, let's walk down this road together," },
  { text: "and I'll tell you about me.", callback: () => document.body.classList.add('dreamz') },
];
