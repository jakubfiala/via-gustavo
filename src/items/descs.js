import { createBusStopItem } from './bus.js';
import { initGeigerCounterDetection } from '../../assets/items/geiger-counter/detection.js';
import { createShrooms } from './shrooms.js';
import { scheduleScript } from '../script/index.js';
import { geigerCounterReply } from '../script/chapter2.js';
import { hover } from '../drone.js';
import inventory from '../inventory/index.js';
import { sleep } from '../utils.js';
import { createCoke } from './coke.js';
import { journalMoment } from '../journal/index.js';
import { createStationOfTheCross } from './via-crucis.js';

export default [
  createBusStopItem({
    position: { lat: -20.43098, lng: -69.56023 },
    destination: {
      locationName: 'La Tirana',
      // -20.3412425,-69.6565267,3a,75y,352.81h,85.98t
      latLng: {
        lat: -20.3412425,
        lng: -69.6565267,
      },
      pov: { heading: 0, pitch: 0 },
    },
    cameraPosition: { x: -8, y: 3.5 },
    scale: 0.8,
  }),
  createCoke({
    name: 'Coca-Cola 1',
    position: { lat: -20.34075, lng: -69.65655 },
  }),
  createCoke({
    name: 'Coca-Cola 2',
    position: { lat: -20.34053, lng: -69.65618 },
    rotation: { x: Math.PI/2 },
  }),
  createCoke({
    name: 'Coca-Cola 3',
    position: { lat: -20.34023, lng: -69.65606 },
    rotation: { x: Math.PI/2, y: Math.PI*0.8 },
  }),
  createCoke({
    name: 'Coca-Cola 4',
    position: { lat: -20.33934, lng: -69.65608 },
  }),
  createCoke({
    name: 'Coca-Cola 5',
    position: { lat: -20.339, lng: -69.65591 },
    rotation: { x: Math.PI/2, y: Math.PI*0.3 },
  }),
  createCoke({
    name: 'Coca-Cola 6',
    position: { lat: -20.33773, lng: -69.65601 },
    rotation: { x: Math.PI/2, y: Math.PI*0.1 },
  }),
  createCoke({
    name: 'Coca-Cola 7',
    position: { lat: -20.33692, lng: -69.65623 },
  }),
  createCoke({
    name: 'Coca-Cola 8',
    position: { lat: -20.33678, lng: -69.65673 },
    rotation: { x: Math.PI/2 },
  }),
  createCoke({
    name: 'Coca-Cola 9',
    position: { lat: -20.33698, lng: -69.65759 },
    rotation: { x: Math.PI/2, y: 0.15 },
  }),
  createCoke({
    name: 'Coca-Cola 10',
    position: { lat: -20.33706, lng: -69.65872 },
    rotation: { x: Math.PI/2, y: 0.9 },
  }),
  createCoke({
    name: 'Coca-Cola 11',
    position: { lat: -20.33652, lng: -69.65927 },
  }),
  createCoke({
    name: 'Coca-Cola 12',
    position: { lat: -20.33609, lng: -69.65923 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  // overpass
  createCoke({
    name: 'Coca-Cola 13',
    position: { lat: -20.21385, lng: -69.78926 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 14',
    position: { lat: -20.21386, lng: -69.78931 },
    rotation: { y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 15',
    position: { lat: -20.2138, lng: -69.78931 },
    rotation: { x: -Math.PI/2, y: 0.9 },
  }),
  createCoke({
    name: 'Coca-Cola 16',
    position: { lat: -20.34049, lng: -69.65623 },
    rotation: { x: -Math.PI/2, y: 0.3 },
  }),
  createCoke({
    name: 'Coca-Cola 17',
    position: { lat: -20.3391, lng: -69.65599 },
    rotation: { y: -1.7 },
  }),
  createCoke({
    name: 'Coca-Cola 19',
    position: { lat: -20.33866, lng: -69.65596 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 20',
    position: { lat: -20.33783, lng: -69.65596 },
    rotation: { y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 21',
    position: { lat: -20.33688, lng: -69.65613 },
    rotation: { x: Math.PI/2, y: 2 },
  }),
  createCoke({
    name: 'Coca-Cola 22',
    position: { lat: -20.337, lng: -69.65728 },
    rotation: { y: -0.63 },
  }),
  createCoke({
    name: 'Coca-Cola 23',
    position: { lat: -20.33703, lng: -69.65821 },
    rotation: { x: -Math.PI/2, y: 0.3 },
  }),
  createCoke({
    name: 'Coca-Cola 24',
    position: { lat: -20.33524, lng: -69.65935 },
    rotation: { y: 0.3 },
  }),
  createCoke({
    name: 'Coca-Cola 25',
    position: { lat: -20.33477, lng: -69.6596 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 26',
    position: { lat: -20.21321, lng: -69.78962 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 27',
    position: { lat: -20.21266, lng: -69.79059 },
    rotation: { x: Math.PI/2, y: -0.45 },
  }),
  createCoke({
    name: 'Coca-Cola 28',
    position: { lat: -20.21311, lng: -69.79841 },
    rotation: { x: -Math.PI/2, y: 0.9 },
  }),

  {
    name: 'Geiger Counter',
    thumbnailURL: '/assets/items/geiger-counter/thumb.webp',
    collectible: true,
    handheld: true,
    canBeActivated: true,
    position: {
      lat: -20.3252,
      lng: -69.7392,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/geiger-counter/',
        {
          name: this.name,
          cameraPosition: { x: 6, y: 2.5, z: -3 },
          rotation: { x: 0.6, y: -0.95, z: -1.25 },
          lightPosition: { z: -0.7 },
          onGround: true,
        },
      );
      item.activate = async (context, { firstTime }) => {
        if (firstTime) {
          scheduleScript(geigerCounterReply, context);
        }

        console.info('[items]', 'geiger counter activated');
        const target = new google.maps.LatLng({
          lat: -20.29224,
          lng: -69.78133,
        });

        item.detection = initGeigerCounterDetection(context, item, target);
      };

      item.deactivate = async () => {
        console.info('[items]', 'geiger counter deactivated');
        item.detection.end();
      };

      return item;
    },
  },
  {
    name: 'Gustavo\'s truck',
    collectible: false,
    position: { lat: -20.33167, lng: -69.68165 },
    async create(makers) {
      return makers.threeObject('/assets/items/truck/',
        {
          name: this.name,
          big: true,
          onGround: true,
          cameraPosition: { x: -10, y: 2.5, z: -2 },
          lightPosition: { x: 0, y: 10, z: 0 },
        },
      );
    },
  },
  createStationOfTheCross({
    index: '14', name: 'XIV - Laid in his tomb',
    position: { lat: -20.33616, lng: -69.65654 }
  }),
  createStationOfTheCross({
    index: '13', name: 'XIII - Taken down from the cross',
    position: { lat: -20.33545, lng: -69.65917 }
  }),
  createStationOfTheCross({
    index: '12', name: 'XII - Dies on the cross',
    position: { lat: -20.33343, lng: -69.66675 }
  }),
  createStationOfTheCross({
    index: '11', name: 'XI - Nailed to the cross',
    position: { lat: -20.33253, lng: -69.6745 }
  }),
  createStationOfTheCross({
    index: '10', name: 'X - His clothes are torn',
    position: { lat: -20.33175, lng: -69.68088 }
  }),
  createStationOfTheCross({
    index: '09', name: 'IX - Fails the third time',
    position: { lat: -20.33083, lng: -69.68898 }
  }),
  createStationOfTheCross({
    index: '08', name: 'VIII - Meets the women of Jerusalem',
    position: { lat: -20.32995, lng: -69.69689 }
  }),
  createStationOfTheCross({
    index: '07', name: 'VII - Fails the second time',
    position: { lat: -20.32892, lng: -69.70551 }
  }),
  createStationOfTheCross({
    index: '06', name: 'VI - Veronica wipes his face',
    position: { lat: -20.3278, lng: -69.71511 }
  }),
  createStationOfTheCross({
    index: '05', name: 'V - Simon of Cyrene helps him carry the cross',
    position: { lat: -20.32682, lng: -69.72382 }
  }),
  createStationOfTheCross({
    index: '04', name: 'IV - Meets his mother',
    position: { lat: -20.32598, lng: -69.73172 }
  }),
  createStationOfTheCross({
    index: '03', name: 'III - Fails the first time',
    position: { lat: -20.32522, lng: -69.73902 }
  }),
  createStationOfTheCross({
    index: '02', name: 'II - Takes up his cross',
    position: { lat: -20.32459, lng: -69.74547 }
  }),
  createStationOfTheCross({
    index: '01', name: 'I - Is sentenced to death',
    position: { lat: -20.32403, lng: -69.75158 }
  }),
  createShrooms('1', {
    lat: -20.43544,
    lng: -69.54638,
  }),
  createShrooms('2', {
    lat: -20.43526,
    lng: -69.54645,
  }),
  {
    name: 'Hovering drone',
    collectible: false,
    position: { lat: -20.29203, lng: -69.78111 },
    create(makers) {
      return makers.simpleImage({ name: this.name, src: '/assets/img/drone.webp', id: 'drone-hovering', correctZ: false });
    },
  },
  {
    name: 'NASA Backpack',
    thumbnailURL: '/assets/items/backpack/thumb.webp',
    collectible: true,
    canBeActivated: true,
    position: {
      lat: -20.29224,
      lng: -69.78133,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/backpack/',
        {
          name: this.name,
          onGround: true,
          scale: 0.9,
          cameraPosition: { y: 0.8 },
        },
      );
      item.activate = async (context) => {
        console.info('[backpack]', 'activated');
        if (!inventory.hasItem('Geiger Counter')) {
          return;
        }

        context.handheldItem?.item.detection?.overheat();

        await sleep(2000);
        document.getElementById('handheld-explosion').hidden = false;
        context.sfx.explosion();

        await sleep(800);
        await context.handheldItem?.drop(context);
        document.getElementById('handheld-explosion').hidden = true;
        journalMoment('💥', 'The Geiger counter exploded');

        await sleep(2000);
        hover(context, { lat: -20.29203, lng: -69.78111 });
      };

      return item;
    },
  },
  {
    name: 'Mars96',
    collectible: false,
    position: { lat: -20.28906, lng: -69.78257 },
    create(makers) {
      return makers.embed('https://en.wikipedia.org/wiki/Mars_96');
    },
  },
  {
    name: 'Bottles',
    collectible: false,
    position: {
      lat: -20.22333,
      lng: -69.78822,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/bottles/',
        {
          name: this.name,
          onGround: true,
          big: true,
          cameraPosition: { x: 0, y: 0.6, z: 2.1 },
          lightPosition: { y: 1 },
          env: '/assets/img/difunta.env.jpg',
          scale: 0.4,
        },
      );

      return item;
    },
  },
  {
    name: 'Broken drone',
    thumbnailURL: '/assets/items/broken-drone/thumb.webp',
    collectible: true,
    position: {
      lat: -20.21253,
      lng: -69.78882,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/broken-drone/',
        {
          name: this.name,
          onGround: true,
          scale: 0.7,
          cameraPosition: { x: -6, y: 3, z: -4 },
        },
      );

      return item;
    },
  },
  {
    name: 'NASA baseball cap',
    thumbnailURL: '/assets/items/baseball-cap/thumb.webp',
    collectible: true,
    position: {
      lat: -20.20549,
      lng: -69.79511,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/baseball-cap/',
        {
          name: this.name,
          onGround: true,
          cameraPosition: { x: -6, y: 2, z: 2 },
        },
      );

      return item;
    },
  },
  {
    name: 'Cybertruck',
    position: {
      lat: -20.21404,
      lng: -69.78924,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/cybertruck/',
        {
          name: this.name,
          big: true,
          onGround: true,
          cameraPosition: { x: 10, y: 2, z: -3 },
          env: '/assets/img/difunta.env.jpg',
          envIntensity: 1.5,
          lightPosition: { x: 3, y: 10, z: 0 },
        },
      );

      return item;
    },
  },
  {
    name: 'Mirror',
    position: {
      lat: -20.31434,
      lng: -69.76132,
    },
    async create(makers) {
      const item = await makers.threeObject('/assets/items/mirror/',
        {
          name: this.name,
          big: true,
          onGround: true,
          env: '/assets/img/mirror.env.jpg',
          envIntensity: 1.2,
          cameraPosition: { x: 2.7, y: 0.8, z: 2.7 },
        },
      );

      return item;
    },
  },
  {
    name: 'Speaker playing Pancreas Denial by 0E20F2',
    thumbnailURL: '/assets/items/jbl/thumb.webp',
    position: {
      lat: -20.26018,
      lng: -69.78619,
    },
    canBeActivated: true,
    async create(makers) {
      const item = await makers.threeObject('/assets/items/jbl/',
        {
          name: this.name,
          onGround: true,
          scale: 0.3,
          cameraPosition: { x: 3, y: 1, z: 1},
        },
      );

      item.activate = () => {
        const link = document.createElement('a');
        link.href = 'https://0e20f2.bandcamp.com/album/pancreas-denial';
        link.target = '_blank';
        link.rel = 'noopener';
        link.click();
      };

      return item;
    },
  },
];
