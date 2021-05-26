import { Audio } from "expo-av";

const audioFiles = {
  ["match"]: require("../assets/match.mp3"),
  ["tap"]: require("../assets/tap.mp3"),
  ["music"]: require("../assets/loop.mp3"),
};
class Track {
  constructor({ id, volume }) {
    this._id = id;
    this._sound = new Audio.Sound();
    this._fadeTimeout = null;
    this._loopHandlerWorking;

    this.status = {
      loaded: false,
      pauseTime: 0,
      volume: volume ? volume : 1,
    };
  }

  async load() {
    try {
      await this._sound.loadAsync(audioFiles[this._id]);
      this.status.loaded = true;
    } catch (error) {
      throw new Error(` Error loading ${this._id} track`);
    }
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

  async setVolume(volume) {
    if (!this.status.loaded) return;

    try {
      await this._sound.setVolumeAsync(volume);
      this.status.volume = volume;
    } catch (error) {
      console.log("Error setting volume");
    }
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

  async play(params = {}) {
    const {
      loop = false,
      continueFromPreviousPosition = true,
      volume = 1,
    } = params;
    try {
      if (!this.status.loaded) {
        await this.load();
      }

      // const shouldFadeIn =
      //   continueFromPreviousPosition && this.status.pauseTime !== 0 ? true : false;
      await this.setCurrentTime(
        continueFromPreviousPosition ? this.status.pauseTime : 0
      );
      // await this.setVolume(shouldFadeIn ? 0 : volume);
      await this.setVolume(this.status.volume);

      await this._sound.playAsync();
      // if (shouldFadeIn) {
      //   await this.fade(volume);
      // }

      if (loop) {
        await this.setTrackToLooping();
      }
    } catch (error) {
      throw new Error(`Error playing ${this._id}: ${error}`);
    }
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

  async stop() {
      if (!this.status.loaded) return

      try {
        const { isPlaying } = await this._sound.getStatusAsync();

        if (isPlaying) {
          await this.fade(0);
        }

        await this.unload();
      } catch (error) {
        console.log(error);
      }
  }

  async fade(toVolume) {
      if (this.status.volume === toVolume) return;

      if (this._fadeTimeout) {
        clearTimeout(this._fadeTimeout);
      }

      const start = Math.floor(this.status.volume * 10);
      const end = toVolume * 10;
      let currVolume = start;

      const loop = async () => {
        if (currVolume !== end) {
          start < end ? currVolume++ : currVolume--;
          await this.setVolume(currVolume / 10);
          this._fadeTimeout = setTimeout(() => loop(), 150);
        } else {
          clearTimeout(() => this._fadeTimeout);
          this._fadeTimeout = null;
        }
      };

      this._fadeTimeout = setTimeout(() => loop(), 5);
  }

  async setTrackToLooping() {
    try {
      this._loopHandlerWorking = false;
      await this._sound.setOnPlaybackStatusUpdate((status) =>
        this._loopHandler(status)
      );
    } catch (error) {
      console.log(error);
    }
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
        // await this.stop();
        await this.play({ loop: true });
      } catch (error) {
        console.log(error);
      } finally {
        this._loopHandlerWorking = false;
      }
    }
  }
}
export default Track;
