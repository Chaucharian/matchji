import React, { useContext, createContext, useReducer, useRef, useMemo } from "react";
import { actionTypes, addTime, nextLevel, pause, resetTimer, randomLevel, resetLevel, resetLayout, gameOver } from "./actions";
import { LEVEL_PARAMS } from '../../const/variables';
import { random } from "../../utils";
import store from 'react-native-simple-store';

const GameContext = createContext();

const getLevelParams = (amount) => {
  let newLevelParams;

  if(amount <= 15) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.EASY.factor, size: LEVEL_PARAMS.EASY.size };
  } else if(amount >= 17 && amount <= 28) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.NORMAL.factor, size: LEVEL_PARAMS.NORMAL.size };
  } else if(amount >= 30 && amount <= 78) {
    newLevelParams = { amount: amount + LEVEL_PARAMS.HARD.factor, size: LEVEL_PARAMS.HARD.size };
  }
  return newLevelParams
}

const initialState = {
  initialTime: 30,
  currentLevel: 1,
  levelTime: 0,
  pause: false,
  resetLayout: false,
  resetTimer: false,
  gameOver: false,
  extraTime: 0,
  currentLevelParams:  getLevelParams(4), // first level
  currentRandomLevelParams: getLevelParams(4)
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TIME: {
      const { time } = action.payload;

      return { ...state, extraTime: time };
    }
    case actionTypes.RANDOM_LEVEL: {
      const { currentLevelParams, currentLevel } = state; // KEEP THE LEVEL SESSION WHEN CHANGING GAME MODES 
      const newLevelParams = getLevelParams(random(6, 36));

      return { ...initialState, currentLevelParams, currentLevel, currentRandomLevelParams: newLevelParams, };
    }
    case actionTypes.NEXT_LEVEL: {
      const { currentLevelParams: { amount }, currentLevel } = state;
      const newLevelParams = getLevelParams(amount);
      const nextLevel = currentLevel + 1;
      // SAVE SESSION
      store.save("currentLevel", { currentLevel: nextLevel, amount });

      return { ...initialState, resetTimer: true, currentLevelParams: newLevelParams, currentLevel: nextLevel };
    }
    case actionTypes.PAUSE: {
      const { pause } = action.payload;

      return { ...state, pause };
    }
    case actionTypes.GAME_OVER: {
      const { gameOver } = action.payload;

      return { ...state, gameOver };
    }
    case actionTypes.RESET_LAYOUT: {
      const { resetLayout } = action.payload;
      return { ...state, resetLayout };
    }
    case actionTypes.RESET_TIMER: {
      const { resetTimer } = action.payload;
      return { ...state, resetTimer };
    }
    case actionTypes.RESET_LEVEL: {

      return { ...state, resetTimer: true, resetLayout: true };
    }
  }
};

export const GameProvider = ({ children, session: { amount, currentLevel } }) => {
  const [state, dispatcher] = useReducer(reducer, { ...initialState, currentLevel, currentLevelParams:  getLevelParams(amount)  });
  const levelTime = useRef(0); 

  const dispatch = useMemo(
    () => ({
      pause: (payload) => dispatcher(pause(payload)),
      gameOver: (payload) => dispatcher(gameOver(payload)),
      addTime: (payload) => dispatcher(addTime(payload)),
      nextLevel: (payload) => dispatcher(nextLevel(payload)),
      randomLevel: (payload) => dispatcher(randomLevel(payload)),
      resetLevel: (payload) =>
        dispatcher(
          resetLevel(payload)
        ),
      setResetLayout: (payload) => dispatcher(resetLayout(payload)),
      setResetTimer: (payload) => dispatcher(resetTimer(payload)),
    }),
    [dispatcher]
  );
  
  const context = useMemo( () => ({ state: { ...state, levelTime }, dispatch }), [state, levelTime, dispatch]);
  
  return (
    <GameContext.Provider
      value={context}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
