import { useState, useRef, useEffect, useMemo } from "react";
import Sound from "react-native-sound";
import { useGeneralContext } from "../context/general";
import Track from '../core/Track';

export const useSound = ({
  category = "Playback",
  soundType = "sound",
  mode,
  volume,
  file,
}) => {
  const { isMusicMute, isSoundMute } = useGeneralContext();
  const { current: sound } = useRef(new Track(file));
  
  const actions = useMemo(
    () => ({
      play: async () => {
        try {
          sound.play();
        } catch(err) {
          console.log("  CATCH ",err);
        }
        
      },
      stop: sound.stop(),
    }),
    [sound]
  );

  useEffect(() => {
    if (
      (isSoundMute && soundType == "sound") ||
      (isMusicMute && soundType == "music")
    ) {
      sound.setVolume(0);
    } else {
      sound.setVolume(1);
    }
  }, [sound, isSoundMute, isMusicMute, soundType]);

  // useEffect(() => {
  //   Sound.setCategory(category, true);
  //   // Sound.setMode()
  // }, [category]);

  return actions;
};
