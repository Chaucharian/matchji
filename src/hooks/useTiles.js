import { useCallback, useState, useMemo, useEffect } from "react";
import { Tile } from "../components";
import Emojis from "../models/emojis";
import { guidGenerator } from "../utils";
import { useMatch } from "../hooks/useMatch";
import { NOT_MATCH_SHOWING_TIME } from "../context/playingContext";

const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const useTiles = (initialTiles) => {
  const { onValidateMatch, isMatch, resetMatch } = useMatch();
  const [tiles, setTiles] = useState(initialTiles);
  const [tilesSelected, setTilesSelected] = useState(0);
  const [hideTiles, setHideTiles] = useState({ hide: false, tiles: [] });
  const [changes, setChanges] = useState({ type: "", tiles });

  const onPress = useCallback(
    (_tile) => {
      const newTiles = tiles.map((tile) => {
        if (_tile.id === tile.id) {
          return { ...tile, show: false };
        }
        return tile;
      });
      setTiles(newTiles);
      onValidateMatch({ content: _tile.content, id: _tile.id });
      setTilesSelected(tilesSelected + 1);
    },
    [tiles, onValidateMatch, tilesSelected]
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
    const { match, tiles } = isMatch;
    if (match) {
      // await sleep(NOT_MATCH_SHOWING_TIME);
      // setChanges({ type: "remove", tiles });
      // const newTiles = tiles.map((tile) => {
      //   if (tile.content === content) {
      //     const key = guidGenerator();
      //     // this is for remount tiles and watch animation
      //     return { ...tile, key, unmount: true };
      //   }
      //   return tile;
      // });
      // resetMatch();
      // setTilesSelected(0);
      // setTiles(newTiles);
    } else if (!match && tilesSelected === 2) {
      await sleep(NOT_MATCH_SHOWING_TIME * 2);
      setChanges({ type: "hide", tiles });
      resetMatch();
      setTilesSelected(0);
      // await sleep();
      // setTilesSelected(0);
      // setHideTiles({ hide: true, tiles: content });
    }
    // else if (!match && tilesSelected === 2) {
    //   const newTiles = tiles.map((tile) => {
    //     if (tile.content === content) {
    //       const key = guidGenerator();
    //       // this is for remount tiles and watch animation
    //       return { ...tile, key, show: true };
    //     }
    //     return tile;
    //   });
    //   console.log(" NEW ", newTiles);
    //   resetMatch();
    //   setTilesSelected(0);
    //   setTiles(newTiles);
    // }
  };

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    validateMatch();
  }, [isMatch, tiles, resetMatch, tilesSelected]);

  // useEffect(() => {
  //   let animationDuration = 500;
  //   setTiles(
  //     emojis.map(({ emoji, key }) => {
  //       // animation effect on mount
  //       animationDuration += 200;
  //       return {
  //         tile: Tile,
  //         show: true,
  //         unmount: false,
  //         key,
  //         styles: { width: 100, height: 100 },
  //         content: emoji,
  //         animationDuration,
  //       };
  //     })
  //   );
  // }, [emojis]);

  // useEffect(() => {
  //   if (!isMatch.match && tilesSelected === 2) {
  //     setTilesSelected(0);
  //     setHideTiles(true);
  //   }
  // }, [tilesSelected, isMatch]);

  return { tiles: newTiles, changes };
};
