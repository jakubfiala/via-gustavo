export const embeds = [
  {
    name: 'Mars96',
    collectible: false,
    position: { lat: -20.28906, lng: -69.78257 },
    create(makers) {
      return makers.embed('https://en.wikipedia.org/wiki/Mars_96');
    },
  },
  {
    name: 'La Voz del Hombre Muerto',
    collectible: false,
    position: { lat: -20.20467, lng: -69.798 },
    create(makers) {
      return makers.embed('https://www.youtube.com/embed/videoseries?si=BF5VloQj6h6x37CR&amp;list=PL_KxaQOvvGcCrqyd5bWfnUEqnkVJVjFhQ');
    },
  },
  {
    name: 'Humberstone Wikipedia',
    collectible: false,
    position: { lat: -20.20635, lng: -69.79717 },
    create(makers) {
      return makers.embed('https://en.wikipedia.org/wiki/Humberstone_and_Santa_Laura_Saltpeter_Works');
    },
  },
];
