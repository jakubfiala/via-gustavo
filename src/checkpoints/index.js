import { completeChapter, chapters } from '../chapters.js';
import { scheduleScript } from '../script/index.js';
import { Chapter1HisLand, Chapter1Intro, Chapter1Searching } from '../script/chapter1.js';
import { latLngDist } from "../utils.js";

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.442087695890653,
    lng: -69.525976864376787,
    chapter: chapters[0],
    callback(context) {
      return scheduleScript(Chapter1Intro, {
        ...context,
        chapter: this.chapter,
      });
    }
  },
  {
    lat: -20.43945,
    lng: -69.53325,
    callback(context) {
      return scheduleScript(Chapter1Searching, context);
    },
  },
  {
    lat: -20.43771,
    lng: -69.53864,
    callback(context) {
      return scheduleScript(Chapter1HisLand, context);
    },
  },
];

export const checkForCheckpoints = context => () => {
  const position = context.map.getPosition();

  for (const checkpoint of checkpoints) {
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
        .callback(context)
        .then(() => {
          if (checkpoint.chapter) {
            completeChapter(checkpoint.chapter);
          }
        });
    }
  }
};
