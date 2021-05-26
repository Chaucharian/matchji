import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { play } from "./actions";
import Track from "../../core/Track";

const SoundContext = createContext();

const SOUND_TYPES = { SOUND: "SOUND", MUSIC: "MUSIC" };

const initialSounds = [
  { type: SOUND_TYPES.SOUND, source: new Track({ id: "match" }) },
  { type: SOUND_TYPES.SOUND, source: new Track({ id: "tap" }) },
  { type: SOUND_TYPES.MUSIC, source: new Track({ id: "music", volume: 0.5 }) },
];

export const SoundProvider = ({ children, _initialSounds = initialSounds }) => {
  const { current: sounds } = useRef(_initialSounds);

  const loadSounds = useCallback(async () => {
    try {
      for (let sound of sounds) {
        await sound.source.load();
      }
    } catch (err) {
      console.log(`Error loading sounds`);
    }
  }, [sounds]);

  const mute = useCallback(
    async (type, on) => {
      const volume = on ? 0 : 1;
      for (let sound of sounds) {
        if (sound.type === type) {
          await sound.source.setVolume(volume);
        }
      }
    },
    [sounds]
  );

  const play = useCallback(
    async ({ id, ...params }) => {
      await sounds[id].source.play(params);
    },
    [sounds]
  );

  const actions = useMemo(
    () => ({
      playMatch: () => play({ id: 0 }),
      playTap: () => play({ id: 1 }),
      playMusic: () => play({ id: 2, loop: true }),
      muteSound: (on) => mute(SOUND_TYPES.SOUND, on),
      muteMusic: (on) => mute(SOUND_TYPES.MUSIC, on),
    }),
    [mute, play]
  );

  useEffect(() => {
    loadSounds();
  }, [loadSounds]);

  return (
    <SoundContext.Provider value={{ ...actions }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
