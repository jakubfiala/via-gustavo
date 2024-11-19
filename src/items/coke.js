import inventory from '../inventory/index.js';
import { journalMoment } from '../journal/index.js';

export const createCoke = ({ name, position, rotation = {} }) => ({
  name,
  thumbnailURL: '/assets/items/coke/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  displayName: 'Coca-Cola can',
  gltf: '/assets/items/coke/',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/coke/',
      { name: this.name, displayName: this.displayName, onGround: true, rotation, cameraPosition: { x: 0, y: 0.5, z: 1 } },
    );

    item.activate = (G) => {
      const collected = inventory.items.filter(({ name }) => name.startsWith('Coca-Cola'));
      if (collected.length >= cokeCans.length) {
        console.log('[coke]', 'caught \'em all!');
        journalMoment('🩸', 'Achievement unlocked: collected all Coca-Cola cans. Enjoy the sugary goodness!');
      } else {
        console.log('[coke]', 'got', collected.length, 'out of', cokeCans.length, 'coke cans so far');
      }
    };

    return item;
  },
});

export const cokeCans = [
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
  createCoke({
    name: 'Coca-Cola 41',
    position: { lat: -20.33984, lng: -69.65605 },
    rotation: { y: 9 },
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
  createCoke({
    name: 'Coca-Cola 29',
    position: { lat: -20.21257, lng: -69.7896 },
    rotation: { y: -1.3 },
  }),
  createCoke({
    name: 'Coca-Cola 30',
    position: { lat: -20.20558, lng: -69.79672 },
    rotation: { x: -Math.PI/2, y: 0.9 },
  }),
  createCoke({
    name: 'Coca-Cola 31',
    position: { lat: -20.20596, lng: -69.79647 },
    rotation: { x: -Math.PI/2, y: 0.9 },
  }),
  createCoke({
    name: 'Coca-Cola 32',
    position: { lat: -20.20583, lng: -69.79633 },
    rotation: { x: Math.PI/2, y: 0.1 },
  }),
  createCoke({
    name: 'Coca-Cola 33',
    position: { lat: -20.20576, lng: -69.79627 },
    rotation: { x: Math.PI/2, y: 0.8 },
  }),
  createCoke({
    name: 'Coca-Cola 34',
    position: { lat: -20.20567, lng: -69.79609 },
    rotation: { y: -0.1 },
  }),
  createCoke({
    name: 'Coca-Cola 35',
    position: { lat: -20.2053, lng: -69.79575 },
    rotation: { x: -Math.PI/2, y: -0.4 },
  }),
  createCoke({
    name: 'Coca-Cola 36',
    position: { lat: -20.20523, lng: -69.79563 },
    rotation: { x: Math.PI/2, y: 1.4 },
  }),
  createCoke({
    name: 'Coca-Cola 37',
    position: { lat: -20.20521, lng: -69.79547 },
    rotation: { y: 1.4 },
  }),
  createCoke({
    name: 'Coca-Cola 38',
    position: { lat: -20.27125, lng: -69.78595 },
    rotation: { x: Math.PI/2, y: 1.4 },
  }),
  createCoke({
    name: 'Coca-Cola 39',
    position: { lat: -20.26453, lng: -69.78529 },
    rotation: { x: Math.PI/2, y: 0.4 },
  }),
  createCoke({
    name: 'Coca-Cola 40',
    position: { lat: -20.26893, lng: -69.78565 },
    rotation: { x: -Math.PI/2, y: 0.1 },
  }),
];
