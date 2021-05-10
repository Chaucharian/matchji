import React, { useContext, createContext, useState, useCallback, useReducer, useMemo } from "react";
import { actionTypes, addTime, nextLevel, pause } from "./actions";

const GameContext = createContext();

const initialState = {
  // timeOver: false,
  // match: false,
  // isPlaying: false,
  // currentTime: 60,
  // emojiAmount: 1,
  // initialEmojis: Emojis,
  // score: 0,
  // backgroundColor: "#2c2823",
  initialTime: 60,
  currentLevel: 1,
  pause: false,
  extraTime: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TIME: {
      const { time } = action.payload;

      return { ...state, extraTime: time };
    }
    case actionTypes.NEXT_LEVEL: {
      return { ...state, currentLevel: state.currentLevel + 1 };
    }
    case actionTypes.PAUSE: {
      const { pause } = action.payload;

      return { ...state, pause };
    }
  }
};

export const GameProvider = ({ children, ...options }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const dispatch = useMemo( () => ({
    pause: (payload) => dispatcher(pause(payload)),
    addTime: (payload) => dispatcher(addTime(payload)),
    nextLevel: (payload) => dispatcher(nextLevel(payload)),
   }), [dispatcher]);

  const context = useMemo( () => ({ state, dispatch }), [state, dispatch]);
  
  return (
    <GameContext.Provider
      value={context}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
