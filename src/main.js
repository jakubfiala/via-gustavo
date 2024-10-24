import { Loader as MapsAPILoader } from "@googlemaps/js-api-loader";
import { TextDisplay } from "./text.js";

import {
  scheduleScript,
} from "./script/index.js";
import { intro1 } from './script/intro.js';

import { Sharawadji } from "../sharawadji/src/index.js";
import { fakeCaptcha } from "./interactions/fakeCaptcha.js";
import initHUD, { setLatLngDisplay, setPovDisplay } from './hud/index.js';
import initSettings, { resetGame } from './settings.js';
import { LOCALSTORAGE_POSITION_KEY, START_POSITION, START_POV, MAPS_API_KEY } from './constants.js';
import loadItems from './items/index.js';
import { initChapters, completed as completedChapters } from './chapters.js';
import initGamepad from './gamepad.js';
import { initTask } from './task.js';
import { initSpeech } from './script/speech.js';
import { localisedSounds } from './audio/localised-sounds.js';
import { FADE_OUT_DELAY_MS, playGatewaySound } from './audio/gateway-sound.js';
import { enableClickToGoCB, enableSFX } from './script/utils.js';
import { checkForCheckpoints } from './checkpoints/index.js';
import createSFX from './audio/sfx.js';
import createScore from './audio/score-sounds.js';
import createSoundscape from './audio/soundscapes.js';

const container = document.getElementById("container");
const intro = document.getElementById("intro");
const introCTAFromScratch = document.getElementById("intro-cta-from-scratch");
const introCTAContinue = document.getElementById("intro-cta-continue");

const textContainer = document.getElementById("text-display");
const statusContainer = document.getElementById("status-display");
const helpContainer = document.getElementById("help-display");
const fakeCaptchas = Array.from(document.getElementsByClassName("fake-captcha")).map(c => fakeCaptcha(c));
const textDisplay = new TextDisplay(textContainer);

const scriptContext = {
  statusContainer,
  helpContainer,
  fakeCaptchas,
  textDisplay,
};

const currentURL = new URL(location.href);
const debug = currentURL.searchParams.get('debug') === 'true';
const dev = currentURL.searchParams.get('dev') === 'true';
document.body.classList.toggle('debug', debug);
document.body.classList.toggle('dev', dev);

const initialPosition = JSON.parse(localStorage.getItem(LOCALSTORAGE_POSITION_KEY)) || START_POSITION;
const mapOptions = {
  position: initialPosition,
  pov: START_POV,
  clickToGo: debug ? true : false,
  disableDefaultUI: true,
  showRoadLabels: false,
};

if (completedChapters.size > 0) {
  introCTAContinue.hidden = false;
} else if (!debug) {
  document.documentElement.style = `--intro-darkness-duration: ${FADE_OUT_DELAY_MS}ms;`;
}

const initialize = async () => {
  if (!dev && !debug) {
    try {
      await document.body.requestFullscreen();
    } catch (err) {
      console.warn('Fullscreen not available', err);
    }
  }

  const mapsLoader = new MapsAPILoader({
    apiKey: MAPS_API_KEY,
    version: '3.exp',
    libraries: ['streetView'],
  });

  const { StreetViewPanorama, InfoWindow } = await mapsLoader.importLibrary('streetView');
  const { event, ControlPosition } = await mapsLoader.importLibrary('core');
  scriptContext.google = { event, StreetViewPanorama, InfoWindow };

  container.hidden = false;

  mapOptions.panControl = true,
  mapOptions.panControlOptions = { position: ControlPosition.BLOCK_START_INLINE_END };

  const map = new StreetViewPanorama(container, mapOptions);
  window.map = map;
  window.scriptContext = scriptContext;
  scriptContext.map = map;

  intro.removeEventListener("click", initialize);
  intro.hidden = true;

  scriptContext.audioContext = new AudioContext();
  scriptContext.masterGain = new GainNode(scriptContext.audioContext, { gain: 0 });
  scriptContext.masterGain.connect(scriptContext.audioContext.destination);

  scriptContext.speechGain = new GainNode(scriptContext.audioContext, { gain: 0.9 });
  scriptContext.speechGain.connect(scriptContext.audioContext.destination);

  scriptContext.score = createScore(scriptContext);
  scriptContext.soundscape = createSoundscape(scriptContext);

  scriptContext.sfx = await createSFX(scriptContext);

  if (!debug && completedChapters.size === 0) {
    initialSequence(scriptContext);
  } else {
    revisitedSequence(scriptContext);
  }

  scriptContext.masterGain.gain.setValueAtTime(1, scriptContext.audioContext.currentTime);

  scriptContext.localisedSounds = new Sharawadji(localisedSounds, map, {
    debug,
    compressor: true
  });

  const items = await loadItems(InfoWindow, scriptContext);
  items.forEach((o) => o.update());

  checkForCheckpoints(scriptContext)();

  event.addListener(
    map,
    "position_changed",
    () => {
      checkForCheckpoints(scriptContext)();
      scriptContext.sfx.footsteps();

      const position = { lat: map.getPosition().lat(), lng: map.getPosition().lng() };
      setLatLngDisplay(position);

      localStorage.setItem(LOCALSTORAGE_POSITION_KEY, JSON.stringify(position));
      items.forEach((o) => o.update());
    },
  );

  event.addListener(
    map,
    "pov_changed",
    () => {
      const pov = map.getPov();
      setPovDisplay(pov);

      items.forEach((o) => o.povUpdate?.());
    },
  );

  initHUD(scriptContext);
  initSettings(scriptContext);
  initChapters(scriptContext);
  initTask();
  initSpeech(scriptContext);

  initGamepad(scriptContext);
  setLatLngDisplay(initialPosition);
  setPovDisplay(map.getPov());

  document.body.classList.add('game-on');
};

const initialSequence = (context) => {
  console.info('[main]', 'initial sequence');
  document.documentElement.style = `--intro-darkness-duration: ${FADE_OUT_DELAY_MS}ms;`;

  setTimeout(() => {
    playGatewaySound(context);
  }, 1000);

  setTimeout(() => {
    context.soundscapeGain.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + 2);
    scheduleScript(intro1, context);
  }, FADE_OUT_DELAY_MS);
}

const revisitedSequence = (context) => {
  console.info('[main]', 'revisited sequence');

  setTimeout(() => {
    enableSFX(context);
  }, 10000);

  enableClickToGoCB(context);
  context.soundscapeGain.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + 2);
};

introCTAFromScratch.addEventListener('click', () => {
  mapOptions.position = START_POSITION;
  mapOptions.pov = START_POV;
  resetGame();
  initialize();
});

introCTAContinue.addEventListener('click', initialize);
