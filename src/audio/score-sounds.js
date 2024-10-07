const createScorePart = (context, src, loop) => {
  const mediaElement = new Audio(src);
  mediaElement.loop = loop;

  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  node.connect(context.scoreGain);

  return mediaElement;
};

export default (context) => {
  context.scoreGain = new GainNode(context.audioContext, { gain: 0 });
  context.scoreGain.connect(context.masterGain);

  return {
    background: createScorePart(context, 'assets/audio/crickets.mp3', true),
    bachPiano: createScorePart(context, 'assets/audio/bach-piano-short.mp3'),
  };
};
