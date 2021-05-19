import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "./useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { useLayoutContext } from "../context/layout";
import { useGameContext } from "../context/game";
import { EXTRA_TIME_ON_MATCH } from "../const";

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch: { show, validateWin },
  } = useLayoutContext();
  const {
    dispatch: { addTime },
  } = useGameContext();
  const { addCurrentTile, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState([]);
  const shouldValidateMatch = useMemo(() => isMatch.tiles.length === 2, [
    isMatch,
  ]);

  const onPress = useCallback(
    (_tile) => {
      show({ tiles: [_tile], show: true });
      addCurrentTile({ content: _tile.content, id: _tile.id });
    },
    [addCurrentTile, show]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile) => ({
        ...tile,
        onPress: () => !tile.show &&  !shouldValidateMatch && onPress(tile),
      })),
    [tiles, onPress, shouldValidateMatch]
  );

  const validateMatch = useCallback(async () => {
    const { match, tiles } = isMatch;
    if (match) {
      // TODO ZenMode change this behavior (remove the tiles)
      // dispatch(remove({ tiles: tiles }));
      addTime({ time: EXTRA_TIME_ON_MATCH });
      validateWin();
    } else if (!match) {
      await sleep(NOT_MATCH_SHOWING_TIME);
      show({ tiles: tiles, show: false });
    }
  }, [validateWin, show, isMatch, addTime]);

  useEffect(() => {
    if (shouldValidateMatch) {
      validateMatch();
      resetMatch();
    }
  }, [resetMatch, validateMatch, shouldValidateMatch]);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  return { tiles: newTiles };
};
