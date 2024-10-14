import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano2.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
];

  // intro, send player to cathedral

export const station1 = [
  // 1. laid in his tomb
  { text: "Picture Gustavo" },
  { text: "laying in his bed" },
  { text: "hist best shirt creased at the elbows" },
  { text: "his black trousers outlining his bones" },
  { text: "his eyes shut, chest gently rising" },
  { text: "and falling again." },
  { text: "You'd almost want to put a bouquet" },
  { text: "in his hands, so he can smell the flowers." },
  { text: "That's not a good idea" },
  { text: "- he'd probably wake up and get mad at you." },
  { text: "'What do you think I am?" },
  { text: "A fucking corpse?'" },
  { text: "He'd sit up, the mattress moaning under his weight" },
  { text: "and look you in the eyes." },
];

export const station2 = [
  // 2. taken down from the cross
  { text: "He'd shake his head and slowly stand up," },
  { text: "straighten the shirt" },
  { text: "- or attempt to, there's no time to look for the iron." },
  { text: "He'd go to the living room" },
  { text: "no, he'd first make it for the kitchen." },
  { text: "A quick espresso from the fancy capsule machine" },
  { text: "he was probably given by a relative." },
  { text: "Now he's really awake." },
  { text: "Now the only thing between him" },
  { text: "and the task at hand" },
  { text: "is a smoke in the driveway" },
  { text: "he likes American Spirit" },
  { text: "the blue ones" },
  { text: "(he sometimes throws the packet out the window" },
  { text: "and it lands on the asphalt)." },
  { text: "We all have our vices." },
  { text: "He slams the truck door shut." },
  { text: "The ignition roars." },
];

export const station3 = [
  // 3. dies on the cross
  { text: "The roaring stops" },
  { text: "but the truck doesn't move." },
  { text: "Gustavo stares ahead through the windshield." },
  { text: "It looks as if he suddenly realised something." },
  { text: "Something inevitable." },
  { text: "He looks up to the sky" },
  { text: "and though all he sees is the dusty roof" },
  { text: "he pierces it with his eyes" },
  { text: "The heavens are somewhere up there" },
  { text: "He says nothing," },
  { text: "but you and I both know" },
  { text: "He's asking WHY?" },
];

export const station4 = [
  // 4. nailed to the cross
  { text: "He shifts into reverse," },
  { text: "feels the transmission move underneath," },
  { text: "looks at the back seats" },
  { text: "to make sure his tools are there:" },
  { text: "a dusty notebook, two pencils," },
  { text: "a map of Tarapacá" },
  { text: "and a beaten-up yellow device" },
  { text: "with a screen, some buttons" },
  { text: "and a gauge." },
  { text: "He puts on his baseball cap" },
  { text: "- it hass the NASA logo on it." },
  { text: "Perhaps he got it from Amazon" },
  { text: "for his own birthday." },
  { text: "The seatbelt wraps around his body" },
  { text: "like a serpent about to utter some tempting words" },
  { text: "The tongue slides, effortless and final" },
  { text: "into the buckle." },
  { text: "The click could dramatically echo" },
  { text: "but it doesn't - this isn't a 90s thriller." },
  { text: "This is an internet game." },
];

export const station5 = [
  // 5. division of the robes
  { text: "He follows the gently curving road" },
  { text: "towards La Tirana" },
  { text: "That probably makes him think of his mother," },
  { text: "so he pulls out his phone" },
  { text: "and starts a voice note." },
  { text: "This time, he really lets it all out." },
  { text: "It feels so good that when he's done" },
  { text: "he fires up another one to his brothers" },
  { text: "grandad" },
  { text: "auntie" },
  { text: "finally, he does one for the whole family chat." },
  { text: "If his journey was to be a secret" },
  { text: "it certainly isn't anymore." },
  { text: "Now there's no going back." },
];

export const station6 = [
  // 6. fails the 3rd time
  { text: "'Conchetumadre'" },
  { text: "he mumbles into his palms." },
  { text: "The truck has stalled" },
  { text: "rolled onto the dirt" },
  { text: "and ground to a halt." },
  { text: "He gets up, throws his tools into a backpack" },
  { text: "and crosses the road near the bus stop" },
  { text: "A bird of prey flies out of a nearby tree" },
  { text: "and a gust of wind howls past." },
];

export const station7 = [
  // 7. meets the women
  { text: "He takes the pedestrian path" },
  { text: "they've only built it recently" },
  { text: "he still remembers when they walked" },
  { text: "ten kilometres in a single file" },
  { text: "along the main road" },
  { text: "cars whizzing past at illegal speeds" },
  { text: "every year" },
  { text: "on the way to the big Fiesta." },
  { text: "He meets a group of mothers pushing buggies" },
  { text: "they look at him" },
  { text: "and note he's underdressed for the night." },
  { text: "He frowns and yells back" },
  { text: "They should look after their own kids" },
  { text: "not him, a grown-ass man." },
];
