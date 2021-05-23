import React from "react";
import { StyleSheet, View } from "react-native";
import { useModalContext } from "../context/modal";
import { LayoutProvider } from "../context/layout";
import { GameLayout } from "../core/GameLayout";
import { GameHeader, Modal } from "../components";
import { usePause } from "../hooks/usePause";
import { useTheme } from "../context/theme/themeContext";
import { useTutorial } from "../hooks/useTutorial";

export const GameScreen = () => {
  const {
    state: { show },
  } = useModalContext();
  usePause(show);
  useTutorial();
  const {
    state: { secondary },
  } = useTheme();

  return (
      <LayoutProvider>
        <View style={{ ...styles.container, backgroundColor: secondary }}>
          <Modal />
          <GameHeader />
          <GameLayout />
        </View>
      </LayoutProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  container: {
    height: "100%",
  },
});
