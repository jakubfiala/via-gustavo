export const createShrooms = (label, position) => ({
  name: `Magic Mushrooms ${label}`,
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  pickUpSFX: 'chewing',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/magic-mushrooms/', { name: this.name, cameraPosition: { y: 1 }, scale: 1.5 });
    item.activate = (context) => {
      document.body.classList.add('dreamz');
    };
    return item;
  },
});
