import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useModalContext, open } from "../context/modal";
import { LayoutProvider } from "../context/layout";
import { GameLayout } from "../core/GameLayout";
import { GameHeader, Modal } from "../components";
import { useGameContext, pause } from "../context/game";

export const GameScreen = () => {
  const {
    state: { show }, dispatch
  } = useModalContext();
  const { dispatch: gameDispatch } = useGameContext();
  // useEffect(() => {
  //   if (timeOver) {
  //     // Alert.alert("PERDISTE", "", [
  //     //   { text: "REINTENTAR", onPress: () => reset() },
  //     // ]);
  //   }
  // }, [timeOver]);

  useEffect( () => {
    if(show) {
      gameDispatch(pause({ pause: true }));
    } else {
      gameDispatch(pause({ pause: false }));
    }
  }, [gameDispatch, show]);

  return (
    <LayoutProvider>
      <View style={{ ...styles.container }}>
        <Modal show={show} onPress={() => dispatch(open({ show: false }))} />
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
