import { completeChapter, chapters } from '../chapters.js';
import { scheduleScript } from '../script/index.js';
import * as chapter1 from '../script/chapter1.js';
import * as chapter2 from '../script/chapter2.js';
import * as chapter3 from '../script/chapter3.js';
import * as chapter4 from '../script/chapter4.js';
import * as chapter5 from '../script/chapter5.js';
import { latLngDist } from "../utils.js";
import { showSkyImages } from '../sky-images.js';
import * as drone from '../drone.js';
import { intro2, intro3 } from '../script/intro.js';
import { journalChapter, journalMoment } from '../journal/index.js';
import { setTask } from '../task.js';
import inventory from '../inventory/index.js';

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.448960415574838,
    lng: -69.508360649033690,
    async callback(context) {
      return scheduleScript(intro2, context);
    },
  },
  {
    lat: -20.44615,
    lng: -69.516,
    async callback(context) {
      return scheduleScript(intro3, context);
    },
  },
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
    lat: -20.34114,
    lng: -69.65651,
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
    lng: -69.65924,
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
    lat: -20.311606127473066,
    lng: -69.764257554131845,
    async callback(context) {
      context.score.dirtRoad1.play();
    },
  },
  {
    lat: -20.305932332865950,
    lng: -69.769828449520617,
    async callback(context) {
      drone.flyBy(context);
    },
  },
  {
    lat: -20.304420012943268,
    lng: -69.771311857793776,
    async callback(context) {
      journalMoment('🛩️', 'A drone flew past');
      context.score.dirtRoad2.play();
    },
  },
  {
    lat: -20.28908,
    lng: -69.78266,
    async callback(context) {
      context.score.dirtRoad3.play();
    },
  },
  {
    lat: -20.28805,
    lng: -69.78323,
    async callback(context) {
      context.droneHoveringBehindYou = await drone.hoverBehind(context, {
        lat: -20.28815,
        lng: -69.78317,
      });
    },
  },
  {
    lat: -20.2812,
    lng: -69.78685,
    async callback(context) {
      context.droneHoveringBehindYou?.stopHovering(context);
      context.droneHoveringBehindYou = null;
      journalMoment('🛸', 'The drone finally left me alone')
    },
  },
  {
    lat: -20.28189,
    lng: -69.78645,
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
    },
  },
  {
    lat: -20.27938,
    lng: -69.78727,
    async callback(context) {
      context.score.dirtRoad4.play();
    },
  },
  {
    lat: -20.27244,
    lng: -69.78621,
    async callback(context) {
      return scheduleScript(chapter3.outro, context);
    },
  },

  // Chapter 4
  {
    lat: -20.27109,
    lng: -69.78599,
    chapter: chapters[3],
    async callback(context) {
      return scheduleScript(chapter4.aboutDrone, {
        ...context,
        chapter: this.chapter,
      });
    },
  },
  {
    lat: -20.26845,
    lng: -69.78555,
    async callback(context) {
      if (inventory.hasItem('NASA Backpack')) {
        return scheduleScript(chapter4.niceBackpack, context);
      }
    },
  },
  {
    lat: -20.27143,
    lng: -69.78607,
    async callback(context) {
      context.soundscape.set(context.soundscape.town3);
    },
  },
  {
    lat: -20.26465,
    lng: -69.78524,
    async callback(context) {
      context.sfx.setFootsteps('normal');
      context.soundscape.set(context.soundscape.town5);
      return scheduleScript(chapter4.doYoKnow, context);
    },
  },
  {
    lat: -20.26119,
    lng: -69.78575,
    async callback(context) {
      return scheduleScript(chapter4.pozoAlmonteMF, context);
    },
  },
  {
    lat: -20.25056,
    lng: -69.78606,
    async callback(context) {
      context.soundscape.set(context.soundscape.townBigRoad);
      return scheduleScript(chapter4.difunta1, context);
    },
  },
  {
    lat: -20.24185,
    lng: -69.78692,
    async callback(context) {
      return scheduleScript(chapter4.difunta2, context);
    },
  },
  {
    lat: -20.23327,
    lng: -69.78749,
    async callback(context) {
      return scheduleScript(chapter4.difunta3, context);
    },
  },
  {
    lat: -20.22341,
    lng: -69.78831,
    async callback(context) {
      return scheduleScript(chapter4.difunta4, context);
    },
  },
  {
    lat: -20.22184,
    lng: -69.78845,
    async callback(context) {
      return scheduleScript(chapter4.afterDifunta, context);
    },
  },
  {
    lat: -20.21883,
    lng: -69.78868,
    async callback(context) {
      return scheduleScript(chapter4.lithium, context);
    },
  },
  {
    lat: -20.21254,
    lng: -69.78886,
    async callback(context) {
      return scheduleScript(chapter4.geoglyphs, context);
    },
  },

  // Humberstone
  {
    lat: -20.21034,
    lng: -69.79625,
    chapter: chapters[4],
    async callback(context) {
      return scheduleScript(chapter5.intro, {
        ...context,
        chapter: this.chapter,
      });
    },
  },
  {
    lat: -20.20953,
    lng: -69.79687,
    async callback(context) {
      context.sfx.setFootsteps('gravel');
      context.soundscape.set(context.soundscape.town4);
    },
  },
  {
    lat: -20.20931,
    lng: -69.79683,
    async callback(context) {
      setTask('Climb up the hill behind the town');
      journalMoment('🏭', 'Discovered the old town of Humberstone');
    },
  },
  {
    lat: -20.20521,
    lng: -69.79559,
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
      context.score.circuitoFull.play();
    }
  },
  {
    lat: -20.20556,
    lng: -69.79509,
    async callback(context) {
      showSkyImages(context);
      setTimeout(() => {
        journalMoment('🌠', 'Strange diagrams appeared in the sky')
      }, 3_000);

      setTimeout(() => {
        scheduleScript(chapter5.changeOfMind, context);
      }, 20_000);
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
            journalChapter(checkpoint.chapter);
          }
        });
    }
  }
};
