import { useCallback, useState, useMemo, useEffect } from "react";
import { Match } from "../core/Match";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";
import { useLayoutContext } from "../context/layout";
import { useGameContext } from "../context/game";
import { EXTRA_TIME_ON_MATCH } from "../const";

const match = new Match();

export const useTiles = () => {
  const {
    state: { tiles: initialTiles = [] },
    dispatch: { show, validateWin },
  } = useLayoutContext();
  const {
    dispatch: { addTime },
  } = useGameContext();
  const [tiles, setTiles] = useState([]);

  const onPress = useCallback(
    (_tile) => {
      show({ tiles: [_tile], show: true });
      match.addCurrentTile({ content: _tile.content, id: _tile.id });
    },
    [show]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile) => ({
        ...tile,
        onPress: () => !tile.show && onPress(tile),
      })),
    [tiles, onPress]
  );

  const validateMatch = useCallback(async (isMatch) => {
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
  }, [validateWin, show, addTime]);

  useEffect(() => {
    match.subscribe( (isMatch) => {
      validateMatch(isMatch)
    });
  }, [validateMatch]);

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  return { tiles: newTiles };
};
