export const createCoke = ({ name, position, rotation = {} }) => ({
  name,
  thumbnailURL: '/assets/items/coke/thumb.webp',
  collectible: true,
  position,
  async create(makers) {
    return makers.threeObject('/assets/items/coke/',
      { name: this.name, onGround: true, scale: 0.08, rotation, cameraPosition: { x: 0, y: 0.5, z: 1 } },
    );
  },
});
