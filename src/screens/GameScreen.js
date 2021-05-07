import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { LayoutProvider, useGameContext } from "../context";
import { Game } from "../core/GameMemo";
import { GameHeader, Modal } from "../components";

export const GameScreen = () => {
  const { settings: {pause}, openMenu } = useGameContext();

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
        <Modal show={pause} onPress={() => openMenu(false) } />
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
    backgroundColor: "#f6e9c2",
    height: "100%",
  },
});
