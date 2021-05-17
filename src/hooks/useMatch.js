import { useCallback, useEffect, useState } from "react";
import { Vibration } from "react-native";
import { NOT_MATCH_VIBRATION } from "../const/variables";
import { useSound } from "./useSound";

export const useMatch = () => {
  const [firstTile, setFirsTile] = useState({ content: null, id: null });
  const [secondTile, setSecondTile] = useState({ content: null, id: null });
  const [isMatch, setIsMatch] = useState({
    tiles: [],
    match: false,
  });
  // const { play: matchPlay } = useSound({ file: "match.mp3" });
  // const { play: tapPlay } = useSound({ file: "tap.mp3" });

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
      // tapPlay();
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
        // matchPlay();
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
