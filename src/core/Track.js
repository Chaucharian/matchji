import { Audio } from "expo-av";

const audioFiles = { 
  ["match"]: require('../assets/match.mp3'), 
  ["tap"]: require('../assets/tap.mp3'), 
}
class Track {
  constructor(id) {
    this._id = id;
    this._sound = new Audio.Sound();
    this._fadeTimeout = null;
    this._loopHandlerWorking;

    this.status = {
      loaded: false,
      pauseTime: 0,
      volume: 1,
    };
  }

  load() {
    return new Promise(async (resolve, reject) => {
      const { _sound, _id, status } = this;

      try {
        await _sound.loadAsync(audioFiles[_id]);
        status.loaded = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  unload() {
    return new Promise(async (resolve, reject) => {
      const { _sound, status } = this;

      try {
        status.loaded = false;
        await _sound.unloadAsync();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  setVolume(volume) {
    return new Promise(async (resolve, reject) => {
      const { _sound, status } = this;

      if (!status.loaded) return resolve();

      try {
        await _sound.setVolumeAsync(volume);
        status.volume = volume;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  setCurrentTime(time) {
    return new Promise(async (resolve, reject) => {
      const { _sound, status } = this;

      if (!status.loaded) return resolve();

      try {
        await _sound.setStatusAsync({ positionMillis: time });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  play(params = {}) {
    return new Promise(async (resolve, reject) => {
      const { loop = true, continueFromPreviousPosition = true, volume = 1 } = params;
      try {
        if (!this.status.loaded) {
          await this.load();
        }

        const shouldFadeIn =
          continueFromPreviousPosition && this.status.pauseTime !== 0 ? true : false;
        await this.setCurrentTime(
          continueFromPreviousPosition ? this.status.pauseTime : 0
        );
        await this.setVolume(shouldFadeIn ? 0 : volume);

        await this._sound.playAsync();
        if (shouldFadeIn) {
          await this.fade(volume);
        }

        // if (loop) {
        //   await this.setTrackToLooping();
        // }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  pause() {
    return new Promise(async (resolve, reject) => {
      const { _sound, status, fade, unload } = this;

      if (!status.loaded) return resolve();

      try {
        const { positionMillis } = await _sound.getStatusAsync();
        status.pauseTime = positionMillis ? positionMillis : 0;
        await fade(0);
        await unload();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  stop() {
    return new Promise(async (resolve, reject) => {
      const { fade, unload, status, _sound } = this;

      if (!status.loaded) return resolve();

      try {
        const { isPlaying } = await _sound.getStatusAsync();

        if (isPlaying) {
          await fade(0);
        }

        await unload();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  fade(toVolume) {
    return new Promise((resolve, reject) => {
      const { status, _fadeTimeout, setVolume } = this;

      if (status.volume === toVolume) return;

      if (_fadeTimeout) {
        clearTimeout(_fadeTimeout);
      }

      const start = Math.floor(status.volume * 10);
      const end = toVolume * 10;
      let currVolume = start;

      const loop = async () => {
        if (currVolume !== end) {
          start < end ? currVolume++ : currVolume--;
          await setVolume(currVolume / 10);
          this._fadeTimeout = setTimeout(loop, 150);
        } else {
          clearTimeout(_fadeTimeout);
          this._fadeTimeout = null;
          resolve();
        }
      };

      this._fadeTimeout = setTimeout(loop, 5);
    });
  }

  setTrackToLooping() {
    new Promise(async (resolve, reject) => {
      try {
        this._loopHandlerWorking = false;
        await this._sound.setOnPlaybackStatusUpdate(this._loopHandler);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async _loopHandler(status) {
    const { isLoaded, isPlaying, durationMillis, positionMillis, volume } =
      status;

    if (
      !this._loopHandlerWorking &&
      isPlaying &&
      isLoaded &&
      durationMillis - positionMillis < 1500
    ) {
      try {
        this._loopHandlerWorking = true;
        await this.stop();
        await this.play({ volume, loop: true });
      } catch (error) {
        console.log(error);
      } finally {
        this._loopHandlerWorking = false;
      }
    }
  }
}
export default Track;
