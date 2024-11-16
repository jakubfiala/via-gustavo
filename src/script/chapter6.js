import { journalMoment } from '../journal/index.js';
import { setTask } from '../task.js';
import { flashStatus, enableClickToGoCB } from './utils';

export const intro = [
  {
    duration: 28,
    callback: (context) => {
      context.soundscape.set(context.soundscape.townBigRoad);
      context.sfx.setFootsteps('normal');
      context.score.bachPiano6.preload = 'auto';
    },
  },
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano6.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { duration: 2 },
  { callback: () => journalMoment('🚗', "Hitched a ride to the Pampa del Tamarugal") },
  { text: "Okay, phew, there you are. I suppose we should get right to it." },
  {
    text: "Let's walk and talk... from here it's just rocks and tamarugo trees for miles and miles.",
    callback: (context) => enableClickToGoCB(context),
  },
  {
    duration: 2,
    callback: () => setTask('Look for Gustavo in the Tamarugo forest to the south')
  },
];

export const growingUp = [
  { text: "See, it's weird growing up in a place people use as a Mars simulator." },
  { text: "It's not like the Sahara, where the sand quickly covers all traces of events." },
  { text: "No, this desert remembers." },
  { text: "Gustavo spent his childhood looking at the endless plains," },
  { text: "rugged ground sliced by perfectly straight roads, aligned with the cartesian axes we imposed on the planet." },
  { text: "In these things, I think, he saw a promise." },
  { text: "The one we were all once given - space travel? cure for old age? the Information Superhighway?" },
  { text: "Or just that things will always keep getting better..." },
];

export const touchTheSky = [
  {
    text: "He saw himself as one with the ground.",
    callback: (context) => { context.score.finalTheme1.preload = 'auto'; },
  },
  { text: "with the precious water filling cavernous spaces under it, and with the endless void above." },
  { text: "That has always been the purpose of his search:" },
  { text: "to reach across the planetary divide, and touch the sky." },
  { text: "Is your own journey really any different?" },
];

export const evening = [
  { callback: (context) => {
      context.soundscape.set(context.soundscape.base);
      context.score.finalTheme1.play();
      context.container.animate([
        { filter: 'brightness(0.95) contrast(1.2) hue-rotate(0deg)' },
        { filter: 'brightness(0.75) contrast(1.6) hue-rotate(-8deg)' },
      ], { duration: 15_000, fill: 'forwards' });
    },
  },
  {
    text: "It's getting dark as I see him reach the Pampa",
    callback: (context) => {
      context.soundscape.set(context.soundscape.townBigRoad);
    },
  },
  { text: "He must have walked from Humberstone on foot, for hours along the highway." },
  { text: "He should have been smart enough to hitch-hike like you did." },
  { text: "Clothes torn, he's trembling in the evening breeze." },
  { text: "His eyes still scanning the ground, still searching for that unnamed Something." },
  { text: "The phone battery has died, he tries turning it on once more, then throws it towards the trees." },
  {
    text: "I feel like he's trying not to weep.",
    callback: (context) => { context.score.finalTheme3.preload = 'auto'; },
  },
  { duration: 0.5 },
  { text: "I try to tell him it's not over yet, he can still go home, fight another day." },
  { text: "He won't listen." },
];

export const night = [
  { callback: (context) => context.score.finalTheme3.play() },
  { text: "He sometimes stops, stares at the stars, linking them with his fingers, forming constellations." },
  { text: "I gasp every time he wanders onto the asphalt, drivers cursing as they swerve past him." },
  { text: "He seems to pick up energy as the night closes in," },
  { text: "soon he's practically running." },
  { text: "He crosses the diagonal road that would lead him back home, to Matilla." },
  { text: "From there, he walks dead in the middle of the road." },
  { text: "There is no stopping him." },
];

export const end = [
  {
    text: "Just as the lights from the campsite ahead get brighter, and I pray he finally gets some help,",
    callback: (context) => { context.score.lobotomy.preload = 'auto'; },
  },
  { text: "he spots something on the asphalt." },
  { text: "His face lights up with joy, he begins to laugh, tears running down his cheeks." },
  { text: "I shout his name as he kneels down in the left lane." },
  { duration: 2 },
  { text: "He turns back briefly, looks into the northern distance, measures me with his gaze, but it's too late." },
  { text: "A pair of violent headlights outline his silhouette from behind." },
];

export const poem = [
  { text: "Oh Gustavo, what did you see?" },
  { text: "I saw you when it happened" },
  { text: "Right here on my crumbling shoulder" },
  { text: "I never wished you harm" },
  { duration: 0.7 },
  { text: "I only wanted to place my rigid spine under your wheels" },
  { text: "to point two parallel lines towards your destination." },
  { duration: 1 },
  { text: "Gustavo! Who are they?" },
  { text: "Those who keep pulling over in the evening" },
  { text: "weeping or staring solemnly, leaving mark after mark at the place, where your last breath joined the desert air." },
  { text: "Your offspring, friends or lovers," },
  { text: "I sense their broken hearts when their feet touch the asphalt." },
  { duration: 1 },
  { text: "Dear Gustavo, the sun is burning brighter than ever," },
  { text: "and strange visitors frequent my path." },
  { text: "They come here alone and walk for miles," },
  { text: "but they don't smell the burned rubber," },
  { text: "they don't hear the rustling bushes," },
  { text: "they have arrived a different way." },
  { text: "I lead them to your sanctuary to stand still for a while, my dear Gustavo," },
  { text: "right here on my crumbling shoulder," },
  { text: "no sound of rustling bushes, no smell of burned rubber," },
  { text: "to honour you." },
  { duration: 1 },
  { text: "Oh Gustavo! Ages may pass," },
  { text: "the winds of time may blow away your memory," },
  { text: "but today, it travels across the planet," },
  { text: "today, it's etched in semiconductors" },
  { text: "in Quilicura, Canelones, in Douglas County, Inzai and Hanau..." },
  { duration: 1 },
  { text: "May this strange moment" },
  { duration: 0.25 },
  { text: "in this vast desert" },
  { duration: 0.25 },
  { text: "or under some distant sky" },
  { duration: 1 },
  { text: "May this strange moment last." },
];
