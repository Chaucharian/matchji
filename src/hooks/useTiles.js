import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "./useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { usePlayingContext, show } from "../context";

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch,
  } = usePlayingContext();
  const { addCurrentTile, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState([]);
  const [tilesSelected, setTilesSelected] = useState(0);

  const onPress = useCallback(
    (_tile) => {
          dispatch(show({ tiles: [_tile], show: true }));
          addCurrentTile({ content: _tile.content, id: _tile.id });
          setTilesSelected(tilesSelected + 1);
    },
    [addCurrentTile, dispatch, tilesSelected]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile) => ({
        ...tile,
        onPress: () => (tilesSelected !== 2 && !tile.show) && onPress(tile),
      })),
    [tiles, tilesSelected, onPress]
  );

  const validateMatch = useCallback(async () => {
    const { match, tiles } = isMatch;
    console.log("MATCH ",tilesSelected)
    if (tilesSelected === 2 && tiles.length) {
      if (match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        // dispatch(remove({ tiles: tiles }));
      } else if (!match) {
        await sleep(NOT_MATCH_SHOWING_TIME * 2);
        dispatch(show({ tiles: tiles, show: false }));
      }
      resetMatch();
      setTilesSelected(0);
    }
  }, [isMatch, tilesSelected, resetMatch, dispatch]);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    validateMatch();
  }, [validateMatch]);

  return { tiles: newTiles };
};
