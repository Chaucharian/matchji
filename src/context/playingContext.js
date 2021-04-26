import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useReducer,
} from "react";
import Emojis from "../models/emojis";
import { sortEmojis } from "../utils";
import { actionTypes } from "./actions";

const GameContext = createContext();

const initialState = {
  emojis: [],
  amount: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT: {
      const emojis = sortEmojis(Emojis, action.payload);
      return { ...state, emojis };
    }
    case actionTypes.RESET: {
      const emojis = sortEmojis(Emojis, action.payload);
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