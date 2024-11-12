export const iching = [
  // Chapter 1
  {
    name: 'If the wanderer busies himself with trivial things, he draws down misfortune upon himself.',
    position: { lat: -20.44193, lng: -69.52603 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/1.svg', name: this.name, fade: true });
    },
  },
  // Chapter 2
  {
    name: 'The wanderer comes to and inn. He has his property with him. He wins the steadfastness of a young servant.',
    position: { lat: -20.34092, lng: -69.6564 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/2.svg', name: this.name, fade: true });
    },
  },
  // Chapter 3
  {
    name: 'The wanderer\'s inn burns down. He loses the steadfastness of his young servant. Danger.',
    position: { lat: -20.31979, lng: -69.75603 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/3.svg', name: this.name, fade: true });
    },
  },
  // Chapter 4
  {
    name: 'The wanderer rests in a shelter. He obtains his property and an ax. My heart is not glad.',
    position: { lat: -20.27068, lng: -69.78616 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/4.svg', name: this.name, fade: true });
    },
  },
  // Chapter 5
  {
    name: 'He shoots a pheasant. It drops with the first arrow. In the end this brings both praise and office.',
    position: { lat: -20.21041, lng: -69.79597 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/5.svg', name: this.name, fade: true });
    },
  },
  // Chapter 6
  {
    name: 'The bird\'s nest burns up. The wanderer laughs at first, Then must needs lament and weep. Through carelessness he loses his cow. Misfortune.',
    position: { lat: -20.38006, lng: -69.72714 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/6.svg', name: this.name, fade: true });
    },
  },
  // Epilogue
  {
    name: 'Success through smallness. Perseverance brings good fortune to the wanderer.',
    position: { lat: -0.00006, lng: 0.0002 },
    async create(makers) {
      return makers.simpleImage({ src: '/assets/img/lu/full.svg', name: this.name, fade: true });
    },
  },
];
