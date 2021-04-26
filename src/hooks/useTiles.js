import { useCallback, useState, useMemo, useEffect } from "react";
import { Tile } from "../components";
import Emojis from "../models/emojis";
import { sortEmojis } from "../utils";
import { useMatch } from "../hooks/useMatch";

export const useTiles = (amount = 4, emojis) => {
  const { onValidateMatch, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState([]);

  const onPress = useCallback(
    ({ tile: _tile, index: _index }) => {
      const newTiles = tiles.map((tile, index) => {
        if (index === _index) {
          return { ...tile, show: false };
        }
        return tile;
      });
      setTiles(newTiles);
      onValidateMatch({ content: _tile.content, index: _index });
    },
    [tiles, onValidateMatch]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile, index) => ({
        ...tile,
        onPress: () => onPress({ tile, index }),
      })),
    [tiles, onPress]
  );

  useEffect(() => {
    const { match, content } = isMatch;

    if (match) {
      const newTiles = tiles.map((tile) => {
        if (tile.content === content) {
          return { ...tile, unmount: true };
        }
        return tile;
      });
      resetMatch();

      setTiles(newTiles);
    } else if (match === false) {
      const newTiles = tiles.map((tile) => {
        if (tile.content === content) {
          return { ...tile, show: true };
        }
        return tile;
      });
      resetMatch();
      setTiles(newTiles);
    }
  }, [isMatch, tiles, resetMatch]);

  useEffect(() => {
    setTiles(
      emojis.map((emoji) => ({
        tile: Tile,
        show: true,
        unmount: false,
        styles: { width: 100, height: 100 },
        content: emoji,
      }))
    );
  }, [emojis]);

  return newTiles;
};
