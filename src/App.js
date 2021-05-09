import React from "react";
import { StatusBar } from "expo-status-bar";
import { GameScreen } from "./screens";
import { GameProvider } from "./context/game";
import { ModalProvider } from "./context/modal";

export const App = () => {
  return (
    <>
      <GameProvider>
        <ModalProvider>
          <GameScreen />
          <StatusBar style="auto" />
        </ModalProvider>
      </GameProvider>
    </>
  );
};
