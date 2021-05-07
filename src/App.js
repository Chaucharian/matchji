import React from "react";
import { StatusBar } from "expo-status-bar";
import { GameScreen } from "./screens";
import { GameProvider } from "./context/game";

export const App = () => {
  return (
    <>
      <GameProvider>
        <GameScreen />
        <StatusBar style="auto" />
      </GameProvider>
    </>
  );
};
