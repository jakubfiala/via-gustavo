import { createBusStopItem } from './bus.js';
import { initGeigerCounterDetection } from '../../assets/items/geiger-counter/detection.js';
import { createTarotCardItem } from './tarot/index.js';
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
      latLng: { lat: -20.3348426, lng: -69.6595644 },
      pov: { heading: 138.431316898245541, pitch: -4.065105711230174 },
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
  createTarotCardItem({
    position: { lat: -20.445812, lng: -69.5168 },
    card: 'judgement',
  }),
  createShrooms('1', {
    lat: -20.43544,
    lng: -69.54638,
  }),
  createShrooms('2', {
    lat: -20.43526,
    lng: -69.54645,
  }),
];
