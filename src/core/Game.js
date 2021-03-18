import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import { useTimer } from "../hooks/useTimer";
import { useGameContext, useGameProvider } from "../context/gameContext";

export const Game = () => {
  const {
    settings: { backgroundColor },
  } = useGameContext();

  return <View></View>;
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
