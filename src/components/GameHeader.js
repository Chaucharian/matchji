import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useGameContext, usePlayingContext, init } from "../context";

export const GameHeader = ({}) => {
  const {
    settings: { currentTime },
  } = useGameContext();
  const { dispatch } = usePlayingContext();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.score}>SCORE: {score}</Text> */}
      <Text style={styles.time} onPress={() => console.log(" TIME ")}>
        {currentTime}
      </Text>
      <Button
        title="RESET"
        onPress={() => dispatch(init({ amount: 20, show: false }))}
      />
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
    alignItems: "center",
    // justifyContent: "center",
    height: 100,
  },
  score: {
    fontSize: 20,
    color: "gold",
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
