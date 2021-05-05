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
import { TILE_MOUNT_ANIMATION_DURATION } from "../const/variables";

const GameContext = createContext();

const initialState = {
  tiles: [],
  amount: false,
};

const generateTiles = ({ amount, show = true }) => {
  let animationDuration = TILE_MOUNT_ANIMATION_DURATION;
  const tiles = sortEmojis(Emojis, amount).map((emoji, index) => {
    const key = guidGenerator();
    // animation effect on mount
    animationDuration += 200;

    return {
      id: index,
      tile: Tile,
      show,
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
      const { amount, show } = action.payload;
      const tiles = generateTiles({ amount, show });
      return { ...state, tiles };
    }
    case actionTypes.HIDE_ALL: {
      const newTiles = state.tiles.map((tile) => {
        return { ...tile, key, show: true };
      });
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
      return { ...state, emojis };
    }
    case actionTypes.SHOW: {
      const { show, tiles } = action.payload;

      if (tiles.length) {
        console.log(" SHOW ", tiles);
        const newTiles = state.tiles.map((tile) => {
          const match = tiles.find((_tile) => _tile.id === tile.id);
          if (match) {
            const key = guidGenerator();
            // this is for remount tiles and watch animation
            return { ...tile, key, show };
          }
          return tile;
        });

        return { ...state, tiles: newTiles };
      }
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
