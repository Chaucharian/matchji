import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTimer } from "../hooks";
import { useGameContext } from "../context";

export const GameHeader = ({}) => {
  const {
    settings: { score },
    setTimeOver,
  } = useGameContext();
  const time = useTimer({ intialTime: 10, onStop: () => setTimeOver(true) });

  return (
    <View style={styles.container}>
      <Text style={styles.score}>SCORE: {score}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "grey",
    height: 100,
  },
  score: {
    fontSize: 20,
    color: "gold",
  },
  time: {
    fontSize: 30,
    color: "white",
  },
});
