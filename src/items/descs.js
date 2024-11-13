import { itemDesc as busStop } from './bus.js';
import { initGeigerCounterDetection } from '../../assets/items/geiger-counter/detection.js';
import { shrooms } from './shrooms.js';
import { scheduleScript } from '../script/index.js';
import { geigerCounterReply } from '../script/chapter2.js';
import { hover, itemDesc as drone } from '../drone.js';
import inventory from '../inventory/index.js';
import { openLink, sleep } from '../utils.js';
import { cokeCans } from './coke.js';
import { journalMoment } from '../journal/index.js';
import { stationsOfTheCross } from './via-crucis.js';
import { readIChing } from '../interactions/i-ching/index.js';
import { iching } from './i-ching.js';
import { embeds } from './embeds/descs.js';

export default [
  ...cokeCans,
  ...stationsOfTheCross,
  ...shrooms,
  ...iching,
  ...embeds,
  drone,
  busStop,
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
    gltf: '/assets/items/geiger-counter/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    gltf: '/assets/items/truck/',
    async create(makers) {
      return makers.threeObject(this.gltf,
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

  {
    name: 'NASA Backpack',
    thumbnailURL: '/assets/items/backpack/thumb.webp',
    collectible: true,
    canBeActivated: true,
    position: {
      lat: -20.29224,
      lng: -69.78133,
    },
    gltf: '/assets/items/backpack/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    name: 'Bottles',
    collectible: false,
    position: {
      lat: -20.22333,
      lng: -69.78822,
    },
    gltf: '/assets/items/bottles/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    gltf: '/assets/items/broken-drone/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    gltf: '/assets/items/baseball-cap/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    gltf: '/assets/items/cybertruck/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    gltf: '/assets/items/mirror/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
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
    position: {
      lat: -20.26018,
      lng: -69.78619,
    },
    canBeActivated: true,
    gltf: '/assets/items/jbl/',nBeActivated: true,
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
        {
          name: this.name,
          onGround: true,
          scale: 0.3,
          cameraPosition: { x: 3, y: 1, z: 1},
        },
      );

      item.activate = () => openLink('https://0e20f2.bandcamp.com/album/pancreas-denial');

      return item;
    },
  },
  {
    name: 'Gnostic Technology stall',
    position: {
      lat: -20.26057,
      lng: -69.78564,
    },
    canBeActivated: true,
    gltf: '/assets/items/gnostic-stall/',nBeActivated: true,
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
        {
          name: this.name,
          big: true,
          onGround: true,
          scale: 0.8,
          cameraPosition: { x: -8, y: 2, z: -1 },
          env: '/assets/img/difunta.env.jpg',
          envIntensity: 1.5,
        },
      );

      item.activate = () => openLink('https://gnostic.technology/');

      return item;
    },
  },
  {
    name: 'I-Ching vending machine',
    position: {
      lat: -20.25904,
      lng: -69.78581,
    },
    canBeActivated: true,
    gltf: '/assets/items/i-ching/',nBeActivated: true,
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
        {
          name: this.name,
          big: true,
          onGround: true,
          // scale: 0.8,
          cameraPosition: { x: 6, y: 1, z: 0 },
          env: '/assets/img/difunta.env.jpg',
          envIntensity: 1.5,
        },
      );

      item.activate = async (context) => {
        console.info('[i-ching]', 'reading');

        return readIChing(context);
      };

      return item;
    },
  },
  {
    name: 'Mirror 2',
    position: {
      lat: -20.21207,
      lng: -69.79832,
    },
    gltf: '/assets/items/mirror/',
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
        {
          name: this.name,
          big: true,
          onGround: true,
          env: '/assets/img/mirror2.env.jpg',
          envIntensity: 1.2,
          cameraPosition: { x: 3, y: 1, z: -2.5 },
        },
      );

      return item;
    },
  },
  {
    name: 'World Exit Humberstone',
    position: {
      lat: -20.20804,
      lng: -69.79646,
    },
    canBeActivated: true,
    gltf: '/assets/items/world-exit/',nBeActivated: true,
    async create(makers) {
      const item = await makers.threeObject(this.gltf,
        {
          name: this.name,
          big: true,
          onGround: true,
          cameraPosition: { x: -10, y: 1, z: 0 },
          lightPosition: { x: -5, y: 8, z: 0 },
        },
      );

      item.activate = () => {
        console.info('[world-exit]', 'going to DDS Office');
        map.setPano('dds');
      };

      return item;
    },
  },
  {
    name: 'a broken phone',
    thumbnailURL: '/assets/items/phone/thumb.webp',
    collectible: true,
    position: {
      lat: -20.41114,
      lng: -69.71363,
    },
    gltf: '/assets/items/phone/',
    async create(makers) {
      return makers.threeObject(this.gltf,
        {
          name: this.name,
          onGround: true,
          cameraPosition: { x: 0.5, y: 0.15, z: 0.5 },
        },
      );
    },
  },
  {
    name: 'Map with some markers on it',
    position: {
      lat: 0.00005,
      lng: 0.0002,
    },
    gltf: '/assets/items/map/',
    async create(makers) {
      return makers.threeObject(this.gltf,
        {
          name: this.name,
          onGround: true,
          big: true,
          cameraPosition: { x: -4, y: 1, z: -4 },
          lightPosition: { x: -5, y: 5, z: -5 },
        },
      );
    },
  },
];
