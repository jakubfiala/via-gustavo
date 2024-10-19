const FOOTSTEPS_URL = '/assets/audio/footsteps.mp3';
const FOOTSTEPS_GRAVEL_URL = '/assets/audio/footsteps-gravel.mp3';
const CHEWING_URL = '/assets/audio/chewing.mp3';
const BACKPACK_URL = '/assets/audio/backpack.mp3';

const getBuffer = async (audioContext, url) => {
  const response = await fetch(url);
  return audioContext.decodeAudioData(await response.arrayBuffer());
};

const getNodes = async (context, url) => {
  const source = new AudioBufferSourceNode(context.audioContext, { buffer: await getBuffer(context.audioContext, url) });
  const gain = new GainNode(context.audioContext, { gain: 0 });

  source.connect(gain).connect(context.sfxGain);
  source.loop = true;
  source.start();

  return { source, gain };
};

const playSFX = async (context, nodes, dur = 0, ramp = 0.05) => {
  const duration = dur || nodes.source.buffer.duration;
  nodes.gain.gain.cancelScheduledValues(context.audioContext.currentTime);
  nodes.gain.gain.setValueAtTime(0, context.audioContext.currentTime);
  nodes.gain.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + ramp);
  nodes.gain.gain.setValueAtTime(1, context.audioContext.currentTime + duration);
  nodes.gain.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + duration + ramp);
};

export default async (context) => {
  context.sfxGain = new GainNode(context.audioContext, { gain: 0 });
  context.sfxGain.connect(context.masterGain);

  const footstepsNormal = await getNodes(context, FOOTSTEPS_URL);
  const footstepsGravel = await getNodes(context, FOOTSTEPS_GRAVEL_URL);
  const chewing = await getNodes(context, CHEWING_URL);
  const backpack = await getNodes(context, BACKPACK_URL);

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
  };
};


