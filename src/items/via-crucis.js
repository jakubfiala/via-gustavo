export const createStationOfTheCross = ({ index, name, position }) => ({
  name,
  position,
  async create(makers) {
    return makers.simpleImage({ src: `/assets/img/via-crucis/${index}.jpg`, name: this.name, fade: true });
  },
});
