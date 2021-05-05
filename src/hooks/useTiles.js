import { useCallback, useState, useMemo, useEffect } from "react";
import { Tile } from "../components";
import Emojis from "../models/emojis";
import { guidGenerator } from "../utils";
import { useMatch } from "../hooks/useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../const/variables";
import { sleep } from "../utils";

export const useTiles = (initialTiles) => {
  const { addCurrentTile, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState(initialTiles);
  const [tilesSelected, setTilesSelected] = useState(0);
  const [hideTiles, setHideTiles] = useState({ hide: false, tiles: [] });
  const [changes, setChanges] = useState({ type: "", tiles: [] });

  const onPress = useCallback(
    (_tile) => {
      if (tilesSelected !== 2) {
        // const newTiles = tiles.map((tile) => {
        //   if (_tile.id === tile.id) {
        //     return { ...tile, show: false };
        //   }
        //   return tile;
        // });
        // setTiles(newTiles);
        if (!_tile.show) {
          setChanges({ type: "show", tiles: [_tile] });
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

  const validateMatch = async () => {
    if (tilesSelected === 2) {
      const { match, tiles } = isMatch;
      if (match) {
        await sleep(NOT_MATCH_SHOWING_TIME);
        setChanges({ type: "remove", tiles });
      } else if (!match) {
        console.log(" VALIDATE ", tilesSelected);
        await sleep(NOT_MATCH_SHOWING_TIME * 2);
        setChanges({ type: "hide", tiles });
      }
      resetMatch();
      setTilesSelected(0);
    }
  };

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    validateMatch();
  }, [validateMatch]);

  return { tiles: newTiles, changes };
};
