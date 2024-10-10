import { completeChapter, chapters } from '../chapters.js';
import { scheduleScript } from '../script/index.js';
import * as chapter1 from '../script/chapter1.js';
import * as chapter2 from '../script/chapter2.js';
import { latLngDist } from "../utils.js";

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.442087695890653,
    lng: -69.525976864376787,
    chapter: chapters[0],
    callback(context) {
      return scheduleScript(chapter1.intro, {
        ...context,
        chapter: this.chapter,
      });
    }
  },
  {
    lat: -20.43945,
    lng: -69.53325,
    callback(context) {
      return scheduleScript(chapter1.searching, context);
    },
  },
  {
    lat: -20.43771,
    lng: -69.53864,
    callback(context) {
      return scheduleScript(chapter1.hisLand, context);
    },
  },
  {
    lat: -20.43524,
    lng: -69.54667,
    callback(context) {
      return scheduleScript(chapter1.showYouSomething, context);
    },
  },
  {
    lat: -20.433129833628328,
    lng: -69.554247855052452,
    callback(context) {
      return scheduleScript(chapter1.animita, context);
    },
  },
  {
    lat: -20.43194,
    lng: -69.55711,
    callback(context) {
      return scheduleScript(chapter1.weMadeIt, context);
    },
  },
  {
    lat: -20.43106,
    lng: -69.56009,
    callback(context) {
      return scheduleScript(chapter1.theresTheBus, context);
    },
  },
  {
    lat: -20.33514,
    lng: -69.65933,
    chapter: chapters[1],
    callback(context) {
      return scheduleScript(chapter2.intro, {
        ...context,
        chapter: this.chapter,
      });
    }
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
      console.info('[checkpoints]', 'triggering', checkpoint);
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
