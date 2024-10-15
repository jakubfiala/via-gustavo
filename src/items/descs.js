import { createBusStopItem } from './bus.js';
import { initGeigerCounterDetection } from '../../assets/items/geiger-counter/detection.js';
import { createShrooms } from './shrooms.js';

export default [
  // {
  //   name: 'Mars96',
  //   collectible: false,
  //   position: { lat: -20.506417885036914, lng: -69.37627137940446 },
  //   create(makers) {
  //     return makers.embed('https://en.wikipedia.org/wiki/Mars_96');
  //   },
  // },
  // {
  //   name: 'Coke',
  //   thumbnailURL: '/assets/items/coke/thumb.webp',
  //   collectible: true,
  //   position: { lat: -20.209123501104930, lng: -69.795318778912673 },
  //   async create(makers) {
  //     return makers.threeObject('/assets/items/coke/', { name: this.name });
  //   },
  // },
  createBusStopItem({
    position: { lat: -20.43098, lng: -69.56023 },
    destination: {
      locationName: 'La Tirana',
      // -20.3412425,-69.6565267,3a,75y,352.81h,85.98t
      latLng: {
        lat: -20.3412425,
        lng: -69.6565267,
      },
      pov: { heading: 352.81, pitch: 85.98 },
    },
    cameraPosition: { x: -8, y: 3.5 },
    scale: 0.8,
  }),
  // {
  //   name: 'RR',
  //   collectible: false,
  //   position: { lat: -20.506171507511695, lng: -69.37666966949742 },
  //   create(makers) {
  //     return makers.embed('https://www.youtube.com/embed/dQw4w9WgXcQ?si=OcFZaAlJ66kC5-T7');
  //   },
  // },
  // {
  //   name: 'Mapsception',
  //   collectible: false,
  //   position: { lat: -20.50669, lng: -69.375954656838076 },
  //   create(makers) {
  //     return makers.embed('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d372.91442031695556!2d-69.81590167423839!3d-20.187049561492504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915237000d0aa3d3%3A0xbb3391a4b788961!2sGeoglifo%20Humberstone!5e1!3m2!1sen!2sbe!4v1724752820012!5m2!1sen!2sbe');
  //   },
  // },
  // {
  //   name: 'Geiger Counter',
  //   thumbnailURL: '/assets/items/geiger-counter/thumb.webp',
  //   collectible: true,
  //   handheld: true,
  //   canBeActivated: true,
  //   position: {
  //     lat: -20.468511343004337,
  //     lng: -69.458480041388709,
  //   },
  //   async create(makers) {
  //     const item = makers.threeObject('/assets/items/geiger-counter/', { name: this.name, cameraPosition: { x: 8, y: 2, z: -6 } });
  //     item.activate = async (context) => {
  //       console.log('geiger counter activated', !!map);
  //       initGeigerCounterDetection(context.map, context.audioContext, new google.maps.LatLng({
  //         lat: -20.467868891278783,
  //         lng: -69.459964265975231,
  //       }));
  //     };

  //     return item;
  //   },
  // },
  {
    thumbnailURL: '/assets/img/tarot/judgement.jpg',
    name: 'Tarot Card - Judgement',
    collectible: true,
    position: { lat: -20.445812, lng: -69.5168 },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/14.jpg',
    name: 'XIV - Laid in his tomb',
    collectible: true,
    position: {
      lat: -20.33616,
      lng: -69.65671,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/13.jpg',
    name: 'XIII - Taken down from the cross',
    collectible: true,
    position: {
      lat: -20.33532,
      lng: -69.659,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/12.jpg',
    name: 'XII - Dies on the cross',
    collectible: true,
    position: {
      lat: -20.33353,
      lng: -69.66675,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/11.jpg',
    name: 'XI - Nailed to the cross',
    collectible: true,
    position: {
      lat: -20.33263,
      lng: -69.6745,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/10.jpg',
    name: 'X - His clothes are torn',
    collectible: true,
    position: {
      lat: -20.3319,
      lng: -69.68088,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/09.jpg',
    name: 'IX - Fails the third time',
    collectible: true,
    position: {
      lat: -20.33094,
      lng: -69.68898,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  {
    thumbnailURL: '/assets/img/via-crucis/08.jpg',
    name: 'VIII - Meets the women of Jerusalem',
    collectible: true,
    position: {
      lat: -20.33004,
      lng: -69.69689,
    },
    async create(makers) {
      return makers.card({ src: this.thumbnailURL, name: this.name });
    },
  },
  createShrooms('1', {
    lat: -20.43544,
    lng: -69.54638,
  }),
  createShrooms('2', {
    lat: -20.43526,
    lng: -69.54645,
  }),
];
