import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "./useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { useLayoutContext, show } from "../context/layout";
import { useGameContext } from "../context/game";

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch,
  } = useLayoutContext();
  const { addTime } = useGameContext();
  const { addCurrentTile, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState([]);
  const shouldValidateMatch = useMemo( () => isMatch.tiles.length === 2, [isMatch]);

  const onPress = useCallback(
    (_tile) => {
          dispatch(show({ tiles: [_tile], show: true }));
          addCurrentTile({ content: _tile.content, id: _tile.id });
    },
    [addCurrentTile, dispatch]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile) => ({
        ...tile,
        onPress: () => !tile.show && onPress(tile),
      })),
    [tiles, onPress]
  );

  const validateMatch = useCallback(async () => {
    const { match, tiles } = isMatch;
      if (match) {
        // TODO ZenMode change this behavior (remove the tiles)
        // dispatch(remove({ tiles: tiles }));
        addTime(5);
      } else if (!match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        dispatch(show({ tiles: tiles, show: false }));
      }
  }, [ dispatch, isMatch, addTime]);

  useEffect(() => {
    if (shouldValidateMatch) {
      validateMatch();
      resetMatch();
    }
  }, [resetMatch, validateMatch, shouldValidateMatch, addTime]);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  return { tiles: newTiles };
};
