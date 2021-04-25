import { useCallback, useState, useMemo, useEffect } from "react";
import { Tile } from "../components";
import Emojis from "../models/emojis";
import { sortEmojis } from "../utils";

export const useTiles = (amount = 4, { onValidateMatch, isMatch }) => {
  const emojis = sortEmojis(Emojis, amount);

  const [tiles, setTiles] = useState(
    emojis.map((emoji) => ({
      tile: Tile,
      show: true,
      unmount: false,
      styles: { width: 100, height: 100 },
      content: emoji,
    }))
  );

  const onPress = useCallback(
    ({ tile: _tile }) => {
      const newTiles = tiles.map((tile, index) => {
        if (tile.content === _tile.content) {
          return { ...tile, show: false };
        }
        return tile;
      });

      onValidateMatch(_tile.content);
      setTiles(newTiles);
      onPress;
    },
    [tiles]
  );

  const newTiles = useMemo(
    () =>
      tiles.map((tile, index) => ({
        ...tile,
        onPress: () => onPress({ tile }),
      })),
    [tiles, onPress]
  );

  // useEffect(() => {
  //   const { match, tile } = isMatch;

  //   if (match) {
  //     const newTiles = tiles.map(({ content }, index) => {
  //       if (content === tile) {
  //         return { ...tile, unmount: true };
  //       }
  //       return tile;
  //     });
  //     setTiles(newTiles);
  //   }
  // }, [isMatch]);

  return newTiles;
};
