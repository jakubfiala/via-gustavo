import { completeChapter, chapters, completed as completedChapters } from './chapters.js';
import { scheduleScript } from './script/index.js';
import * as chapter1 from './script/chapter1.js';
import * as chapter2 from './script/chapter2.js';
import * as chapter3 from './script/chapter3.js';
import * as chapter4 from './script/chapter4.js';
import * as chapter5 from './script/chapter5.js';
import * as chapter6 from './script/chapter6.js';
import * as epilogue from './script/epilogue.js';
import { latLngDist } from "./utils.js";
import { showSkyImages } from './sky-images.js';
import * as drone from './interactions/drone.js';
import { intro2, intro3, tiredOfClicking } from './script/intro.js';
import { journalChapter, journalMoment } from './journal/index.js';
import { removeTask, setTask } from './task.js';
import inventory from './inventory.js';
import { sleep } from './utils.js';
import { gustavoSequence } from './interactions/gustavo-sequence.js';
import { finalSequence } from './interactions/final-sequence.js';
import { disableCruiseControl } from './cruise-control.js';

const CHECKPOINT_DISTANCE_THRESHOLD = 30;

export const checkpoints = [
  {
    lat: -20.448960415574838,
    lng: -69.508360649033690,
    passed: completedChapters.size > 0,
    async callback(context) {
      return scheduleScript(intro2, context);
    },
  },
  {
    lat: -20.44615,
    lng: -69.516,
    passed: completedChapters.size > 0,
    async callback(context) {
      return scheduleScript(intro3, context);
    },
  },
  {
    lat: -20.44321,
    lng: -69.523,
    passed: completedChapters.size > 0,
    async callback(G) {
      return scheduleScript(tiredOfClicking, G);
    },
  },

  // Chapter 1
  {
    lat: -20.442087695890653,
    lng: -69.525976864376787,
    chapter: chapters[0],
    passed: completedChapters.has(chapters[1].id),
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
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.searching, context);
    },
  },
  {
    lat: -20.43771,
    lng: -69.53864,
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.hisLand, context);
    },
  },
  {
    lat: -20.43524,
    lng: -69.54667,
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.showYouSomething, context);
    },
  },
  {
    lat: -20.4341,
    lng: -69.55155,
    passed: completedChapters.has(chapters[1].id),
    async callback(G) {
      G.soundscape.set(G.soundscape.trees);
    },
  },
  {
    lat: -20.433129833628328,
    lng: -69.554247855052452,
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.animita, context);
    },
  },
  {
    lat: -20.4323,
    lng: -69.55628,
    passed: completedChapters.has(chapters[1].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.town);
    },
  },
  {
    lat: -20.43194,
    lng: -69.55711,
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.weMadeIt, context);
    },
  },
  {
    lat: -20.43106,
    lng: -69.56009,
    passed: completedChapters.has(chapters[1].id),
    callback(context) {
      return scheduleScript(chapter1.theresTheBus, context);
    },
  },

  // Chapter 2
  {
    lat: -20.34114,
    lng: -69.65651,
    passed: completedChapters.has(chapters[2].id),
    chapter: chapters[1],
    callback(context) {
      return scheduleScript(chapter2.intro, {
        ...context,
        chapter: this.chapter,
      });
    },
  },
  {
    lat: -20.34114,
    lng: -69.65651,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.town2);
    },
  },
  {
    lat: -20.33629,
    lng: -69.65669,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.station1, context);
    },
  },
  {
    lat: -20.33705,
    lng: -69.65924,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.mainRoad, context);
    },
  },
  {
    lat: -20.335455499426374,
    lng: -69.659308859205751,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.station2, context);
    },
  },
  {
    lat: -20.33362,
    lng: -69.66595,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
    },
  },
  {
    lat: -20.33353,
    lng: -69.66675,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.station3, context);
    },
  },
  {
    lat: -20.33274,
    lng: -69.67337,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.trees);
    },
  },
  {
    lat: -20.33263,
    lng: -69.6745,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.station4, context);
    },
  },
  {
    lat: -20.3319,
    lng: -69.68088,
    passed: completedChapters.has(chapters[2].id),
    callback(context) {
      return scheduleScript(chapter2.station5, context);
    },
  },
  {
    lat: -20.33184,
    lng: -69.68141,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.birdsWind);
    },
  },
  {
    lat: -20.33115,
    lng: -69.68778,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
    },
  },
  {
    lat: -20.33094,
    lng: -69.68898,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station6, context);
    },
  },
  {
    lat: -20.33004,
    lng: -69.69689,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station7, context);
    },
  },
  {
    lat: -20.32944,
    lng: -69.70198,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.plane);
    },
  },
  {
    lat: -20.32901,
    lng: -69.70551,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station8, context);
    },
  },
  {
    lat: -20.32843,
    lng: -69.71013,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
    },
  },
  {
    lat: -20.3279,
    lng: -69.71511,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station9, context);
    },
  },
  {
    lat: -20.32696,
    lng: -69.72382,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station10, context);
    },
  },
  {
    lat: -20.32612,
    lng: -69.73172,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station11, context);
    },
  },
  {
    lat: -20.32535,
    lng: -69.73902,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station12, context);
    },
  },
  {
    lat: -20.32471,
    lng: -69.74547,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station13, context);
    },
  },
  {
    lat: -20.32416,
    lng: -69.75158,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.station14, context);
    },
  },
  {
    lat: -20.324071688546439,
    lng: -69.752710427462290,
    passed: completedChapters.has(chapters[2].id),
    async callback(context) {
      return scheduleScript(chapter2.outro, context);
    },
  },

  // Chapter 3
  {
    lat: -20.32047,
    lng: -69.75582,
    chapter: chapters[2],
    passed: completedChapters.has(chapters[3].id),
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
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      context.score.dirtRoad1.play();
    },
  },
  {
    lat: -20.305932332865950,
    lng: -69.769828449520617,
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      drone.flyBy(context);
      context.score.dirtRoad2.preload = 'auto';
    },
  },
  {
    lat: -20.304420012943268,
    lng: -69.771311857793776,
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      journalMoment('🛩️', 'A drone flew past');
      context.score.dirtRoad2.play();
      context.score.dirtRoad3.preload = 'auto';
    },
  },
  {
    lat: -20.28908,
    lng: -69.78266,
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      context.score.dirtRoad3.play();
    },
  },
  {
    lat: -20.28805,
    lng: -69.78323,
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      context.droneHoveringBehindYou = await drone.hoverBehind(context, {
        lat: -20.28815,
        lng: -69.78317,
      });
    },
  },
  {
    lat: -20.28189,
    lng: -69.78645,
    passed: completedChapters.has(chapters[3].id),
    async callback(G) {
      G.soundscape.set(G.soundscape.trees);
      G.score.dirtRoad4.preload = 'auto';
    },
  },
  {
    lat: -20.2812,
    lng: -69.78685,
    passed: completedChapters.has(chapters[3].id),
    async callback(G) {
      G.droneHoveringBehindYou?.stopHovering(G);
      G.droneHoveringBehindYou = null;
    },
  },
  {
    lat: -20.27938,
    lng: -69.78727,
    passed: completedChapters.has(chapters[3].id),
    async callback(G) {
      G.score.dirtRoad4.play();
      journalMoment('🛸', 'The drone finally left me alone');
    },
  },
  {
    lat: -20.27244,
    lng: -69.78621,
    passed: completedChapters.has(chapters[3].id),
    async callback(context) {
      context.score.bachPiano4.preload = 'auto';
      return scheduleScript(chapter3.outro, context);
    },
  },

  // Chapter 4
  {
    lat: -20.27143,
    lng: -69.78607,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.town3);
    },
  },
  {
    lat: -20.27109,
    lng: -69.78599,
    passed: completedChapters.has(chapters[4].id),
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
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      if (inventory.hasItem('NASA Backpack')) {
        return scheduleScript(chapter4.niceBackpack, context);
      }
    },
  },
  {
    lat: -20.26465,
    lng: -69.78524,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      context.sfx.setFootsteps('normal');
      context.soundscape.set(context.soundscape.town5);
      return scheduleScript(chapter4.doYoKnow, context);
    },
  },
  {
    lat: -20.26119,
    lng: -69.78575,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.pozoAlmonteMF, context);
    },
  },
  {
    lat: -20.25056,
    lng: -69.78606,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.townBigRoad);
      return scheduleScript(chapter4.difunta1, context);
    },
  },
  {
    lat: -20.24185,
    lng: -69.78692,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.difunta2, context);
    },
  },
  {
    lat: -20.23327,
    lng: -69.78749,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.difunta3, context);
    },
  },
  {
    lat: -20.22341,
    lng: -69.78831,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.difunta4, context);
    },
  },
  {
    lat: -20.22184,
    lng: -69.78845,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.afterDifunta, context);
    },
  },
  {
    lat: -20.21883,
    lng: -69.78868,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.lithium, context);
    },
  },
  {
    lat: -20.21254,
    lng: -69.78886,
    passed: completedChapters.has(chapters[4].id),
    async callback(context) {
      return scheduleScript(chapter4.geoglyphs, context);
    },
  },

  // Humberstone
  {
    lat: -20.21034,
    lng: -69.79625,
    chapter: chapters[4],
    passed: completedChapters.has(chapters[5].id),
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
    passed: completedChapters.has(chapters[5].id),
    async callback(context) {
      context.sfx.setFootsteps('gravel');
      context.soundscape.set(context.soundscape.town4);
    },
  },
  {
    lat: -20.20931,
    lng: -69.79683,
    passed: completedChapters.has(chapters[5].id),
    async callback(context) {
      setTask('Climb up the hill behind the town');
      journalMoment('🏭', 'Discovered the old town of Humberstone');
      context.score.circuitoFull.preload = 'auto';
    },
  },
  {
    lat: -20.2073,
    lng: -69.79675,
    passed: completedChapters.has(chapters[5].id),
    async callback(G) {
      G.soundscape.set(G.soundscape.town4);
    },
  },
  {
    lat: -20.20519,
    lng: -69.7955,
    passed: completedChapters.has(chapters[5].id),
    async callback(context) {
      context.soundscape.set(context.soundscape.base);
      context.score.circuitoFull.play();
    }
  },
  {
    lat: -20.20556,
    lng: -69.79509,
    passed: completedChapters.has(chapters[5].id),
    async callback(context) {
      removeTask();

      checkpoints.push({
        lat: -20.20979,
        lng: -69.79693,
        async callback(context) {
          scheduleScript(chapter5.hitchhike, context);
        },
      });

      showSkyImages(context);

      await sleep(20_000);
      await scheduleScript(chapter5.changeOfMind, context);
      await sleep(3_000);

      journalMoment('🌠', 'Strange diagrams appeared in the sky, and my companion had a change of heart.');
    }
  },

  // Chapter 6 - Finding Gustavo
  {
    lat: -20.37992,
    lng: -69.72742,
    chapter: chapters[5],
    passed: false,
    async callback(context) {
      context.chapter = this.chapter;
      return scheduleScript(chapter6.intro, context);
    },
  },
  {
    lat: -20.38045,
    lng: -69.72716,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.growingUp, context);
    }
  },
  {
    lat: -20.39206,
    lng: -69.72192,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.touchTheSky, context);
    }
  },
  {
    lat: -20.40215,
    lng: -69.71733,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.evening, context);
    }
  },
  {
    lat: -20.41443,
    lng: -69.71181,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.night, context);
    }
  },
  {
    lat: -20.42717,
    lng: -69.7061,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.pause, context);
    }
  },
  {
    lat: -20.42815,
    lng: -69.70565,
    passed: false,
    async callback(context) {
      return scheduleScript(chapter6.end, context);
    }
  },
  {
    lat: -20.43765,
    lng: -69.70143,
    passed: false,
    async callback(context) {
      return gustavoSequence(context);
    },
  },

  // Epilogue
  {
    lat: 0,
    lng: 0.0001,
    async callback(G) {
      return scheduleScript(epilogue.intro, G);
    },
  },
  {
    lat: 1,
    lng: 0.0004,
    async callback(G) {
      G.scoreGain.gain.linearRampToValueAtTime(0, G.audioContext.currentTime + 3);
      G.soundscapeGain.gain.linearRampToValueAtTime(0, G.audioContext.currentTime + 3);
      G.sfxGain.gain.linearRampToValueAtTime(0, G.audioContext.currentTime + 3);
      G.score.lithiumES.preload = 'auto';
      return scheduleScript(epilogue.end, G);
    },
  },
  {
    lat: 1,
    lng: 1,
    async callback(G) {
      return finalSequence(G, checkpoints);
    },
  }
];

window.checkpoints = checkpoints;

export const checkForCheckpoints = G => () => {
  const position = G.map.getPosition();

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

      disableCruiseControl(G);

      checkpoint
        .callback(G)
        .then(() => {
          if (checkpoint.chapter) {
            completeChapter(checkpoint.chapter);
            journalChapter(checkpoint.chapter);
          }
        });
    }
  }
};

export const goToNextCheckpoint = (G) => {
  const nextUnpassed = checkpoints.find((c) => !c.passed);
  if (!nextUnpassed) return;

  const pov = G.map.getPov();
  G.map.setPosition({ lat: nextUnpassed.lat, lng: nextUnpassed.lng });
  G.map.setPov(pov);
}
