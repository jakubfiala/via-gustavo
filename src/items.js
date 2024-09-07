import createTeapotMesh from '/assets/items/teapot/mesh.js';
import { THREEObjectMaker } from './3d-objects/index.js';
import { embedMaker } from './embeds/index.js';
import Inventory from './inventory/index.js';
import { loadGLTF } from './3d-objects/gltf.js';
import { START_POSITION } from './constants.js';
import { createBusStopItem } from './bus.js';
import { initGeigerCounterDetection } from '../assets/items/geiger-counter/detection.js';

const itemDescs = [
  {
    name: 'Teapot',
    collectible: true,
    thumbnailURL: '/assets/items/teapot/thumb.webp',
    position: START_POSITION,
    create(makers) {
      return makers.threeObject(createTeapotMesh());
    },
  },
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
    position: { lat: -20.506808759909188, lng: -69.37564029846219 },
    async create(makers) {
      return makers.threeObject(await loadGLTF('/assets/items/coke/'));
    },
  },
  createBusStopItem({
    position: { lat: -20.50669, lng: -69.37579679565727 },
    destination: {
      locationName: 'Geoglifos de Pintados',
      latLng: { lat: -20.6214391, lng: -69.662639 },
      pov: { heading: 23.53, pitch: 3 },
    },
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
    position: { lat: -20.50685, lng: -69.37564029846219 },
    async create(makers) {
      const item = makers.threeObject(await loadGLTF('/assets/items/geiger-counter/'));
      item.activate = async (map, audioContext) => {
        console.log('geiger counter activated', !!map);
        initGeigerCounterDetection(map, audioContext, new google.maps.LatLng({ lat: -20.506171507511695, lng: -69.37666966949742 }));
      };

      return item;
    },
  },
];

const handheldContainer = document.getElementById('handheld-item');

const setHandheldItem = (item, map, audioContext) => {
  if (item.canvas) {
    handheldContainer.appendChild(item.canvas);
    item.reset();
    item.activate?.(map, audioContext);
    item.isBeingHeld = true;
  }
};

const initItem = (makers) => async (map, desc, audioContext) => {
  const item = await desc.create(makers);
  item.insert(map, desc.position);

  if (desc.onClick) {
    item.info.content.addEventListener('click', () => desc.onClick(map, item));
  }

  if (desc.collectible) {
    item.info.content.addEventListener('click', () => {
      Inventory.addItem(desc);

      if (desc.handheld) {
        setHandheldItem(item, map, audioContext);
      }

      item.info.close();
    });
  }

  return item;
};

export default async (StreetViewLibrary, map, audioContext) => {
  const makers = {
    threeObject: THREEObjectMaker(StreetViewLibrary),
    embed: embedMaker(StreetViewLibrary),
  };

  const items = [];

  for (const desc of itemDescs) {
    if (Inventory.hasItem(desc.name)) {
      if (desc.handheld) {
        const item = await desc.create(makers);
        setHandheldItem(item, map, audioContext);
      }

      continue;
    }

    const init = initItem(makers);
    items.push(await init(map, desc, audioContext));
  }

  return items;
};
