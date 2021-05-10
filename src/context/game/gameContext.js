import React, { useContext, createContext, useState, useCallback, useReducer } from "react";
import Emojis from "../../models/emojis";
import { actionTypes, addTimeAction } from "./actions";

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
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [settings, setSettings] = useState({ ...initialState, ...options });

  // const setTimeOver = useCallback(
  //   (value) => {
  //     setSettings({ ...settings, timeOver: value });
  //   },
  //   [settings]
  // );

  // const increaseScore = useCallback(
  //   (value) => {
  //     setSettings({ ...settings, score: settings.score + 1 });
  //   },
  //   [settings]
  // );

  // const setCurrentTime = useCallback(
  //   (value) => {
  //     setSettings({ ...settings, currentTime: value });
  //   },
  //   [settings]
  // );

  // const reset = useCallback(
  //   (value) => {
  //     setSettings({ ...initialState, initialEmojis: [...Emojis] });
  //   },
  //   [settings]
  // );

  // const setEmojiAmount = useCallback(
  //   (value) => {
  //     setSettings({ ...initialState, emojiAmount: value });
  //   },
  //   [settings]
  // );

  // const openMenu = useCallback(
  //   (value) => {
  //     setSettings({ ...settings, pause: value });
  //   },
  //   [settings]
  // );
  
  // useTimer({
  //   currentTime: settings.currentTime,
  //   onSetTime: (value) => setCurrentTime(value),
  //   onStop: () => setTimeOver(true),
  // });

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch
        // settings,
        // setEmojiAmount,
        // setSettings,
        // setTimeOver,
        // increaseScore,
        // addTime,
        // setCurrentTime,
        // openMenu
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
