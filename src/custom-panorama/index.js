const OWN_COPYRIGHT = 'Imagery (c) 2024 Jakub Fiala';

const WORLD_W = 6694;
const WORLD_H = 3347;
const TILE_SIZE = 558;

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

const createCustomPanorama = (pano, latLng, sizes) => (entry) => ({
  location: {
    pano,
    description: '',
    latLng,
  },
  links: [
    {
      heading: 70,
      description: 'Back to the real world',
      pano: entry.location.pano,
    },
  ],
  copyright: OWN_COPYRIGHT,
  tiles: {
    ...sizes,
    centerHeading: 105,
    getTileUrl,
  },
});

export const initCustomPanorama = async (context) => {
  const service = new context.google.StreetViewService();
  const { data: entryPanorama } = await service.getPanorama({ location: { lat: -20.29136, lng: -69.78151 } });
  console.info('[custom-panorama]', 'got entry panorama', entryPanorama);

  const sizes = {
    tileSize: new context.google.Size(TILE_SIZE, TILE_SIZE),
    worldSize: new context.google.Size(WORLD_W, WORLD_H),
  };

  const ddsOffice = createCustomPanorama(
    'dds-office',
    new context.google.LatLng(-20.28817, -69.78392),
    sizes,
  )(entryPanorama);

  const customPanoramas = {
    'dds-office': ddsOffice,
  };

  context.map.registerPanoProvider((name) => customPanoramas[name] ?? null);
  context.map.addListener('links_changed', () => {
    if (map.getPano() === entryPanorama.location.pano) {
      const link = {
        pano: 'dds-office',
        description: '',
        heading: 255,
      };

      console.info('[custom-panorama]', 'adding link', link);

      map.getLinks().push(link);
    }
  });
}
