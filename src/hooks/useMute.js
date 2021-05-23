import { useGeneralContext } from "../context/general";
import { useSoundContext } from "../context/sound";
import { useEffect } from "react";

export const useMute = () => {
  const {
    state: { isMusicMute, isSoundMute },
  } = useGeneralContext();
  const { muteSound, muteMusic } = useSoundContext();

  useEffect(() => {
    if (isMusicMute) {
      muteMusic(true);
    } else if (!isMusicMute) {
      muteMusic(false);
    }
    if (isSoundMute) {
      muteSound(true);
    } else if (!isSoundMute) {
      muteSound(false);
    }
  }, [isMusicMute, isSoundMute, muteMusic, muteSound]);
};
