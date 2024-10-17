const createScorePart = (context, src, loop = false, volume = 1) => {
  const mediaElement = new Audio();
  mediaElement.loop = loop;
  mediaElement.preload = 'none';
  mediaElement.src = src;
  mediaElement.volume = volume;

  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  node.connect(context.scoreGain);

  return mediaElement;
};

export default (context) => {
  context.scoreGain = new GainNode(context.audioContext, { gain: 1 });
  context.scoreGain.connect(context.masterGain);

  return {
    bachPiano: createScorePart(context, 'assets/audio/score/bach-piano-short.mp3'),
    bachPiano2: createScorePart(context, 'assets/audio/score/bach-piano-2.mp3'),
    bachPiano3: createScorePart(context, 'assets/audio/score/bach-piano-3.mp3'),
    viaCrucis1: createScorePart(context, 'assets/audio/score/via-crucis-1.mp3', false, 0.45),
    viaCrucis2: createScorePart(context, 'assets/audio/score/via-crucis-2.mp3', false, 0.45),
    viaCrucis3: createScorePart(context, 'assets/audio/score/via-crucis-3.mp3', false, 0.45),
    viaCrucis4: createScorePart(context, 'assets/audio/score/via-crucis-4.mp3', false, 0.45),
    veniceShort: createScorePart(context, 'assets/audio/score/venice-short.mp3', false, 0.45),
    veniceMedium: createScorePart(context, 'assets/audio/score/venice-medium.mp3', false, 0.45),
    veniceLong: createScorePart(context, 'assets/audio/score/venice-long.mp3', false, 0.45),
  };
};
