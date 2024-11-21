import { Sound } from './sound.js';
import { throttle } from './utils.js';
import { calculateListenerOrientation } from './panner-utils.js';

const ATTENUATION_TARGET = 60;

class Sharawadji {
	constructor(sounds, panorama, options) {
		if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
			throw new Error('Your browser does not support the Web Audio API');
		} else {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
		}

		if (!('google' in window)) {
			throw new Error(
				'Cannot find the Google Maps API. Make sure you\'ve included it in your HTML.');
		}

		const { debug, compressor } = options;

		this.panorama = panorama;

		this.audioContext = new AudioContext();
		this.masterGain = this.audioContext.createGain();

		this.sounds = sounds.map(s => new Sound(this.audioContext, s, panorama, this.masterGain, { debug }));

		if (compressor) {
			this.compressor = this.audioContext.createDynamicsCompressor();
			this.compressor.threshold.setValueAtTime(-50, this.audioContext.currentTime);
			this.compressor.knee.setValueAtTime(40, this.audioContext.currentTime);
			this.compressor.ratio.setValueAtTime(20, this.audioContext.currentTime);
			this.compressor.attack.setValueAtTime(0.3, this.audioContext.currentTime);
			this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);

			this.masterGain.connect(this.compressor);
			this.compressor.connect(this.audioContext.destination);
		} else {
			this.masterGain.connect(this.audioContext.destination);
		}

		this.updateMix = this.updateMix.bind(this);

		google.maps.event.addListener(panorama, 'pano_changed', throttle(this.updateMix, 100));
    google.maps.event.addListener(panorama, 'position_changed', throttle(this.updateMix, 100));
    google.maps.event.addListener(panorama, 'pov_changed', throttle(this.updateMix, 100));
	}

	updateMix() {
		const userPosition = this.panorama.getPosition();
		const userPov = this.panorama.getPov();

		if (this.audioContext.listener.positionX) {
			this.audioContext.listener.positionX.value = userPosition.lat();
			this.audioContext.listener.positionY.value = userPosition.lng();
    } else {
			this.audioContext.listener.setPosition(userPosition.lat(), userPosition.lng(), 0);
		}

		const { forward, up } = calculateListenerOrientation(userPov.heading, userPov.pitch, 0);

		if (this.audioContext.listener.forwardX) {
			this.audioContext.listener.forwardX.value = forward.x;
			this.audioContext.listener.forwardY.value = forward.y;
			this.audioContext.listener.forwardZ.value = forward.z;
			this.audioContext.listener.upX.value = up.x;
			this.audioContext.listener.upY.value = up.y;
			this.audioContext.listener.upZ.value = up.z;
		} else {
			this.audioContext.listener.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
		}

		const activeSoundsCount = this.sounds.filter(s => s.state === Sound.state.PLAYING).length;

		const attenuation = Math.max(Math.min(activeSoundsCount / ATTENUATION_TARGET, 0.7), 0);
		this.sounds.forEach(s => s.updateMix(1 - attenuation));
	}

	getSoundByName(name) {
		return this.sounds.find((sound) => sound.data.name === name);
	}
};

window.Sharawadji = Sharawadji;

export { Sharawadji };
