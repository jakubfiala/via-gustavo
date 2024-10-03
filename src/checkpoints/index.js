import { completeChapter, chapters } from '../chapters.js';
import { Chapter1Intro } from '../script/chapter1.js';
import { TestScriptGeiger1 } from '../script/test.js';
import { latLngDist } from "../utils.js";

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.468511343004337,
    lng: -69.458340041388709,
    async callback(map) {
      await scheduleScript(TestScriptGeiger1, {
        ...scriptContext,
        map,
      });
    },
  },
  {
    lat: -20.467491495806950,
    lng: -69.460925633319292,
    chapter: chapters[0],
    async callback(map) {
      await scheduleScript(Chapter1Intro, {
        ...scriptContext,
        map,
        chapter: this.chapter,
      });
    }
  }
];

export const checkForCheckpoints = map => () => {
  const position = map.getPosition();

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
        .callback(map)
        .then(() => {
          if (checkpoint.chapter) {
            completeChapter(checkpoint.chapter);
          }
        });
    }
  }
};
