import { LOCALSTORAGE_SOUNDSCAPE_KEY } from '../constants.js';

const SOUNDSCAPE_FADE_DURATION_S = 10;
const FADE_OUT_OFFSET = SOUNDSCAPE_FADE_DURATION_S / 4;

const createSoundscape = (context, src, name, volume = 1) => {
  const mediaElement = new Audio();
  mediaElement.loop = true;
  mediaElement.preload = 'none';
  mediaElement.src = src;
  mediaElement.volume = volume;

  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  const gainNode = new GainNode(context.audioContext, { gain: 0 });

  node.connect(gainNode).connect(context.soundscapeGain);

  mediaElement.addEventListener('pause', () => console.info('[soundscapes]', 'pausing', mediaElement));

  return {
    name,
    mediaElement,
    fadeOut() {
      console.info('[soundscapes]', 'fading out', mediaElement);
      gainNode.gain.setValueAtTime(1, context.audioContext.currentTime + FADE_OUT_OFFSET);
      gainNode.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + + FADE_OUT_OFFSET + SOUNDSCAPE_FADE_DURATION_S);
      setTimeout(() => mediaElement.pause(), SOUNDSCAPE_FADE_DURATION_S * 1000);
    },
    fadeIn() {
      console.info('[soundscapes]', 'fading in', mediaElement);
      mediaElement.play();
      gainNode.gain.value = 0;
      gainNode.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + SOUNDSCAPE_FADE_DURATION_S);
    }
  };
};

export const clear = () => localStorage.removeItem(LOCALSTORAGE_SOUNDSCAPE_KEY);

export default (context) => {
  context.soundscapeGain = new GainNode(context.audioContext, { gain: 0 });
  context.soundscapeGain.connect(context.masterGain);

  let currentSoundscape = null;

  const controller = {
    base: createSoundscape(context, 'assets/audio/soundscapes/desert-base.mp3', 'base'),
    plane: createSoundscape(context, 'assets/audio/soundscapes/desert-plane.mp3', 'plane'),
    trees: createSoundscape(context, 'assets/audio/soundscapes/trees.mp3', 'trees'),
    town: createSoundscape(context, 'assets/audio/soundscapes/town.mp3', 'town'),
    town2: createSoundscape(context, 'assets/audio/soundscapes/town2.mp3', 'town2'),
    town3: createSoundscape(context, 'assets/audio/soundscapes/town3.mp3', 'town3'),
    town4: createSoundscape(context, 'assets/audio/soundscapes/town4.mp3', 'town4'),
    town5: createSoundscape(context, 'assets/audio/soundscapes/town5.mp3', 'town5'),
    townBigRoad: createSoundscape(context, 'assets/audio/soundscapes/town-big-road.mp3', 'townBigRoad', 0.7),
    birdsWind: createSoundscape(context, 'assets/audio/soundscapes/birds_wind.mp3', 'birdsWind'),
    highwayFront: createSoundscape(context, 'assets/audio/soundscapes/desert-highway-front.mp3', 'highwayFront', 0.7),
    highwayRight: createSoundscape(context, 'assets/audio/soundscapes/highway-right.mp3', 'highwayRight'),
    set(soundscape) {
      if (soundscape === currentSoundscape) {
        return;
      }

      if (currentSoundscape) {
        currentSoundscape.fadeOut();
      }

      currentSoundscape = soundscape;
      currentSoundscape.fadeIn();
      localStorage.setItem(LOCALSTORAGE_SOUNDSCAPE_KEY, soundscape.name);
    }
  };


  const initial = localStorage.getItem(LOCALSTORAGE_SOUNDSCAPE_KEY) || 'base';
  console.info('[soundscape]', 'initialising to', controller[initial]);
  controller.set(controller[initial]);

  return controller;
};
