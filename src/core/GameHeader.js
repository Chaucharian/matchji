import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext, open } from "../context/modal";
import { Timer } from "../components/Timer";
import { BurguerButton } from '../components/BurgerButton';

export const GameHeader = () => {
  const {
    state: { show },
    dispatch: { openMenu },
  } = useModalContext();
  const {
    state: { initialTime, extraTime, pause, reset },
    dispatch: { addTime, setReset },
  } = useGameContext();

  return (
    <View style={styles.container}>
      <BurguerButton onPress={() => openMenu({ show: !show })}/>
      <Timer
        initialTime={initialTime}
        stop={pause}
        reset={reset}
        addTime={extraTime}
        onReset={() => setReset({ reset: false}) }
        onTimeChange={() => addTime({ time: 0 })}
      />
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
