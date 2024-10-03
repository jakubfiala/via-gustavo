import { loadGLTF } from './3d-objects/gltf.js';
import { createBusStopItem } from './bus.js';
import { initGeigerCounterDetection } from '../../assets/items/geiger-counter/detection.js';

export default [
  {
    name: 'Mars96',
    collectible: false,
    position: { lat: -20.506417885036914, lng: -69.37627137940446 },
    create(makers) {
      return makers.embed('https://en.wikipedia.org/wiki/Mars_96');
    },
  },
  {
    name: 'Coke',
    thumbnailURL: '/assets/items/coke/thumb.webp',
    collectible: true,
    position: {
      lat: -20.467868891278783,
      lng: -69.459964265975231,
    },
    async create(makers) {
      return makers.threeObject(await loadGLTF('/assets/items/coke/'), { name: 'Coke' });
    },
  },
  createBusStopItem({
    position: { lat: -20.465831125863527, lng: -69.465165895362929 },
    destination: {
      // -20.6149262,-69.6215191,3a,21.3y,246.1h,85.51t
      locationName: 'Geoglifos de Pintados',
      latLng: { lat: -20.6149262, lng: -69.6215191 },
      pov: { heading: 244.88262499989355, pitch: -0.6144093248599347, zoom: 1.679122777824333 },
    },
    cameraPosition: { y: 3.5 },
    scale: 0.8,
  }),
  {
    name: 'RR',
    collectible: false,
    position: { lat: -20.506171507511695, lng: -69.37666966949742 },
    create(makers) {
      return makers.embed('https://www.youtube.com/embed/dQw4w9WgXcQ?si=OcFZaAlJ66kC5-T7');
    },
  },
  {
    name: 'Mapsception',
    collectible: false,
    position: { lat: -20.50669, lng: -69.375954656838076 },
    create(makers) {
      return makers.embed('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d372.91442031695556!2d-69.81590167423839!3d-20.187049561492504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915237000d0aa3d3%3A0xbb3391a4b788961!2sGeoglifo%20Humberstone!5e1!3m2!1sen!2sbe!4v1724752820012!5m2!1sen!2sbe');
    },
  },
  {
    name: 'Geiger Counter',
    thumbnailURL: '/assets/items/geiger-counter/thumb.webp',
    collectible: true,
    handheld: true,
    position: {
      lat: -20.468511343004337,
      lng: -69.458340041388709,
    },
    async create(makers) {
      const item = makers.threeObject(await loadGLTF('/assets/items/geiger-counter/'), { name: 'Geiger Counter', cameraPosition: { x: 8, y: 2, z: -6 } });
      item.activate = async (map, audioContext) => {
        console.log('geiger counter activated', !!map);
        initGeigerCounterDetection(map, audioContext, new google.maps.LatLng({
          lat: -20.467868891278783,
          lng: -69.459964265975231,
        }));
      };

      return item;
    },
  },
];
