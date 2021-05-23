import React, { useContext, createContext, useEffect, useCallback, useMemo, useRef } from "react";
import { play } from "./actions";
import Track from '../../core/Track';

const SoundContext = createContext();

export const SoundProvider = ({ children, ...options }) => {
  const { current: sounds } = useRef([ new Track('match'), new Track('tap') ]);
  const actions = useMemo( () => ({
    playMatch: () => sounds[0].play(),
    playTap: () => sounds[1].play()
  }), [sounds]);

  const loadSounds = useCallback(async () => {
    try {
      for( let sound of sounds) {
        await sound.load();
      }
    } catch(err) {
      console.log(`Error loading sounds`);
    }
  }, [sounds]);

  useEffect( () => {
    loadSounds();
  },[loadSounds]);

  return (
    <SoundContext.Provider
      value={{ ...actions }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
