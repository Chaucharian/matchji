import React, { useContext, createContext, useState, useCallback } from "react";

const GameContext = createContext();

export const GameProvider = ({ children, ...options }) => {
  const [settings, setSettings] = useState({
    timeOver: false,
    match: false,
    isPlaying: false,
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

  return (
    <GameContext.Provider
      value={{ settings, setSettings, setTimeOver, increaseScore }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
