export const createStationOfTheCross = ({ index, name, position }) => ({
  name,
  position,
  async create(makers) {
    return makers.simpleImage({ src: `/assets/img/via-crucis/${index}.jpg`, name: this.name, fade: true });
  },
});

export const stationsOfTheCross = [
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
];
