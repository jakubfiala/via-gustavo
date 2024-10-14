const SOUNDSCAPE_FADE_DURATION_S = 10;
const FADE_OUT_OFFSET = SOUNDSCAPE_FADE_DURATION_S / 4;

const createSoundscape = (context, src, loop) => {
  const mediaElement = new Audio();
  mediaElement.loop = loop;
  mediaElement.preload = 'none';
  mediaElement.src = src;


  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  const gainNode = new GainNode(context.audioContext, { gain: 0 });

  node.connect(gainNode).connect(context.soundscapeGain);

  mediaElement.addEventListener('pause', () => console.info('[soundscapes]', 'pausing', mediaElement));

  return {
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

export default (context) => {
  context.soundscapeGain = new GainNode(context.audioContext, { gain: 0 });
  context.soundscapeGain.connect(context.masterGain);

  return {
    base: createSoundscape(context, 'assets/audio/soundscapes/desert-base.mp3', true),
    plane: createSoundscape(context, 'assets/audio/soundscapes/desert-plane.mp3', true),
    set(soundscape) {
      context.currentSoundscape?.fadeOut();
      context.currentSoundscape = soundscape;
      context.currentSoundscape.fadeIn();
    }
  };
};
