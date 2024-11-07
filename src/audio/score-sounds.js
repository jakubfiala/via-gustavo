const createScorePart = (context, src, volume = 1, loop = false) => {
  const mediaElement = new Audio();
  mediaElement.preload = 'none';
  mediaElement.loop = loop;
  mediaElement.src = src;
  mediaElement.volume = volume;

  const node = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  node.connect(context.scoreGain);

  return mediaElement;
};

export const DEFAULT_SCORE_GAIN = 0.9;

export default (context) => {
  context.scoreGain = new GainNode(context.audioContext, { gain: DEFAULT_SCORE_GAIN });
  context.scoreGain.connect(context.masterGain);

  return {
    bachPiano: createScorePart(context, 'assets/audio/score/bach-piano-short.mp3'),
    bachPiano2: createScorePart(context, 'assets/audio/score/bach-piano-2.mp3'),
    bachPiano3: createScorePart(context, 'assets/audio/score/bach-piano-3.mp3'),
    bachPiano4: createScorePart(context, 'assets/audio/score/bach-piano-4-major.mp3', 0.6),
    bachPiano5: createScorePart(context, 'assets/audio/score/bach-piano-5-maj-min.mp3', 0.6),
    bachPiano6: createScorePart(context, 'assets/audio/score/bach-piano-6-high.mp3', 0.6),
    viaCrucis1: createScorePart(context, 'assets/audio/score/via-crucis-1.mp3', 0.4),
    viaCrucis2: createScorePart(context, 'assets/audio/score/via-crucis-2.mp3', 0.4),
    viaCrucis3: createScorePart(context, 'assets/audio/score/via-crucis-3.mp3', 0.4),
    viaCrucis4: createScorePart(context, 'assets/audio/score/via-crucis-4.mp3', 0.4),
    viaCrucis5: createScorePart(context, 'assets/audio/score/via-crucis-5.mp3', 0.4),
    viaCrucis6: createScorePart(context, 'assets/audio/score/via-crucis-6.mp3', 0.4),
    viaCrucis7: createScorePart(context, 'assets/audio/score/via-crucis-7.mp3', 0.4),
    veniceShort: createScorePart(context, 'assets/audio/score/venice-short.mp3', 0.4),
    veniceMedium: createScorePart(context, 'assets/audio/score/venice-medium.mp3', 0.4),
    veniceLong: createScorePart(context, 'assets/audio/score/venice-long.mp3', 0.4),
    dirtRoad1: createScorePart(context, 'assets/audio/score/dirt-road-1.mp3'),
    dirtRoad2: createScorePart(context, 'assets/audio/score/dirt-road-2.mp3'),
    dirtRoad3: createScorePart(context, 'assets/audio/score/dirt-road-3.mp3'),
    dirtRoad4: createScorePart(context, 'assets/audio/score/dirt-road-4.mp3'),
    circuito1: createScorePart(context, 'assets/audio/score/circuito-sketch-1.mp3', 0.4),
    circuito2: createScorePart(context, 'assets/audio/score/circuito-sketch-2.mp3', 0.4),
    circuito3: createScorePart(context, 'assets/audio/score/circuito-sketch-3.mp3', 0.3),
    circuito4: createScorePart(context, 'assets/audio/score/circuito-sketch-4.mp3', 0.4),
    circuito5: createScorePart(context, 'assets/audio/score/circuito-sketch-5.mp3', 0.4),
    circuitoFull: createScorePart(context, 'assets/audio/score/circuito-full.mp3', 0.4),
    lithiumLoop: createScorePart(context, 'assets/audio/score/lithium-loop.mp3', 0.4),
    lithiumChorus: createScorePart(context, 'assets/audio/score/lithium-chorus.mp3', 0.4),
    lobotomy: createScorePart(context, 'assets/audio/score/lobotomy.mp3', 0.55),
    finalTheme1: createScorePart(context, 'assets/audio/score/final-theme-1.mp3', 0.7),
    finalTheme3: createScorePart(context, 'assets/audio/score/final-theme-3.mp3', 0.7),
    lithiumAtmo: createScorePart(context, 'assets/audio/score/lithium-atmo.mp3', 0.5, true),
  };
};
