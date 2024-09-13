import { Loader as MapsAPILoader } from "@googlemaps/js-api-loader";
import { TextDisplay } from "./text.js";
import {
  scheduleScript,
  IntroScript,
  Chapter1Intro
} from "./script.js";
import { Sharawadji } from "../sharawadji/src/index.js";
import { latLngDist } from "./utils.js";
import { fakeCaptcha } from "./fakeCaptcha.js";
import initHUD, { setLatLngDisplay, setPovDisplay } from './hud/index.js';
import initSettings, { resetGame } from './settings.js';
import { LOCALSTORAGE_POSITION_KEY, START_POSITION, START_POV, MAPS_API_KEY } from './constants.js';
import loadItems from './items.js';
import { initChapters, completeChapter, chapters, completed as completedChapters } from './chapters.js';
import initGamepad from './gamepad.js';

const INIT_RAMP = 4;

const container = document.getElementById("container");
const intro = document.getElementById("intro");
const introCTAFromScratch = document.getElementById("intro-cta-from-scratch");
const introCTAContinue = document.getElementById("intro-cta-continue");
const bgAudio = document.getElementById("bg-audio");
const textContainer = document.getElementById("text-display");
const statusContainer = document.getElementById("status-display");
const fakeCaptchas = Array.from(
  document.getElementsByClassName("fake-captcha")
).map(c => fakeCaptcha(c));


const textDisplay = new TextDisplay(textContainer);
let audioContext, masterGain = null;

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
}

const sounds = [
  {
    name: "checkpoint1-music",
    lat: -20.503758,
    lng: -69.3805445,
    timestamp: 551459942721,
    src: "assets/audio/lobotomy-loop.mp3",
    db: 80,
    loop: true
  },
  {
    name: "desert-storm-atmos",
    lat: -20.468511343004337,
    lng: -69.458340041388709,
    src: "assets/audio/desert-storm-atmos.mp3",
    db: 80,
    loop: true
  },
  {
    name: "desert-winds-quiet",
    lat: -20.467191495806950,
    lng: -69.460925633319292,
    src: "assets/audio/desert-winds-quiet.mp3",
    db: 80,
    loop: true
  }
];

const Checkpoints = [
  // {
  //   lat: -20.503758,
  //   lng: -69.3805445,
  //   chapter: chapters[0],
  //   async callback(map) {
  //     await scheduleScript(Checkpoint1IntroScript, {
  //       map,
  //       bgAudio,
  //       statusContainer, fakeCaptchas, textDisplay, masterGain, audioContext,
  //       chapter: this.chapter,
  //     });
  //   }
  // }
  {
    lat: -20.467491495806950,
    lng: -69.460925633319292,
    chapter: chapters[0],
    async callback(map) {
      await scheduleScript(Chapter1Intro, {
        map,
        bgAudio,
        statusContainer, fakeCaptchas, textDisplay, masterGain, audioContext,
        chapter: this.chapter,
      });
    }
  }
];

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

const checkForCheckpoints = map => () => {
  const position = map.getPosition();

  for (const checkpoint of Checkpoints) {
    if (checkpoint.passed) {
      continue;
    }

    const distanceFromCheckpoint = latLngDist(
      position,
      new google.maps.LatLng(checkpoint.lat, checkpoint.lng)
    );

    if (distanceFromCheckpoint < CHECKPOINT_DISTANCE_THRESHOLD) {
      checkpoint.passed = true;
      checkpoint
        .callback(map)
        .then(() => {
          if (checkpoint.chapter) {
            completeChapter(checkpoint.chapter);
          }
        });
    }
  }
};

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
  event.addListener(
    map,
    "position_changed",
    checkForCheckpoints(map)
  );

  intro.removeEventListener("click", initialize);
  intro.hidden = true;
  bgAudio.volume = 0.15;

  audioContext = new AudioContext();
  masterGain = new GainNode(audioContext, { gain: 0 });

  const bgNode = new MediaElementAudioSourceNode(audioContext, { mediaElement: bgAudio });
  bgNode.connect(masterGain).connect(audioContext.destination);
  bgAudio.play();

  if (completedChapters.size === 0) {
    scheduleScript(IntroScript, { textDisplay, map, bgAudio, statusContainer, fakeCaptchas, masterGain, audioContext });
  }

  masterGain.gain.setValueAtTime(0, audioContext.currentTime);
  masterGain.gain.linearRampToValueAtTime(
    1,
    audioContext.currentTime + INIT_RAMP
  );

  new Sharawadji(sounds, map, {
    debug,
    compressor: true
  });

  const items = await loadItems(InfoWindow, map, audioContext);
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
};

introCTAFromScratch.addEventListener('click', () => {
  mapOptions.position = START_POSITION;
  mapOptions.pov = START_POV;
  resetGame();
  initialize();
});
introCTAContinue.addEventListener('click', initialize);
