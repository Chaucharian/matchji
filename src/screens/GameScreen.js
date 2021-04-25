import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useGameContext } from "../context";
import { Game } from "../core/GameMemo";
import { GameHeader, Layout, Tile } from "../components";

export const GameScreen = () => {
  const {
    settings: { backgroundColor, timeOver },
    setTimeOver,
    reset,
  } = useGameContext();

  useEffect(() => {
    if (timeOver) {
      // Alert.alert("PERDISTE", "", [
      //   { text: "REINTENTAR", onPress: () => reset() },
      // ]);
    }
  }, [timeOver]);

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
  },
});
