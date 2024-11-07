import { enableJaywalk } from '../interactions/jaywalk-button.js';
import { journalMoment } from '../journal/index.js';
import { removeTask, setTask } from '../task.js';
import { flashStatus, showHelpMessage } from './utils.js';

export const intro = [
  {
    duration: 10,
  },
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano2.play();
      journalMoment('🚌', "Got off the bus in the town of La Tirana");
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { duration: 5 },
  { text: "There you are!" },
  { text: "I'm glad you made it. Was the journey alright?" },
  { text: "A truck just drove past, to the main square." },
  { text: "Empty Coca-Cola cans falling out the trunk." },
  { text: "Follow them to find the square, in front of the large white church." },
  { text: "I'll tell you everything there." },
  { callback: () => setTask('Find the plaza in front of the church in La Tirana.') },
];

export const station1 = [
  // 1. laid in his tomb
  {
    text: "This is it -",
    callback: (context) => {
      removeTask();
      context.soundscape.set(context.soundscape.town2);
      context.score.viaCrucis1.preload = 'auto';
    },
  },
  { text: "- they call it the 'Church of the Sanctuary'." },
  {
    callback: () => journalMoment('⛪', "Found the church in La Tirana"),
  },
  { text: "I think I'm ready to tell you what I've seen." },
  { duration: 5, callback: (context) => context.score.viaCrucis1.play() },
  { text: "Picture Gustavo laying in his bed," },
  { text: "his best shirt creased at the elbows" },
  { text: "his black trousers outlining his bones" },
  { text: "his eyes shut, chest gently rising, and falling again." },
  { text: "You'd almost want to put a bouquet in his hands, so he can smell the flowers." },
  { text: "That's not a good idea" },
  { text: "- he'd probably wake up and get mad at you." },
  { text: "«What do you think I am?»" },
  { text: "«A fucking corpse?»" },
  { text: "He'd sit up, the mattress moaning under his weight," },
  { text: "and look you in the eyes." },
  { duration: 4 },
  { text: "This place is only the beginning." },
  { text: "We can move to the next station..." },
  { text: "See that street at the back of the church?" },
  { text: "It's called Eleuterio Ramírez." },
  { text: "Let's go that way and turn right." },
  { text: "Then just follow the coke!" },
  { callback: () => setTask('Turn right behind the church and follow Eleuterio Ramírez') },
];

export const mainRoad = [
  { text: "It's nice to see you again." },
  { text: "See that cross to the north?" },
  {
    text: "The next station is just a little further past it.",
    callback: () => {
      setTask('Continue to the next station');
      context.score.viaCrucis3.preload = 'auto';
    },
  },
];

export const station2 = [
  // 2. taken down from the cross
  { duration: 2, callback: (context) => context.score.viaCrucis3.play() },
  { text: "He'd shake his head and slowly stand up, straighten his shirt" },
  { text: "- or attempt to, there's no time to look for the iron." },
  { text: "He'd go to the living room" },
  { text: "- no, he'd first make it for the kitchen." },
  { text: "A quick espresso from the fancy capsule machine he was probably given by a relative." },
  { text: "Now he's really awake." },
  { text: "Now the only thing between him and the task at hand is a smoke in the driveway." },
  { text: "He likes American Spirit (the blue ones)." },
  { text: "He sometimes throws the packet out the window and it lands on the asphalt." },
  { text: "We all have our vices." },
  { text: "He slams the truck door shut." },
  { text: "The ignition roars." },
  { duration: 3 },
  { text: "Let's keep going northwest, and out of this town." },
  {
    callback: () => {
      context.score.viaCrucis2.preload = 'auto';
      journalMoment('✝️', "Found another Station of the Cross");
    },
  }
];

export const station3 = [
  // 3. dies on the cross
  {
    text: "The roaring stops, but the truck doesn't move.",
    callback: (context) => context.score.viaCrucis2.play(),
  },
  { text: "Gustavo stares ahead through the windshield." },
  { text: "It looks as if he suddenly realised something - something inevitable." },
  { text: "He looks up to the sky, and though all he sees is the dusty roof," },
  { text: "he pierces it with his eyes." },
  { text: "The heavens are somewhere up there." },
  { text: "He says nothing, but you and I both know" },
  {
    text: "He's asking «Why?»",
    duration: 6,
  },
];

export const station4 = [
  // 4. nailed to the cross
  {
    text: "He shifts into reverse, feels the transmission move underneath.",
    callback: (context) => {
      context.score.viaCrucis5.preload = 'auto';
    },
  },
  { text: "Looks at the back seats to make sure his tools are there:" },
  { text: "a dusty notebook, two pencils, a map of Tarapacá" },
  { text: "and a beaten-up yellow device with a screen, some buttons and a gauge." },
  { text: "He puts on his baseball cap - it has the NASA logo on it." },
  { text: "Perhaps he got it from Amazon for his own birthday." },
  { text: "The seatbelt wraps around his body." },
  { text: "The tongue slides, effortless and final, into the buckle." },
  { text: "The click could dramatically echo, but it doesn't." },
  { text: "This isn't a 90s thriller," },
  { text: "This is a game on the Internet." },
  { callback: (context) => context.score.viaCrucis5.play() }
];

export const station5 = [
  // 5. division of the robes
  {
    text: "He follows the long, straight road out of La Tirana.",
    callback: (context) => {
      context.score.viaCrucis6.preload = 'auto';
    },
  },
  { text: "That probably makes him think of his mother," },
  { text: "so he pulls out his phone and starts a voice note." },
  { text: "This time, he really lets it all out." },
  { text: "It feels so good that, when he's done," },
  { text: "he fires up another one to his brothers," },
  { text: "grandad," },
  { text: "auntie." },
  { text: "Finally, he does one for the whole family chat." },
  { duration: 1, callback: (context) => context.score.viaCrucis6.play() },
  { text: "If his journey was to be a secret, it certainly isn't anymore." },
  { text: "Now there's no going back." },
  { duration: 7 },
  {
    text: "I hope this pilgrimage isn't boring you - it's still quite a long way.",
  },
  {
    callback: () => journalMoment('🚗', "Found a truck by the side of the road"),
  },
];

export const station6 = [
  // 6. fails the 3rd time
  {
    text: "«Conchetumadre», he mumbles into his palms.",
    callback: (context) => context.score.viaCrucis5.play()
  },
  { text: "The truck has stalled, rolled onto the dirt, and ground to a halt." },
  { text: "He gets up, throws his tools into a backpack" },
  { text: "and crosses the road near the bus stop" },
  { text: "A bird of prey flies out of a nearby tree" },
  {
    text: "and a gust of wind howls past.",
    callback: (context) => {
      context.score.viaCrucis7.preload = 'auto';
    },
  },
];

export const station7 = [
  // 7. meets the women of Jerusalem
  { text: "He takes the pedestrian path." },
  { text: "They've only built it recently.", callback: (context) => context.score.viaCrucis7.play() },
  { text: "He still remembers when they walked ten kilometres in a single file along the main road" },
  { text: "- cars whizzing past at illegal speeds -" },
  { text: "every year on the way to the big Fiesta." },
  { text: "He meets a group of mothers pushing buggies." },
  { text: "They look at him, and note he's underdressed for the night." },
  { text: "He frowns and yells back." },
  { text: "They should look after their own kids." },
  { text: "Not him, a grown-ass man." },
  { duration: 5 },
  { text: "We're halfway there." },
];

// 8. He falls for the second time
export const station8 = [
  { text: "He keeps walking." },
  {
    text: "Suddenly, something among the trees catches his eye and he runs off the path.",
    callback: (context) => context.score.viaCrucis5.play(),
  },
  { text: "The ground crunches under his feet as he sprints northwards." },
  { text: "He leaps over a pile of gravel, but as he lands, his feet sink too deep," },
  { text: "he loses balance and collapses onto the rough terrain." },
];

// 9. Veronica wipes his face
export const station9 = [
  { text: "He lies there for a while, looking up, face covered in dust." },
  { text: "He stares at the violent blue sky, fading into a yellowish white towards the horizon." },
  { text: "The sun begins to burn his scalp and the scratches on his knees start stinging." },
  { text: "Suddenly, he can see images in the heavens." },
  { text: "Faint outlines, lines of text, like technical diagrams." },
  { text: "They pulsate and reconfigure, till traces of a woman's gentle face form out of the azure." },
  { callback: (context) => context.score.viaCrucis3.play() },
  { text: "He knows that face." },
  { text: "Perhaps it was the Lady of Mount Carmel herself," },
  { text: "or loving Pachamama, who arrived to his aid." },
  { text: "She reaches out to him." },
  { text: "He feels her porcelain touch, as she wipes his face clean." },
];

// 10. Simon of Cyrene helps him carry the Cross
export const station10 = [
  { text: "A new spur of energy flows through his limbs as though another being moved them." },
  { text: "He rises effortlessly and returns to the pilgrims' path." },
  { text: "As he walks, he keeps turning his head" },
  { text: "looking back, looking to the sides, as if he felt some other presence." },
  { duration: 1, callback: (context) => context.score.viaCrucis7.play() },
  { text: "There are people in the desert whom he cannot see," },
  { text: "and yet they are present." },
  { text: "Some are ancient spirits, some are souls of recent past," },
  { text: "circling around their little shrines on the roadside," },
  { text: "and some are present NOW, in ways he cannot quite comprehend." },
];

// 11. He meets his mother
export const station11 = [
  { text: "His pace is now nervous and irregular." },
  { text: "His mother calls." },
  {
    text: "He stares at the phone in doubt, then picks up and continues to walk.",
    callback: (context) => context.score.viaCrucis7.play(),
  },
  { text: "He talks quietly, I cannot quite make out what he's saying, but his voice is forceful and angry." },
];

// 12. He falls the first time
export const station12 = [
  { text: "He's still on the phone, wildly gesturing." },
  { text: "He trips on a rock laying on the asphalt, almost falls, and mumbles a string of curses." },
  { text: "In his agitation, he does not notice the yellow device slip out of the half-open backpack." },
  {
    text: "«I am hanging up now», he yells, and presses on.",
  },
  {
    callback: () => journalMoment('📟', "Found Gustavo's lost device"),
  },
  { duration: 3 },
  { text: "You should probably pick up that device if you haven't already." },
  { text: "", callback: showHelpMessage("Click on the device to pick it up.") },
];

export const geigerCounterReply = [
  { text: "Oh, it's a Geiger counter!" },
];

// 13. He takes up his Cross
export const station13 = [
  {
    text: "He can already hear the traffic on the Panamericana",
    callback: (context) => {
      context.score.viaCrucis4.preload = 'auto';
    },
  },
  { text: "the coastal mountain range towers over him." },
  { text: "He stops and takes a deep breath, tightens the straps on his backpack," },
  { text: "looks up at the sky one more time and sets off again." },
  { text: "The journey is nearing its end." },
  { callback: (context) => context.score.viaCrucis4.play() },
];

// 14. He is condemned to death
export const station14 = [
  {
    text: "And that's it. That's where the pilgrimage ends.",
  },
  {
    callback: () => journalMoment('✝️', "Visited all the Stations of the Cross"),
  },
  { text: "I watched him carefully cross the many lanes of the highway intersection" },
  { text: "and follow the dirt road on the other side." },
  { text: "This is as far as I can go with you, but I am beyond certain" },
  { text: "if you follow that path, you will find him." },
  {
    text: "When in doubt, just follow the path.",
    callback: () => setTask('Walk across the highway'),
  },
  { text: "Other guides might show up." },
];

export const outro = [
  { text: "Are you ready to cross to the other side?" },
  {
    callback: (context) => {
      enableJaywalk(context, { lat: -20.32047, lng: -69.75582 });
      context.score.bachPiano3.preload = 'auto';
    },
  },
]
