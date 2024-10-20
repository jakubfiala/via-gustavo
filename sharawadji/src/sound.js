import { latLngDist } from './utils.js';

const MIX_TRANS_TIME = 1;
const PLAY_DISTANCE_THRESHOLD = 300;
const LOAD_DISTANCE_THRESHOLD = PLAY_DISTANCE_THRESHOLD + 20;

class Sound {
  constructor(context, data, map, destination, options) {
    const { debug } = options;

    this.debug = debug;
    this.data = data;
    this.map = map;
    this.state = Sound.state.IDLE;

    const { src, lat, lng, loop } = data;
    this.position = new google.maps.LatLng(lat, lng);
    this.src = src;
    this.loop = loop;

    if (debug) {
      this.marker = new google.maps.Marker({
        title: `${this.data.name} – ${(new Date(data.timestamp)).toLocaleString()}`,
        position: this.position,
        map
      });
    }

    this.context = context;
    this.destination = destination;

    this.updateMix(1);
  }

  static get state() {
    return {
      IDLE: 0,
      LOADING: 1,
      PLAYING: 2,
      SUSPENDED: 3
    };
  }

  createFXGraph() {
    this.panner = new PannerNode(this.context);
    this.panner.panningModel = 'HRTF';
    this.panner.distanceModel = 'linear';
    this.panner.positionX.value = this.position.lat();
    this.panner.positionY.value = this.position.lng();

    this.filter = new BiquadFilterNode(this.context);
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 22000;

    this.gain = new GainNode(this.context);
    this.gain.gain.setValueAtTime(0, this.context.currentTime);

    this.panner.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(this.destination);

    this.processingChainStart = this.panner;
  }

  start() {
    this.source = new AudioBufferSourceNode(this.context);
    this.source.loop = this.loop;
    this.source.buffer = this.buffer;
    this.source.connect(this.processingChainStart);
    this.source.start(this.context.currentTime);
    this.state = Sound.state.PLAYING;
  }

  suspend() {
    this.source.disconnect();
    this.state = Sound.state.SUSPENDED;
  }

  async load() {
    this.state = Sound.state.LOADING;
    const response = await fetch(this.src);
    const soundData = await response.arrayBuffer();
    if (this.debug) console.info(`loading ${this.src}`);

    try {
      // iOS Safari still doesn't support dAD with promises ¯\_(ツ)_/¯
      const buffer = await this.context.decodeAudioData(
        soundData,
      );

      if (this.debug) console.info(`loaded`, this.src, buffer, this.loaded);
      this.buffer = buffer;
      this.createFXGraph();
      this.state = Sound.state.SUSPENDED;
      this.playIfNear();
    } catch(e) {
      console.warn(`Couldn't decode ${this.src}`);
    }
  }

  playIfNear() {
    const userPosition = this.map.getPosition();
    // Calculate distance between user and sound
    const distance = latLngDist(this.position, userPosition);

    switch(this.state) {
      case Sound.state.LOADING:
        return false;
      case Sound.state.PLAYING:
        if (distance >= PLAY_DISTANCE_THRESHOLD) {
          console.info('[sharawadji]', 'suspending', this.data.name);
          this.suspend();
          return false;
        }
        break;
      case Sound.state.SUSPENDED:
        if (distance < PLAY_DISTANCE_THRESHOLD) {
          console.info('[sharawadji]', 'starting', this.data.name);
          this.start();
        } else {
          return false;
        }
        break;
      case Sound.state.IDLE:
      default:
        if (distance < LOAD_DISTANCE_THRESHOLD) {
          try {
            this.load();
          } catch(e) {
            console.warn(`Couldn't load ${this.src}`);
          }
          return false;
        } else {
          return false;
        }
        break;
    }

    return distance;
  }

  updateMix(gain) {
    const distance = this.playIfNear();
    if (distance === false) return;

    // Calculate new volume based on distance
    const targetVolume = Sound.volumeForDistance(distance, this.data.db) * gain;
    // Set new volume
    this.gain.gain
      .linearRampToValueAtTime(targetVolume, this.context.currentTime + MIX_TRANS_TIME);
  }

  static volumeForDistance(distance, amplitude) {
    // Calculate volume by using Inverse Square Law
    const volume = 1 / distance ** 2;
    // Multiply distance volume by amplitude of sound (apply ceiling max of 1)
    return Math.min(volume * amplitude, 1);
  };
}

export { Sound };
