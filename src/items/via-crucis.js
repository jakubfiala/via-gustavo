export const createStationOfTheCross = ({ index, name, position }) => ({
  name,
  position,
  thumbnailURL: `/assets/img/via-crucis/${index}.jpg`,
  async create(makers) {
    return makers.simpleImage({ src: this.thumbnailURL, name: this.name, fade: true });
  },
});
