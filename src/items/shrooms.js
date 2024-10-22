const TRIP_DURATION = 5 * 60 * 1000;

export const createShrooms = (label, position) => ({
  name: `Magic Mushrooms ${label}`,
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  pickUpSFX: 'chewing',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/magic-mushrooms/', {
      name: this.name,
      onGround: true,
      scale: 0.3,
      cameraPosition: { x: 0, y: 0.5, z: 2 },
    });
    item.activate = (context) => {
      document.body.classList.add('dreamz');
      setTimeout(() => document.body.classList.remove('dreamz'), TRIP_DURATION);
    };
    return item;
  },
});
