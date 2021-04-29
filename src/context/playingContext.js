import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useReducer,
} from "react";
import Emojis from "../models/emojis";
import { sortEmojis, guidGenerator } from "../utils";
import { actionTypes } from "./actions";
import { Tile } from "../components/Tile";

const GameContext = createContext();

const initialState = {
  tiles: [],
  amount: false,
};

export const TILE_MOUNT_ANIMATION_DURATION = 500;
export const NOT_MATCH_SHOWING_TIME = 1000;

const generateTiles = ({ amount }) => {
  let animationDuration = TILE_MOUNT_ANIMATION_DURATION;
  const tiles = sortEmojis(Emojis, amount).map((emoji, index) => {
    const key = guidGenerator();
    // animation effect on mount
    animationDuration += 200;

    return {
      id: index,
      tile: Tile,
      show: true,
      unmount: false,
      key,
      styles: { width: 100, height: 100 },
      content: emoji,
      animationDuration,
    };
  });
  return tiles;
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT: {
      const { amount } = action.payload;
      const tiles = generateTiles({ amount });
      return { ...state, tiles };
    }
    case actionTypes.RESET: {
      const { amount } = action.payload;
      const tiles = generateTiles({ amount });
      return { ...state, tiles };
    }
    case actionTypes.RESET_BOARD: {
      const emojis = state.emojis.map(({ emoji, key }, i) => {
        const match = action.payload.find(
          (emojiToRemove) => emojiToRemove === emoji
        );

        // const key = guidGenerator();

        if (match) {
          console.log(match, i);
          return { emoji, key };
        } else {
          return { emoji, key };
        }
      });
      // console.log(
      //   " NEW ",
      //   emojis.map((a) => a.key)
      // );
      return { ...state, emojis };
    }
    case actionTypes.HIDE: {
      const { tiles } = action.payload;

      // let newTiles = [];
      // tiles.forEach( _tile => {
      //   tileRemoved = state.tiles.filter( tile => tile.id !== _tile.id)[0];
      //   newTiles.push(tileRemoved);
      // }

      const newTiles = state.tiles.map((tile) => {
        const match = tiles.find((_tile) => _tile.id === tile.id);
        if (match) {
          const key = guidGenerator();
          // this is for remount tiles and watch animation
          return { ...tile, key, unmount: true };
        }
        return tile;
      });
      console.log("HIDE", tiles);
      return { ...state, tiles: newTiles };
    }
  }
};

export const GamePlayingProvider = ({ children, ...options }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const usePlayingContext = () => useContext(GameContext);
