import React, { useContext, createContext, useState, useCallback } from "react";
import { useTimer } from "../hooks/useTimer";
import Emojis from "../models/emojis";

const GameContext = createContext();

const initialState = {
  timeOver: false,
  match: false,
  isPlaying: false,
  initialTime: 10,
  currentTime: 60,
  emojiAmount: 1,
  initialEmojis: Emojis,
  score: 0,
  backgroundColor: "#2c2823",
  pause: false
};

export const GameProvider = ({ children, ...options }) => {
  const [settings, setSettings] = useState({ ...initialState, ...options });

  const setTimeOver = useCallback(
    (value) => {
      setSettings({ ...settings, timeOver: value });
    },
    [settings]
  );

  const increaseScore = useCallback(
    (value) => {
      setSettings({ ...settings, score: settings.score + 1 });
    },
    [settings]
  );

  const addTime = useCallback(
    (value) => {
      setSettings({ ...settings, currentTime: settings.currentTime + value });
    },
    [settings]
  );

  const setCurrentTime = useCallback(
    (value) => {
      setSettings({ ...settings, currentTime: value });
    },
    [settings]
  );

  const reset = useCallback(
    (value) => {
      setSettings({ ...initialState, initialEmojis: [...Emojis] });
    },
    [settings]
  );

  const setEmojiAmount = useCallback(
    (value) => {
      setSettings({ ...initialState, emojiAmount: value });
    },
    [settings]
  );

  const openMenu = useCallback(
    (value) => {
      setSettings({ ...settings, pause: value });
    },
    [settings]
  );

  useTimer({
    currentTime: settings.currentTime,
    onSetTime: (value) => setCurrentTime(value),
    onStop: () => setTimeOver(true),
  });

  return (
    <GameContext.Provider
      value={{
        settings,
        setEmojiAmount,
        setSettings,
        setTimeOver,
        increaseScore,
        addTime,
        setCurrentTime,
        openMenu
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
