import { Loader as MapsAPILoader } from "@googlemaps/js-api-loader";
import { TextDisplay } from "./text.js";

import {
  scheduleScript,
} from "./script/index.js";
import IntroScript from './script/intro.js';

import { Sharawadji } from "../sharawadji/src/index.js";
import { fakeCaptcha } from "./interactions/fakeCaptcha.js";
import initHUD, { setLatLngDisplay, setPovDisplay } from './hud/index.js';
import initSettings, { resetGame } from './settings.js';
import { LOCALSTORAGE_POSITION_KEY, START_POSITION, START_POV, MAPS_API_KEY } from './constants.js';
import loadItems from './items/index.js';
import { initChapters, completed as completedChapters } from './chapters.js';
import initGamepad from './gamepad.js';
import { localisedSounds } from './audio/localised-sounds.js';
import { FADE_OUT_DELAY_MS, playGatewaySound } from './audio/gateway-sound.js';
import { enableClickToGoCB } from './script/utils.js';
import { checkForCheckpoints } from './checkpoints/index.js';

const container = document.getElementById("container");
const intro = document.getElementById("intro");
const introCTAFromScratch = document.getElementById("intro-cta-from-scratch");
const introCTAContinue = document.getElementById("intro-cta-continue");
const bgAudio = document.getElementById("bg-audio");
const textContainer = document.getElementById("text-display");
const statusContainer = document.getElementById("status-display");
const helpContainer = document.getElementById("help-display");
const fakeCaptchas = Array.from(document.getElementsByClassName("fake-captcha")).map(c => fakeCaptcha(c));
const textDisplay = new TextDisplay(textContainer);

const scriptContext = {
  bgAudio,
  statusContainer,
  helpContainer,
  fakeCaptchas,
  textDisplay,
};

const debug = location.search.includes("debug=true");
document.body.classList.toggle('debug', debug);

const initialPosition = JSON.parse(localStorage.getItem(LOCALSTORAGE_POSITION_KEY)) || START_POSITION;
const mapOptions = {
  position: initialPosition,
  pov: START_POV,
  clickToGo: debug ? true : false,
  disableDefaultUI: true,
  showRoadLabels: false,
};

initChapters();

if (completedChapters.size > 0) {
  introCTAContinue.hidden = false;
} else if (!debug) {
  document.documentElement.style = `--intro-darkness-duration: ${FADE_OUT_DELAY_MS}ms;`;
}

const initialize = async () => {
  const mapsLoader = new MapsAPILoader({
    apiKey: MAPS_API_KEY,
    version: '3.exp',
    libraries: ['streetView'],
  });

  const { StreetViewPanorama, InfoWindow } = await mapsLoader.importLibrary('streetView');
  const { event } = await mapsLoader.importLibrary('core');
  container.hidden = false;

  const map = new StreetViewPanorama(container, mapOptions);
  window.map = map;
  scriptContext.map = map;

  event.addListener(
    map,
    "position_changed",
    checkForCheckpoints(scriptContext)
  );

  intro.removeEventListener("click", initialize);
  intro.hidden = true;
  bgAudio.volume = 0.15;

  scriptContext.audioContext = new AudioContext();
  scriptContext.masterGain = new GainNode(scriptContext.audioContext, { gain: 0 });

  const bgNode = new MediaElementAudioSourceNode(scriptContext.audioContext, { mediaElement: bgAudio });
  scriptContext.bgVolume = new GainNode(scriptContext.audioContext, { gain: 0 });
  bgNode
    .connect(scriptContext.bgVolume)
    .connect(scriptContext.masterGain)
    .connect(scriptContext.audioContext.destination);
  bgAudio.play();

  if (!debug && completedChapters.size === 0) {
    initialSequence(scriptContext);
  } else {
    revisitedSequence(scriptContext);
  }

  scriptContext.masterGain.gain.setValueAtTime(1, scriptContext.audioContext.currentTime);

  new Sharawadji(localisedSounds, map, {
    debug,
    compressor: true
  });

  const items = await loadItems(InfoWindow, map, scriptContext.audioContext);
  items.forEach((o) => o.update());

  event.addListener(
    map,
    "position_changed",
    () => {
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
      setPovDisplay(map.getPov());
    },
  );

  initHUD();
  initSettings();

  setLatLngDisplay(initialPosition);
  setPovDisplay(map.getPov());
  initGamepad();

  document.body.classList.add('game-on');
};

const initialSequence = (context) => {
  setTimeout(() => {
    playGatewaySound(context);
  }, 1000);

  setTimeout(() => {
    context.bgVolume.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + 2);
    scheduleScript(IntroScript, context);
  }, FADE_OUT_DELAY_MS);
}

const revisitedSequence = (context) => {
  enableClickToGoCB(context);
  context.bgVolume.gain.linearRampToValueAtTime(1, context.audioContext.currentTime + 2);
};

introCTAFromScratch.addEventListener('click', () => {
  mapOptions.position = START_POSITION;
  mapOptions.pov = START_POV;
  resetGame();
  initialize();
});

introCTAContinue.addEventListener('click', initialize);
