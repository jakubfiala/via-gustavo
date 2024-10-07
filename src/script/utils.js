export const enableSFX = (context) => {
  console.log('enabling SFX', context.sfxGain);
  if (context.sfxGain) {
    context.sfxGain.gain.value = 1;
  }
};

export const enableClickToGoCB = context => {
  context.map.setOptions({ clickToGo: true, showRoadLabels: true });
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
  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = false;
  const listener = e => {
    callback(e, context);
    captcha.checkbox.removeEventListener('click', listener);
  };

  captcha.checkbox.addEventListener('click', listener);
}

export const hideFakeCaptcha = context => {
  const captcha = context.fakeCaptchas[0];
  captcha.element.hidden = true;
}

export const updateSoundTrackVolume = volume => context => {
  console.log('sound', volume);
  const { masterGain, audioContext } = context;
  masterGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 7);
}

export const fadeInSoundTrack = updateSoundTrackVolume(1);
export const fadeOutSoundTrack = updateSoundTrackVolume(0);
