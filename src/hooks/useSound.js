import { useState, useEffect, useMemo } from "react";
import Sound from "react-native-sound";
import { useGeneralContext } from "../context/general";

export const useSound = ({
  category = "Playback",
  soundType = "sound",
  mode,
  volume,
  file,
}) => {
  const { isMusicMute, isSoundMute } = useGeneralContext();
  const [sound, setSound] = useState(new Sound(file));

  const actions = useMemo(
    () => ({
      play: () => {
        sound.play((error) => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          sound.release();
        });
      },
      stop: sound.stop(),
    }),
    [sound]
  );

  useEffect(() => {
        if ((isSoundMute && soundType == "sound") || (isMusicMute && soundType == "music")) {
            sound.setVolume(0);
          } else {
            sound.setVolume(1);
          }
  }, [sound, isSoundMute, isMusicMute, soundType]);

  useEffect(() => {
    Sound.setCategory(category, true);
    // Sound.setMode()
  }, [category]);

  return actions;
};
