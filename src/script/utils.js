import { disableCruiseControl } from '../cruise-control.js';

export const enableSFX = (context) => {
  console.info('[script]', 'enabling SFX', context.sfxGain);
  if (context.sfxGain) {
    context.sfxGain.gain.value = 1;
  }
};

export const disableClickToGoCB = G => {
  G.map.setOptions({ clickToGo: false, showRoadLabels: false, linksControl: false });
  disableCruiseControl(G);
};

export const enableClickToGoCB = context => {
  context.map.setOptions({ clickToGo: true, showRoadLabels: true, linksControl: true });
};

export const disableZoom = context => {
  context.map.setOptions({ scrollwheel: false });
};

export const enableZoom = context => {
  context.map.setOptions({ scrollwheel: true });
};

export const flashStatus = (text, duration = 5) => context => {
  context.statusContainer.innerText = text;
  context.statusContainer.classList.add('fade-in');
  setTimeout(() => {
    context.statusContainer.innerText = '';
    context.statusContainer.classList.remove('fade-in');
  }, duration * 1000);
};

export const createKeyElement = key => `<span class="help-keys__key">${key}</span>`;

export const showHelpMessage = (text, keys = [], duration = 5) => context => {
  context.helpContainer.innerHTML = `
    <div class="help-keys">${keys.map(createKeyElement).join('')}</div>
    <div>${text}</div>
  `;
  context.helpContainer.classList.add('fade-in');

  setTimeout(() => {
    context.helpContainer.innerHTML = '';
    context.helpContainer.classList.remove('fade-in');
  }, duration * 1000);
};

export const showFakeCaptcha = (callback = () => {}) => context => {
  disableClickToGoCB(context);

  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = false;

  captcha.checkbox.addEventListener('click', e => callback(e, context), { once: true });
  captcha.checkbox.addEventListener('click', () => enableClickToGoCB(context), { once: true });
}

export const hideFakeCaptcha = context => {
  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = true;
}

export const updateSoundTrackVolume = volume => context => {
  const { masterGain, audioContext } = context;
  masterGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 7);
}

export const fadeInSoundTrack = updateSoundTrackVolume(1);
export const fadeOutSoundTrack = updateSoundTrackVolume(0);

export const toast = (text) => {
  const toast = document.getElementById('toast');
  toast.innerText = text;
  toast.hidden = false;

  setTimeout(() => toast.hidden = true, 5000);
};

export const persistenceToast = () => toast('💾  Your location is being saved continuously.');
