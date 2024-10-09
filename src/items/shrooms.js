export const createShrooms = (label, position) => ({
  name: `Magic Mushrooms ${label}`,
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  async create(makers) {
    const item = makers.threeObject('/assets/items/magic-mushrooms/', { name: this.name, cameraPosition: { y: 1 }, scale: 1.5 });
    item.activate = (context) => {
      context.sfx.chewing();
      document.body.classList.add('dreamz');
    };
    return item;
  },
});
