import { completeChapter, chapters } from '../chapters.js';
import { scheduleScript } from '../script/index.js';
import * as chapter1 from '../script/chapter1.js';
import * as chapter2 from '../script/chapter2.js';
import * as chapter3 from '../script/chapter3.js';
import { latLngDist } from "../utils.js";
import { showSkyImages } from '../sky-images.js';
import * as drone from '../drone.js';

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
    lat: -20.4341,
    lng: -69.55155,
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
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
    lat: -20.4323,
    lng: -69.55628,
    async callback(context) {
      context.soundscape.set(context.soundscape.town);
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
    lat: -20.34114,
    lng: -69.65651,
    async callback(context) {
      context.soundscape.set(context.soundscape.town2);
    },
  },

  // Chapter 2
  {
    lat: -20.34075,
    lng: -69.65655,
    chapter: chapters[1],
    callback(context) {
      return scheduleScript(chapter2.intro, {
        ...context,
        chapter: this.chapter,
      });
    },
  },
  {
    lat: -20.33629,
    lng: -69.65669,
    callback(context) {
      return scheduleScript(chapter2.station1, context);
    },
  },
  {
    lat: -20.33705,
    lng: -69.65913,
    callback(context) {
      return scheduleScript(chapter2.mainRoad, context);
    },
  },
  {
    lat: -20.335455499426374,
    lng: -69.659308859205751,
    callback(context) {
      return scheduleScript(chapter2.station2, context);
    },
  },
  {
    lat: -20.33362,
    lng: -69.66595,
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
    },
  },
  {
    lat: -20.33353,
    lng: -69.66675,
    callback(context) {
      return scheduleScript(chapter2.station3, context);
    },
  },
  {
    lat: -20.33274,
    lng: -69.67337,
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
    },
  },
  {
    lat: -20.33263,
    lng: -69.6745,
    callback(context) {
      return scheduleScript(chapter2.station4, context);
    },
  },
  {
    lat: -20.3319,
    lng: -69.68088,
    callback(context) {
      return scheduleScript(chapter2.station5, context);
    },
  },
  {
    lat: -20.33184,
    lng: -69.68141,
    async callback(context) {
      context.soundscape.set(context.soundscape.birdsWind);
    },
  },
  {
    lat: -20.33115,
    lng: -69.68778,
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
    },
  },
  {
    lat: -20.33094,
    lng: -69.68898,
    async callback(context) {
      return scheduleScript(chapter2.station6, context);
    },
  },
  {
    lat: -20.33004,
    lng: -69.69689,
    async callback(context) {
      return scheduleScript(chapter2.station7, context);
    },
  },
  {
    lat: -20.32944,
    lng: -69.70198,
    async callback(context) {
      context.soundscape.set(context.soundscape.plane);
    },
  },
  {
    lat: -20.32843,
    lng: -69.71013,
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
    },
  },
  {
    lat: -20.32901,
    lng: -69.70551,
    async callback(context) {
      return scheduleScript(chapter2.station8, context);
    },
  },
  {
    lat: -20.3279,
    lng: -69.71511,
    async callback(context) {
      return scheduleScript(chapter2.station9, context);
    },
  },
  {
    lat: -20.32696,
    lng: -69.72382,
    async callback(context) {
      return scheduleScript(chapter2.station10, context);
    },
  },
  {
    lat: -20.32612,
    lng: -69.73172,
    async callback(context) {
      return scheduleScript(chapter2.station11, context);
    },
  },
  {
    lat: -20.32535,
    lng: -69.73902,
    async callback(context) {
      return scheduleScript(chapter2.station12, context);
    },
  },
  {
    lat: -20.32471,
    lng: -69.74547,
    async callback(context) {
      return scheduleScript(chapter2.station13, context);
    },
  },
  {
    lat: -20.32416,
    lng: -69.75158,
    async callback(context) {
      return scheduleScript(chapter2.station14, context);
    },
  },
  {
    lat: -20.324071688546439,
    lng: -69.752710427462290,
    async callback(context) {
      return scheduleScript(chapter2.outro, context);
    },
  },

  // Chapter 3
  {
    lat: -20.32047,
    lng: -69.75582,
    chapter: chapters[2],
    async callback(context) {
      return scheduleScript(chapter3.intro, {
        ...context,
        chapter: this.chapter,
      });
    },
  },
  {
    lat: -20.305932332865950,
    lng: -69.769828449520617,
    async callback(context) {
      context.soundscape.set(context.soundscape.highwayRight);
      context.sfx.currentFootsteps = context.sfx.footstepsSounds.footstepsGravel;
      drone.flyBy(context);
    },
  },
  {
    lat: -20.292360241167511,
    lng: -69.781218354251735,
    async callback(context) {
      context.soundscape.set(context.soundscape.highwayRight);
      context.sfx.currentFootsteps = context.sfx.footstepsSounds.footstepsGravel;
      drone.hover(context, { lat: -20.29233, lng: -69.78107 })
    },
  },

  // Humberstone
  {
    lat: -20.20556,
    lng: -69.79509,
    async callback(context) {
      return showSkyImages(context);
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
