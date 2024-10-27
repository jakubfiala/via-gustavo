let panorama;
// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
let outsideGoogle;

const createCustomPanorama = (entry) => ({
  location: {
    pano: "reception", // The ID for this custom panorama.
    description: "Google Sydney - Reception",
    latLng: new google.maps.LatLng(-33.86684, 151.19583),
  },
  links: [
    {
      heading: 70,
      description: "Back to the real world",
      pano: entry.location.pano,
    },
  ],
  copyright: "Imagery (c) 2010 Google",
  tiles: {
    tileSize: new google.maps.Size(1024, 512),
    worldSize: new google.maps.Size(2048, 1024),
    centerHeading: 105,
    getTileUrl: function (zoom, tileX, tileY) {
      return (
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/" +
        "panoReception1024-" +
        zoom +
        "-" +
        tileX +
        "-" +
        tileY +
        ".jpg"
      );
    },
  },
});

export const initCustomPanorama = async (context) => {
  const service = new context.google.StreetViewService();
  const { data: entryPanorama } = await service.getPanorama({ location: { lat: -20.29136, lng: -69.78151 } });
  console.info('[custom-panorama]', 'got entry panorama', entryPanorama);

  const customPanorama = createCustomPanorama(entryPanorama);
  const customPanoramas = {
    customPanorama,
  };

  context.map.registerPanoProvider((name) => customPanoramas[name] ?? null);
  context.map.addListener('links_changed', () => {
    if (map.getPano() === entryPanorama.location.pano) {
      const link = {
        pano: 'customPanorama',
        description: 'Jakubs special world',
        heading: 255,
      };

      console.info('[custom-panorama]', 'adding link', link);

      map.getLinks().push(link);
    }
  });
}
