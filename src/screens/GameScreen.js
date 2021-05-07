import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { LayoutProvider, useGameContext } from "../context";
import { Game } from "../core/GameMemo";
import { GameHeader, Modal } from "../components";

export const GameScreen = () => {
  const { settings: {pause} } = useGameContext();

  // useEffect(() => {
  //   if (timeOver) {
  //     // Alert.alert("PERDISTE", "", [
  //     //   { text: "REINTENTAR", onPress: () => reset() },
  //     // ]);
  //   }
  // }, [timeOver]);
console.log(pause)
  return (
    <LayoutProvider>
      <View style={{ ...styles.container }}>
        <Modal show={pause} />
        <GameHeader />
        <Game />
      </View>
    </LayoutProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#f6e9c2",
    height: "100%",
  },
});
