import { extraLinks } from './extra-links.js';
import { getLimboPano, getLimboPanoIndex } from './limbo.js';

const OWN_COPYRIGHT = 'Imagery (c) 2024 Jakub Fiala';

const WORLD_W = 8192;
const WORLD_H = 4096;
const TILE_SIZE = 683;

const gustavoPosition = { lat: -20.28817, lng: -69.78392 };

const tileDimensionsForZoom = {
  4: { x: 12, y: 6 },
  3: { x: 6, y: 3 },
  2: { x: 3, y: 2 },
  1: { x: 2, y: 1 },
  0: { x: 1, y: 1 },
};

const getTileUrl = (pano, zoom, x, y) => {
  let dir = pano;
  if (pano.startsWith('limbo')) {
    dir = `limbo${getLimboPanoIndex(pano)}`;
  }

  const dim = tileDimensionsForZoom[zoom];
  const index = Math.floor(y * dim.x + x);
  return `/assets/img/panoramas/${dir}/z${zoom}-i${index}.jpg`;
}

const panoMaker = (context, sizes) => (pano, links, { position, centerHeading = 160 } = {}) => ({
  location: {
    pano,
    description: '',
    latLng: new context.google.LatLng(position.lat, position.lng),
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
  const createPano = panoMaker(context, {
    tileSize: new context.google.Size(TILE_SIZE, TILE_SIZE),
    worldSize: new context.google.Size(WORLD_W, WORLD_H),
  });

  const fixedPanos = {
    gustavoDissolve4: createPano(
      'gustavoDissolve4', [{ pano: 'limbo1', heading: 63 }], { position: gustavoPosition }),
    gustavoDissolve3: createPano(
      'gustavoDissolve3', [{ pano: 'gustavoDissolve4', heading: 63 }], { position: gustavoPosition }),
    gustavoDissolve2: createPano(
      'gustavoDissolve2', [{ pano: 'gustavoDissolve3', heading: 63 }], { position: gustavoPosition }),
    gustavoDissolve1: createPano(
      'gustavoDissolve1', [{ pano: 'gustavoDissolve2', heading: 63 }], { position: gustavoPosition }),
    dds: createPano(
      'dds', [{ pano: 'o9mETUVAgxbqquXFtBWFLw', heading: 260 }], { position: { lat: 41.378310, lng: 2.132984 } }),
    exitLimbo4: createPano(
      'exitLimbo4', [{ pano: 'exitLimbo5', heading: 260 }], { position: { lat: 1, lng: 0.0004 } }),
    exitLimbo5: createPano(
      'exitLimbo5', [{ pano: 'exitLimbo6', heading: 260 }], { position: { lat: 1, lng: 0.0005 }, centerHeading: 260 }),
    exitLimbo6: createPano(
      'exitLimbo6', [{ pano: 'end', heading: 260 }], { position: { lat: 1, lng: 0.0006 }, centerHeading: 260 }),
    end: createPano(
      'exitLimbo6', [], { position: { lat: 1, lng: 1 }, centerHeading: 260}),
  };

  context.map.registerPanoProvider((name) => {
    if (name.startsWith('limbo')) {
      return getLimboPano(createPano, name);
    }

    return fixedPanos[name] ?? null;
  });

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
