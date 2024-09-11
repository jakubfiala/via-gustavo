const DEFAULT_DURATION = 4;

const enableClickToGoCB = context => {
  context.map.setOptions({ clickToGo: true });
};

const flashStatus = (text, duration = 5) => context => {
  context.statusContainer.innerText = text;
  context.statusContainer.classList.add('fade-in');
  setTimeout(() => {
    context.statusContainer.innerText = '';
    context.statusContainer.classList.remove('fade-in');
  }, duration * 1000);
};

const showFakeCaptcha = (callback = () => {}) => context => {
  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = false;
  const listener = e => {
    callback(e, context);
    captcha.checkbox.removeEventListener('click', listener);
  };

  captcha.checkbox.addEventListener('click', listener);
}

const hideFakeCaptcha = context => {
  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = true;
}

const showSigil = name => context => {
  const sigil = document.getElementById(`sigil-${name}`);
  const sigilVideos = [...sigil.getElementsByTagName('video')];

  Promise.all(sigilVideos.map(v => v.play())).then(() => sigil.classList.remove('sigil--hidden'));
};

const hideSigil = name => context => {
  const sigil = document.getElementById(`sigil-${name}`);
  sigil.classList.add('sigil--hidden');
}

const hideAllSigils = (c) => (hideSigil("request")(c), hideSigil("response")(c), hideSigil("interface")(c));

const updateSoundTrackVolume = volume => context => {
  console.log('sound', volume);
  const { masterGain, audioContext } = context;
  masterGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 7);
}

const fadeInSoundTrack = updateSoundTrackVolume(1);
const fadeOutSoundTrack = updateSoundTrackVolume(0);

export const IntroScript = [
  { duration: 2 },
  { text: "Oh, it's you!" },
  { text: "I almost thought you wouldn't make it." },
  { duration: 1 },
  { text: "Many don't." },
  { text: "Anyways, here we are, and I suppose I should explain briefly.", time: 3, duration: 3 },
  { text: "I'm going to be your guide today." },
  { text: "Not that you really need one - what with all the tags, coordinates, entries and hyperlinks.", time: 3, duration: 3 },
  { text: "Look around, perhaps you'll notice them already." },
  { text: "Tiles delineated by glitches, smeared presences, the sky glimmering with copyright.", time: 3, duration: 3 },
  { duration: 2 },
  { text: "We're going to do a whole lot of looking today." },
  {
    text: "Looking, and walking.",
    callback: enableClickToGoCB
  },
  { text: "Indeed, you can walk here - " },
  { text: "Isn't that wonderful?" },
  { text: "You move your muscles, and the image around you changes:" },
  { text: "First smeared, then sharp again" },
  { text: "You might even hear the soundscape alter" },
  { text: "What is a world, if not a series of multisensory images" },
  { text: "presented to us as a function" },
  { text: "of latitude, longitude, heading and pitch." },
  { duration: 2 },
  { text: "Come, let's walk down this road together," },
  { text: "and I'll tell you about me." },
];

export const Checkpoint1IntroScript = [
  {
    text: "",
    duration: 5,
    callback: (context) => {
      flashStatus(`Chapter ${context.chapter.id} - ${context.chapter.title}`)(context);
      fadeOutSoundTrack(context);
    }
  },
  {
    text: "In this ephemeral world",
    time: 3,
    duration: 6
  },
  { text: "time is constrained", duration: 3 },
  { text: "by the two guardian sigils", time: 3, duration: 6 },
  { text: " - extrema of power;", duration: 3 },
  { text: "The Request", time: 5, duration: 10, callback: showSigil("request") },
  { text: "and The Response.", duration: 5, callback: showSigil("response") },
  { text: "The third sigil is a secret" },
  { text: "where true power lies." },
  {
    text: "We complete the triad by placing it in the middle,",
    time: 5,
    duration: 3
  },
  { text: "like a bridge:", duration: 2, callback: showSigil("interface") },
  { text: "The Interface.", duration: 5 },
  { text: "The first step in a journey is to ask for help - ", duration: 2 },
  { text: "recognize the state of your being,", duration: 2 },
  { text: "take Refuge in who you are", duration: 3 },
  { text: "and who you are not.", duration: 2 },
  { text: "",
    duration: 2,
    callback: showFakeCaptcha((e, context) => {
      setTimeout(() => {
        hideFakeCaptcha(context);
        scheduleScript(Checkpoint1EndScript, context);
      }, 3000);
    }) },
];

export const Checkpoint1EndScript = [
  { text: "The stars are aligned.", callback: hideAllSigils },
  { text: "There are points ahead of you - " },
  { text: "three ever-changing sites of learning." },
  { text: "Visit them in the correct order" },
  { text: "to obtain the Waking Words." },
  { text: "The journey, like most of this algorithmic world" },
  { text: "may be tedious and repetitive." },
  { text: "But fear not - for every moment of learning" },
  { text: "brings you closer to the truth.", callback: fadeInSoundTrack }
];

export const scheduleScript = (script, context) => {
  const { textDisplay } = context;
  let currentTime = 0;
  let timeouts = [];

  for (let line of script) {
    const duration = line.duration || DEFAULT_DURATION;
    const time = line.time || duration;

    const timeout = setTimeout(() => {
      if (line.text) {
        textDisplay.addLine(line.text, duration * 1000);
      }

      if (line.callback) {
        line.callback(context);
      }
    }, currentTime * 1000);

    currentTime += time;
    timeouts.push(timeout);
  }

  return {
    stop: () => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      textDisplay.clear();
    }
  };
};
