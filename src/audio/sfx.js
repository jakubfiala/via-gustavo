import { LOCALSTORAGE_FOOTSTEPS_KEY } from '../constants.js';

const getBuffer = async (audioContext, url) => {
  const response = await fetch(url);
  return audioContext.decodeAudioData(await response.arrayBuffer());
};

const getNodes = async (G, url, oneoff = false) => {
  const source = new AudioBufferSourceNode(G.audioContext, { buffer: await getBuffer(G.audioContext, url) });
  const gain = new GainNode(G.audioContext, { gain: 0 });

  source.connect(gain).connect(G.sfxGain);
  source.loop = !oneoff;
  if (!oneoff) {
    source.start();
  }

  return { source, gain, oneoff };
};

const createSFX = async (G, sound, dur = 0, ramp = 0.05) => () => {
  sound.gain.gain.cancelScheduledValues(G.audioContext.currentTime);

  if (sound.oneoff) {
    sound.gain.gain.setValueAtTime(1, G.audioContext.currentTime);
    sound.source.start(0);
    return sound.source;
  }

  const duration = dur || sound.source.buffer.duration;
  sound.gain.gain.setValueAtTime(0, G.audioContext.currentTime);
  sound.gain.gain.linearRampToValueAtTime(1, G.audioContext.currentTime + ramp);
  sound.gain.gain.setValueAtTime(1, G.audioContext.currentTime + duration);
  sound.gain.gain.linearRampToValueAtTime(0, G.audioContext.currentTime + duration + ramp);

  return sound.source;
};

export const clear = () => localStorage.removeItem(LOCALSTORAGE_FOOTSTEPS_KEY);

export default async (G) => {
  G.sfxGain = new GainNode(G.audioContext, { gain: 0 });
  G.sfxGain.connect(G.masterGain);

  const footstepsNormal = await getNodes(G, '/assets/audio/footsteps.mp3');
  const footstepsGravel = await getNodes(G, '/assets/audio/footsteps-gravel.mp3');
  const footstepsHall = await getNodes(G, 'assets/audio/footsteps-hall.mp3');
  const chewing = await getNodes(G, '/assets/audio/chewing.mp3');
  const backpack = await getNodes(G, '/assets/audio/backpack.mp3');
  const droneFlyBy = await getNodes(G, '/assets/audio/drone-flyby.mp3', true);
  const explosion = await getNodes(G, '/assets/audio/explosion.mp3', true);
  const bus = await getNodes(G, 'assets/audio/bus.mp3', true);
  const donatingWater = await getNodes(G, 'assets/audio/donating-water.mp3', true);
  const carApproach = await getNodes(G, 'assets/audio/car-approach.mp3', true);
  const carCrash = await getNodes(G, 'assets/audio/crash.mp3', true);

  const footstepsSounds = {
    normal: footstepsNormal,
    gravel: footstepsGravel,
    hall: footstepsHall,
    none: null,
  };

  let currentFootsteps = footstepsNormal;

  const controller = {
    setFootsteps(name) {
      console.info('[sfx]', 'setting footsteps sound to', name);
      currentFootsteps = footstepsSounds[name];
      localStorage.setItem(LOCALSTORAGE_FOOTSTEPS_KEY, name);
    },
    footsteps() {
      if (currentFootsteps) {
        createSFX(G, currentFootsteps, 2)();
      }
    },
    chewing: createSFX(G, chewing),
    backpack: createSFX(G, backpack),
    droneFlyBy: createSFX(G, droneFlyBy),
    explosion: createSFX(G, explosion),
    bus: createSFX(G, bus),
    donatingWater: createSFX(G, donatingWater),
    carApproach: createSFX(G, carApproach),
    carCrash: createSFX(G, carCrash),
  };

  controller.setFootsteps(localStorage.getItem(LOCALSTORAGE_FOOTSTEPS_KEY) || 'normal');

  return controller;
};


