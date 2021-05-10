import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useGameContext } from "../context/game";
import { useLayoutContext } from "../context/layout";
import { useModalContext, open } from "../context/modal";
import { Timer } from "../components/Timer";
import { addTime } from '../context/game';

export const GameHeader = () => {
  const {
    state: { show },
    dispatch 
  } = useModalContext();
  const { state: { initialTime, extraTime, pause }, dispatch: { addTime } } = useGameContext();

  return (
    <View style={styles.container}>
      <Button
        title="MENU"
        onPress={() => dispatch( open(({ show: !show })) ) }
      />
      <Timer initialTime={initialTime} stop={pause} addTime={extraTime} onTimeAdded={() => addTime({ time: 0 }) }/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-end",
    alignItems: "center",
    justifyContent: "center",
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
