import React, { useContext, createContext, useState, useCallback, useReducer, useMemo } from "react";
import { actionTypes, addTime, nextLevel, pause } from "./actions";
import { LEVEL_PARAMS } from '../../const/variables';

const GameContext = createContext();

const getLevelParams = (amount) => {
  let newLevelParams;

  if(amount <= 18) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.EASY.factor, size: LEVEL_PARAMS.EASY.size };
  } else if(amount >= 20 && amount <= 32) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.NORMAL.factor, size: LEVEL_PARAMS.NORMAL.size };
  } else if(amount >= 32 && amount <= 78) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.HARD.factor, size: LEVEL_PARAMS.HARD.size };
  }
  return newLevelParams
}

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
  extraTime: 0,
  currentLevelParams:  getLevelParams(4)//{ amount: 24, size: 100 } // first level
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TIME: {
      const { time } = action.payload;

      return { ...state, extraTime: time };
    }
    case actionTypes.NEXT_LEVEL: {
      const { currentLevelParams: { amount }, currentLevel } = state;
      const newLevelParams = getLevelParams(amount);

      console.log(" LEVEL ",newLevelParams)

      return { ...initialState, currentLevelParams: newLevelParams, currentLevel: currentLevel + 1 };
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
