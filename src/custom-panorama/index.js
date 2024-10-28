const OWN_COPYRIGHT = 'Imagery (c) 2024 Jakub Fiala';

const WORLD_W = 4096;
const WORLD_H = 2048;
const TILE_SIZE = 342;

const GUSTAVO_ENTRY_PANO = 'saEVtxCMSAzSNAbh-LFpVQ';

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

const panoMaker = (latLng, sizes) => (pano, next) => ({
  location: {
    pano,
    description: '',
    latLng,
  },
  links: [
    {
      heading: 63,
      description: '',
      pano: next,
    },
  ],
  copyright: OWN_COPYRIGHT,
  tiles: {
    ...sizes,
    centerHeading: 160,
    getTileUrl,
  },
});

export const initCustomPanorama = async (context) => {
  const createPano = panoMaker(
    new context.google.LatLng(-20.28817, -69.78392),
    {
      tileSize: new context.google.Size(TILE_SIZE, TILE_SIZE),
      worldSize: new context.google.Size(WORLD_W, WORLD_H),
    },
  )

  const limbo = createPano('limbo', '');
  const gustavoDissolve5 = createPano('gustavoDissolve5', 'limbo');
  const gustavoDissolve4 = createPano('gustavoDissolve4', 'gustavoDissolve5');
  const gustavoDissolve3 = createPano('gustavoDissolve3', 'gustavoDissolve4');
  const gustavoDissolve2 = createPano('gustavoDissolve2', 'gustavoDissolve3');
  const gustavoDissolve1 = createPano('gustavoDissolve1', 'gustavoDissolve2');

  gustavoDissolve1.links.push({
    heading: 200,
    description: 'Back to the real world',
    pano: GUSTAVO_ENTRY_PANO,
  });

  const customPanoramas = {
    gustavoDissolve1,
    gustavoDissolve2,
    gustavoDissolve3,
    gustavoDissolve4,
    gustavoDissolve5,
    limbo,
  };

  context.map.registerPanoProvider((name) => customPanoramas[name] ?? null);
  context.map.addListener('links_changed', () => {
    if (map.getPano() === GUSTAVO_ENTRY_PANO) {
      const link = {
        pano: 'gustavoDissolve1',
        description: '',
        heading: 63,
      };

      console.info('[custom-panorama]', 'adding link', link);

      map.getLinks().push(link);
    }
  });
}
