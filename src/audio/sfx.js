const FOOTSTEPS_URL = '/assets/audio/footsteps.mp3';

const getFootstepsBuffer = async (audioContext) => {
  const response = await fetch(FOOTSTEPS_URL);
  return audioContext.decodeAudioData(await response.arrayBuffer());
};

const getFootstepsNode = async (context) => {
  const node = new AudioBufferSourceNode(context.audioContext, { buffer: await getFootstepsBuffer(context.audioContext) });
  const gain = new GainNode(context.audioContext, { gain: 0 });

  node.connect(gain).connect(context.sfxGain);
  node.loop = true;
  node.start();

  return gain;
};

const playSFX = async (context, node, duration, ramp = 0.05) => {
  node.gain.cancelScheduledValues(context.audioContext.currentTime);
  node.gain.setValueAtTime(0, context.audioContext.currentTime);
  node.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + ramp);
  node.gain.setValueAtTime(1, context.audioContext.currentTime + duration);
  node.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + duration + ramp);
};

export default async (context) => {
  context.sfxGain = new GainNode(context.audioContext, { gain: 0 });
  context.sfxGain.connect(context.masterGain);

  const footsteps = await getFootstepsNode(context);

  return {
    footsteps: () => playSFX(context, footsteps, 2),
  };
};


