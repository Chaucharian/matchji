import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import { useTimer } from "../hooks/useTimer";
import { useGameContext, useGameProvider } from "../context";
import { Game } from "../core/Game";

export const GameScreen = () => {
  const {
    settings: { backgroundColor },
    setTimeOver,
  } = useGameContext();
  const time = useTimer({ intialTime: 5, onStop: () => setTimeOver(true) });

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Text style={styles.text}>{time}</Text>
      <Game />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 50,
    position: "absolute",
    left: "50%",
  },
});
