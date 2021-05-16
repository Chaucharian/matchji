import React from "react";
import { StatusBar } from "expo-status-bar";
import { InitialScreen } from "./screens/InitialScreen";
import { GameProvider } from "./context/game";
import { GeneralProvider } from "./context/general";
import { ModalProvider } from "./context/modal";

export const App = () => {
  return (
    <GeneralProvider>
      <GameProvider>
        <ModalProvider>
          <InitialScreen />
          <StatusBar style="auto" />
        </ModalProvider>
      </GameProvider>
    </GeneralProvider>
  );
};
