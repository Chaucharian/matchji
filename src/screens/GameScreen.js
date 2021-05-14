import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useModalContext, open } from "../context/modal";
import { LayoutProvider } from "../context/layout";
import { GameLayout } from "../core/GameLayout";
import { GameHeader, Modal } from "../components";
import { usePause } from "../hooks/usePause";
import { useWin } from "../hooks/useWin";

export const GameScreen = () => {
  const {
    state: { show }
  } = useModalContext();
  usePause(show);

  // useEffect(() => {
  //   if (timeOver) {
  //     // Alert.alert("PERDISTE", "", [
  //     //   { text: "REINTENTAR", onPress: () => reset() },
  //     // ]);
  //   }
  // }, [timeOver]);

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
