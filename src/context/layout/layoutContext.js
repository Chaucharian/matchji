import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useReducer,
} from "react";
import Emojis from "../../models/emojis";
import { sortEmojis, guidGenerator } from "../../utils";
import { actionTypes } from "./actions";
import { Tile } from "../../components/Tile";
import { INITIAL_TILE_ANIMATION_DURATION } from "../../const/variables";

const GameContext = createContext();

const initialState = {
  tiles: [],
  amount: false,
};

const generateTiles = ({ amount, show = true, styles = { width: 100, height: 100, backgroundColor: "#fdf9ef" } }) => {
  let animationDuration = INITIAL_TILE_ANIMATION_DURATION;
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
      styles,
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
      const tiles = generateTiles({ amount, show, styles: { width: 50, height: 50, backgroundColor: "#fdf9ef" } });
      return { ...state, tiles };
    }
    case actionTypes.HIDE_ALL: {
      const newTiles = state.tiles.map((tile) => {
        const key = guidGenerator();
        return { ...tile, key, show: false };
      });

      return { ...state, tiles: newTiles };
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
    case actionTypes.REMOVE: {
      const { tiles } = action.payload;

      const newTiles = state.tiles.map((tile) => {
        if (tile.content === tiles[0].content) {
          const key = guidGenerator();
          // this is for remount tiles and watch animation
          return { ...tile, key, show: false, unmount: true };
        }
        // if (match) {
        //   const key = guidGenerator();
        //   // this is for remount tiles and watch animation
        //   return { ...tile, key, show: false, unmount: true };
        // }
        return tile;
      });

      return { ...state, tiles: newTiles };
    }
    case actionTypes.CHANGE_TILES: {
      const changes = action.payload;
      const newTiles = state.tiles.map( (tile) => ({...tile, ...changes }) );
      return { ...state, tiles: newTiles };
    }
  }
};

export const LayoutProvider = ({ children, ...options }) => {
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

export const useLayoutContext = () => {
  const context = useContext(GameContext);

  if(context === undefined) {
    throw new Error("useLayoutContext must be used inside LayoutProvider");
  }
  return context;
}
