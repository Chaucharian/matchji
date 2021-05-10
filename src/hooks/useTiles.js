import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "./useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { useLayoutContext, show, validateWin } from "../context/layout";
import { useGameContext } from "../context/game";
import { addTime } from '../context/game/actions';
import { EXTRA_TIME_ON_MATCH } from '../const';

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch: layoutDispatch,
  } = useLayoutContext();
  const { dispatch: { addTime } } = useGameContext();
  const { addCurrentTile, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState([]);
  const shouldValidateMatch = useMemo( () => isMatch.tiles.length === 2, [isMatch]);

  const onPress = useCallback(
    (_tile) => {
      layoutDispatch(show({ tiles: [_tile], show: true }));
          addCurrentTile({ content: _tile.content, id: _tile.id });
    },
    [addCurrentTile, layoutDispatch]
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
        addTime({ time: EXTRA_TIME_ON_MATCH });
        layoutDispatch(validateWin());
      } else if (!match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        layoutDispatch(show({ tiles: tiles, show: false }));
      }
  }, [ layoutDispatch, isMatch, addTime]);

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
