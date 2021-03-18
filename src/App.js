import React from "react";
import { StatusBar } from "expo-status-bar";
import { GameScreen } from "./screens";
import { GameProvider } from "./context";

export default () => {
  return (
    <>
      <GameProvider>
        <GameScreen />
        <StatusBar style="auto" />
      </GameProvider>
    </>
  );
};
