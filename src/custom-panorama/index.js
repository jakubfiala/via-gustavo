import { extraLinks } from './extra-links.js';

const OWN_COPYRIGHT = 'Imagery (c) 2024 Jakub Fiala';

const WORLD_W = 8192;
const WORLD_H = 4096;
const TILE_SIZE = 683;

// const GUSTAVO_ENTRY_PANO = 'saEVtxCMSAzSNAbh-LFpVQ';

const tileDimensionsForZoom = {
  4: { x: 12, y: 6 },
  3: { x: 6, y: 3 },
  2: { x: 3, y: 2 },
  1: { x: 2, y: 1 },
  0: { x: 1, y: 1 },
};

const getTileUrl = (pano, zoom, x, y) => {
  const dim = tileDimensionsForZoom[zoom];
  const index = Math.floor(y * dim.x + x);
  return `/assets/img/panoramas/${pano}/z${zoom}-i${index}.jpg`;
}

const panoMaker = (sizes) => (pano, links, { latLng, centerHeading = 160 } = {}) => ({
  location: {
    pano,
    description: '',
    latLng,
  },
  links,
  copyright: OWN_COPYRIGHT,
  tiles: {
    ...sizes,
    centerHeading,
    getTileUrl,
  },
});

export const initCustomPanorama = async (context) => {
  const createPano = panoMaker({
    tileSize: new context.google.Size(TILE_SIZE, TILE_SIZE),
    worldSize: new context.google.Size(WORLD_W, WORLD_H),
  });

  const gustavoLatLng = new context.google.LatLng(-20.28817, -69.78392);

  const customPanoramas = {
    gustavoDissolve4: createPano(
      'gustavoDissolve4', [{ pano: 'limbo1', heading: 63 }], { latLng: gustavoLatLng }),
    gustavoDissolve3: createPano(
      'gustavoDissolve3', [{ pano: 'gustavoDissolve4', heading: 63 }], { latLng: gustavoLatLng }),
    gustavoDissolve2: createPano(
      'gustavoDissolve2', [{ pano: 'gustavoDissolve3', heading: 63 }], { latLng: gustavoLatLng }),
    gustavoDissolve1: createPano(
      'gustavoDissolve1', [{ pano: 'gustavoDissolve2', heading: 63 }], { latLng: gustavoLatLng }),

    limbo1: createPano(
      'limbo1',
      [{ pano: 'limbo2', heading: 260 }, { pano: 'limbo3', heading: 80 }],
      { centerHeading: 260, latLng: new context.google.LatLng(0, 0.0001) },
    ),
    limbo2: createPano(
      'limbo2',
      [{ pano: 'limbo3', heading: 260 }, { pano: 'limbo1', heading: 80 }],
      { centerHeading: 260, latLng: new context.google.LatLng(0, 0.0002) },
    ),
    limbo3: createPano(
      'limbo3',
      [{ pano: 'limbo1', heading: 260 }, { pano: 'limbo2', heading: 80 }],
      { centerHeading: 260, latLng: new context.google.LatLng(0, 0.0003) },
    ),

    dds: createPano(
      'dds', [{ pano: 'o9mETUVAgxbqquXFtBWFLw', heading: 260 }], { latLng: new context.google.LatLng(41.378310, 2.132984) }),
  };

  context.map.registerPanoProvider((name) => customPanoramas[name] ?? null);
  context.map.addListener('links_changed', () => {
    if (map.getPano() in extraLinks) {
      const link = extraLinks[map.getPano()];
      const links = map.getLinks();

      if (link.replace) {
        const toRemoveIndex = links.findIndex(({ pano }) => pano === link.replace);
        if (toRemoveIndex >= 0) {
          links.splice(toRemoveIndex, 1);
        }
      }

      links.push(link);
    }
  });
}
