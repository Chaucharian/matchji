import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { GamePlayingProvider } from "../context";
import { Game } from "../core/GameMemo";
import { GameHeader } from "../components";

export const GameScreen = () => {
  // const {
  //   settings: { backgroundColor, timeOver },
  //   setTimeOver,
  //   reset,
  // } = useGameContext();

  // useEffect(() => {
  //   if (timeOver) {
  //     // Alert.alert("PERDISTE", "", [
  //     //   { text: "REINTENTAR", onPress: () => reset() },
  //     // ]);
  //   }
  // }, [timeOver]);

  return (
    <GamePlayingProvider>
      <View style={{ ...styles.container }}>
        <GameHeader />
        <Game />
      </View>
    </GamePlayingProvider>
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
