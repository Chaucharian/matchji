import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "./useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { useLayoutContext, show } from "../context/layout";

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch,
  } = useLayoutContext();
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
        await sleep(NOT_MATCH_SHOWING_TIME);
        // dispatch(remove({ tiles: tiles }));
      } else if (!match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        dispatch(show({ tiles: tiles, show: false }));
      }
  }, [ dispatch, isMatch]);

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
