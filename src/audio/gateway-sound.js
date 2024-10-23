const VOLUME = 0.3;
const FADE_IN_S = 6;
const FADE_OUT_S = 12;
export const FADE_OUT_DELAY_MS = 20000;
const OSC2_DELAY_MS = 8000;

export const playGatewaySound = ({ audioContext, masterGain }) => {
  const osc1 = new OscillatorNode(audioContext, { frequency: 432 });
  const gain1 = new GainNode(audioContext, { gain: 0 });
  const panner1 = new StereoPannerNode(audioContext, { pan: -1 });
  osc1.connect(gain1).connect(panner1).connect(masterGain);
  osc1.start();
  gain1.gain.linearRampToValueAtTime(VOLUME, audioContext.currentTime + FADE_IN_S);

  const osc2 = new OscillatorNode(audioContext, { frequency: 426 });
  const gain2 = new GainNode(audioContext, { gain: 0 });
  const panner2 = new StereoPannerNode(audioContext, { pan: 1 });
  osc2.connect(gain2).connect(panner2).connect(masterGain);
  osc2.start();
  setTimeout(() => {
    gain2.gain.linearRampToValueAtTime(VOLUME, audioContext.currentTime + FADE_IN_S);
  }, OSC2_DELAY_MS);

  setTimeout(() => {
    gain1.gain.setValueAtTime(VOLUME, audioContext.currentTime);
    gain1.gain.linearRampToValueAtTime(0, audioContext.currentTime + FADE_OUT_S);
    gain2.gain.setValueAtTime(VOLUME, audioContext.currentTime);
    gain2.gain.linearRampToValueAtTime(0, audioContext.currentTime + FADE_OUT_S);
  }, FADE_OUT_DELAY_MS);
};
