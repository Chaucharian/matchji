import React from "react";
import { StatusBar } from "expo-status-bar";
import { InitialScreen } from "./screens/InitialScreen";
import { GameProvider } from "./context/game";
import { GeneralProvider } from "./context/general";
import { ModalProvider } from "./context/modal";
import { ThemeProvider } from "./context/theme/themeContext";
import { SoundProvider } from "./context/sound/soundContext";
import { useStore } from "./hooks/useStore";

export const App = () => {
  const { session, loading } = useStore();

  return loading ? (
    <></>
  ) : (
    <GeneralProvider>
      <ThemeProvider>
        <SoundProvider>
          <GameProvider session={session}>
            <ModalProvider>
              <InitialScreen />
              <StatusBar style="auto" />
            </ModalProvider>
          </GameProvider>
        </SoundProvider>
      </ThemeProvider>
    </GeneralProvider>
  );
};
