import React from "react";
import { GameMenu } from "../core/GameMenu";
import { useCurrentMode } from "../hooks/useCurrentMode";

export const InitialScreen = () => {
  const GameMode = useCurrentMode();

  return GameMode ? <GameMode /> : <GameMenu />;
};
