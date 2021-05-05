import { useCallback, useState, useMemo, useEffect } from "react";
import { useMatch } from "../hooks/useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { usePlayingContext, show, remove } from "../context";

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
      if (tilesSelected !== 2) {
        if (!_tile.show) {
          dispatch(show({ tiles: [_tile], show: true }));
          addCurrentTile({ content: _tile.content, id: _tile.id });
          setTilesSelected(tilesSelected + 1);
        }
      }
    },
    [addCurrentTile, tilesSelected]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile) => ({
        ...tile,
        onPress: () => onPress(tile),
      })),
    [tiles, onPress]
  );

  const validateMatch = useCallback(async () => {
    if (tilesSelected === 2) {
      const { match, tiles } = isMatch;
      if (match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        dispatch(remove({ tiles: tiles }));
      } else if (!match) {
        await sleep(NOT_MATCH_SHOWING_TIME * 2);
        dispatch(show({ tiles: tiles, show: false }));
      }
      resetMatch();
      setTilesSelected(0);
    }
  }, [isMatch, dispatch, resetMatch, setTilesSelected, sleep]);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    validateMatch();
  }, [isMatch]);

  return { tiles: newTiles };
};
