import { flashStatus } from './utils.js';

export const intro = [
  {
    text: "",
    callback: (context) => {
      context.score.bachPiano2.play();
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
    }
  },
  { text: "There you are!" },
  { text: "I'm glad you made it." },
  { text: "Was the journey alright?" },
  { text: "There is a large white church" },
  { text: "in the town, across the roundabout," },
  { text: "then directly straight ahead." },
  { text: "Meet me in front of the church and I'll tell you everything." },
];

export const station1 = [
  // 1. laid in his tomb
  {
    text: "This is it -",
    callback: (context) => context.soundscape.set(context.soundscape.town2),
  },
  { text: "- they call it the 'Church of the Sanctuary'." },
  { text: "I... I think I'm ready to tell you what I've seen.", duration: 5 },
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
  { duration: 4 },
  { text: "This place is only the beginning" },
  { text: "we can move to the next station...", duration: 5 },
  { text: "See that street at the back of the church?" },
  { text: "It's called Eleuterio Ramírez." },
  { text: "Let's go that way, turn to the right," },
  { text: "and walk down westwards." },
];

export const mainRoad = [
  { text: "It's nice to see you again." },
  { text: "See that cross to the north?" },
  { text: "The next station is just a little further past it." },
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
  { duration: 4 },
  { text: "Let's keep going northwest" },
  { text: "and out of this town." },
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
  { text: "- it has the NASA logo on it." },
  { text: "Perhaps he got it from Amazon" },
  { text: "for his own birthday." },
  { text: "The seatbelt wraps around his body" },
  { text: "like a serpent about to utter some tempting words" },
  { text: "The tongue slides, effortless and final" },
  { text: "into the buckle." },
  { text: "The click could dramatically echo" },
  { text: "but it doesn't - this isn't a 90s thriller." },
  { text: "This is a game on the Internet." },
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
  { text: "grandad", duration: 2 },
  { text: "auntie", duration: 2 },
  { text: "finally, he does one for the whole family chat." },
  { text: "If his journey was to be a secret" },
  { text: "it certainly isn't anymore." },
  { text: "Now there's no going back." },
  { duration: 7 },
  { text: "I hope this pilgrimage isn't boring you" },
  { text: "it's still quite a long way." },
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
  // 7. meets the women of Jerusalem
  { text: "He takes the pedestrian path" },
  { text: "they've only built it recently" },
  { text: "he still remembers when they walked" },
  { text: "ten kilometres in a single file" },
  { text: "along the main road" },
  { text: "cars whizzing past at illegal speeds" },
  { text: "every year on the way to the big Fiesta." },
  { text: "He meets a group of mothers pushing buggies" },
  { text: "they look at him" },
  { text: "and note he's underdressed for the night." },
  { text: "He frowns and yells back" },
  { text: "They should look after their own kids" },
  { text: "not him, a grown-ass man." },
  { duration: 5 },
  { text: "We're halfway there." },
];

// 8. He falls for the second time
export const station8 = [
  { text: "He keeps walking." },
  { text: "Suddenly, something among the trees catches his eye" },
  { text: "and he runs off the path." },
  { text: "The ground crunches under his feet as he sprints northwards." },
  { text: "He leaps over a pile of gravel" },
  { text: "but as he lands, his feet sink too deep" },
  { text: "he loses balance" },
  { text: "and collapses onto the rough terrain." },
];

// 9. Veronica wipes his face
export const station9 = [
  { text: "He lies there for a while" },
  { text: "looking up, face covered in dust." },
  { text: "He stares at the violent blue sky," },
  { text: "fading into a yellowish white towards the horizon." },
  { text: "The sun begins to burn his scalp" },
  { text: "and the scratches of his knees start stinging." },
  { text: "Suddenly, it seems to him" },
  { text: "a glowing ring has formed above him" },
  { text: "pulsating and growing" },
  { text: "traces of a gentle face form out of the azure" },
  { text: "he knows that face" },
  { text: "Indeed, it seems the Lady of Mount Carmel herself," },
  { text: "the loving Pachamama," },
  { text: "has arrived to his aid." },
  { text: "She reaches out to him" },
  { text: "he feels her porcelain touch" },
  { text: "as she wipes his face clean." },
];

// 10. Simon of Cyrene helps him carry the Cross
export const station10 = [
  { text: "A new spur of energy flows through his limbs" },
  { text: "as though another being moved them." },
  { text: "He rises effortlessly" },
  { text: "and returns to the pilgrims' path." },
  { text: "As he walks, he keeps turning his head" },
  { text: "looking back, looking to the sides" },
  { text: "as if he felt some other presence." },
  { text: "There are people in the desert" },
  { text: "who he cannot see", duration: 3 },
  { text: "and yet they are present." },
  { text: "Some are ancient spirits" },
  { text: "some are souls of recent past" },
  { text: "circling around their little places on the roadside" },
  { text: "and some are present NOW," },
  { text: "in ways he cannot quite comprehend." },
  { text: "Whatever they are, they are all here to help" },
  { text: "carry his burden." },
];

// 11. He meets his mother
export const station11 = [
  { text: "His pace is now nervous and irregular" },
  { text: "His mother calls." },
  { text: "He stares at the phone in doubt" },
  { text: "then picks up and continues to walk." },
  { text: "He talks quietly, I cannot quite make out what he's saying" },
  { text: "but his voice is forceful and full of anger." },
];

// 12. He falls the first time
export const station12 = [
  { text: "He's still on the phone, wildly gesturing" },
  { text: "He trips on a rock laying on the asphalt, almost falls" },
  { text: "and mumbles a string of curses." },
  { text: "In his agitation, he does not notice the yellow device" },
  { text: "slip out of the half-open backpack." },
  { text: "'I am hanging up now', he yells" },
  { text: "and presses on." },
];

// 13. He takes up his Cross
export const station13 = [
  { text: "He can already hear the traffic on the Panamericana" },
  { text: "the coastal mountain range towers over him." },
  { text: "He stops and takes a deep breath" },
  { text: "tightens the straps on his backpack" },
  { text: "looks up at the sky one more time" },
  { text: "and sets off again." },
  { text: "The journey is nearing its end." },
];

// 14. He is condemned to death
export const station14 = [
  { text: "And that's it" },
  { text: "That's where the pilgrimage ends." },
  { text: "I watched him carefully cross the many lanes of the highway intersection" },
  { text: "and follow the dirt road on the other side" },
  { text: "This is as far as I can go with you" },
  { text: "but I am beyond certain" },
  { text: "if you follow that path" },
  { text: "you will find him." },
  { text: "Other guides might show up." },
  { text: "Are you ready to cross the road?" },
];
