import React from "react";
import { StyleSheet, View } from "react-native";
import { useModalContext } from "../context/modal";
import { LayoutProvider } from "../context/layout";
import { GameLayout } from "../core/GameLayout";
import { GameHeader, Modal } from "../components";
import { usePause } from "../hooks/usePause";

export const GameScreen = () => {
  const {
    state: { show, }
  } = useModalContext();
  usePause(show);

  return (
    <LayoutProvider>
      <View style={{ ...styles.container }}>
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
    backgroundColor: "#f6e9c2",
    height: "100%",
  },
});
