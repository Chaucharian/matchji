import React from "react";
import { StyleSheet, View } from "react-native";
import { useGameContext } from "../context";
import { Game } from "../core/Game";
import { GameHeader } from "../components";

export const GameScreen = () => {
  const {
    settings: { backgroundColor },
    setTimeOver,
  } = useGameContext();

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <GameHeader />
      <Game />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  container: {
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
