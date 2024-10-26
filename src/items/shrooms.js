import inventory from '../inventory';

const TRIP_DURATION = 5 * 60 * 1000;

export const createShrooms = (label, position) => ({
  name: `Magic Mushrooms ${label}`,
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  collectText: 'Ate some',
  pickUpSFX: 'chewing',
  displayName: 'magic mushrooms',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/magic-mushrooms/', {
      name: this.name,
      displayName: this.displayName,
      onGround: true,
      cameraPosition: { x: 0, y: 0.5, z: 2 },
      scale: 0.06,
    });
    item.activate = (context) => {
      document.body.classList.add('dreamz');
      setTimeout(() => {
        document.body.classList.remove('dreamz');
        inventory.removeItem(this.name);
      }, TRIP_DURATION);
    };
    return item;
  },
});
