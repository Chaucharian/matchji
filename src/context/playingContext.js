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

const GameContext = createContext();

const initialState = {
  emojis: [],
  amount: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT: {
      const emojis = sortEmojis(Emojis, action.payload).map((emoji) => {
        const key = guidGenerator();
        return { emoji, key };
      });
      return { ...state, emojis };
    }
    case actionTypes.RESET: {
      const emojis = sortEmojis(Emojis, action.payload).map((emoji) => {
        const key = guidGenerator();
        return { emoji, key };
      });
      return { ...state, emojis };
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
