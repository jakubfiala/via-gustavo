const createScorePart = (context, src, loop) => {
  const mediaElement = new Audio();
  mediaElement.loop = loop;
  mediaElement.preload = 'none';
  mediaElement.src = src;

  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  node.connect(context.scoreGain);

  return mediaElement;
};

export default (context) => {
  context.scoreGain = new GainNode(context.audioContext, { gain: 1 });
  context.scoreGain.connect(context.masterGain);

  return {
    bachPiano: createScorePart(context, 'assets/audio/bach-piano-short.mp3'),
    bachPiano2: createScorePart(context, 'assets/audio/bach-piano-2.mp3'),
    bachPiano3: createScorePart(context, 'assets/audio/bach-piano-3.mp3'),
  };
};
