export const takeTheBus = (map, { locationName, latLng, pov }) => {
  const agree = confirm(`Are you ready to take the bus to ${locationName}?`)
  if (agree) {
    const overlay = document.getElementById('bus-overlay');
    const audio = document.getElementById('bus-audio');

    overlay.hidden = false;
    audio.play();

    overlay.addEventListener('transitionend', () => {
      map.setPosition(latLng);
      map.setPov(pov);
    }, { once: true });

    audio.addEventListener('ended', () => {
      overlay.hidden = true;
    }, { once: true });
  }
};
