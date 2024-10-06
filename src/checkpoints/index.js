import { completeChapter, chapters } from '../chapters.js';
import { scheduleScript } from '../script/index.js';
import { Chapter1Intro } from '../script/chapter1.js';
import { latLngDist } from "../utils.js";

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.467491495806950,
    lng: -69.460925633319292,
    chapter: chapters[0],
    callback(context) {
      return scheduleScript(Chapter1Intro, {
        ...context,
        chapter: this.chapter,
      });
    }
  }
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
