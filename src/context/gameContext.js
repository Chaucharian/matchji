import React, { useContext, createContext, useState, useCallback } from "react";
import { useTimer } from "../hooks";

const GameContext = createContext();

export const GameProvider = ({ children, ...options }) => {
  const [settings, setSettings] = useState({
    timeOver: false,
    match: false,
    isPlaying: false,
    initialTime: 10,
    currentTime: 10,
    score: 0,
    backgroundColor: "#2c2823",
    ...options,
  });

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

  useTimer({
    currentTime: settings.currentTime,
    onSetTime: (value) => setCurrentTime(value),
    onStop: () => setTimeOver(true),
  });

  return (
    <GameContext.Provider
      value={{
        settings,
        setSettings,
        setTimeOver,
        increaseScore,
        addTime,
        setCurrentTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
