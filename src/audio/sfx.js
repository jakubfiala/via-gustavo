const FOOTSTEPS_URL = '/assets/audio/footsteps.mp3';
const FOOTSTEPS_GRAVEL_URL = '/assets/audio/footsteps-gravel.mp3';
const CHEWING_URL = '/assets/audio/chewing.mp3';
const BACKPACK_URL = '/assets/audio/backpack.mp3';
const DRONE_FLYBY_URL = '/assets/audio/drone-flyby.mp3';
const EXPLOSION_URL = '/assets/audio/explosion.mp3';
const BUS_URL = 'assets/audio/bus.mp3';

const getBuffer = async (audioContext, url) => {
  const response = await fetch(url);
  return audioContext.decodeAudioData(await response.arrayBuffer());
};

const getNodes = async (context, url, oneoff = false) => {
  const source = new AudioBufferSourceNode(context.audioContext, { buffer: await getBuffer(context.audioContext, url) });
  const gain = new GainNode(context.audioContext, { gain: 0 });

  source.connect(gain).connect(context.sfxGain);
  source.loop = !oneoff;
  if (!oneoff) {
    source.start();
  }

  return { source, gain, oneoff };
};

const playSFX = async (context, sound, dur = 0, ramp = 0.05) => {
  sound.gain.gain.cancelScheduledValues(context.audioContext.currentTime);

  if (sound.oneoff) {
    sound.gain.gain.setValueAtTime(1, context.audioContext.currentTime);
    sound.source.start(0);
    return;
  }

  const duration = dur || sound.source.buffer.duration;
  sound.gain.gain.setValueAtTime(0, context.audioContext.currentTime);
  sound.gain.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + ramp);
  sound.gain.gain.setValueAtTime(1, context.audioContext.currentTime + duration);
  sound.gain.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + duration + ramp);
};

export default async (context) => {
  context.sfxGain = new GainNode(context.audioContext, { gain: 0 });
  context.sfxGain.connect(context.masterGain);

  const footstepsNormal = await getNodes(context, FOOTSTEPS_URL);
  const footstepsGravel = await getNodes(context, FOOTSTEPS_GRAVEL_URL);
  const chewing = await getNodes(context, CHEWING_URL);
  const backpack = await getNodes(context, BACKPACK_URL);
  const droneFlyBy = await getNodes(context, DRONE_FLYBY_URL, true);
  const explosion = await getNodes(context, EXPLOSION_URL, true);
  const bus = await getNodes(context, BUS_URL, true);

  return {
    footstepsSounds: {
      footstepsNormal,
      footstepsGravel,
    },
    currentFootsteps: footstepsNormal,
    footsteps() {
      playSFX(context, this.currentFootsteps, 2);
    },
    chewing: () => playSFX(context, chewing),
    backpack: () => playSFX(context, backpack),
    droneFlyBy: () => playSFX(context, droneFlyBy),
    explosion: () => playSFX(context, explosion),
    bus: () => playSFX(context, bus),
  };
};


