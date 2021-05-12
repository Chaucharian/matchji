import { useCallback, useEffect, useState} from "react";
import { Vibration } from "react-native";
import { NOT_MATCH_VIBRATION } from '../const/variables';
import Sound from "react-native-sound";

Sound.setCategory("Playback");
const matchSound = new Sound(`match.mp3`);
const tapSound = new Sound(`tap.mp3`);
tapSound.setVolume(1);
matchSound.setVolume(1);

export const useMatch = () => {
  const [firstTile, setFirsTile] = useState({ content: null, id: null });
  const [secondTile, setSecondTile] = useState({ content: null, id: null });
  const [isMatch, setIsMatch] = useState({
    tiles: [],
    match: false,
  });

  const resetMatch = () =>
    setIsMatch({
      tiles: [],
      match: false,
    });

  const resetSelection = () => {
    setFirsTile({ content: null, id: null });
    setSecondTile({ content: null, id: null });
  };

  const addCurrentTile = useCallback(
    ({ content, id }) => {
      tapSound.play();
      if (firstTile.content === null) {
        setFirsTile({ content, id });
      } else if (secondTile.content === null && firstTile.id !== id) {
        setSecondTile({ content, id });
      }
    },
    [firstTile, secondTile, setFirsTile, setSecondTile]
  );

  useEffect(() => {
    if (firstTile.content !== null && secondTile.content !== null) {
      if (firstTile.content === secondTile.content) {
        setIsMatch({ tiles: [firstTile, secondTile], match: true });
        matchSound.play();
      } else {
        setIsMatch({
          tiles: [firstTile, secondTile],
          match: false,
        });
        Vibration.vibrate(NOT_MATCH_VIBRATION);
      }
      resetSelection();
    }
  }, [firstTile, secondTile, setIsMatch]);

  return { isMatch, resetMatch, addCurrentTile };
};
