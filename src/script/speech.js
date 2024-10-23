import slug from 'slug';

import { sleep } from '../utils.js';

const PAUSE_MS = 1000;

const loadFromSpeechServer = async (context, text) => {
  const response = await fetch('http://localhost:3000/speech', { method: 'post', body: text });
  const buffer = await context.audioContext.decodeAudioData(await response.arrayBuffer());
  const source = new AudioBufferSourceNode(context.audioContext, { buffer });
  source.connect(context.speechGain);
  source.start();

  return source;
};

const loadFromCDN = async (context, text) => {
  const fileName = `${slug(text)}.mp3`;
  const mediaElement = new Audio(`/assets/audio/speech/${fileName}`);
  const source = new MediaElementAudioSourceNode(context.audioContext, { mediaElement });
  source.connect(context.speechGain);
  mediaElement.play();

  return mediaElement;
}

export const playSpeech = (context, text, maxDuration) => new Promise(async (resolve) => {
  let source;
  let timeout;

  const next = async () => {
    await sleep(PAUSE_MS);
    clearTimeout(timeout);
    resolve();
  };

  timeout = setTimeout(() => {
    source.removeEventListener('ended', next);
  }, maxDuration);

  if (process.env.NODE_ENV === 'dev') {
    source = await loadFromSpeechServer(context, text);
  } else {
    source = await loadFromCDN(context, text);
  }

  source.addEventListener('ended', next);
});
