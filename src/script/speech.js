import slug from 'slug';
import { parseTarGzip } from 'nanotar';

import { sleep } from '../utils.js';

const ARCHIVE_URL = '/assets/audio/speech.tar.gz';
const PAUSE_MS = 750;
const WAIT_FOR_ARCHIVE_MS = 2000;

const loadFromSpeechServer = async (context, text) => {
  const response = await fetch('http://localhost:3000/speech', { method: 'post', body: text });
  const buffer = await context.audioContext.decodeAudioData(await response.arrayBuffer());
  const source = new AudioBufferSourceNode(context.audioContext, { buffer });
  source.playbackRate.value = context.speechPlaybackRate || 1;
  source.connect(context.speechGain);
  source.start();

  return source;
};

export const initSpeech = async (context) => {
  if (process.env.NODE_ENV !== 'dev') {
    console.info('[speech]', 'loadin speech parts archive', ARCHIVE_URL);
    const response = await fetch(ARCHIVE_URL);
    const buffer = await response.arrayBuffer();
    const extracted = await parseTarGzip(buffer);

    const entries = extracted.map(({ name, data }) => [
      // strip the file extension (even if truncated)
      name.replace(/\.[a-z0-9]+/, ''),
      data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
    ]);
    const parts = Object.fromEntries(entries);

    context.speech = { parts };
    console.info('[speech]', 'loaded speech parts archive', context.speech);
  }
};

const loadFromArchive = async (context, text) => {
  const key = slug(text)
    .slice(0, 99); // tar truncates file names to 99
  const buffer = await context.audioContext.decodeAudioData(context.speech.parts[key]);
  const source = new AudioBufferSourceNode(context.audioContext, { buffer });
  source.playbackRate.value = context.speechPlaybackRate || 1;
  source.connect(context.speechGain);
  source.start();

  return source;
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
    source?.removeEventListener('ended', next);
    resolve();
  }, maxDuration);

  if (process.env.NODE_ENV === 'dev') {
    source = await loadFromSpeechServer(context, text);
  } else {
    if (!context.speech) {
      // Wait a bit to see if the archive just needs more time to load.
      // We don't want to wait forever though, in case the request fails completely or something.
      await sleep(WAIT_FOR_ARCHIVE_MS);
    }

    source = await loadFromArchive(context, text);
  }

  source.addEventListener('ended', next);
});
